import { getHeatModelMetadata, predictUrbanHeat } from "../../../lib/heat-model";

export const runtime = "nodejs";

export async function GET() {
  const metadata = getHeatModelMetadata();
  return Response.json({
    status: "ready",
    modelVersion: metadata.version,
    syntheticDataWarning: metadata.synthetic_data_warning,
    regressionMetrics: metadata.regression_metrics,
    classificationMetrics: metadata.classification_metrics,
    requiredContext: ["month", "day_of_year"],
    acceptedFeatures: Object.keys(metadata.feature_profile),
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Request body must be a feature object." }, { status: 400 });
  }

  const numeric: Record<string, number | undefined> = {};
  for (const [key, value] of Object.entries(body)) {
    if (value !== null && value !== undefined && (typeof value !== "number" || !Number.isFinite(value))) {
      return Response.json({ error: `Feature '${key}' must be a finite number.` }, { status: 422 });
    }
    numeric[key] = value as number | undefined;
  }
  const month = numeric.month;
  const day = numeric.day_of_year;
  if (month === undefined || month < 1 || month > 12 || day === undefined || day < 1 || day > 366) {
    return Response.json(
      { error: "month (1-12) and day_of_year (1-366) are required." },
      { status: 422 },
    );
  }

  try {
    return Response.json(predictUrbanHeat(numeric));
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Prediction failed." },
      { status: 422 },
    );
  }
}
