"use client";

import { useState, useCallback } from "react";
import { CityName, SeasonName, Hotspot, CITIES_DATA } from "../../data/heatData";
import IndiaMap from "../map/IndiaMap";
import MapToolbar, { MapStyleKey } from "../map/MapToolbar";
import HotspotIntelPanel from "../hotspot/HotspotIntelPanel";
import { ViewName } from "../layout/NavRail";

interface OverviewViewProps {
  city: CityName;
  season: SeasonName;
  layer: string;
  selectedHotspotName: string;
  isPlayingTimeline: boolean;
  seasonsOrder: SeasonName[];
  seasonLabels: Record<SeasonName, string>;
  onSelectCity: (city: CityName) => void;
  onSelectSeason: (season: SeasonName) => void;
  onSelectLayer: (layer: string) => void;
  onSelectHotspot: (name: string) => void;
  onTogglePlayTimeline: () => void;
  onNavigateToView: (view: ViewName) => void;
}

export default function OverviewView({
  city,
  season,
  layer,
  selectedHotspotName,
  isPlayingTimeline,
  seasonsOrder,
  seasonLabels,
  onSelectCity,
  onSelectSeason,
  onSelectLayer,
  onSelectHotspot,
  onTogglePlayTimeline,
  onNavigateToView,
}: OverviewViewProps) {
  const currentCityData = CITIES_DATA[city];
  const currentSeasonData = currentCityData.seasons[season];
  const hotspots: readonly Hotspot[] = currentSeasonData.hotspots;

  // External Map Controls State
  const [mapStyle, setMapStyle] = useState<MapStyleKey>("satellite");
  const [showHeatWave, setShowHeatWave] = useState(true);
  const [showIsotherms, setShowIsotherms] = useState(false);
  const [showStations, setShowStations] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);
  const [is3DMode, setIs3DMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleResetNormal = useCallback(() => {
    setIs3DMode(false);
    setResetTrigger((k) => k + 1);
  }, []);

  const handleToggle3D = useCallback(() => {
    setIs3DMode((prev) => !prev);
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  return (
    <div className="view-container overview-layout space-y-2.5">
      {/* 1. City Situation Alert Banner matching reference image */}
      <div className="bg-white border border-[#E2E8E5] border-l-4 border-l-[#E53935] px-3.5 py-2 flex flex-wrap items-center justify-between gap-3 shadow-2xs rounded-xs select-none">
        <div className="flex items-center gap-2.5">
          <span className="bg-[#FFEBEE] text-[#D32F2F] font-mono text-[8px] font-bold px-1.5 py-0.5 border border-[#FFCDD2] rounded-2xs flex items-center gap-1 uppercase tracking-tight">
            <span className="text-[#D32F2F]">●</span> VERY HIGH RISK
          </span>
          <h2 className="font-serif text-[13px] font-bold tracking-wide uppercase text-[#1B2F2B]">
            {city} — {season.toUpperCase().replace("_", " ")} HEAT SITUATION
          </h2>
        </div>

        <div className="font-mono text-[11px] text-[#5C6E6A] flex items-center gap-1.5">
          <span>PEAK LST: <strong className="text-[#C83E2D] font-bold">{currentSeasonData.peakLst}°C</strong></span>
          <span className="text-[#B0BEC5]">·</span>
          <span>UHI: <strong className="text-[#E06A26] font-bold">+{currentSeasonData.uhiMean}°C</strong></span>
        </div>
      </div>

      {/* 2. Main Investigation Workstation Stage */}
      <div className="bg-white border border-[#E2E8E5] p-3 shadow-xs rounded-xs select-none">
        {/* Top Header: Section Title + Active Heat Layer Pill Selector */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-[#E2E8E5] pb-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#174D46] font-extrabold bg-[#E8F3EE] px-1.5 py-0.5 rounded-2xs border border-[#A7C8BE]">
              LAYER: {layer.toUpperCase()}
            </span>
            <span className="text-[#4E615D] text-xs font-medium">
              Realtime Urban Heat Island & Ward Vulnerability Telemetry
            </span>
          </div>

          {/* Segmented Layer Switcher Pills */}
          <div className="flex items-center bg-[#F0F4F2] border border-[#D5DFDC] p-0.5 rounded-xs">
            {["Heat stress", "Surface temp.", "Vulnerability", "Cooling opportunity"].map((l) => {
              const labelMap: Record<string, string> = {
                "Heat stress": "HEAT STRESS",
                "Surface temp.": "SURFACE TEMP",
                "Vulnerability": "VULNERABILITY",
                "Cooling opportunity": "COOLING OPP",
              };
              const isSelected = layer.toLowerCase() === l.toLowerCase();
              return (
                <button
                  key={l}
                  onClick={() => onSelectLayer(l)}
                  className={`px-2 py-0.5 text-[8.5px] font-mono transition-colors cursor-pointer rounded-2xs ${
                    isSelected
                      ? "bg-[#174D46] text-white font-extrabold shadow-2xs"
                      : "text-[#4E615D] hover:text-[#162220] font-semibold"
                  }`}
                >
                  {labelMap[l] || l.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Season Scrubber (Left col-span-7) & Map Controls (Right col-span-5 aligned to Selected Hotspot Intelligence box) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center mb-2.5">
          {/* Left: Season Scrubber */}
          <div className="lg:col-span-7 xl:col-span-7 flex items-center gap-2">
            <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#6B7D79] font-bold">
              SEASON
            </span>

            <button
              onClick={onTogglePlayTimeline}
              className={`px-2.5 py-1 text-[9.5px] font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer rounded-2xs shadow-2xs ${
                isPlayingTimeline
                  ? "bg-[#C93B2B] text-white"
                  : "bg-[#174D46] hover:bg-[#1B5951] text-white"
              }`}
              title="Auto-play seasonal thermal time-lapse"
            >
              <span>{isPlayingTimeline ? "❚❚ PAUSE" : "▶ PLAY"}</span>
            </button>

            <div className="flex items-center bg-[#F0F4F2] border border-[#D5DFDC] p-0.5 rounded-xs">
              {seasonsOrder.map((s) => {
                const labelMap: Record<SeasonName, string> = {
                  Summer: "SUMMER",
                  Monsoon: "MONSOON",
                  Post_Monsoon: "POST-MON",
                  Winter: "WINTER",
                };
                const isSelected = season === s;
                return (
                  <button
                    key={s}
                    onClick={() => onSelectSeason(s)}
                    className={`px-2 py-0.5 text-[8.5px] font-mono transition-colors cursor-pointer rounded-2xs ${
                      isSelected
                        ? "bg-[#174D46] text-white font-extrabold shadow-2xs"
                        : "text-[#4E615D] hover:text-[#162220] font-semibold"
                    }`}
                    title={seasonLabels[s]}
                  >
                    {labelMap[s]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Map Control Pod perfectly aligned with Selected Hotspot Intelligence box below */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center">
            <MapToolbar
              activeMapStyle={mapStyle}
              onStyleChange={setMapStyle}
              showHeatWave={showHeatWave}
              onToggleHeatWave={() => setShowHeatWave((prev) => !prev)}
              showIsotherms={showIsotherms}
              onToggleIsotherms={() => setShowIsotherms((prev) => !prev)}
              showStations={showStations}
              onToggleStations={() => setShowStations((prev) => !prev)}
              showHotspots={showHotspots}
              onToggleHotspots={() => setShowHotspots((prev) => !prev)}
              is3DMode={is3DMode}
              onToggle3D={handleToggle3D}
              onResetNormal={handleResetNormal}
              isFullscreen={isFullscreen}
              onToggleFullscreen={handleToggleFullscreen}
            />
          </div>
        </div>

        {/* Grid: Map Stage + Hotspot Intelligence Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Left: MapTiler Earth Observation Stage */}
          <div
            className={`lg:col-span-7 xl:col-span-7 border border-[#E2E8E5] shadow-xs bg-[#081514] rounded-xs ${
              isFullscreen ? "" : "overflow-hidden"
            }`}
          >
            <IndiaMap
              city={city}
              season={season}
              mode={layer}
              selectedHotspot={selectedHotspotName}
              onSelectCity={onSelectCity}
              onSelectHotspot={onSelectHotspot}
              mapStyle={mapStyle}
              onMapStyleChange={setMapStyle}
              showHeatWave={showHeatWave}
              showIsotherms={showIsotherms}
              showStations={showStations}
              showHotspots={showHotspots}
              is3DMode={is3DMode}
              onToggle3D={handleToggle3D}
              resetTrigger={resetTrigger}
              isFullscreen={isFullscreen}
              onToggleFullscreen={handleToggleFullscreen}
              hideFloatingBar={true}
            />
          </div>

          {/* Right: Contextual Hotspot Intel Panel */}
          <div className="lg:col-span-5 xl:col-span-5">
            <HotspotIntelPanel
              city={city}
              season={season}
              hotspots={hotspots}
              selectedHotspotName={selectedHotspotName}
              onSelectHotspot={onSelectHotspot}
              onJumpToScenarioLab={() => onNavigateToView("Scenario Lab")}
              onJumpToDriverAnalysis={() => onNavigateToView("Driver Analysis")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
