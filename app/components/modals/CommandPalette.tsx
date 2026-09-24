"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { CityName, CITIES_DATA, SeasonName } from "../../data/heatData";
import { ViewName } from "../layout/NavRail";

interface CommandPaletteProps {
  isOpen: boolean;
  season: SeasonName;
  onClose: () => void;
  onSelectCity: (city: CityName) => void;
  onSelectView: (view: ViewName) => void;
  onSelectHotspot: (name: string) => void;
}

export default function CommandPalette({
  isOpen,
  season,
  onClose,
  onSelectCity,
  onSelectView,
  onSelectHotspot,
}: CommandPaletteProps) {
  const [query, setCmdQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setSelectedIndex(0);
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [isOpen]);

  const items = useMemo(() => {
    const q = query.toLowerCase().trim();
    const cityList = Object.keys(CITIES_DATA) as CityName[];

    const results: {
      type: "view" | "city" | "hotspot";
      label: string;
      sub: string;
      action: () => void;
    }[] = [];

    // Views
    const views: ViewName[] = [
      "Overview",
      "Heat Explorer",
      "Driver Analysis",
      "Actionability Engine",
      "Scenario Lab",
      "Reports",
    ];

    views.forEach((v) => {
      if (!q || v.toLowerCase().includes(q)) {
        results.push({
          type: "view",
          label: `Go to ${v}`,
          sub: "Navigation View",
          action: () => {
            onSelectView(v);
            onClose();
          },
        });
      }
    });

    // Cities
    cityList.forEach((c) => {
      const state = CITIES_DATA[c].state;
      if (!q || c.toLowerCase().includes(q) || state.toLowerCase().includes(q)) {
        results.push({
          type: "city",
          label: c,
          sub: `Station · ${state} (${CITIES_DATA[c].climateZone})`,
          action: () => {
            onSelectCity(c);
            onClose();
          },
        });
      }
    });

    // Hotspots across active city
    cityList.forEach((c) => {
      CITIES_DATA[c].seasons[season].hotspots.forEach((h) => {
        if (!q || h.name.toLowerCase().includes(q)) {
          results.push({
            type: "hotspot",
            label: h.name,
            sub: `Hotspot Ward in ${c} · ${season} · ${h.temp}`,
            action: () => {
              onSelectCity(c);
              onSelectHotspot(h.name);
              onClose();
            },
          });
        }
      });
    });

    return results.slice(0, 12);
  }, [query, season, onSelectCity, onSelectView, onSelectHotspot, onClose]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, items.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + items.length) % Math.max(1, items.length));
    } else if (e.key === "Enter" && items[selectedIndex]) {
      e.preventDefault();
      items[selectedIndex].action();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4"
      aria-modal="true"
      role="dialog"
      aria-label="Command Search"
    >
      {/* Clickable Backdrop */}
      <button
        type="button"
        className="fixed inset-0 w-full h-full bg-transparent border-0 cursor-default"
        onClick={onClose}
        aria-label="Close command palette overlay"
        tabIndex={-1}
      />

      {/* Modal Dialog Content */}
      <div
        className="relative z-10 w-full max-w-xl bg-white border border-[#D9DFDB] shadow-2xl overflow-hidden rounded-xs animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search Input */}
        <div className="flex items-center px-3.5 py-3 border-b border-[#D9DFDB] gap-2 bg-[#FAFBFA]">
          <span className="text-sm">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a city, ward, state, or view to jump..."
            value={query}
            onChange={(e) => {
              setCmdQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            className="w-full bg-transparent font-mono text-sm text-[#1D2A2A] placeholder-[#5E6D6B] outline-none"
            aria-label="Search command options"
          />
          <button
            type="button"
            onClick={onClose}
            className="bg-[#E8EDE9] px-1.5 py-0.5 rounded text-[9px] font-mono text-[#5E6D6B] cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[340px] overflow-y-auto p-1.5 space-y-1">
          {items.length === 0 ? (
            <div className="p-4 text-center font-mono text-xs text-[#5E6D6B]">
              No stations or views matching &quot;{query}&quot;
            </div>
          ) : (
            items.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full p-2 text-left flex items-center justify-between transition-colors cursor-pointer rounded-xs ${
                    isSelected
                      ? "bg-[#0B253F] text-white"
                      : "text-[#1D2A2A] hover:bg-[#F0F5F2]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs">
                      {item.type === "view"
                        ? "📊"
                        : item.type === "city"
                        ? "📍"
                        : "🔥"}
                    </span>
                    <span className="font-sans text-xs font-semibold">
                      {item.label}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-[9px] ${
                      isSelected ? "text-[#FFD54F]" : "text-[#5E6D6B]"
                    }`}
                  >
                    {item.sub}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-2 px-3 border-t border-[#D9DFDB] bg-[#FAFBFA] flex justify-between font-mono text-[9px] text-[#5E6D6B]">
          <span>Use ↑ ↓ to navigate</span>
          <span>Press Enter to select</span>
        </div>
      </div>
    </div>
  );
}
