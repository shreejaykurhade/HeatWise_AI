export const runtime = "nodejs";

export type GeospatialContext = {
  urbanDensityLevel: "High" | "Medium" | "Low";
  nearbyGreeneryPresent: boolean;
  nearbyWaterPresent: boolean;
  isProtectedOrEcoSensitive: boolean;
  ecoConstraintWarning?: string;
  contextSummary: string;
};

export type Inventory = {
  source: "OpenStreetMap";
  radiusM: number;
  buildingCount: number;
  roadSegments: number;
  parkOrOpenSpaceCount: number;
  waterFeatureCount: number;
  protectedOrEcoCount: number;
  geospatialContext: GeospatialContext;
  retrievedAt: string;
  cached?: boolean;
};

const cache = new Map<string, { expires: number; data: Inventory }>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));
  const radiusM = Math.min(400, Math.max(100, Number(searchParams.get("radiusM")) || 250));

  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return Response.json({ error: "Valid latitude and longitude are required." }, { status: 422 });
  }

  const key = `${lat.toFixed(4)},${lon.toFixed(4)},${radiusM}`;
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) return Response.json({ ...cached.data, cached: true });

  try {
    const latitudeDelta = radiusM / 111_320;
    const longitudeDelta = radiusM / (111_320 * Math.cos((lat * Math.PI) / 180));
    const bbox = [lon - longitudeDelta, lat - latitudeDelta, lon + longitudeDelta, lat + latitudeDelta]
      .map((coordinate) => coordinate.toFixed(6)).join(",");

    const response = await fetch(`https://api.openstreetmap.org/api/0.6/map?bbox=${bbox}`, {
      headers: { "User-Agent": "HeatWise-AI-SIH-Prototype/1.0" },
      signal: AbortSignal.timeout(25_000),
    });

    if (!response.ok) throw new Error(`OpenStreetMap inventory request returned ${response.status}`);
    const xml = await response.text();
    const ways = xml.match(/<way\b[\s\S]*?<\/way>/g) ?? [];

    const hasTag = (way: string, key: string, value?: string) => {
      const expression = value
        ? new RegExp(`<tag\\s+k="${key}"\\s+v="${value}"\\s*\\/>`)
        : new RegExp(`<tag\\s+k="${key}"\\s+v="[^"]*"\\s*\\/>`);
      return expression.test(way);
    };

    const buildingCount = ways.filter((way) => hasTag(way, "building")).length;
    const roadSegments = ways.filter((way) => hasTag(way, "highway")).length;
    const parkOrOpenSpaceCount = ways.filter(
      (way) =>
        hasTag(way, "leisure", "park") ||
        hasTag(way, "leisure", "garden") ||
        hasTag(way, "landuse", "grass") ||
        hasTag(way, "landuse", "forest") ||
        hasTag(way, "natural", "wood")
    ).length;
    const waterFeatureCount = ways.filter(
      (way) =>
        hasTag(way, "natural", "water") ||
        hasTag(way, "waterway") ||
        hasTag(way, "natural", "wetland")
    ).length;
    const protectedOrEcoCount = ways.filter(
      (way) =>
        hasTag(way, "boundary", "protected_area") ||
        hasTag(way, "boundary", "national_park") ||
        hasTag(way, "leisure", "nature_reserve") ||
        hasTag(way, "leisure", "wildlife_sanctuary") ||
        hasTag(way, "natural", "wetland")
    ).length;

    const isProtectedOrEcoSensitive = protectedOrEcoCount > 0;
    const urbanDensityLevel: "High" | "Medium" | "Low" =
      buildingCount >= 35 || roadSegments >= 20 ? "High" : buildingCount >= 10 ? "Medium" : "Low";
    const nearbyGreeneryPresent = parkOrOpenSpaceCount > 0;
    const nearbyWaterPresent = waterFeatureCount > 0;

    let contextSummary = `${urbanDensityLevel} built density area`;
    if (nearbyGreeneryPresent && nearbyWaterPresent) {
      contextSummary += " with active blue-green infrastructure presence";
    } else if (nearbyGreeneryPresent) {
      contextSummary += " with proximal open green space";
    } else if (nearbyWaterPresent) {
      contextSummary += " with proximal water feature / drainage channel";
    } else {
      contextSummary += " with significant canopy & vegetation deficit";
    }

    const geospatialContext: GeospatialContext = {
      urbanDensityLevel,
      nearbyGreeneryPresent,
      nearbyWaterPresent,
      isProtectedOrEcoSensitive,
      ecoConstraintWarning: isProtectedOrEcoSensitive
        ? "Potential ecological constraint detected — verify with authoritative planning/regulatory data."
        : undefined,
      contextSummary,
    };

    const data: Inventory = {
      source: "OpenStreetMap",
      radiusM,
      buildingCount,
      roadSegments,
      parkOrOpenSpaceCount,
      waterFeatureCount,
      protectedOrEcoCount,
      geospatialContext,
      retrievedAt: new Date().toISOString(),
    };

    cache.set(key, { data, expires: Date.now() + 15 * 60_000 });
    return Response.json({ ...data, cached: false });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to retrieve spatial inventory." },
      { status: 502 }
    );
  }
}
