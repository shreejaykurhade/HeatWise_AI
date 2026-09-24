"""
Synthetic India Urban Heat Dataset Generator
=============================================
Generates a large, physically-plausible SYNTHETIC tabular dataset for the
Urban Heat Mitigation AIML problem statement. This is NOT real Landsat /
Sentinel-2 / ERA5 / ECOSTRESS / CPCB data — it is simulated data built from
realistic city coordinates and known climate-normal ranges, with engineered
relationships between variables so an MLP can learn meaningful structure.

Run: python3 gen_dataset.py <n_rows> <n_parts> <out_dir>
"""
import sys
import os
import numpy as np
import pandas as pd

SEED = 42
rng = np.random.default_rng(SEED)

# ----------------------------------------------------------------------
# 1. City definitions (real coordinates + approximate climate normals,
#    used only as plausible synthetic-generation anchors, not live data)
# ----------------------------------------------------------------------
CITIES = [
    # name, state, lat, lon, elev_m, coastal, climate_zone,
    # summer_mean_C, winter_mean_C, monsoon_mean_C, humidity_base_pct,
    # pop_density_mean, dist_coast_km
    ("Mumbai",      "Maharashtra",    19.0760, 72.8777,   11, True,  "Tropical_Wet_Dry",     32, 24, 29, 75, 27000,   2),
    ("Delhi",       "Delhi",          28.7041, 77.1025,  216, False, "Semi_Arid",            38, 14, 31, 45, 11300, 900),
    ("Bengaluru",   "Karnataka",      12.9716, 77.5946,  920, False, "Tropical_Savanna",     29, 20, 24, 60, 12000, 300),
    ("Chennai",     "Tamil_Nadu",     13.0827, 80.2707,    6, True,  "Tropical_Wet_Dry",     35, 25, 29, 72, 15000,   3),
    ("Hyderabad",   "Telangana",      17.3850, 78.4867,  542, False, "Tropical_Savanna",     33, 22, 27, 55,  9000, 500),
    ("Kolkata",     "West_Bengal",    22.5726, 88.3639,    9, True,  "Tropical_Wet_Dry",     34, 20, 30, 78, 24000,  60),
    ("Ahmedabad",   "Gujarat",        23.0225, 72.5714,   53, False, "Semi_Arid",            38, 17, 30, 48, 12500, 150),
    ("Pune",        "Maharashtra",    18.5204, 73.8567,  560, False, "Tropical_Savanna",     31, 16, 25, 55, 10500, 120),
    ("Jaipur",      "Rajasthan",      26.9124, 75.7873,  431, False, "Semi_Arid",            39, 12, 30, 40,  6000, 700),
    ("Lucknow",     "Uttar_Pradesh",  26.8467, 80.9462,  123, False, "Humid_Subtropical",    37, 12, 30, 55,  8500, 800),
    ("Nagpur",      "Maharashtra",    21.1458, 79.0882,  310, False, "Semi_Arid",            40, 16, 28, 45,  7500, 550),
    ("Surat",       "Gujarat",        21.1702, 72.8311,   13, True,  "Tropical_Wet_Dry",     34, 20, 29, 70, 14000,  20),
    ("Bhopal",      "Madhya_Pradesh", 23.2599, 77.4126,  527, False, "Semi_Arid",            35, 14, 27, 50,  6500, 650),
    ("Indore",      "Madhya_Pradesh", 22.7196, 75.8577,  553, False, "Semi_Arid",            34, 14, 26, 48,  8000, 600),
    ("Chandigarh",  "Chandigarh",     30.7333, 76.7794,  321, False, "Humid_Subtropical",    36, 10, 29, 55,  9500, 850),
]
CITY_DF = pd.DataFrame(CITIES, columns=[
    "city", "state", "c_lat", "c_lon", "c_elev", "coastal", "climate_zone",
    "summer_t", "winter_t", "monsoon_t", "humid_base", "pop_density_base", "dist_coast"
])
N_CITIES = len(CITY_DF)

