import { predictUrbanHeat } from "../../../../lib/heat-model";

export const runtime = "nodejs";

type BatchArea = {
  id: string;
  features: Record<string, number | undefined>;
};

export async function POST(request: Request) {
  let body: { areas?: BatchArea[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!Array.isArray(body.areas) || body.areas.length === 0 || body.areas.length > 500) {
    return Response.json({ error: "areas must contain between 1 and 500 area feature objects." }, { status: 422 });
  }

  try {
    const predictions = body.areas.map((area) => {
      if (!area || typeof area.id !== "string" || !area.features || typeof area.features !== "object") {
        throw new Error("Every area requires a string id and a features object.");
      }
      for (const [key, value] of Object.entries(area.features)) {
        if (value !== undefined && (typeof value !== "number" || !Number.isFinite(value))) {
          throw new Error(`Feature '${key}' for '${area.id}' must be a finite number.`);
        }
      }
      const { month, day_of_year: day } = area.features;
      if (month === undefined || month < 1 || month > 12 || day === undefined || day < 1 || day > 366) {
        throw new Error(`Area '${area.id}' requires month (1-12) and day_of_year (1-366).`);
      }
      return { id: area.id, ...predictUrbanHeat(area.features) };
    });

    return Response.json({ count: predictions.length, predictions });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Batch prediction failed." },
      { status: 422 },
    );
  }
}
