# India Urban Heat Synthetic Dataset — Data Dictionary

## ⚠️ SYNTHETIC DATA — READ FIRST

This is **simulated / synthetic data generated with NumPy**, built for model development
and experimentation on the Urban Heat Mitigation AIML problem statement.

- It is **NOT** real Landsat 8, Sentinel-2, ECOSTRESS, ERA5, or CPCB observational data.
- City **coordinates**, **climate normals** (approximate summer/winter/monsoon means,
  humidity, coastal distance) and **spatial jitter** are anchored to real, publicly known
  values for realism, but every row's actual feature values are simulated with randomized
  noise and engineered formulas — not pulled from any live satellite/meteorological API.
- Relationships between variables (e.g. NDVI ↓ → LST ↑, impervious surface ↑ → LST ↑) are
  built to be **physically plausible**, so an MLP has real structure to learn, but they are
  approximations, not calibrated physical models (no SOLWEIG/InVEST radiative transfer was run).
- Do not present any value in this dataset as an actual satellite or ground-station measurement.
- For the final real-world problem statement, replace/augment this with actual
  Landsat 8 LST, ECOSTRESS LST, Sentinel-2 LULC, ERA5/CPCB meteorology, OSM, and GHSL data.

## Files

| File | Rows | Notes |
|---|---|---|
| `india_urban_heat_part_01.csv` … `part_05.csv` | 100,000 each | 500,000 rows total, 89 columns each |
| `india_urban_heat_synthetic_dataset.zip` | — | All 5 parts zipped together |

Load and concatenate in pandas:
```python
import pandas as pd, glob
df = pd.concat([pd.read_csv(f) for f in sorted(glob.glob("india_urban_heat_part_*.csv"))],
                ignore_index=True)
```

## Cities covered (15)

Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, Kolkata, Ahmedabad, Pune, Jaipur, Lucknow,
Nagpur, Surat, Bhopal, Indore, Chandigarh — spanning coastal, semi-arid, tropical-savanna and
humid-subtropical climate zones, 3 years of dates (2022–2024), all four Indian meteorological
seasons (Winter, Summer, Monsoon, Post-Monsoon).

## Column groups

**Identifiers / geography / time (16):** `record_id, city, state, climate_zone, latitude,
longitude, elevation_m, distance_to_coast_km, date, year, month, day_of_year, season,
is_monsoon, day_of_week, is_weekend`

**Satellite-derived indices (7):** `ndvi, ndbi, ndwi, ndmi, savi, evi, satellite_albedo`

**Urban morphology (13):** `land_use_type, tree_cover_fraction, impervious_surface_fraction,
building_density, building_height_m, building_height_std_m, road_density_km_km2,
road_width_avg_m, population_density_per_km2, sky_view_factor, urban_canyon_ratio,
floor_area_ratio`

**Vegetation (6):** `green_space_fraction, park_distance_m, tree_species_diversity_index,
canopy_height_m, water_distance_m, green_distance_m`

**Meteorological (10):** `air_temperature_c, dew_point_c, relative_humidity_pct,
wind_speed_ms, wind_direction_deg, rainfall_mm, solar_radiation_wm2, surface_pressure_hpa,
cloud_cover_pct, evapotranspiration_mm`

**Surface characteristics (6):** `albedo, soil_moisture_pct, surface_emissivity,
surface_material_index, roof_material_index, pavement_type_index`

**Atmospheric / pollution (10):** `pm25_ug_m3, pm10_ug_m3, no2_ug_m3, so2_ug_m3, co_ppm,
o3_ug_m3, aerosol_optical_depth, aerosol_index, traffic_index, industrial_proximity_index`

**Heat-stress / derived outputs (8) — ⚠️ target-leakage risk:** `lst_c, night_lst_c,
diurnal_temp_range_c, uhi_intensity_c, heat_index_c, wbgt_c, heat_stress_label, hotspot_flag`

**Cooling-intervention scenario (13) — ⚠️ target-leakage risk:** `tree_addition_pct,
cool_roof_pct, albedo_change, water_area_add_pct, green_roof_pct, permeable_pavement_pct,
estimated_tree_cooling_c, estimated_roof_cooling_c, estimated_albedo_cooling_c,
estimated_water_cooling_c, estimated_greenroof_cooling_c, total_scenario_cooling_c,
scenario_lst_c`

**Primary regression target (1):** `target_lst_c` (identical to `lst_c` — the value the MLP
must predict from the input features)

## Recommended 25 input features (matches Experiment 2/3 spec)

```
ndvi, ndbi, ndwi, ndmi, tree_cover_fraction, impervious_surface_fraction,
building_density, building_height_m, road_density_km_km2, water_distance_m,
green_distance_m, sky_view_factor, air_temperature_c, relative_humidity_pct,
wind_speed_ms, rainfall_mm, solar_radiation_wm2, surface_pressure_hpa,
albedo, soil_moisture_pct, surface_emissivity, pm25_ug_m3, aerosol_index,
traffic_index, elevation_m
```

You can extend this set with any other non-leakage column above (e.g.
`population_density_per_km2`, `building_height_std_m`, `land_use_type` one-hot encoded,
`season` one-hot encoded) if you want a richer-than-25 feature set — just keep leakage
columns out.

## ⚠️ Columns to EXCLUDE from model inputs (target leakage)

These are directly derived from, or contain the same information as, `target_lst_c`:

```
lst_c, night_lst_c, diurnal_temp_range_c, uhi_intensity_c, heat_index_c, wbgt_c,
heat_stress_label, hotspot_flag, scenario_lst_c, total_scenario_cooling_c,
estimated_tree_cooling_c, estimated_roof_cooling_c, estimated_albedo_cooling_c,
estimated_water_cooling_c, estimated_greenroof_cooling_c
```

`heat_stress_label` and `hotspot_flag` are safe to use as **targets** for a future
classification experiment, but not as inputs to the LST regression.

`tree_addition_pct, cool_roof_pct, albedo_change, water_area_add_pct, green_roof_pct,
permeable_pavement_pct` (the raw scenario percentages, as opposed to their *_cooling_c
estimates) are **not** leakage — they're independent randomized scenario levers and are fine
to use as inputs if you later build a "predict cooling from intervention %" model.

## Other supported future tasks

- **Heat-stress classification** → target `heat_stress_label`
- **Hotspot classification** → target `hotspot_flag`
- **Cooling-intervention effect modeling** → inputs: the 6 scenario-percentage columns +
  morphology/vegetation columns; target: `total_scenario_cooling_c` or `scenario_lst_c`

## Reproducibility

Generated with NumPy `default_rng(seed=42)` (per-part seeds 42–46). Re-running the generator
script with the same seeds reproduces this exact dataset.
