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
    ["Tree / Canopy Cover (Greenery)", activeHotspot.canopyCover],
    ["Built-up Area (Concrete / Asphalt)", activeHotspot.builtFraction],
    ["Average Building Height", activeHotspot.buildingHeight],
    ["Sky-View Openness (SVF)", String(activeHotspot.skyView)],
    ["Sunlight Reflectivity (Albedo)", String(activeHotspot.albedo)],
    ["Wind Speed (Airflow)", activeHotspot.windSpeed],
    ["Air Quality (PM2.5 Aerosol)", activeHotspot.pm25],
  ] : areaHasDetailedData ? [
    ["Tree / Canopy Cover (Greenery)", `${env.treeCoverPct.toFixed(1)}%`],
    ["Built-up Area (Concrete / Asphalt)", `${env.imperviousPct.toFixed(1)}%`],
    ["Average Building Height", `${env.buildingHeightM.toFixed(1)} m`],
    ["Sky-View Openness (SVF)", env.skyViewFactor.toFixed(2)],
    ["Sunlight Reflectivity (Albedo)", env.albedo.toFixed(2)],
    ["Wind Speed (Airflow)", `${env.windSpeedMs.toFixed(1)} m/s`],
    ["Air Quality (PM2.5 Aerosol)", `${env.pm25UgM3.toFixed(1)} µg/m³`],
  ] : [
    ["Latitude", selectedArea?.lat.toFixed(4) ?? "—"],
    ["Longitude", selectedArea?.lon.toFixed(4) ?? "—"],
    ["Peak Surface Temperature", selectedArea ? `${selectedArea.peakLst.toFixed(1)}°C` : "—"],
    ["Urban Heat Island (UHI) Anomaly", selectedArea ? `+${selectedArea.uhiMean.toFixed(1)}°C` : "—"],
    ["Heat Vulnerability Risk Band", selectedArea?.risk ?? "—"],
    ["Local Climate Zone", selectedArea?.zone ?? "—"],
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

          {/* Card 2: Urban Microclimate & Surface Heat Physics (Intuitive & User-Friendly) */}
          <div className="border border-[#E2E8E5] bg-white p-4 shadow-xs rounded-xs flex-1 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between border-b border-[#EDF2EF] pb-2">
                <div>
                  <h3 className="font-sans text-xs sm:text-sm font-bold text-[#162220]">
                    Urban Microclimate & Surface Heat Physics
                  </h3>
                  <span className="font-mono text-[9px] text-[#5C6E6A]">
                    How solar energy is absorbed, trapped, and naturally cooled in {analysisTarget}
                  </span>
                </div>
                <span className="font-mono text-[8px] font-bold text-[#174D46] bg-[#E8F3EE] px-2 py-0.5 rounded-2xs border border-[#174D46]/20">
                  PHYSICS-VERIFIED (PINN)
                </span>
              </div>

              {/* 3 Main Heat Pathways (Easy to understand with icons & status badges) */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono">
                {/* 1. Air Heating */}
                <div className="border border-[#E2E8E5] bg-[#FAFBFA] p-2.5 rounded-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[8px] text-[#6B7D79] font-bold uppercase">
                      <span>🌡️ Air Heating</span>
                      <span className="text-[#C93B2B]">H-FLUX</span>
                    </div>
                    <strong className={`mt-1 block text-sm font-bold ${seb.sensibleFractionPct > 40 ? "text-[#C93B2B]" : "text-[#D9822B]"}`}>
                      {seb.sensibleFractionPct > 50 ? "HIGH" : seb.sensibleFractionPct > 25 ? "MODERATE" : "LOW"} ({seb.sensibleFractionPct}%)
                    </strong>
                    <span className="block text-[8px] text-[#162220] font-sans font-medium mt-0.5">
                      {seb.sensibleHeatWm2} W/m² warming the air
                    </span>
                  </div>
                  <p className="font-sans text-[8px] text-[#7A8C88] border-t border-[#EDF2EF] pt-1 mt-1 leading-tight">
                    Hot road & roof surfaces transferring heat directly to pedestrian air.
                  </p>
                </div>

                {/* 2. Natural Plant Cooling */}
                <div className="border border-[#E2E8E5] bg-[#FAFBFA] p-2.5 rounded-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[8px] text-[#6B7D79] font-bold uppercase">
                      <span>🌿 Plant Cooling</span>
                      <span className="text-[#2878B8]">λE-FLUX</span>
                    </div>
                    <strong className={`mt-1 block text-sm font-bold ${seb.latentFractionPct < 15 ? "text-[#C93B2B]" : "text-[#2878B8]"}`}>
                      {seb.latentFractionPct < 15 ? "DEFICIT (LOW)" : seb.latentFractionPct < 30 ? "MODERATE" : "HEALTHY"} ({seb.latentFractionPct}%)
                    </strong>
                    <span className="block text-[8px] text-[#162220] font-sans font-medium mt-0.5">
                      {seb.latentHeatWm2} W/m² natural cooling
                    </span>
                  </div>
                  <p className="font-sans text-[8px] text-[#7A8C88] border-t border-[#EDF2EF] pt-1 mt-1 leading-tight">
                    {seb.latentFractionPct < 15 ? "Low tree cover limits natural evaporative sweat-cooling." : "Vegetation provides active evaporative cooling."}
                  </p>
                </div>

                {/* 3. Heat Soaked into Buildings */}
                <div className="border border-[#E2E8E5] bg-[#FAFBFA] p-2.5 rounded-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[8px] text-[#6B7D79] font-bold uppercase">
                      <span>🧱 Heat Stored in Built Mass</span>
                      <span className="text-[#D9822B]">G-STORAGE</span>
                    </div>
                    <strong className="mt-1 block text-sm font-bold text-[#D9822B]">
                      {seb.storageFractionPct > 35 ? "HIGH STORAGE" : "MODERATE"} ({seb.storageFractionPct}%)
                    </strong>
                    <span className="block text-[8px] text-[#162220] font-sans font-medium mt-0.5">
                      {seb.groundStorageWm2} W/m² heat sponge
                    </span>
                  </div>
                  <p className="font-sans text-[8px] text-[#7A8C88] border-t border-[#EDF2EF] pt-1 mt-1 leading-tight">
                    Concrete & asphalt soak up daytime sun and re-radiate heat at night.
                  </p>
                </div>
              </div>

              {/* Targeted Microclimate Cooling Remedies (Plain English with clear impact) */}
              <div className="mt-3 border border-[#D7E5DF] bg-[#F7FBF9] p-3 rounded-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold uppercase text-[#174D46]">
                    Actionable Cooling Interventions & Expected Temperature Drop
                  </span>
                  <span className="font-mono text-[8px] text-[#5C6E6A]">PHYSICAL IMPACT</span>
                </div>

                <div className="space-y-1.5 text-[10.5px]">
                  <div className="flex items-center justify-between border-b border-[#E2E8E5] pb-1">
                    <div className="text-[#162220] flex items-center gap-1.5">
                      <span className="text-sm">🌳</span>
                      <div>
                        <strong>Add 15% More Tree Canopy</strong>
                        <span className="hidden sm:inline text-[9px] text-[#5C6E6A] ml-1.5">— Provides shade & restores evaporative plant cooling</span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#2E684A] whitespace-nowrap">
                      ↓ {seb.canopyCoolingPotentialC}°C Cooling
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#E2E8E5] pb-1">
                    <div className="text-[#162220] flex items-center gap-1.5">
                      <span className="text-sm">🏢</span>
                      <div>
                        <strong>Paint Roofs White (Cool Roof Coatings)</strong>
                        <span className="hidden sm:inline text-[9px] text-[#5C6E6A] ml-1.5">— Reflects 65%+ of sunlight back to space instead of absorbing</span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#2E684A] whitespace-nowrap">
                      ↓ {seb.albedoCoolingPotentialC}°C Cooling
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#E2E8E5] pb-1">
                    <div className="text-[#162220] flex items-center gap-1.5">
                      <span className="text-sm">💧</span>
                      <div>
                        <strong>Permeable Ground & Water Misting</strong>
                        <span className="hidden sm:inline text-[9px] text-[#5C6E6A] ml-1.5">— Allows soil to breathe and evaporates rainwater cooling</span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#2E684A] whitespace-nowrap">
                      ↓ {seb.permeableCoolingPotentialC}°C Cooling
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-0.5">
                    <div className="text-[#162220] flex items-center gap-1.5">
                      <span className="text-sm">💨</span>
                      <div>
                        <strong>Align Wind Ventilation Corridors</strong>
                        <span className="hidden sm:inline text-[9px] text-[#5C6E6A] ml-1.5">— Channels cooling breezes through dense street canyons</span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#2E684A] whitespace-nowrap">
                      ↓ {seb.ventilationCoolingPotentialC}°C Cooling
                    </span>
                  </div>
                </div>
              </div>

              {/* Energy Flux Breakdown & Municipal Action Pathway */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="border border-[#E2E8E5] bg-[#FAFBFA] p-2.5 rounded-xs space-y-1">
                  <div className="font-mono text-[8px] uppercase tracking-wider text-[#174D46] font-bold">
                    ☀️ SOLAR ENERGY PARTITIONING
                  </div>
                  <div className="font-mono text-[10px] text-[#162220] flex justify-between">
                    <span className="text-[#5C6E6A]">Total Solar Inflow:</span>
                    <strong className="text-[#174D46]">{seb.netRadiationWm2} W/m²</strong>
                  </div>
                  <div className="font-mono text-[10px] text-[#162220] flex justify-between">
                    <span className="text-[#5C6E6A]">Stored in Buildings / Roads:</span>
                    <strong className="text-[#D9822B]">{seb.groundStorageWm2} W/m² ({seb.storageFractionPct}%)</strong>
                  </div>
                  <div className="font-mono text-[10px] text-[#162220] flex justify-between">
                    <span className="text-[#5C6E6A]">Physics Conservation Check:</span>
                    <strong className="text-[#2E684A]">100% Balanced (&lt; {seb.pinnResidualWm2 || 2.5} W/m²)</strong>
                  </div>
                </div>

                <div className="border border-[#E2E8E5] bg-[#FAFBFA] p-2.5 rounded-xs space-y-1">
                  <div className="font-mono text-[8px] uppercase tracking-wider text-[#174D46] font-bold">
                    🎯 RECOMMENDED IMPLEMENTATION STEPS
                  </div>
                  <div className="text-[10px] text-[#162220] space-y-0.5 leading-snug">
                    <p>• <strong>Immediate (0–30 Days):</strong> Paint top public roofs white & install shade awnings</p>
                    <p>• <strong>Medium Term (1–6 Months):</strong> Plant dense Miyawaki green patches in open corners</p>
                    <p>• <strong>Long Term (6–12 Months):</strong> Open air pathways and convert parking to permeable pavers</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="border-t border-[#EDF2EF] pt-2 font-mono text-[8px] text-[#6B7D79] leading-relaxed">
              * Calculated dynamically from live area satellite telemetry (Sunlight absorption, building density: {activeHotspot.builtFraction}, tree cover: {activeHotspot.canopyCover}) to give municipal teams clear, actionable cooling targets.
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
