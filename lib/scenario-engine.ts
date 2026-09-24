/**
 * HeatWise AI - Scenario Simulation & Counterfactual Heat Engine (Simplified)
 * 
 * Takes the current hotspot baseline feature vector, applies a chosen intervention
 * at a given intensity, runs the existing trained XGBoost model, and returns
 * the predicted counterfactual thermal state.
 */

import { predictUrbanHeat, getHeatModelMetadata } from "./heat-model";
import { Hotspot, CityData, CitySeasonData, SeasonName } from "../app/data/heatData";

export type InterventionType = "trees" | "roofs" | "shade" | "pavement";

export interface InterventionConfig {
  type: InterventionType;
  name: string;
  description: string;
  icon: string;
  maxIntensityPct: number;
}

export const INTERVENTION_OPTIONS: Record<InterventionType, InterventionConfig> = {
  trees: {
    type: "trees",
    name: "Tree / Green Cover",
    description: "Urban tree planting and canopy expansion.",
    icon: "🌲",
    maxIntensityPct: 40,
  },
  roofs: {
    type: "roofs",
    name: "Cool Roofs",
    description: "High-albedo reflective roof coatings.",
    icon: "🏢",
    maxIntensityPct: 60,
  },
  shade: {
    type: "shade",
    name: "Shade / Green Infrastructure",
    description: "Pedestrian walkways & green shading structures.",
    icon: "☂️",
    maxIntensityPct: 40,
  },
  pavement: {
    type: "pavement",
    name: "Permeable / Reflective Pavement",
    description: "Cool and porous street/pavement retrofit.",
    icon: "🧱",
    maxIntensityPct: 50,
  },
};

export interface ObservationPoint {
  day: number;
  expectedDeltaC: number;
  observedDeltaC: number;
  status: "Normal" | "Abnormal";
  note: string;
}

export interface AnomalyReport {
  location: string;
  city: string;
  intervention: string;
  intensityPct: number;
  modeledChangeC: number;
  observedChangeC: number;
  observationPeriodDays: number;
  anomalyStatus: "Normal" | "Anomaly Detected";
  anomalyDeltaC: number;
  suggestedAction: string;
  generatedAt: string;
}

export interface SimpleSimulationResult {
  baselineLst: number;
  scenarioLst: number;
  coolingDelta: number; // positive number: baseline - scenario
  deltaLst: number;     // scenario - baseline (negative when cooler)
  baselineRisk: string;
  scenarioRisk: string;
  baselineProb: number;
  scenarioProb: number;
  baselineUhi: number;
  scenarioUhi: number;
  intervention: InterventionType;
  intensityPct: number;
  observations: ObservationPoint[];
  anomalyReport: AnomalyReport;
}

const timingBySeason: Record<SeasonName, { month: number; day: number }> = {
  Summer: { month: 5, day: 135 },
  Monsoon: { month: 8, day: 227 },
  Post_Monsoon: { month: 10, day: 288 },
  Winter: { month: 1, day: 20 },
};

function buildBaselineVector(
  hotspot: Hotspot,
  cityData: CityData,
  seasonData: CitySeasonData,
  season: SeasonName
): Record<string, number | undefined> {
  const context = timingBySeason[season];
  const env = seasonData.env;
  const numPct = (v: string | undefined) => (v ? Number.parseFloat(v) / 100 : undefined);

  return {
    latitude: hotspot.lat,
    longitude: hotspot.lon,
    elevation_m: cityData.elevationM,
    distance_to_coast_km: cityData.distanceToCoastKm,
    month: context.month,
    day_of_year: context.day,
    air_temperature_c: env.airTempC,
    ndvi: typeof hotspot.ndvi === "number" ? hotspot.ndvi : env.ndvi,
    tree_cover_fraction: numPct(hotspot.canopyCover) ?? (env.treeCoverPct / 100),
    impervious_surface_fraction: numPct(hotspot.builtFraction) ?? (env.imperviousPct / 100),
    building_density: env.buildingDensityPct / 100,
    building_height_m: Number.parseFloat(hotspot.buildingHeight) || env.buildingHeightM,
    population_density_per_km2: env.populationDensity,
    sky_view_factor: typeof hotspot.skyView === "number" ? hotspot.skyView : env.skyViewFactor,
    albedo: typeof hotspot.albedo === "number" ? hotspot.albedo : env.albedo,
    relative_humidity_pct: env.humidityPct,
    wind_speed_ms: Number.parseFloat(hotspot.windSpeed) || env.windSpeedMs,
    solar_radiation_wm2: env.solarRadiationWm2,
    pm25_ug_m3: Number.parseFloat(hotspot.pm25) || env.pm25UgM3,
    industrial_proximity_index: /industrial/i.test(`${hotspot.name} ${hotspot.driver}`) ? 85 : 25,
    is_monsoon: season === "Monsoon" ? 1 : 0,
  };
}

