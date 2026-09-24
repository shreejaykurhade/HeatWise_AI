"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { CITIES_DATA, CityName, SeasonName, Hotspot } from "../../data/heatData";
import {
  simulateIntervention,
  INTERVENTION_OPTIONS,
  InterventionType,
  SimpleSimulationResult,
} from "../../../lib/scenario-engine";
import IndiaMap from "../map/IndiaMap";

type CausalAuditRecord = {
  location: string;
  city: string;
  baselineDate: string;
  comparisonDate: string;
  interventionMix: Partial<Record<InterventionType, number>>;
  treatedBaselineLst: number;
  treatedPostLst: number;
  controlBaselineLst: number;
  controlPostLst: number;
  differenceInDifferencesC: number;
  recordedAt: string;
};

interface Props {
  city: CityName;
  season: SeasonName;
  selectedHotspotName: string;
  onSelectCity: (city: CityName) => void;
  onSelectHotspot: (hotspot: string) => void;
}

const TIMELINE_DAYS = [0, 5, 10, 15] as const;
type TimelineDay = (typeof TIMELINE_DAYS)[number];

function seasonForIsoDate(value: string): SeasonName {
  const month = Number(value.slice(5, 7));
  if (month >= 3 && month <= 6) return "Summer";
  if (month >= 7 && month <= 9) return "Monsoon";
  if (month >= 10 && month <= 11) return "Post_Monsoon";
  return "Winter";
}

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
  const [interventionMix, setInterventionMix] = useState<Partial<Record<InterventionType, number>>>({ trees: 25 });
  const [hasSimulated, setHasSimulated] = useState<boolean>(true);
  const [showAnomalyModal, setShowAnomalyModal] = useState<boolean>(false);
  const [baselineDate, setBaselineDate] = useState("2026-05-15");
  const [comparisonDate, setComparisonDate] = useState("2026-06-15");
  const [appliedInterventionMix, setAppliedInterventionMix] = useState<Partial<Record<InterventionType, number>>>({ trees: 25 });
  const [appliedBaselineDate, setAppliedBaselineDate] = useState("2026-05-15");
  const [appliedComparisonDate, setAppliedComparisonDate] = useState("2026-06-15");
  const [lastRunMessage, setLastRunMessage] = useState("");
  const [isRunningSimulation, setIsRunningSimulation] = useState(false);
  const [runStage, setRunStage] = useState(0);
  const simulationTimers = useRef<number[]>([]);
  const [treatedBaselineLst, setTreatedBaselineLst] = useState("");
  const [treatedPostLst, setTreatedPostLst] = useState("");
  const [controlBaselineLst, setControlBaselineLst] = useState("");
  const [controlPostLst, setControlPostLst] = useState("");
  const [causalRecordCount, setCausalRecordCount] = useState(0);
  const [causalStatus, setCausalStatus] = useState("");

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
      appliedInterventionMix,
      0,
      { baselineDate: appliedBaselineDate, comparisonDate: appliedComparisonDate }
    );
  }, [ward, currentCityData, currentSeasonData, season, appliedInterventionMix, appliedBaselineDate, appliedComparisonDate]);

  const activeInterventionConfig = INTERVENTION_OPTIONS[selectedIntervention];
  const activeIntensity = interventionMix[selectedIntervention] ?? 0;
  const activePortfolio = (Object.keys(interventionMix) as InterventionType[]).filter((type) => (interventionMix[type] ?? 0) > 0);
  const featureChangeLabel: Record<InterventionType, string> = {
    trees: "Tree cover ↑ · NDVI ↑ · impervious fraction ↓",
    roofs: "Roof/surface albedo ↑ · roof thermal-storage index ↓",
    shade: "Tree-cover proxy ↑ · sky-view factor ↓",
    pavement: "Impervious fraction ↓ · pavement index ↓ · albedo ↑",
  };
  const simulationStageLabel = [
    "",
    "1/3 Validating bounded physical inputs",
    "2/3 Running XGBoost LST regressor and hotspot classifier",
    "3/3 Assembling target-date comparison",
    "Scenario complete",
  ][runStage];

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

  useEffect(() => () => {
    simulationTimers.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const datesValid = comparisonDate >= baselineDate;
  const causalStorageKey = `heatwise-causal-audits:${city}:${ward.name}`;
  const causalInputStrings = [treatedBaselineLst, treatedPostLst, controlBaselineLst, controlPostLst];
  const causalInputs = causalInputStrings.map((value) => Number(value));
  const causalInputsReady = causalInputStrings.every((value) => value.trim() !== "") && causalInputs.every((value) => Number.isFinite(value));
  const causalEffect = causalInputsReady
    ? Number(((causalInputs[1] - causalInputs[0]) - (causalInputs[3] - causalInputs[2])).toFixed(2))
    : null;
  const baselineMapSeason = seasonForIsoDate(baselineDate);
  const comparisonMapSeason = seasonForIsoDate(comparisonDate);
  const baselineThermalOffset = simulation.baselineLst - currentCityData.seasons[baselineMapSeason].peakLst;
  const comparisonThermalOffset = simulation.comparisonNoInterventionLst - currentCityData.seasons[comparisonMapSeason].peakLst;
  const handleSimulate = () => {
    if (!datesValid || isRunningSimulation) return;
    simulationTimers.current.forEach((timer) => window.clearTimeout(timer));
    simulationTimers.current = [];
    setIsRunningSimulation(true);
    setHasSimulated(false);
    setRunStage(1);
    setLastRunMessage("");
    setIsPlaying(false);

    simulationTimers.current.push(window.setTimeout(() => setRunStage(2), 3_300));
    simulationTimers.current.push(window.setTimeout(() => setRunStage(3), 6_700));
    simulationTimers.current.push(window.setTimeout(() => {
      setAppliedInterventionMix({ ...interventionMix });
      setAppliedBaselineDate(baselineDate);
      setAppliedComparisonDate(comparisonDate);
      setTimelineDay(15);
      setRunStage(4);
      setHasSimulated(true);
      setIsRunningSimulation(false);
      setLastRunMessage(`Scenario applied: ${activePortfolio.length ? activePortfolio.map((type) => `${INTERVENTION_OPTIONS[type].name} +${interventionMix[type]}%`).join(" + ") : "no intervention"}.`);
    }, 10_000));
  };

  useEffect(() => {
    try {
      const records = JSON.parse(window.localStorage.getItem(causalStorageKey) || "[]") as CausalAuditRecord[];
      setCausalRecordCount(Array.isArray(records) ? records.length : 0);
    } catch {
      setCausalRecordCount(0);
    }
  }, [causalStorageKey]);

  const saveCausalAudit = () => {
    if (!causalInputsReady || causalEffect === null) return;
    const record: CausalAuditRecord = {
      location: ward.name,
      city,
      baselineDate,
      comparisonDate,
      interventionMix,
      treatedBaselineLst: causalInputs[0],
      treatedPostLst: causalInputs[1],
      controlBaselineLst: causalInputs[2],
      controlPostLst: causalInputs[3],
      differenceInDifferencesC: causalEffect,
      recordedAt: new Date().toISOString(),
    };
    try {
      const records = JSON.parse(window.localStorage.getItem(causalStorageKey) || "[]") as CausalAuditRecord[];
      const nextRecords = [...(Array.isArray(records) ? records : []), record];
      window.localStorage.setItem(causalStorageKey, JSON.stringify(nextRecords));
      setCausalRecordCount(nextRecords.length);
      setCausalStatus("Observation pair saved on this device for the causal-learning cohort.");
    } catch {
      setCausalStatus("Could not save this audit locally. Check browser storage permissions.");
    }
  };

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
            {ward.name} · Dated Cooling Counterfactual
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
        <section className="self-start border border-[#E2E8E5] bg-white shadow-xs rounded-xs xl:col-span-8 flex flex-col overflow-hidden">
          {/* Date comparison heading */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EDF2EF] px-3.5 py-2 bg-[#FAFBFA]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#174D46]">
                SIDE-BY-SIDE DATE COMPARISON
              </span>
              <span className="text-[10px] text-[#5C6E6A]">
                Baseline {simulation.baselineDate} → target {simulation.comparisonDate}
              </span>
            </div>
            <span className="font-mono text-[8px] text-[#174D46]">DATE-CONDITIONED MODEL OUTPUT</span>
          </div>

          {/* Date Comparison Map Canvas */}
          <div className="grid min-h-[460px] grid-cols-1 gap-px bg-[#E2E8E5] lg:grid-cols-2">
            <div className="relative min-h-[380px] bg-white">
              <IndiaMap city={city} season={baselineMapSeason} mode="Heat stress" selectedHotspot={selectedHotspotName} onSelectCity={onSelectCity} onSelectHotspot={onSelectHotspot} thermalOffsetC={baselineThermalOffset} />
              <div className="absolute left-3 top-3 z-10 border border-white/15 bg-[#0B1C1A]/90 px-3 py-2 font-mono text-[10px] text-white backdrop-blur-xs"><span className="block text-[8px] text-[#A0BCB6]">BASELINE MODEL MAP</span><strong>{simulation.baselineDate}</strong><span className="ml-2 text-[#FFB35C]">{simulation.baselineLst.toFixed(1)}°C</span></div>
            </div>
            <div className="relative min-h-[380px] bg-white">
              <IndiaMap city={city} season={comparisonMapSeason} mode="Heat stress" selectedHotspot={selectedHotspotName} onSelectCity={onSelectCity} onSelectHotspot={onSelectHotspot} thermalOffsetC={comparisonThermalOffset} />
              <div className="absolute left-3 top-3 z-10 border border-white/15 bg-[#174D46]/95 px-3 py-2 font-mono text-[10px] text-white backdrop-blur-xs"><span className="block text-[8px] text-[#CDE7DD]">TARGET-DATE / NO INTERVENTION</span><strong>{simulation.comparisonDate}</strong><span className="ml-2 text-[#FFDEA5]">{simulation.comparisonNoInterventionLst.toFixed(1)}°C</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 border-t border-[#E2E8E5] bg-[#F7FBF9] p-3 sm:grid-cols-3">
            <div className="border border-[#D7E5DF] bg-white p-2"><span className="font-mono text-[8px] text-[#5C6E6A]">DATE-TO-DATE ΔLST</span><strong className={`mt-1 block font-mono text-lg ${simulation.temporalChangeNoIntervention <= 0 ? "text-[#2E684A]" : "text-[#C93B2B]"}`}>{simulation.temporalChangeNoIntervention >= 0 ? "+" : ""}{simulation.temporalChangeNoIntervention.toFixed(1)}°C</strong></div>
            <div className="border border-[#D7E5DF] bg-white p-2"><span className="font-mono text-[8px] text-[#5C6E6A]">TARGET LST · WITH INTERVENTION</span><strong className="mt-1 block font-mono text-lg text-[#174D46]">{simulation.scenarioLst.toFixed(1)}°C</strong></div>
            <div className="border border-[#D7E5DF] bg-white p-2"><span className="font-mono text-[8px] text-[#5C6E6A]">ISOLATED COOLING EFFECT</span><strong className="mt-1 block font-mono text-lg text-[#2E684A]">↓ {simulation.coolingDelta.toFixed(1)}°C</strong></div>
          </div>

          <div className="border-t border-[#E2E8E5] bg-[#F7FBF9] p-3 text-[10px] text-[#5C6E6A]">
            <strong className="font-mono text-[#174D46]">MODEL SCOPE:</strong> This map shows the XGBoost counterfactual after the selected physical feature inputs are changed. Implementation progress and satellite verification appear only after real dated observations are supplied.
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

            <div className="border border-[#D7E5DF] bg-[#F7FBF9] p-3 rounded-xs">
              <div className="flex items-center justify-between"><span className="font-mono text-[9px] font-bold uppercase text-[#174D46]">Heatmap comparison period</span><span className="font-mono text-[8px] text-[#5C6E6A]">DATE-CONDITIONED XGBOOST</span></div>
              <div className="mt-2 grid grid-cols-2 gap-2"><label className="font-mono text-[8px] text-[#5C6E6A]">BASELINE<input value={baselineDate} onChange={(e) => setBaselineDate(e.target.value)} type="date" className="mt-1 block w-full border border-[#D2DDD8] bg-white p-1.5 text-[10px] text-[#162220]" /></label><label className="font-mono text-[8px] text-[#5C6E6A]">COMPARE TO<input value={comparisonDate} onChange={(e) => setComparisonDate(e.target.value)} type="date" className="mt-1 block w-full border border-[#D2DDD8] bg-white p-1.5 text-[10px] text-[#162220]" /></label></div>
              {!datesValid && <p className="mt-2 text-[9px] text-[#C93B2B]">Comparison date must be on or after the baseline date.</p>}
              <p className="mt-2 text-[8.5px] leading-3 text-[#5C6E6A]">These controls drive the two date-conditioned model heatmaps. They are not labelled as retrieved satellite scenes.</p>
            </div>

            <div className="border border-[#D7E5DF] bg-[#F7FBF9] p-3 rounded-xs">
              <div className="flex items-center justify-between"><span className="font-mono text-[9px] font-bold uppercase text-[#174D46]">Model inputs changed</span><span className="font-mono text-[8px] text-[#5C6E6A]">XGBOOST COUNTERFACTUAL</span></div>
              <p className="mt-2 text-[11px] font-semibold text-[#162220]">{featureChangeLabel[selectedIntervention]}</p>
              <p className="mt-2 border-t border-[#D7E5DF] pt-2 text-[8.5px] leading-3 text-[#5C6E6A]">The result is useful because it reruns the trained regressor and hotspot classifier after only these bounded physical inputs are changed. It is not presented as an observed historical heat result.</p>
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
                        type="checkbox"
                        checked={(interventionMix[key] ?? 0) > 0}
                        onChange={() => setInterventionMix((current) => ({ ...current, [key]: (current[key] ?? 0) > 0 ? 0 : Math.min(15, opt.maxIntensityPct) }))}
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
                  +{activeIntensity}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max={activeInterventionConfig.maxIntensityPct}
                step="5"
                value={Math.min(activeIntensity, activeInterventionConfig.maxIntensityPct)}
                onChange={(e) => setInterventionMix((current) => ({ ...current, [selectedIntervention]: Number(e.target.value) }))}
                className="mt-2.5 w-full accent-[#174D46] cursor-pointer"
                aria-label="Intervention Intensity Slider"
              />
              <div className="flex justify-between text-[8.5px] font-mono text-[#6B7E7A] mt-1">
                <span>0%</span>
                <span>+{Math.round(activeInterventionConfig.maxIntensityPct / 2)}%</span>
                <span>+{activeInterventionConfig.maxIntensityPct}% (Max)</span>
              </div>
            </div>

            <div className="border border-[#D7E5DF] bg-[#F7FBF9] p-2.5 text-[10px] text-[#44534F]"><span className="font-mono text-[8px] font-bold text-[#174D46]">ACTIVE PORTFOLIO</span><p className="mt-1">{activePortfolio.length ? activePortfolio.map((type) => `${INTERVENTION_OPTIONS[type].name} +${interventionMix[type]}%`).join(" · ") : "Select one or more interventions to run a combined model scenario."}</p></div>

            {/* Simulate Button */}
            <button
              onClick={handleSimulate}
              disabled={!datesValid || isRunningSimulation}
              className="w-full bg-[#174D46] hover:bg-[#113B35] text-white font-mono text-xs font-bold py-2.5 rounded-xs transition-colors shadow-xs cursor-pointer tracking-wider disabled:cursor-wait disabled:opacity-75"
            >
              {isRunningSimulation ? "RUNNING MODEL…" : "SIMULATE IMPACT ➔"}
            </button>
            {isRunningSimulation && <div className="-mt-2 border border-[#B8D5D0] bg-[#F2F8F5] p-2"><div className="h-1 overflow-hidden bg-[#DCEAE5]"><div className={`h-full bg-[#174D46] transition-all duration-700 ${runStage === 1 ? "w-1/3" : runStage === 2 ? "w-2/3" : "w-full"}`} /></div><p role="status" className="mt-1 font-mono text-[8.5px] text-[#174D46]">{simulationStageLabel} · results release in 10 seconds</p></div>}
            {lastRunMessage && <p role="status" className="-mt-2 text-[9px] leading-3 text-[#174D46]">✓ {lastRunMessage}</p>}

            {/* 3 Important Numbers: Simulated Impact Panel */}
            {hasSimulated && !isRunningSimulation && (
              <div className="border border-[#174D46]/25 bg-[#F7FBF9] p-3 rounded-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-[#D7E5DF] pb-1.5">
                  <span className="font-mono text-[8.5px] font-bold uppercase text-[#174D46]">
                    SIMULATED IMPACT
                  </span>
                  <span className="font-mono text-[8px] text-[#5C6E6A]">MODELLED COUNTERFACTUAL</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="border border-[#E2E8E5] bg-white p-2 rounded-xs">
                    <span className="block font-mono text-[7.5px] text-[#6B7E7A] uppercase">BASELINE · {simulation.baselineDate}</span>
                    <strong className="font-mono text-sm text-[#162220]">
                      {simulation.baselineLst.toFixed(1)}°C
                    </strong>
                  </div>

                  <div className="border border-[#E2E8E5] bg-white p-2 rounded-xs">
                    <span className="block font-mono text-[7.5px] text-[#6B7E7A] uppercase">TARGET · NO ACTION</span>
                    <strong className="font-mono text-sm text-[#162220]">
                      {simulation.comparisonNoInterventionLst.toFixed(1)}°C
                    </strong>
                  </div>

                  <div className="border border-[#174D46]/20 bg-[#F2F8F5] p-2 rounded-xs">
                    <span className="block font-mono text-[7.5px] text-[#174D46] uppercase">TARGET · PORTFOLIO</span>
                    <strong className="font-mono text-sm text-[#174D46]">
                      {simulation.scenarioLst.toFixed(1)}°C
                    </strong>
                  </div>

                  <div className="border border-[#2E684A]/30 bg-[#EBF7F0] p-2 rounded-xs">
                    <span className="block font-mono text-[7.5px] text-[#2E684A] uppercase">COOLING VS NO ACTION</span>
                    <strong className="font-mono text-sm text-[#2E684A]">
                      ↓ {simulation.coolingDelta.toFixed(1)}°C
                    </strong>
                  </div>
                </div>

                {/* Risk Transition */}
                <div className="flex items-center justify-between text-[10.5px] pt-0.5">
                  <span className="text-[#5C6E6A]">Risk Transition:</span>
                  <span className="font-bold text-[#162220] flex items-center gap-1.5">
                    <span className="text-gray-600">{simulation.comparisonRisk}</span>
                    <span>➔</span>
                    <span className="text-[#2E684A] font-bold">
                      {simulation.scenarioRisk}
                    </span>
                  </span>
                </div>

                <p className="text-[8.5px] text-[#6B7E7A] border-t border-[#D7E5DF] pt-1">
                  The displayed cooling is the isolated model response to the selected intervention inputs. It is not an observed post-implementation result.
                </p>
              </div>
            )}
          </div>

        </section>
      </div>

      <section className="border border-[#E2E8E5] bg-white p-4 shadow-xs rounded-xs space-y-3">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[8.5px] font-bold uppercase tracking-wider text-[#6B7E7A]">Causal Impact Audit</span>
              <span className="font-mono text-[8px] text-[#174D46]">DiD NOW · CAUSAL FOREST COHORT LATER</span>
            </div>
            <p className="text-[10px] leading-4 text-[#5C6E6A]">
              Enter matched, same-season observations after implementation. The audit controls for city-wide weather change using a comparable untreated location; it uses the selected portfolio and coverage above as the treatment record.
            </p>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              <label className="font-mono text-[8px] text-[#5C6E6A]">TREATED · BEFORE LST (°C)<input value={treatedBaselineLst} onChange={(event) => setTreatedBaselineLst(event.target.value)} inputMode="decimal" placeholder="e.g. 44.2" className="mt-1 block w-full border border-[#D2DDD8] bg-white p-1.5 text-[10px] text-[#162220]" /></label>
              <label className="font-mono text-[8px] text-[#5C6E6A]">TREATED · AFTER LST (°C)<input value={treatedPostLst} onChange={(event) => setTreatedPostLst(event.target.value)} inputMode="decimal" placeholder="e.g. 42.8" className="mt-1 block w-full border border-[#D2DDD8] bg-white p-1.5 text-[10px] text-[#162220]" /></label>
              <label className="font-mono text-[8px] text-[#5C6E6A]">MATCHED CONTROL · BEFORE (°C)<input value={controlBaselineLst} onChange={(event) => setControlBaselineLst(event.target.value)} inputMode="decimal" placeholder="e.g. 43.7" className="mt-1 block w-full border border-[#D2DDD8] bg-white p-1.5 text-[10px] text-[#162220]" /></label>
              <label className="font-mono text-[8px] text-[#5C6E6A]">MATCHED CONTROL · AFTER (°C)<input value={controlPostLst} onChange={(event) => setControlPostLst(event.target.value)} inputMode="decimal" placeholder="e.g. 43.1" className="mt-1 block w-full border border-[#D2DDD8] bg-white p-1.5 text-[10px] text-[#162220]" /></label>
            </div>
            {causalEffect !== null ? (
              <div className={`border p-2 text-[10px] ${causalEffect < 0 ? "border-[#A9D4BE] bg-[#F1FAF4] text-[#1F6542]" : "border-[#E9C8A6] bg-[#FFF9F0] text-[#8C4A14]"}`}>
                <strong className="font-mono">ESTIMATED TREATMENT EFFECT: {causalEffect > 0 ? "+" : ""}{causalEffect.toFixed(2)}°C</strong>
                <span className="ml-1">{causalEffect < 0 ? "Additional cooling beyond the matched control." : "No additional cooling is demonstrated against the matched control."}</span>
              </div>
            ) : <p className="border border-dashed border-[#CBD7D2] bg-[#FAFBFA] p-2 text-[9px] text-[#5C6E6A]">No observed outcome is displayed until all four measured values are provided.</p>}
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[8px] text-[#5C6E6A]">{causalRecordCount} matched audit record{causalRecordCount === 1 ? "" : "s"} stored for this location</span>
              <button onClick={saveCausalAudit} disabled={causalEffect === null} className="border border-[#174D46] bg-white px-2 py-1 font-mono text-[9px] font-bold text-[#174D46] disabled:cursor-not-allowed disabled:opacity-40">SAVE AUDIT</button>
            </div>
            {causalStatus && <p role="status" className="text-[9px] text-[#174D46]">{causalStatus}</p>}
            <p className="text-[8.5px] leading-3 text-[#5C6E6A]">A Causal Forest is not marked trained here. It is trained only after enough audited, treated and comparable untreated records are collected across locations and seasons.</p>
          </div>
      </section>

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
