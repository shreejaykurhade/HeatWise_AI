import json
import math
import os

with open('react-india-region-selector-master/src/topojsons/india.json') as f:
    topo = json.load(f)

transform = topo.get('transform', {})
scale = transform.get('scale', [1, 1])
translate = transform.get('translate', [0, 0])
arcs = topo.get('arcs', [])

def decode_arc(arc_idx):
    reverse = False
    if arc_idx < 0:
        arc_idx = ~arc_idx
        reverse = True
    encoded_arc = arcs[arc_idx]
    x, y = 0, 0
    decoded = []
    for dx, dy in encoded_arc:
        x += dx
        y += dy
        lon = x * scale[0] + translate[0]
        lat = y * scale[1] + translate[1]
        decoded.append((lon, lat))
    if reverse:
        decoded.reverse()
    return decoded

min_lon, max_lon = 68.0, 97.5
min_lat, max_lat = 6.5, 37.5

def lat_to_mercator(lat):
    lat_rad = math.radians(min(85.0, max(-85.0, lat)))
    return math.log(math.tan(math.pi / 4 + lat_rad / 2))

min_merc = lat_to_mercator(min_lat)
max_merc = lat_to_mercator(max_lat)

VIEWBOX_W = 800
VIEWBOX_H = 880
PAD_X = 25
PAD_Y = 25
EFF_W = VIEWBOX_W - 2 * PAD_X
EFF_H = VIEWBOX_H - 2 * PAD_Y

def project(lon, lat):
    x = PAD_X + ((lon - min_lon) / (max_lon - min_lon)) * EFF_W
    merc = lat_to_mercator(lat)
    y = PAD_Y + ((max_merc - merc) / (max_merc - min_merc)) * EFF_H
    return round(x, 1), round(y, 1)

def point_line_dist(pt, start, end):
    if start == end:
        return math.hypot(pt[0] - start[0], pt[1] - start[1])
    n = abs((end[1] - start[1]) * pt[0] - (end[0] - start[0]) * pt[1] + end[0] * start[1] - end[1] * start[0])
    d = math.hypot(end[1] - start[1], end[0] - start[0])
    return n / d

def douglas_peucker(pts, tol=0.75):
    if len(pts) <= 2:
        return pts
    max_d = 0.0
    idx = 0
    for i in range(1, len(pts) - 1):
        d = point_line_dist(pts[i], pts[0], pts[-1])
        if d > max_d:
            max_d = d
            idx = i
    if max_d > tol:
        left = douglas_peucker(pts[:idx + 1], tol)
        right = douglas_peucker(pts[idx:], tol)
        return left[:-1] + right
    else:
        return [pts[0], pts[-1]]

states_output = []
geoms = topo['objects']['India-States']['geometries']

for geom in geoms:
    st_name = geom['properties']['ST_NM']
    coords = geom['arcs']
    polys = [coords] if geom['type'] == 'Polygon' else coords
    
    path_commands = []
    points_in_state = []
    
    for poly in polys:
        for ring in poly:
            ring_pts = []
            for arc_idx in ring:
                ring_pts.extend(decode_arc(arc_idx))
            if len(ring_pts) < 3: continue
            proj_pts = [project(p[0], p[1]) for p in ring_pts]
            simp_pts = douglas_peucker(proj_pts, 0.75)
            if len(simp_pts) < 3: continue
            points_in_state.extend(simp_pts)
            
            path_commands.append(f'M{simp_pts[0][0]} {simp_pts[0][1]}')
            for p in simp_pts[1:]:
                path_commands.append(f'L{p[0]} {p[1]}')
            path_commands.append('Z')
            
    if not points_in_state: continue
    centroid_lon = sum(p[0] for p in points_in_state) / len(points_in_state)
    centroid_lat = sum(p[1] for p in points_in_state) / len(points_in_state)
    cx, cy = project(centroid_lon, centroid_lat)
    
    pts_x = [p[0] for p in points_in_state]
    pts_y = [p[1] for p in points_in_state]
    min_x, max_x = min(pts_x), max(pts_x)
    min_y, max_y = min(pts_y), max(pts_y)
    w = max_x - min_x
    h = max_y - min_y
    pad = max(24, max(w, h) * 0.18)
    vb_x = max(0, min_x - pad)
    vb_y = max(0, min_y - pad)
    vb_w = w + 2 * pad
    vb_h = h + 2 * pad

    states_output.append({
        'id': st_name.replace(' & ', '_').replace(' ', '_').lower(),
        'name': st_name,
        'path': ''.join(path_commands),
        'centroid': {'lon': round(centroid_lon, 2), 'lat': round(centroid_lat, 2), 'x': cx, 'y': cy},
        'bounds': {
            'viewBox': f'{round(vb_x, 1)} {round(vb_y, 1)} {round(vb_w, 1)} {round(vb_h, 1)}',
            'minX': round(min_x, 1),
            'maxX': round(max_x, 1),
            'minY': round(min_y, 1),
            'maxY': round(max_y, 1),
            'width': round(w, 1),
            'height': round(h, 1)
        }
    })

print(f'Processed {len(states_output)} states.')

ts_code = f"""// Highly Optimized Real India Vector Map Data (Instant 60FPS Rendering)
export interface IndiaStateFeature {{
  id: string;
  name: string;
  path: string;
  centroid: {{
    lon: number;
    lat: number;
    x: number;
    y: number;
  }};
  bounds: {{
    viewBox: string;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    width: number;
    height: number;
  }};
}}

export const INDIA_MAP_CONFIG = {{
  viewBoxWidth: {VIEWBOX_W},
  viewBoxHeight: {VIEWBOX_H},
  defaultViewBox: "0 0 {VIEWBOX_W} {VIEWBOX_H}",
  minLon: {min_lon},
  maxLon: {max_lon},
  minLat: {min_lat},
  maxLat: {max_lat},
}} as const;

export const INDIA_STATES: readonly IndiaStateFeature[] = {json.dumps(states_output, separators=(',', ':'))} as const;

export function projectLonLatToSvg(lon: number, lat: number): {{ x: number; y: number }} {{
  const minLon = 68.0;
  const maxLon = 97.5;
  const padX = 25;
  const padY = 25;
  const effW = 750;
  const effH = 830;

  const latRad = (Math.min(85.0, Math.max(-85.0, lat)) * Math.PI) / 180;
  const merc = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  
  const minMerc = 0.1136653; // lat_to_mercator(6.5)
  const maxMerc = 0.7018314; // lat_to_mercator(37.5)

  const x = padX + ((lon - minLon) / (maxLon - minLon)) * effW;
  const y = padY + ((maxMerc - merc) / (maxMerc - minMerc)) * effH;

  return {{ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 }};
}}

export function getStateByName(stateName: string): IndiaStateFeature | undefined {{
  const normalized = stateName.toLowerCase().replace(/[^a-z]/g, "");
  return INDIA_STATES.find((s) => {{
    const sn = s.name.toLowerCase().replace(/[^a-z]/g, "");
    return sn === normalized || sn.includes(normalized) || normalized.includes(sn);
  }});
}}
"""

with open('app/data/indiaMapData.ts', 'w') as f:
    f.write(ts_code)

print('Saved optimized app/data/indiaMapData.ts successfully.')
