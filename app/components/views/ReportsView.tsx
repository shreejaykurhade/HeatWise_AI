"use client";

import { useState, useEffect } from "react";
import { Hotspot, CityName, SeasonName, CITIES_DATA } from "../../data/heatData";
import {
  type ReportLanguage,
  LANGUAGES,
  getTranslations,
  getDefaultLanguage,
  getAvailableLanguages,
} from "../../../lib/report-translations";

interface ReportsViewProps {
  city: CityName;
  season: SeasonName;
  selectedHotspotName: string;
}

type SpatialAsset = { name: string; type: string; osmId: string };
type ActionabilityInventory = {
  source: "OpenStreetMap";
  radiusM: number;
  buildingCount: number;
  roadSegments: number;
  parkOrOpenSpaceCount: number;
  waterFeatureCount: number;
  assets: {
    buildings: SpatialAsset[];
    corridors: SpatialAsset[];
    parks: SpatialAsset[];
    waterBodies: SpatialAsset[];
  };
  geospatialContext?: { contextSummary: string; ecoConstraintWarning?: string };
  retrievedAt: string;
};

export default function ReportsView({ city, season, selectedHotspotName }: ReportsViewProps) {
  const currentCityData = CITIES_DATA[city];
  const currentSeasonData = currentCityData.seasons[season];
  const hotspots: readonly Hotspot[] = currentSeasonData.hotspots;
  const primaryHotspot = hotspots.find((hotspot) => hotspot.name === selectedHotspotName) ?? hotspots[0];

  // Default to state's mother tongue
  const defaultStateLang = getDefaultLanguage(currentCityData.state);
  const [selectedLang, setSelectedLang] = useState<ReportLanguage>(defaultStateLang);
  const [delivery, setDelivery] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [inventory, setInventory] = useState<ActionabilityInventory | null>(null);
  const [inventoryError, setInventoryError] = useState("");

  // Update language when city/state changes if user hasn't explicitly customized or wants default
  useEffect(() => {
    setSelectedLang(getDefaultLanguage(currentCityData.state));
  }, [city, currentCityData.state]);

  useEffect(() => {
    if (!primaryHotspot) return;
    const controller = new AbortController();
    setInventory(null);
    setInventoryError("");
    fetch(`/api/site-inventory?lat=${primaryHotspot.lat}&lon=${primaryHotspot.lon}&radiusM=250`, { signal: controller.signal })
      .then(async (response) => {
        const data = await response.json() as ActionabilityInventory & { error?: string };
        if (!response.ok) throw new Error(data.error || "Live asset inventory is unavailable.");
        setInventory(data);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setInventoryError(error instanceof Error ? error.message : "Live asset inventory is unavailable.");
      });
    return () => controller.abort();
  }, [primaryHotspot]);

  const availableLanguages = getAvailableLanguages();
  const currentLangMeta = LANGUAGES[selectedLang] || LANGUAGES.en;
  const stateMotherTongueMeta = LANGUAGES[defaultStateLang] || LANGUAGES.en;
  const t = getTranslations(selectedLang);

  const pdfHref = primaryHotspot
    ? `/api/reports/pdf?city=${encodeURIComponent(city)}&season=${encodeURIComponent(season)}&area=${encodeURIComponent(primaryHotspot.name)}&lang=${selectedLang}`
    : "#";

  const emailReport = async () => {
    if (!primaryHotspot) return;
    setDelivery("sending");
    setDeliveryMessage("");
    const pdfUrl = new URL("/api/reports/pdf", window.location.origin);
    pdfUrl.searchParams.set("city", city);
    pdfUrl.searchParams.set("season", season);
    pdfUrl.searchParams.set("area", primaryHotspot.name);
    pdfUrl.searchParams.set("lang", selectedLang);
    try {
      const response = await fetch("/api/reports/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          area_name: primaryHotspot.name,
          city,
          state: currentCityData.state,
          language: selectedLang,
          severity_label: primaryHotspot.risk,
          severity_score: Number((primaryHotspot.score / 10).toFixed(2)),
          lst_surface_temp: primaryHotspot.lst,
          city_mean_temp: currentSeasonData.meanLst,
          uhi_anomaly: primaryHotspot.uhi,
          wbgt_stress: primaryHotspot.wbgt,
          population_exposed: primaryHotspot.peopleNum,
          canopy_cover_pct: Number.parseFloat(primaryHotspot.canopyCover),
          impervious_cover_pct: Number.parseFloat(primaryHotspot.builtFraction),
          primary_drivers: primaryHotspot.driverBreakdown.slice(0, 3).map((driver) => ({
            factor: driver.name,
            impact_celsius: driver.val,
          })),
          recommended_action: "Deploy urban greening, reflective cool-roof coatings, and shaded mobility corridors in the identified high-exposure zone.",
          cooling_potential: currentSeasonData.coolingOpportunity,
          department_name: `${currentCityData.state} Urban Climate Resilience Authority`,
          pdf_url: pdfUrl.toString(),
        }),
      });
      const result = await response.json() as { delivered?: boolean; error?: string; subject?: string };
      if (!response.ok || !result.delivered) throw new Error(result.error || "Report delivery failed.");
      setDelivery("sent");
      setDeliveryMessage(result.subject || `PDF report in ${currentLangMeta.name} emailed successfully.`);
    } catch (error) {
      setDelivery("error");
      setDeliveryMessage(error instanceof Error ? error.message : "Report delivery failed.");
    }
  };

  return (
    <div className="view-container reports-layout space-y-4">
      {/* Header & Print Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8E5] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#174D46] font-bold">
              MUNICIPAL CLIMATE RESILIENCE PLANNING BRIEF
            </span>
            <span className="bg-[#EBF3F5] text-[#174D46] border border-[#CFE1DE] px-1.5 py-0.2 font-mono text-[8px] font-bold rounded-2xs">
              ISRO Telemetry v2.0
            </span>
          </div>
          <h2 className="font-sans text-base sm:text-lg font-bold text-[#162220] mt-0.5">
            Heat Mitigation Assessment Report · {primaryHotspot?.name ?? city}, {currentCityData.state}
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <a
            href={pdfHref}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary-tech text-xs px-3 py-1.5 flex items-center gap-1.5 cursor-pointer shadow-2xs rounded-xs font-semibold"
            title={`Open live PDF in ${currentLangMeta.nativeName} (${currentLangMeta.name})`}
          >
            <span>↗</span><span>Open PDF ({currentLangMeta.nativeName})</span>
          </a>
          <button
            onClick={emailReport}
            disabled={delivery === "sending" || !primaryHotspot}
            className="btn-primary-tech text-xs px-3 py-1.5 flex items-center gap-1.5 cursor-pointer disabled:opacity-60 shadow-2xs rounded-xs font-semibold"
            title="Generate the PDF and send it through the authorized n8n email workflow"
          >
            <span>✉️</span>
            <span>{delivery === "sending" ? "Sending through n8n…" : delivery === "sent" ? "Report sent ✓" : delivery === "error" ? "Retry n8n email" : "Email PDF"}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="btn-secondary-tech text-xs px-3 py-1.5 flex items-center gap-1.5 cursor-pointer shadow-2xs rounded-xs"
            title="Print official technical report"
          >
            <span>🖨️</span><span>Print Document</span>
          </button>
          {deliveryMessage && <p role="status" className={`w-full text-right font-mono text-[9px] ${delivery === "error" ? "text-[#C93B2B]" : "text-[#2E684A]"}`}>{deliveryMessage}</p>}
        </div>
      </div>

      {/* State-Wise Preferred Mother Tongue & Language Selection Bar */}
      <div className="border border-[#CFE1DE] bg-[#F4F9F8] p-3.5 rounded-xs shadow-2xs space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">🌐</span>
            <div>
              <span className="font-sans text-xs font-bold text-[#0B253F]">
                Preferred Report Language (State Mother Tongue)
              </span>
              <p className="font-sans text-[11px] text-[#4A5D59]">
                Generate government-grade reports translated with 100% precision into regional official languages with Noto Sans Unicode typography.
              </p>
            </div>
          </div>
          {/* State recommendation tag */}
          <div className="flex items-center gap-1.5 bg-white border border-[#B8D5D0] px-2.5 py-1 rounded-2xs text-[11px]">
            <span className="text-[#174D46] font-semibold">
              🏛️ {currentCityData.state} Mother Tongue:
            </span>
            <button
              onClick={() => setSelectedLang(defaultStateLang)}
              className="font-bold text-[#0B253F] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>{stateMotherTongueMeta.nativeName} ({stateMotherTongueMeta.name})</span>
              {selectedLang === defaultStateLang && (
                <span className="bg-[#174D46] text-white text-[9px] px-1 py-0.2 rounded-3xs font-mono">ACTIVE</span>
              )}
            </button>
          </div>
        </div>

        {/* Language Selection Buttons Grid */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {availableLanguages.map((lang) => {
            const isSelected = selectedLang === lang.code;
            const isDefault = defaultStateLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className={`px-3 py-1.5 text-xs rounded-xs border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#0B253F] text-white border-[#0B253F] font-bold shadow-xs scale-[1.02]"
                    : "bg-white text-[#162220] border-[#D1DCD8] hover:border-[#174D46] hover:bg-[#F9FCFB]"
                }`}
                title={`Generate report in ${lang.name}`}
              >
                <span className="text-[13px]">{lang.nativeName}</span>
                <span className={`text-[10px] ${isSelected ? "text-[#B8D5D0]" : "text-[#6B7D79]"}`}>
                  ({lang.name})
                </span>
                {isDefault && (
                  <span
                    className={`text-[8.5px] px-1 py-0.2 rounded-3xs font-mono font-bold ${
                      isSelected ? "bg-[#174D46] text-white" : "bg-[#E2EFEA] text-[#174D46]"
                    }`}
                  >
                    ★ State
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Printable Report Document Card (Live Multi-Language Preview) */}
      <div className="border border-[#E2E8E5] bg-white p-6 shadow-xs rounded-xs space-y-6 max-w-4xl mx-auto">
        {/* Institutional Letterhead Header with ISRO Branding */}
        <div className="border-b border-[#0B253F] pb-4 flex justify-between items-start gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-white border border-[#D5DFDC] p-1 rounded-xs shadow-2xs flex-shrink-0">
              <img
                src="/isro.png"
                alt="ISRO Official Logo"
                className="h-10 w-auto object-contain"
                width={42}
                height={40}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#5C6E6A]">
                  INDIAN SPACE RESEARCH ORGANISATION (ISRO) · HEATWISE AI
                </span>
                <span className="bg-[#EBF3F5] text-[#0B253F] border border-[#CFE1DE] px-1.5 py-0.2 font-mono text-[8px] font-bold rounded-2xs">
                  {currentLangMeta.nativeName}
                </span>
              </div>
              <h1 className="font-sans text-lg sm:text-xl font-bold text-[#0B253F] mt-0.5">
                {t.reportTitle}
              </h1>
              <p className="font-mono text-xs text-[#5C6E6A] mt-0.5">
                {t.cityLabel} {city} ({currentCityData.climateZone}) · {t.seasonLabel} {season} 2026 · {t.stateLabel} {currentCityData.state}
              </p>
            </div>
          </div>
          <div className="text-right font-mono text-[9.5px] text-[#5C6E6A] flex-shrink-0">
            <div>{t.reportIdLabel} HW-2026-{city.substring(0, 3).toUpperCase()}</div>
            <div>{t.generatedLabel} {new Date().toLocaleDateString("en-IN")}</div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-1.5">
          <h3 className="font-sans text-xs sm:text-sm font-bold text-[#0B253F] uppercase tracking-wider border-b border-[#EDF2EF] pb-1">
            1. {t.sec1_executiveSummary}
          </h3>
          <div className="bg-[#FFFDFB] border-l-3 border-[#C93B2B] p-3 rounded-xs space-y-1 text-xs text-[#162220] leading-relaxed">
            <div className="font-bold text-[#C93B2B] text-[11px] tracking-wide uppercase">
              {t.execTitle}
            </div>
            <p>
              During the <strong>{season}</strong> meteorological window, {city} experienced peak Land Surface Temperatures (LST) reaching <strong>{currentSeasonData.peakLst}°C</strong> with a mean urban heat anomaly of <strong>+{currentSeasonData.uhiMean}°C</strong> across municipal sectors. High impervious built surface fractions (80–92%) and low canopy cover (4–9%) in industrial and dense residential sectors contribute significantly to localized thermal stress.
            </p>
            <p className="text-[10px] text-[#8C2B20] font-medium pt-0.5">
              {t.execStatus}
            </p>
          </div>
        </div>

        {/* Section 2: Priority Hotspot Inventory */}
        <div className="space-y-1.5">
          <h3 className="font-sans text-xs sm:text-sm font-bold text-[#0B253F] uppercase tracking-wider border-b border-[#EDF2EF] pb-1">
            2. {t.sec2_locationProfile} & {t.sec3_thermalConditions}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left" aria-label="Priority hotspot inventory">
              <thead>
                <tr className="border-b border-[#EDF2EF] text-[#5C6E6A] text-[9px]">
                  <th className="py-2">{t.hotspotLabel.replace(":", "")}</th>
                  <th className="py-2">{t.wardBaseline} (LST)</th>
                  <th className="py-2">{t.hotspotAnomaly}</th>
                  <th className="py-2">{t.populationExposed}</th>
                  <th className="py-2">{t.greenInfra}</th>
                  <th className="py-2 text-right">{t.riskLevel}</th>
                </tr>
              </thead>
              <tbody>
                {hotspots.map((h) => (
                  <tr key={h.name} className="border-b border-[#EDF2EF]">
                    <td className="py-2 font-sans font-medium text-[#162220]">
                      {h.name}
                    </td>
                    <td className="py-2 font-bold text-[#C93B2B]">{h.temp}</td>
                    <td className="py-2 font-bold text-[#D96527]">+{h.uhi}°C</td>
                    <td className="py-2">{h.people}</td>
                    <td className="py-2">{h.canopyCover}</td>
                    <td className="py-2 text-right font-bold text-[#C93B2B]">
                      {h.risk}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Recommended Municipal Investment */}
        <div className="space-y-1.5">
          <h3 className="font-sans text-xs sm:text-sm font-bold text-[#0B253F] uppercase tracking-wider border-b border-[#EDF2EF] pb-1">
            3. {t.sec7_coolingOptions} & {t.sec13_actionPlan}
          </h3>
          <ul className="list-disc list-inside text-xs font-sans text-[#162220] space-y-1.5 leading-relaxed">
            <li>
              <strong>Mandate Cool Roof Coatings:</strong> Apply high-albedo (SRI ≥ 82) elastomeric coatings on municipal, commercial, and tin-roof residential clusters.
            </li>
            <li>
              <strong>Expand Urban Tree Canopy:</strong> Establish micro-corridors using native drought-tolerant species (Neem, Peepal, Pongamia) in high-vulnerability wards.
            </li>
            <li>
              <strong>Permeable Pavement Transition:</strong> Replace non-porous asphalt with interlocking permeable concrete blocks in pedestrian corridors.
            </li>
          </ul>
        </div>

        {/* Section 4: Contributing Drivers */}
        <div className="space-y-1.5">
          <h3 className="font-sans text-xs sm:text-sm font-bold text-[#0B253F] uppercase tracking-wider border-b border-[#EDF2EF] pb-1">
            4. Why {primaryHotspot?.name ?? "this location"} is hot · {t.sec5_driverAnalysis}
          </h3>
          <p className="text-[10px] text-[#5C6E6A]">
            Modelled local physical contributions. Red adds heat; green offsets heat. These are not raw model feature labels.
          </p>
          <div className="grid gap-2 sm:grid-cols-5">
            {primaryHotspot?.driverBreakdown.slice(0, 5).map((driver) => (
              <div key={driver.name} className="border border-[#E2E8E5] bg-[#FAFBFA] p-3 rounded-xs">
                <div className="font-mono text-[9px] uppercase tracking-wider text-[#5C6E6A]">
                  {t.modelledDriver}
                </div>
                <div className="mt-1 font-sans text-xs font-semibold text-[#162220]">
                  {driver.name}
                </div>
                <div className={`mt-1 font-mono text-[11px] font-bold ${driver.val >= 0 ? "text-[#C93B2B]" : "text-[#2E684A]"}`}>
                  {driver.val >= 0 ? "+" : ""}{driver.val.toFixed(1)}°C
                </div>
                <div className="mt-0.5 font-mono text-[8px] text-[#5C6E6A]">
                  {driver.val >= 0 ? "heating contribution" : "cooling contribution"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Location-specific Actionability evidence */}
        <div className="space-y-2">
          <h3 className="font-sans text-xs sm:text-sm font-bold text-[#0B253F] uppercase tracking-wider border-b border-[#EDF2EF] pb-1">
            5. Location Actionability Evidence · {primaryHotspot?.name ?? city}
          </h3>
          <p className="text-[10px] text-[#5C6E6A]">
            Live OpenStreetMap inventory within 250 m of the selected hotspot. It identifies mapped assets for survey and planning; it does not prove ownership, condition, or sanction feasibility.
          </p>
          {inventory ? (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  ["Built footprints", inventory.buildingCount],
                  ["Street corridors", inventory.roadSegments],
                  ["Open / green spaces", inventory.parkOrOpenSpaceCount],
                  ["Water features", inventory.waterFeatureCount],
                ].map(([label, count]) => (
                  <div key={String(label)} className="border border-[#CFE1DE] bg-[#F7FBF9] p-2 rounded-xs">
                    <div className="font-mono text-[8px] uppercase text-[#5C6E6A]">{label}</div>
                    <div className="font-mono text-base font-bold text-[#174D46]">{count}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-2 sm:grid-cols-2 text-[10px]">
                {([
                  ["Mapped corridors", inventory.assets.corridors],
                  ["Mapped parks / open space", inventory.assets.parks],
                  ["Mapped water features", inventory.assets.waterBodies],
                  ["Mapped built assets", inventory.assets.buildings],
                ] as [string, SpatialAsset[]][]).map(([label, assets]) => {
                  const named = (assets as SpatialAsset[]).filter((asset) => !asset.name.startsWith("Unnamed") && !asset.name.startsWith("Building footprint")).slice(0, 4);
                  return (
                    <div key={String(label)} className="border border-[#E2E8E5] bg-[#FAFBFA] p-2 rounded-xs">
                      <div className="font-mono text-[8px] uppercase tracking-wide text-[#174D46]">{String(label)}</div>
                      <div className="mt-1 text-[#162220] leading-relaxed">
                        {named.length ? named.map((asset) => asset.name).join(" · ") : "No named mapped assets returned in this category."}
                      </div>
                    </div>
                  );
                })}
              </div>
              {inventory.geospatialContext?.ecoConstraintWarning && (
                <p className="border-l-2 border-[#D96527] bg-[#FFF9F2] px-2 py-1 text-[10px] text-[#8C4A14]">{inventory.geospatialContext.ecoConstraintWarning}</p>
              )}
            </div>
          ) : (
            <div className="border border-[#E2E8E5] bg-[#FAFBFA] p-3 text-[10px] text-[#5C6E6A]">
              {inventoryError || "Loading live OpenStreetMap asset evidence for this location…"}
            </div>
          )}
        </div>

        {/* Section 5: Data Sources & Satellite Observational Provenance */}
        <div className="border-t border-[#EDF2EF] pt-3 text-[9px] font-mono text-[#5C6E6A] flex justify-between items-center">
          <span>{t.sec15_dataSources}: Landsat 8/9 TIRS · NASA ECOSTRESS · Copernicus Sentinel-2 · IMD / ERA5 · CPCB</span>
          <span>HeatWise AI [{currentLangMeta.nativeName}]</span>
        </div>
      </div>
    </div>
  );
}
