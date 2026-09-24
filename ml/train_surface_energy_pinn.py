"""Train an experimental surface-energy-balance PINN for HeatWise.

This model is deliberately separate from the deployable XGBoost regressor and
classifier.  It predicts LST while penalising a partial surface-energy-balance
residual derived from fields available in the supplied tabular dataset:

    absorbed shortwave = emitted longwave + sensible heat + latent heat + storage

The dataset does not contain measured net longwave radiation, ground heat flux,
or repeated same-pixel observations.  Consequently this is an experimental
physics-guided PINN prototype, not an operational energy-balance model.
"""

from __future__ import annotations

import argparse
import json
import os
from datetime import datetime, timezone
from pathlib import Path

# Windows environments that load NumPy/XGBoost and PyTorch can otherwise load
# two OpenMP runtimes. This only affects this local training process.
os.environ.setdefault("KMP_DUPLICATE_LIB_OK", "TRUE")

import numpy as np
import pandas as pd
import torch
from torch import nn
from torch.utils.data import DataLoader, TensorDataset

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "india_urban_heat_synthetic_dataset"
OUTPUT = ROOT / "ml" / "artifacts" / "surface_energy_pinn.json"

FEATURES = [
    "latitude", "longitude", "day_of_year", "air_temperature_c",
    "solar_radiation_wm2", "albedo", "surface_emissivity", "wind_speed_ms",
    "evapotranspiration_mm", "soil_moisture_pct", "tree_cover_fraction",
    "impervious_surface_fraction", "building_density", "sky_view_factor",
]
PHYSICS_INDEX = {name: FEATURES.index(name) for name in FEATURES}


def load_sample(per_file: int, seed: int) -> pd.DataFrame:
    columns = FEATURES + ["target_lst_c", "city"]
    frames: list[pd.DataFrame] = []
    for offset, path in enumerate(sorted(DATA_DIR.glob("india_urban_heat_part_*.csv"))):
        frame = pd.read_csv(path, usecols=columns)
        frames.append(frame.sample(n=min(per_file, len(frame)), random_state=seed + offset))
    return pd.concat(frames, ignore_index=True)


class SurfaceEnergyPINN(nn.Module):
    def __init__(self, inputs: int) -> None:
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(inputs, 64), nn.Tanh(),
            nn.Linear(64, 64), nn.Tanh(),
            nn.Linear(64, 1),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.network(x).squeeze(-1)


def surface_energy_residual(
    predicted_c: torch.Tensor,
    raw: torch.Tensor,
    dtemp_d_day_normalized: torch.Tensor,
) -> torch.Tensor:
    """Partial SEB residual in W/m2, scaled by 600 W/m2 for training.

    It follows Q* = H + LE + G + storage. Net longwave and ground heat flux are
    not measured in this dataset, so emitted longwave relative to air
    temperature and a storage proxy are used. This is explicit in metadata.
    """
    ix = PHYSICS_INDEX
    solar = raw[:, ix["solar_radiation_wm2"]]
    albedo = raw[:, ix["albedo"]]
    emissivity = raw[:, ix["surface_emissivity"]]
    air_c = raw[:, ix["air_temperature_c"]]
    wind = raw[:, ix["wind_speed_ms"]]
    et_mm_day = raw[:, ix["evapotranspiration_mm"]]

    surface_k = predicted_c + 273.15
    air_k = air_c + 273.15
    sigma = 5.670374419e-8
    absorbed_shortwave = solar * (1.0 - albedo)
    emitted_longwave = emissivity * sigma * (surface_k.pow(4) - air_k.pow(4))
    sensible_heat = (4.0 + 4.0 * wind.clamp_min(0.0)) * (predicted_c - air_c)
    latent_heat = et_mm_day.clamp_min(0.0) * 28.94  # 1 mm/day = 28.94 W/m2
    storage_proxy = 12.0 * dtemp_d_day_normalized
    return (absorbed_shortwave - emitted_longwave - sensible_heat - latent_heat - storage_proxy) / 600.0


