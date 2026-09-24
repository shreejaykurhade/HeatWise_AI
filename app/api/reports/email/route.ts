import { CITIES_DATA, type CityName, type SeasonName } from "../../../data/heatData";

export const runtime = "nodejs";

const WEBHOOK_URL = process.env.HEATWISE_N8N_WEBHOOK_URL;
const API_KEY = process.env.HEATWISE_N8N_API_KEY;

async function deliverToN8n(report: Record<string, unknown>) {
  if (!WEBHOOK_URL || !API_KEY) throw new Error("n8n report delivery is not configured.");
  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-HeatWise-API-Key": API_KEY,
    },
    body: JSON.stringify(report),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`n8n workflow failed (${response.status})${detail ? `: ${detail.slice(0, 300)}` : "."}`);
  }
  return response;
}

function alertPayload(city: CityName, season: SeasonName, origin: string) {
  const cityData = CITIES_DATA[city];
  const seasonData = cityData.seasons[season];
  const hotspot = seasonData.hotspots[0];
  const pdfUrl = new URL("/api/reports/pdf", origin);
  pdfUrl.searchParams.set("city", city);
  pdfUrl.searchParams.set("season", season);
  pdfUrl.searchParams.set("area", hotspot.name);
  return {
    area_name: hotspot.name,
    city,
    state: cityData.state,
    severity_label: hotspot.risk,
    severity_score: Number((hotspot.score / 10).toFixed(2)),
    lst_surface_temp: hotspot.lst,
    city_mean_temp: seasonData.meanLst,
    uhi_anomaly: hotspot.uhi,
    wbgt_stress: hotspot.wbgt,
    population_exposed: hotspot.peopleNum,
    canopy_cover_pct: Number.parseFloat(hotspot.canopyCover),
    impervious_cover_pct: Number.parseFloat(hotspot.builtFraction),
    primary_drivers: hotspot.driverBreakdown.slice(0, 3).map((driver) => ({ factor: driver.name, impact_celsius: driver.val })),
    recommended_action: "Deploy urban greening, reflective cool-roof coatings, and shaded mobility corridors in the identified high-exposure zone.",
    cooling_potential: seasonData.coolingOpportunity,
    department_name: `${cityData.state} Urban Climate Resilience Authority`,
    pdf_url: pdfUrl.toString(),
  };
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const season: SeasonName = "Summer";
    const cities = Object.keys(CITIES_DATA) as CityName[];
    const results = await Promise.allSettled(cities.map((city) => deliverToN8n(alertPayload(city, season, new URL(request.url).origin))));
    const delivered = results.filter((result) => result.status === "fulfilled").length;
    if (!delivered) throw new Error("No hourly reports were accepted by n8n.");
    return Response.json({ delivered, failed: results.length - delivered, cadence: "hourly", generatedAt: new Date().toISOString() });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Delivery failed." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  let report: Record<string, unknown>;
  try {
    report = await request.json();
  } catch {
    return Response.json({ error: "Report must be valid JSON." }, { status: 400 });
  }
  try {
    const response = await deliverToN8n(report);
    const result = await response.json().catch(() => ({ status: "sent" }));
    return Response.json({ delivered: true, ...result });
  } catch (error) {
    // Manual UI actions return a structured result so an upstream workflow error
    // can be shown in Reports without producing an opaque browser resource error.
    return Response.json({
      delivered: false,
      error: error instanceof Error ? error.message : "Delivery failed.",
    });
  }
}
