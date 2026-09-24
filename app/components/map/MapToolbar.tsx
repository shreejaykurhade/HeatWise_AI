"use client";

export type MapStyleKey = "satellite" | "light" | "dark";

export const MAP_STYLES: Record<
  MapStyleKey,
  { label: string; shortLabel: string; icon: string; style: string }
> = {
  satellite: {
    label: "Satellite",
    shortLabel: "Sat",
    icon: "🛰️",
    style: "https://api.maptiler.com/maps/hybrid/style.json",
  },
  light: {
    label: "Carto Light",
    shortLabel: "Light",
    icon: "☀️",
    style: "https://api.maptiler.com/maps/dataviz-light/style.json",
  },
  dark: {
    label: "Midnight Thermal",
    shortLabel: "Dark",
    icon: "🌑",
    style: "https://api.maptiler.com/maps/dataviz-dark/style.json",
  },
};

export interface MapToolbarProps {
  activeMapStyle: MapStyleKey;
  onStyleChange: (style: MapStyleKey) => void;
  showHeatWave: boolean;
  onToggleHeatWave: () => void;
  showIsotherms: boolean;
  onToggleIsotherms: () => void;
  showStations: boolean;
  onToggleStations: () => void;
  showHotspots: boolean;
  onToggleHotspots: () => void;
  is3DMode: boolean;
  onToggle3D: () => void;
  onResetNormal: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  className?: string;
}

export default function MapToolbar({
  activeMapStyle,
  onStyleChange,
  showHeatWave,
  onToggleHeatWave,
  showIsotherms,
  onToggleIsotherms,
  showStations,
  onToggleStations,
  showHotspots,
  onToggleHotspots,
  is3DMode,
  onToggle3D,
  onResetNormal,
  isFullscreen,
  onToggleFullscreen,
  className = "",
}: MapToolbarProps) {
  const getBtnClass = (active: boolean) =>
    `h-[22px] px-1.5 text-[8px] font-mono font-semibold inline-flex items-center justify-center gap-0.5 transition-all cursor-pointer rounded-2xs leading-none shrink-0 border ${
      active
        ? "bg-[#174D46] text-[#FFD54F] border-[#4F7D58] shadow-2xs"
        : "bg-transparent text-[#C5D6CE] border-transparent hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div
      className={`w-full flex items-center justify-between bg-[#0B1C1A] border border-[#1F3330] px-1 py-0.5 shadow-xs rounded-xs select-none gap-1 overflow-hidden ${className}`}
    >
      {/* Left: Basemap Segmented Switcher */}
      <div className="flex items-center bg-black/50 p-0.5 rounded-2xs border border-white/10 shrink-0">
        {(Object.keys(MAP_STYLES) as MapStyleKey[]).map((key) => {
          const s = MAP_STYLES[key];
          const isSelected = activeMapStyle === key;
          return (
            <button
              key={key}
              onClick={() => onStyleChange(key)}
              className={`h-[18px] px-1 text-[8px] font-mono font-semibold inline-flex items-center justify-center gap-0.5 transition-all cursor-pointer rounded-3xs leading-none ${
                isSelected
                  ? "bg-[#174D46] text-[#FFD54F] font-bold shadow-2xs"
                  : "text-[#A0BCB6] hover:text-white"
              }`}
              title={`Switch to ${s.label}`}
            >
              <span className="text-[9px] leading-none flex items-center">{s.icon}</span>
              <span className="leading-none">{s.shortLabel}</span>
            </button>
          );
        })}
      </div>

      <div className="h-3.5 w-[1px] bg-white/15 mx-0.5 shrink-0" />

      {/* Right: Feature Toggles (Compact & Guaranteed No-Overflow) */}
      <div className="flex items-center gap-0.5 flex-1 justify-end min-w-0">
        {/* Heat Wave Toggle */}
        <button
          onClick={onToggleHeatWave}
          className={getBtnClass(showHeatWave)}
          title="Toggle Realtime Heat Wave Layer"
        >
          <span className="text-[9px] leading-none flex items-center">🔥</span>
          <span className="leading-none">Heat</span>
        </button>

        {/* Isotherms Toggle */}
        <button
          onClick={onToggleIsotherms}
          className={getBtnClass(showIsotherms)}
          title="Toggle Isothermal Contours"
        >
          <span className="text-[9px] leading-none flex items-center">〰</span>
          <span className="leading-none">Iso</span>
        </button>

        {/* Stations Toggle */}
        <button
          onClick={onToggleStations}
          className={getBtnClass(showStations)}
          title="Toggle Monitoring Stations"
        >
          <span className="text-[9px] leading-none flex items-center">📍</span>
          <span className="leading-none">Stn</span>
        </button>

        {/* Wards Toggle */}
        <button
          onClick={onToggleHotspots}
          className={getBtnClass(showHotspots)}
          title="Toggle Hotspot Wards"
        >
          <span className="text-[9px] leading-none flex items-center">🎯</span>
          <span className="leading-none">Wards</span>
        </button>

        {/* 3D View Toggle */}
        <button
          onClick={onToggle3D}
          className={getBtnClass(is3DMode)}
          title="Toggle 3D Perspective"
        >
          <span className="leading-none">{is3DMode ? "2D" : "3D"}</span>
        </button>

        {/* Normal Map Reset Button */}
        <button
          onClick={onResetNormal}
          className={getBtnClass(false)}
          title="Reset / Reload to Full Normal India Map"
        >
          <span className="text-[9px] leading-none flex items-center">🔄</span>
          <span className="leading-none">Normal</span>
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={onToggleFullscreen}
          className={
            isFullscreen
              ? "h-[22px] px-1.5 text-[8px] font-mono font-semibold inline-flex items-center justify-center gap-0.5 transition-all cursor-pointer rounded-2xs leading-none shrink-0 border bg-[#C93B2B] text-white border-[#C93B2B]"
              : getBtnClass(false)
          }
          title={isFullscreen ? "Exit Fullscreen (Esc)" : "Full Map View"}
        >
          <span className="text-[9px] leading-none flex items-center">{isFullscreen ? "✕" : "⛶"}</span>
          <span className="leading-none">{isFullscreen ? "Exit" : "Full"}</span>
        </button>
      </div>
    </div>
  );
}
