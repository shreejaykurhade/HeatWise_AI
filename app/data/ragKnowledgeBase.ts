export interface KnowledgeChunk {
  id: string;
  category: "physics" | "interventions" | "economics" | "standards" | "cities";
  title: string;
  content: string;
  keywords: string[];
}

export const RAG_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: "phys-energy-balance",
    category: "physics",
    title: "Surface Energy Balance & Thermodynamic Conservation",
    content: `The fundamental equation governing Land Surface Temperature (LST) is surface energy conservation:
R_n - G = H + λE
Where:
- R_n = Net radiation = (1 - α)S↓ + L↓ - L↑ (α is surface albedo, S↓ is incoming solar insolation)
- G = Ground / conductive heat storage into building materials and asphalt
- H = Sensible heat flux to the atmosphere (turbulent heat convection)
- λE = Latent heat flux driven by vegetative evapotranspiration and surface moisture.
In dense Indian urban cores, low albedo (α ~ 0.12 - 0.18) and high impervious fraction (>75%) drastically increase G and H while reducing λE to near zero, driving Urban Heat Island (UHI) anomalies of +6°C to +12°C above rural baselines.`,
    keywords: [
      "energy balance",
      "thermodynamics",
      "albedo",
      "lst",
      "uhi",
      "sensible heat",
      "latent heat",
      "physics",
      "equation",
    ],
  },
  {
    id: "phys-svf-morphology",
    category: "physics",
    title: "Urban Morphology, Sky-View Factor (SVF) & Roughness Length",
    content: `Urban geometry traps longwave radiative heat through multiple street canyon reflections.
- Sky-View Factor (SVF): The fraction of visible sky seen from the ground (0 = enclosed narrow canyon, 1 = open sky). SVF < 0.40 in dense clusters like Dharavi (Mumbai) or Old Delhi impedes nocturnal radiative cooling, keeping nighttime temperatures +4°C to +8°C higher.
- Aerodynamic Roughness Length (z_0): Higher building heights (z_0 > 2.0m) reduce near-surface ventilation, trapping thermal plumes and anthropogenic air conditioning exhaust.`,
    keywords: [
      "svf",
      "sky-view factor",
      "morphology",
      "street canyon",
      "building height",
      "roughness",
      "ventilation",
      "canyon",
    ],
  },
  {
    id: "int-cool-roofs",
    category: "interventions",
    title: "High-Albedo Cool Roof Coatings (SRI ≥ 82)",
    content: `High-Albedo Cool Roofs utilize elastomeric solar-reflective paints (Solar Reflectance Index SRI ≥ 82, albedo α ≥ 0.70):
- Direct Impact: Reflects up to 80% of solar insolation compared to unpainted tin/concrete roofs (α ~ 0.15).
- Cooling Efficacy: Reduces rooftop surface temperatures by 12°C - 20°C and local ambient Land Surface Temperature by 1.2°C to 2.4°C at 40% ward coverage.
- Cost Benchmark: ₹45 - ₹70 per square meter (approx. ₹0.85 Cr to ₹1.4 Cr per km² of roof area).
- Co-benefits: Lowers indoor top-floor temperatures by 2.5°C - 4.5°C, reducing household cooling demand and heatstroke risk for low-income residents.`,
    keywords: [
      "cool roofs",
      "albedo",
      "sri",
      "coating",
      "roofs",
      "paint",
      "tin roof",
      "cost",
      "efficiency",
      "indoor",
    ],
  },
  {
    id: "int-urban-canopy",
    category: "interventions",
    title: "Urban Tree Canopy Expansion & Green Corridors",
    content: `Urban forestry provides dual microclimate benefits: direct solar shading and active evapotranspiration (latent heat conversion λE):
- Cooling Efficacy: 30% tree canopy expansion in an urban ward delivers -1.5°C to -2.8°C LST reduction and lowers Wet-Bulb Globe Temperature (WBGT) by 1.8°C.
- Native Indian Species: Neem (Azadirachta indica), Peepal (Ficus religiosa), Jamun (Syzygium cumini), and Gulmohar provide dense canopy, high drought resistance, and significant PM2.5 particulate filtration.
- Cost Benchmark: ₹1.2 Cr - ₹2.2 Cr per km² including sapling procurement, drip irrigation, and 3-year survival maintenance.`,
    keywords: [
      "urban canopy",
      "trees",
      "forest",
      "evapotranspiration",
      "green corridor",
      "neem",
      "shade",
      "vegetation",
      "wbgt",
    ],
  },
  {
    id: "int-shade-sails",
    category: "interventions",
    title: "Tensile Shade Sails & Temporary Summer Awnings",
    content: `Engineered HDPE tensile shade sails (UV block ≥ 95%) deployed over pedestrian corridors, open vegetable markets, and bus stops:
- Cooling Efficacy: Provides immediate radiant heat shielding, reducing mean radiant temperature (MRT) by up to 10°C and micro-LST by 0.8°C - 1.5°C.
- Cost Benchmark: ₹350 - ₹600 per square meter (approx. ₹0.40 Cr to ₹0.90 Cr for high-density pedestrian junctions).
- Rapid Deployment: Ideal for fast municipal rollouts within 2 weeks prior to peak summer heatwave alerts.`,
    keywords: [
      "shade sails",
      "tensile",
      "awnings",
      "pedestrian",
      "mrt",
      "market",
      "rapid deployment",
      "uv block",
    ],
  },
  {
    id: "int-permeable-pavement",
    category: "interventions",
    title: "Permeable & Reflective Interlocking Pavers",
    content: `Porous concrete and high-albedo interlocking permeable pavers replace standard asphalt:
- Cooling Efficacy: Evaporative cooling from retained sub-surface moisture lowers pavement surface temperature by 4°C - 8°C (-0.6°C to -1.2°C ambient LST).
- Cost Benchmark: ₹850 - ₹1,400 per square meter.
- Multi-Benefit: Prevents monsoon urban flooding by recharging local aquifers while mitigating dry summer surface heat accumulation.`,
    keywords: [
      "permeable pavement",
      "porous",
      "asphalt",
      "pavers",
      "evaporative",
      "drainage",
      "aquifer",
    ],
  },
  {
    id: "econ-budget-pareto",
    category: "economics",
    title: "Pareto-Optimal Municipal Budget Allocation & ROI",
    content: `Municipal CapEx allocation requires balancing three competing objectives: (1) Maximizing °C temperature drop, (2) Maximizing vulnerable population protected, and (3) Minimizing total municipal CapEx.
- Efficiency Benchmark: Cool Roofs provide the highest °C reduction per crore invested (₹0.85 Cr/km² for ~1.8°C drop).
- Long-Term Resilience Benchmark: Tree Canopy provides the highest co-benefits (biodiversity, air quality, flood attenuation) with long-term 20-year asset life.
- Electricity Grid Impact: Every 1.0°C reduction in ambient urban temperature reduces city-wide air conditioning electrical load by 2.8% to 4.2%, saving ~277 MWh/yr per dense ward.`,
    keywords: [
      "pareto",
      "budget",
      "optimizer",
      "capex",
      "cost benefit",
      "roi",
      "energy saved",
      "mwh",
      "allocation",
      "efficiency",
    ],
  },
  {
    id: "std-ndma-imd",
    category: "standards",
    title: "NDMA Heat Action Plan (HAP) & IMD Heatwave Criteria",
    content: `Indian Meteorological Department (IMD) & NDMA National Guidelines:
- Heatwave Criteria (Plains): Maximum temperature ≥ 40.0°C AND departure from normal ≥ 4.5°C (or absolute temperature ≥ 45.0°C).
- Severe Heatwave: Departure from normal ≥ 6.4°C (or absolute temperature ≥ 47.0°C).
- Wet-Bulb Globe Temperature (WBGT) Risk Bands:
  * WBGT 28°C - 31°C: Moderate heat stress (advisory).
  * WBGT 31°C - 34°C: High heat stress (active cooling centers, reschedule outdoor labor).
  * WBGT > 34°C: Extreme danger (immediate heatstroke risk, deploy emergency water tankers).`,
    keywords: [
      "imd",
      "ndma",
      "heat action plan",
      "hap",
      "heatwave",
      "threshold",
      "wbgt",
      "criteria",
      "standards",
      "alert",
    ],
  },
  {
    id: "isro-satellite-eo",
    category: "standards",
    title: "ISRO & Multi-Sensor Earth Observation Telemetry",
    content: `HeatWise AI processes multi-spectral satellite telemetry:
- Sentinel-2 MSI (10m - 20m): NDVI vegetation canopy, MNDWI water indices, Built-up Index (NDBI).
- Landsat 8/9 TIRS (30m/100m): High-resolution thermal infrared split-window Land Surface Temperature (LST).
- MODIS Terra/Aqua (1km): Twice-daily surface albedo and diurnal thermal inertia.
- INSAT-3D/3DR (4km): Geostationary hourly thermal sounding for real-time heatwave trajectory tracking across India.
- ERA5-Land (9km): 2m air temperature, dew point, 10m surface wind vectors, and surface solar radiation fluxes.`,
    keywords: [
      "isro",
      "satellite",
      "sentinel-2",
      "landsat",
      "modis",
      "insat-3d",
      "era5",
      "telemetry",
      "lst",
      "thermal",
    ],
  },
];

/**
 * Fast keyword and term overlap retriever for RAG context construction
 */
export function retrieveRelevantKnowledge(
  query: string,
  limit: number = 3
): KnowledgeChunk[] {
  const normalizedQuery = query.toLowerCase();
  const tokens = normalizedQuery
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);

  const scored = RAG_KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;
    // Exact title match bonus
    if (normalizedQuery.includes(chunk.title.toLowerCase())) score += 15;

    // Keyword match
    for (const kw of chunk.keywords) {
      if (normalizedQuery.includes(kw)) score += 8;
      for (const token of tokens) {
        if (kw.includes(token)) score += 3;
      }
    }

    // Content match
    for (const token of tokens) {
      const regex = new RegExp(`\\b${token}\\b`, "gi");
      const matches = chunk.content.match(regex);
      if (matches) score += matches.length * 1.5;
    }

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.chunk);
}
