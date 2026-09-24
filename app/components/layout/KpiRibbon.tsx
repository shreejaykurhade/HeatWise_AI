"use client";

import { CitySeasonData } from "../../data/heatData";

interface KpiRibbonProps {
  currentSeasonData: CitySeasonData;
}

export default function KpiRibbon({ currentSeasonData }: KpiRibbonProps) {
  const peakDelta = (
    currentSeasonData.peakLst - currentSeasonData.meanLst
  ).toFixed(1);

  // Calculate estimated exposed population for active ward
  const activeHotspot = currentSeasonData.hotspots[0];
  const exposedPopFormatted = activeHotspot?.people
    ? activeHotspot.people
    : activeHotspot?.peopleNum
    ? activeHotspot.peopleNum.toLocaleString()
    : "22,600";

  return (
    <section
      className="grid grid-cols-2 md:grid-cols-5 bg-white border-b border-[#E2E8E5] px-4 py-2.5 gap-4 divide-y md:divide-y-0 md:divide-x divide-[#E8EFEA] select-none"
      aria-label="Key City Telemetry Indicators"
    >
      {/* 1. Peak LST Surface Temp */}
      <div className="flex flex-col justify-between pr-2">
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="font-mono text-[8px] uppercase tracking-wider text-[#6B7D79] font-bold truncate">
            PEAK LST SURFACE TEMP
          </span>
          <span className="bg-[#FDEDEC] text-[#D32F2F] font-mono text-[7.5px] font-bold px-1.5 py-0.5 rounded-2xs uppercase tracking-tight shrink-0">
            ▲ HIGH
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif text-[22px] font-bold text-[#C83E2D] tracking-tight leading-none">
            {currentSeasonData.peakLst} °C
          </span>
          <span className="font-mono text-[9.5px] text-[#C83E2D] font-medium leading-none">
            +{peakDelta}°C vs Mean
          </span>
        </div>
      </div>

      {/* 2. Mean UHI Anomaly */}
      <div className="flex flex-col justify-between md:pl-3 pr-2 pt-2 md:pt-0">
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="font-mono text-[8px] uppercase tracking-wider text-[#6B7D79] font-bold truncate">
            MEAN UHI ANOMALY
          </span>
          <span className="bg-[#FFF3E0] text-[#E65100] font-mono text-[7.5px] font-bold px-1.5 py-0.5 rounded-2xs uppercase tracking-tight shrink-0">
            ANOMALY
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif text-[22px] font-bold text-[#E06A26] tracking-tight leading-none">
            +{currentSeasonData.uhiMean} °C
          </span>
          <span className="font-mono text-[9.5px] text-[#78909C] font-medium leading-none">
            Peak +{currentSeasonData.uhiMax}°C
          </span>
        </div>
      </div>

      {/* 3. Modeled Hotspot Zones */}
      <div className="flex flex-col justify-between md:pl-3 pr-2 pt-2 md:pt-0">
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="font-mono text-[8px] uppercase tracking-wider text-[#6B7D79] font-bold truncate">
            MODELED HOTSPOT ZONES
          </span>
          <span className="bg-[#E8EFF2] text-[#37474F] font-mono text-[7.5px] font-bold px-1.5 py-0.5 rounded-2xs uppercase tracking-tight shrink-0">
            SECTORS
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif text-[22px] font-bold text-[#1E2928] tracking-tight leading-none">
            {currentSeasonData.hotspotCount}
          </span>
          <span className="font-mono text-[9.5px] text-[#78909C] font-medium leading-none">
            {currentSeasonData.hotspotPct}% grid sectors
          </span>
        </div>
      </div>

      {/* 4. Max Cooling Opportunity */}
      <div className="flex flex-col justify-between md:pl-3 pr-2 pt-2 md:pt-0">
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="font-mono text-[8px] uppercase tracking-wider text-[#6B7D79] font-bold truncate">
            MAX COOLING OPPORTUNITY
          </span>
          <span className="bg-[#E8F5E9] text-[#2E7D32] font-mono text-[7.5px] font-bold px-1.5 py-0.5 rounded-2xs uppercase tracking-tight shrink-0">
            95TH %
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif text-[22px] font-bold text-[#2E7D32] tracking-tight leading-none">
            {currentSeasonData.coolingOpportunity} °C
          </span>
          <span className="font-mono text-[9.5px] text-[#78909C] font-medium leading-none">
            Target Potential
          </span>
        </div>
      </div>

      {/* 5. Population Exposed */}
      <div className="flex flex-col justify-between md:pl-3 pt-2 md:pt-0 col-span-2 md:col-span-1">
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="font-mono text-[8px] uppercase tracking-wider text-[#6B7D79] font-bold truncate">
            POPULATION EXPOSED
          </span>
          <span className="bg-[#E3F2FD] text-[#1565C0] font-mono text-[7.5px] font-bold px-1.5 py-0.5 rounded-2xs uppercase tracking-tight shrink-0">
            RESIDENTS
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif text-[22px] font-bold text-[#1E2928] tracking-tight leading-none">
            {exposedPopFormatted}
          </span>
          <span className="font-mono text-[9.5px] text-[#78909C] font-medium leading-none">
            Target Ward
          </span>
        </div>
      </div>
    </section>
  );
}
