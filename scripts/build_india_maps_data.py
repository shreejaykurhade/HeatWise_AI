import json
import math
import os
import re

# Douglas-Peucker point simplification
def perpendicular_distance(point, line_start, line_end):
    if line_start == line_end:
        return math.hypot(point[0] - line_start[0], point[1] - line_start[1])
    dx = line_end[0] - line_start[0]
    dy = line_end[1] - line_start[1]
    num = abs(dy * point[0] - dx * point[1] + line_end[0] * line_start[1] - line_end[1] * line_start[0])
    den = math.hypot(dx, dy)
    return num / den

def douglas_peucker(points, epsilon):
    if len(points) <= 2:
        return points
    dmax = 0.0
    index = 0
    for i in range(1, len(points) - 1):
        d = perpendicular_distance(points[i], points[0], points[-1])
        if d > dmax:
            index = i
            dmax = d
    if dmax > epsilon:
        rec_results1 = douglas_peucker(points[:index + 1], epsilon)
        rec_results2 = douglas_peucker(points[index:], epsilon)
        return rec_results1[:-1] + rec_results2
    else:
        return [points[0], points[-1]]

# Projection parameters
MIN_LON = 68.0
MAX_LON = 97.5
MIN_LAT = 6.5
MAX_LAT = 37.5
SVG_WIDTH = 800.0
SVG_HEIGHT = 880.0

def project(lon, lat):
    x = (lon - MIN_LON) / (MAX_LON - MIN_LON) * (SVG_WIDTH - 80) + 40
    y = (MAX_LAT - lat) / (MAX_LAT - MIN_LAT) * (SVG_HEIGHT - 80) + 40
    return round(x, 1), round(y, 1)

def decode_topojson_arc(arc, transform):
    scale = transform["scale"]
    translate = transform["translate"]
    coords = []
    x, y = 0, 0
    for dx, dy in arc:
        x += dx
        y += dy
        lon = x * scale[0] + translate[0]
        lat = y * scale[1] + translate[1]
        coords.append((lon, lat))
    return coords

def build_ring(arc_indices, arcs_decoded):
    ring = []
    for idx in arc_indices:
        if idx >= 0:
            arc_pts = arcs_decoded[idx]
        else:
            arc_pts = list(reversed(arcs_decoded[~idx]))
        if not ring:
            ring.extend(arc_pts)
        else:
            ring.extend(arc_pts[1:])
    return ring

