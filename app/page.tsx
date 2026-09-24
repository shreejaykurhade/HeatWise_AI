"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { CITIES_DATA, CityName, SeasonName } from "./data/heatData";
import NavRail, { ViewName } from "./components/layout/NavRail";
import GlobalHeader from "./components/layout/GlobalHeader";
import KpiRibbon from "./components/layout/KpiRibbon";
import OverviewView from "./components/views/OverviewView";
import ExplorerView from "./components/views/ExplorerView";
import DriverAnalysisView from "./components/views/DriverAnalysisView";
import ActionabilityEngineView from "./components/views/ActionabilityEngineView";
import ScenarioLabView from "./components/views/ScenarioLabView";
import ReportsView from "./components/views/ReportsView";
import CommandPalette from "./components/modals/CommandPalette";
import StationComparator from "./components/modals/StationComparator";
import { ALL_STATE_CITIES } from "./data/allStateCities";
import type { AreaOption } from "./components/layout/GlobalHeader";

const cityList = Object.keys(CITIES_DATA) as CityName[];
const areaOptions: AreaOption[] = Object.entries(ALL_STATE_CITIES).flatMap(([state, areas]) =>
  areas.map((area) => ({ ...area, state, id: `${state}::${area.name}` }))
);
const defaultAreaId = areaOptions.find((area) => area.name === "Hyderabad")?.id ?? areaOptions[0].id;
const normalizedLocation = (value: string) => value.toLowerCase().replace(/\s+(ncr|city)$/i, "").trim();
const areaForCity = (targetCity: CityName) => areaOptions.find(
  (area) => normalizedLocation(area.name) === normalizedLocation(targetCity)
);

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
type AnalysisModel = "xgboost" | "pinn";
const seasonsOrder: SeasonName[] = ["Summer", "Monsoon", "Post_Monsoon", "Winter"];

const seasonLabels: Record<SeasonName, string> = {
  Summer: "Summer (Apr–Jun)",
  Monsoon: "Monsoon (Jul–Sep)",
  Post_Monsoon: "Post-Monsoon (Oct–Nov)",
  Winter: "Winter (Dec–Feb)",
};

export type InferenceTargetOption = {
  value: string;
  label: string;
  group: string;
};

