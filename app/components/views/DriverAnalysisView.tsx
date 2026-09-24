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
  validation: { temperatureMaeC: number; temperatureR2: number; hotspotRocAuc: number; hotspotF1: number };
};

const featureLabel = (feature: string) => feature
  .replace(/_/g, " ")
  .replace(/\b\w/g, (letter) => letter.toUpperCase());

interface DriverAnalysisViewProps {
  city: CityName;
  season: SeasonName;
  selectedHotspotName: string;
  selectedArea?: AreaOption;
  modelPrediction: ModelPrediction | null;
  modelLoading: boolean;
  modelError: string;
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

  if (!activeHotspot) return null;
  const modelDrivers = modelPrediction?.keyDrivers.slice(0, 6) ?? [];
  const maxDriverImportance = Math.max(...modelDrivers.map((driver) => driver.importance), 1);
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
          ["Model", modelPrediction?.modelVersion ?? "XGBoost"],
          ["Predicted surface temp", modelLoading ? "Computing…" : modelPrediction ? `${modelPrediction.predictedLstC.toFixed(1)}°C` : "Unavailable"],
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
            XGBOOST INFERENCE · MODEL FEATURE ATTRIBUTION
          </span>
          <h2 className="font-sans text-base sm:text-lg font-bold text-[#162220]">
            Physical Heat Driver Breakdown · {analysisTarget}
          </h2>
        </div>

        {/* Ward Quick Switcher */}
        <div className="flex items-center gap-2">
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
        {/* Left: SHAP Horizontal Contribution Chart */}
        <div className="min-w-0 lg:col-span-7 border border-[#E2E8E5] bg-white p-4 shadow-xs rounded-xs">
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#EDF2EF]">
            <div>
              <h3 className="font-sans text-xs sm:text-sm font-bold text-[#162220]">
                Model-Derived Driver Importance
              </h3>
              <p className="font-mono text-[9.5px] text-[#5C6E6A] mt-0.5">
                Target: {analysisTarget} · Modeled LST: <strong>{modelPrediction ? `${modelPrediction.predictedLstC.toFixed(1)}°C` : "Computing…"}</strong>
              </p>
            </div>
            <span className="font-mono text-[8.5px] text-[#174D46] font-semibold">GAIN IMPORTANCE</span>
          </div>

          {/* Horizontal Contribution Bars */}
          <div className="space-y-3 pt-1">
            {modelDrivers.map((driver, idx) => {
              const barWidth = Math.max(4, (driver.importance / maxDriverImportance) * 100);

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-sans text-xs font-medium text-[#162220]">
                      {featureLabel(driver.feature)}
                    </span>
                    <span
                      className="font-mono text-xs font-bold text-[#174D46]"
                    >
                      {((driver.importance / maxDriverImportance) * 100).toFixed(1)}%
                    </span>
                  </div>

                  {/* Full-width contribution magnitude track */}
                  <div className="w-full h-2.5 bg-[#F4F7F5] border border-[#E2E8E5] rounded-xs relative overflow-hidden">
                    <div
                      className="h-full absolute inset-y-0 left-0 transition-[width] duration-300 bg-gradient-to-r from-[#2E766B] to-[#174D46]"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-2.5 border-t border-[#EDF2EF] bg-[#FAFBFA] p-2.5 font-mono text-[9px] text-[#5C6E6A] rounded-xs">
            ℹ <strong>LIVE INFERENCE:</strong> Importance values are returned by model {modelPrediction?.modelVersion ?? "XGBoost"}. {modelPrediction?.imputedFeatures.length ?? 0} unavailable inputs were filled from the training profile.
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

          <div className="border border-white/10 bg-[#0B1C1A] text-white p-3.5 shadow-xs rounded-xs">
            <div className="font-mono text-[8.5px] uppercase tracking-wider text-[#8BA8A0] mb-1 font-bold">
              MODEL VALIDATION
            </div>
            <div className="font-sans text-xs sm:text-sm font-bold text-white mb-1">
              Temperature MAE: {modelPrediction ? `${modelPrediction.validation.temperatureMaeC.toFixed(2)}°C` : "—"}
            </div>
            <p className="font-mono text-[9px] text-[#A0BCB6] leading-relaxed">
              R² {modelPrediction?.validation.temperatureR2.toFixed(3) ?? "—"} · Hotspot ROC-AUC {modelPrediction?.validation.hotspotRocAuc.toFixed(3) ?? "—"} · F1 {modelPrediction?.validation.hotspotF1.toFixed(3) ?? "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