def main():
    topo_path = "india-maps-data-main/topojson/india.json"
    with open(topo_path) as f:
        topo = json.load(f)

    transform = topo["transform"]
    arcs = topo["arcs"]

    # Decode all arcs to (lon, lat)
    arcs_decoded = [decode_topojson_arc(arc, transform) for arc in arcs]

    # 1. Process States
    state_geoms = topo["objects"]["states"]["geometries"]
    states_data = []

    print(f"Processing {len(state_geoms)} states from india-maps-data-main...")

    for g in state_geoms:
        st_name = g["properties"].get("st_nm", "Unknown")
        st_code = g["properties"].get("st_code", "")
        slug = re.sub(r"[^a-z0-9]+", "-", st_name.lower()).strip("-")
        g_type = g["type"]

        rings_lonlat = []
        if g_type == "Polygon":
            for arc_indices in g["arcs"]:
                ring = build_ring(arc_indices, arcs_decoded)
                rings_lonlat.append(ring)
        elif g_type == "MultiPolygon":
            for poly in g["arcs"]:
                for arc_indices in poly:
                    ring = build_ring(arc_indices, arcs_decoded)
                    rings_lonlat.append(ring)

        # Convert to projected SVG points and apply Douglas-Peucker simplification
        svg_path_parts = []
        all_pts = []
        for ring in rings_lonlat:
            pts = [project(lon, lat) for lon, lat in ring]
            simplified = douglas_peucker(pts, 0.45)
            if len(simplified) < 3:
                continue
            all_pts.extend(simplified)
            d = f"M {simplified[0][0]} {simplified[0][1]} " + " ".join(f"L {p[0]} {p[1]}" for p in simplified[1:]) + " Z"
            svg_path_parts.append(d)

        if not all_pts:
            continue

        full_svg_path = " ".join(svg_path_parts)
        min_x = min(p[0] for p in all_pts)
        max_x = max(p[0] for p in all_pts)
        min_y = min(p[1] for p in all_pts)
        max_y = max(p[1] for p in all_pts)

        w = max(30.0, max_x - min_x)
        h = max(30.0, max_y - min_y)
        pad_x = w * 0.12
        pad_y = h * 0.12
        view_box = f"{round(min_x - pad_x, 1)} {round(min_y - pad_y, 1)} {round(w + pad_x * 2, 1)} {round(h + pad_y * 2, 1)}"

        centroid_x = round((min_x + max_x) / 2, 1)
        centroid_y = round((min_y + max_y) / 2, 1)

        states_data.append({
            "id": slug,
            "code": st_code,
            "name": st_name,
            "path": full_svg_path,
            "bounds": {
                "minX": min_x,
                "maxX": max_x,
                "minY": min_y,
                "maxY": max_y,
                "width": round(w, 1),
                "height": round(h, 1),
                "viewBox": view_box
            },
            "centroid": {
                "x": centroid_x,
                "y": centroid_y
            }
        })

    # Sort states alphabetically
    states_data.sort(key=lambda s: s["name"])
    print(f"Successfully processed {len(states_data)} states from india-maps-data-main.")

    # 2. Process Districts
    dist_geoms = topo["objects"]["districts"]["geometries"]
    districts_by_state = {}

    print(f"Processing {len(dist_geoms)} districts from india-maps-data-main...")
    for g in dist_geoms:
        dist_name = g["properties"].get("district", "Unknown")
        st_name = g["properties"].get("st_nm", "Unknown")
        slug_st = re.sub(r"[^a-z0-9]+", "-", st_name.lower()).strip("-")
        g_type = g["type"]

        rings_lonlat = []
        if g_type == "Polygon":
            for arc_indices in g["arcs"]:
                ring = build_ring(arc_indices, arcs_decoded)
                rings_lonlat.append(ring)
        elif g_type == "MultiPolygon":
            for poly in g["arcs"]:
                for arc_indices in poly:
                    ring = build_ring(arc_indices, arcs_decoded)
                    rings_lonlat.append(ring)

        svg_path_parts = []
        all_pts = []
        for ring in rings_lonlat:
            pts = [project(lon, lat) for lon, lat in ring]
            simplified = douglas_peucker(pts, 0.4)
            if len(simplified) < 3:
                continue
            all_pts.extend(simplified)
            d = f"M {simplified[0][0]} {simplified[0][1]} " + " ".join(f"L {p[0]} {p[1]}" for p in simplified[1:]) + " Z"
            svg_path_parts.append(d)

        if not all_pts:
            continue

        full_svg_path = " ".join(svg_path_parts)
        min_x = min(p[0] for p in all_pts)
        max_x = max(p[0] for p in all_pts)
        min_y = min(p[1] for p in all_pts)
        max_y = max(p[1] for p in all_pts)

        if slug_st not in districts_by_state:
            districts_by_state[slug_st] = []

        districts_by_state[slug_st].append({
            "name": dist_name,
            "path": full_svg_path,
            "centroid": {
                "x": round((min_x + max_x) / 2, 1),
                "y": round((min_y + max_y) / 2, 1)
            }
        })

    print(f"Grouped districts for {len(districts_by_state)} states.")

    # Generate TypeScript file
    ts_code = f"""// Auto-generated vector geometry from india-maps-data-main (official boundaries)
export interface IndiaStateFeature {{
  id: string;
  code: string;
  name: string;
  path: string;
  bounds: {{
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    width: number;
    height: number;
    viewBox: string;
  }};
  centroid: {{
    x: number;
    y: number;
  }};
}}

export interface IndiaDistrictFeature {{
  name: string;
  path: string;
  centroid: {{
    x: number;
    y: number;
  }};
}}

export const INDIA_MAP_CONFIG = {{
  minLon: {MIN_LON},
  maxLon: {MAX_LON},
  minLat: {MIN_LAT},
  maxLat: {MAX_LAT},
  svgWidth: {SVG_WIDTH},
  svgHeight: {SVG_HEIGHT},
  defaultViewBox: "0 0 {SVG_WIDTH} {SVG_HEIGHT}",
}} as const;

export function projectLonLatToSvg(lon: number, lat: number): {{ x: number; y: number }} {{
  const x = ((lon - INDIA_MAP_CONFIG.minLon) / (INDIA_MAP_CONFIG.maxLon - INDIA_MAP_CONFIG.minLon)) * (INDIA_MAP_CONFIG.svgWidth - 80) + 40;
  const y = ((INDIA_MAP_CONFIG.maxLat - lat) / (INDIA_MAP_CONFIG.maxLat - INDIA_MAP_CONFIG.minLat)) * (INDIA_MAP_CONFIG.svgHeight - 80) + 40;
  return {{ x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) }};
}}

export const INDIA_STATES: readonly IndiaStateFeature[] = {json.dumps(states_data, indent=2)} as const;

export const INDIA_DISTRICTS: Record<string, readonly IndiaDistrictFeature[]> = {json.dumps(districts_by_state, indent=2)} as const;

export function getStateByName(name: string): IndiaStateFeature | undefined {{
  const normalized = name.toLowerCase().replace(/[^a-z]/g, "");
  return INDIA_STATES.find((s) => {{
    const sNorm = s.name.toLowerCase().replace(/[^a-z]/g, "");
    return sNorm === normalized || sNorm.includes(normalized) || normalized.includes(sNorm);
  }});
}}

export function getDistrictsForState(stateIdOrName: string): readonly IndiaDistrictFeature[] {{
  const normalized = stateIdOrName.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  for (const [key, dists] of Object.entries(INDIA_DISTRICTS)) {{
    if (key === normalized || key.includes(normalized) || normalized.includes(key)) {{
      return dists;
    }}
  }}
  return [];
}}
"""

    output_path = "app/data/indiaMapData.ts"
    with open(output_path, "w") as f:
        f.write(ts_code)

    file_size_kb = round(len(ts_code) / 1024, 1)
    print(f"Generated {output_path} ({file_size_kb} KB) using india-maps-data-main successfully!")

if __name__ == "__main__":
    main()
