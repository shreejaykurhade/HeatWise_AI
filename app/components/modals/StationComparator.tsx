"use client";

import { useState } from "react";
import { CityName, SeasonName, CITIES_DATA } from "../../data/heatData";

interface StationComparatorProps {
  isOpen: boolean;
  activeCity: CityName;
  season: SeasonName;
  cityList: CityName[];
  onClose: () => void;
  onSelectStationToInspect: (city: CityName) => void;
}

export default function StationComparator({
  isOpen,
  activeCity,
  season,
  cityList,
  onClose,
  onSelectStationToInspect,
}: StationComparatorProps) {
  const [compareCity, setCompareCity] = useState<CityName>(
    activeCity === "Jaipur" ? "Hyderabad" : "Jaipur"
  );

  if (!isOpen) return null;

  const cityAData = CITIES_DATA[activeCity]?.seasons[season];
  const cityBData = CITIES_DATA[compareCity]?.seasons[season];

  if (!cityAData || !cityBData) return null;

  const lstDiff = (cityBData.peakLst - cityAData.peakLst).toFixed(1);
  const uhiDiff = (cityBData.uhiMean - cityAData.uhiMean).toFixed(1);
  const coolingDiff = (
    cityBData.coolingOpportunity - cityAData.coolingOpportunity
  ).toFixed(1);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Station Comparison Modal"
    >
      {/* Clickable Backdrop */}
      <button
        type="button"
        className="fixed inset-0 w-full h-full bg-transparent border-0 cursor-default"
        onClick={onClose}
        aria-label="Close comparison overlay"
        tabIndex={-1}
      />

      {/* Dialog Box */}
      <div
        className="relative z-10 w-full max-w-2xl bg-white border border-[#D9DFDB] shadow-2xl overflow-hidden rounded-xs p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-[#D9DFDB]">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#174D46] font-bold">
              CROSS-STATION TELEMETRY COMPARISON ({season.toUpperCase()})
            </span>
            <h2 className="font-serif text-base font-bold text-[#1D2A2A]">
              {activeCity} vs. {compareCity}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#5E6D6B] hover:text-[#1D2A2A] text-lg font-mono px-2 cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Station Selectors */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-[#FAFBFA] border border-[#D9DFDB]">
            <span className="font-mono text-[9px] text-[#5E6D6B] block">
              PRIMARY STATION (ACTIVE)
            </span>
            <span className="font-serif text-base font-bold text-[#123B63]">
              {activeCity}
            </span>
            <span className="font-mono text-[10px] text-[#5E6D6B] block">
              {CITIES_DATA[activeCity].state} · {CITIES_DATA[activeCity].climateZone}
            </span>
          </div>

          <div className="p-3 bg-[#EBF2F7] border border-[#123B63]">
            <span className="font-mono text-[9px] text-[#123B63] block font-bold">
              BENCHMARK STATION
            </span>
            <select
              aria-label="Select benchmark station to compare"
              value={compareCity}
              onChange={(e) => setCompareCity(e.target.value as CityName)}
              className="font-serif text-base font-bold text-[#0B253F] bg-transparent border-b border-[#123B63] w-full outline-none mt-0.5"
            >
              {cityList
                .filter((c) => c !== activeCity)
                .map((c) => (
                  <option key={c} value={c}>
                    {c} ({CITIES_DATA[c].state})
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Comparison Metrics Grid */}
        <div className="border border-[#D9DFDB] divide-y divide-[#D9DFDB] text-xs font-mono">
          {/* Row 1: Peak LST */}
          <div className="p-2.5 flex items-center justify-between">
            <span className="text-[#5E6D6B]">Peak Surface LST:</span>
            <div className="flex items-center gap-4">
              <span className="font-bold text-[#1D2A2A]">{cityAData.peakLst}°C</span>
              <span className="text-[#5E6D6B]">vs</span>
              <span className="font-bold text-[#C83E2D]">{cityBData.peakLst}°C</span>
              <span
                className={`px-2 py-0.5 text-[9px] font-bold ${
                  Number(lstDiff) > 0
                    ? "bg-[#C83E2D]/10 text-[#C83E2D]"
                    : "bg-[#4F7D58]/10 text-[#4F7D58]"
                }`}
              >
                {Number(lstDiff) > 0 ? `+${lstDiff}°C Hotter` : `${lstDiff}°C Cooler`}
              </span>
            </div>
          </div>

          {/* Row 2: Mean UHI Anomaly */}
          <div className="p-2.5 flex items-center justify-between">
            <span className="text-[#5E6D6B]">Mean UHI Anomaly:</span>
            <div className="flex items-center gap-4">
              <span className="font-bold text-[#1D2A2A]">+{cityAData.uhiMean}°C</span>
              <span className="text-[#5E6D6B]">vs</span>
              <span className="font-bold text-[#E06A26]">+{cityBData.uhiMean}°C</span>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-[#E8EDE9] text-[#1D2A2A]">
                {Number(uhiDiff) > 0 ? `+${uhiDiff}°C` : `${uhiDiff}°C`}
              </span>
            </div>
          </div>

          {/* Row 3: Hotspot Count */}
          <div className="p-2.5 flex items-center justify-between">
            <span className="text-[#5E6D6B]">Critical Wards:</span>
            <div className="flex items-center gap-4">
              <span className="font-bold text-[#1D2A2A]">{cityAData.hotspotCount} Wards</span>
              <span className="text-[#5E6D6B]">vs</span>
              <span className="font-bold text-[#123B63]">{cityBData.hotspotCount} Wards</span>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-[#E8EDE9] text-[#1D2A2A]">
                {cityBData.hotspotCount - cityAData.hotspotCount > 0
                  ? `+${cityBData.hotspotCount - cityAData.hotspotCount}`
                  : `${cityBData.hotspotCount - cityAData.hotspotCount}`}
              </span>
            </div>
          </div>

          {/* Row 4: Cooling Opportunity */}
          <div className="p-2.5 flex items-center justify-between">
            <span className="text-[#5E6D6B]">Cooling Ceiling:</span>
            <div className="flex items-center gap-4">
              <span className="font-bold text-[#4F7D58]">−{cityAData.coolingOpportunity}°C</span>
              <span className="text-[#5E6D6B]">vs</span>
              <span className="font-bold text-[#4F7D58]">−{cityBData.coolingOpportunity}°C</span>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-[#E8EDE9] text-[#1D2A2A]">
                {Number(coolingDiff) > 0 ? `+${coolingDiff}°C` : `${coolingDiff}°C`}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={() => {
              onSelectStationToInspect(compareCity);
              onClose();
            }}
            className="btn-primary-tech text-xs py-1.5 px-3"
          >
            Switch Active Workstation to {compareCity} ⟶
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary-tech text-xs py-1.5 px-3"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
