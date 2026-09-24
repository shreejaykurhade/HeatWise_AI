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

export function getSurfaceEnergyPinnMetadata() {
  return artifact.metadata;
}
