"use client";

import { Hotspot, CityName, SeasonName, CITIES_DATA } from "../../data/heatData";
import type { AreaOption } from "../layout/GlobalHeader";
import type { InferenceTargetOption } from "../../page";

type ModelPrediction = {
  predictedLstC: number;
  hotspotProbability: number;
  hotspot: boolean;
  riskBand: string;
  modelVersion: string;
  keyDrivers: Array<{ feature: string; importance: number }>;
  imputedFeatures: string[];
  validation: {
    temperatureMaeC: number; temperatureRmseC: number; temperatureR2: number;
    hotspotAccuracy: number; hotspotPrecision: number; hotspotRecall: number;
    hotspotRocAuc: number; hotspotPrAuc: number; hotspotF1: number; hotspotBrier: number;
  };
};

type PinnPrediction = {
  predictedLstC: number;
  modelVersion: string;
  status: "experimental_not_operational";
  imputedFeatures: string[];
  validation: { temperatureMaeC: number; temperatureRmseC: number; temperatureR2: number };
  physics: { constraint: string; availableTerms: string[]; unobservedTerms: string[] };
};

interface DriverAnalysisViewProps {
  city: CityName;
  season: SeasonName;
  selectedHotspotName: string;
  selectedArea?: AreaOption;
  modelPrediction: ModelPrediction | null;
  modelLoading: boolean;
  modelError: string;
  pinnPrediction: PinnPrediction | null;
  analysisModel: "xgboost" | "pinn";
  onSelectAnalysisModel: (model: "xgboost" | "pinn") => void;
  inferenceTargets: InferenceTargetOption[];
  selectedInferenceTarget: string;
  onSelectInferenceTarget: (value: string) => void;
}

