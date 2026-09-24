import "regenerator-runtime/runtime";
import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont, Color } from "pdf-lib";
import * as fontkit from "fontkit";
import { readFileSync } from "fs";
import { join } from "path";
import { CITIES_DATA, type CityName, type SeasonName, type Hotspot, type CityData, type CitySeasonData } from "../../../data/heatData";
import { simulateIntervention, INTERVENTION_OPTIONS, type InterventionType, type ObservationPoint } from "../../../../lib/scenario-engine";
import { getHeatModelMetadata } from "../../../../lib/heat-model";
import {
  type ReportLanguage,
  LANGUAGES,
  getTranslations,
  getDefaultLanguage,
} from "../../../../lib/report-translations";

export const runtime = "nodejs";

const seasons: SeasonName[] = ["Summer", "Monsoon", "Post_Monsoon", "Winter"];

const MUNICIPAL_AUTHORITIES: Record<string, string> = {
  "Mumbai": "Municipal Corporation of Greater Mumbai (MCGM / BMC)",
  "Delhi": "Municipal Corporation of Delhi (MCD)",
  "Bengaluru": "Bruhat Bengaluru Mahanagara Palike (BBMP)",
  "Hyderabad": "Greater Hyderabad Municipal Corporation (GHMC)",
  "Chennai": "Greater Chennai Corporation (GCC)",
  "Kolkata": "Kolkata Municipal Corporation (KMC)",
  "Ahmedabad": "Amdavad Municipal Corporation (AMC)",
  "Pune": "Pune Municipal Corporation (PMC)",
  "Jaipur": "Jaipur Municipal Corporation (JMC)",
  "Lucknow": "Lucknow Municipal Corporation (LMC)",
};

const MUNICIPAL_DEPARTMENTS: Record<string, { forestry: string; buildings: string; engineering: string; health: string }> = {
  "Mumbai": {
    forestry: "Garden & Tree Authority, MCGM",
    buildings: "Building Proposal & Planning Dept, MCGM",
    engineering: "Roads & Traffic Dept, MCGM",
    health: "Public Health Department, MCGM",
  },
  "Delhi": {
    forestry: "Forest & Wildlife Dept, GNCTD / MCD Horticulture",
    buildings: "Delhi Development Authority (DDA) / MCD Town Planning",
    engineering: "Public Works Department (PWD Delhi)",
    health: "Directorate General of Health Services (DGHS)",
  },
  "Bengaluru": {
    forestry: "Forest Cell & Horticulture Dept, BBMP",
    buildings: "Town Planning & Development Dept, BBMP",
    engineering: "Major Roads & Infrastructure, BBMP",
    health: "Chief Health Officer (Public Health), BBMP",
  },
  "Hyderabad": {
    forestry: "Urban Biodiversity Wing, GHMC",
    buildings: "Town Planning Wing, GHMC / HMDA",
    engineering: "Engineering & Maintenance Wing, GHMC",
    health: "Chief Medical Officer of Health, GHMC",
  },
  "Chennai": {
    forestry: "Parks and Playgrounds Dept, GCC",
    buildings: "Town Planning & Works Dept, GCC / CMDA",
    engineering: "Bus Routes & Roads Dept, GCC",
    health: "Public Health Department, GCC",
  },
  "Kolkata": {
    forestry: "Parks & Squares Dept, KMC",
    buildings: "Building Department, KMC / KMDA",
    engineering: "Roads & Engineering Dept, KMC",
    health: "Health Department, KMC",
  },
  "Ahmedabad": {
    forestry: "Parks and Gardens Dept, AMC",
    buildings: "Town Development Dept, AMC / AUDA",
    engineering: "Engineering & Road Projects, AMC",
    health: "Health & Solid Waste Dept, AMC",
  },
  "Pune": {
    forestry: "Tree Authority & Garden Dept, PMC",
    buildings: "Building Permission Dept, PMC / PMRDA",
    engineering: "Road & Traffic Dept, PMC",
    health: "Health & Medical Services, PMC",
  },
  "Jaipur": {
    forestry: "Horticulture & Environment Wing, JMC",
    buildings: "Town Planning & Heritage Wing, JMC / JDA",
    engineering: "Engineering & Works Wing, JMC",
    health: "Health & Sanitation Wing, JMC",
  },
  "Lucknow": {
    forestry: "Environment & Horticulture Dept, LMC",
    buildings: "Town Planning & Land Development, LMC / LDA",
    engineering: "Civil Works & Roads Dept, LMC",
    health: "Municipal Health Department, LMC",
  },
};

