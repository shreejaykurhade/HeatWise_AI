"use client";

import { CityName, SeasonName, Hotspot, CITIES_DATA } from "../../data/heatData";
import IndiaMap from "../map/IndiaMap";

interface ExplorerViewProps {
  city: CityName;
  season: SeasonName;
  layer: string;
  selectedHotspotName: string;
  onSelectCity: (city: CityName) => void;
  onSelectHotspot: (name: string) => void;
  onSelectLayer: (layer: string) => void;
}

export default function ExplorerView({
  city,
  season,
  layer,
  selectedHotspotName,
  onSelectCity,
  onSelectHotspot,
  onSelectLayer,
}: ExplorerViewProps) {
  const currentCityData = CITIES_DATA[city];
  const currentSeasonData = currentCityData.seasons[season];
  const hotspots: readonly Hotspot[] = currentSeasonData.hotspots;
  const activeHotspot =
    hotspots.find((h) => h.name === selectedHotspotName) || hotspots[0];

  return (
    <div className="view-container explorer-layout space-y-3">
      {/* Explorer Workspace Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8E5] pb-2">
        <div>
          <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#174D46] font-bold">
            HIGH-RESOLUTION SPATIAL INVESTIGATION
          </span>
          <h2 className="font-sans text-base sm:text-lg font-bold text-[#162220]">
            Urban Heat Explorer · {city} ({currentCityData.state})
          </h2>
        </div>

        <div className="flex items-center gap-1 bg-white border border-[#E2E8E5] p-1 rounded-xs">
          <span className="font-mono text-[8.5px] text-[#5C6E6A] px-1 font-bold">
            LAYER:
          </span>
          {["Heat stress", "Surface temp.", "Vulnerability"].map((l) => (
            <button
              key={l}
              onClick={() => onSelectLayer(l)}
              className={`px-2 py-0.5 text-[10px] font-mono transition-colors cursor-pointer rounded-xs ${
                layer === l
                  ? "bg-[#0B253F] text-white font-bold"
                  : "text-[#5C6E6A] hover:text-[#162220]"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Split Workspace Layout with Balanced Map Width */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left: Compact Map Viewport */}
        <div className="lg:col-span-7 xl:col-span-7 border border-[#E2E8E5] shadow-xs bg-white overflow-hidden rounded-xs">
          <IndiaMap
            city={city}
            season={season}
            mode={layer}
            selectedHotspot={selectedHotspotName}
            onSelectCity={onSelectCity}
            onSelectHotspot={onSelectHotspot}
          />
        </div>

        {/* Right: Ward Hotspot Grid Directory & Inspector */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-3">
          {/* Ward Selector Table / List */}
          <div className="border border-[#E2E8E5] bg-white p-3 shadow-2xs rounded-xs">
            <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-[#EDF2EF]">
              <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#5C6E6A] font-bold">
                CRITICAL WARDS ({hotspots.length})
              </span>
              <span className="font-mono text-[8.5px] text-[#174D46] font-semibold">
                CLICK TO INSPECT
              </span>
            </div>

            <div className="space-y-1.5 max-h-[190px] overflow-y-auto pr-1">
              {hotspots.map((h) => {
                const isSelected = h.name === selectedHotspotName;
                return (
                  <button
                    key={h.name}
                    onClick={() => onSelectHotspot(h.name)}
                    className={`w-full p-2 text-left border flex items-center justify-between transition-colors cursor-pointer rounded-xs ${
                      isSelected
                        ? "bg-[#EBF2F7] border-[#0B253F] shadow-2xs"
                        : "bg-[#FAFBFA] border-[#E2E8E5] hover:bg-[#EDF2EF]"
                    }`}
                  >
                    <div>
                      <div className="font-sans text-xs font-semibold text-[#162220]">
                        {h.name}
                      </div>
                      <div className="font-mono text-[8.5px] text-[#5C6E6A]">
                        Pop: {h.people} · Canopy: {h.canopyCover}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs font-bold text-[#C93B2B]">
                        {h.temp}
                      </div>
                      <div className="font-mono text-[8.5px] text-[#D96527]">
                        +{h.uhi}°C UHI
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deep Spatial Grid Telemetry Card for Active Ward */}
          {activeHotspot && (
            <div className="border border-[#E2E8E5] bg-white p-3 shadow-2xs rounded-xs">
              <div className="flex justify-between items-start mb-2 pb-1.5 border-b border-[#EDF2EF]">
                <div>
                  <span className="font-mono text-[8px] uppercase text-[#174D46] font-bold">
                    ACTIVE CELL TELEMETRY
                  </span>
                  <h3 className="font-sans text-xs sm:text-sm font-bold text-[#162220]">
                    {activeHotspot.name}
                  </h3>
                </div>
                <span className="bg-[#C93B2B]/10 text-[#C93B2B] border border-[#C93B2B]/25 px-2 py-0.5 font-mono text-[8.5px] font-bold rounded-xs">
                  {activeHotspot.risk.toUpperCase()} RISK
                </span>
              </div>

              {/* 4x2 Detailed Physical Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-1.5 bg-[#FAFBFA] border border-[#EDF2EF] rounded-xs">
                  <span className="font-mono text-[8px] text-[#5C6E6A] block">
                    PEAK SURFACE LST
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#C93B2B]">
                    {activeHotspot.temp}
                  </span>
                </div>

                <div className="p-1.5 bg-[#FAFBFA] border border-[#EDF2EF] rounded-xs">
                  <span className="font-mono text-[8px] text-[#5C6E6A] block">
                    UHI INTENSITY
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#D96527]">
                    +{activeHotspot.uhi}°C
                  </span>
                </div>

                <div className="p-1.5 bg-[#FAFBFA] border border-[#EDF2EF] rounded-xs">
                  <span className="font-mono text-[8px] text-[#5C6E6A] block">
                    CANOPY FRACTION
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#162220]">
                    {activeHotspot.canopyCover}
                  </span>
                </div>

                <div className="p-1.5 bg-[#FAFBFA] border border-[#EDF2EF] rounded-xs">
                  <span className="font-mono text-[8px] text-[#5C6E6A] block">
                    BUILT FRACTION
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#162220]">
                    {activeHotspot.builtFraction}
                  </span>
                </div>

                <div className="p-1.5 bg-[#FAFBFA] border border-[#EDF2EF] rounded-xs">
                  <span className="font-mono text-[8px] text-[#5C6E6A] block">
                    SKY-VIEW FACTOR (SVF)
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#162220]">
                    {activeHotspot.skyView}
                  </span>
                </div>

                <div className="p-1.5 bg-[#FAFBFA] border border-[#EDF2EF] rounded-xs">
                  <span className="font-mono text-[8px] text-[#5C6E6A] block">
                    SURFACE ALBEDO
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#162220]">
                    {activeHotspot.albedo}
                  </span>
                </div>

                <div className="p-1.5 bg-[#FAFBFA] border border-[#EDF2EF] rounded-xs">
                  <span className="font-mono text-[8px] text-[#5C6E6A] block">
                    SURFACE WIND
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#162220]">
                    {activeHotspot.windSpeed}
                  </span>
                </div>

                <div className="p-1.5 bg-[#FAFBFA] border border-[#EDF2EF] rounded-xs">
                  <span className="font-mono text-[8px] text-[#5C6E6A] block">
                    PM2.5 DENSITY
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#162220]">
                    {activeHotspot.pm25}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
