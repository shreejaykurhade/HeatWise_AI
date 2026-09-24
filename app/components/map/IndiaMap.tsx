"use client";

import { useEffect, useRef, useState, useCallback, useMemo, memo } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { CITIES_DATA, CityName, SeasonName, Hotspot } from "../../data/heatData";
import { ALL_STATE_CITIES, StateCityStation } from "../../data/allStateCities";
import stateBoundsRaw from "../../data/stateBounds.json";
import MapLegend from "./MapLegend";

interface StateBoundInfo {
  bbox: [number, number, number, number];
  center: [number, number];
}

const stateBoundsData = stateBoundsRaw as unknown as Record<string, StateBoundInfo>;

const MAPTILER_API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || "mpECGDSOIaeeWb6oieIh";
maptilersdk.config.apiKey = MAPTILER_API_KEY;

export interface IndiaMapProps {
  city: CityName;
  season: SeasonName;
  mode: string;
  selectedHotspot: string;
  onSelectCity: (city: CityName) => void;
  onSelectHotspot: (hotspot: string) => void;
  selectedAreaCoordinates?: { lat: number; lon: number };
  scenarioOverlay?: {
    mode: "baseline" | "simulated" | "change";
    simulatedLst?: number;
    coolingDelta?: number;
    scenarioRisk?: string;
    timelineStep?: number;
    timelineDay?: number;
  };
  mapStyle?: MapStyleKey;
  onMapStyleChange?: (style: MapStyleKey) => void;
  showHeatWave?: boolean;
  onToggleHeatWave?: () => void;
  showIsotherms?: boolean;
  onToggleIsotherms?: () => void;
  showStations?: boolean;
  onToggleStations?: () => void;
  showHotspots?: boolean;
  onToggleHotspots?: () => void;
  is3DMode?: boolean;
  onToggle3D?: () => void;
  onResetNormal?: () => void;
  resetTrigger?: number;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  hideFloatingBar?: boolean;
}

export const STATE_TEMP_PROFILES: Record<SeasonName, Record<string, number>> = {
  Summer: {
    rajasthan: 57.3,
    maharashtra: 55.7,
    gujarat: 54.7,
    madhyapradesh: 54.2,
    telangana: 52.8,
    andhrapradesh: 51.5,
    uttarpradesh: 53.6,
    delhi: 56.4,
    punjab: 53.8,
    haryana: 54.9,
    tamilnadu: 47.8,
    karnataka: 46.5,
    kerala: 40.2,
    westbengal: 48.9,
    odisha: 51.2,
    bihar: 50.8,
    chhattisgarh: 52.1,
    jharkhand: 49.5,
    assam: 41.2,
    jammuandkashmir: 38.6,
    himachalpradesh: 39.4,
    uttarakhand: 42.1,
    goa: 41.8,
    tripura: 40.5,
    meghalaya: 36.8,
    manipur: 37.2,
    nagaland: 36.5,
    mizoram: 36.1,
    arunachalpradesh: 34.2,
    sikkim: 32.5,
    ladakh: 31.8,
  },
  Monsoon: {
    rajasthan: 46.5,
    maharashtra: 42.1,
    gujarat: 43.8,
    madhyapradesh: 41.5,
    telangana: 40.8,
    andhrapradesh: 41.2,
    uttarpradesh: 42.7,
    delhi: 44.1,
    punjab: 42.3,
    haryana: 43.0,
    tamilnadu: 40.1,
    karnataka: 37.5,
    kerala: 34.0,
    westbengal: 39.8,
    odisha: 40.5,
    bihar: 41.0,
    chhattisgarh: 40.2,
    jharkhand: 39.5,
    assam: 36.2,
    jammuandkashmir: 32.0,
    himachalpradesh: 33.1,
    uttarakhand: 34.8,
    goa: 35.2,
    tripura: 35.0,
    meghalaya: 31.2,
    manipur: 32.0,
    nagaland: 31.5,
    mizoram: 30.8,
    arunachalpradesh: 29.5,
    sikkim: 27.8,
    ladakh: 26.2,
  },
  Post_Monsoon: {
    rajasthan: 41.2,
    maharashtra: 38.5,
    gujarat: 39.8,
    madhyapradesh: 37.6,
    telangana: 37.0,
    andhrapradesh: 37.8,
    uttarpradesh: 38.0,
    delhi: 39.2,
    punjab: 37.5,
    haryana: 38.1,
    tamilnadu: 36.5,
    karnataka: 34.8,
    kerala: 32.5,
    westbengal: 36.0,
    odisha: 36.8,
    bihar: 36.5,
    chhattisgarh: 36.2,
    jharkhand: 35.8,
    assam: 33.0,
    jammuandkashmir: 28.5,
    himachalpradesh: 29.2,
    uttarakhand: 31.0,
    goa: 33.5,
    tripura: 32.0,
    meghalaya: 28.5,
    manipur: 29.0,
    nagaland: 28.6,
    mizoram: 28.0,
    arunachalpradesh: 26.5,
    sikkim: 24.8,
    ladakh: 21.5,
  },
  Winter: {
    rajasthan: 31.5,
    maharashtra: 32.0,
    gujarat: 33.2,
    madhyapradesh: 29.8,
    telangana: 30.5,
    andhrapradesh: 31.8,
    uttarpradesh: 27.5,
    delhi: 28.0,
    punjab: 25.8,
    haryana: 26.5,
    tamilnadu: 32.0,
    karnataka: 31.2,
    kerala: 30.8,
    westbengal: 28.5,
    odisha: 30.0,
    bihar: 27.2,
    chhattisgarh: 29.0,
    jharkhand: 28.2,
    assam: 25.0,
    jammuandkashmir: 18.0,
    himachalpradesh: 19.5,
    uttarakhand: 22.0,
    goa: 31.0,
    tripura: 26.0,
    meghalaya: 21.0,
    manipur: 22.5,
    nagaland: 21.8,
    mizoram: 22.0,
    arunachalpradesh: 19.8,
    sikkim: 17.5,
    ladakh: 12.0,
  },
};

