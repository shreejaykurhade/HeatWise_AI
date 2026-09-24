import json
import numpy as np
from scipy.interpolate import Rbf
import matplotlib.pyplot as plt
import os

MIN_LON = 68.0
MAX_LON = 97.5
MIN_LAT = 6.5
MAX_LAT = 37.5
SVG_WIDTH = 800.0
SVG_HEIGHT = 880.0

def project(lon, lat):
    x = (lon - MIN_LON) / (MAX_LON - MIN_LON) * (SVG_WIDTH - 80) + 40
    y = (MAX_LAT - lat) / (MAX_LAT - MIN_LAT) * (SVG_HEIGHT - 80) + 40
    return round(float(x), 1), round(float(y), 1)

# Station nodes from 500k synthetic dataset and meteorological reanalysis
STATION_NODES = [
    # North / Thar / Gangetic Core
    {"name": "Bikaner/Jodhpur", "lon": 73.2, "lat": 27.1, "summer": 58.2, "monsoon": 49.0, "post": 43.0, "winter": 33.5},
    {"name": "Jaipur", "lon": 75.8, "lat": 26.9, "summer": 57.3, "monsoon": 48.5, "post": 42.0, "winter": 33.0},
    {"name": "Delhi/NCR", "lon": 77.2, "lat": 28.6, "summer": 54.8, "monsoon": 44.5, "post": 37.5, "winter": 24.1},
    {"name": "Hisar/Haryana", "lon": 75.7, "lat": 29.1, "summer": 56.2, "monsoon": 45.0, "post": 38.0, "winter": 23.5},
    {"name": "Ludhiana/Punjab", "lon": 75.8, "lat": 30.9, "summer": 53.4, "monsoon": 42.0, "post": 35.0, "winter": 22.0},
    {"name": "Agra/Gwalior", "lon": 78.1, "lat": 26.7, "summer": 56.5, "monsoon": 46.0, "post": 39.5, "winter": 25.0},
    {"name": "Lucknow", "lon": 80.9, "lat": 26.8, "summer": 54.6, "monsoon": 45.0, "post": 38.0, "winter": 24.5},
    {"name": "Varanasi/Prayagraj", "lon": 82.5, "lat": 25.4, "summer": 54.0, "monsoon": 44.5, "post": 37.8, "winter": 25.0},
    {"name": "Patna/Gaya", "lon": 85.1, "lat": 25.2, "summer": 53.8, "monsoon": 43.5, "post": 37.5, "winter": 25.0},
    
    # Central / Deccan
    {"name": "Ahmedabad", "lon": 72.6, "lat": 23.0, "summer": 54.7, "monsoon": 46.0, "post": 41.5, "winter": 34.5},
    {"name": "Surat", "lon": 72.8, "lat": 21.2, "summer": 51.0, "monsoon": 44.0, "post": 40.5, "winter": 35.0},
    {"name": "Bhopal/Indore", "lon": 76.6, "lat": 23.0, "summer": 51.6, "monsoon": 43.0, "post": 38.0, "winter": 28.5},
    {"name": "Nagpur/Vidarbha", "lon": 79.1, "lat": 21.1, "summer": 55.7, "monsoon": 44.5, "post": 41.0, "winter": 36.5},
    {"name": "Raipur/Bilaspur", "lon": 81.8, "lat": 21.6, "summer": 54.1, "monsoon": 42.0, "post": 37.5, "winter": 30.0},
    {"name": "Rourkela/Sambalpur", "lon": 84.5, "lat": 21.8, "summer": 53.8, "monsoon": 41.5, "post": 37.0, "winter": 31.0},
    {"name": "Jamshedpur/Ranchi", "lon": 85.8, "lat": 23.1, "summer": 51.5, "monsoon": 41.5, "post": 36.5, "winter": 27.0},
    {"name": "Kolkata/Howrah", "lon": 88.3, "lat": 22.6, "summer": 51.0, "monsoon": 42.5, "post": 37.0, "winter": 29.0},
    
    # West Coast / South
    {"name": "Mumbai/Thane", "lon": 72.9, "lat": 19.1, "summer": 48.7, "monsoon": 43.5, "post": 40.0, "winter": 36.5},
    {"name": "Pune", "lon": 73.8, "lat": 18.5, "summer": 45.3, "monsoon": 38.5, "post": 37.0, "winter": 32.0},
    {"name": "Hyderabad", "lon": 78.5, "lat": 17.4, "summer": 48.4, "monsoon": 42.0, "post": 39.0, "winter": 35.0},
    {"name": "Vijayawada/Guntur", "lon": 80.5, "lat": 16.4, "summer": 53.2, "monsoon": 43.5, "post": 39.5, "winter": 35.5},
    {"name": "Visakhapatnam", "lon": 83.2, "lat": 17.7, "summer": 47.5, "monsoon": 42.0, "post": 38.0, "winter": 34.0},
    {"name": "Bhubaneswar", "lon": 85.8, "lat": 20.3, "summer": 51.8, "monsoon": 41.0, "post": 37.0, "winter": 32.0},
    {"name": "Bengaluru", "lon": 77.6, "lat": 13.0, "summer": 43.9, "monsoon": 38.0, "post": 37.0, "winter": 34.5},
    {"name": "Chennai", "lon": 80.3, "lat": 13.1, "summer": 52.3, "monsoon": 48.0, "post": 41.0, "winter": 37.0},
    {"name": "Madurai", "lon": 78.1, "lat": 9.9, "summer": 51.6, "monsoon": 45.0, "post": 39.0, "winter": 36.0},
    {"name": "Kochi/Kerala", "lon": 76.3, "lat": 9.9, "summer": 39.8, "monsoon": 33.0, "post": 34.0, "winter": 36.0},
    
    # Himalayas / Northeast
    {"name": "Srinagar/Kashmir", "lon": 74.8, "lat": 34.1, "summer": 32.4, "monsoon": 27.0, "post": 20.0, "winter": 5.0},
    {"name": "Leh/Ladakh", "lon": 77.6, "lat": 34.2, "summer": 24.5, "monsoon": 20.0, "post": 13.0, "winter": 2.0},
    {"name": "Shimla/HP", "lon": 77.2, "lat": 31.1, "summer": 29.6, "monsoon": 24.0, "post": 19.0, "winter": 12.0},
    {"name": "Dehradun/UK", "lon": 78.0, "lat": 30.3, "summer": 41.2, "monsoon": 33.0, "post": 28.0, "winter": 18.0},
    {"name": "Guwahati/Assam", "lon": 91.7, "lat": 26.1, "summer": 43.5, "monsoon": 36.0, "post": 32.0, "winter": 24.0},
    {"name": "Shillong/Meghalaya", "lon": 91.9, "lat": 25.6, "summer": 28.5, "monsoon": 24.0, "post": 21.0, "winter": 16.0},
    {"name": "Silchar/Barak", "lon": 92.8, "lat": 24.8, "summer": 40.8, "monsoon": 34.0, "post": 31.0, "winter": 24.0}
]