export default function DriverAnalysisView({
  city,
  season,
  selectedHotspotName,
  selectedArea,
  modelPrediction,
  modelLoading,
  modelError,
  pinnPrediction,
  analysisModel,
  onSelectAnalysisModel,
  inferenceTargets,
  selectedInferenceTarget,
  onSelectInferenceTarget,
}: DriverAnalysisViewProps) {
  const currentCityData = CITIES_DATA[city];
  const currentSeasonData = currentCityData.seasons[season];
  const hotspots: readonly Hotspot[] = currentSeasonData.hotspots;
  const activeHotspot =
    hotspots.find((h) => h.name === selectedHotspotName) || hotspots[0];
  const targetIsWard = selectedInferenceTarget.startsWith("ward::");
  const areaHasDetailedData = !selectedArea || selectedArea.name.toLowerCase().replace(/\s+ncr$/, "") === city.toLowerCase().replace(/\s+ncr$/, "");
  const selectedAreaMatchesCity = targetIsWard && areaHasDetailedData;
  const analysisTarget = targetIsWard ? activeHotspot?.name : (selectedArea?.name ?? city);
  const shownTemperature = analysisModel === "pinn" ? pinnPrediction?.predictedLstC : modelPrediction?.predictedLstC;
  const shownModelVersion = analysisModel === "pinn" ? pinnPrediction?.modelVersion : modelPrediction?.modelVersion;

  if (!activeHotspot) return null;
  const physicalDrivers = activeHotspot.driverBreakdown.slice(0, 5);
  const maxDriverImpact = Math.max(...physicalDrivers.map((driver) => Math.abs(driver.val)), 1);
  const env = currentSeasonData.env;
  const parameterRows: Array<[string, string]> = selectedAreaMatchesCity ? [
    ["Canopy Cover Fraction", activeHotspot.canopyCover],
    ["Impervious Built Fraction", activeHotspot.builtFraction],
    ["Mean Building Height", activeHotspot.buildingHeight],
    ["Sky-View Factor (SVF)", String(activeHotspot.skyView)],
    ["Surface Albedo", String(activeHotspot.albedo)],
    ["Surface Wind", activeHotspot.windSpeed],
    ["PM2.5 Aerosol", activeHotspot.pm25],
  ] : areaHasDetailedData ? [
    ["Tree Cover Fraction", `${env.treeCoverPct.toFixed(1)}%`],
    ["Impervious Built Fraction", `${env.imperviousPct.toFixed(1)}%`],
    ["Mean Building Height", `${env.buildingHeightM.toFixed(1)} m`],
    ["Sky-View Factor (SVF)", env.skyViewFactor.toFixed(2)],
    ["Surface Albedo", env.albedo.toFixed(2)],
    ["Surface Wind", `${env.windSpeedMs.toFixed(1)} m/s`],
    ["PM2.5 Aerosol", `${env.pm25UgM3.toFixed(1)} µg/m³`],
  ] : [
    ["Latitude", selectedArea?.lat.toFixed(4) ?? "—"],
    ["Longitude", selectedArea?.lon.toFixed(4) ?? "—"],
    ["Peak Surface Temperature", selectedArea ? `${selectedArea.peakLst.toFixed(1)}°C` : "—"],
    ["Mean UHI Anomaly", selectedArea ? `+${selectedArea.uhiMean.toFixed(1)}°C` : "—"],
    ["Observed Risk Band", selectedArea?.risk ?? "—"],
    ["Climate Zone", selectedArea?.zone ?? "—"],
  ];

  return (
    <div className="view-container driver-analysis-layout space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2">
        {[
          ["Selected area", selectedArea ? `${selectedArea.name}, ${selectedArea.state}` : `${city}, ${currentCityData.state}`],
          ["Selected model", shownModelVersion ?? (analysisModel === "pinn" ? "PINN" : "XGBoost")],
          ["Predicted surface temp", modelLoading ? "Computing…" : shownTemperature !== undefined ? `${shownTemperature.toFixed(1)}°C` : "Unavailable"],
          ["Hotspot probability", modelPrediction ? `${(modelPrediction.hotspotProbability * 100).toFixed(1)}%` : "—"],
          ["Classification", modelPrediction?.riskBand ?? (modelError || "—")],
        ].map(([label, value]) => (
          <div key={label} className="border border-[#DCE7E3] bg-white p-2.5 rounded-xs shadow-xs">
            <div className="font-mono text-[8px] uppercase tracking-wider text-[#6B7D79] font-bold">{label}</div>
            <div className="mt-1 font-sans text-xs font-bold text-[#162220] truncate" title={value}>{value}</div>
          </div>
        ))}
      </div>
      {/* Workspace Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8E5] pb-2">
        <div>
          <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#174D46] font-bold">
            {analysisModel === "pinn" ? "EXPERIMENTAL PINN · SURFACE-ENERGY CROSS-CHECK" : "XGBOOST INFERENCE · LOCAL PHYSICAL HEAT EXPLANATION"}
          </span>
          <h2 className="font-sans text-base sm:text-lg font-bold text-[#162220]">
            Physical Heat Driver Breakdown · {analysisTarget}
          </h2>
        </div>

        {/* Ward Quick Switcher */}
        <div className="flex flex-wrap items-center justify-end gap-2">
          <label htmlFor="analysis-model-select" className="font-mono text-[8.5px] text-[#5C6E6A] font-bold uppercase">
            MODEL:
          </label>
          <select
            id="analysis-model-select"
            aria-label="Select analysis model"
            value={analysisModel}
            onChange={(e) => onSelectAnalysisModel(e.target.value as "xgboost" | "pinn")}
            className="w-[195px] bg-white border border-[#174D46] px-2.5 py-1 font-mono text-xs font-bold text-[#162220] rounded-xs outline-none"
          >
            <option value="xgboost">Operational XGBoost</option>
            <option value="pinn">Experimental PINN</option>
          </select>
          <label htmlFor="driver-ward-select" className="font-mono text-[8.5px] text-[#5C6E6A] font-bold uppercase">
            INFERENCE TARGET:
          </label>
          <select
            id="driver-ward-select"
            aria-label="Select Target Ward"
            value={selectedInferenceTarget}
            onChange={(e) => onSelectInferenceTarget(e.target.value)}
            className="w-[min(420px,55vw)] bg-white border border-[#E2E8E5] px-2.5 py-1 font-mono text-xs text-[#162220] rounded-xs outline-none"
          >
            {Object.entries(inferenceTargets.reduce<Record<string, InferenceTargetOption[]>>((groups, target) => {
              (groups[target.group] ||= []).push(target);
              return groups;
            }, {})).map(([group, targets]) => (
              <optgroup key={group} label={group}>
                {targets.map((target) => <option key={target.value} value={target.value}>{target.label}</option>)}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: SHAP Horizontal Bar Chart + Physical Validation Evidence */}
      <div className="grid min-w-0 grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: user-facing physical driver explanation */}
        <div className="min-w-0 lg:col-span-7 border border-[#E2E8E5] bg-white p-4 shadow-xs rounded-xs">
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#EDF2EF]">
            <div>
              <h3 className="font-sans text-xs sm:text-sm font-bold text-[#162220]">
                Why this location is hot
              </h3>
              <p className="font-mono text-[9.5px] text-[#5C6E6A] mt-0.5">
                Target: {analysisTarget} · Modeled LST: <strong>{shownTemperature !== undefined ? `${shownTemperature.toFixed(1)}°C` : "Computing…"}</strong>
              </p>
            </div>
            <span className="font-mono text-[8.5px] text-[#174D46] font-semibold">LOCAL HEAT CONTRIBUTION</span>
          </div>

          {/* Horizontal Contribution Bars */}
          <div className="space-y-3 pt-1">
            {physicalDrivers.map((driver, idx) => {
              const barWidth = Math.max(4, (Math.abs(driver.val) / maxDriverImpact) * 100);
              const heating = driver.val >= 0;

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-sans text-xs font-medium text-[#162220]">
                      {driver.name}
                    </span>
                    <span
                      className="font-mono text-xs font-bold text-[#174D46]"
                    >
                      {heating ? "+" : ""}{driver.val.toFixed(1)}°C {heating ? "heating" : "cooling"}
                    </span>
                  </div>

                  {/* Full-width contribution magnitude track */}
                  <div className="w-full h-2.5 bg-[#F4F7F5] border border-[#E2E8E5] rounded-xs relative overflow-hidden">
                    <div
                      className={`h-full absolute inset-y-0 left-0 transition-[width] duration-300 ${heating ? "bg-gradient-to-r from-[#E66A37] to-[#C93B2B]" : "bg-gradient-to-r from-[#5A9E7A] to-[#174D46]"}`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-2.5 border-t border-[#EDF2EF] bg-[#FAFBFA] p-2.5 font-mono text-[9px] text-[#5C6E6A] rounded-xs">
            ℹ <strong>HOW TO READ THIS:</strong> Red factors add heat; green factors reduce it. Values are the local physical contribution estimate for this hotspot, displayed in °C—not opaque model-feature percentages. {modelPrediction?.imputedFeatures.length ? `${modelPrediction.imputedFeatures.length} secondary model inputs were profile-filled.` : "All required model inputs are available."}
          </div>
        </div>

        {/* Right: Inputs and model validation */}
        <div className="min-w-0 lg:col-span-5 flex flex-col gap-3">
          <div className="border border-[#E2E8E5] bg-white p-4 shadow-xs rounded-xs">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#EDF2EF]">
              <h3 className="font-sans text-xs sm:text-sm font-bold text-[#162220]">
                {areaHasDetailedData ? "Environmental Input Parameters" : "Available Station Inputs"}
              </h3>
              <span className="bg-[#174D46]/10 text-[#174D46] border border-[#174D46]/25 px-2 py-0.5 font-mono text-[8.5px] font-bold rounded-xs">
                {selectedAreaMatchesCity ? "WARD INPUTS" : areaHasDetailedData ? "CITY INPUTS" : "STATION INPUTS"}
              </span>
            </div>

            <table className="w-full text-xs font-mono" aria-label="Biophysical parameters table">
              <tbody>{parameterRows.map(([label, value]) => (
                <tr key={label} className="border-b border-[#EDF2EF] last:border-0">
                  <td className="py-2 text-[#5C6E6A]">{label}</td>
                  <td className="py-2 text-right font-bold text-[#162220]">{value}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>

          <div className="border border-[#0B1C1A] bg-[#0B1C1A] text-white p-3.5 shadow-xs rounded-xs">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="font-mono text-[8.5px] uppercase tracking-wider text-[#8BA8A0] font-bold">MODEL PERFORMANCE</div>
              <div className="flex items-center gap-3 font-mono text-[8px]"><span><i className="inline-block h-2 w-2 bg-[#55A993] mr-1" />XGBOOST</span><span><i className="inline-block h-2 w-2 bg-[#EFD17B] mr-1" />PINN</span></div>
            </div>

            <div className="space-y-3">
              {[
                { label: "LST MAE · LOWER IS BETTER", xgb: modelPrediction?.validation.temperatureMaeC ?? 0.9786, pinn: pinnPrediction?.validation.temperatureMaeC ?? 1.09, max: 1.5, unit: "°C" },
                { label: "LST RMSE · LOWER IS BETTER", xgb: modelPrediction?.validation.temperatureRmseC ?? 1.2252, pinn: pinnPrediction?.validation.temperatureRmseC ?? 1.3715, max: 1.5, unit: "°C" },
                { label: "LST R² · HIGHER IS BETTER", xgb: modelPrediction?.validation.temperatureR2 ?? 0.97659, pinn: pinnPrediction?.validation.temperatureR2 ?? 0.9716, max: 1, unit: "" },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="mb-1 font-mono text-[8px] text-[#B6CBC5]">{metric.label}</div>
                  <div className="grid grid-cols-[58px_1fr_42px] items-center gap-2 font-mono text-[8px]">
                    <span>XGBoost</span><div className="h-2 bg-white/10"><div className="h-full bg-[#55A993]" style={{ width: `${Math.min(100, (metric.xgb / metric.max) * 100)}%` }} /></div><strong className="text-right">{metric.xgb.toFixed(metric.unit ? 2 : 3)}{metric.unit}</strong>
                    <span>PINN</span><div className="h-2 bg-white/10"><div className="h-full bg-[#EFD17B]" style={{ width: `${Math.min(100, (metric.pinn / metric.max) * 100)}%` }} /></div><strong className="text-right text-[#EFD17B]">{metric.pinn.toFixed(metric.unit ? 2 : 3)}{metric.unit}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-white/15 pt-3">
              <div className="mb-2 font-mono text-[8px] text-[#B6CBC5]">XGBOOST HOTSPOT CLASSIFIER</div>
              <div className="space-y-1.5">
                {[
                  ["Accuracy", modelPrediction?.validation.hotspotAccuracy ?? 0.92475],
                  ["Precision", modelPrediction?.validation.hotspotPrecision ?? 0.60315],
                  ["Recall", modelPrediction?.validation.hotspotRecall ?? 0.72486],
                  ["F1", modelPrediction?.validation.hotspotF1 ?? 0.65843],
                  ["ROC-AUC", modelPrediction?.validation.hotspotRocAuc ?? 0.95158],
                  ["PR-AUC", modelPrediction?.validation.hotspotPrAuc ?? 0.73068],
                ].map(([label, rawValue]) => {
                  const value = Number(rawValue);
                  return <div key={String(label)} className="grid grid-cols-[58px_1fr_36px] items-center gap-2 font-mono text-[8px]"><span>{label}</span><div className="h-2 bg-white/10"><div className="h-full bg-[#55A993]" style={{ width: `${value * 100}%` }} /></div><strong className="text-right">{(value * 100).toFixed(1)}%</strong></div>;
                })}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[8px] text-[#A0BCB6]"><span>Brier error: {(modelPrediction?.validation.hotspotBrier ?? 0.05611).toFixed(3)} ↓</span><span>Held-out: 100,286</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
