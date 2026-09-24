import modelArtifact from "../ml/artifacts/heatwise_models.json";

type NumericInput = Record<string, number | undefined>;
type TreeNode = {
  v: number;
  f: number;
  t: number;
  l: number;
  r: number;
  m: boolean;
  leaf: boolean;
};
type PortableModel = {
  features: string[];
  baseline: number;
  trees: TreeNode[][];
};

const artifact = modelArtifact as unknown as {
  metadata: {
    version: string;
    synthetic_data_warning: boolean;
    regression_metrics: Record<string, unknown>;
    classification_metrics: { threshold: number; [key: string]: unknown };
    regression_importance: Array<{ feature: string; importance: number }>;
    classification_importance: Array<{ feature: string; importance: number }>;
    feature_profile: Record<string, { median: number; min: number; max: number }>;
  };
  regressor: PortableModel;
  classifier: PortableModel;
};

export type HeatPrediction = {
  predictedLstC: number;
  hotspotProbability: number;
  hotspot: boolean;
  riskBand: "Low" | "Moderate" | "High" | "Very High";
  modelVersion: string;
  imputedFeatures: string[];
  outOfRangeFeatures: string[];
  keyDrivers: Array<{ feature: string; importance: number }>;
  validation: {
    temperatureMaeC: number;
    temperatureR2: number;
    hotspotRocAuc: number;
    hotspotF1: number;
    decisionThreshold: number;
    holdoutCities: string[];
  };
  syntheticDataWarning: true;
};

function withDerivedFeatures(input: NumericInput): NumericInput {
  const month = input.month;
  const day = input.day_of_year;
  return {
    ...input,
    month_sin: month === undefined ? undefined : Math.sin((2 * Math.PI * month) / 12),
    month_cos: month === undefined ? undefined : Math.cos((2 * Math.PI * month) / 12),
    day_sin: day === undefined ? undefined : Math.sin((2 * Math.PI * day) / 365.25),
    day_cos: day === undefined ? undefined : Math.cos((2 * Math.PI * day) / 365.25),
  };
}

function modelVector(model: PortableModel, input: NumericInput, imputed: Set<string>) {
  return model.features.map((feature) => {
    const value = input[feature];
    if (typeof value === "number" && Number.isFinite(value)) return value;
    const fallback = artifact.metadata.feature_profile[feature]?.median;
    if (fallback !== undefined) {
      imputed.add(feature);
      return fallback;
    }
    throw new Error(`Missing required derived feature: ${feature}`);
  });
}

function rawPredict(model: PortableModel, values: number[]) {
  let prediction = model.baseline;
  for (const tree of model.trees) {
    let index = 0;
    while (!tree[index].leaf) {
      const node = tree[index];
      const value = values[node.f];
      index = Number.isNaN(value) ? (node.m ? node.l : node.r) : value < node.t ? node.l : node.r;
    }
    prediction += tree[index].v;
  }
  return prediction;
}

function sigmoid(value: number) {
  if (value >= 0) return 1 / (1 + Math.exp(-value));
  const exp = Math.exp(value);
  return exp / (1 + exp);
}

function riskBand(probability: number): HeatPrediction["riskBand"] {
  if (probability >= 0.85) return "Very High";
  if (probability >= 0.6) return "High";
  if (probability >= 0.3) return "Moderate";
  return "Low";
}

export function predictUrbanHeat(rawInput: NumericInput): HeatPrediction {
  const input = withDerivedFeatures(rawInput);
  const imputed = new Set<string>();
  const outOfRange = new Set<string>();
  for (const [feature, profile] of Object.entries(artifact.metadata.feature_profile)) {
    const value = input[feature];
    if (typeof value === "number" && (value < profile.min || value > profile.max)) {
      outOfRange.add(feature);
    }
  }

  const regValues = modelVector(artifact.regressor, input, imputed);
  const predictedLstC = rawPredict(artifact.regressor, regValues);
  const classifierInput = { ...input, predicted_lst_c: predictedLstC };
  const clsValues = modelVector(artifact.classifier, classifierInput, imputed);
  const probability = sigmoid(rawPredict(artifact.classifier, clsValues));
  const threshold = artifact.metadata.classification_metrics.threshold;

  return {
    predictedLstC: Number(predictedLstC.toFixed(3)),
    hotspotProbability: Number(probability.toFixed(6)),
    hotspot: probability >= threshold,
    riskBand: riskBand(probability),
    modelVersion: artifact.metadata.version,
    imputedFeatures: [...imputed].sort(),
    outOfRangeFeatures: [...outOfRange].sort(),
    keyDrivers: artifact.metadata.classification_importance.slice(0, 8),
    validation: {
      temperatureMaeC: artifact.metadata.regression_metrics.mae_c as number,
      temperatureR2: artifact.metadata.regression_metrics.r2 as number,
      hotspotRocAuc: artifact.metadata.classification_metrics.roc_auc as number,
      hotspotF1: artifact.metadata.classification_metrics.f1 as number,
      decisionThreshold: threshold,
      holdoutCities: ["Bengaluru", "Delhi", "Mumbai"],
    },
    syntheticDataWarning: true,
  };
}

export function getHeatModelMetadata() {
  return artifact.metadata;
}
