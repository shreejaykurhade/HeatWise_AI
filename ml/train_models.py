"""Train and export the HeatWise two-stage XGBoost urban-heat model."""

from __future__ import annotations

import argparse
import json
import math
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd
import xgboost as xgb
from sklearn.metrics import (
    accuracy_score, average_precision_score, brier_score_loss,
    classification_report, confusion_matrix, f1_score, fbeta_score,
    mean_absolute_error, mean_squared_error, precision_score, r2_score,
    recall_score, roc_auc_score,
)
from xgboost import XGBClassifier, XGBRegressor

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "india_urban_heat_synthetic_dataset"
OUTPUT_DIR = ROOT / "ml" / "artifacts"

# Explicit allow-list prevents target-derived and scenario-outcome leakage.
BASE_FEATURES = [
    "latitude", "longitude", "elevation_m", "distance_to_coast_km",
    "ndvi", "ndbi", "ndwi", "ndmi", "savi", "evi", "satellite_albedo",
    "tree_cover_fraction", "impervious_surface_fraction", "building_density",
    "building_height_m", "building_height_std_m", "road_density_km_km2",
    "road_width_avg_m", "population_density_per_km2", "sky_view_factor",
    "urban_canyon_ratio", "floor_area_ratio", "green_space_fraction",
    "park_distance_m", "tree_species_diversity_index", "canopy_height_m",
    "water_distance_m", "green_distance_m", "air_temperature_c",
    "dew_point_c", "relative_humidity_pct", "wind_speed_ms", "rainfall_mm",
    "solar_radiation_wm2", "surface_pressure_hpa", "cloud_cover_pct",
    "evapotranspiration_mm", "albedo", "soil_moisture_pct",
    "surface_emissivity", "surface_material_index", "roof_material_index",
    "pavement_type_index", "pm25_ug_m3", "pm10_ug_m3", "no2_ug_m3",
    "so2_ug_m3", "co_ppm", "o3_ug_m3", "aerosol_optical_depth",
    "aerosol_index", "traffic_index", "industrial_proximity_index",
    "is_monsoon", "is_weekend",
]
DERIVED_FEATURES = ["month_sin", "month_cos", "day_sin", "day_cos"]
REGRESSION_FEATURES = BASE_FEATURES + DERIVED_FEATURES
CLASSIFICATION_FEATURES = REGRESSION_FEATURES + ["predicted_lst_c"]
HOLDOUT_CITIES = ["Bengaluru", "Delhi", "Mumbai"]
TUNING_CITIES = ["Chennai", "Pune"]
RANDOM_STATE = 42

# Positive means prediction cannot decrease as the feature increases; negative
# means it cannot increase. Complex relationships remain unconstrained.
REGRESSION_DIRECTIONS = {
    "ndvi": -1, "tree_cover_fraction": -1, "green_space_fraction": -1,
    "impervious_surface_fraction": 1, "building_density": 1,
    "water_distance_m": 1, "air_temperature_c": 1, "wind_speed_ms": -1,
    "solar_radiation_wm2": 1, "albedo": -1, "soil_moisture_pct": -1,
    "surface_material_index": 1,
}


def load_data() -> pd.DataFrame:
    paths = sorted(DATA_DIR.glob("india_urban_heat_part_*.csv"))
    if not paths:
        raise FileNotFoundError(f"No training CSVs found in {DATA_DIR}")
    needed = sorted(set(BASE_FEATURES + ["month", "day_of_year", "city", "target_lst_c", "hotspot_flag"]))
    data = pd.concat([pd.read_csv(path, usecols=needed) for path in paths], ignore_index=True)
    data["month_sin"] = np.sin(2 * np.pi * data["month"] / 12)
    data["month_cos"] = np.cos(2 * np.pi * data["month"] / 12)
    data["day_sin"] = np.sin(2 * np.pi * data["day_of_year"] / 365.25)
    data["day_cos"] = np.cos(2 * np.pi * data["day_of_year"] / 365.25)
    return data


def monotone_tuple(features: list[str], classification: bool = False) -> tuple[int, ...]:
    if classification:
        return tuple(1 if feature == "predicted_lst_c" else 0 for feature in features)
    return tuple(REGRESSION_DIRECTIONS.get(feature, 0) for feature in features)


def common_params(features: list[str], classification: bool = False) -> dict:
    return {
        "learning_rate": 0.055, "max_depth": 8, "min_child_weight": 8,
        "subsample": 0.86, "colsample_bytree": 0.86, "reg_alpha": 0.05,
        "reg_lambda": 2.0, "tree_method": "hist", "max_bin": 256,
        "monotone_constraints": monotone_tuple(features, classification),
        "random_state": RANDOM_STATE, "n_jobs": -1,
    }


