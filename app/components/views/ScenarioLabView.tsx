"use client";

import { useState, useMemo, useEffect } from "react";
import { CITIES_DATA, CityName, SeasonName, Hotspot } from "../../data/heatData";
import {
  simulateIntervention,
  INTERVENTION_OPTIONS,
  InterventionType,
  SimpleSimulationResult,
} from "../../../lib/scenario-engine";
import IndiaMap from "../map/IndiaMap";

interface Props {
  city: CityName;
  season: SeasonName;
  selectedHotspotName: string;
  onSelectCity: (city: CityName) => void;
  onSelectHotspot: (hotspot: string) => void;
}

const TIMELINE_DAYS = [0, 5, 10, 15] as const;
type TimelineDay = (typeof TIMELINE_DAYS)[number];

const MUNICIPAL_PLAN_STAGES: Record<
  TimelineDay,
  { label: string; action: string; desc: string }
> = {
  0: {
    label: "Day 0 · Baseline Diagnosis",
    action: "Archive In-Situ Satellite Thermal Profile",
    desc: "Pre-work heat wave footprint. Municipal corporation confirms hotspot priority & procurement.",
  },
  5: {
    label: "Day 5 · Implementation Groundwork",
    action: "Site Clearing, Tree Saplings & Surface Prep",
    desc: "Municipal teams deploy initial greening & cool material ground layers.",
  },
  10: {
    label: "Day 10 · Canopy & Reflectance Activation",
    action: "High-Albedo Coating & Micro-Irrigation Active",
    desc: "Reflective roofs & tree canopy microclimates begin active surface cooling.",
  },
  15: {
    label: "Day 15 · Full Cooling Established",
    action: "Thermal Stabilization & Satellite Verification",
    desc: "Target post-intervention heat reduction reached across the municipal zone.",
  },
};