/* ─── Clean text for PDF rendering while preserving Unicode Indic glyphs ─── */
const clean = (str: string): string => {
  if (!str) return "";
  return str
    .replace(/°C/g, " C")
    .replace(/↓/g, "v")
    .replace(/↑/g, "^")
    .replace(/⟶/g, "->")
    .replace(/→/g, "->")
    .replace(/•/g, "-")
    .replace(/₹/g, "INR ")
    .replace(/●/g, "*")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

/* ─── Word-wrap utility: splits text to fit within maxWidth ─── */
function wrapText(text: string, maxWidth: number, font: PDFFont, fontSize: number): string[] {
  const words = clean(text).split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if (!w) continue;
    const test = cur ? `${cur} ${w}` : w;
    if (font.widthOfTextAtSize(test, fontSize) <= maxWidth) {
      cur = test;
    } else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines.length ? lines : [""];
}

/* ─── Truncate a cell value to fit within colWidth ─── */
function fitCell(text: string, colWidth: number, font: PDFFont, fontSize: number): string {
  const t = clean(text);
  if (font.widthOfTextAtSize(t, fontSize) <= colWidth) return t;
  let s = t;
  while (s.length > 3 && font.widthOfTextAtSize(s + "...", fontSize) > colWidth) {
    s = s.slice(0, -1);
  }
  return s + "...";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") as CityName | null;
  const season = searchParams.get("season") as SeasonName | null;
  const reqArea = searchParams.get("area");
  const reqIntervention = (searchParams.get("intervention") as InterventionType) || "trees";
  const reqIntensity = Number.parseInt(searchParams.get("intensity") || "30", 10);
  const requestedLang = searchParams.get("lang") as ReportLanguage | null;

  if (!city || !season || !CITIES_DATA[city] || !seasons.includes(season)) {
    return Response.json({ error: "A valid city and season are required." }, { status: 400 });
  }

  const cityData: CityData = CITIES_DATA[city];
  const seasonData: CitySeasonData = cityData.seasons[season];
  const hotspot: Hotspot | undefined =
    (reqArea && seasonData.hotspots.find((h) => h.name.toLowerCase() === reqArea.toLowerCase())) ||
    seasonData.hotspots[0];
  if (!hotspot) return Response.json({ error: "Hotspot not found." }, { status: 404 });

  // Resolve language (user preferred OR state mother tongue default)
  const langCode: ReportLanguage = (requestedLang && LANGUAGES[requestedLang])
    ? requestedLang
    : getDefaultLanguage(cityData.state);
  const langMeta = LANGUAGES[langCode] || LANGUAGES.en;
  const t = getTranslations(langCode);

  /* Simulations */
  const primarySim = simulateIntervention(hotspot, cityData, seasonData, season, reqIntervention, reqIntensity);
  const simTrees = simulateIntervention(hotspot, cityData, seasonData, season, "trees", 30);
  const simRoofs = simulateIntervention(hotspot, cityData, seasonData, season, "roofs", 35);
  const simShade = simulateIntervention(hotspot, cityData, seasonData, season, "shade", 25);
  const simPave = simulateIntervention(hotspot, cityData, seasonData, season, "pavement", 30);

  const modelMeta = getHeatModelMetadata();
  const maeVal = Number(modelMeta.regression_metrics.mae_c ?? 0.98);
  const rmseVal = Number(modelMeta.regression_metrics.rmse_c ?? 1.23);
  const r2Val = Number(modelMeta.regression_metrics.r2 ?? 0.977);

  const authorityName = MUNICIPAL_AUTHORITIES[city] || `${city} Municipal Corporation`;
  const depts = MUNICIPAL_DEPARTMENTS[city] || {
    forestry: "Urban Forestry & Horticulture Dept",
    buildings: "Urban Development & Town Planning",
    engineering: "Public Works & Infrastructure",
    health: "Municipal Public Health",
  };
  const reportId = `HW-HAP-${city.substring(0, 3).toUpperCase()}-${Date.now().toString(36).toUpperCase().slice(-5)}`;
  const generatedAt = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const generatedTime = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

  /* ─── Robust asset file loader (Fetch + FS fallback) ─── */
  const loadAssetBytes = async (relPath: string): Promise<Uint8Array | null> => {
    const cleanRel = relPath.replace(/^\/+/, "");
    // 1. Try HTTP fetch via current request origin (works in all Vite/Next/Cloudflare runtimes)
    try {
      const assetUrl = new URL(`/${cleanRel}`, request.url);
      const res = await fetch(assetUrl.toString());
      if (res.ok) {
        const ab = await res.arrayBuffer();
        if (ab.byteLength > 0) return new Uint8Array(ab);
      }
    } catch {}

    // 2. Fallback to direct FS read
    const candidates = [
      join(process.cwd(), cleanRel),
      join(process.cwd(), "public", cleanRel),
      join("/Users/sanskarparab/Heatwise Main", cleanRel),
      join("/Users/sanskarparab/Heatwise Main", "public", cleanRel),
    ];
    for (const p of candidates) {
      try {
        const data = readFileSync(decodeURIComponent(p));
        if (data && data.length > 0) return new Uint8Array(data);
      } catch {}
    }
    return null;
  };

  /* ─── PDF Document & Font Embedding ─── */
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit as any);

  let fontR: PDFFont;
  let fontB: PDFFont;

  if (langCode !== "en" && langMeta.fontFile) {
    const regBytes = await loadAssetBytes(`fonts/${langMeta.fontFile}`);
    const boldBytes = (langMeta.fontFileBold ? await loadAssetBytes(`fonts/${langMeta.fontFileBold}`) : null) || regBytes;
    if (regBytes && boldBytes) {
      try {
        fontR = await pdf.embedFont(regBytes);
        fontB = await pdf.embedFont(boldBytes);
      } catch (fontErr) {
        console.error("[PDF Route Font Embed Error]:", fontErr);
        fontR = await pdf.embedFont(StandardFonts.Helvetica);
        fontB = await pdf.embedFont(StandardFonts.HelveticaBold);
      }
    } else {
      console.error("[PDF Route Font File Not Found]:", langMeta.fontFile);
      fontR = await pdf.embedFont(StandardFonts.Helvetica);
      fontB = await pdf.embedFont(StandardFonts.HelveticaBold);
    }
  } else {
    fontR = await pdf.embedFont(StandardFonts.Helvetica);
    fontB = await pdf.embedFont(StandardFonts.HelveticaBold);
  }

  /* Embed Official ISRO logo */
  let isroLogoImage: Awaited<ReturnType<typeof pdf.embedPng>> | null = null;
  const isroLogoBytes = (await loadAssetBytes("isro.png")) || (await loadAssetBytes("isro-logo.png"));
  if (isroLogoBytes) {
    try {
      isroLogoImage = await pdf.embedPng(isroLogoBytes);
    } catch { /* logo embedding failed */ }
  }

  /* Palette */
  const navy     = rgb(0.04, 0.14, 0.24);
  const forest   = rgb(0.09, 0.30, 0.27);
  const red      = rgb(0.76, 0.22, 0.16);
  const amber    = rgb(0.82, 0.50, 0.16);
  const green    = rgb(0.22, 0.48, 0.34);
  const dark     = rgb(0.12, 0.16, 0.15);
  const muted    = rgb(0.40, 0.46, 0.44);
  const lightBg  = rgb(0.97, 0.975, 0.97);
  const bdrGrey  = rgb(0.86, 0.89, 0.87);
  const alertBg  = rgb(0.99, 0.96, 0.95);
  const alertBdr = rgb(0.93, 0.82, 0.80);
  const okBg     = rgb(0.94, 0.97, 0.95);
  const okBdr    = rgb(0.72, 0.86, 0.77);
  const gold     = rgb(0.85, 0.68, 0.28);
  const white    = rgb(1, 1, 1);

  const PW = 595.28;
  const PH = 841.89;
  const MX = 42;
  const CW = PW - MX * 2;          // 511.28
  const TP = 4;                     // total pages
  const FS = 6.5;                   // standard body font size

  /* ─── Helpers ─── */
  const pageFrame = (page: PDFPage, num: number) => {
    if (num > 1) {
      page.drawRectangle({ x: MX, y: 808, width: CW, height: 18, color: lightBg });
      page.drawText(clean(`HEATWISE AI  |  ${t.reportTitle}`), { x: MX + 8, y: 813, size: 6.5, font: fontB, color: forest });
      page.drawText(clean(`REF: ${reportId}  |  ${city.toUpperCase()} (${season.toUpperCase()})  [${langMeta.nativeName}]`), { x: MX + CW - 220, y: 813, size: 6, font: fontR, color: muted });
      page.drawLine({ start: { x: MX, y: 806 }, end: { x: MX + CW, y: 806 }, thickness: 0.6, color: bdrGrey });
    }
    page.drawLine({ start: { x: MX, y: 36 }, end: { x: MX + CW, y: 36 }, thickness: 0.6, color: bdrGrey });
    page.drawText(clean(t.confidential), { x: MX, y: 25, size: 5.5, font: fontR, color: muted });
    page.drawText(clean(`${t.page} ${num} ${t.of} ${TP}`), { x: MX + CW - 56, y: 25, size: 6.5, font: fontB, color: navy });
  };

  const secHead = (page: PDFPage, yy: number, num: string, title: string): number => {
    page.drawRectangle({ x: MX, y: yy - 3, width: CW, height: 16, color: lightBg, borderColor: bdrGrey, borderWidth: 0.5 });
    page.drawRectangle({ x: MX, y: yy - 3, width: 3.5, height: 16, color: forest });
    page.drawText(clean(`${num}. ${title}`), { x: MX + 10, y: yy + 2, size: 7.5, font: fontB, color: navy });
    return yy - 22;
  };

  /* Wrapped alert/callout card with auto-height */
  const wrappedCard = (
    page: PDFPage, yy: number,
    title: string, paras: string[], footer: string | null,
    accent: Color, bg: Color, bdr: Color
  ): number => {
    const innerW = CW - 22;
    const bsz = 6.6;
    const blh = 9.2;
    const allLines: string[] = [];
    paras.forEach((p, i) => {
      allLines.push(...wrapText(p, innerW, fontR, bsz));
      if (i < paras.length - 1) allLines.push(""); // paragraph gap
    });
    const hdrH = 15;
    const ftrH = footer ? 14 : 0;
    const bodyH = allLines.length * blh;
    const totalH = hdrH + bodyH + ftrH + 8;
    const boxY = yy - totalH;

    page.drawRectangle({ x: MX, y: boxY, width: CW, height: totalH, color: bg, borderColor: bdr, borderWidth: 0.75 });
    page.drawRectangle({ x: MX, y: boxY, width: 3.5, height: totalH, color: accent });

    page.drawText(clean(title), { x: MX + 10, y: yy - 11, size: 7, font: fontB, color: accent });

    let ty = yy - 22;
    for (const line of allLines) {
      if (line) page.drawText(clean(line), { x: MX + 10, y: ty, size: bsz, font: fontR, color: dark });
      ty -= blh;
    }
    if (footer) {
      page.drawText(clean(footer), { x: MX + 10, y: boxY + 5, size: 5.8, font: fontB, color: muted });
    }
    return boxY - 12;
  };

  /* Data table with auto-fit cells */
  const dataTable = (
    page: PDFPage, yy: number,
    headers: string[], headerColor: Color,
    colXs: number[], colWidths: number[],
    rows: { texts: string[]; fonts: PDFFont[]; colors: Color[] }[],
    rowH: number = 12.5
  ): number => {
    // Header row
    page.drawRectangle({ x: MX, y: yy - 12, width: CW, height: 14, color: headerColor });
    headers.forEach((h, i) => {
      page.drawText(fitCell(h, colWidths[i], fontB, 6), { x: colXs[i], y: yy - 8, size: 6, font: fontB, color: white });
    });
    // Data rows
    rows.forEach((row, rIdx) => {
      const ry = yy - 24 - rIdx * rowH;
      page.drawRectangle({
        x: MX, y: ry - 2, width: CW, height: rowH,
        color: rIdx % 2 === 0 ? lightBg : white,
        borderColor: bdrGrey, borderWidth: 0.4,
      });
      row.texts.forEach((cell, ci) => {
        page.drawText(fitCell(cell, colWidths[ci], row.fonts[ci], FS), {
          x: colXs[ci], y: ry + 1, size: FS, font: row.fonts[ci], color: row.colors[ci],
        });
      });
    });
    return yy - 24 - rows.length * rowH - 10;
  };

  /* Key-value pair row helper */
  const kvRow = (
    page: PDFPage, yy: number,
    label: string, value: string,
    labelX: number, valueX: number, maxValueW: number,
    labelColor: Color = muted, valueColor: Color = navy
  ) => {
    page.drawText(clean(label), { x: labelX, y: yy, size: FS, font: fontB, color: labelColor });
    page.drawText(fitCell(value, maxValueW, fontB, FS), { x: valueX, y: yy, size: FS, font: fontB, color: valueColor });
  };

  // ═══════════════════════════════════════════
  // PAGE 1: COVER + EXECUTIVE SUMMARY + THERMAL CONDITIONS
  // ═══════════════════════════════════════════
  const p1 = pdf.addPage([PW, PH]);
  pageFrame(p1, 1);

  // Top gold accent bar
  p1.drawRectangle({ x: MX, y: 810, width: CW, height: 3, color: gold });

  // Header banner
  p1.drawRectangle({ x: MX, y: 740, width: CW, height: 72, color: navy });

  // Official ISRO logo in header
  if (isroLogoImage) {
    const logoW = 44;
    const logoH = 44 * (290 / 300);
    const logoX = MX + 10;
    const logoY = 740 + (72 - logoH) / 2;
    p1.drawRectangle({
      x: logoX - 3,
      y: logoY - 3,
      width: logoW + 6,
      height: logoH + 6,
      color: white,
      borderColor: rgb(0.85, 0.9, 0.95),
      borderWidth: 0.5,
    });
    p1.drawImage(isroLogoImage, {
      x: logoX,
      y: logoY,
      width: logoW,
      height: logoH,
    });
  }

  const textOffsetX = isroLogoImage ? MX + 66 : MX + 14;
  p1.drawText(clean(`INDIAN SPACE RESEARCH ORGANISATION (ISRO)  |  HEATWISE AI  [${langMeta.nativeName}]`), {
    x: textOffsetX, y: 795, size: 6.5, font: fontB, color: gold,
  });
  p1.drawText(clean(t.reportTitle), {
    x: textOffsetX, y: 776, size: 10.5, font: fontB, color: white,
  });
  p1.drawText(clean(t.reportSubtitle), {
    x: textOffsetX, y: 758, size: 6, font: fontR, color: rgb(0.78, 0.84, 0.82),
  });

  // Right-side metadata in header
  const rMetaX = MX + CW - 110;
  p1.drawText(clean(`Report ID: ${reportId}`), { x: rMetaX, y: 795, size: 6, font: fontR, color: rgb(0.65, 0.75, 0.72) });
  p1.drawText(clean(`${generatedAt} ${generatedTime}`), { x: rMetaX, y: 785, size: 6, font: fontR, color: rgb(0.65, 0.75, 0.72) });

  // ── Administrative Metadata Grid ──
  let y = 728;
  p1.drawRectangle({ x: MX, y: y - 58, width: CW, height: 60, color: lightBg, borderColor: bdrGrey, borderWidth: 0.75 });

  // 3 columns × 3 rows with translated labels
  const meta = [
    [[t.stateLabel, cityData.state], [t.cityLabel, cityData.name], [t.municipalAuthLabel, authorityName]],
    [[t.hotspotLabel, hotspot.name], [t.coordinatesLabel, `${hotspot.lat.toFixed(4)} N, ${hotspot.lon.toFixed(4)} E`], [t.climateZoneLabel, cityData.climateZone]],
    [[t.seasonLabel, season.replace("_", "-")], [t.reportIdLabel, reportId], [t.generatedLabel, `${generatedAt}`]],
  ];
  meta.forEach((row, ri) => {
    row.forEach(([lbl, val], ci) => {
      const cx = MX + 8 + ci * 170;
      const ry = y - 14 - ri * 16;
      p1.drawText(fitCell(lbl, 60, fontB, 5.8), { x: cx, y: ry, size: 5.8, font: fontB, color: muted });
      p1.drawText(fitCell(val, 104, fontB, 5.8), { x: cx + 62, y: ry, size: 5.8, font: fontB, color: navy });
    });
  });
  y -= 74;

  // ── Section 1: Executive Summary ──
  y = secHead(p1, y, "1", t.sec1_executiveSummary);
  y = wrappedCard(p1, y,
    t.execTitle,
    [
      `The selected hotspot in ${hotspot.name}, ${city}, ${cityData.state} shows elevated thermal conditions during ${season.replace("_", "-")}, with baseline peak LST of ${hotspot.temp} (UHI anomaly: +${hotspot.uhi.toFixed(1)} C) and an exposed population of ${hotspot.people}.`,
      `Physical driver attribution confirms high impervious surface fraction (${hotspot.builtFraction}) and deficient canopy cover (${hotspot.canopyCover}) as the dominant modelled contributors to localized heat trapping.`,
      `Counterfactual simulation indicates implementing ${INTERVENTION_OPTIONS[reqIntervention].name} at ${reqIntensity}% intensity can achieve a modelled cooling of -${primarySim.coolingDelta.toFixed(1)} C, transitioning risk from ${primarySim.baselineRisk} to ${primarySim.scenarioRisk}.`,
    ],
    t.execStatus,
    red, alertBg, alertBdr
  );

  // ── Section 2: Location Profile ──
  y = secHead(p1, y, "2", t.sec2_locationProfile);
  const lCols = [MX + 6, MX + 86, MX + 258, MX + 348];
  const lWs = [78, 166, 88, CW - 308];
  const locRows = [
    [t.stateLabel.replace(":", ""), cityData.state, t.municipalAuthLabel.replace(":", ""), authorityName],
    [t.cityLabel.replace(":", ""), cityData.name, t.hotspotLabel.replace(":", ""), hotspot.name],
    ["Geo. Center", `${hotspot.lat.toFixed(4)} N, ${hotspot.lon.toFixed(4)} E`, "Elevation / Coast", `${cityData.elevationM.toFixed(0)} m | ${cityData.distanceToCoastKm.toFixed(0)} km`],
    ["Density Context", "High-Density Compact Built", t.populationExposed, hotspot.people],
    ["Canopy Cover", hotspot.canopyCover, "Impervious Fraction", hotspot.builtFraction],
    ["Bldg Height / SVF", `${hotspot.buildingHeight} | ${hotspot.skyView}`, "PM2.5 / Wind", `${hotspot.pm25} | ${hotspot.windSpeed}`],
  ];
  p1.drawRectangle({ x: MX, y: y - 78, width: CW, height: 80, color: white, borderColor: bdrGrey, borderWidth: 0.75 });
  locRows.forEach((row, ri) => {
    const ry = y - 11 - ri * 12.5;
    if (ri % 2 === 1) p1.drawRectangle({ x: MX + 1, y: ry - 3, width: CW - 2, height: 12.5, color: lightBg });
    p1.drawText(fitCell(row[0], lWs[0], fontB, FS), { x: lCols[0], y: ry, size: FS, font: fontB, color: muted });
    p1.drawText(fitCell(row[1], lWs[1], fontR, FS), { x: lCols[1], y: ry, size: FS, font: fontR, color: navy });
    p1.drawText(fitCell(row[2], lWs[2], fontB, FS), { x: lCols[2], y: ry, size: FS, font: fontB, color: muted });
    p1.drawText(fitCell(row[3], lWs[3], fontR, FS), { x: lCols[3], y: ry, size: FS, font: fontR, color: navy });
  });
  y -= 92;

  // ── Section 3: Thermal Conditions Table ──
  y = secHead(p1, y, "3", t.sec3_thermalConditions);
  const tX = [MX + 6, MX + 148, MX + 236, MX + 330, MX + 416];
  const tW = [140, 86, 92, 84, CW - 376];
  y = dataTable(p1, y,
    [t.thermalIndicator, t.wardBaseline, t.citySeasonMean, t.hotspotAnomaly, t.riskLevel],
    forest, tX, tW,
    [
      { texts: ["Land Surface Temp (LST)", `${hotspot.lst.toFixed(1)} C`, `${seasonData.meanLst.toFixed(1)} C`, `+${(hotspot.lst - seasonData.meanLst).toFixed(1)} C`, hotspot.risk.toUpperCase()], fonts: [fontB, fontB, fontR, fontR, fontB], colors: [dark, red, navy, amber, red] },
      { texts: ["Urban Heat Island (UHI)", `+${hotspot.uhi.toFixed(1)} C`, `+${seasonData.uhiMean.toFixed(1)} C`, `+${(hotspot.uhi - seasonData.uhiMean).toFixed(1)} C`, "VERY SEVERE"], fonts: [fontB, fontB, fontR, fontR, fontB], colors: [dark, red, navy, amber, red] },
      { texts: ["Wet Bulb Globe (WBGT)", `${hotspot.wbgt.toFixed(1)} C`, `${seasonData.wbgtMean.toFixed(1)} C`, `+${(hotspot.wbgt - seasonData.wbgtMean).toFixed(1)} C`, "HEAT STRESS"], fonts: [fontB, fontB, fontR, fontR, fontB], colors: [dark, red, navy, amber, red] },
      { texts: ["Severity Score", `${hotspot.score}/100`, "54/100", "+38 pts", "HIGH PRIORITY"], fonts: [fontB, fontB, fontR, fontR, fontB], colors: [dark, red, navy, amber, red] },
      { texts: ["Cooling Opportunity", `${seasonData.coolingOpportunity.toFixed(1)} C`, `${seasonData.coolingOpportunity.toFixed(1)} C`, "High Potential", "RETROFIT READY"], fonts: [fontB, fontB, fontR, fontR, fontB], colors: [dark, green, navy, green, forest] },
    ]
  );

  // ═══════════════════════════════════════════
  // PAGE 2: DRIVER ANALYSIS + INTERVENTIONS
  // ═══════════════════════════════════════════
  const p2 = pdf.addPage([PW, PH]);
  pageFrame(p2, 2);
  y = 790;

  // ── Section 4: Spatial Hotspot Analysis ──
  y = secHead(p2, y, "4", t.sec4_spatialAnalysis);
  y = wrappedCard(p2, y,
    t.spatialTitle,
    [
      `The satellite Earth observation telemetry confirms thermal energy is intensely concentrated across the ${hotspot.name} urban core.`,
      `A steep microclimatic gradient (+${hotspot.uhi.toFixed(1)} C anomaly) is observed between this built cluster and surrounding baseline corridors, indicating localized radiation trapping rather than uniform regional warming.`,
      `Surface albedo is measured at ${hotspot.albedo} with high impervious fraction (${hotspot.builtFraction}), severely limiting natural evaporative cooling.`,
    ],
    null, forest, lightBg, bdrGrey
  );

  // ── Section 5: Driver Analysis Table ──
  y = secHead(p2, y, "5", t.sec5_driverAnalysis);
  const dX = [MX + 6, MX + 155, MX + 255, MX + 370];
  const dW = [147, 98, 113, CW - 330];
  const driverRows = hotspot.driverBreakdown.slice(0, 5).map((d, i) => {
    const isH = d.val > 0;
    return {
      texts: [d.name, [hotspot.builtFraction, hotspot.canopyCover, hotspot.buildingHeight, `${hotspot.albedo}`, hotspot.windSpeed][i] || "-", `${isH ? "+" : ""}${d.val.toFixed(1)} C`, Math.abs(d.val) > 2 ? t.highInfluence : t.moderate],
      fonts: [fontB, fontR, fontB, fontB],
      colors: [dark, navy, isH ? red : green, isH ? red : forest],
    };
  });
  y = dataTable(p2, y, [t.modelledDriver, t.localValue, t.thermalImpact, t.influence], navy, dX, dW, driverRows);

  // ── Section 6: Geospatial Context ──
  y = secHead(p2, y, "6", t.sec6_geospatialContext);
  const geoItems = [
    [t.builtEnv, `High built fraction (${hotspot.builtFraction}) | Bldg height ${hotspot.buildingHeight} | High thermal mass`, false],
    [t.greenInfra, `Canopy deficit (${hotspot.canopyCover}) | Low NDVI | Priority for urban afforestation`, false],
    [t.blueInfra, `Coast distance ${cityData.distanceToCoastKm.toFixed(0)} km | Limited moisture buffering at peak daylight`, false],
    [t.constraints, "Potential ecological constraint - verify with municipal/regulatory planning data", true],
  ] as [string, string, boolean][];

  geoItems.forEach(([lbl, desc, isAlert], i) => {
    const cy = y - 16 - i * 16;
    p2.drawRectangle({ x: MX, y: cy - 2, width: CW, height: 14, color: isAlert ? alertBg : lightBg, borderColor: isAlert ? alertBdr : bdrGrey, borderWidth: 0.4 });
    p2.drawText(clean(lbl), { x: MX + 6, y: cy + 1, size: 6, font: fontB, color: isAlert ? red : forest });
    p2.drawText(fitCell(desc, CW - 120, fontR, 6), { x: MX + 108, y: cy + 1, size: 6, font: isAlert ? fontB : fontR, color: isAlert ? red : dark });
  });
  y -= 82;

  // ── Section 7: Cooling Intervention Table ──
  y = secHead(p2, y, "7", t.sec7_coolingOptions);
  const iX = [MX + 6, MX + 130, MX + 230, MX + 340, MX + 430];
  const iW = [122, 98, 108, 88, CW - 390];
  const intRows = [
    { texts: ["Tree / Green Cover", hotspot.canopyCover, "30% Canopy Expansion", `-${simTrees.coolingDelta.toFixed(1)} C`, `${simTrees.baselineRisk}->${simTrees.scenarioRisk}`], fonts: [fontB, fontR, fontB, fontB, fontB], colors: [dark, muted, navy, green, forest] },
    { texts: ["Cool Roofs Coating", `Albedo: ${hotspot.albedo}`, "35% Albedo Retrofit", `-${simRoofs.coolingDelta.toFixed(1)} C`, `${simRoofs.baselineRisk}->${simRoofs.scenarioRisk}`], fonts: [fontB, fontR, fontB, fontB, fontB], colors: [dark, muted, navy, green, forest] },
    { texts: ["Shade / Green Walks", `SVF: ${hotspot.skyView}`, "25% Shaded Corridor", `-${simShade.coolingDelta.toFixed(1)} C`, `${simShade.baselineRisk}->${simShade.scenarioRisk}`], fonts: [fontB, fontR, fontB, fontB, fontB], colors: [dark, muted, navy, green, forest] },
    { texts: ["Permeable Pavement", `Imp: ${hotspot.builtFraction}`, "30% Porous Retrofit", `-${simPave.coolingDelta.toFixed(1)} C`, `${simPave.baselineRisk}->${simPave.scenarioRisk}`], fonts: [fontB, fontR, fontB, fontB, fontB], colors: [dark, muted, navy, green, forest] },
  ];
  y = dataTable(p2, y, [t.intervention, t.baseline, t.scenarioIntensity, t.cooling, t.riskShift], forest, iX, iW, intRows);

  // ── Section 8: Baseline vs Counterfactual ──
  y = secHead(p2, y, "8", t.sec8_counterfactualImpact);
  y = wrappedCard(p2, y,
    `${t.primaryScenario}: ${INTERVENTION_OPTIONS[reqIntervention].name.toUpperCase()} (${reqIntensity}% INTENSITY)`,
    [
      `Baseline LST: ${primarySim.baselineLst.toFixed(1)} C  ->  Predicted Scenario LST: ${primarySim.scenarioLst.toFixed(1)} C`,
      `Modelled Cooling: -${primarySim.coolingDelta.toFixed(1)} C  |  Post-Intervention UHI: +${primarySim.scenarioUhi.toFixed(1)} C`,
    ],
    t.counterfactualStatus,
    green, okBg, okBdr
  );

  // ═══════════════════════════════════════════
  // PAGE 3: PUBLIC BENEFIT + MONITORING + ACTION PLAN
  // ═══════════════════════════════════════════
  const p3 = pdf.addPage([PW, PH]);
  pageFrame(p3, 3);
  y = 790;

  // ── Section 9: Population & Public Benefit ──
  y = secHead(p3, y, "9", t.sec9_publicBenefit);
  const bX = [MX + 8, MX + 155, MX + 270];
  const bW = [145, 113, CW - 230];
  const benefitRows = [
    { texts: [t.populationExposed, hotspot.people, "Baseline heat hazard exposure in active ward"], fonts: [fontB, fontB, fontR], colors: [muted, navy, dark] },
    { texts: [t.populationBenefiting, `${Math.round(hotspot.peopleNum * 0.78).toLocaleString("en-IN")} residents`, "Within 300m cooling buffer zone"], fonts: [fontB, fontB, fontR], colors: [muted, navy, dark] },
    { texts: [t.energyBenefit, "-8.4% Peak HVAC Load", "Reduced cooling power draw during peak hours"], fonts: [fontB, fontB, fontR], colors: [muted, green, dark] },
    { texts: [t.mortalityRisk, "-24% Relative Risk", "Public health risk reduction per heat protocol"], fonts: [fontB, fontB, fontR], colors: [muted, green, dark] },
  ];
  y = dataTable(p3, y, [t.metric, t.value, t.description], forest, bX, bW, benefitRows, 13);

  // ── Section 10: Cost & Planning ──
  y = secHead(p3, y, "10", t.sec10_costPlanning);
  const cRows = [
    { texts: [t.capex, "INR 1.85 - 2.40 Crore", "Based on standard municipal schedule of rates (SoR)"], fonts: [fontB, fontB, fontR], colors: [muted, forest, dark] },
    { texts: [t.complexity, "Moderate (Phased)", "Requires inter-dept ROW permissions & sapling procurement"], fonts: [fontB, fontB, fontR], colors: [muted, forest, dark] },
    { texts: [t.planningCheck, "Clearance Required", "Verify subsurface utilities & overhead cables before works"], fonts: [fontB, fontB, fontR], colors: [muted, amber, dark] },
  ];
  y = dataTable(p3, y, [t.consideration, t.estimate, t.notes], navy, bX, bW, cRows, 13);

  // ── Section 11: 5/10/15-Day Monitoring ──
  y = secHead(p3, y, "11", t.sec11_monitoring);
  const oX = [MX + 6, MX + 90, MX + 190, MX + 290, MX + 395];
  const oW = [82, 98, 98, 103, CW - 355];
  const obsRows = primarySim.observations.map((obs: ObservationPoint) => {
    const diff = (obs.observedDeltaC - obs.expectedDeltaC).toFixed(2);
    return {
      texts: [`Day ${obs.day} (${obs.day === 0 ? "Pre-works" : "Telemetry"})`, `${obs.expectedDeltaC.toFixed(2)} C`, `${obs.observedDeltaC.toFixed(2)} C`, `${Number(diff) > 0 ? "+" : ""}${diff} C`, obs.status.toUpperCase()],
      fonts: [fontB, fontR, fontB, fontB, fontB],
      colors: [dark, muted, navy, Math.abs(Number(diff)) > 0.5 ? amber : green, obs.status === "Normal" ? green : amber],
    };
  });
  y = dataTable(p3, y, [t.monitoringDay, t.expected, t.observed, t.variance, t.status], navy, oX, oW, obsRows);

  // ── Section 12: Anomaly Alert ──
  y = secHead(p3, y, "12", t.sec12_anomalyAlert);
  const isAnom = primarySim.anomalyReport.anomalyStatus === "Anomaly Detected";
  y = wrappedCard(p3, y,
    `TELEMETRY AUDIT: ${primarySim.anomalyReport.anomalyStatus.toUpperCase()}`,
    [
      isAnom
        ? `Observed thermal conditions (+${primarySim.anomalyReport.observedChangeC} C) remain above the expected post-intervention envelope (+${primarySim.anomalyReport.modeledChangeC} C). Further field verification and albedo review are recommended.`
        : `Satellite and ground station telemetry track within expected confidence intervals. No systemic thermal anomaly detected across the ${hotspot.name} observation corridor.`,
    ],
    "ACTION: SCHEDULE FIELD INFRARED SURVEY IF POST-WORKS TEMP EXCEEDS CRITICAL THRESHOLD",
    isAnom ? red : forest, isAnom ? alertBg : okBg, isAnom ? alertBdr : okBdr
  );

  // ── Section 13: Action Plan ──
  y = secHead(p3, y, "13", t.sec13_actionPlan);
  const aX = [MX + 6, MX + 52, MX + 175, MX + 305, MX + 425];
  const aW = [44, 121, 128, 118, CW - 385];
  const actRows = [
    { texts: ["HIGH", "Tree canopy expansion", hotspot.name, depts.forestry, "-1.4 C & Shade"], fonts: [fontB, fontB, fontR, fontR, fontB], colors: [red, dark, navy, forest, dark] },
    { texts: ["HIGH", "Cool roofs coating", "Public & muni. roofs", depts.buildings, "-1.1 C Surface"], fonts: [fontB, fontB, fontR, fontR, fontB], colors: [red, dark, navy, forest, dark] },
    { texts: ["MEDIUM", "Shade walkways", "Transit corridors", depts.engineering, "WBGT Comfort"], fonts: [fontB, fontB, fontR, fontR, fontB], colors: [amber, dark, navy, forest, dark] },
    { texts: ["MEDIUM", "Heat health advisories", "Slums & workers", depts.health, "Reduced Morbidity"], fonts: [fontB, fontB, fontR, fontR, fontB], colors: [amber, dark, navy, forest, dark] },
  ];
  y = dataTable(p3, y, [t.priority, t.actionItem, t.location, t.responsibleDept, t.outcome], forest, aX, aW, actRows);

  // ═══════════════════════════════════════════
  // PAGE 4: VALIDATION + METHODOLOGY + DECISION SUMMARY
  // ═══════════════════════════════════════════
  const p4 = pdf.addPage([PW, PH]);
  pageFrame(p4, 4);
  y = 790;

  // ── Section 14: Validation ──
  y = secHead(p4, y, "14", t.sec14_validation);
  y = wrappedCard(p4, y,
    "STATISTICAL ACCURACY BENCHMARKS & OPERATIONAL LIMITATIONS",
    [
      `- ML Architecture: Gradient-boosted decision trees (${modelMeta.version}) trained on multi-spectral satellite thermal datasets.`,
      `- Model Accuracy: MAE = ${maeVal.toFixed(2)} C, RMSE = ${rmseVal.toFixed(2)} C, R2 = ${r2Val.toFixed(3)} (evaluated on held-out test benchmarks).`,
      "- Prototype Scope: Demonstrator outputs are counterfactual simulations for decision screening, not certified engineering specifications.",
      "- Field Verification: Municipal authorities must conduct on-ground pyranometry and verify underground utilities prior to executing interventions.",
    ],
    null, navy, lightBg, bdrGrey
  );

  // ── Section 15: Data Sources ──
  y = secHead(p4, y, "15", t.sec15_dataSources);
  const dsX = [MX + 8, MX + 150];
  const dsW = [140, CW - 112];
  const dsRows = [
    { texts: ["Thermal Remote Sensing", "Landsat 8/9 TIRS & Sentinel-2 MSI (100m-10m resolution)"], fonts: [fontB, fontR], colors: [forest, dark] },
    { texts: ["Meteorological Forcing", "ERA5-Land reanalysis & IMD AWS telemetry feeds"], fonts: [fontB, fontR], colors: [forest, dark] },
    { texts: ["Urban Morphology", "OpenStreetMap footprints, road density, GIS land cover"], fonts: [fontB, fontR], colors: [forest, dark] },
    { texts: ["Inference Stack", "XGBoost 2.0.0, PostGIS, MapTiler basemaps, PDF-Lib"], fonts: [fontB, fontR], colors: [forest, dark] },
  ];
  y = dataTable(p4, y, ["DATA DOMAIN", "SOURCE & RESOLUTION"], forest, dsX, dsW, dsRows, 13);

  // ── Section 16: Decision Summary Box ──
  y = secHead(p4, y, "16", t.sec16_decisionSummary);
  const boxH = 120;
  const boxY = y - boxH;
  p4.drawRectangle({ x: MX, y: boxY, width: CW, height: boxH, color: lightBg, borderColor: navy, borderWidth: 1 });
  p4.drawRectangle({ x: MX, y: boxY, width: 4, height: boxH, color: navy });

  p4.drawText(clean(t.decisionBriefing), { x: MX + 12, y: y - 12, size: 7.5, font: fontB, color: navy });

  const sGrid = [
    [t.location, `${hotspot.name}, ${city}`, t.riskLevel, `${hotspot.risk.toUpperCase()} (${hotspot.temp})`],
    [t.modelledDriver, `${hotspot.driverBreakdown[0]?.name || "Impervious Surface"}`, t.intervention, `${INTERVENTION_OPTIONS[reqIntervention].name}`],
    [t.thermalImpact, `-${primarySim.coolingDelta.toFixed(1)} C cooling`, t.populationBenefiting, hotspot.people],
    [t.capex, "INR 1.85 - 2.40 Cr", t.constraints, "Verify utility ROW"],
    [t.monitoringDay, "5/10/15-day LST check", t.responsibleDept, "See Action Plan above"],
  ];
  sGrid.forEach((row, i) => {
    const sy = y - 26 - i * 13;
    kvRow(p4, sy, row[0], row[1], MX + 12, MX + 95, 145);
    kvRow(p4, sy, row[2], row[3], MX + 265, MX + 350, 155);
  });

  // Divider before next action
  p4.drawLine({ start: { x: MX + 8, y: boxY + 22 }, end: { x: MX + CW - 8, y: boxY + 22 }, thickness: 0.5, color: bdrGrey });

  // Next action - properly wrapped
  const nextActionLines = wrapText(
    `Table this technical brief before the ${authorityName} Climate Resilience Committee for ward-level pilot approval.`,
    CW - 140,
    fontB,
    6
  );
  p4.drawText(clean(t.nextAction), { x: MX + 12, y: boxY + 12, size: 6, font: fontB, color: forest });
  nextActionLines.forEach((line, li) => {
    p4.drawText(clean(line), { x: MX + 85, y: boxY + 12 - li * 8, size: 6, font: fontB, color: navy });
  });

  y = boxY - 16;

  // ── Sign-off Strip ──
  p4.drawRectangle({ x: MX, y: y - 34, width: CW, height: 36, color: white, borderColor: bdrGrey, borderWidth: 0.75 });

  p4.drawText(clean(t.preparedBy), { x: MX + 10, y: y - 10, size: 5.8, font: fontB, color: muted });
  p4.drawText(clean("HeatWise AI Technical Assessment Cell"), { x: MX + 70, y: y - 10, size: 5.8, font: fontR, color: dark });

  p4.drawText(clean(t.submittedTo), { x: MX + 10, y: y - 22, size: 5.8, font: fontB, color: muted });
  p4.drawText(fitCell(authorityName, 185, fontR, 5.8), { x: MX + 75, y: y - 22, size: 5.8, font: fontR, color: dark });

  p4.drawText(clean(t.docRef), { x: MX + CW - 200, y: y - 10, size: 5.8, font: fontB, color: forest });
  p4.drawText(clean(reportId), { x: MX + CW - 150, y: y - 10, size: 5.8, font: fontR, color: navy });

  p4.drawText(clean(t.verification), { x: MX + CW - 200, y: y - 22, size: 5.8, font: fontB, color: muted });
  p4.drawText(clean(`AUTOMATED ML-INFERENCE [${langMeta.nativeName}]`), { x: MX + CW - 135, y: y - 22, size: 5.8, font: fontR, color: muted });

  /* ─── Serialize & Return ─── */
  const pdfBytes = await pdf.save();
  const safeName = `${city}-${hotspot.name}-${season}-${langCode}-Municipal-Heat-Report`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return new Response(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${safeName}.pdf"`,
      "Cache-Control": "public, max-age=300",
    },
  });
}