def flatten_dump_tree(tree: dict, feature_index: dict[str, int]) -> list[dict]:
    raw_nodes: dict[int, dict] = {}

    def visit(node: dict) -> None:
        node_id = int(node["nodeid"])
        if "leaf" in node:
            raw_nodes[node_id] = {"v": round(float(node["leaf"]), 10), "leaf": True}
            return
        split = str(node["split"])
        if split in feature_index:
            index = feature_index[split]
        elif split.startswith("f") and split[1:].isdigit():
            index = int(split[1:])
        else:
            raise ValueError(f"Unknown XGBoost split feature: {split}")
        raw_nodes[node_id] = {
            "v": 0.0, "f": index, "t": round(float(node["split_condition"]), 10),
            "yes": int(node["yes"]), "no": int(node["no"]),
            "missing": int(node["missing"]), "leaf": False,
        }
        for child in node.get("children", []):
            visit(child)

    visit(tree)
    ordered_ids = sorted(raw_nodes)
    positions = {node_id: position for position, node_id in enumerate(ordered_ids)}
    result = []
    for node_id in ordered_ids:
        node = raw_nodes[node_id]
        if node["leaf"]:
            result.append({"v": node["v"], "f": 0, "t": 0.0, "l": 0, "r": 0, "m": True, "leaf": True})
        else:
            result.append({
                "v": 0.0, "f": node["f"], "t": node["t"],
                "l": positions[node["yes"]], "r": positions[node["no"]],
                "m": node["missing"] == node["yes"], "leaf": False,
            })
    return result


def tree_sum(trees: list[list[dict]], values: np.ndarray) -> float:
    total = 0.0
    for tree in trees:
        index = 0
        while not tree[index]["leaf"]:
            node = tree[index]
            value = values[node["f"]]
            if np.isnan(value):
                index = node["l"] if node["m"] else node["r"]
            else:
                index = node["l"] if value < node["t"] else node["r"]
        total += tree[index]["v"]
    return total


def export_model(model, features: list[str], sample: pd.DataFrame) -> dict:
    booster = model.get_booster()
    feature_index = {feature: i for i, feature in enumerate(features)}
    trees = [flatten_dump_tree(json.loads(raw), feature_index) for raw in booster.get_dump(dump_format="json")]
    values = sample.iloc[0].to_numpy(dtype=np.float32)
    raw_margin = float(booster.predict(xgb.DMatrix(sample.iloc[[0]]), output_margin=True)[0])
    baseline = raw_margin - tree_sum(trees, values)
    return {"features": features, "baseline": round(baseline, 10), "trees": trees}


