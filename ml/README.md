# HeatWise two-model pipeline

This directory contains the local-only training pipeline and the compact artifacts used for production inference.

## Architecture

1. **XGBRegressor** predicts land-surface temperature from satellite indices, vegetation/forest proxies, built form, population density, industrial proximity, weather, pollution, water proximity, geography and seasonality.
2. **XGBClassifier** consumes the same inputs plus the regressor output and returns a hotspot probability and risk band.

The regressor uses monotonic constraints for physically expected directions. Chennai and Pune are used only for early stopping and threshold selection; Bengaluru, Delhi and Mumbai remain untouched until final testing.

Training uses 12 cities. Bengaluru, Delhi and Mumbai are held out completely for spatial generalization testing. Target-derived and intervention-outcome columns are excluded from inputs.

## Train locally

```powershell
python ml/train_models.py
```

The command reads all five synthetic dataset parts and writes:

- `ml/artifacts/heatwise_models.json` — portable boosted-tree inference artifact
- `ml/artifacts/metrics.json` — held-out-city metrics and global importance rankings

The training dataset is synthetic and is suitable for pipeline demonstration only. Replace it with aligned Landsat/ECOSTRESS, Sentinel-2, ERA5/CPCB, OSM, GHSL/WorldPop and industrial-location observations before making real-world accuracy claims.
