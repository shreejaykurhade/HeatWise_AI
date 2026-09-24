"use client";

import { Hotspot, CityName, SeasonName, CITIES_DATA } from "../../data/heatData";
import type { AreaOption } from "../layout/GlobalHeader";
import type { InferenceTargetOption } from "../../page";
import { computeSurfaceEnergyBalance } from "../../../lib/surface-energy-pinn";

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
    decisionThreshold: number;
    confusionMatrix: [[number, number], [number, number]];
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
  const confusionMatrix = modelPrediction?.validation.confusionMatrix ?? [[89218, 1033], [5915, 4120]];
  const [[trueNegative, falsePositive], [falseNegative, truePositive]] = confusionMatrix;

  if (!activeHotspot) return null;
  const physicalDrivers = activeHotspot.driverBreakdown.slice(0, 5);
  const maxDriverImpact = Math.max(...physicalDrivers.map((driver) => Math.abs(driver.val)), 1);
  const env = currentSeasonData.env;
  const seb = computeSurfaceEnergyBalance(
    {
      lst: activeHotspot.lst,
      albedo: activeHotspot.albedo,
      builtFraction: activeHotspot.builtFraction,
      canopyCover: activeHotspot.canopyCover,
      windSpeed: activeHotspot.windSpeed,
      skyView: activeHotspot.skyView,
    },
    {
      airTemperatureC: currentSeasonData.meanLst - 4.5,
      solarRadiationWm2: season === "Summer" ? 840 : season === "Post_Monsoon" ? 680 : season === "Winter" ? 540 : 720,
      windSpeedMs: env.windSpeedMs,
      albedo: env.albedo,
      treeCoverPct: env.treeCoverPct,
      imperviousPct: env.imperviousPct,
    },
    shownTemperature
  );
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
        {/* Left: user-facing physical driver explanation + Biophysical Mechanism Analysis */}
        <div className="min-w-0 lg:col-span-7 flex flex-col gap-3">
          {/* Card 1: Local Physical Driver Breakdown */}
          <div className="border border-[#E2E8E5] bg-white p-4 shadow-xs rounded-xs">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#EDF2EF]">
              <div>
                <h3 className="font-sans text-xs sm:text-sm font-bold text-[#162220]">
                  Why this location is hot
                </h3>
                <p className="font-mono text-[9.5px] text-[#5C6E6A] mt-0.5">
                  Target: {analysisTarget} · Modeled LST: <strong>{shownTemperature !== undefined ? `${shownTemperature.toFixed(1)}°C` : "Computing…"}</strong>
                </p>
              </div>
              <span className="font-mono text-[8.5px] text-[#174D46] font-semibold bg-[#E8F3EE] px-2 py-0.5 rounded-2xs">
                LOCAL HEAT CONTRIBUTION
              </span>
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

            <div className="mt-4 pt-2 border-t border-[#EDF2EF] bg-[#FAFBFA] p-2.5 font-mono text-[9px] text-[#5C6E6A] rounded-xs">
              ℹ <strong>HOW TO READ THIS:</strong> Red factors add heat; green factors reduce it. Values are the local physical contribution estimate for this hotspot, displayed in °C—not opaque model-feature percentages. {modelPrediction?.imputedFeatures.length ? `${modelPrediction.imputedFeatures.length} secondary model inputs were profile-filled.` : "All required model inputs are available."}
            </div>
          </div>

          {/* Card 2: Biophysical Surface Energy & Microclimate Dynamics (Live PINN + SEB Output) */}
          <div className="border border-[#E2E8E5] bg-white p-4 shadow-xs rounded-xs flex-1 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between border-b border-[#EDF2EF] pb-2">
                <div>
                  <h3 className="font-sans text-xs sm:text-sm font-bold text-[#162220]">
                    Biophysical Mechanism & Energy Balance Context
                  </h3>
                  <span className="font-mono text-[9px] text-[#5C6E6A]">
                    Surface Energy Partitioning · Net Radiation R_n = H + λE + G
                  </span>
                </div>
                <span className="font-mono text-[8px] font-bold text-[#174D46] bg-[#E8F3EE] px-2 py-0.5 rounded-2xs border border-[#174D46]/20">
                  PHYSICS-GUIDED
                </span>
              </div>

              {/* 3 Physics Partitioning Metric Blocks (Live PINN Energy Breakdown) */}
              <div className="mt-3 grid grid-cols-3 gap-2 text-center font-mono">
                <div className="border border-[#E2E8E5] bg-[#FAFBFA] p-2 rounded-xs">
                  <span className="block text-[7.5px] uppercase font-bold text-[#6B7D79]">Sensible Heat (H)</span>
                  <strong className="text-sm font-bold text-[#C93B2B]">
                    {seb.sensibleClassification} ({seb.sensibleFractionPct}%)
                  </strong>
                  <span className="block text-[7px] text-[#7A8C88] mt-0.5">{seb.sensibleHeatWm2} W/m² atmospheric heating</span>
                </div>

                <div className="border border-[#E2E8E5] bg-[#FAFBFA] p-2 rounded-xs">
                  <span className="block text-[7.5px] uppercase font-bold text-[#6B7D79]">Evapotranspiration (λE)</span>
                  <strong className="text-sm font-bold text-[#2878B8]">
                    {seb.latentClassification} ({seb.latentFractionPct}%)
                  </strong>
                  <span className="block text-[7px] text-[#7A8C88] mt-0.5">{seb.latentHeatWm2} W/m² moisture cooling</span>
                </div>

                <div className="border border-[#E2E8E5] bg-[#FAFBFA] p-2 rounded-xs">
                  <span className="block text-[7.5px] uppercase font-bold text-[#6B7D79]">Ground Storage (G)</span>
                  <strong className="text-sm font-bold text-[#D9822B]">
                    {seb.storageClassification} ({seb.storageFractionPct}%)
                  </strong>
                  <span className="block text-[7px] text-[#7A8C88] mt-0.5">{seb.groundStorageWm2} W/m² built mass storage</span>
                </div>
              </div>

              {/* Microclimate Intervention Levers Table (Live sensitivity calculations) */}
              <div className="mt-3 border border-[#D7E5DF] bg-[#F7FBF9] p-3 rounded-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold uppercase text-[#174D46]">
                    Targeted Microclimate Cooling Levers
                  </span>
                  <span className="font-mono text-[8px] text-[#5C6E6A]">PHYSICAL SENSITIVITY</span>
                </div>

                <div className="space-y-1.5 text-[10.5px]">
                  <div className="flex items-center justify-between border-b border-[#E2E8E5] pb-1">
                    <span className="text-[#162220] flex items-center gap-1.5">
                      <span className="text-sm">🌳</span>
                      <strong>Canopy Expansion (+15% cover)</strong>
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#2E684A]">
                      ↓ {seb.canopyCoolingPotentialC}°C LST
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#E2E8E5] pb-1">
                    <span className="text-[#162220] flex items-center gap-1.5">
                      <span className="text-sm">🏢</span>
                      <strong>High-Albedo Cool Roofs (Albedo ≥ 0.65)</strong>
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#2E684A]">
                      ↓ {seb.albedoCoolingPotentialC}°C LST
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#E2E8E5] pb-1">
                    <span className="text-[#162220] flex items-center gap-1.5">
                      <span className="text-sm">💧</span>
                      <strong>Permeable Ground & Water Misting</strong>
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#2E684A]">
                      ↓ {seb.permeableCoolingPotentialC}°C LST
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-[#162220] flex items-center gap-1.5">
                      <span className="text-sm">💨</span>
                      <strong>Ventilation Corridors & SVF Shading</strong>
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#2E684A]">
                      ↓ {seb.ventilationCoolingPotentialC}°C LST
                    </span>
                  </div>
                </div>
              </div>

              {/* Energy Flux Balance & Implementation Guide */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="border border-[#E2E8E5] bg-[#FAFBFA] p-2.5 rounded-xs space-y-1">
                  <div className="font-mono text-[8px] uppercase tracking-wider text-[#174D46] font-bold">
                    ENERGY BALANCE CLOSURE
                  </div>
                  <div className="font-mono text-[10px] text-[#162220] flex justify-between">
                    <span>Net Radiation (R_n):</span>
                    <strong className="text-[#174D46]">{seb.netRadiationWm2} W/m²</strong>
                  </div>
                  <div className="font-mono text-[10px] text-[#162220] flex justify-between">
                    <span>Turbulent Flux (H + λE):</span>
                    <strong>{seb.sensibleHeatWm2 + seb.latentHeatWm2} W/m²</strong>
                  </div>
                  <div className="font-mono text-[10px] text-[#162220] flex justify-between">
                    <span>PINN Energy Residual:</span>
                    <strong className="text-[#2E684A]">&lt; {seb.pinnResidualWm2 || 2.5} W/m² ({((seb.pinnResidualWm2 / seb.netRadiationWm2) * 100).toFixed(1)}%)</strong>
                  </div>
                </div>

                <div className="border border-[#E2E8E5] bg-[#FAFBFA] p-2.5 rounded-xs space-y-1">
                  <div className="font-mono text-[8px] uppercase tracking-wider text-[#174D46] font-bold">
                    RECOMMENDED DEPLOYMENT
                  </div>
                  <div className="text-[10px] text-[#162220] space-y-0.5 leading-snug">
                    <p>• <strong>Phase 1:</strong> Roof whitewashing & shade trellises</p>
                    <p>• <strong>Phase 2:</strong> Miyawaki green pockets in barren lots</p>
                    <p>• <strong>Phase 3:</strong> Cool corridor ventilation alignment</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="border-t border-[#EDF2EF] pt-2 font-mono text-[8px] text-[#6B7D79] leading-relaxed">
              * The biophysical mechanisms above are computed dynamically from localized surface parameters (SVF {activeHotspot.skyView}, Albedo {activeHotspot.albedo}, Built {activeHotspot.builtFraction}, Canopy {activeHotspot.canopyCover}) using the PINN surface energy solver.
            </p>
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
                  ["Accuracy", modelPrediction?.validation.hotspotAccuracy ?? 0.93072],
                  ["Precision", modelPrediction?.validation.hotspotPrecision ?? 0.79953],
                  ["Recall", modelPrediction?.validation.hotspotRecall ?? 0.41056],
                  ["F1", modelPrediction?.validation.hotspotF1 ?? 0.54253],
                  ["ROC-AUC", modelPrediction?.validation.hotspotRocAuc ?? 0.95158],
                  ["PR-AUC", modelPrediction?.validation.hotspotPrAuc ?? 0.73068],
                ].map(([label, rawValue]) => {
                  const value = Number(rawValue);
                  return <div key={String(label)} className="grid grid-cols-[58px_1fr_36px] items-center gap-2 font-mono text-[8px]"><span>{label}</span><div className="h-2 bg-white/10"><div className="h-full bg-[#55A993]" style={{ width: `${value * 100}%` }} /></div><strong className="text-right">{(value * 100).toFixed(1)}%</strong></div>;
                })}
              </div>
              <div className="mt-2 flex flex-wrap justify-between gap-1 font-mono text-[8px] text-[#A0BCB6]"><span>High-confidence threshold: {((modelPrediction?.validation.decisionThreshold ?? 0.9525) * 100).toFixed(1)}%</span><span>Brier: {(modelPrediction?.validation.hotspotBrier ?? 0.05611).toFixed(3)} ↓ · Held-out: 100,286</span></div>
            </div>

            <div className="mt-4 border-t border-white/15 pt-3">
              <div className="mb-2 flex items-center justify-between font-mono text-[8px] text-[#B6CBC5]"><span>CONFUSION MATRIX · HELD-OUT CITIES</span><span>ACTUAL × PREDICTED</span></div>
              <div className="grid grid-cols-[72px_1fr_1fr] gap-1 font-mono text-[8px]">
                <div />
                <div className="pb-1 text-center text-[#A0BCB6]">PRED. NORMAL</div>
                <div className="pb-1 text-center text-[#A0BCB6]">PRED. HOTSPOT</div>
                <div className="flex items-center text-[#A0BCB6]">ACTUAL NORMAL</div>
                <div className="border border-[#55A993]/50 bg-[#174D46] p-2 text-center"><strong className="block text-sm text-white">{trueNegative.toLocaleString("en-IN")}</strong><span className="text-[#A0BCB6]">TRUE NEGATIVE</span></div>
                <div className="border border-[#DFA449]/40 bg-[#5B431D] p-2 text-center"><strong className="block text-sm text-[#FFE1A4]">{falsePositive.toLocaleString("en-IN")}</strong><span className="text-[#E8C98B]">FALSE POSITIVE</span></div>
                <div className="flex items-center text-[#A0BCB6]">ACTUAL HOTSPOT</div>
                <div className="border border-[#D86A5A]/45 bg-[#5A2823] p-2 text-center"><strong className="block text-sm text-[#FFB5AA]">{falseNegative.toLocaleString("en-IN")}</strong><span className="text-[#E9A097]">FALSE NEGATIVE</span></div>
                <div className="border border-[#55A993]/50 bg-[#174D46] p-2 text-center"><strong className="block text-sm text-white">{truePositive.toLocaleString("en-IN")}</strong><span className="text-[#A0BCB6]">TRUE POSITIVE</span></div>
              </div>
              <p className="mt-2 font-mono text-[8px] leading-relaxed text-[#A0BCB6]">Correct: {(trueNegative + truePositive).toLocaleString("en-IN")} · Incorrect: {(falsePositive + falseNegative).toLocaleString("en-IN")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
