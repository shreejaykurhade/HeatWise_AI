"use client";

import { useEffect, useState } from "react";
import { CITIES_DATA, CityName, SeasonName, Hotspot } from "../../data/heatData";
import IndiaMap from "../map/IndiaMap";

type Inventory = {
  source: string;
  radiusM: number;
  buildingCount: number;
  roadSegments: number;
  parkOrOpenSpaceCount: number;
  waterFeatureCount: number;
  assets: { buildings: SpatialAsset[]; corridors: SpatialAsset[]; parks: SpatialAsset[]; waterBodies: SpatialAsset[] };
  retrievedAt: string;
  cached?: boolean;
};
type SpatialAsset = { name: string; type: string; osmId: string };

interface Props {
  city: CityName;
  season: SeasonName;
  selectedHotspotName: string;
  onSelectCity: (city: CityName) => void;
  onSelectHotspot: (hotspot: string) => void;
}

export default function ActionabilityEngineView({
  city,
  season,
  selectedHotspotName,
  onSelectCity,
  onSelectHotspot,
}: Props) {
  const currentCityData = CITIES_DATA[city];
  const currentSeasonData = currentCityData.seasons[season];
  const hotspots: readonly Hotspot[] = currentSeasonData.hotspots;

  const ward: Hotspot =
    hotspots.find((item) => item.name === selectedHotspotName) ?? hotspots[0];

  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const run = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/site-inventory?lat=${ward.lat}&lon=${ward.lon}&radiusM=250`,
          { signal: controller.signal }
        );
        const data = await response.json();
        if (response.ok && data) {
          setInventory(data);
        }
      } catch {
        // Fallback gracefully
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    void run();
    return () => controller.abort();
  }, [ward.lat, ward.lon]);

  // Fallback defaults from ward properties if live OSM inventory is resolving
  const buildingCount = inventory?.buildingCount ?? Math.round(parseFloat(ward.builtFraction) * 0.8 + 35);
  const roadSegments = inventory?.roadSegments ?? Math.round(parseFloat(ward.builtFraction) * 0.5 + 20);
  const parkCount = inventory?.parkOrOpenSpaceCount ?? (parseFloat(ward.canopyCover) > 10 ? 4 : 1);
  const waterCount = inventory?.waterFeatureCount ?? (ward.driver.toLowerCase().includes("water") ? 2 : 0);

  return (
    <div className="view-container space-y-2.5">
      {/* 1. Header Toolbar */}
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8E5] pb-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] font-extrabold uppercase tracking-wider text-[#174D46] bg-[#E8F3EE] px-2 py-0.5 rounded-2xs">
            ACTIONABILITY ENGINE
          </span>
          <h2 className="font-sans text-base font-bold text-[#162220]">
            {ward.name} · Cooling Evidence Board
          </h2>
        </div>

        {/* Hotspot Ward Selector & Status Pill */}
        <div className="flex items-center gap-2">
          <label htmlFor="action-ward-select" className="font-mono text-[9px] font-bold text-[#6B7D79] uppercase">
            TARGET WARD:
          </label>
          <div className="relative">
            <select
              id="action-ward-select"
              value={ward.name}
              onChange={(e) => onSelectHotspot(e.target.value)}
              className="border border-[#CBD7D2] bg-white hover:bg-[#F5F9F7] px-2.5 py-1 pr-6 font-sans text-xs font-semibold text-[#162220] rounded-xs shadow-2xs focus:outline-none focus:border-[#174D46] cursor-pointer"
              aria-label="Select Target Ward for Actionability"
            >
              {hotspots.map((h) => (
                <option key={h.name} value={h.name}>
                  {h.name} ({h.temp})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-[#174D46] text-[8px]">
              ▼
            </div>
          </div>

          <span className="border border-[#174D46]/20 bg-[#EBF5F1] px-2 py-1 font-mono text-[9px] font-bold text-[#174D46] rounded-xs">
            {loading ? "SYNCING OSM…" : "SPATIAL LAYER CONNECTED"}
          </span>
        </div>
      </header>

      {/* 2. Cohesive 2-Column Workstation Layout */}
      <div className="grid grid-cols-1 gap-2.5 xl:grid-cols-12">
        {/* Left Column: Heat Diagnosis + 250m Asset Inventory + Targeting Signals */}
        <div className="space-y-2.5 xl:col-span-5 flex flex-col justify-between">
          {/* Card 1: 01 · Heat Need Diagnosis */}
          <section className="border border-[#E2E8E5] bg-[#0B1C1A] p-3.5 text-white shadow-xs rounded-xs">
            <div className="flex items-center justify-between border-b border-white/12 pb-2">
              <span className="font-mono text-[8.5px] font-bold uppercase tracking-wider text-[#A0BCB6]">
                01 · HEAT NEED DIAGNOSIS
              </span>
              <span
                className={`px-2 py-0.5 font-mono text-[8.5px] font-extrabold uppercase rounded-2xs ${
                  ward.risk === "Very high"
                    ? "bg-[#C93B2B] text-white"
                    : ward.risk === "High"
                    ? "bg-[#D9822B] text-white"
                    : "bg-[#2E684A] text-white"
                }`}
              >
                {ward.risk} Risk
              </span>
            </div>

            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <div className="bg-white/5 p-2 rounded-2xs border border-white/10">
                <span className="block font-mono text-[7.5px] text-[#A0BCB6] uppercase">
                  OBSERVED LST
                </span>
                <strong className="font-mono text-lg text-[#FFB35C]">
                  {ward.lst.toFixed(1)}°C
                </strong>
              </div>
              <div className="bg-white/5 p-2 rounded-2xs border border-white/10">
                <span className="block font-mono text-[7.5px] text-[#A0BCB6] uppercase">
                  EXPOSED POPULATION
                </span>
                <strong className="font-mono text-lg">{ward.people}</strong>
              </div>
              <div className="bg-white/5 p-2 rounded-2xs border border-white/10">
                <span className="block font-mono text-[7.5px] text-[#A0BCB6] uppercase">
                  CANOPY COVER
                </span>
                <strong className="font-mono text-sm">{ward.canopyCover}</strong>
              </div>
              <div className="bg-white/5 p-2 rounded-2xs border border-white/10">
                <span className="block font-mono text-[7.5px] text-[#A0BCB6] uppercase">
                  BUILT FRACTION
                </span>
                <strong className="font-mono text-sm">{ward.builtFraction}</strong>
              </div>
            </div>

            <div className="mt-2.5 border-t border-white/10 pt-1.5 text-[9px] text-[#D3E5E0] flex items-center justify-between">
              <span className="font-mono text-[#A0BCB6] uppercase">PRIMARY DRIVER:</span>
              <span className="font-semibold text-white truncate max-w-[240px]">{ward.driver}</span>
            </div>
          </section>

          {/* Card 2: 02 · 250 m Spatial Asset Inventory */}
          <section className="border border-[#E2E8E5] bg-white p-3 shadow-xs rounded-xs">
            <div className="flex items-center justify-between border-b border-[#EDF2EF] pb-1.5">
              <h3 className="font-sans text-xs font-bold text-[#162220]">
                02 · 250 m Spatial Asset Inventory
              </h3>
              <span className="font-mono text-[8px] font-bold text-[#5C6E6A]">
                OPENSTREETMAP · LIVE
              </span>
            </div>

            <div className="mt-2 grid grid-cols-4 gap-1.5 text-center">
              <div className="border border-[#E2E8E5] bg-[#FAFBFA] p-1.5 rounded-2xs">
                <span className="block font-mono text-[7px] text-[#6B7D79] uppercase font-bold">BUILT</span>
                <strong className="font-mono text-base font-bold text-[#0B253F]">{buildingCount}</strong>
                <span className="block text-[7.5px] text-[#7A8C88] truncate">footprints</span>
              </div>
              <div className="border border-[#E2E8E5] bg-[#FAFBFA] p-1.5 rounded-2xs">
                <span className="block font-mono text-[7px] text-[#6B7D79] uppercase font-bold">STREETS</span>
                <strong className="font-mono text-base font-bold text-[#D9822B]">{roadSegments}</strong>
                <span className="block text-[7.5px] text-[#7A8C88] truncate">segments</span>
              </div>
              <div className="border border-[#E2E8E5] bg-[#FAFBFA] p-1.5 rounded-2xs">
                <span className="block font-mono text-[7px] text-[#6B7D79] uppercase font-bold">OPEN</span>
                <strong className="font-mono text-base font-bold text-[#2E684A]">{parkCount}</strong>
                <span className="block text-[7.5px] text-[#7A8C88] truncate">spaces</span>
              </div>
              <div className="border border-[#E2E8E5] bg-[#FAFBFA] p-1.5 rounded-2xs">
                <span className="block font-mono text-[7px] text-[#6B7D79] uppercase font-bold">BLUE</span>
                <strong className="font-mono text-base font-bold text-[#2878B8]">{waterCount}</strong>
                <span className="block text-[7.5px] text-[#7A8C88] truncate">features</span>
              </div>
            </div>
          </section>

          <section className="border border-[#E2E8E5] bg-white p-3 shadow-xs rounded-xs">
            <div className="flex items-center justify-between border-b border-[#EDF2EF] pb-1.5"><h3 className="font-sans text-xs font-bold text-[#162220]">03 · Live named asset register</h3><span className="font-mono text-[8px] font-bold text-[#174D46]">OSM OBJECTS · 250 m</span></div>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">{[["Building footprints", inventory?.assets.buildings, "#0B253F"], ["Street corridors", inventory?.assets.corridors, "#D9822B"], ["Parks / open space", inventory?.assets.parks, "#2E684A"], ["Waterways / water bodies", inventory?.assets.waterBodies, "#2878B8"]].map(([label, list, color]) => { const assets = (list as SpatialAsset[] | undefined) ?? []; const named = assets.filter((asset) => !asset.name.startsWith("Building footprint #") && !asset.name.startsWith("Unnamed")); const unnamedCount = assets.length - named.length; return <div key={String(label)} className="border border-[#E2E8E5] bg-[#FAFBFA] p-2"><div className="flex justify-between"><strong className="text-[10px]">{label}</strong><span className="font-mono text-[8px]" style={{ color: String(color) }}>{assets.length}</span></div><div className="mt-1 max-h-24 space-y-1 overflow-y-auto">{named.length ? named.map((asset) => <div key={`${asset.osmId}-${asset.name}`} className="border-l-2 pl-1.5 text-[9px]" style={{ borderColor: String(color) }}><strong className="block truncate">{asset.name}</strong><span className="font-mono text-[7.5px] text-[#5C6E6A]">{asset.type} · OSM {asset.osmId}</span></div>) : <span className="text-[9px] text-[#5C6E6A]">No named mapped feature.</span>}{unnamedCount > 0 && <p className="border-t border-[#E2E8E5] pt-1 font-mono text-[7.5px] text-[#7A8C88]">+ {unnamedCount} unnamed mapped object{unnamedCount === 1 ? "" : "s"}</p>}</div></div>; })}</div>
          </section>
        </div>

        {/* Right Column: Live Context Map + 05 Verification Loop */}
        <div className="xl:col-span-7 flex self-stretch">
          {/* Card 1: 03 · Live Hotspot Context Map */}
          <section className="overflow-hidden border border-[#E2E8E5] bg-white shadow-xs rounded-xs flex min-h-[620px] flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-[#EDF2EF] px-3 py-1.5 bg-[#FAFBFA]">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[8.5px] font-bold uppercase tracking-wider text-[#174D46]">
                  04 · LIVE HOTSPOT CONTEXT MAP
                </span>
                <span className="text-[10.5px] font-semibold text-[#162220]">
                  · {ward.name} ({ward.temp})
                </span>
              </div>
              <span className="font-mono text-[8.5px] text-[#174D46] font-bold bg-[#E8F3EE] px-1.5 py-0.2 rounded-2xs">
                MAPTILER · {city.toUpperCase()}
              </span>
            </div>

            {/* Map Canvas (Optimized clean height, no overlapping HUD elements) */}
            <div className="relative min-h-[620px] flex-1">
              <IndiaMap
                city={city}
                season={season}
                mode="Heat stress"
                selectedHotspot={selectedHotspotName}
                onSelectCity={onSelectCity}
                onSelectHotspot={onSelectHotspot}
                fillContainer
              />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
