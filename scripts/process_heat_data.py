import os
import glob
import json
import numpy as np
import pandas as pd

# List of prominent neighborhoods for each city
CITY_NEIGHBORHOODS = {
    "Mumbai": [
        {"name": "Dharavi Junction", "driver": "Impervious cover & high density"},
        {"name": "Bandra East", "driver": "Low canopy & transit corridor"},
        {"name": "Kurla West", "driver": "Heat storage & built density"},
        {"name": "Chembur Colony", "driver": "Low ventilation & industrial proximity"},
        {"name": "Andheri East (MIDC)", "driver": "Commercial roof fraction & traffic"},
        {"name": "Dadar Central", "driver": "High population & asphalt cover"},
        {"name": "Malad Industrial", "driver": "Low albedo & metallic roofing"},
        {"name": "Ghatkopar West", "driver": "Urban canyon & low sky view"}
    ],
    "Delhi": [
        {"name": "Anand Vihar ISBT", "driver": "Traffic exhaust & low vegetation"},
        {"name": "Okhla Industrial Phase II", "driver": "Impervious asphalt & roof heat storage"},
        {"name": "Chandni Chowk", "driver": "High building density & low sky view"},
        {"name": "Connaught Place Outer", "driver": "Asphalt radiation & vehicular heat"},
        {"name": "Rohini Sector 10", "driver": "Concrete cover & dry air advection"},
        {"name": "Dwarka Sector 6", "driver": "Wide paved corridors & low canopy"},
        {"name": "Karol Bagh Market", "driver": "Dense commercial roofing & AC heat rejection"},
        {"name": "Laxmi Nagar", "driver": "High population density & low albedo"}
    ],
    "Bengaluru": [
        {"name": "Peenya Industrial Area", "driver": "Low canopy cover & metal roofs"},
        {"name": "Electronic City Phase 1", "driver": "Paved glass-building corridors"},
        {"name": "Whitefield IT Hub", "driver": "Asphalt parking & reduced green buffer"},
        {"name": "Majestic Bus Terminal", "driver": "High diesel traffic & concrete surface"},
        {"name": "Marathahalli Junction", "driver": "High vehicular congestion & low shade"},
        {"name": "Koramangala 5th Block", "driver": "Dense built-up fraction"},
        {"name": "Hebbal Flyover Junction", "driver": "Extensive concrete infrastructure"},
        {"name": "Yeshwanthpur Industrial", "driver": "Roof heat retention & low ventilation"}
    ],
    "Chennai": [
        {"name": "T. Nagar Commercial Hub", "driver": "Impervious cover & dense retail roofs"},
        {"name": "Guindy Industrial Estate", "driver": "Low canopy & dark industrial roofing"},
        {"name": "George Town / Broadway", "driver": "Narrow urban canyons & high density"},
        {"name": "Ambattur Industrial Area", "driver": "Heat storage in pavements & metal sheds"},
        {"name": "Velachery Bypass", "driver": "Paved wetlands & vehicular heat"},
        {"name": "Royapettah Junction", "driver": "High thermal mass & low sky view"},
        {"name": "Central Railway Corridor", "driver": "Exposed ballast & concrete platforms"},
        {"name": "Anna Nagar Roundtana", "driver": "Asphalt intersection & retail density"}
    ],
    "Hyderabad": [
        {"name": "Balanagar Industrial Area", "driver": "Low vegetation & dense factories"},
        {"name": "Charminar Old City", "driver": "Narrow streets & high population density"},
        {"name": "Kukatpally Housing Board", "driver": "High concrete fraction & sparse trees"},
        {"name": "Hitec City Cyber Towers", "driver": "Asphalt & glass heat reflection"},
        {"name": "Secunderabad Station", "driver": "Extensive metal sheds & transit heat"},
        {"name": "Ameerpet Center", "driver": "Commercial density & low sky view factor"},
        {"name": "Uppal Industrial Zone", "driver": "Industrial heat & low moisture"},
        {"name": "Sanathnagar", "driver": "Manufacturing shed roofs & low albedo"}
    ],
    "Kolkata": [
        {"name": "Burrabazar Wholesale Hub", "driver": "High building density & trapped heat"},
        {"name": "Howrah Station Approach", "driver": "Massive concrete surfaces & traffic"},
        {"name": "Topsia Tannery Cluster", "driver": "Dense industrial roofing & stagnant air"},
        {"name": "Salt Lake Sector V", "driver": "Broad paved roads & glass facades"},
        {"name": "Sealdah Flyover Corridor", "driver": "Asphalt radiant heat & congestion"},
        {"name": "Park Circus 7-Point", "driver": "High traffic volume & low canopy"},
        {"name": "Dum Dum Cantonment", "driver": "Dense settlement & high humidity trap"},
        {"name": "Tollygunge Phari", "driver": "Urban canyon & high masonry heat"}
    ],
    "Ahmedabad": [
        {"name": "Vatva GIDC Industrial", "driver": "Chemical/metal sheds & arid winds"},
        {"name": "Kalupur Railway Corridor", "driver": "High masonry thermal mass & low shade"},
        {"name": "Naroda GIDC Phase 2", "driver": "Asphalt pavements & industrial emissivity"},
        {"name": "Maninagar Crossing", "driver": "Dense residential concrete & sparse green"},
        {"name": "Bapunagar Diamond Market", "driver": "Dense roofing & low sky view"},
        {"name": "SG Highway Thaltej", "driver": "Multi-lane asphalt & high solar radiation"},
        {"name": "Danilimda Industrial", "driver": "Heat retention in low-albedo roofs"},
        {"name": "Ashram Road Commercial", "driver": "High building height & vehicular load"}
    ],
    "Pune": [
        {"name": "Hadapsar Industrial Estate", "driver": "Industrial roofing & low canopy"},
        {"name": "Shivajinagar Station", "driver": "Traffic concentration & asphalt heat"},
        {"name": "Pimpri MIDC Phase 1", "driver": "Automobile manufacturing shed roofs"},
        {"name": "Swargate Bus Terminal", "driver": "High vehicular emissions & concrete ground"},
        {"name": "Hinjawadi Phase 1", "driver": "Extensive paved surfaces & low mature canopy"},
        {"name": "Katraj Ghat Base", "driver": "Dry slope radiation & built sprawl"},
        {"name": "Kothrud Paud Road", "driver": "High building density & low ventilation"},
        {"name": "Viman Nagar Commercial", "driver": "Glass-concrete heat absorption"}
    ],
    "Jaipur": [
        {"name": "VKIA Industrial Area", "driver": "Low albedo industrial roofs & desert sun"},
        {"name": "Walled City (Johari Bazaar)", "driver": "Dense stone masonry thermal inertia"},
        {"name": "Sanganer Textile Hub", "driver": "Exposed dry ground & industrial sheds"},
        {"name": "Mansarovar Sector 7", "driver": "High concrete fraction & low canopy"},
        {"name": "Sitapura Industrial Zone", "driver": "Wide asphalt roads & high solar insolation"},
        {"name": "Chandpole Bazaar", "driver": "Narrow urban canyons & trapped hot air"},
        {"name": "Malviya Nagar Calgiri", "driver": "Paved commercial frontages"},
        {"name": "Ajmer Road 200ft Bypass", "driver": "Asphalt radiant heating"}
    ],
    "Lucknow": [
        {"name": "Talkatora Industrial Area", "driver": "Low canopy cover & metal fabrication roofs"},
        {"name": "Chowk Old Quarter", "driver": "Dense brick masonry & low sky view"},
        {"name": "Charbagh Station Area", "driver": "High diesel/auto traffic & asphalt"},
        {"name": "Aminabad Market", "driver": "Commercial density & lack of green buffer"},
        {"name": "Alambagh Bus Terminal", "driver": "Extensive concrete bus bays"},
        {"name": "Gomti Nagar Extension Paved", "driver": "Unshaded paved plazas & wide roads"},
        {"name": "Hazratganj Main Corridor", "driver": "Vehicular heat and low ventilation"},
        {"name": "Indira Nagar Sector 14", "driver": "High built fraction & low albedo"}
    ],
    "Nagpur": [
        {"name": "MIDC Hingna Industrial", "driver": "High industrial roof heat & arid sun"},
        {"name": "Itwari Market Wholesale", "driver": "Dense masonry & zero vegetation"},
        {"name": "Sitabuldi Main Market", "driver": "Traffic congestion & asphalt radiation"},
        {"name": "Gandhibagh Center", "driver": "High population density & low sky view"},
        {"name": "Mahal Heritage Ward", "driver": "Dense brick thermal storage"},
        {"name": "Wardha Road Multi-Modal", "driver": "Wide concrete flyovers & low shade"},
        {"name": "Kalamna Grain Market", "driver": "Exposed tin sheds & high thermal emissivity"},
        {"name": "Pardi Flyover Junction", "driver": "Heavy commercial vehicle corridor"}
    ],
    "Surat": [
        {"name": "Pandesara GIDC", "driver": "Dyeing/textile sheds & high humidity trap"},
        {"name": "Ring Road Textile Market", "driver": "Massive multi-storey concrete complexes"},
        {"name": "Katargam Diamond Cluster", "driver": "Dense high-rise workshops & low canopy"},
        {"name": "Sachin GIDC Industrial", "driver": "Dark asphalt roads & metal roofing"},
        {"name": "Varachha Main Road", "driver": "Extremely high residential density"},
        {"name": "Udhna Industrial Estate", "driver": "Low ventilation & high surface emissivity"},
        {"name": "Rander Old Town", "driver": "Dense coastal settlement & trapped humidity"},
        {"name": "Bhatar Commercial Zone", "driver": "Paved plazas & vehicular heat"}
    ],
    "Bhopal": [
        {"name": "Govindpura Industrial Area", "driver": "Metal sheds & dry rocky ground radiation"},
        {"name": "MP Nagar Zone 1", "driver": "Commercial concrete density & parked vehicles"},
        {"name": "Old City Bada Bagh", "driver": "High density brick masonry & narrow roads"},
        {"name": "TT Nagar New Market", "driver": "Asphalt parking plazas & low tree shade"},
        {"name": "Mandideep Industrial Corridor", "driver": "Heavy industrial heat and dry winds"},
        {"name": "Bairagarh Main Road", "driver": "Linear commercial asphalt corridor"},
        {"name": "Hamidia Road Transit", "driver": "Bus terminal emissions & paved area"},
        {"name": "Kolar Road Commercial", "driver": "Rapid concrete development & low green buffer"}
    ],
    "Indore": [
        {"name": "Sanwer Road Industrial Sector", "driver": "Dense manufacturing sheds & asphalt"},
        {"name": "Rajwada / Sarafa Market", "driver": "High thermal mass & dense pedestrian heat"},
        {"name": "Pithampur Sector 1 Link", "driver": "Heavy industrial roofs & lack of tree canopy"},
        {"name": "Vijay Nagar Scheme 54", "driver": "Commercial glass-concrete & wide roads"},
        {"name": "Palasia Square", "driver": "Multi-arm junction traffic & asphalt radiant heat"},
        {"name": "Sapna Sangeeta Road", "driver": "High commercial frontage & AC heat rejection"},
        {"name": "Rau Bypass Corridor", "driver": "Logistics hub asphalt & low albedo"},
        {"name": "Bhawarkua Student Hub", "driver": "High building density & low green space"}
    ],
    "Chandigarh": [
        {"name": "Industrial Area Phase 1", "driver": "Low canopy cover & metal fabrication roofs"},
        {"name": "Industrial Area Phase 2", "driver": "Paved loading yards & industrial heat"},
        {"name": "Sector 17 Commercial Plaza", "driver": "Massive concrete pavement & low daytime shade"},
        {"name": "Sector 22 Shastri Market", "driver": "High footfall density & retail heat"},
        {"name": "Sector 26 Timber Market", "driver": "Exposed yards & dry ground emissivity"},
        {"name": "Manimajra Housing Complex", "driver": "Dense residential concrete fraction"},
        {"name": "Sector 43 ISBT Terminal", "driver": "Extensive asphalt bus bays & exhaust heat"},
        {"name": "Sector 35 Commercial Belt", "driver": "High vehicular parking & AC exhaust"}
    ]
}