def generate_season_contours(season_key, levels):
    lons = [n["lon"] for n in STATION_NODES]
    lats = [n["lat"] for n in STATION_NODES]
    temps = [n[season_key] for n in STATION_NODES]

    # Radial Basis Function 2D Multiquadric Spline Surface
    rbf = Rbf(lons, lats, temps, function="multiquadric", smooth=1.8)

    grid_lons = np.linspace(MIN_LON, MAX_LON, 140)
    grid_lats = np.linspace(MIN_LAT, MAX_LAT, 140)
    grid_x, grid_y = np.meshgrid(grid_lons, grid_lats)
    grid_temps = rbf(grid_x, grid_y)

    fig, ax = plt.subplots(figsize=(8, 8.8))
    
    # 1. Filled Iso-bands
    cs_fill = ax.contourf(grid_x, grid_y, grid_temps, levels=levels, extend="both")
    
    # 2. Line Contours with Labels
    cs_lines = ax.contour(grid_x, grid_y, grid_temps, levels=levels, linewidths=1.0)
    
    # Extract SVG paths for each filled iso-band
    filled_bands = []
    fill_paths = cs_fill.get_paths()
    for level_idx, p in enumerate(fill_paths):
        vertices = p.vertices
        codes = p.codes
        if len(vertices) < 3:
            continue
        sub_d = []
        for i, (v, c) in enumerate(zip(vertices, codes if codes is not None else [1]*len(vertices))):
            px, py = project(v[0], v[1])
            if i == 0 or c == 1:
                sub_d.append(f"M {px} {py}")
            else:
                sub_d.append(f"L {px} {py}")
        sub_d.append("Z")
        svg_path = " ".join(sub_d)
        
        t_low = levels[min(level_idx, len(levels)-1)]
        filled_bands.append({
            "tempThreshold": float(t_low),
            "path": svg_path
        })

    # Extract SVG paths for line contours
    contour_lines = []
    line_paths = cs_lines.get_paths()
    for level_idx, p in enumerate(line_paths):
        level_temp = float(cs_lines.levels[min(level_idx, len(cs_lines.levels)-1)])
        vertices = p.vertices
        if len(vertices) < 3:
            continue
        pts = [project(v[0], v[1]) for v in vertices]
        d = f"M {pts[0][0]} {pts[0][1]} " + " ".join(f"L {pt[0]} {pt[1]}" for pt in pts[1:])
        
        mid_idx = len(pts) // 2
        label_pos = pts[mid_idx]

        contour_lines.append({
            "temp": level_temp,
            "path": d,
            "labelPos": {"x": label_pos[0], "y": label_pos[1]}
        })

    plt.close(fig)
    return filled_bands, contour_lines

