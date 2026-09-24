"use client";

import { CityName, SeasonName, CITIES_DATA } from "../../data/heatData";
import { StateCityStation } from "../../data/allStateCities";
import { getDefaultLanguage } from "../../../lib/report-translations";

export interface AreaOption extends StateCityStation {
  id: string;
  state: string;
}

interface GlobalHeaderProps {
  city: CityName;
  season: SeasonName;
  layer: string;
  cityList: CityName[];
  areaOptions: AreaOption[];
  selectedAreaId: string;
  seasonLabels: Record<SeasonName, string>;
  onSelectCity: (city: CityName) => void;
  onSelectArea: (areaId: string) => void;
  onSelectLayer: (layer: string) => void;
  onSelectSeason: (season: SeasonName) => void;
  onOpenCommandPalette: () => void;
  onOpenComparator: () => void;
}

export default function GlobalHeader({
  city,
  season,
  layer,
  cityList,
  areaOptions,
  selectedAreaId,
  seasonLabels,
  onSelectCity,
  onSelectArea: _onSelectArea,
  onSelectLayer,
  onSelectSeason,
  onOpenCommandPalette,
  onOpenComparator,
}: GlobalHeaderProps) {
  const currentCityData = CITIES_DATA[city];
  const selectedArea = areaOptions.find((area) => area.id === selectedAreaId);

  const handleExportBrief = () => {
    const areaParam = selectedArea?.name || currentCityData?.seasons[season]?.hotspots[0]?.name || "";
    const langParam = getDefaultLanguage(currentCityData?.state || "");
    window.open(
      `/api/reports/pdf?city=${encodeURIComponent(city)}&season=${encodeURIComponent(season)}&area=${encodeURIComponent(areaParam)}&lang=${encodeURIComponent(langParam)}`,
      "_blank"
    );
  };

  return (
    <header
      className="w-full min-w-0 bg-white border-b border-[#E2E8E5] px-3 py-1.5 flex items-center justify-between gap-2 select-none overflow-hidden"
      aria-label="Workstation Command Center"
    >
      {/* Left: Mission Control Badge & Context */}
      <div className="flex flex-shrink-0 items-center gap-2">
        <span className="bg-[#EBF3F5] text-[#244E47] border border-[#CFE1DE] px-1.5 py-0.5 font-mono text-[9px] font-extrabold uppercase tracking-wider rounded-2xs">
          MISSION CONTROL
        </span>
        <div className="min-w-0 truncate font-sans text-[11.5px] text-[#4F635F]">
          Station:{" "}
          <strong className="text-[#1A2E2B] font-bold">
            {city} ({currentCityData?.state})
          </strong>{" "}
          · Zone:{" "}
          <strong className="text-[#1A2E2B] font-bold">
            {currentCityData?.climateZone}
          </strong>
        </div>
      </div>

      {/* Center: Search / Jump Trigger */}
      <div className="hidden 3xl:block flex-shrink max-w-[200px]">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="w-full bg-[#FAFBFA] hover:bg-[#F0F5F3] border border-[#D5DFDC] px-2.5 py-0.5 text-[11px] text-[#6B7D79] flex items-center justify-between cursor-pointer shadow-2xs transition-colors rounded-xs"
          title="Search Stations, Wards & Actions (⌘K / Ctrl+K)"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">🔍</span>
            <span className="font-mono text-[10.5px] text-[#5C6E6A]">
              Jump to station...
            </span>
          </div>
          <kbd className="bg-[#EBF0EE] border border-[#D5DFDC] px-1 py-0.2 rounded text-[8.5px] font-mono text-[#4A5B59] font-bold shadow-3xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Station, Layer, Compare, Brief, Season (Zero horizontal scroll) */}
      <div className="flex flex-nowrap items-center justify-end gap-1.5 flex-shrink-0">
        {/* City Station Selector */}
        <div className="flex items-center gap-1">
          <label
            htmlFor="header-city-select"
            className="font-mono text-[8.5px] font-bold text-[#6B7D79] uppercase tracking-wider"
          >
            STATION
          </label>
          <div className="relative">
            <select
              id="header-city-select"
              aria-label="Select City Monitoring Station"
              value={city}
              onChange={(e) => onSelectCity(e.target.value as CityName)}
              className="w-[130px] bg-[#FAFBFA] hover:bg-[#F0F5F3] text-[#1A2E2B] font-sans text-[11px] font-medium border border-[#D5DFDC] px-2 py-0.5 pr-5 cursor-pointer shadow-2xs appearance-none rounded-xs focus:outline-none focus:border-[#2B544E]"
            >
              {cityList.map((c) => (
                <option key={c} value={c}>
                  {c} ({CITIES_DATA[c].state})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-[#6B7D79] text-[8px]">
              ▼
            </div>
          </div>
        </div>

        {/* Live Functional Map Layer Switcher */}
        <div className="flex items-center gap-1">
          <label
            htmlFor="header-layer-select"
            className="font-mono text-[8.5px] font-bold text-[#174D46] uppercase tracking-wider"
          >
            LAYER
          </label>
          <div className="relative">
            <select
              id="header-layer-select"
              aria-label="Select Active Map Telemetry Layer"
              value={layer}
              onChange={(e) => onSelectLayer(e.target.value)}
              className="w-[135px] bg-[#E8F3EE]/90 hover:bg-[#E8F3EE] text-[#174D46] font-sans text-[11px] font-bold border border-[#A7C8BE] px-2 py-0.5 pr-5 cursor-pointer shadow-2xs appearance-none rounded-xs focus:outline-none focus:border-[#174D46]"
            >
              <option value="Heat stress">🔥 Heat Stress</option>
              <option value="Surface temp.">🌡️ Surface Temp</option>
              <option value="Vulnerability">👥 Vulnerability</option>
              <option value="Cooling opportunity">❄️ Cooling Opp.</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-[#174D46] text-[8px]">
              ▼
            </div>
          </div>
        </div>

        {/* Compare Stations Button */}
        <button
          type="button"
          onClick={onOpenComparator}
          className="bg-[#0B253F] hover:bg-[#123657] text-white border border-[#0B253F] px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase cursor-pointer shadow-2xs transition-colors rounded-xs whitespace-nowrap"
          title="Compare the active station with another city station"
        >
          COMPARE
        </button>

        {/* Export Brief Button */}
        <button
          type="button"
          onClick={handleExportBrief}
          className="bg-[#174D46] hover:bg-[#113B35] text-white border border-[#174D46] px-2 py-0.5 text-[9.5px] font-mono font-bold tracking-wider uppercase cursor-pointer shadow-2xs transition-colors rounded-xs flex items-center gap-1 whitespace-nowrap"
          title="Export official municipal PDF cooling brief"
        >
          <span>📄</span>
          <span>BRIEF</span>
        </button>

        {/* Season Selector (Guaranteed visible and fully expanded) */}
        <div className="flex items-center gap-1">
          <label
            htmlFor="header-season-select"
            className="font-mono text-[8.5px] font-bold text-[#6B7D79] uppercase tracking-wider"
          >
            SEASON
          </label>
          <div className="relative">
            <select
              id="header-season-select"
              aria-label="Select Meteorological Season"
              value={season}
              onChange={(e) => onSelectSeason(e.target.value as SeasonName)}
              className="w-[145px] bg-[#FAFBFA] hover:bg-[#F0F5F3] text-[#1A2E2B] font-sans text-[11px] font-medium border border-[#D5DFDC] px-2 py-0.5 pr-5 cursor-pointer shadow-2xs appearance-none rounded-xs focus:outline-none focus:border-[#2B544E]"
            >
              {(Object.keys(seasonLabels) as SeasonName[]).map((s) => (
                <option key={s} value={s}>
                  {seasonLabels[s]}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-[#6B7D79] text-[8px]">
              ▼
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