def main():
    print("Loading 500k dataset...")
    files = sorted(glob.glob("india_urban_heat_synthetic_dataset/india_urban_heat_part_*.csv"))
    df = pd.concat([pd.read_csv(f) for f in files], ignore_index=True)
    print(f"Loaded {len(df):,} rows.")

    cities_data = {}
    
    for city_name, neighborhoods in CITY_NEIGHBORHOODS.items():
        city_df = df[df["city"] == city_name]
        if city_df.empty:
            print(f"Warning: {city_name} not found in dataset!")
            continue

        state = city_df["state"].iloc[0]
        climate_zone = city_df["climate_zone"].iloc[0]
        elevation = float(city_df["elevation_m"].median())
        distance_to_coast = float(city_df["distance_to_coast_km"].median())
        lat_mean = float(city_df["latitude"].mean())
        lon_mean = float(city_df["longitude"].mean())

        seasons_data = {}
        for season in ["Summer", "Monsoon", "Post_Monsoon", "Winter"]:
            s_df = city_df[city_df["season"] == season]
            if s_df.empty:
                s_df = city_df

            # Metrics
            peak_lst = float(np.round(s_df["lst_c"].max(), 1))
            mean_lst = float(np.round(s_df["lst_c"].mean(), 1))
            min_lst = float(np.round(s_df["lst_c"].min(), 1))
            uhi_mean = float(np.round(s_df["uhi_intensity_c"].mean(), 1))
            uhi_max = float(np.round(s_df["uhi_intensity_c"].max(), 1))
            heat_index_mean = float(np.round(s_df["heat_index_c"].mean(), 1))
            wbgt_mean = float(np.round(s_df["wbgt_c"].mean(), 1))
            hotspot_count = int((s_df["hotspot_flag"] == 1).sum())
            total_records = len(s_df)
            hotspot_pct = float(np.round((hotspot_count / total_records) * 100, 1))

            # Environmental means
            ndvi_mean = float(np.round(s_df["ndvi"].mean(), 3))
            tree_cover_mean = float(np.round(s_df["tree_cover_fraction"].mean() * 100, 1))
            impervious_mean = float(np.round(s_df["impervious_surface_fraction"].mean() * 100, 1))
            building_density_mean = float(np.round(s_df["building_density"].mean() * 100, 1))
            building_height_mean = float(np.round(s_df["building_height_m"].mean(), 1))
            sky_view_mean = float(np.round(s_df["sky_view_factor"].mean(), 2))
            albedo_mean = float(np.round(s_df["albedo"].mean(), 2))
            air_temp_mean = float(np.round(s_df["air_temperature_c"].mean(), 1))
            humidity_mean = float(np.round(s_df["relative_humidity_pct"].mean(), 1))
            wind_speed_mean = float(np.round(s_df["wind_speed_ms"].mean(), 1))
            solar_rad_mean = float(np.round(s_df["solar_radiation_wm2"].mean(), 1))
            pm25_mean = float(np.round(s_df["pm25_ug_m3"].mean(), 1))
            pop_density_mean = int(s_df["population_density_per_km2"].mean())

            # Cooling opportunity
            max_cooling = float(np.round(s_df["total_scenario_cooling_c"].quantile(0.95), 1))
            
            # Hotspots extraction
            # Sort by lst_c descending and take top clusters
            top_pts = s_df.sort_values(by=["hotspot_flag", "lst_c"], ascending=[False, False])
            
            hotspots_list = []
            for i, nh in enumerate(neighborhoods):
                # Pick a representative high-heat row
                row_idx = i * max(1, len(top_pts) // (len(neighborhoods) * 2))
                row = top_pts.iloc[row_idx % len(top_pts)]
                
                lst_val = float(np.round(row["lst_c"], 1))
                uhi_val = float(np.round(row["uhi_intensity_c"], 1))
                heat_idx = float(np.round(row["heat_index_c"], 1))
                wbgt_val = float(np.round(row["wbgt_c"], 1))
                people = int(row["population_density_per_km2"] * np.random.uniform(0.7, 1.4))
                score = min(99, max(65, int(60 + (lst_val - 30) * 1.8 + uhi_val * 2.5)))
                risk_level = "Very high" if score >= 88 or lst_val >= 44 else ("High" if score >= 75 or lst_val >= 38 else "Moderate")

                # Drivers for this specific hotspot
                imp_contrib = float(np.round(row["impervious_surface_fraction"] * 2.2, 1))
                tree_contrib = float(np.round((0.35 - row["tree_cover_fraction"]) * 2.8, 1))
                roof_contrib = float(np.round(row["building_density"] * 1.1, 1))
                vent_contrib = float(np.round(max(0, (3.5 - row["wind_speed_ms"])) * 0.25, 1))
                green_benefit = float(np.round(-row["ndvi"] * 0.9, 1))

                hotspots_list.append({
                    "id": f"h{i+1}",
                    "name": nh["name"],
                    "risk": risk_level,
                    "score": score,
                    "temp": f"{lst_val}°C",
                    "lst": lst_val,
                    "uhi": uhi_val,
                    "heat_index": heat_idx,
                    "wbgt": wbgt_val,
                    "people": f"{people:,}",
                    "peopleNum": people,
                    "driver": nh["driver"],
                    "lat": float(np.round(row["latitude"], 4)),
                    "lon": float(np.round(row["longitude"], 4)),
                    "canopyCover": f"{float(np.round(row['tree_cover_fraction']*100, 1))}%",
                    "builtFraction": f"{float(np.round(row['impervious_surface_fraction']*100, 1))}%",
                    "buildingHeight": f"{float(np.round(row['building_height_m'], 1))} m",
                    "skyView": float(np.round(row["sky_view_factor"], 2)),
                    "windSpeed": f"{float(np.round(row['wind_speed_ms'], 1))} m/s",
                    "pm25": f"{float(np.round(row['pm25_ug_m3'], 1))} µg/m³",
                    "ndvi": float(np.round(row["ndvi"], 3)),
                    "albedo": float(np.round(row["albedo"], 2)),
                    "driverBreakdown": [
                        {"name": "Impervious surface fraction", "val": imp_contrib, "weight": min(95, int(imp_contrib * 35))},
                        {"name": "Low tree canopy cover", "val": tree_contrib, "weight": min(90, int(tree_contrib * 30))},
                        {"name": "Roof thermal storage", "val": roof_contrib, "weight": min(75, int(roof_contrib * 32))},
                        {"name": "Low air ventilation", "val": vent_contrib, "weight": min(60, int(vent_contrib * 28))},
                        {"name": "Vegetation cooling buffer", "val": green_benefit, "weight": min(45, int(abs(green_benefit) * 35))}
                    ]
                })

            seasons_data[season] = {
                "peakLst": peak_lst,
                "meanLst": mean_lst,
                "minLst": min_lst,
                "uhiMean": uhi_mean,
                "uhiMax": uhi_max,
                "heatIndexMean": heat_index_mean,
                "wbgtMean": wbgt_mean,
                "hotspotCount": hotspot_count,
                "totalRecords": total_records,
                "hotspotPct": hotspot_pct,
                "coolingOpportunity": max_cooling,
                "env": {
                    "ndvi": ndvi_mean,
                    "treeCoverPct": tree_cover_mean,
                    "imperviousPct": impervious_mean,
                    "buildingDensityPct": building_density_mean,
                    "buildingHeightM": building_height_mean,
                    "skyViewFactor": sky_view_mean,
                    "albedo": albedo_mean,
                    "airTempC": air_temp_mean,
                    "humidityPct": humidity_mean,
                    "windSpeedMs": wind_speed_mean,
                    "solarRadiationWm2": solar_rad_mean,
                    "pm25UgM3": pm25_mean,
                    "populationDensity": pop_density_mean
                },
                "hotspots": hotspots_list
            }

        # Model coefficients for cooling scenarios derived from dataset
        # tree: ~0.04°C per % addition; cool roof: ~0.03°C per % addition; green roof/shade: ~0.025°C per % addition
        cities_data[city_name] = {
            "name": city_name,
            "state": state,
            "climateZone": climate_zone.replace("_", " "),
            "elevationM": elevation,
            "distanceToCoastKm": distance_to_coast,
            "center": {"lat": lat_mean, "lon": lon_mean},
            "bounds": {
                "minLat": float(city_df["latitude"].min()),
                "maxLat": float(city_df["latitude"].max()),
                "minLon": float(city_df["longitude"].min()),
                "maxLon": float(city_df["longitude"].max())
            },
            "seasons": seasons_data
        }

    # Save to json and ts
    os.makedirs("app/data", exist_ok=True)
    json_path = "app/data/heatData.json"
    with open(json_path, "w") as f:
        json.dump(cities_data, f, indent=2)
    print(f"Saved {json_path} with {len(cities_data)} cities.")

    ts_content = f"// Auto-generated from india_urban_heat_synthetic_dataset (500k rows)\n"
    ts_content += """export interface HotspotDriver {
  name: string;
  val: number;
  weight: number;
}

export interface Hotspot {
  id: string;
  name: string;
  risk: string;
  score: number;
  temp: string;
  lst: number;
  uhi: number;
  heat_index: number;
  wbgt: number;
  driver: string;
  people: string;
  peopleNum: number;
  canopyCover: string;
  builtFraction: string;
  buildingHeight: string;
  skyView: number | string;
  albedo: number | string;
  ndvi: number | string;
  windSpeed: string;
  pm25: string;
  lat: number;
  lon: number;
  driverBreakdown: readonly HotspotDriver[];
}

export interface SeasonEnvironment {
  ndvi: number;
  treeCoverPct: number;
  imperviousPct: number;
  buildingDensityPct: number;
  buildingHeightM: number;
  skyViewFactor: number;
  albedo: number;
  airTempC: number;
  humidityPct: number;
  windSpeedMs: number;
  solarRadiationWm2: number;
  pm25UgM3: number;
  populationDensity: number;
}

export interface CitySeasonData {
  peakLst: number;
  meanLst: number;
  minLst: number;
  uhiMean: number;
  uhiMax: number;
  heatIndexMean: number;
  wbgtMean: number;
  hotspotCount: number;
  totalRecords: number;
  hotspotPct: number;
  coolingOpportunity: number;
  env: SeasonEnvironment;
  hotspots: readonly Hotspot[];
}

export type SeasonName = "Summer" | "Monsoon" | "Post_Monsoon" | "Winter";

export interface CityData {
  name: string;
  state: string;
  climateZone: string;
  elevationM: number;
  distanceToCoastKm: number;
  center: { lat: number; lon: number };
  bounds: { minLat: number; maxLat: number; minLon: number; maxLon: number };
  seasons: Record<SeasonName, CitySeasonData>;
}

export const CITIES_DATA: Record<string, CityData> = """ + json.dumps(cities_data, indent=2) + """;
export type CityName = keyof typeof CITIES_DATA;
"""
    ts_path = "app/data/heatData.ts"
    with open(ts_path, "w") as f:
        f.write(ts_content)
    print(f"Saved {ts_path}.")

if __name__ == "__main__":
    main()