def main():
    seasons_levels = {
        "Summer": [26, 32, 38, 44, 48, 52, 56],
        "Monsoon": [22, 28, 34, 40, 44, 48],
        "Post_Monsoon": [18, 24, 30, 36, 40, 44],
        "Winter": [8, 14, 20, 26, 32, 36]
    }

    all_seasons_data = {}
    print("Generating authentic 2D topological isothermal contours for 4 seasons...")

    for season_name, season_key in [("Summer", "summer"), ("Monsoon", "monsoon"), ("Post_Monsoon", "post"), ("Winter", "winter")]:
        levels = seasons_levels[season_name]
        bands, lines = generate_season_contours(season_key, levels)
        all_seasons_data[season_name] = {
            "bands": bands,
            "lines": lines
        }
        print(f"Season {season_name}: {len(bands)} iso-bands, {len(lines)} contour ridge lines.")

    ts_code = f"""// Real 2D Multiquadric RBF Topological Isothermal Contours derived from 500k dataset
export interface IsothermalBand {{
  tempThreshold: number;
  path: string;
}}

export interface IsothermalContourLine {{
  temp: number;
  path: string;
  labelPos: {{ x: number; y: number }};
}}

export interface SeasonTopologicalData {{
  bands: readonly IsothermalBand[];
  lines: readonly IsothermalContourLine[];
}}

export const TOPOLOGICAL_ISOTHERMS: Record<string, SeasonTopologicalData> = {json.dumps(all_seasons_data, indent=2)} as const;

export function getThermalBandFill(temp: number): string {{
  if (temp >= 56) return "rgba(180, 40, 30, 0.40)";
  if (temp >= 52) return "rgba(200, 62, 45, 0.32)";
  if (temp >= 48) return "rgba(224, 106, 38, 0.26)";
  if (temp >= 42) return "rgba(216, 155, 50, 0.20)";
  if (temp >= 34) return "rgba(164, 185, 90, 0.16)";
  if (temp >= 26) return "rgba(79, 125, 88, 0.14)";
  return "rgba(42, 87, 78, 0.10)";
}}

export function getThermalLineStroke(temp: number): string {{
  if (temp >= 52) return "#C83E2D";
  if (temp >= 44) return "#E06A26";
  if (temp >= 36) return "#D89B32";
  return "#4F7D58";
}}
"""

    out_file = "app/data/isothermalContourData.ts"
    with open(out_file, "w") as f:
        f.write(ts_code)
    
    print(f"Saved {out_file} ({round(len(ts_code)/1024, 1)} KB) successfully!")

if __name__ == "__main__":
    main()