def importance(model, features: list[str]) -> list[dict]:
    scores = model.get_booster().get_score(importance_type="gain")
    ranked = []
    for i, feature in enumerate(features):
        value = float(scores.get(feature, scores.get(f"f{i}", 0.0)))
        ranked.append({"feature": feature, "importance": round(value, 6)})
    return sorted(ranked, key=lambda item: item["importance"], reverse=True)[:15]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--max-estimators", type=int, default=500)
    args = parser.parse_args()
    data = load_data()
    train_mask = ~data["city"].isin(HOLDOUT_CITIES)
    test_mask = ~train_mask
    tune_mask = train_mask & data["city"].isin(TUNING_CITIES)
    fit_mask = train_mask & ~data["city"].isin(TUNING_CITIES)
    x_all = data[REGRESSION_FEATURES].astype("float32")
    y_temp = data["target_lst_c"].astype("float32")

    reg_params = common_params(REGRESSION_FEATURES)
    tuner_reg = XGBRegressor(
        **reg_params, n_estimators=args.max_estimators, objective="reg:squarederror",
        eval_metric="mae", early_stopping_rounds=35,
    )
    tuner_reg.fit(x_all.loc[fit_mask], y_temp.loc[fit_mask], eval_set=[(x_all.loc[tune_mask], y_temp.loc[tune_mask])], verbose=False)
    reg_trees = int(tuner_reg.best_iteration + 1)
    regressor = XGBRegressor(**reg_params, n_estimators=reg_trees, objective="reg:squarederror", eval_metric="mae")
    regressor.fit(x_all.loc[train_mask], y_temp.loc[train_mask], verbose=False)
    train_pred = regressor.predict(x_all.loc[train_mask]).astype("float32")
    test_pred = regressor.predict(x_all.loc[test_mask]).astype("float32")

    x_cls = x_all.copy()
    x_cls.loc[train_mask, "predicted_lst_c"] = train_pred
    x_cls.loc[test_mask, "predicted_lst_c"] = test_pred
    x_cls = x_cls[CLASSIFICATION_FEATURES]
    y_hot = data["hotspot_flag"].astype("int8")
    inner_y = y_hot.loc[fit_mask]
    scale = float((inner_y == 0).sum() / max(1, (inner_y == 1).sum()))
    cls_params = common_params(CLASSIFICATION_FEATURES, classification=True)
    tuner_cls = XGBClassifier(
        **cls_params, n_estimators=args.max_estimators, objective="binary:logistic",
        eval_metric="aucpr", scale_pos_weight=scale, early_stopping_rounds=35,
    )
    tuner_cls.fit(x_cls.loc[fit_mask], y_hot.loc[fit_mask], eval_set=[(x_cls.loc[tune_mask], y_hot.loc[tune_mask])], verbose=False)
    cls_trees = int(tuner_cls.best_iteration + 1)
    final_y = y_hot.loc[train_mask]
    final_scale = float((final_y == 0).sum() / max(1, (final_y == 1).sum()))
    classifier = XGBClassifier(
        **cls_params, n_estimators=cls_trees, objective="binary:logistic",
        eval_metric="aucpr", scale_pos_weight=final_scale,
    )
    classifier.fit(x_cls.loc[train_mask], final_y, verbose=False)

    tune_probabilities = tuner_cls.predict_proba(x_cls.loc[tune_mask])[:, 1]
    thresholds = np.linspace(0.1, 0.9, 161)
    threshold = float(max(thresholds, key=lambda t: fbeta_score(y_hot.loc[tune_mask], tune_probabilities >= t, beta=2)))
    probabilities = classifier.predict_proba(x_cls.loc[test_mask])[:, 1]
    predicted_hotspot = probabilities >= threshold
    regression_metrics = {
        "mae_c": round(float(mean_absolute_error(y_temp.loc[test_mask], test_pred)), 4),
        "rmse_c": round(float(math.sqrt(mean_squared_error(y_temp.loc[test_mask], test_pred))), 4),
        "r2": round(float(r2_score(y_temp.loc[test_mask], test_pred)), 5),
    }
    classification_metrics = {
        "threshold": round(threshold, 4), "threshold_objective": "F2 on tuning cities (recall-weighted)",
        "accuracy": round(float(accuracy_score(y_hot.loc[test_mask], predicted_hotspot)), 5),
        "precision": round(float(precision_score(y_hot.loc[test_mask], predicted_hotspot, zero_division=0)), 5),
        "recall": round(float(recall_score(y_hot.loc[test_mask], predicted_hotspot, zero_division=0)), 5),
        "f1": round(float(f1_score(y_hot.loc[test_mask], predicted_hotspot, zero_division=0)), 5),
        "roc_auc": round(float(roc_auc_score(y_hot.loc[test_mask], probabilities)), 5),
        "pr_auc": round(float(average_precision_score(y_hot.loc[test_mask], probabilities)), 5),
        "brier": round(float(brier_score_loss(y_hot.loc[test_mask], probabilities)), 5),
        "confusion_matrix": confusion_matrix(y_hot.loc[test_mask], predicted_hotspot).tolist(),
        "report": classification_report(y_hot.loc[test_mask], predicted_hotspot, output_dict=True, zero_division=0),
    }
    metadata = {
        "version": "2.0.0-xgboost", "algorithm": "XGBoost",
        "trained_at": datetime.now(timezone.utc).isoformat(),
        "dataset": "synthetic_india_urban_heat_v1", "synthetic_data_warning": True,
        "rows": int(len(data)), "training_rows": int(train_mask.sum()), "test_rows": int(test_mask.sum()),
        "holdout_cities": HOLDOUT_CITIES, "tuning_cities": TUNING_CITIES,
        "regressor_trees": reg_trees, "classifier_trees": cls_trees,
        "physics_constraints": REGRESSION_DIRECTIONS,
        "regression_metrics": regression_metrics, "classification_metrics": classification_metrics,
        "regression_importance": importance(regressor, REGRESSION_FEATURES),
        "classification_importance": importance(classifier, CLASSIFICATION_FEATURES),
        "feature_profile": {
            feature: {
                "median": round(float(data[feature].median()), 6),
                "min": round(float(data[feature].quantile(0.001)), 6),
                "max": round(float(data[feature].quantile(0.999)), 6),
            } for feature in BASE_FEATURES
        },
    }
    reg_export = export_model(regressor, REGRESSION_FEATURES, x_all.loc[test_mask])
    cls_export = export_model(classifier, CLASSIFICATION_FEATURES, x_cls.loc[test_mask])
    artifact = {"metadata": metadata, "regressor": reg_export, "classifier": cls_export}
    test_indices = list(x_all.loc[test_mask].index[:5])
    artifact["golden_cases"] = [
        {
            "features": {feature: round(float(data.loc[index, feature]), 7) for feature in BASE_FEATURES}
            | {"month": int(data.loc[index, "month"]), "day_of_year": int(data.loc[index, "day_of_year"])},
            "predicted_lst_c": round(float(test_pred[position]), 7),
            "hotspot_probability": round(float(probabilities[position]), 7),
        } for position, index in enumerate(test_indices)
    ]
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUTPUT_DIR / "heatwise_models.json").write_text(json.dumps(artifact, separators=(",", ":")), encoding="utf-8")
    (OUTPUT_DIR / "metrics.json").write_text(json.dumps(metadata, indent=2), encoding="utf-8")
    print(json.dumps(metadata, indent=2))


if __name__ == "__main__":
    main()