def export_network(model: SurfaceEnergyPINN) -> list[dict]:
    layers: list[dict] = []
    for layer in model.network:
        if isinstance(layer, nn.Linear):
            layers.append({
                "weight": layer.weight.detach().cpu().numpy().round(8).tolist(),
                "bias": layer.bias.detach().cpu().numpy().round(8).tolist(),
                "activation": "tanh" if len(layers) < 2 else "identity",
            })
    return layers


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--per-file", type=int, default=8_000)
    parser.add_argument("--epochs", type=int, default=28)
    parser.add_argument("--batch-size", type=int, default=512)
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()

    torch.manual_seed(args.seed)
    np.random.seed(args.seed)
    data = load_sample(args.per_file, args.seed)
    holdout = data["city"].isin(["Bengaluru", "Delhi", "Mumbai"])
    train = data.loc[~holdout].copy()
    test = data.loc[holdout].copy()

    means = train[FEATURES].mean().to_numpy(np.float32)
    stds = train[FEATURES].std().replace(0, 1).to_numpy(np.float32)
    target_mean = float(train["target_lst_c"].mean())
    target_std = float(train["target_lst_c"].std())

    def tensors(frame: pd.DataFrame) -> tuple[torch.Tensor, torch.Tensor, torch.Tensor]:
        raw = frame[FEATURES].to_numpy(np.float32)
        normalized = (raw - means) / stds
        target = ((frame["target_lst_c"].to_numpy(np.float32) - target_mean) / target_std)
        return torch.tensor(normalized), torch.tensor(raw), torch.tensor(target)

    x_train, raw_train, y_train = tensors(train)
    x_test, raw_test, y_test = tensors(test)
    loader = DataLoader(TensorDataset(x_train, raw_train, y_train), batch_size=args.batch_size, shuffle=True)

    model = SurfaceEnergyPINN(len(FEATURES))
    optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-5)
    day_index = PHYSICS_INDEX["day_of_year"]
    history: list[dict] = []
    for epoch in range(args.epochs):
        model.train()
        data_loss_total = physics_loss_total = 0.0
        for x, raw, y in loader:
            x = x.requires_grad_(True)
            predicted_normalized = model(x)
            predicted_c = predicted_normalized * target_std + target_mean
            data_loss = torch.mean((predicted_normalized - y) ** 2)
            gradients = torch.autograd.grad(predicted_c.sum(), x, create_graph=True)[0]
            residual = surface_energy_residual(predicted_c, raw, gradients[:, day_index])
            physics_loss = torch.mean(residual ** 2)
            # Keep the physical residual a regulariser; target observations retain
            # priority because two flux terms are unavailable in the dataset.
            loss = data_loss + 0.03 * physics_loss
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            data_loss_total += float(data_loss.detach()) * len(x)
            physics_loss_total += float(physics_loss.detach()) * len(x)
        history.append({
            "epoch": epoch + 1,
            "data_mse": round(data_loss_total / len(train), 6),
            "physics_residual_mse": round(physics_loss_total / len(train), 6),
        })

    model.eval()
    with torch.no_grad():
        prediction = model(x_test) * target_std + target_mean
        truth = y_test * target_std + target_mean
        mae = torch.mean(torch.abs(prediction - truth)).item()
        rmse = torch.sqrt(torch.mean((prediction - truth) ** 2)).item()
        ss_res = torch.sum((prediction - truth) ** 2)
        ss_tot = torch.sum((truth - truth.mean()) ** 2)
        r2 = (1 - ss_res / ss_tot).item()

    artifact = {
        "metadata": {
            "version": "0.1.0-surface-energy-pinn-experimental",
            "algorithm": "Surface-energy-balance PINN prototype",
            "status": "experimental_not_operational",
            "trained_at": datetime.now(timezone.utc).isoformat(),
            "dataset": "synthetic_india_urban_heat_v1",
            "synthetic_data_warning": True,
            "training_rows": int(len(train)),
            "test_rows": int(len(test)),
            "holdout_cities": ["Bengaluru", "Delhi", "Mumbai"],
            "features": FEATURES,
            "surface_energy_constraint": "(1-albedo)S = epsilon*sigma*(Ts^4-Ta^4) + H + LE + storage_proxy",
            "available_terms": ["solar radiation", "albedo", "emissivity", "air temperature", "wind", "evapotranspiration", "date derivative"],
            "unobserved_terms": ["net longwave radiation", "ground heat flux", "same-pixel temporal pairs"],
            "metrics": {"mae_c": round(mae, 4), "rmse_c": round(rmse, 4), "r2": round(r2, 5)},
            "loss_history": history,
        },
        "normalization": {
            "feature_mean": means.round(8).tolist(), "feature_std": stds.round(8).tolist(),
            "target_mean": round(target_mean, 8), "target_std": round(target_std, 8),
        },
        "layers": export_network(model),
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(artifact, separators=(",", ":")), encoding="utf-8")
    print(json.dumps(artifact["metadata"], indent=2))


if __name__ == "__main__":
    main()
