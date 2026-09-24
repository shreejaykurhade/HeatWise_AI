"use client";

import { SeasonName } from "../../data/heatData";

interface MapLegendProps {
  mode: string;
  season: SeasonName;
}

export default function MapLegend({ mode, season }: MapLegendProps) {
  const getLegendMetadata = () => {
    if (mode === "Vulnerability") {
      return {
        title: "UHI ANOMALY (°C)",
        low: "+1.2°",
        mild: "+4.5°",
        high: "+7.0°",
        severe: "+9.0°C",
        gradient: "linear-gradient(to right, #4CAF50 0%, #FFC107 35%, #FF7043 70%, #D32F2F 100%)",
      };
    }

    if (mode === "Surface temp.") {
      return {
        title: "LST SURFACE TEMP (°C)",
        low: season === "Winter" ? "12°" : "28°",
        mild: season === "Winter" ? "22°" : "38°",
        high: season === "Winter" ? "30°" : "48°",
        severe: season === "Winter" ? "38°" : "58°C",
        gradient: "linear-gradient(to right, #4CAF50 0%, #FFC107 35%, #FF7043 70%, #D32F2F 100%)",
      };
    }

    // Default: WBGT Thermal Stress
    return {
      title: "WBGT THERMAL STRESS (°C)",
      low: season === "Winter" ? "10° Low" : "26° Mild",
      mild: season === "Winter" ? "20° Mod" : "38° Warning",
      high: season === "Winter" ? "28° High" : "48° Danger",
      severe: season === "Winter" ? "36° Extreme" : "56° Extreme",
      gradient: "linear-gradient(to right, #4CAF50 0%, #FFC107 35%, #FF7043 70%, #D32F2F 100%)",
    };
  };

  const meta = getLegendMetadata();

  return (
    <div
      className="absolute bottom-2.5 left-2.5 z-20 bg-[#0B1C1A]/92 border border-white/18 px-2.5 py-1.5 w-[190px] shadow-lg backdrop-blur-md text-white rounded-xs"
      aria-label="Thermal Scale Legend"
    >
      <div className="flex justify-between items-center mb-0.5 leading-none">
        <span className="font-mono text-[7.5px] uppercase tracking-wider text-[#A0BCB6] font-bold">
          {meta.title}
        </span>
        <span className="font-mono text-[7.5px] text-[#FFD54F] font-bold uppercase">
          {season.substring(0, 3)}
        </span>
      </div>

      {/* Gradient Bar */}
      <div
        className="h-1.5 my-1 rounded-2xs border border-white/15"
        style={{ background: meta.gradient }}
      />

      {/* Ticks */}
      <div className="flex justify-between font-mono text-[6.5px] text-[#C5D6CE] leading-none">
        <span>{meta.low}</span>
        <span>{meta.mild}</span>
        <span>{meta.high}</span>
        <span>{meta.severe}</span>
      </div>
    </div>
  );
}