function clamp(feature: string, value: number): number {
  const meta = getHeatModelMetadata();
  const profile = meta.feature_profile[feature];
  if (!profile) return value;
  return Math.min(profile.max, Math.max(profile.min, value));
}

/**
 * Main simulation function:
 * Takes the current hotspot features, applies intervention at intensity,
 * runs XGBoost predictUrbanHeat(), and returns simple results.
 */
export function simulateIntervention(
  hotspot: Hotspot,
  cityData: CityData,
  seasonData: CitySeasonData,
  season: SeasonName,
  intervention: InterventionType,
  intensityPct: number
): SimpleSimulationResult {
  const meta = getHeatModelMetadata();
  const baseVector = buildBaselineVector(hotspot, cityData, seasonData, season);
  const scenarioVector = { ...baseVector };

  const fraction = Math.max(0, Math.min(100, intensityPct)) / 100;

  if (intervention === "trees") {
    // Tree Cover: increases canopy cover, ndvi, green space; replaces impervious
    const baseTree = baseVector.tree_cover_fraction ?? meta.feature_profile["tree_cover_fraction"]?.median ?? 0.25;
    scenarioVector.tree_cover_fraction = clamp("tree_cover_fraction", baseTree + fraction * 0.40);

    const baseNdvi = baseVector.ndvi ?? meta.feature_profile["ndvi"]?.median ?? 0.26;
    scenarioVector.ndvi = clamp("ndvi", baseNdvi + fraction * 0.25);

    const baseImp = baseVector.impervious_surface_fraction ?? meta.feature_profile["impervious_surface_fraction"]?.median ?? 0.62;
    scenarioVector.impervious_surface_fraction = clamp("impervious_surface_fraction", baseImp - fraction * 0.25);
  } else if (intervention === "roofs") {
    // Cool Roofs: increases albedo, decreases roof_material_index & surface_material_index
    const baseAlbedo = baseVector.albedo ?? meta.feature_profile["albedo"]?.median ?? 0.19;
    scenarioVector.albedo = clamp("albedo", baseAlbedo + fraction * 0.12);

    const baseSatAlbedo = baseVector.satellite_albedo ?? meta.feature_profile["satellite_albedo"]?.median ?? 0.19;
    scenarioVector.satellite_albedo = clamp("satellite_albedo", baseSatAlbedo + fraction * 0.12);

    const baseRoof = baseVector.roof_material_index ?? meta.feature_profile["roof_material_index"]?.median ?? 5.54;
    scenarioVector.roof_material_index = clamp("roof_material_index", baseRoof - fraction * 3.5);

    const baseSurf = baseVector.surface_material_index ?? meta.feature_profile["surface_material_index"]?.median ?? 6.14;
    scenarioVector.surface_material_index = clamp("surface_material_index", baseSurf - fraction * 1.5);
  } else if (intervention === "shade") {
    // Shade / Green Infra: canopy proxy (bounded SVF adjustment & vegetative cover)
    const baseTree = baseVector.tree_cover_fraction ?? meta.feature_profile["tree_cover_fraction"]?.median ?? 0.25;
    scenarioVector.tree_cover_fraction = clamp("tree_cover_fraction", baseTree + fraction * 0.15);

    const baseSvf = baseVector.sky_view_factor ?? meta.feature_profile["sky_view_factor"]?.median ?? 0.53;
    scenarioVector.sky_view_factor = clamp("sky_view_factor", baseSvf - fraction * 0.08);
  } else if (intervention === "pavement") {
    // Permeable / Reflective Pavement: decreases impervious & pavement_type_index, increases albedo
    const baseImp = baseVector.impervious_surface_fraction ?? meta.feature_profile["impervious_surface_fraction"]?.median ?? 0.62;
    scenarioVector.impervious_surface_fraction = clamp("impervious_surface_fraction", baseImp - fraction * 0.25);

    const baseAlbedo = baseVector.albedo ?? meta.feature_profile["albedo"]?.median ?? 0.19;
    scenarioVector.albedo = clamp("albedo", baseAlbedo + fraction * 0.06);

    const basePav = baseVector.pavement_type_index ?? meta.feature_profile["pavement_type_index"]?.median ?? 4.48;
    scenarioVector.pavement_type_index = clamp("pavement_type_index", basePav - fraction * 2.5);
  }

  // Run existing XGBoost model
  const basePred = predictUrbanHeat(baseVector);
  const scenarioPred = predictUrbanHeat(scenarioVector);

  const baselineLst = basePred.predictedLstC;
  const scenarioLst = scenarioPred.predictedLstC;
  const coolingDelta = Number(Math.max(0, baselineLst - scenarioLst).toFixed(1));
  const deltaLst = Number((scenarioLst - baselineLst).toFixed(1));

  const cityMean = seasonData.meanLst;
  const baselineUhi = Number((baselineLst - cityMean).toFixed(1));
  const scenarioUhi = Number((scenarioLst - cityMean).toFixed(1));

  // 5 / 10 / 15-Day Post-Intervention Monitoring Simulation
  const exp5 = Number((-coolingDelta * 0.85).toFixed(1));
  const exp10 = Number((-coolingDelta * 0.95).toFixed(1));
  const exp15 = Number((-coolingDelta).toFixed(1));

  // Realistic sample monitoring observations
  const obs5 = Number((exp5 + 0.1).toFixed(1));
  const obs10 = Number((exp10 + 0.2).toFixed(1));
  const obs15 = coolingDelta > 1.2
    ? Number((exp15 + 1.6).toFixed(1)) // Anomaly if significant intervention
    : Number((exp15 + 0.2).toFixed(1));

  const isDay15Abnormal = coolingDelta > 1.2 && Math.abs(obs15 - exp15) >= 1.0;

  const observations: ObservationPoint[] = [
    {
      day: 5,
      expectedDeltaC: exp5,
      observedDeltaC: obs5,
      status: "Normal",
      note: "Thermal change within expected ±0.3°C variance.",
    },
    {
      day: 10,
      expectedDeltaC: exp10,
      observedDeltaC: obs10,
      status: "Normal",
      note: "Vegetative/albedo reflectance stabilized as expected.",
    },
    {
      day: 15,
      expectedDeltaC: exp15,
      observedDeltaC: obs15,
      status: isDay15Abnormal ? "Abnormal" : "Normal",
      note: isDay15Abnormal
        ? "Observed heat remains above the expected post-intervention range."
        : "Post-intervention temperature aligned with counterfactual model.",
    },
  ];

  const anomalyDelta = Number(Math.abs(obs15 - exp15).toFixed(1));
  const anomalyReport: AnomalyReport = {
    location: hotspot.name,
    city: cityData.name,
    intervention: INTERVENTION_OPTIONS[intervention].name,
    intensityPct,
    modeledChangeC: -coolingDelta,
    observedChangeC: obs15,
    observationPeriodDays: 15,
    anomalyStatus: isDay15Abnormal ? "Anomaly Detected" : "Normal",
    anomalyDeltaC: anomalyDelta,
    suggestedAction: isDay15Abnormal
      ? "Audit in-situ vegetation health / coating integrity, verify surface moisture and nearby traffic heat sources."
      : "Thermal response is nominal. Proceed with standard seasonal monitoring.",
    generatedAt: new Date().toISOString(),
  };

  return {
    baselineLst,
    scenarioLst,
    coolingDelta,
    deltaLst,
    baselineRisk: basePred.riskBand,
    scenarioRisk: scenarioPred.riskBand,
    baselineProb: basePred.hotspotProbability,
    scenarioProb: scenarioPred.hotspotProbability,
    baselineUhi,
    scenarioUhi,
    intervention,
    intensityPct,
    observations,
    anomalyReport,
  };
}
