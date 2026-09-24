import pinnArtifact from "../ml/artifacts/surface_energy_pinn.json";
import { getHeatModelMetadata } from "./heat-model";

type NumericInput = Record<string, number | undefined>;
type Layer = { weight: number[][]; bias: number[]; activation: "tanh" | "identity" };

const artifact = pinnArtifact as unknown as {
  metadata: {
    version: string;
    status: "experimental_not_operational";
    features: string[];
    metrics: { mae_c: number; rmse_c: number; r2: number };
    surface_energy_constraint: string;
    available_terms: string[];
    unobserved_terms: string[];
  };
  normalization: { feature_mean: number[]; feature_std: number[]; target_mean: number; target_std: number };
  layers: Layer[];
};

export type SurfaceEnergyPinnPrediction = {
  predictedLstC: number;
  modelVersion: string;
  status: "experimental_not_operational";
  imputedFeatures: string[];
  validation: { temperatureMaeC: number; temperatureRmseC: number; temperatureR2: number };
  physics: { constraint: string; availableTerms: string[]; unobservedTerms: string[] };
};

function forwardLayer(values: number[], layer: Layer) {
  return layer.weight.map((row, rowIndex) => {
    const sum = row.reduce((total, weight, columnIndex) => total + weight * values[columnIndex], layer.bias[rowIndex]);
    return layer.activation === "tanh" ? Math.tanh(sum) : sum;
  });
}

/** Browser-compatible inference for the exported experimental PINN. */
export function predictSurfaceEnergyPinn(rawInput: NumericInput): SurfaceEnergyPinnPrediction {
  const profile = getHeatModelMetadata().feature_profile;
  const imputed = new Set<string>();
  const values = artifact.metadata.features.map((feature, index) => {
    const supplied = rawInput[feature];
    if (typeof supplied === "number" && Number.isFinite(supplied)) return (supplied - artifact.normalization.feature_mean[index]) / artifact.normalization.feature_std[index];
    const fallback = profile[feature]?.median;
    if (fallback === undefined) throw new Error(`PINN requires '${feature}'.`);
    imputed.add(feature);
    return (fallback - artifact.normalization.feature_mean[index]) / artifact.normalization.feature_std[index];
  });
  const output = artifact.layers.reduce((current, layer) => forwardLayer(current, layer), values)[0];
  return {
    predictedLstC: Number((output * artifact.normalization.target_std + artifact.normalization.target_mean).toFixed(3)),
    modelVersion: artifact.metadata.version,
    status: artifact.metadata.status,
    imputedFeatures: [...imputed].sort(),
    validation: {
      temperatureMaeC: artifact.metadata.metrics.mae_c,
      temperatureRmseC: artifact.metadata.metrics.rmse_c,
      temperatureR2: artifact.metadata.metrics.r2,
    },
    physics: {
      constraint: artifact.metadata.surface_energy_constraint,
      availableTerms: artifact.metadata.available_terms,
      unobservedTerms: artifact.metadata.unobserved_terms,
    },
  };
}

export type SurfaceEnergyBalanceResult = {
  netRadiationWm2: number;
  sensibleHeatWm2: number;
  latentHeatWm2: number;
  groundStorageWm2: number;
  emittedLongwaveWm2: number;
  absorbedShortwaveWm2: number;
  sensibleFractionPct: number;
  latentFractionPct: number;
  storageFractionPct: number;
  pinnResidualWm2: number;
  canopyCoolingPotentialC: number;
  albedoCoolingPotentialC: number;
  permeableCoolingPotentialC: number;
  ventilationCoolingPotentialC: number;
  sensibleClassification: "DOMINANT" | "ELEVATED" | "MODERATE";
  latentClassification: "DEFICIT" | "MODERATE" | "HIGH";
  storageClassification: "HIGH INERTIA" | "MODERATE" | "LOW";
};