export default function ScenarioLabView({
  city,
  season,
  selectedHotspotName,
  onSelectCity,
  onSelectHotspot,
}: Props) {
  const currentCityData = CITIES_DATA[city];
  const currentSeasonData = currentCityData.seasons[season];
  const hotspots = currentSeasonData.hotspots;

  const ward: Hotspot =
    hotspots.find((item) => item.name === selectedHotspotName) ?? hotspots[0];

  // 1. Core Simulation State
  const [selectedIntervention, setSelectedIntervention] = useState<InterventionType>("trees");
  const [intensityPct, setIntensityPct] = useState<number>(25);
  const [hasSimulated, setHasSimulated] = useState<boolean>(true);
  const [mapMode, setMapMode] = useState<"baseline" | "simulated" | "change">("simulated");
  const [showAnomalyModal, setShowAnomalyModal] = useState<boolean>(false);

  // 2. Timeline Simulation Over Time
  const [timelineDay, setTimelineDay] = useState<TimelineDay>(15);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // 3. Counterfactual Simulation Calculation
  const simulation: SimpleSimulationResult = useMemo(() => {
    return simulateIntervention(
      ward,
      currentCityData,
      currentSeasonData,
      season,
      selectedIntervention,
      intensityPct
    );
  }, [ward, currentCityData, currentSeasonData, season, selectedIntervention, intensityPct]);

  const activeInterventionConfig = INTERVENTION_OPTIONS[selectedIntervention];

  // Timeline progression factor (0.0 at Day 0, 0.33 at Day 5, 0.67 at Day 10, 1.0 at Day 15)
  const timelineProgress = timelineDay / 15;
  const currentTimelineTemp =
    simulation.baselineLst - simulation.coolingDelta * timelineProgress;
  const currentTimelineCooling = simulation.coolingDelta * timelineProgress;

  // Auto-play timeline loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimelineDay((prev) => {
        const nextIndex = (TIMELINE_DAYS.indexOf(prev) + 1) % TIMELINE_DAYS.length;
        return TIMELINE_DAYS[nextIndex];
      });
    }, 1400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSimulate = () => {
    setHasSimulated(true);
    setMapMode("simulated");
    setTimelineDay(15);
    setIsPlaying(false);
  };

  const scenarioOverlay = useMemo(() => {
    if (!hasSimulated) return undefined;
    return {
      mode: mapMode,
      simulatedLst: currentTimelineTemp,
      coolingDelta: simulation.coolingDelta,
      scenarioRisk: timelineDay >= 10 ? simulation.scenarioRisk : simulation.baselineRisk,
      timelineStep: timelineProgress,
      timelineDay: timelineDay,
    };
  }, [hasSimulated, mapMode, currentTimelineTemp, simulation, timelineProgress, timelineDay]);

  return (
    <div className="view-container space-y-3">
      {/* 1. Header Bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8E5] pb-2.5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#174D46] bg-[#E8F3EE] px-2 py-0.5 rounded-2xs">
              SCENARIO LAB · THERMAL MAP SIMULATOR
            </span>
            <span className="font-mono text-[9px] font-bold text-[#D9822B] bg-[#FFF8EE] px-2 py-0.5 rounded-2xs border border-[#D9822B]/20">
              SIMULATION OVER TIME · {currentCityData.state.toUpperCase()}
            </span>
          </div>
          <h2 className="mt-0.5 font-sans text-lg font-bold text-[#162220]">
            {ward.name} · Municipal Cooling Action Simulation
          </h2>
        </div>

        {/* Hotspot & City Selector */}
        <div className="flex items-center gap-2">
          <select
            value={ward.name}
            onChange={(e) => onSelectHotspot(e.target.value)}
            className="border border-[#D2DDD8] bg-white px-2.5 py-1.5 font-sans text-xs font-semibold text-[#162220] rounded-xs shadow-2xs focus:outline-none focus:ring-1 focus:ring-[#174D46]"
            aria-label="Select Target Area"
          >
            {hotspots.map((h) => (
              <option key={h.name} value={h.name}>
                {h.name} ({h.temp})
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* 2. Main Workstation: Large Thermal Map (Left) + Clean Control Panel (Right) */}
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
        {/* Left / Main Area: Large Thermal Map + Timeline Player */}
        <section className="border border-[#E2E8E5] bg-white shadow-xs rounded-xs xl:col-span-8 flex flex-col overflow-hidden">
          {/* Map Layer Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EDF2EF] px-3.5 py-2 bg-[#FAFBFA]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#174D46]">
                THERMAL MAP VIEW
              </span>
              <span className="text-[10px] text-[#5C6E6A]">
                {mapMode === "baseline" && "Current in-situ heat profile"}
                {mapMode === "simulated" &&
                  `Day ${timelineDay} in-situ heat: ${currentTimelineTemp.toFixed(1)}°C (↓ ${currentTimelineCooling.toFixed(1)}°C)`}
                {mapMode === "change" &&
                  `Predicted cooling benefit: ↓ ${currentTimelineCooling.toFixed(1)}°C`}
              </span>
            </div>

            {/* Before / After / Change Toggle */}
            <div className="flex items-center gap-1 bg-white border border-[#D2DDD8] p-0.5 rounded-xs">
              <button
                onClick={() => {
                  setMapMode("baseline");
                  setTimelineDay(0);
                  setIsPlaying(false);
                }}
                className={`px-3 py-1 font-mono text-[9.5px] font-bold rounded-2xs transition-colors cursor-pointer ${
                  mapMode === "baseline"
                    ? "bg-[#0B1C1A] text-white"
                    : "text-[#5C6E6A] hover:bg-[#F2F8F5]"
                }`}
              >
                BASELINE
              </button>
              <button
                onClick={() => {
                  setMapMode("simulated");
                  setTimelineDay(15);
                }}
                className={`px-3 py-1 font-mono text-[9.5px] font-bold rounded-2xs transition-colors cursor-pointer ${
                  mapMode === "simulated"
                    ? "bg-[#174D46] text-white"
                    : "text-[#5C6E6A] hover:bg-[#F2F8F5]"
                }`}
              >
                SIMULATED
              </button>
              <button
                onClick={() => {
                  setMapMode("change");
                  setTimelineDay(15);
                }}
                className={`px-3 py-1 font-mono text-[9.5px] font-bold rounded-2xs transition-colors cursor-pointer ${
                  mapMode === "change"
                    ? "bg-[#2E684A] text-white"
                    : "text-[#5C6E6A] hover:bg-[#F2F8F5]"
                }`}
              >
                CHANGE (Δ°C)
              </button>
            </div>
          </div>

          {/* Map Canvas */}
          <div className="h-[460px] relative">
            <IndiaMap
              city={city}
              season={season}
              mode={mapMode === "change" ? "Cooling opportunity" : "Heat stress"}
              selectedHotspot={selectedHotspotName}
              onSelectCity={onSelectCity}
              onSelectHotspot={onSelectHotspot}
              scenarioOverlay={scenarioOverlay}
            />

            {/* Map Status Pill */}
            <div className="absolute top-3 left-3 bg-[#0B1C1A]/90 text-white px-3 py-1.5 rounded-xs border border-white/15 backdrop-blur-xs text-[10px] font-mono z-10 flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  timelineDay === 0 ? "bg-[#FF5252]" : "bg-[#10B981]"
                } animate-pulse`}
              />
              <span>
                DAY {timelineDay} · {ward.name} · {currentTimelineTemp.toFixed(1)}°C (
                {timelineDay === 0 ? "Baseline" : `↓ ${currentTimelineCooling.toFixed(1)}°C`})
              </span>
            </div>
          </div>

          {/* 3. SIMULATION OVER TIME: Interactive Timeline Player Bar */}
          <div className="border-t border-[#E2E8E5] bg-[#F7FBF9] p-3 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] font-bold rounded-xs transition-colors cursor-pointer shadow-2xs ${
                    isPlaying
                      ? "bg-[#C93B2B] text-white hover:bg-[#B33123]"
                      : "bg-[#174D46] text-white hover:bg-[#113B35]"
                  }`}
                >
                  <span>{isPlaying ? "⏸ PAUSE" : "▶ PLAY TIMELINE"}</span>
                </button>
                <span className="font-mono text-[9px] font-bold text-[#174D46]">
                  MUNICIPAL INTERVENTION TIMELINE
                </span>
              </div>

              <div className="font-mono text-[10px] text-[#162220] font-bold bg-white border border-[#D2DDD8] px-2.5 py-0.5 rounded-xs">
                <span>Current State: </span>
                <span className="text-[#174D46]">{MUNICIPAL_PLAN_STAGES[timelineDay].label}</span>
              </div>
            </div>

            {/* Timeline Stepper */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {TIMELINE_DAYS.map((d) => {
                const isActive = timelineDay === d;
                const isPast = timelineDay >= d;
                const stage = MUNICIPAL_PLAN_STAGES[d];
                const stageTemp = simulation.baselineLst - simulation.coolingDelta * (d / 15);

                return (
                  <button
                    key={d}
                    onClick={() => {
                      setTimelineDay(d);
                      setIsPlaying(false);
                      if (mapMode === "baseline" && d > 0) setMapMode("simulated");
                    }}
                    className={`p-2 rounded-xs border text-left transition-all cursor-pointer ${
                      isActive
                        ? "border-[#174D46] bg-white shadow-xs ring-1 ring-[#174D46]"
                        : isPast
                        ? "border-[#D7E5DF] bg-[#E8F3EE]/60 hover:bg-white"
                        : "border-[#E2E8E5] bg-[#FAFBFA] opacity-75 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[9px]">
                      <strong className={isActive ? "text-[#174D46]" : "text-[#44534F]"}>
                        Day {d}
                      </strong>
                      <span className="font-bold text-[#162220]">{stageTemp.toFixed(1)}°C</span>
                    </div>
                    <div className="mt-1 text-[9.5px] font-semibold text-[#162220] truncate">
                      {stage.action}
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-[8.5px] text-[#5C6E6A] font-sans">
              <strong>Municipal Plan Phase:</strong> {MUNICIPAL_PLAN_STAGES[timelineDay].desc}
            </p>
          </div>
        </section>

        {/* Small Right Control Panel */}
        <section className="border border-[#E2E8E5] bg-white p-4 shadow-xs rounded-xs xl:col-span-4 flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            <div className="border-b border-[#EDF2EF] pb-2">
              <span className="font-mono text-[8.5px] font-bold uppercase tracking-wider text-[#174D46]">
                SCENARIO SIMULATION
              </span>
              <div className="mt-1">
                <span className="text-[10px] text-[#5C6E6A] block uppercase font-mono">Selected Area</span>
                <strong className="text-sm font-bold text-[#162220]">{ward.name}</strong>
              </div>
            </div>

            {/* Intervention Selection */}
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-[#6B7E7A] block mb-1.5">
                Intervention
              </span>
              <div className="space-y-1.5">
                {(Object.keys(INTERVENTION_OPTIONS) as InterventionType[]).map((key) => {
                  const opt = INTERVENTION_OPTIONS[key];
                  const isSelected = selectedIntervention === key;
                  return (
                    <label
                      key={key}
                      onClick={() => setSelectedIntervention(key)}
                      className={`flex items-center justify-between p-2.5 rounded-xs border cursor-pointer transition-all ${
                        isSelected
                          ? "border-[#174D46] bg-[#F2F8F5] text-[#174D46] font-bold shadow-2xs"
                          : "border-[#E2E8E5] bg-[#FAFBFA] text-[#44534F] hover:bg-[#F7FAF8]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{opt.icon}</span>
                        <span className="text-xs">{opt.name}</span>
                      </div>
                      <input
                        type="radio"
                        name="intervention"
                        checked={isSelected}
                        onChange={() => setSelectedIntervention(key)}
                        className="accent-[#174D46] cursor-pointer"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Intensity Slider */}
            <div className="border border-[#E2E8E5] bg-[#FAFBFA] p-3 rounded-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#162220]">
                  {activeInterventionConfig.name} Intensity
                </span>
                <span className="font-mono text-xs font-bold text-[#174D46] bg-[#E8F3EE] px-2 py-0.5 rounded-2xs">
                  +{intensityPct}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max={activeInterventionConfig.maxIntensityPct}
                step="5"
                value={Math.min(intensityPct, activeInterventionConfig.maxIntensityPct)}
                onChange={(e) => setIntensityPct(Number(e.target.value))}
                className="mt-2.5 w-full accent-[#174D46] cursor-pointer"
                aria-label="Intervention Intensity Slider"
              />
              <div className="flex justify-between text-[8.5px] font-mono text-[#6B7E7A] mt-1">
                <span>0%</span>
                <span>+{Math.round(activeInterventionConfig.maxIntensityPct / 2)}%</span>
                <span>+{activeInterventionConfig.maxIntensityPct}% (Max)</span>
              </div>
            </div>

            {/* Simulate Button */}
            <button
              onClick={handleSimulate}
              className="w-full bg-[#174D46] hover:bg-[#113B35] text-white font-mono text-xs font-bold py-2.5 rounded-xs transition-colors shadow-xs cursor-pointer tracking-wider"
            >
              SIMULATE IMPACT ➔
            </button>

            {/* 3 Important Numbers: Simulated Impact Panel */}
            {hasSimulated && (
              <div className="border border-[#174D46]/25 bg-[#F7FBF9] p-3 rounded-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-[#D7E5DF] pb-1.5">
                  <span className="font-mono text-[8.5px] font-bold uppercase text-[#174D46]">
                    SIMULATED IMPACT (DAY {timelineDay})
                  </span>
                  <span className="font-mono text-[8px] text-[#5C6E6A]">MODELLED COUNTERFACTUAL</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="border border-[#E2E8E5] bg-white p-2 rounded-xs">
                    <span className="block font-mono text-[7.5px] text-[#6B7E7A] uppercase">BASELINE LST</span>
                    <strong className="font-mono text-sm text-[#162220]">
                      {simulation.baselineLst.toFixed(1)}°C
                    </strong>
                  </div>

                  <div className="border border-[#174D46]/20 bg-[#F2F8F5] p-2 rounded-xs">
                    <span className="block font-mono text-[7.5px] text-[#174D46] uppercase">
                      DAY {timelineDay} LST
                    </span>
                    <strong className="font-mono text-sm text-[#174D46]">
                      {currentTimelineTemp.toFixed(1)}°C
                    </strong>
                  </div>

                  <div className="border border-[#2E684A]/30 bg-[#EBF7F0] p-2 rounded-xs">
                    <span className="block font-mono text-[7.5px] text-[#2E684A] uppercase">COOLING</span>
                    <strong className="font-mono text-sm text-[#2E684A]">
                      ↓ {currentTimelineCooling.toFixed(1)}°C
                    </strong>
                  </div>
                </div>

                {/* Risk Transition */}
                <div className="flex items-center justify-between text-[10.5px] pt-0.5">
                  <span className="text-[#5C6E6A]">Risk Transition:</span>
                  <span className="font-bold text-[#162220] flex items-center gap-1.5">
                    <span className="text-gray-600">{simulation.baselineRisk}</span>
                    <span>➔</span>
                    <span className="text-[#2E684A] font-bold">
                      {timelineDay >= 10 ? simulation.scenarioRisk : simulation.baselineRisk}
                    </span>
                  </span>
                </div>

                <p className="text-[8.5px] text-[#6B7E7A] border-t border-[#D7E5DF] pt-1">
                  Modelled counterfactual from HeatWise XGBoost model showing municipal plan execution over time.
                </p>
              </div>
            )}
          </div>

          {/* 3. 5 / 10 / 15-Day Post-Intervention Monitoring & Abnormality Alert */}
          <div className="border-t border-[#EDF2EF] pt-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8.5px] font-bold uppercase tracking-wider text-[#6B7E7A]">
                POST-INTERVENTION MONITORING
              </span>
              <span className="font-mono text-[8px] text-[#5C6E6A]">IN-SITU OBSERVATIONS</span>
            </div>

            {/* 3-Row Indicator for Day 5, 10, 15 */}
            <div className="space-y-1 font-mono text-[10px]">
              {simulation.observations.map((obs) => (
                <div
                  key={obs.day}
                  className={`flex items-center justify-between p-1.5 rounded-xs border transition-colors ${
                    timelineDay === obs.day
                      ? "bg-[#E8F3EE] border-[#174D46] font-bold"
                      : "bg-[#FAFBFA] border-[#EDF2EF]"
                  }`}
                >
                  <span className="font-semibold text-[#162220]">Day {obs.day}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#6B7E7A]">
                      Obs: {obs.observedDeltaC > 0 ? `+${obs.observedDeltaC}` : obs.observedDeltaC}°C
                    </span>
                    <span
                      className={`px-1.5 py-0.2 rounded-2xs font-bold ${
                        obs.status === "Normal"
                          ? "bg-[#E8F3EE] text-[#2E684A]"
                          : "bg-[#FFF0EE] text-[#C93B2B]"
                      }`}
                    >
                      {obs.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Thermal Anomaly Detected Alert */}
            {simulation.anomalyReport.anomalyStatus === "Anomaly Detected" && (
              <div className="border border-[#D9822B] bg-[#FFF9F0] p-2.5 rounded-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#8C4600] font-bold text-xs">
                  <span>⚠</span>
                  <span>THERMAL ANOMALY DETECTED</span>
                </div>
                <p className="text-[9.5px] text-[#8C4600] leading-3.5">
                  Observed heat remains above the expected post-intervention range. Observation period: 15 days.
                </p>
                <button
                  onClick={() => setShowAnomalyModal(true)}
                  className="w-full mt-1 bg-[#8C4600] hover:bg-[#6E3600] text-white font-mono text-[9.5px] font-bold py-1.5 rounded-xs transition-colors cursor-pointer"
                >
                  VIEW ANOMALY REPORT ➔
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* 4. Abnormality Report Modal */}
      {showAnomalyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-[#CBDAD4] rounded-xs shadow-xl max-w-lg w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8E5] pb-3">
              <div>
                <span className="font-mono text-[9px] font-bold text-[#C93B2B] bg-[#FFF0EE] px-2 py-0.5 rounded-2xs">
                  OBSERVED POST-INTERVENTION AUDIT
                </span>
                <h3 className="mt-1 font-sans text-base font-bold text-[#162220]">
                  Post-Intervention Thermal Anomaly Report
                </h3>
              </div>
              <button
                onClick={() => setShowAnomalyModal(false)}
                className="text-gray-400 hover:text-black font-mono text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-[#162220]">
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px] bg-[#FAFBFA] p-3 rounded-xs border border-[#EDF2EF]">
                <div>
                  <span className="text-[#6B7E7A] block text-[9px]">LOCATION:</span>
                  <strong>{simulation.anomalyReport.location}, {city}</strong>
                </div>
                <div>
                  <span className="text-[#6B7E7A] block text-[9px]">INTERVENTION APPLIED:</span>
                  <strong>{simulation.anomalyReport.intervention} (+{simulation.anomalyReport.intensityPct}%)</strong>
                </div>
                <div className="mt-2">
                  <span className="text-[#6B7E7A] block text-[9px]">MODELLED COUNTERFACTUAL CHANGE:</span>
                  <strong className="text-[#174D46]">{simulation.anomalyReport.modeledChangeC.toFixed(1)}°C</strong>
                </div>
                <div className="mt-2">
                  <span className="text-[#6B7E7A] block text-[9px]">OBSERVED IN-SITU SATELLITE CHANGE:</span>
                  <strong className="text-[#C93B2B]">{simulation.anomalyReport.observedChangeC.toFixed(1)}°C</strong>
                </div>
              </div>

              <div className="p-3 border border-[#D9822B]/30 bg-[#FFF9F0] rounded-xs text-[11px] text-[#8C4600] space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <span>⚠</span>
                  <span>Anomaly Status: Deviation of +{simulation.anomalyReport.anomalyDeltaC}°C above model envelope</span>
                </div>
                <p className="text-[10px] text-[#8C4600]/90">
                  <strong>Observation Period:</strong> {simulation.anomalyReport.observationPeriodDays} days post-intervention.
                </p>
                <p className="text-[10px] text-[#8C4600]/90">
                  <strong>Suggested Review / Action:</strong> {simulation.anomalyReport.suggestedAction}
                </p>
              </div>

              <div className="text-[9.5px] text-[#6B7E7A] border-t border-[#E2E8E5] pt-2">
                Note: Modelled change represents XGBoost counterfactual prediction. Observed change represents cloud-free satellite thermal monitoring.
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-[#E2E8E5] pt-3">
              <button
                onClick={() => setShowAnomalyModal(false)}
                className="px-4 py-1.5 border border-[#D2DDD8] font-mono text-xs font-bold text-[#162220] rounded-xs hover:bg-[#F2F8F5] cursor-pointer"
              >
                CLOSE
              </button>
              <button
                onClick={() => {
                  alert(`Thermal Anomaly Report for ${simulation.anomalyReport.location} saved.`);
                  setShowAnomalyModal(false);
                }}
                className="px-4 py-1.5 bg-[#174D46] font-mono text-xs font-bold text-white rounded-xs hover:bg-[#113B35] cursor-pointer"
              >
                EXPORT REPORT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