export default function Home() {
  // 1. Core Platform State
  const [city, setCity] = useState<CityName>("Hyderabad");
  const [season, setSeason] = useState<SeasonName>("Summer");
  const [view, setView] = useState<ViewName>("Overview");
  const [layer, setLayer] = useState("Heat stress");
  const [selectedAreaId, setSelectedAreaId] = useState(defaultAreaId);
  const [selectedInferenceTarget, setSelectedInferenceTarget] = useState(`place::${defaultAreaId}`);
  const [modelPrediction, setModelPrediction] = useState<ModelPrediction | null>(null);
  const [pinnPrediction, setPinnPrediction] = useState<PinnPrediction | null>(null);
  const [analysisModel, setAnalysisModel] = useState<AnalysisModel>("xgboost");
  const [modelLoading, setModelLoading] = useState(true);
  const [modelError, setModelError] = useState("");

  const selectedArea = areaOptions.find((area) => area.id === selectedAreaId) ?? areaOptions[0];

  const handleSelectArea = useCallback((areaId: string) => {
    setSelectedAreaId(areaId);
    setSelectedInferenceTarget(`place::${areaId}`);
    const area = areaOptions.find((item) => item.id === areaId);
    if (!area) return;
    const detailedCity = cityList.find((item) => normalizedLocation(item) === normalizedLocation(area.name));
    if (detailedCity) {
      setCity(detailedCity);
    } else {
      const stateMatch = cityList.find((item) => CITIES_DATA[item].state.toLowerCase() === area.state.toLowerCase());
      if (stateMatch) {
        setCity(stateMatch);
      }
    }
  }, []);

  const handleSelectCity = useCallback((nextCity: CityName) => {
    setCity(nextCity);
    const matchingArea = areaForCity(nextCity);
    if (matchingArea) {
      setSelectedAreaId(matchingArea.id);
      setSelectedInferenceTarget(`place::${matchingArea.id}`);
    }
  }, []);

  // 2. Modals & Interactive Overlays
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isPlayingTimeline, setIsPlayingTimeline] = useState(false);

  // 3. Active Hotspot State
  const currentCityData = CITIES_DATA[city];
  const currentSeasonData = currentCityData.seasons[season];
  const hotspots = currentSeasonData.hotspots;

  const [rawHotspotName, setRawHotspotName] = useState<string>("Balanagar Industrial Area");

  const selectedHotspotName = useMemo(() => {
    if (hotspots.some((h) => h.name === rawHotspotName)) {
      return rawHotspotName;
    }
    return hotspots[0]?.name ?? "";
  }, [hotspots, rawHotspotName]);

  const activeHotspot =
    hotspots.find((h) => h.name === selectedHotspotName) || hotspots[0];

  const inferenceTargets = useMemo<InferenceTargetOption[]>(() => [
    ...areaOptions.map((area) => ({
      value: `place::${area.id}`,
      label: `${area.name}, ${area.state}`,
      group: `Places · ${area.state}`,
    })),
    ...cityList.flatMap((targetCity) => CITIES_DATA[targetCity].seasons[season].hotspots.map((ward) => ({
      value: `ward::${targetCity}::${ward.name}`,
      label: `${ward.name} · ${targetCity}`,
      group: `Wards · ${targetCity}`,
    }))),
  ], [season]);

  const handleSelectInferenceTarget = (value: string) => {
    setSelectedInferenceTarget(value);
    if (value.startsWith("place::")) {
      handleSelectArea(value.slice("place::".length));
      return;
    }
    const [, targetCity, ...wardParts] = value.split("::");
    const wardName = wardParts.join("::");
    if (!targetCity || !wardName || !CITIES_DATA[targetCity]) return;
    const nextCity = targetCity as CityName;
    setCity(nextCity);
    setRawHotspotName(wardName);
    const matchingArea = areaForCity(nextCity);
    if (matchingArea) setSelectedAreaId(matchingArea.id);
  };

  useEffect(() => {
    const timing: Record<SeasonName, { month: number; day: number }> = {
      Summer: { month: 5, day: 135 }, Monsoon: { month: 8, day: 227 },
      Post_Monsoon: { month: 10, day: 288 }, Winter: { month: 1, day: 20 },
    };
    const context = timing[season];
    const targetIsWard = selectedInferenceTarget.startsWith("ward::");
    const areaHasDetailedData = normalizedLocation(selectedArea.name) === normalizedLocation(city);
    const ward = targetIsWard && areaHasDetailedData ? activeHotspot : undefined;
    const env = areaHasDetailedData ? currentSeasonData.env : undefined;
    const controller = new AbortController();
    const numericPercent = (value: string | undefined) => value ? Number.parseFloat(value) / 100 : undefined;
    const runInference = async () => {
      setModelLoading(true);
      setModelError("");
      try {
        const inferenceInput = {
          latitude: ward?.lat ?? selectedArea.lat,
          longitude: ward?.lon ?? selectedArea.lon,
          elevation_m: areaHasDetailedData ? currentCityData.elevationM : undefined,
          distance_to_coast_km: areaHasDetailedData ? currentCityData.distanceToCoastKm : undefined,
          month: context.month, day_of_year: context.day,
          air_temperature_c: env?.airTempC ?? selectedArea.peakLst - selectedArea.uhiMean,
          ndvi: ward?.ndvi ?? env?.ndvi,
          tree_cover_fraction: numericPercent(ward?.canopyCover) ?? (env ? env.treeCoverPct / 100 : undefined),
          impervious_surface_fraction: numericPercent(ward?.builtFraction) ?? (env ? env.imperviousPct / 100 : undefined),
          building_density: env ? env.buildingDensityPct / 100 : undefined,
          building_height_m: ward ? Number.parseFloat(ward.buildingHeight) : env?.buildingHeightM,
          population_density_per_km2: env?.populationDensity,
          sky_view_factor: typeof ward?.skyView === "number" ? ward.skyView : env?.skyViewFactor,
          albedo: typeof ward?.albedo === "number" ? ward.albedo : env?.albedo,
          relative_humidity_pct: env?.humidityPct,
          wind_speed_ms: ward ? Number.parseFloat(ward.windSpeed) : env?.windSpeedMs,
          solar_radiation_wm2: env?.solarRadiationWm2,
          pm25_ug_m3: ward ? Number.parseFloat(ward.pm25) : env?.pm25UgM3,
          industrial_proximity_index: /industrial/i.test(`${ward?.name ?? ""} ${ward?.driver ?? ""} ${selectedArea.zone}`) ? 85 : 25,
          is_monsoon: season === "Monsoon" ? 1 : 0,
        };
        const response = await fetch("/api/heat-prediction", {
          method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
          body: JSON.stringify(inferenceInput),
        });
        if (!response.ok) throw new Error("Model inference failed");
        setModelPrediction(await response.json());
        if (analysisModel === "pinn") {
          const pinnResponse = await fetch("/api/heat-prediction?model=pinn", {
            method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
            body: JSON.stringify(inferenceInput),
          });
          if (!pinnResponse.ok) throw new Error("PINN inference failed");
          setPinnPrediction(await pinnResponse.json());
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") setModelError(error.message);
      } finally {
        if (!controller.signal.aborted) setModelLoading(false);
      }
    };
    void runInference();
    return () => controller.abort();
  }, [activeHotspot, analysisModel, city, currentCityData, currentSeasonData, season, selectedArea, selectedInferenceTarget]);


  // Keyboard shortcut listener (⌘K / Ctrl+K & Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsCmdOpen(false);
        setIsCompareOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Time-Lapse Auto-Scrubber Interval
  useEffect(() => {
    if (!isPlayingTimeline) return;
    const timer = setInterval(() => {
      setSeason((prev) => {
        const nextIdx = (seasonsOrder.indexOf(prev) + 1) % seasonsOrder.length;
        return seasonsOrder[nextIdx];
      });
    }, 2400);
    return () => clearInterval(timer);
  }, [isPlayingTimeline]);

  return (
    <div className="platform-layout">
      {/* 1. Persistent Left Navigation Rail */}
      <NavRail currentView={view} onSelectView={setView} />

      {/* 2. Main Workstation Area */}
      <main className="main-workstation">
        {/* Top Global Command Header */}
        <GlobalHeader
          city={city}
          season={season}
          layer={layer}
          cityList={cityList}
          areaOptions={areaOptions}
          selectedAreaId={selectedAreaId}
          seasonLabels={seasonLabels}
          onSelectCity={handleSelectCity}
          onSelectArea={handleSelectArea}
          onSelectLayer={setLayer}
          onSelectSeason={setSeason}
          onOpenCommandPalette={() => setIsCmdOpen(true)}
          onOpenComparator={() => setIsCompareOpen(true)}
        />

        {/* Precision KPI Telemetry Ribbon */}
        <KpiRibbon currentSeasonData={currentSeasonData} />

        {/* View Routing */}
        <div className="view-content p-3 sm:p-4">
          {view === "Overview" && (
            <OverviewView
              city={city}
              season={season}
              layer={layer}
              selectedHotspotName={selectedHotspotName}
              isPlayingTimeline={isPlayingTimeline}
              seasonsOrder={seasonsOrder}
              seasonLabels={seasonLabels}
              onSelectCity={handleSelectCity}
              onSelectSeason={setSeason}
              onSelectLayer={setLayer}
              onSelectHotspot={setRawHotspotName}
              onTogglePlayTimeline={() => setIsPlayingTimeline((prev) => !prev)}
              onNavigateToView={setView}
            />
          )}

          {view === "Heat Explorer" && (
            <ExplorerView
              city={city}
              season={season}
              layer={layer}
              selectedHotspotName={selectedHotspotName}
              onSelectCity={handleSelectCity}
              onSelectHotspot={setRawHotspotName}
              onSelectLayer={setLayer}
            />
          )}

          {view === "Driver Analysis" && (
            <DriverAnalysisView
              city={city}
              season={season}
              selectedHotspotName={selectedHotspotName}
              selectedArea={selectedArea}
              modelPrediction={modelPrediction}
              modelLoading={modelLoading}
              modelError={modelError}
              pinnPrediction={pinnPrediction}
              analysisModel={analysisModel}
              onSelectAnalysisModel={setAnalysisModel}
              inferenceTargets={inferenceTargets}
              selectedInferenceTarget={selectedInferenceTarget}
              onSelectInferenceTarget={handleSelectInferenceTarget}
            />
          )}

          {view === "Actionability Engine" && (
            <ActionabilityEngineView
              city={city}
              season={season}
              selectedHotspotName={selectedHotspotName}
              onSelectCity={handleSelectCity}
              onSelectHotspot={setRawHotspotName}
            />
          )}

          {view === "Scenario Lab" && (
            <ScenarioLabView
              city={city}
              season={season}
              selectedHotspotName={selectedHotspotName}
              onSelectCity={handleSelectCity}
              onSelectHotspot={setRawHotspotName}
            />
          )}

          {view === "Reports" && (
            <ReportsView city={city} season={season} selectedHotspotName={selectedHotspotName} />
          )}
        </div>
      </main>

      {/* 3. Operational Modals */}
      <CommandPalette
        isOpen={isCmdOpen}
        season={season}
        onClose={() => setIsCmdOpen(false)}
        onSelectCity={handleSelectCity}
        onSelectView={setView}
        onSelectHotspot={setRawHotspotName}
      />

      <StationComparator
        isOpen={isCompareOpen}
        activeCity={city}
        season={season}
        cityList={cityList}
        onClose={() => setIsCompareOpen(false)}
        onSelectStationToInspect={handleSelectCity}
      />
    </div>
  );
}