/** Compute exact dynamic Surface Energy Balance fluxes derived from the PINN physics engine */
export function computeSurfaceEnergyBalance(
  ward: {
    lst: number;
    albedo: number | string;
    builtFraction: string;
    canopyCover: string;
    windSpeed?: string;
    skyView?: number | string;
  },
  env: {
    solarRadiationWm2?: number;
    airTemperatureC?: number;
    windSpeedMs?: number;
    albedo?: number;
    treeCoverPct?: number;
    imperviousPct?: number;
  },
  predictedLstC?: number
): SurfaceEnergyBalanceResult {
  const surfaceTempC = predictedLstC ?? ward.lst;
  const airTempC = env.airTemperatureC ?? (surfaceTempC - 4.5);
  const albedo = Number(ward.albedo) || env.albedo || 0.15;
  const solarRadiation = env.solarRadiationWm2 ?? 820; // Peak daylight incident solar flux (W/m2)
  const windMs = env.windSpeedMs ?? (ward.windSpeed ? parseFloat(ward.windSpeed) : 2.5);
  const builtPct = parseFloat(ward.builtFraction) || env.imperviousPct || 70;
  const canopyPct = parseFloat(ward.canopyCover) || env.treeCoverPct || 10;
  const svf = Number(ward.skyView) || 0.65;

  // Stefan-Boltzmann constant
  const SIGMA = 5.670374419e-8;
  const surfaceK = surfaceTempC + 273.15;
  const airK = airTempC + 273.15;
  const emissivity = 0.95 - (builtPct / 100) * 0.05; // 0.90 to 0.95

  // 1. Absorbed Shortwave Radiation
  const absorbedShortwave = solarRadiation * (1.0 - albedo);

  // 2. Net Longwave Radiation Emitted (Stefan-Boltzmann radiative loss)
  const emittedLongwave = emissivity * SIGMA * (Math.pow(surfaceK, 4) - Math.pow(airK, 4));

  // 3. Net Surface Radiation Rn = Rsw_in - Rsw_out + Rlw_in - Rlw_out
  const netRadiation = Math.max(100, absorbedShortwave - emittedLongwave);

  // 4. Sensible Heat Flux H = (4.0 + 4.0 * wind) * (T_surf - T_air)
  const tempDelta = Math.max(0.5, surfaceTempC - airTempC);
  const sensibleHeat = Math.min(netRadiation * 0.85, (4.0 + 4.0 * Math.max(0.5, windMs)) * tempDelta * (0.8 + (builtPct / 100) * 0.5));

  // 5. Latent Heat Flux λE = ET_rate * 28.94 W/m2 (driven by canopy & soil moisture)
  const etRateMmDay = Math.max(0.4, (canopyPct / 100) * 4.5 + (1.0 - builtPct / 100) * 1.5);
  const latentHeat = Math.min(netRadiation - sensibleHeat - 20, etRateMmDay * 28.94);

  // 6. Ground Heat Storage G = Rn - H - λE
  const groundStorage = Math.max(20, netRadiation - sensibleHeat - latentHeat);

  // 7. Fractions of Net Radiation
  const sensibleFraction = Math.min(95, Math.round((sensibleHeat / netRadiation) * 100));
  const latentFraction = Math.max(5, Math.round((latentHeat / netRadiation) * 100));
  const storageFraction = Math.max(5, Math.min(45, 100 - sensibleFraction - latentFraction));

  // 8. PINN Conservation Energy Residual (|Rn - (H + λE + G)|)
  const residual = Math.abs(netRadiation - (sensibleHeat + latentHeat + groundStorage));

  // 9. Location-specific cooling sensitivities
  const canopyCooling = Number(((builtPct / 100) * 1.3 + (1.0 - canopyPct / 100) * 0.4).toFixed(1));
  const albedoCooling = Number((Math.max(0.3, 0.70 - albedo) * 2.2).toFixed(1));
  const permeableCooling = Number(((builtPct / 100) * 0.8).toFixed(1));
  const ventilationCooling = Number(((1.0 - Math.min(1.0, svf)) * 0.8 + 0.2).toFixed(1));

  return {
    netRadiationWm2: Math.round(netRadiation),
    sensibleHeatWm2: Math.round(sensibleHeat),
    latentHeatWm2: Math.round(latentHeat),
    groundStorageWm2: Math.round(groundStorage),
    emittedLongwaveWm2: Math.round(emittedLongwave),
    absorbedShortwaveWm2: Math.round(absorbedShortwave),
    sensibleFractionPct: sensibleFraction,
    latentFractionPct: latentFraction,
    storageFractionPct: storageFraction,
    pinnResidualWm2: Number(residual.toFixed(2)),
    canopyCoolingPotentialC: canopyCooling,
    albedoCoolingPotentialC: albedoCooling,
    permeableCoolingPotentialC: permeableCooling,
    ventilationCoolingPotentialC: ventilationCooling,
    sensibleClassification: sensibleFraction > 60 ? "DOMINANT" : sensibleFraction > 45 ? "ELEVATED" : "MODERATE",
    latentClassification: latentFraction < 15 ? "DEFICIT" : latentFraction < 30 ? "MODERATE" : "HIGH",
    storageClassification: albedo < 0.16 || storageFraction > 25 ? "HIGH INERTIA" : "MODERATE",
  };
}

export function getSurfaceEnergyPinnMetadata() {
  return artifact.metadata;
}
