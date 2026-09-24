"use client";

import { Hotspot, CityName, SeasonName, CITIES_DATA } from "../../data/heatData";

interface HotspotIntelPanelProps {
  city: CityName;
  season: SeasonName;
  hotspots: readonly Hotspot[];
  selectedHotspotName: string;
  onSelectHotspot: (name: string) => void;
  onJumpToScenarioLab?: () => void;
  onJumpToDriverAnalysis?: () => void;
}

export default function HotspotIntelPanel({
  city,
  season,
  hotspots,
  selectedHotspotName,
  onSelectHotspot,
  onJumpToScenarioLab,
  onJumpToDriverAnalysis,
}: HotspotIntelPanelProps) {
  const currentCityData = CITIES_DATA[city];
  const activeHotspot =
    hotspots.find((h) => h.name === selectedHotspotName) || hotspots[0];

  if (!activeHotspot) return null;

  return (
    <aside className="intel-panel bg-white border border-[#E2E8E5] p-3 shadow-2xs rounded-xs" aria-label="Hotspot Intelligence Telemetry">
      {/* Panel Header matching reference image */}
      <div className="flex items-center justify-between border-b border-[#EEF2F0] pb-2 mb-2">
        <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-[#78909C]">
          SELECTED HOTSPOT INTELLIGENCE
        </span>
        <span className="bg-[#F0F4F2] border border-[#D5DFDC] text-[#4E615D] font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-2xs">
          {activeHotspot.id.toUpperCase()}
        </span>
      </div>

      {/* Ward Selector Dropdown */}
      <div className="mb-2.5">
        <label htmlFor="hotspot-select" className="sr-only">
          Select Critical Hotspot Ward
        </label>
        <select
          id="hotspot-select"
          aria-label="Select Critical Hotspot Ward"
          className="w-full bg-[#FAFBFA] hover:bg-[#F0F5F3] text-[#1A2E2B] font-sans text-xs font-medium border border-[#D5DFDC] px-2.5 py-1 cursor-pointer shadow-2xs rounded-xs focus:outline-none focus:border-[#2B544E]"
          value={activeHotspot.name}
          onChange={(e) => onSelectHotspot(e.target.value)}
        >
          {hotspots.map((h) => (
            <option key={h.name} value={h.name}>
              {h.name} · {h.temp} ({h.risk} Risk)
            </option>
          ))}
        </select>
      </div>

      {/* Primary & Secondary Hero Metric Card */}
      <div className="intel-hero-card">
        <div className="mb-2">
          <h3 className="font-serif text-[17px] font-extrabold text-[#1A2E2B] tracking-tight uppercase">
            {activeHotspot.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-[#FFEBEE] text-[#D32F2F] font-mono text-[7.5px] font-bold px-1.5 py-0.5 border border-[#FFCDD2] rounded-2xs uppercase tracking-tight flex items-center gap-1">
              <span>●</span> {activeHotspot.risk === "Very high" ? "VERY HIGH SEVERITY" : `${activeHotspot.risk.toUpperCase()} SEVERITY`}
            </span>
            <span className="font-mono text-[9.5px] text-[#78909C]">
              {currentCityData.state} · SCORE {activeHotspot.risk === "Very high" ? "99/100" : activeHotspot.risk === "High" ? "88/100" : "72/100"}
            </span>
          </div>
        </div>

        {/* Primary Metric Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#D9DFDB]">
          <div className="flex flex-col">
            <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#5E6D6B]">
              PEAK LST
            </span>
            <span className="font-mono text-base font-bold text-[#C83E2D]">
              {activeHotspot.temp}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#5E6D6B]">
              UHI ANOMALY
            </span>
            <span className="font-mono text-base font-bold text-[#E06A26]">
              +{activeHotspot.uhi}°C
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#5E6D6B]">
              EXPOSED POP.
            </span>
            <span className="font-mono text-base font-bold text-[#123B63]">
              {activeHotspot.people}
            </span>
          </div>
        </div>
      </div>

      {/* Tertiary Physical Morphology Grid */}
      <div className="intel-env-grid">
        <div className="intel-env-cell">
          <span className="intel-env-label">CANOPY COVER</span>
          <span className="intel-env-val">{activeHotspot.canopyCover}</span>
        </div>

        <div className="intel-env-cell">
          <span className="intel-env-label">BUILT FRACTION</span>
          <span className="intel-env-val">{activeHotspot.builtFraction}</span>
        </div>

        <div className="intel-env-cell">
          <span className="intel-env-label">BLDG HEIGHT</span>
          <span className="intel-env-val">{activeHotspot.buildingHeight}</span>
        </div>

        <div className="intel-env-cell">
          <span className="intel-env-label">SKY VIEW (SVF)</span>
          <span className="intel-env-val">{activeHotspot.skyView}</span>
        </div>

        <div className="intel-env-cell">
          <span className="intel-env-label">SURFACE ALBEDO</span>
          <span className="intel-env-val">{activeHotspot.albedo}</span>
        </div>

        <div className="intel-env-cell">
          <span className="intel-env-label">WIND SPEED</span>
          <span className="intel-env-val">{activeHotspot.windSpeed}</span>
        </div>

        <div className="intel-env-cell">
          <span className="intel-env-label">PM2.5 AEROSOL</span>
          <span className="intel-env-val">{activeHotspot.pm25}</span>
        </div>

        <div className="intel-env-cell">
          <span className="intel-env-label">WBGT INDEX</span>
          <span className="intel-env-val text-[#C83E2D] font-bold">
            {activeHotspot.wbgt}°C
          </span>
        </div>
      </div>

      {/* Quick SHAP Physical Drivers Summary */}
      <div className="intel-shap-box">
        <div className="flex justify-between items-center mb-1.5">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#5E6D6B] font-bold">
            PHYSICAL DRIVERS (SHAP)
          </span>
          <span className="font-mono text-[8.5px] text-[#174D46] font-semibold">
            {season.toUpperCase()}
          </span>
        </div>

        <div className="space-y-1.5">
          {activeHotspot.driverBreakdown.slice(0, 3).map((d, i) => {
            const isPositive = d.val >= 0;
            return (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="font-sans text-[11px] text-[#1D2A2A] truncate max-w-[150px]">
                  {d.name}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-16 h-1.5 bg-[#E8EDE9] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        isPositive ? "bg-[#E06A26]" : "bg-[#4F7D58]"
                      }`}
                      style={{ width: `${Math.min(100, Math.abs(d.val) * 28)}%` }}
                    />
                  </div>
                  <span
                    className={`font-mono text-[9px] font-bold ${
                      isPositive ? "text-[#C83E2D]" : "text-[#4F7D58]"
                    }`}
                  >
                    {isPositive ? `+${d.val}°C` : `${d.val}°C`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Shortcut Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-auto pt-2">
        {onJumpToScenarioLab && (
          <button
            onClick={onJumpToScenarioLab}
            className="btn-primary-tech text-xs py-2 text-center"
          >
            Simulate Cooling ⟶
          </button>
        )}
        {onJumpToDriverAnalysis && (
          <button
            onClick={onJumpToDriverAnalysis}
            className="btn-secondary-tech text-xs py-2 text-center"
          >
            Inspect Drivers ⟶
          </button>
        )}
      </div>
    </aside>
  );
}