LAND_USE_TYPES = np.array(["Residential", "Commercial", "Industrial", "Mixed_Use", "Vegetated_Open", "Water_Adjacent"])
LAND_USE_P = np.array([0.32, 0.18, 0.12, 0.18, 0.15, 0.05])


def month_to_season(month):
    # Indian meteorological seasons
    season = np.select(
        [np.isin(month, [12, 1, 2]), np.isin(month, [3, 4, 5]),
         np.isin(month, [6, 7, 8, 9]), np.isin(month, [10, 11])],
        ["Winter", "Summer", "Monsoon", "Post_Monsoon"],
        default="Summer"
    )
    return season


def gen_chunk(n, part_seed):
    r = np.random.default_rng(part_seed)

    # ---------------- geography / time ----------------
    city_idx = r.integers(0, N_CITIES, size=n)
    city_row = CITY_DF.iloc[city_idx].reset_index(drop=True)

    jitter_deg = 0.12  # ~13 km jitter around city centre
    latitude = city_row["c_lat"].values + r.normal(0, jitter_deg / 2.5, n)
    longitude = city_row["c_lon"].values + r.normal(0, jitter_deg / 2.5, n)
    dist_from_center_km = np.sqrt(((latitude - city_row["c_lat"].values) * 111) ** 2 +
                                   ((longitude - city_row["c_lon"].values) * 111) ** 2)
    elevation_m = np.clip(city_row["c_elev"].values + r.normal(0, 15, n), 0, None)

    start = np.datetime64("2022-01-01")
    day_offset = r.integers(0, 365 * 3, size=n)
    date = start + day_offset.astype("timedelta64[D]")
    date_pd = pd.to_datetime(date)
    year = date_pd.year.values
    month = date_pd.month.values
    day_of_year = date_pd.dayofyear.values
    day_of_week = date_pd.dayofweek.values
    is_weekend = (day_of_week >= 5).astype(int)
    season = month_to_season(month)
    is_monsoon = (season == "Monsoon").astype(int)

    # ---------------- land use / morphology ----------------
    land_use = r.choice(LAND_USE_TYPES, size=n, p=LAND_USE_P)
    # base intensity of built-up-ness per land use type
    built_base = np.select(
        [land_use == "Residential", land_use == "Commercial", land_use == "Industrial",
         land_use == "Mixed_Use", land_use == "Vegetated_Open", land_use == "Water_Adjacent"],
        [0.55, 0.75, 0.80, 0.65, 0.15, 0.25]
    )
    # closer to center -> denser
    center_effect = np.clip(1 - dist_from_center_km / 25, 0, 1)
    impervious_surface_fraction = np.clip(built_base * 0.6 + center_effect * 0.35 + r.normal(0, 0.06, n), 0.02, 0.98)
    tree_cover_fraction = np.clip(0.55 - impervious_surface_fraction * 0.5 + r.normal(0, 0.08, n), 0.0, 0.9)
    green_space_fraction = np.clip(tree_cover_fraction * 0.6 + r.normal(0, 0.05, n), 0, 0.85)

    building_density = np.clip(built_base * 0.7 + center_effect * 0.25 + r.normal(0, 0.07, n), 0.02, 0.95)
    building_height_m = np.clip(8 + building_density * 55 + center_effect * 25 + r.normal(0, 8, n), 3, 180)
    building_height_std_m = np.clip(building_height_m * 0.15 + r.normal(0, 2, n), 1, 40)
    road_density_km_km2 = np.clip(3 + built_base * 9 + center_effect * 4 + r.normal(0, 1.2, n), 0.5, 22)
    road_width_avg_m = np.clip(6 + center_effect * 10 + r.normal(0, 2, n), 3, 30)
    population_density_per_km2 = np.clip(
        city_row["pop_density_base"].values * (0.4 + 0.9 * center_effect) * (0.6 + built_base) + r.normal(0, 1200, n),
        200, 45000)
    sky_view_factor = np.clip(1 - (building_height_m / 200) - (building_density * 0.3) + r.normal(0, 0.05, n), 0.15, 0.98)
    urban_canyon_ratio = np.clip(building_height_m / (road_width_avg_m + 5) + r.normal(0, 0.3, n), 0.1, 12)
    floor_area_ratio = np.clip(building_density * 3.5 + center_effect * 1.5 + r.normal(0, 0.4, n), 0.1, 8)

    park_distance_m = np.clip(200 + (1 - green_space_fraction) * 2500 + r.exponential(300, n), 20, 6000)
    tree_species_diversity_index = np.clip(tree_cover_fraction * 0.9 + r.normal(0, 0.1, n), 0.05, 1.0)
    canopy_height_m = np.clip(4 + tree_cover_fraction * 14 + r.normal(0, 2, n), 1, 30)
    water_distance_m = np.where(
        land_use == "Water_Adjacent",
        np.clip(r.exponential(150, n), 10, 800),
        np.clip(city_row["dist_coast"].values * 40 + r.exponential(1500, n), 50, 25000)
    )
    green_distance_m = np.clip(150 + (1 - tree_cover_fraction) * 2000 + r.exponential(250, n), 20, 5000)

    # ---------------- satellite-style indices ----------------
    ndvi = np.clip(0.05 + tree_cover_fraction * 0.75 + green_space_fraction * 0.15 - r.normal(0, 0.04, n), -0.1, 0.92)
    ndbi = np.clip(-0.1 + impervious_surface_fraction * 0.6 + r.normal(0, 0.05, n), -0.35, 0.65)
    ndwi = np.clip(-0.2 + (1 / (1 + water_distance_m / 500)) * 0.7 + r.normal(0, 0.05, n), -0.6, 0.75)
    ndmi = np.clip(ndvi * 0.5 - ndbi * 0.3 + r.normal(0, 0.05, n), -0.5, 0.6)
    savi = np.clip(ndvi * 0.85 + r.normal(0, 0.03, n), -0.1, 0.85)
    evi = np.clip(ndvi * 0.75 + r.normal(0, 0.03, n), -0.1, 0.8)
    satellite_albedo = np.clip(0.08 + impervious_surface_fraction * 0.22 - ndvi * 0.08 + r.normal(0, 0.02, n), 0.04, 0.45)

    # ---------------- meteorology (seasonal, city-anchored) ----------------
    seasonal_base = np.select(
        [season == "Summer", season == "Monsoon", season == "Post_Monsoon", season == "Winter"],
        [city_row["summer_t"].values, city_row["monsoon_t"].values,
         (city_row["monsoon_t"].values + city_row["winter_t"].values) / 2, city_row["winter_t"].values]
    )
    doy_wave = np.sin(2 * np.pi * (day_of_year - 80) / 365)
    air_temperature_c = np.clip(seasonal_base + doy_wave * 1.5 - elevation_m / 300 + r.normal(0, 1.8, n), 5, 48)

    humidity_season_adj = np.select(
        [season == "Monsoon", season == "Winter"], [18, -8], default=0
    )
    relative_humidity_pct = np.clip(city_row["humid_base"].values + humidity_season_adj + r.normal(0, 6, n), 10, 98)
    dew_point_c = np.clip(air_temperature_c - (100 - relative_humidity_pct) / 5 + r.normal(0, 1, n), -5, 32)

    wind_speed_ms = np.clip(2.5 + (1 - center_effect) * 1.5 + r.exponential(1.0, n) -
                             (building_density * 1.2), 0.1, 14)
    wind_direction_deg = r.uniform(0, 360, n)
    rainfall_mm = np.where(
        season == "Monsoon",
        r.gamma(2.0, 12, n),
        np.where(season == "Post_Monsoon", r.gamma(1.2, 4, n), r.gamma(0.4, 2, n))
    )
    cloud_cover_pct = np.clip(np.where(season == "Monsoon", r.normal(65, 20, n), r.normal(25, 18, n)), 0, 100)
    solar_radiation_wm2 = np.clip(750 - cloud_cover_pct * 4.2 + doy_wave * 60 + r.normal(0, 40, n), 60, 1050)
    surface_pressure_hpa = np.clip(1013 - elevation_m * 0.12 + r.normal(0, 3, n), 850, 1020)
    soil_moisture_pct = np.clip(12 + rainfall_mm * 0.6 - impervious_surface_fraction * 15 + r.normal(0, 4, n), 1, 55)
    evapotranspiration_mm = np.clip(1.5 + ndvi * 4 + soil_moisture_pct * 0.05 - impervious_surface_fraction * 2 +
                                     r.normal(0, 0.4, n), 0.1, 8)

    # ---------------- surface characteristics ----------------
    albedo = np.clip(satellite_albedo + r.normal(0, 0.01, n), 0.04, 0.45)
    surface_emissivity = np.clip(0.98 - impervious_surface_fraction * 0.06 + r.normal(0, 0.01, n), 0.88, 0.99)
    surface_material_index = np.clip(impervious_surface_fraction * 10 + r.normal(0, 0.5, n), 0, 10)
    roof_material_index = np.clip(built_base * 10 - tree_cover_fraction * 2 + r.normal(0, 0.6, n), 0, 10)
    pavement_type_index = np.clip(road_density_km_km2 * 0.4 + r.normal(0, 0.5, n), 0, 10)

    # ---------------- pollution / atmosphere ----------------
    traffic_index = np.clip(road_density_km_km2 * 4 + population_density_per_km2 / 3000 +
                             (1 - is_weekend) * 5 + r.normal(0, 4, n), 0, 100)
    industrial_proximity_index = np.where(
        land_use == "Industrial",
        np.clip(r.normal(85, 8, n), 40, 100),
        np.clip(r.normal(30, 15, n), 0, 90)
    )
    winter_pollution_boost = np.where(season == "Winter", 1.6, np.where(season == "Monsoon", 0.55, 1.0))
    pm25_ug_m3 = np.clip((25 + traffic_index * 0.9 + industrial_proximity_index * 0.4 -
                           wind_speed_ms * 4 - ndvi * 15) * winter_pollution_boost + r.normal(0, 8, n), 3, 400)
    pm10_ug_m3 = np.clip(pm25_ug_m3 * 1.7 + r.normal(0, 10, n), 5, 550)
    no2_ug_m3 = np.clip(traffic_index * 0.6 + industrial_proximity_index * 0.25 + r.normal(0, 5, n), 2, 180)
    so2_ug_m3 = np.clip(industrial_proximity_index * 0.35 + r.normal(0, 3, n), 1, 120)
    co_ppm = np.clip(0.3 + traffic_index * 0.02 + r.normal(0, 0.15, n), 0.05, 6)
    o3_ug_m3 = np.clip(40 + solar_radiation_wm2 * 0.03 - no2_ug_m3 * 0.1 + r.normal(0, 8, n), 5, 180)
    aerosol_optical_depth = np.clip(0.15 + pm25_ug_m3 / 300 + r.normal(0, 0.05, n), 0.02, 1.8)
    aerosol_index = np.clip(aerosol_optical_depth * 2.5 + r.normal(0, 0.2, n), 0, 5)

    # ---------------- LST & heat-stress (derived — leakage-prone) ----------------
    urban_heat_contrib = (impervious_surface_fraction * 6.5 + building_density * 3.0 +
                           surface_material_index * 0.4 - ndvi * 5.5 - tree_cover_fraction * 3.0 -
                           (1 / (1 + water_distance_m / 400)) * 2.0)
    lst_c = np.clip(air_temperature_c + urban_heat_contrib + (solar_radiation_wm2 - 500) / 250 -
                     wind_speed_ms * 0.3 + r.normal(0, 1.2, n), 8, 62)
    diurnal_temp_range_c = np.clip(9 - sky_view_factor * 2 + building_density * 2 + r.normal(0, 1, n), 2, 16)
    night_lst_c = np.clip(lst_c - diurnal_temp_range_c - tree_cover_fraction * 1.5 + r.normal(0, 0.8, n), 5, 45)
    rural_reference_c = seasonal_base - 1.0
    uhi_intensity_c = np.clip(lst_c - rural_reference_c + r.normal(0, 0.5, n), -3, 12)

    hi_c = air_temperature_c + 0.05 * (relative_humidity_pct - 40) * np.clip(air_temperature_c - 20, 0, None) / 15
    heat_index_c = np.clip(hi_c, air_temperature_c - 2, air_temperature_c + 14)
    wbgt_c = np.clip(0.7 * dew_point_c + 0.2 * lst_c + 0.1 * air_temperature_c, 5, 45)

    heat_stress_label = pd.cut(
        heat_index_c, bins=[-100, 27, 32, 39, 46, 200],
        labels=["Low", "Moderate", "High", "Very_High", "Extreme"]
    ).astype(str)
    city_p95 = pd.Series(lst_c).groupby(city_idx).transform(lambda s: np.nanpercentile(s, 90))
    hotspot_flag = (lst_c >= city_p95.values).astype(int)

    # ---------------- cooling intervention scenarios ----------------
    tree_addition_pct = np.clip(r.uniform(0, 40, n) * (1 - tree_cover_fraction), 0, 40)
    cool_roof_pct = np.clip(r.uniform(0, 60, n) * impervious_surface_fraction, 0, 60)
    albedo_change = np.clip(r.uniform(0, 0.25, n) * (impervious_surface_fraction > 0.3), 0, 0.25)
    water_area_add_pct = np.clip(r.uniform(0, 15, n) * (1 - np.minimum(green_space_fraction, 1)), 0, 15)
    green_roof_pct = np.clip(r.uniform(0, 30, n) * built_base, 0, 30)
    permeable_pavement_pct = np.clip(r.uniform(0, 50, n) * (road_density_km_km2 / 22), 0, 50)

    estimated_tree_cooling_c = np.clip(0.045 * tree_addition_pct + r.normal(0, 0.1, n), 0, 3.0)
    estimated_roof_cooling_c = np.clip(0.02 * cool_roof_pct + r.normal(0, 0.08, n), 0, 2.0)
    estimated_albedo_cooling_c = np.clip(4.0 * albedo_change + r.normal(0, 0.08, n), 0, 1.5)
    estimated_water_cooling_c = np.clip(0.06 * water_area_add_pct + r.normal(0, 0.05, n), 0, 1.2)
    estimated_greenroof_cooling_c = np.clip(0.025 * green_roof_pct + r.normal(0, 0.05, n), 0, 1.0)
    interaction_discount = 0.9  # diminishing returns when combining interventions
    total_scenario_cooling_c = np.clip(
        (estimated_tree_cooling_c + estimated_roof_cooling_c + estimated_albedo_cooling_c +
         estimated_water_cooling_c + estimated_greenroof_cooling_c) * interaction_discount, 0, 7)
    scenario_lst_c = np.clip(lst_c - total_scenario_cooling_c, 5, 62)

    # ---------------- target ----------------
    target_lst_c = lst_c  # primary regression target (identical to lst_c -> lst_c is leakage if used as input)

    df = pd.DataFrame({
        "record_id": np.arange(n) + part_seed * 10_000_000,
        "city": city_row["city"].values,
        "state": city_row["state"].values,
        "climate_zone": city_row["climate_zone"].values,
        "latitude": latitude, "longitude": longitude, "elevation_m": elevation_m,
        "distance_to_coast_km": city_row["dist_coast"].values,
        "date": date_pd.strftime("%Y-%m-%d"),
        "year": year, "month": month, "day_of_year": day_of_year,
        "season": season, "is_monsoon": is_monsoon,
        "day_of_week": day_of_week, "is_weekend": is_weekend,

        "ndvi": ndvi, "ndbi": ndbi, "ndwi": ndwi, "ndmi": ndmi, "savi": savi, "evi": evi,
        "satellite_albedo": satellite_albedo,

        "land_use_type": land_use,
        "tree_cover_fraction": tree_cover_fraction,
        "impervious_surface_fraction": impervious_surface_fraction,
        "building_density": building_density,
        "building_height_m": building_height_m,
        "building_height_std_m": building_height_std_m,
        "road_density_km_km2": road_density_km_km2,
        "road_width_avg_m": road_width_avg_m,
        "population_density_per_km2": population_density_per_km2,
        "sky_view_factor": sky_view_factor,
        "urban_canyon_ratio": urban_canyon_ratio,
        "floor_area_ratio": floor_area_ratio,

        "green_space_fraction": green_space_fraction,
        "park_distance_m": park_distance_m,
        "tree_species_diversity_index": tree_species_diversity_index,
        "canopy_height_m": canopy_height_m,
        "water_distance_m": water_distance_m,
        "green_distance_m": green_distance_m,

        "air_temperature_c": air_temperature_c,
        "dew_point_c": dew_point_c,
        "relative_humidity_pct": relative_humidity_pct,
        "wind_speed_ms": wind_speed_ms,
        "wind_direction_deg": wind_direction_deg,
        "rainfall_mm": rainfall_mm,
        "solar_radiation_wm2": solar_radiation_wm2,
        "surface_pressure_hpa": surface_pressure_hpa,
        "cloud_cover_pct": cloud_cover_pct,
        "evapotranspiration_mm": evapotranspiration_mm,

        "albedo": albedo,
        "soil_moisture_pct": soil_moisture_pct,
        "surface_emissivity": surface_emissivity,
        "surface_material_index": surface_material_index,
        "roof_material_index": roof_material_index,
        "pavement_type_index": pavement_type_index,

        "pm25_ug_m3": pm25_ug_m3, "pm10_ug_m3": pm10_ug_m3, "no2_ug_m3": no2_ug_m3,
        "so2_ug_m3": so2_ug_m3, "co_ppm": co_ppm, "o3_ug_m3": o3_ug_m3,
        "aerosol_optical_depth": aerosol_optical_depth, "aerosol_index": aerosol_index,
        "traffic_index": traffic_index, "industrial_proximity_index": industrial_proximity_index,

        "lst_c": lst_c, "night_lst_c": night_lst_c, "diurnal_temp_range_c": diurnal_temp_range_c,
        "uhi_intensity_c": uhi_intensity_c, "heat_index_c": heat_index_c, "wbgt_c": wbgt_c,
        "heat_stress_label": heat_stress_label, "hotspot_flag": hotspot_flag,

        "tree_addition_pct": tree_addition_pct, "cool_roof_pct": cool_roof_pct,
        "albedo_change": albedo_change, "water_area_add_pct": water_area_add_pct,
        "green_roof_pct": green_roof_pct, "permeable_pavement_pct": permeable_pavement_pct,
        "estimated_tree_cooling_c": estimated_tree_cooling_c,
        "estimated_roof_cooling_c": estimated_roof_cooling_c,
        "estimated_albedo_cooling_c": estimated_albedo_cooling_c,
        "estimated_water_cooling_c": estimated_water_cooling_c,
        "estimated_greenroof_cooling_c": estimated_greenroof_cooling_c,
        "total_scenario_cooling_c": total_scenario_cooling_c,
        "scenario_lst_c": scenario_lst_c,

        "target_lst_c": target_lst_c,
    })

    # round floats for smaller file size
    float_cols = df.select_dtypes(include=["float64", "float32"]).columns
    df[float_cols] = df[float_cols].round(3)
    return df


def main():
    n_total = int(sys.argv[1]) if len(sys.argv) > 1 else 500_000
    n_parts = int(sys.argv[2]) if len(sys.argv) > 2 else 5
    out_dir = sys.argv[3] if len(sys.argv) > 3 else "."
    os.makedirs(out_dir, exist_ok=True)

    per_part = n_total // n_parts
    remainder = n_total - per_part * n_parts

    total_rows = 0
    ncols = None
    for i in range(n_parts):
        n = per_part + (remainder if i == n_parts - 1 else 0)
        df = gen_chunk(n, part_seed=SEED + i)
        ncols = df.shape[1]
        fname = os.path.join(out_dir, f"india_urban_heat_part_{i+1:02d}.csv")
        df.to_csv(fname, index=False)
        total_rows += len(df)
        size_mb = os.path.getsize(fname) / (1024 * 1024)
        print(f"Part {i+1}: {len(df):,} rows, {size_mb:.1f} MB -> {fname}")

    print(f"TOTAL_ROWS={total_rows}")
    print(f"TOTAL_COLS={ncols}")


if __name__ == "__main__":
    main()
