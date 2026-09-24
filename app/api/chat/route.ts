import { retrieveRelevantKnowledge } from "../../data/ragKnowledgeBase";

export const runtime = "nodejs";

interface ChatRequestPayload {
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>;
  context?: {
    view?: "scenario_lab" | "optimizer" | "overview";
    city?: string;
    season?: string;
    activeHotspot?: {
      name: string;
      lst: number;
      uhi: number;
      wbgt: number;
      risk: string;
      peopleNum?: number;
      driverBreakdown?: Array<{ name: string; val: number; unit: string }>;
      canopyCover?: number;
      builtFraction?: number;
      bldgHeight?: number;
      svf?: number;
      albedo?: number;
      windSpeed?: number;
      pm25?: number;
    };
    levers?: {
      trees: number;
      roofs: number;
      shade: number;
      pavement: number;
      coolingReduction: string;
      scenarioPeakTemp: string;
      scenarioCost: string;
      peopleBenefited: string;
      energySavedMWh: number;
    };
    budget?: {
      amountCr: number;
      optReduction: string;
      optBenefited: string;
      optMWh: number;
    };
  };
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as ChatRequestPayload;
    const { messages, context } = payload;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "Valid message array is required." },
        { status: 400 }
      );
    }

    const lastUserMessage =
      [...messages].reverse().find((m) => m.role === "user")?.content || "";

    // 1. RAG: Retrieve domain knowledge chunks based on query & context view
    const searchContext = `${lastUserMessage} ${context?.view || ""} ${
      context?.activeHotspot?.name || ""
    }`;
    const retrievedChunks = retrieveRelevantKnowledge(searchContext, 3);

    // 2. Build live situational telemetry context block
    let situationalContext = "";
    if (context) {
      const city = context.city || "Mumbai";
      const season = context.season || "Summer";
      situationalContext += `\n--- CURRENT LIVE SITUATION & TELEMETRY ---
City: ${city} (Season: ${season})
`;

      if (context.activeHotspot) {
        const h = context.activeHotspot;
        situationalContext += `Active Hotspot Ward: ${h.name}
- Current Peak LST: ${h.lst}°C
- Mean UHI Anomaly: +${h.uhi}°C above rural baseline
- WBGT Thermal Stress: ${h.wbgt}°C (${h.risk})
- Exposed Population: ${h.peopleNum ? h.peopleNum.toLocaleString("en-IN") : "N/A"} residents
- Biophysical Parameters: Canopy Cover ${h.canopyCover ?? 11.3}%, Impervious Built Fraction ${h.builtFraction ?? 76.4}%, Building Height ${h.bldgHeight ?? 59.4}m, Sky-View Factor (SVF) ${h.svf ?? 0.44}, Surface Albedo ${h.albedo ?? 0.20}, PM2.5 ${h.pm25 ?? 114.2} µg/m³
- Primary Drivers: ${(h.driverBreakdown || [])
          .map((d) => `${d.name} (${d.val >= 0 ? "+" : ""}${d.val}°C)`)
          .join(", ")}
`;
      }

    }

    // 3. Construct System Prompt with RAG knowledge & physics enforcement
    const systemPrompt = `You are the **HeatWise AI Urban Climate Intelligence Copilot**, an executive thermodynamic climate scientist, urban resilience advisor, and municipal policy consultant designed for ISRO Earth Observation and State Municipal Corporations across India.

YOUR DOMAIN & SCOPE:
- You are STRICTLY AND EXCLUSIVELY an expert in:
  1. Urban Heat Island (UHI) mitigation and microclimate thermodynamic energy balances ($R_n - G = H + \\lambda E$).
  2. Satellite Earth Observation telemetry (LST, NDVI, Albedo, Sky-View Factor, PM2.5, Building Morphology).
  3. Physical cooling interventions (High-Albedo Cool Roofs, Urban Tree Canopy Expansion, Tensile Shade Sails, Permeable Reflective Pavements).
  4. Municipal programme management, baseline locking, control-location comparison, and NDMA Heat Action Plan guidelines for Indian cities.

CRITICAL GUARDRAILS & OFF-TOPIC POLICY:
1. **OFF-TOPIC REFUSAL**:
   - If the user asks about ANYTHING outside the domain of urban climate, heat mitigation, or HeatWise features (for example: writing general programming code/software scripts, general trivia, gaming, non-climate topics, essays, or unrelated requests):
   - You MUST politely decline and state that the query is off-topic.
   - Format off-topic declines cleanly with a clear notice:
     "### ⚠️ Topic Out of Scope
     As the **HeatWise Climate Copilot**, I am dedicated exclusively to urban heat mitigation, microclimate thermodynamics, and municipal cooling intelligence for Indian cities.

     I cannot assist with general programming, code development, or unrelated topics.

     **How I can help you today:**
     * Analyze thermodynamic heat stress and microclimate telemetry for the active ward
     * Simulate cooling reductions (°C) for urban interventions (Cool Roofs, Tree Canopy)
     * Optimize CapEx budget allocations according to NDMA standards"
2. **NO RAW CODE POLICY**:
   - Never output raw programming scripts, Python code, or software files. If asked for code regarding urban thermodynamics, provide only the mathematical formula ($R_n - G = H + \\lambda E$), parameter tables, and analytical logic steps.

FORMATTING & PRESENTATION STANDARDS:
- Structure on-topic responses with crisp Markdown headers (\`### Title\`).
- Use structured Markdown Tables (\`| Header 1 | Header 2 | ... |\`) for comparative telemetry, intervention levers, and cost breakdowns.
- Use bolding (\`**value**\`) for key metrics, temperatures (°C), and costs (₹).
- Use concise bullet points (\`* \` or \`1. \`) for actionable recommendations and policy steps.
- Always keep explanations readable, authoritative, professional, and directly useful to municipal decision-makers.

${situationalContext}

--- RETRIEVED SCIENTIFIC & REGULATORY KNOWLEDGE (RAG) ---
${retrievedChunks
  .map((c, i) => `[Source ${i + 1}: ${c.title}]\n${c.content}`)
  .join("\n\n")}
`;

    // 4. Call Groq Cloud API
    const apiKey =
      process.env.GROQ_API_KEY?.trim() || process.env.GROK_API_KEY?.trim() || "";

    if (!apiKey) {
      return Response.json(
        {
          error:
            "GROQ_API_KEY is not configured. Please set GROQ_API_KEY in .env.local",
        },
        { status: 500 }
      );
    }
    const model = process.env.GROQ_MODEL?.trim() || "openai/gpt-oss-120b";

    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: apiMessages,
          temperature: 0.2,
          max_tokens: 2500,
        }),
      }
    );

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API Error with model:", model, groqRes.status, errText);

      // Fallback model trial
      const fallbackRes = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-20b",
            messages: apiMessages,
            temperature: 0.2,
            max_tokens: 2500,
          }),
        }
      );

      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        const reply = fallbackData.choices?.[0]?.message?.content || "";
        return Response.json({
          reply,
          sources: retrievedChunks.map((c) => c.title),
          modelUsed: "openai/gpt-oss-20b",
        });
      }

      return Response.json(
        {
          error: "Failed to generate response from Groq API.",
          details: errText,
        },
        { status: groqRes.status }
      );
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content || "";

    return Response.json({
      reply,
      sources: retrievedChunks.map((c) => c.title),
      modelUsed: model,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Error in /api/chat route:", err);
    return Response.json({ error: message }, { status: 500 });
  }
}