type MapStyleKey = "satellite" | "light" | "dark";

export const MAP_STYLES: Record<
  MapStyleKey,
  { label: string; shortLabel: string; icon: string; style: string }
> = {
  satellite: {
    label: "Satellite Hybrid",
    shortLabel: "Sat",
    icon: "🛰️",
    style: `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_API_KEY}`,
  },
  light: {
    label: "Light",
    shortLabel: "Light",
    icon: "☀️",
    style: `https://api.maptiler.com/maps/dataviz-v4-light/style.json?key=${MAPTILER_API_KEY}`,
  },
  dark: {
    label: "Dark",
    shortLabel: "Dark",
    icon: "🌑",
    style: `https://api.maptiler.com/maps/dataviz-v4-dark/style.json?key=${MAPTILER_API_KEY}`,
  },
};

export const INDIA_BOUNDS: [[number, number], [number, number]] = [
  [65.0, 6.0],
  [99.0, 37.5],
];

export const INDIA_FULL_EXTENT: [[number, number], [number, number]] = [
  [68.0, 6.8],
  [97.5, 36.5],
];

const DEFAULT_CENTER: [number, number] = [81.0, 22.0];
const DEFAULT_ZOOM = 3.6;

function IndiaMapComponent({
  city,
  season,
  mode,
  selectedHotspot,
  onSelectCity,
  onSelectHotspot,
  selectedAreaCoordinates,
  scenarioOverlay,
  mapStyle: controlledMapStyle,
  onMapStyleChange: controlledOnStyleChange,
  showHeatWave: controlledShowHeatWave,
  onToggleHeatWave: controlledOnToggleHeatWave,
  showIsotherms: controlledShowIsotherms,
  onToggleIsotherms: controlledOnToggleIsotherms,
  showStations: controlledShowStations,
  onToggleStations: controlledOnToggleStations,
  showHotspots: controlledShowHotspots,
  onToggleHotspots: controlledOnToggleHotspots,
  is3DMode: controlledIs3DMode,
  onToggle3D: controlledOnToggle3D,
  onResetNormal: controlledOnResetNormal,
  resetTrigger,
  isFullscreen: controlledIsFullscreen,
  onToggleFullscreen: controlledOnToggleFullscreen,
  hideFloatingBar = false,
}: IndiaMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRootRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maptilersdk.Map | null>(null);

  const [internalMapStyle, setInternalMapStyle] = useState<MapStyleKey>("satellite");
  const activeMapStyle = controlledMapStyle ?? internalMapStyle;

  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(DEFAULT_ZOOM);
  const [focusedStateName, setFocusedStateName] = useState<string | null>(null);

  const [internalHeatWave, setInternalHeatWave] = useState(true);
  const showHeatWave = controlledShowHeatWave ?? internalHeatWave;
  const toggleHeatWave = controlledOnToggleHeatWave ?? (() => setInternalHeatWave((prev) => !prev));

  const [internalIsotherms, setInternalIsotherms] = useState(false);
  const showIsotherms = controlledShowIsotherms ?? internalIsotherms;
  const toggleIsotherms = controlledOnToggleIsotherms ?? (() => setInternalIsotherms((prev) => !prev));

  const [internalStations, setInternalStations] = useState(true);
  const showStations = controlledShowStations ?? internalStations;
  const toggleStations = controlledOnToggleStations ?? (() => setInternalStations((prev) => !prev));

  const [internalHotspots, setInternalHotspots] = useState(true);
  const showHotspots = controlledShowHotspots ?? internalHotspots;
  const toggleHotspots = controlledOnToggleHotspots ?? (() => setInternalHotspots((prev) => !prev));

  const [showOrbitTrack] = useState(false);

  const [internal3D, setInternal3D] = useState(false);
  const is3DMode = controlledIs3DMode ?? internal3D;
  const setIs3DMode = (val: boolean) => setInternal3D(val);

  const [internalFullscreen, setInternalFullscreen] = useState(false);
  const isFullscreen = controlledIsFullscreen ?? internalFullscreen;
  const setIsFullscreen = (val: boolean) => setInternalFullscreen(val);

  const [cursorGeo, setCursorGeo] = useState<{ lat: number; lon: number } | null>(null);

  const stationMarkersRef = useRef<maptilersdk.Marker[]>([]);
  const hotspotMarkersRef = useRef<maptilersdk.Marker[]>([]);
  const districtCityMarkersRef = useRef<maptilersdk.Marker[]>([]);

  const cityList = useMemo(() => Object.keys(CITIES_DATA) as CityName[], []);
  const currentCityData = CITIES_DATA[city];
  const currentHotspots = useMemo(() => {
    return currentCityData?.seasons[season]?.hotspots || [];
  }, [currentCityData, season]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    maptilersdk.config.apiKey = MAPTILER_API_KEY;

    const map = new maptilersdk.Map({
      container: mapContainerRef.current,
      apiKey: MAPTILER_API_KEY,
      style: MAP_STYLES[activeMapStyle].style,
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      minZoom: 3.0,
      maxZoom: 18,
      maxBounds: INDIA_BOUNDS,
      pitch: 0,
      bearing: 0,
      attributionControl: false as unknown as maptilersdk.AttributionControlOptions,
      navigationControl: false,
      geolocateControl: false,
    });

    map.on("load", () => {
      mapRef.current = map;
      map.setMaxBounds(INDIA_BOUNDS);
      map.setMinZoom(3.0);
      map.resize();
      map.fitBounds(INDIA_FULL_EXTENT, { padding: 24, duration: 0 });
      setMapLoaded(true);
      setCurrentZoom(map.getZoom());
      syncMapLayers();
    });

    map.on("zoom", () => {
      setCurrentZoom(map.getZoom());
    });

    map.on("mousemove", (e) => {
      setCursorGeo({
        lat: parseFloat(e.lngLat.lat.toFixed(2)),
        lon: parseFloat(e.lngLat.lng.toFixed(2)),
      });
    });

    const resizeObserver = new ResizeObserver(() => {
      if (mapRef.current) {
        mapRef.current.resize();
      }
    });

    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
      setMapLoaded(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStyleChange = useCallback((newStyleKey: MapStyleKey) => {
    if (controlledOnStyleChange) {
      controlledOnStyleChange(newStyleKey);
    } else {
      setInternalMapStyle(newStyleKey);
    }
    if (!mapRef.current) return;
    mapRef.current.setStyle(MAP_STYLES[newStyleKey].style);
    mapRef.current.setMaxBounds(INDIA_BOUNDS);
    mapRef.current.setMinZoom(3.0);
  }, [controlledOnStyleChange]);

  useEffect(() => {
    if (!mapRef.current || !controlledMapStyle) return;
    mapRef.current.setStyle(MAP_STYLES[controlledMapStyle].style);
    mapRef.current.setMaxBounds(INDIA_BOUNDS);
    mapRef.current.setMinZoom(3.0);
  }, [controlledMapStyle]);

  const handleResetToAllIndia = useCallback(() => {
    if (!mapRef.current) return;
    setFocusedStateName(null);
    mapRef.current.fitBounds(INDIA_FULL_EXTENT, { padding: 24, duration: 900 });
  }, []);

  const handleStateSelect = useCallback((stateKey: string) => {
    if (!mapRef.current) return;
    const normalizedKey = stateKey.toLowerCase().replace(/[\s\-_&]/g, "");
    const boundInfo = stateBoundsData[normalizedKey];

    if (boundInfo && boundInfo.bbox) {
      setFocusedStateName(stateKey);
      mapRef.current.fitBounds(
        [
          [boundInfo.bbox[0], boundInfo.bbox[1]],
          [boundInfo.bbox[2], boundInfo.bbox[3]],
        ],
        { padding: 40, duration: 1000 }
      );
    }
  }, []);

  const syncMapLayers = useCallback(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const isSatelliteOrDark = activeMapStyle === "satellite" || activeMapStyle === "dark";

    const safeRemoveLayer = (id: string) => {
      if (map.getLayer(id)) map.removeLayer(id);
    };

    try {
      const styleLayers = map.getStyle().layers || [];
      styleLayers.forEach((l) => {
        const lid = l.id.toLowerCase();
        if (
          (lid.includes("boundary") || lid.includes("admin")) &&
          (lid.includes("district") || lid.includes("county") || lid.includes("subdivision") || lid.includes("level_6") || lid.includes("level_8"))
        ) {
          map.setLayoutProperty(l.id, "visibility", "none");
        }
      });
    } catch {
      // ignore
    }

    // A. Mode-Specific Thermal & Spatial Feature Generation
    const heatFeatures: GeoJSON.Feature[] = [];
    const activeCityData = CITIES_DATA[city];
    const activeCenter = activeCityData ? activeCityData.center : { lat: 17.385, lon: 78.4867 };

    cityList.forEach((cName) => {
      const c = CITIES_DATA[cName];
      const s = c.seasons[season];
      let peakTemp = s?.peakLst ?? 40.0;

      if (scenarioOverlay && scenarioOverlay.coolingDelta) {
        const progress = scenarioOverlay.timelineStep ?? 1.0;
        if (cName === city) {
          if (scenarioOverlay.mode === "simulated") {
            peakTemp = Math.max(18.0, peakTemp - (scenarioOverlay.coolingDelta * progress));
          } else if (scenarioOverlay.mode === "change") {
            peakTemp = Math.max(15.0, 22.0 - (scenarioOverlay.coolingDelta * progress * 2.5));
          }
        }
      }

      // Mode-specific normalized weight calculation
      let calculatedWeight = 0.2;
      if (mode === "Surface temp.") {
        calculatedWeight = Math.max(0.1, (peakTemp - 18) / 40);
      } else if (mode === "Vulnerability") {
        const popFactor = Math.min(1.0, (s?.env?.populationDensity || 12000) / 25000);
        calculatedWeight = Math.max(0.15, popFactor * 0.7 + ((peakTemp - 20) / 40) * 0.3);
      } else if (mode === "Cooling opportunity") {
        const coolingPotential = s?.coolingOpportunity ?? 3.5;
        calculatedWeight = Math.max(0.12, coolingPotential / 5.5);
      } else {
        // Heat stress (UHI anomaly)
        calculatedWeight = Math.max(0.08, (peakTemp - 20) / 38);
      }

      heatFeatures.push({
        type: "Feature",
        properties: {
          temp: peakTemp,
          weight: calculatedWeight,
        },
        geometry: {
          type: "Point",
          coordinates: [c.center.lon, c.center.lat],
        },
      });
    });

    Object.values(ALL_STATE_CITIES).flat().forEach((sc: StateCityStation) => {
      let seasonalTemp =
        season === "Winter"
          ? Math.max(4.0, sc.peakLst - 22.0)
          : season === "Post_Monsoon"
          ? sc.peakLst - 8.5
          : season === "Monsoon"
          ? sc.peakLst - 6.0
          : sc.peakLst;

      if (scenarioOverlay && scenarioOverlay.coolingDelta && (scenarioOverlay.mode === "simulated" || scenarioOverlay.mode === "change")) {
        const progress = scenarioOverlay.timelineStep ?? 1.0;
        const distKm = Math.hypot(sc.lon - activeCenter.lon, sc.lat - activeCenter.lat) * 111;
        if (distKm < 180) {
          const decay = Math.max(0, 1 - distKm / 180);
          if (scenarioOverlay.mode === "simulated") {
            seasonalTemp = Math.max(18.0, seasonalTemp - (scenarioOverlay.coolingDelta * progress * decay));
          } else if (scenarioOverlay.mode === "change") {
            seasonalTemp = Math.max(15.0, 22.0 - (scenarioOverlay.coolingDelta * progress * decay * 2.5));
          }
        }
      }

      let scWeight = 0.15;
      if (mode === "Surface temp.") {
        scWeight = Math.max(0.08, (seasonalTemp - 18) / 40);
      } else if (mode === "Vulnerability") {
        scWeight = Math.max(0.1, (seasonalTemp - 22) / 36);
      } else if (mode === "Cooling opportunity") {
        scWeight = Math.max(0.1, (52 - seasonalTemp) / 35);
      } else {
        scWeight = Math.max(0.08, (seasonalTemp - 20) / 38);
      }

      heatFeatures.push({
        type: "Feature",
        properties: {
          temp: seasonalTemp,
          weight: scWeight,
        },
        geometry: {
          type: "Point",
          coordinates: [sc.lon, sc.lat],
        },
      });
    });

    if (!map.getSource("india-states-source")) {
      map.addSource("india-states-source", {
        type: "geojson",
        data: "/geojson/india_states.geojson",
      });
    }

    safeRemoveLayer("india-states-fill");
    safeRemoveLayer("india-states-line");
    safeRemoveLayer("selected-state-line");
    safeRemoveLayer("realtime-heat-layer");

    // Dynamic temperature translucent tint for states
    const seasonTemps = STATE_TEMP_PROFILES[season];
    const matchCase: unknown[] = ["match", ["get", "state_key"]];

    Object.entries(seasonTemps).forEach(([stateKey, tempVal]) => {
      const tint =
        tempVal >= 54
          ? "rgba(244, 67, 54, 0.15)"
          : tempVal >= 48
          ? "rgba(255, 112, 67, 0.12)"
          : tempVal >= 40
          ? "rgba(255, 193, 7, 0.08)"
          : "rgba(76, 175, 80, 0.06)";
      matchCase.push(stateKey, tint);
    });

    matchCase.push("rgba(255, 255, 255, 0.02)");

    map.addLayer({
      id: "india-states-fill",
      type: "fill",
      source: "india-states-source",
      paint: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "fill-color": matchCase as any,
        "fill-opacity": 0.25,
      },
    });

    // B. Mode-Specific Heatmap Color Palettes & Radii
    if (map.getSource("realtime-heat-source")) {
      (map.getSource("realtime-heat-source") as maptilersdk.GeoJSONSource).setData({
        type: "FeatureCollection",
        features: heatFeatures,
      });
    } else {
      map.addSource("realtime-heat-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: heatFeatures,
        },
      });
    }

    // Determine custom color palette per mode
    let heatmapColors: (string | number | unknown[])[] = [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0, "rgba(0, 0, 0, 0)",
      0.15, "rgba(76, 175, 80, 0.25)",
      0.35, "rgba(255, 193, 7, 0.45)",
      0.6, "rgba(255, 112, 67, 0.65)",
      0.8, "rgba(244, 67, 54, 0.8)",
      1.0, "rgba(183, 28, 28, 0.92)",
    ];

    if (mode === "Surface temp.") {
      heatmapColors = [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0, "rgba(0, 0, 0, 0)",
        0.15, "rgba(33, 150, 243, 0.35)",
        0.35, "rgba(0, 188, 212, 0.55)",
        0.55, "rgba(255, 193, 7, 0.70)",
        0.75, "rgba(255, 87, 34, 0.85)",
        1.0, "rgba(156, 39, 176, 0.95)",
      ];
    } else if (mode === "Vulnerability") {
      heatmapColors = [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0, "rgba(0, 0, 0, 0)",
        0.15, "rgba(103, 58, 183, 0.35)",
        0.35, "rgba(156, 39, 176, 0.55)",
        0.6, "rgba(233, 30, 99, 0.75)",
        0.8, "rgba(244, 67, 54, 0.88)",
        1.0, "rgba(136, 14, 79, 0.98)",
      ];
    } else if (mode === "Cooling opportunity") {
      heatmapColors = [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0, "rgba(0, 0, 0, 0)",
        0.15, "rgba(46, 125, 50, 0.30)",
        0.35, "rgba(76, 175, 80, 0.55)",
        0.6, "rgba(0, 188, 212, 0.75)",
        0.8, "rgba(3, 169, 244, 0.88)",
        1.0, "rgba(26, 35, 126, 0.95)",
      ];
    }

    if (showHeatWave) {
      map.addLayer({
        id: "realtime-heat-layer",
        type: "heatmap",
        source: "realtime-heat-source",
        paint: {
          "heatmap-weight": ["get", "weight"],
          "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 3, 0.9, 8, 2.8],
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          "heatmap-color": heatmapColors as any,
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 3, 48, 6, 95, 10, 160],
          "heatmap-opacity": 0.76,
        },
      });
    }

    // Clean white state boundaries
    map.addLayer({
      id: "india-states-line",
      type: "line",
      source: "india-states-source",
      paint: {
        "line-color": isSatelliteOrDark ? "rgba(255, 255, 255, 0.65)" : "rgba(29, 42, 42, 0.5)",
        "line-width": 1.4,
      },
    });

    // Active Selected State Highlight
    const activeStateKey = (activeCityData?.state || "Telangana")
      .toLowerCase()
      .replace(/[^a-z]/g, "");

    map.addLayer({
      id: "selected-state-line",
      type: "line",
      source: "india-states-source",
      filter: ["==", ["get", "state_key"], activeStateKey],
      paint: {
        "line-color": "#FFD54F",
        "line-width": 2.5,
      },
    });

    map.on("click", "india-states-fill", (e) => {
      if (e.features && e.features[0]) {
        const stateName =
          (e.features[0].properties?.ST_NM as string) ||
          (e.features[0].properties?.NAME_1 as string) ||
          (e.features[0].properties?.st_nm as string);
        if (stateName) handleStateSelect(stateName);
      }
    });

    // C. Isothermal Contours
    if (showIsotherms) {
      if (!map.getSource("isothermal-lines-source")) {
        fetch("/geojson/isothermal_lines.json")
          .then((res) => res.json())
          .then((allData) => {
            const seasonData = allData[season] || allData["Summer"];
            if (!map.getSource("isothermal-lines-source")) {
              map.addSource("isothermal-lines-source", {
                type: "geojson",
                data: seasonData,
              });

              map.addLayer({
                id: "isotherms-contour-layer",
                type: "line",
                source: "isothermal-lines-source",
                paint: {
                  "line-color": "#FF7043",
                  "line-width": 1.4,
                  "line-dasharray": [4, 4],
                  "line-opacity": 0.85,
                },
              });
            }
          })
          .catch((err) => console.error("Error loading isotherms:", err));
      }
    } else {
      safeRemoveLayer("isotherms-contour-layer");
      if (map.getSource("isothermal-lines-source")) {
        map.removeSource("isothermal-lines-source");
      }
    }

    // D. Sentinel-2 Satellite Orbit Track Pass
    if (showOrbitTrack) {
      if (!map.getSource("sentinel-orbit-source")) {
        map.addSource("sentinel-orbit-source", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: { name: "Sentinel-2 Orbit Track" },
            geometry: {
              type: "LineString",
              coordinates: [
                [72.5, 36.5],
                [76.0, 26.0],
                [80.0, 15.0],
                [84.0, 6.0],
              ],
            },
          },
        });

        map.addLayer({
          id: "sentinel-orbit-line",
          type: "line",
          source: "sentinel-orbit-source",
          paint: {
            "line-color": isSatelliteOrDark ? "#64B5F6" : "#123B63",
            "line-width": 1.4,
            "line-dasharray": [4, 4],
            "line-opacity": 0.8,
          },
        });
      }
    } else {
      safeRemoveLayer("sentinel-orbit-line");
      if (map.getSource("sentinel-orbit-source")) {
        map.removeSource("sentinel-orbit-source");
      }
    }
  }, [
    season,
    showHeatWave,
    showIsotherms,
    showOrbitTrack,
    activeMapStyle,
    city,
    cityList,
    handleStateSelect,
    scenarioOverlay,
    mode,
  ]);

  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const map = mapRef.current;

    const onStyleData = () => {
      if (map.isStyleLoaded()) {
        syncMapLayers();
      }
    };

    map.on("styledata", onStyleData);
    if (map.isStyleLoaded()) {
      syncMapLayers();
    }

    return () => {
      map.off("styledata", onStyleData);
    };
  }, [mapLoaded, syncMapLayers]);

  // 6. Intelligent, Clutter-Free Interactive Markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    stationMarkersRef.current.forEach((m) => m.remove());
    stationMarkersRef.current = [];

    hotspotMarkersRef.current.forEach((m) => m.remove());
    hotspotMarkersRef.current = [];

    districtCityMarkersRef.current.forEach((m) => m.remove());
    districtCityMarkersRef.current = [];

    const isSatelliteOrDark = activeMapStyle === "satellite" || activeMapStyle === "dark";
    const isZoomedIn = currentZoom >= 6.5;

    // A. 15 National Monitoring Stations
    if (showStations) {
      cityList.forEach((cName) => {
        const c = CITIES_DATA[cName];
        const s = c.seasons[season];
        const isSelected = cName === city;
        const peakTemp = s?.peakLst ?? 40.0;
        const dotColor =
          peakTemp >= 52
            ? "#FF5252"
            : peakTemp >= 44
            ? "#FF9800"
            : peakTemp >= 36
            ? "#FFC107"
            : "#4CAF50";

        const el = document.createElement("div");
        el.className = `maptiler-station-marker ${
          isSelected ? "active-station" : "inactive-station"
        } ${isSatelliteOrDark ? "theme-satellite" : "theme-light"}`;

        if (isSelected || isZoomedIn) {
          el.innerHTML = `
            <div class="marker-reticle" style="border-color: ${isSelected ? "#FFC107" : dotColor}">
              <div class="marker-core-dot" style="background-color: ${dotColor}"></div>
            </div>
            <div class="marker-label-box">
              <span class="marker-city-name ${isSelected ? "text-selected" : ""}">${cName}</span>
              <span class="marker-temp-badge" style="color: ${dotColor}">${peakTemp}°C</span>
            </div>
          `;
        } else {
          el.innerHTML = `
            <div class="marker-compact-dot" style="background-color: ${dotColor}">
              <span class="marker-pulse-ring" style="border-color: ${dotColor}"></span>
            </div>
            <div class="marker-hover-tip">
              <span>${cName} · ${peakTemp}°C</span>
            </div>
          `;
        }

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onSelectCity(cName);
          map.flyTo({
            center: [c.center.lon, c.center.lat],
            zoom: 11.5,
            pitch: is3DMode ? 35 : 0,
            duration: 1100,
          });
        });

        const marker = new maptilersdk.Marker({
          element: el,
          anchor: "center",
        })
          .setLngLat([c.center.lon, c.center.lat])
          .addTo(map);

        stationMarkersRef.current.push(marker);
      });
    }

    // B. Hotspot Ward Markers (Appear when zoomed in)
    if (showHotspots && currentCityData && isZoomedIn) {
      currentHotspots.forEach((h: Hotspot) => {
        const isHotspotActive = h.name === selectedHotspot;
        let riskColor =
          h.risk === "Very high"
            ? "#FF5252"
            : h.risk === "High"
            ? "#FF9800"
            : "#FFC107";
        let displayedTemp = h.temp;
        let pinIcon = "🔥";

        if (isHotspotActive && scenarioOverlay) {
          if (scenarioOverlay.mode === "simulated" && scenarioOverlay.simulatedLst !== undefined) {
            displayedTemp = `${scenarioOverlay.simulatedLst.toFixed(1)}°C (Sim)`;
            const risk = scenarioOverlay.scenarioRisk || "Moderate";
            riskColor = risk === "Very High" ? "#FF5252" : risk === "High" ? "#FF9800" : risk === "Moderate" ? "#0284C7" : "#10B981";
            pinIcon = "🌱";
          } else if (scenarioOverlay.mode === "change" && scenarioOverlay.coolingDelta !== undefined) {
            displayedTemp = `↓ ${scenarioOverlay.coolingDelta.toFixed(1)}°C Cooling`;
            riskColor = "#10B981";
            pinIcon = "❄️";
          }
        }

        const el = document.createElement("div");
        el.className = `maptiler-hotspot-pin ${
          isHotspotActive ? "active-hotspot-pin" : ""
        } ${isSatelliteOrDark ? "theme-satellite" : "theme-light"}`;
        el.innerHTML = `
          <div class="hotspot-pin-icon" style="background: ${riskColor}">
            <span>${pinIcon}</span>
          </div>
          <div class="hotspot-callout">
            <strong class="hotspot-title">${h.name}</strong>
            <span class="hotspot-lst" style="color: ${riskColor}">${displayedTemp}</span>
          </div>
        `;

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onSelectHotspot(h.name);
          map.flyTo({
            center: [h.lon, h.lat],
            zoom: 13.5,
            pitch: is3DMode ? 45 : 0,
            duration: 900,
          });
        });

        const marker = new maptilersdk.Marker({
          element: el,
          anchor: "bottom",
        })
          .setLngLat([h.lon, h.lat])
          .addTo(map);

        hotspotMarkersRef.current.push(marker);
      });
    }
  }, [
    mapLoaded,
    city,
    season,
    selectedHotspot,
    showStations,
    showHotspots,
    activeMapStyle,
    is3DMode,
    currentZoom,
    cityList,
    currentCityData,
    currentHotspots,
    scenarioOverlay,
    onSelectCity,
    onSelectHotspot,
    mode,
  ]);

  // 7. Active Map Redirection on City, Hotspot, Area, or State Selection
  const prevSelectionRef = useRef<{
    city: CityName;
    hotspot: string;
    areaCoords?: { lat: number; lon: number };
  }>({
    city,
    hotspot: selectedHotspot,
    areaCoords: selectedAreaCoordinates,
  });

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const isCityChanged = prevSelectionRef.current.city !== city;
    const isHotspotChanged = prevSelectionRef.current.hotspot !== selectedHotspot;
    const isAreaChanged =
      selectedAreaCoordinates &&
      (prevSelectionRef.current.areaCoords?.lat !== selectedAreaCoordinates.lat ||
        prevSelectionRef.current.areaCoords?.lon !== selectedAreaCoordinates.lon);

    prevSelectionRef.current = {
      city,
      hotspot: selectedHotspot,
      areaCoords: selectedAreaCoordinates,
    };

    // A. Hotspot / Ward selection
    if (isHotspotChanged && selectedHotspot) {
      const targetHotspot = currentHotspots.find((h) => h.name === selectedHotspot);
      if (targetHotspot) {
        map.flyTo({
          center: [targetHotspot.lon, targetHotspot.lat],
          zoom: 13.5,
          pitch: is3DMode ? 45 : 0,
          duration: 1100,
        });
        return;
      }
    }

    // B. City Station selection
    if (isCityChanged) {
      const cityData = CITIES_DATA[city];
      if (cityData) {
        if (cityData.bounds) {
          map.fitBounds(
            [
              [cityData.bounds.minLon, cityData.bounds.minLat],
              [cityData.bounds.maxLon, cityData.bounds.maxLat],
            ],
            { padding: 45, duration: 1100, maxZoom: 11.5 }
          );
        } else {
          map.flyTo({
            center: [cityData.center.lon, cityData.center.lat],
            zoom: 10.5,
            pitch: is3DMode ? 35 : 0,
            duration: 1100,
          });
        }
        return;
      }
    }

    // C. Custom District / Area Coordinates selection
    if (isAreaChanged && selectedAreaCoordinates) {
      map.flyTo({
        center: [selectedAreaCoordinates.lon, selectedAreaCoordinates.lat],
        zoom: 10.5,
        pitch: is3DMode ? 35 : 0,
        duration: 1100,
      });
    }
  }, [city, selectedHotspot, selectedAreaCoordinates, mapLoaded, currentHotspots, is3DMode]);

  // 8. Controlled / Internal 3D Perspective Sync
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.easeTo({
      pitch: is3DMode ? 45 : 0,
      bearing: is3DMode ? -15 : 0,
      duration: 800,
    });
  }, [is3DMode]);

  const toggle3DMode = useCallback(() => {
    if (controlledOnToggle3D) {
      controlledOnToggle3D();
    } else {
      setInternal3D((prev) => !prev);
    }
  }, [controlledOnToggle3D]);

  // 9. Fullscreen Toggle & Full Normal Map View
  useEffect(() => {
    const rootEl = mapRootRef.current;
    if (isFullscreen && rootEl) {
      if (rootEl.requestFullscreen && !document.fullscreenElement) {
        rootEl.requestFullscreen().catch(() => {});
      }
    } else if (!isFullscreen && document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }

    const timer = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.resize();
        if (isFullscreen) {
          mapRef.current.fitBounds(INDIA_FULL_EXTENT, { padding: 40, duration: 600 });
        }
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [isFullscreen]);

  const toggleFullscreen = useCallback(() => {
    if (controlledOnToggleFullscreen) {
      controlledOnToggleFullscreen();
    } else {
      setInternalFullscreen((prev) => !prev);
    }
  }, [controlledOnToggleFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = Boolean(document.fullscreenElement);
      if (isNowFullscreen !== isFullscreen) {
        if (controlledOnToggleFullscreen) {
          controlledOnToggleFullscreen();
        } else {
          setInternalFullscreen(isNowFullscreen);
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [controlledOnToggleFullscreen, isFullscreen]);

  // 10. Reload / Reset to Full Normal India Map
  const handleResetToNormalMap = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    setFocusedStateName(null);
    setIs3DMode(false);
    map.easeTo({ pitch: 0, bearing: 0, duration: 400 });
    map.fitBounds(INDIA_FULL_EXTENT, { padding: 24, duration: 600 });
  }, []);

  useEffect(() => {
    if (resetTrigger && resetTrigger > 0 && mapRef.current) {
      setFocusedStateName(null);
      mapRef.current.easeTo({ pitch: 0, bearing: 0, duration: 400 });
      mapRef.current.fitBounds(INDIA_FULL_EXTENT, { padding: 24, duration: 600 });
    }
  }, [resetTrigger]);

  return (
    <div
      ref={mapRootRef}
      className={`geo-canvas-container relative w-full bg-[#081514] select-none transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-[99999] h-screen w-screen !m-0 !p-0"
          : "h-[540px] xl:h-[580px] overflow-hidden"
      }`}
    >
      {/* Top Floating Control Bar: Compact Sleek Dark Glass Pod (Only shown if !hideFloatingBar or when in isFullscreen) */}
      {(!hideFloatingBar || isFullscreen) && (
        <div className="absolute top-1.5 left-1.5 right-1.5 z-30 flex items-center justify-between pointer-events-none">
          {/* Left: State Back Button */}
          <div className="pointer-events-auto">
            {focusedStateName && (
              <button
                onClick={handleResetToAllIndia}
                className="bg-[#0B1C1A]/90 hover:bg-[#174D46] text-white px-2 py-0.5 font-mono text-[7.5px] font-bold uppercase tracking-wider border border-white/15 shadow-2xs backdrop-blur-md flex items-center gap-1 transition-colors cursor-pointer rounded-2xs"
              >
                <span>⟵</span>
                <span>ALL INDIA</span>
              </button>
            )}
          </div>

          {/* Right: Function Controls (Decreased Size & Strictly Aligned) */}
          <div className="flex items-center gap-1 bg-[#0B1C1A]/95 border border-white/15 p-1 shadow-md backdrop-blur-md rounded-xs pointer-events-auto ml-auto">
            {/* Basemap Segmented Switcher */}
            <div className="flex items-center bg-black/50 p-0.5 rounded-2xs border border-white/10 shrink-0">
              {(Object.keys(MAP_STYLES) as MapStyleKey[]).map((key) => {
                const s = MAP_STYLES[key];
                const isSelected = activeMapStyle === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleStyleChange(key)}
                    className={`h-[20px] px-1.5 text-[8.5px] font-mono font-semibold inline-flex items-center justify-center gap-1 transition-all cursor-pointer rounded-3xs leading-none ${
                      isSelected
                        ? "bg-[#174D46] text-[#FFD54F] font-bold shadow-2xs"
                        : "text-[#A0BCB6] hover:text-white"
                    }`}
                    title={`Switch to ${s.label}`}
                  >
                    <span className="text-[10px] leading-none flex items-center">{s.icon}</span>
                    <span className="leading-none">{s.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            <div className="h-4 w-[1px] bg-white/15 mx-0.5 shrink-0" />

            {/* Realtime Heat Wave Toggle */}
            <button
              onClick={toggleHeatWave}
              className={`h-[24px] px-2 text-[8.5px] font-mono font-semibold inline-flex items-center justify-center gap-1 transition-all cursor-pointer rounded-2xs leading-none shrink-0 border ${
                showHeatWave
                  ? "bg-[#174D46] text-[#FFD54F] border-[#4F7D58] shadow-2xs"
                  : "bg-transparent text-[#C5D6CE] border-transparent hover:bg-white/10 hover:text-white"
              }`}
              title="Toggle Realtime Heat Wave Thermal Layer"
            >
              <span className="text-[10px] leading-none flex items-center">🔥</span>
              <span className="leading-none">Heat</span>
            </button>

            {/* Layer Toggles */}
            <button
              onClick={toggleIsotherms}
              className={`h-[24px] px-2 text-[8.5px] font-mono font-semibold inline-flex items-center justify-center gap-1 transition-all cursor-pointer rounded-2xs leading-none shrink-0 border ${
                showIsotherms
                  ? "bg-[#174D46] text-[#FFD54F] border-[#4F7D58] shadow-2xs"
                  : "bg-transparent text-[#C5D6CE] border-transparent hover:bg-white/10 hover:text-white"
              }`}
              title="Toggle Isothermal Contours"
            >
              <span className="text-[10px] leading-none flex items-center">〰</span>
              <span className="leading-none">Iso</span>
            </button>

            <button
              onClick={toggleStations}
              className={`h-[24px] px-2 text-[8.5px] font-mono font-semibold inline-flex items-center justify-center gap-1 transition-all cursor-pointer rounded-2xs leading-none shrink-0 border ${
                showStations
                  ? "bg-[#174D46] text-[#FFD54F] border-[#4F7D58] shadow-2xs"
                  : "bg-transparent text-[#C5D6CE] border-transparent hover:bg-white/10 hover:text-white"
              }`}
              title="Toggle Monitoring Stations"
            >
              <span className="text-[10px] leading-none flex items-center">📍</span>
              <span className="leading-none">Stations</span>
            </button>

            <button
              onClick={toggleHotspots}
              className={`h-[24px] px-2 text-[8.5px] font-mono font-semibold inline-flex items-center justify-center gap-1 transition-all cursor-pointer rounded-2xs leading-none shrink-0 border ${
                showHotspots
                  ? "bg-[#174D46] text-[#FFD54F] border-[#4F7D58] shadow-2xs"
                  : "bg-transparent text-[#C5D6CE] border-transparent hover:bg-white/10 hover:text-white"
              }`}
              title="Toggle Hotspot Wards"
            >
              <span className="text-[10px] leading-none flex items-center">🎯</span>
              <span className="leading-none">Wards</span>
            </button>

            <button
              onClick={controlledOnToggle3D ?? toggle3DMode}
              className={`h-[24px] px-2 text-[8.5px] font-mono font-semibold inline-flex items-center justify-center gap-1 transition-all cursor-pointer rounded-2xs leading-none shrink-0 border ${
                is3DMode
                  ? "bg-[#174D46] text-[#FFD54F] border-[#4F7D58] shadow-2xs"
                  : "bg-transparent text-[#C5D6CE] border-transparent hover:bg-white/10 hover:text-white"
              }`}
              title="Toggle 3D View"
            >
              <span className="leading-none">{is3DMode ? "2D" : "3D"}</span>
            </button>

            {/* Reload / Normal Map Reset Button */}
            <button
              onClick={controlledOnResetNormal ?? handleResetToNormalMap}
              className="h-[24px] px-2 text-[8.5px] font-mono font-semibold inline-flex items-center justify-center gap-1 transition-all cursor-pointer rounded-2xs leading-none shrink-0 border bg-transparent text-[#C5D6CE] border-transparent hover:bg-white/10 hover:text-white"
              title="Reset / Reload to Full Normal India Map"
            >
              <span className="text-[10px] leading-none flex items-center">🔄</span>
              <span className="leading-none">Normal</span>
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={controlledOnToggleFullscreen ?? toggleFullscreen}
              className={`h-[24px] px-2 text-[8.5px] font-mono font-semibold inline-flex items-center justify-center gap-1 transition-all cursor-pointer rounded-2xs leading-none shrink-0 border ${
                isFullscreen
                  ? "bg-[#C93B2B] text-white border-[#C93B2B]"
                  : "bg-transparent text-[#C5D6CE] border-transparent hover:bg-white/10 hover:text-white"
              }`}
              title={isFullscreen ? "Exit Fullscreen (Esc)" : "Full Map View"}
            >
              <span className="text-[10px] leading-none flex items-center">{isFullscreen ? "✕" : "⛶"}</span>
              <span className="leading-none">{isFullscreen ? "Exit" : "Full"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Scientific Thermal Scale Legend */}
      <MapLegend mode={mode} season={season} />

      {/* Precision Latitude, Longitude & Scale Telemetry Bar */}
      <div className="absolute bottom-0 right-0 z-30 bg-[#0B1C1A]/95 border-t border-l border-white/15 px-2.5 py-1 font-mono text-[8px] text-[#A0BCB6] shadow-md backdrop-blur-md flex items-center gap-2 rounded-tl-2xs">
        {cursorGeo ? (
          <span className="text-[#E0ECE8] font-medium">
            LAT: <strong className="text-white">{cursorGeo.lat}° N</strong> · LON: <strong className="text-white">{cursorGeo.lon}° E</strong>
          </span>
        ) : (
          <span className="text-[#8BA8A0]">
            ISRO / LANDSAT EO TELEMETRY
          </span>
        )}
        <span className="text-white/40">|</span>
        <span className="text-[#FFD54F] font-semibold">
          {focusedStateName ? "50 km" : "500 km"}
        </span>
      </div>

      {/* MapTiler WebGL Canvas */}
      <div
        ref={mapContainerRef}
        className="w-full h-full relative"
        style={{ minHeight: "100%" }}
      />
    </div>
  );
}

export default memo(IndiaMapComponent);
