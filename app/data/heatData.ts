// Auto-generated from india_urban_heat_synthetic_dataset (500k rows)
export interface HotspotDriver {
  name: string;
  val: number;
  weight: number;
}

export interface Hotspot {
  id: string;
  name: string;
  risk: string;
  score: number;
  temp: string;
  lst: number;
  uhi: number;
  heat_index: number;
  wbgt: number;
  driver: string;
  people: string;
  peopleNum: number;
  canopyCover: string;
  builtFraction: string;
  buildingHeight: string;
  skyView: number | string;
  albedo: number | string;
  ndvi: number | string;
  windSpeed: string;
  pm25: string;
  lat: number;
  lon: number;
  driverBreakdown: readonly HotspotDriver[];
}

export interface SeasonEnvironment {
  ndvi: number;
  treeCoverPct: number;
  imperviousPct: number;
  buildingDensityPct: number;
  buildingHeightM: number;
  skyViewFactor: number;
  albedo: number;
  airTempC: number;
  humidityPct: number;
  windSpeedMs: number;
  solarRadiationWm2: number;
  pm25UgM3: number;
  populationDensity: number;
}

export interface CitySeasonData {
  peakLst: number;
  meanLst: number;
  minLst: number;
  uhiMean: number;
  uhiMax: number;
  heatIndexMean: number;
  wbgtMean: number;
  hotspotCount: number;
  totalRecords: number;
  hotspotPct: number;
  coolingOpportunity: number;
  env: SeasonEnvironment;
  hotspots: readonly Hotspot[];
}

export type SeasonName = "Summer" | "Monsoon" | "Post_Monsoon" | "Winter";

export interface CityData {
  name: string;
  state: string;
  climateZone: string;
  elevationM: number;
  distanceToCoastKm: number;
  center: { lat: number; lon: number };
  bounds: { minLat: number; maxLat: number; minLon: number; maxLon: number };
  seasons: Record<SeasonName, CitySeasonData>;
}

export const CITIES_DATA: Record<string, CityData> = {
  "Mumbai": {
    "name": "Mumbai",
    "state": "Maharashtra",
    "climateZone": "Tropical Wet Dry",
    "elevationM": 10.833,
    "distanceToCoastKm": 2.0,
    "center": {
      "lat": 19.076332255359926,
      "lon": 72.87751934363396
    },
    "bounds": {
      "minLat": 18.893,
      "maxLat": 19.257,
      "minLon": 72.676,
      "maxLon": 73.094
    },
    "seasons": {
      "Summer": {
        "peakLst": 48.7,
        "meanLst": 37.3,
        "minLst": 24.2,
        "uhiMean": 6.3,
        "uhiMax": 12.0,
        "heatIndexMean": 34.0,
        "wbgtMean": 30.0,
        "hotspotCount": 2634,
        "totalRecords": 8407,
        "hotspotPct": 31.3,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.5,
          "imperviousPct": 59.3,
          "buildingDensityPct": 57.5,
          "buildingHeightM": 58.0,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 32.6,
          "humidityPct": 74.9,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 666.5,
          "pm25UgM3": 75.6,
          "populationDensity": 33174
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Dharavi Junction",
            "risk": "Very high",
            "score": 99,
            "temp": "48.7\u00b0C",
            "lst": 48.7,
            "uhi": 12.0,
            "heat_index": 42.8,
            "wbgt": 36.2,
            "people": "33,336",
            "peopleNum": 33336,
            "driver": "Impervious cover & high density",
            "lat": 19.123,
            "lon": 72.849,
            "canopyCover": "11.3%",
            "builtFraction": "76.4%",
            "buildingHeight": "59.4 m",
            "skyView": 0.6,
            "windSpeed": "3.5 m/s",
            "pm25": "114.2 \u00b5g/m\u00b3",
            "ndvi": 0.17,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h2",
            "name": "Bandra East",
            "risk": "Very high",
            "score": 99,
            "temp": "42.6\u00b0C",
            "lst": 42.6,
            "uhi": 11.3,
            "heat_index": 35.6,
            "wbgt": 31.8,
            "people": "42,977",
            "peopleNum": 42977,
            "driver": "Low canopy & transit corridor",
            "lat": 19.093,
            "lon": 72.88,
            "canopyCover": "16.6%",
            "builtFraction": "87.5%",
            "buildingHeight": "78.5 m",
            "skyView": 0.39,
            "windSpeed": "2.1 m/s",
            "pm25": "101.6 \u00b5g/m\u00b3",
            "ndvi": 0.189,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Kurla West",
            "risk": "Very high",
            "score": 99,
            "temp": "41.4\u00b0C",
            "lst": 41.4,
            "uhi": 10.3,
            "heat_index": 33.4,
            "wbgt": 31.5,
            "people": "33,638",
            "peopleNum": 33638,
            "driver": "Heat storage & built density",
            "lat": 19.101,
            "lon": 72.874,
            "canopyCover": "6.0%",
            "builtFraction": "88.9%",
            "buildingHeight": "73.7 m",
            "skyView": 0.39,
            "windSpeed": "1.8 m/s",
            "pm25": "132.9 \u00b5g/m\u00b3",
            "ndvi": 0.128,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 2.0,
                "weight": 70
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h4",
            "name": "Chembur Colony",
            "risk": "Very high",
            "score": 99,
            "temp": "40.6\u00b0C",
            "lst": 40.6,
            "uhi": 9.6,
            "heat_index": 38.4,
            "wbgt": 34.1,
            "people": "40,187",
            "peopleNum": 40187,
            "driver": "Low ventilation & industrial proximity",
            "lat": 18.99,
            "lon": 72.93,
            "canopyCover": "12.9%",
            "builtFraction": "63.3%",
            "buildingHeight": "41.2 m",
            "skyView": 0.55,
            "windSpeed": "3.2 m/s",
            "pm25": "83.9 \u00b5g/m\u00b3",
            "ndvi": 0.175,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Andheri East (MIDC)",
            "risk": "Very high",
            "score": 98,
            "temp": "39.9\u00b0C",
            "lst": 39.9,
            "uhi": 8.4,
            "heat_index": 33.8,
            "wbgt": 31.3,
            "people": "29,411",
            "peopleNum": 29411,
            "driver": "Commercial roof fraction & traffic",
            "lat": 19.067,
            "lon": 72.965,
            "canopyCover": "21.7%",
            "builtFraction": "66.9%",
            "buildingHeight": "62.7 m",
            "skyView": 0.47,
            "windSpeed": "3.2 m/s",
            "pm25": "88.3 \u00b5g/m\u00b3",
            "ndvi": 0.235,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Dadar Central",
            "risk": "Very high",
            "score": 96,
            "temp": "39.2\u00b0C",
            "lst": 39.2,
            "uhi": 7.8,
            "heat_index": 36.4,
            "wbgt": 32.6,
            "people": "35,881",
            "peopleNum": 35881,
            "driver": "High population & asphalt cover",
            "lat": 19.127,
            "lon": 72.857,
            "canopyCover": "22.5%",
            "builtFraction": "62.7%",
            "buildingHeight": "49.9 m",
            "skyView": 0.56,
            "windSpeed": "2.5 m/s",
            "pm25": "56.1 \u00b5g/m\u00b3",
            "ndvi": 0.247,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Malad Industrial",
            "risk": "Very high",
            "score": 94,
            "temp": "38.7\u00b0C",
            "lst": 38.7,
            "uhi": 7.6,
            "heat_index": 31.3,
            "wbgt": 27.2,
            "people": "55,552",
            "peopleNum": 55552,
            "driver": "Low albedo & metallic roofing",
            "lat": 19.042,
            "lon": 72.903,
            "canopyCover": "21.8%",
            "builtFraction": "66.9%",
            "buildingHeight": "56.9 m",
            "skyView": 0.53,
            "windSpeed": "2.1 m/s",
            "pm25": "71.5 \u00b5g/m\u00b3",
            "ndvi": 0.224,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Ghatkopar West",
            "risk": "Very high",
            "score": 93,
            "temp": "38.2\u00b0C",
            "lst": 38.2,
            "uhi": 7.4,
            "heat_index": 32.7,
            "wbgt": 32.8,
            "people": "36,708",
            "peopleNum": 36708,
            "driver": "Urban canyon & low sky view",
            "lat": 19.105,
            "lon": 72.923,
            "canopyCover": "22.1%",
            "builtFraction": "81.2%",
            "buildingHeight": "67.0 m",
            "skyView": 0.46,
            "windSpeed": "2.1 m/s",
            "pm25": "105.8 \u00b5g/m\u00b3",
            "ndvi": 0.199,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Monsoon": {
        "peakLst": 46.5,
        "meanLst": 34.1,
        "minLst": 20.5,
        "uhiMean": 6.0,
        "uhiMax": 12.0,
        "heatIndexMean": 31.6,
        "wbgtMean": 29.6,
        "hotspotCount": 700,
        "totalRecords": 11158,
        "hotspotPct": 6.3,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.262,
          "treeCoverPct": 25.3,
          "imperviousPct": 59.4,
          "buildingDensityPct": 57.8,
          "buildingHeightM": 58.2,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 29.9,
          "humidityPct": 92.3,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 515.1,
          "pm25UgM3": 41.7,
          "populationDensity": 33228
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Dharavi Junction",
            "risk": "Very high",
            "score": 99,
            "temp": "46.5\u00b0C",
            "lst": 46.5,
            "uhi": 12.0,
            "heat_index": 36.9,
            "wbgt": 35.2,
            "people": "49,912",
            "peopleNum": 49912,
            "driver": "Impervious cover & high density",
            "lat": 19.095,
            "lon": 72.887,
            "canopyCover": "1.6%",
            "builtFraction": "85.7%",
            "buildingHeight": "61.1 m",
            "skyView": 0.47,
            "windSpeed": "2.3 m/s",
            "pm25": "69.5 \u00b5g/m\u00b3",
            "ndvi": 0.072,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Bandra East",
            "risk": "Very high",
            "score": 99,
            "temp": "39.2\u00b0C",
            "lst": 39.2,
            "uhi": 11.4,
            "heat_index": 35.8,
            "wbgt": 33.1,
            "people": "37,399",
            "peopleNum": 37399,
            "driver": "Low canopy & transit corridor",
            "lat": 19.122,
            "lon": 72.907,
            "canopyCover": "19.0%",
            "builtFraction": "74.6%",
            "buildingHeight": "67.8 m",
            "skyView": 0.44,
            "windSpeed": "2.6 m/s",
            "pm25": "48.7 \u00b5g/m\u00b3",
            "ndvi": 0.192,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Kurla West",
            "risk": "Very high",
            "score": 99,
            "temp": "38.1\u00b0C",
            "lst": 38.1,
            "uhi": 10.1,
            "heat_index": 32.1,
            "wbgt": 30.7,
            "people": "42,634",
            "peopleNum": 42634,
            "driver": "Heat storage & built density",
            "lat": 19.072,
            "lon": 72.843,
            "canopyCover": "0.6%",
            "builtFraction": "74.6%",
            "buildingHeight": "60.8 m",
            "skyView": 0.44,
            "windSpeed": "3.4 m/s",
            "pm25": "54.5 \u00b5g/m\u00b3",
            "ndvi": 0.073,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h4",
            "name": "Chembur Colony",
            "risk": "Very high",
            "score": 96,
            "temp": "37.3\u00b0C",
            "lst": 37.3,
            "uhi": 9.4,
            "heat_index": 30.2,
            "wbgt": 29.6,
            "people": "35,309",
            "peopleNum": 35309,
            "driver": "Low ventilation & industrial proximity",
            "lat": 19.085,
            "lon": 72.942,
            "canopyCover": "20.9%",
            "builtFraction": "63.6%",
            "buildingHeight": "61.5 m",
            "skyView": 0.48,
            "windSpeed": "2.2 m/s",
            "pm25": "40.6 \u00b5g/m\u00b3",
            "ndvi": 0.265,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Andheri East (MIDC)",
            "risk": "Very high",
            "score": 94,
            "temp": "36.6\u00b0C",
            "lst": 36.6,
            "uhi": 9.0,
            "heat_index": 34.3,
            "wbgt": 32.9,
            "people": "48,503",
            "peopleNum": 48503,
            "driver": "Commercial roof fraction & traffic",
            "lat": 19.041,
            "lon": 72.938,
            "canopyCover": "24.0%",
            "builtFraction": "69.9%",
            "buildingHeight": "48.3 m",
            "skyView": 0.55,
            "windSpeed": "4.5 m/s",
            "pm25": "47.7 \u00b5g/m\u00b3",
            "ndvi": 0.174,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Dadar Central",
            "risk": "Very high",
            "score": 92,
            "temp": "36.0\u00b0C",
            "lst": 36.0,
            "uhi": 8.5,
            "heat_index": 32.0,
            "wbgt": 30.2,
            "people": "45,111",
            "peopleNum": 45111,
            "driver": "High population & asphalt cover",
            "lat": 19.123,
            "lon": 72.855,
            "canopyCover": "29.1%",
            "builtFraction": "62.3%",
            "buildingHeight": "65.6 m",
            "skyView": 0.58,
            "windSpeed": "2.5 m/s",
            "pm25": "37.9 \u00b5g/m\u00b3",
            "ndvi": 0.319,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h7",
            "name": "Malad Industrial",
            "risk": "Very high",
            "score": 89,
            "temp": "35.4\u00b0C",
            "lst": 35.4,
            "uhi": 8.1,
            "heat_index": 36.7,
            "wbgt": 32.2,
            "people": "18,363",
            "peopleNum": 18363,
            "driver": "Low albedo & metallic roofing",
            "lat": 19.061,
            "lon": 72.883,
            "canopyCover": "47.6%",
            "builtFraction": "46.5%",
            "buildingHeight": "57.9 m",
            "skyView": 0.55,
            "windSpeed": "2.5 m/s",
            "pm25": "33.2 \u00b5g/m\u00b3",
            "ndvi": 0.468,
            "albedo": 0.12,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.0,
                "weight": 35
              },
              {
                "name": "Low tree canopy cover",
                "val": -0.4,
                "weight": -12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.4,
                "weight": 14
              }
            ]
          },
          {
            "id": "h8",
            "name": "Ghatkopar West",
            "risk": "High",
            "score": 86,
            "temp": "34.9\u00b0C",
            "lst": 34.9,
            "uhi": 7.1,
            "heat_index": 29.4,
            "wbgt": 28.0,
            "people": "36,936",
            "peopleNum": 36936,
            "driver": "Urban canyon & low sky view",
            "lat": 19.061,
            "lon": 72.906,
            "canopyCover": "5.6%",
            "builtFraction": "83.2%",
            "buildingHeight": "65.8 m",
            "skyView": 0.52,
            "windSpeed": "2.3 m/s",
            "pm25": "46.5 \u00b5g/m\u00b3",
            "ndvi": 0.136,
            "albedo": 0.28,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          }
        ]
      },
      "Post_Monsoon": {
        "peakLst": 40.9,
        "meanLst": 30.0,
        "minLst": 17.2,
        "uhiMean": 4.5,
        "uhiMax": 12.0,
        "heatIndexMean": 26.1,
        "wbgtMean": 22.9,
        "hotspotCount": 8,
        "totalRecords": 5535,
        "hotspotPct": 0.1,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.5,
          "imperviousPct": 59.0,
          "buildingDensityPct": 57.3,
          "buildingHeightM": 57.9,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 25.5,
          "humidityPct": 74.9,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 603.4,
          "pm25UgM3": 75.6,
          "populationDensity": 33008
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Dharavi Junction",
            "risk": "Very high",
            "score": 99,
            "temp": "40.9\u00b0C",
            "lst": 40.9,
            "uhi": 12.0,
            "heat_index": 31.4,
            "wbgt": 28.6,
            "people": "38,614",
            "peopleNum": 38614,
            "driver": "Impervious cover & high density",
            "lat": 19.116,
            "lon": 72.886,
            "canopyCover": "16.7%",
            "builtFraction": "71.8%",
            "buildingHeight": "66.6 m",
            "skyView": 0.51,
            "windSpeed": "1.9 m/s",
            "pm25": "87.5 \u00b5g/m\u00b3",
            "ndvi": 0.18,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h2",
            "name": "Bandra East",
            "risk": "Very high",
            "score": 95,
            "temp": "35.3\u00b0C",
            "lst": 35.3,
            "uhi": 10.4,
            "heat_index": 28.5,
            "wbgt": 24.7,
            "people": "39,944",
            "peopleNum": 39944,
            "driver": "Low canopy & transit corridor",
            "lat": 19.118,
            "lon": 72.881,
            "canopyCover": "36.3%",
            "builtFraction": "65.6%",
            "buildingHeight": "70.4 m",
            "skyView": 0.45,
            "windSpeed": "3.9 m/s",
            "pm25": "80.2 \u00b5g/m\u00b3",
            "ndvi": 0.38,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": -0.0,
                "weight": 0
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h3",
            "name": "Kurla West",
            "risk": "Very high",
            "score": 89,
            "temp": "34.0\u00b0C",
            "lst": 34.0,
            "uhi": 8.8,
            "heat_index": 26.6,
            "wbgt": 23.6,
            "people": "54,017",
            "peopleNum": 54017,
            "driver": "Heat storage & built density",
            "lat": 19.07,
            "lon": 72.894,
            "canopyCover": "19.9%",
            "builtFraction": "85.9%",
            "buildingHeight": "63.6 m",
            "skyView": 0.61,
            "windSpeed": "2.9 m/s",
            "pm25": "78.9 \u00b5g/m\u00b3",
            "ndvi": 0.259,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Chembur Colony",
            "risk": "High",
            "score": 86,
            "temp": "33.2\u00b0C",
            "lst": 33.2,
            "uhi": 8.1,
            "heat_index": 28.5,
            "wbgt": 24.7,
            "people": "29,074",
            "peopleNum": 29074,
            "driver": "Low ventilation & industrial proximity",
            "lat": 19.076,
            "lon": 72.812,
            "canopyCover": "26.2%",
            "builtFraction": "60.4%",
            "buildingHeight": "59.7 m",
            "skyView": 0.51,
            "windSpeed": "3.9 m/s",
            "pm25": "70.5 \u00b5g/m\u00b3",
            "ndvi": 0.245,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Andheri East (MIDC)",
            "risk": "High",
            "score": 83,
            "temp": "32.5\u00b0C",
            "lst": 32.5,
            "uhi": 7.6,
            "heat_index": 26.4,
            "wbgt": 22.7,
            "people": "38,073",
            "peopleNum": 38073,
            "driver": "Commercial roof fraction & traffic",
            "lat": 19.0,
            "lon": 72.904,
            "canopyCover": "13.6%",
            "builtFraction": "57.1%",
            "buildingHeight": "69.6 m",
            "skyView": 0.43,
            "windSpeed": "2.7 m/s",
            "pm25": "62.2 \u00b5g/m\u00b3",
            "ndvi": 0.161,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h6",
            "name": "Dadar Central",
            "risk": "High",
            "score": 79,
            "temp": "31.9\u00b0C",
            "lst": 31.9,
            "uhi": 6.5,
            "heat_index": 26.4,
            "wbgt": 24.9,
            "people": "26,818",
            "peopleNum": 26818,
            "driver": "High population & asphalt cover",
            "lat": 19.157,
            "lon": 72.911,
            "canopyCover": "13.0%",
            "builtFraction": "62.8%",
            "buildingHeight": "44.0 m",
            "skyView": 0.61,
            "windSpeed": "2.8 m/s",
            "pm25": "70.1 \u00b5g/m\u00b3",
            "ndvi": 0.16,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h7",
            "name": "Malad Industrial",
            "risk": "High",
            "score": 78,
            "temp": "31.4\u00b0C",
            "lst": 31.4,
            "uhi": 6.2,
            "heat_index": 25.3,
            "wbgt": 24.2,
            "people": "52,300",
            "peopleNum": 52300,
            "driver": "Low albedo & metallic roofing",
            "lat": 19.113,
            "lon": 72.895,
            "canopyCover": "14.4%",
            "builtFraction": "81.9%",
            "buildingHeight": "59.2 m",
            "skyView": 0.55,
            "windSpeed": "3.0 m/s",
            "pm25": "110.6 \u00b5g/m\u00b3",
            "ndvi": 0.207,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Ghatkopar West",
            "risk": "High",
            "score": 76,
            "temp": "30.8\u00b0C",
            "lst": 30.8,
            "uhi": 6.0,
            "heat_index": 24.6,
            "wbgt": 21.6,
            "people": "51,597",
            "peopleNum": 51597,
            "driver": "Urban canyon & low sky view",
            "lat": 19.056,
            "lon": 72.837,
            "canopyCover": "19.0%",
            "builtFraction": "74.2%",
            "buildingHeight": "79.1 m",
            "skyView": 0.45,
            "windSpeed": "2.3 m/s",
            "pm25": "67.6 \u00b5g/m\u00b3",
            "ndvi": 0.188,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Winter": {
        "peakLst": 38.6,
        "meanLst": 27.2,
        "minLst": 14.1,
        "uhiMean": 4.2,
        "uhiMax": 12.0,
        "heatIndexMean": 23.0,
        "wbgtMean": 19.0,
        "hotspotCount": 0,
        "totalRecords": 8296,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.263,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.2,
          "buildingDensityPct": 57.2,
          "buildingHeightM": 57.7,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 22.7,
          "humidityPct": 67.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 592.9,
          "pm25UgM3": 120.9,
          "populationDensity": 33097
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Dharavi Junction",
            "risk": "Very high",
            "score": 99,
            "temp": "38.6\u00b0C",
            "lst": 38.6,
            "uhi": 12.0,
            "heat_index": 29.3,
            "wbgt": 26.8,
            "people": "47,825",
            "peopleNum": 47825,
            "driver": "Impervious cover & high density",
            "lat": 19.059,
            "lon": 72.92,
            "canopyCover": "20.5%",
            "builtFraction": "75.6%",
            "buildingHeight": "96.3 m",
            "skyView": 0.35,
            "windSpeed": "1.9 m/s",
            "pm25": "174.8 \u00b5g/m\u00b3",
            "ndvi": 0.171,
            "albedo": 0.27,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 1.0,
                "weight": 32
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h2",
            "name": "Bandra East",
            "risk": "Very high",
            "score": 88,
            "temp": "32.4\u00b0C",
            "lst": 32.4,
            "uhi": 9.5,
            "heat_index": 25.5,
            "wbgt": 22.0,
            "people": "44,303",
            "peopleNum": 44303,
            "driver": "Low canopy & transit corridor",
            "lat": 19.145,
            "lon": 72.844,
            "canopyCover": "7.4%",
            "builtFraction": "75.5%",
            "buildingHeight": "66.8 m",
            "skyView": 0.5,
            "windSpeed": "2.9 m/s",
            "pm25": "148.7 \u00b5g/m\u00b3",
            "ndvi": 0.099,
            "albedo": 0.27,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Kurla West",
            "risk": "High",
            "score": 84,
            "temp": "31.3\u00b0C",
            "lst": 31.3,
            "uhi": 8.9,
            "heat_index": 23.6,
            "wbgt": 20.5,
            "people": "47,089",
            "peopleNum": 47089,
            "driver": "Heat storage & built density",
            "lat": 19.058,
            "lon": 72.915,
            "canopyCover": "11.3%",
            "builtFraction": "77.9%",
            "buildingHeight": "71.8 m",
            "skyView": 0.51,
            "windSpeed": "2.4 m/s",
            "pm25": "126.2 \u00b5g/m\u00b3",
            "ndvi": 0.095,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h4",
            "name": "Chembur Colony",
            "risk": "High",
            "score": 78,
            "temp": "30.4\u00b0C",
            "lst": 30.4,
            "uhi": 7.2,
            "heat_index": 24.3,
            "wbgt": 20.5,
            "people": "26,347",
            "peopleNum": 26347,
            "driver": "Low ventilation & industrial proximity",
            "lat": 19.036,
            "lon": 72.933,
            "canopyCover": "10.4%",
            "builtFraction": "72.1%",
            "buildingHeight": "56.1 m",
            "skyView": 0.56,
            "windSpeed": "2.9 m/s",
            "pm25": "138.7 \u00b5g/m\u00b3",
            "ndvi": 0.124,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Andheri East (MIDC)",
            "risk": "High",
            "score": 75,
            "temp": "29.7\u00b0C",
            "lst": 29.7,
            "uhi": 6.6,
            "heat_index": 21.0,
            "wbgt": 18.7,
            "people": "43,716",
            "peopleNum": 43716,
            "driver": "Commercial roof fraction & traffic",
            "lat": 19.058,
            "lon": 72.86,
            "canopyCover": "24.0%",
            "builtFraction": "76.7%",
            "buildingHeight": "71.2 m",
            "skyView": 0.42,
            "windSpeed": "3.0 m/s",
            "pm25": "137.5 \u00b5g/m\u00b3",
            "ndvi": 0.228,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Dadar Central",
            "risk": "Moderate",
            "score": 69,
            "temp": "29.1\u00b0C",
            "lst": 29.1,
            "uhi": 4.4,
            "heat_index": 25.0,
            "wbgt": 22.0,
            "people": "46,700",
            "peopleNum": 46700,
            "driver": "High population & asphalt cover",
            "lat": 19.054,
            "lon": 72.907,
            "canopyCover": "20.5%",
            "builtFraction": "57.1%",
            "buildingHeight": "65.0 m",
            "skyView": 0.47,
            "windSpeed": "2.9 m/s",
            "pm25": "120.3 \u00b5g/m\u00b3",
            "ndvi": 0.159,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h7",
            "name": "Malad Industrial",
            "risk": "Moderate",
            "score": 70,
            "temp": "28.6\u00b0C",
            "lst": 28.6,
            "uhi": 5.2,
            "heat_index": 23.9,
            "wbgt": 19.9,
            "people": "52,212",
            "peopleNum": 52212,
            "driver": "Low albedo & metallic roofing",
            "lat": 19.059,
            "lon": 72.896,
            "canopyCover": "36.5%",
            "builtFraction": "63.5%",
            "buildingHeight": "69.8 m",
            "skyView": 0.47,
            "windSpeed": "2.1 m/s",
            "pm25": "122.8 \u00b5g/m\u00b3",
            "ndvi": 0.34,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": -0.0,
                "weight": 0
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h8",
            "name": "Ghatkopar West",
            "risk": "Moderate",
            "score": 71,
            "temp": "28.0\u00b0C",
            "lst": 28.0,
            "uhi": 5.9,
            "heat_index": 23.5,
            "wbgt": 19.0,
            "people": "29,784",
            "peopleNum": 29784,
            "driver": "Urban canyon & low sky view",
            "lat": 19.059,
            "lon": 72.831,
            "canopyCover": "16.1%",
            "builtFraction": "66.1%",
            "buildingHeight": "55.4 m",
            "skyView": 0.5,
            "windSpeed": "2.8 m/s",
            "pm25": "155.6 \u00b5g/m\u00b3",
            "ndvi": 0.229,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      }
    }
  },
  "Delhi": {
    "name": "Delhi",
    "state": "Delhi",
    "climateZone": "Semi Arid",
    "elevationM": 216.103,
    "distanceToCoastKm": 900.0,
    "center": {
      "lat": 28.703547554144325,
      "lon": 77.10243618009166
    },
    "bounds": {
      "minLat": 28.503,
      "maxLat": 28.904,
      "minLon": 76.908,
      "maxLon": 77.298
    },
    "seasons": {
      "Summer": {
        "peakLst": 54.2,
        "meanLst": 43.2,
        "minLst": 29.2,
        "uhiMean": 6.1,
        "uhiMax": 12.0,
        "heatIndexMean": 38.2,
        "wbgtMean": 31.2,
        "hotspotCount": 3296,
        "totalRecords": 8346,
        "hotspotPct": 39.5,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.0,
          "buildingDensityPct": 57.5,
          "buildingHeightM": 58.0,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 37.9,
          "humidityPct": 45.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 664.8,
          "pm25UgM3": 69.7,
          "populationDensity": 13858
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Anand Vihar ISBT",
            "risk": "Very high",
            "score": 99,
            "temp": "54.2\u00b0C",
            "lst": 54.2,
            "uhi": 12.0,
            "heat_index": 42.3,
            "wbgt": 37.2,
            "people": "22,600",
            "peopleNum": 22600,
            "driver": "Traffic exhaust & low vegetation",
            "lat": 28.686,
            "lon": 77.117,
            "canopyCover": "8.6%",
            "builtFraction": "84.0%",
            "buildingHeight": "66.0 m",
            "skyView": 0.44,
            "windSpeed": "2.5 m/s",
            "pm25": "107.7 \u00b5g/m\u00b3",
            "ndvi": 0.12,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Okhla Industrial Phase II",
            "risk": "Very high",
            "score": 99,
            "temp": "48.4\u00b0C",
            "lst": 48.4,
            "uhi": 11.8,
            "heat_index": 37.5,
            "wbgt": 30.1,
            "people": "12,425",
            "peopleNum": 12425,
            "driver": "Impervious asphalt & roof heat storage",
            "lat": 28.686,
            "lon": 77.077,
            "canopyCover": "7.6%",
            "builtFraction": "77.6%",
            "buildingHeight": "72.3 m",
            "skyView": 0.39,
            "windSpeed": "3.2 m/s",
            "pm25": "84.8 \u00b5g/m\u00b3",
            "ndvi": 0.047,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h3",
            "name": "Chandni Chowk",
            "risk": "Very high",
            "score": 99,
            "temp": "47.2\u00b0C",
            "lst": 47.2,
            "uhi": 10.3,
            "heat_index": 38.9,
            "wbgt": 34.4,
            "people": "19,528",
            "peopleNum": 19528,
            "driver": "High building density & low sky view",
            "lat": 28.759,
            "lon": 77.12,
            "canopyCover": "22.1%",
            "builtFraction": "83.9%",
            "buildingHeight": "65.6 m",
            "skyView": 0.45,
            "windSpeed": "3.3 m/s",
            "pm25": "105.6 \u00b5g/m\u00b3",
            "ndvi": 0.18,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Connaught Place Outer",
            "risk": "Very high",
            "score": 99,
            "temp": "46.4\u00b0C",
            "lst": 46.4,
            "uhi": 10.3,
            "heat_index": 39.8,
            "wbgt": 34.0,
            "people": "21,047",
            "peopleNum": 21047,
            "driver": "Asphalt radiation & vehicular heat",
            "lat": 28.666,
            "lon": 77.131,
            "canopyCover": "23.0%",
            "builtFraction": "71.0%",
            "buildingHeight": "49.4 m",
            "skyView": 0.61,
            "windSpeed": "2.1 m/s",
            "pm25": "66.0 \u00b5g/m\u00b3",
            "ndvi": 0.259,
            "albedo": 0.17,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Rohini Sector 10",
            "risk": "Very high",
            "score": 99,
            "temp": "45.8\u00b0C",
            "lst": 45.8,
            "uhi": 9.2,
            "heat_index": 38.8,
            "wbgt": 32.0,
            "people": "21,465",
            "peopleNum": 21465,
            "driver": "Concrete cover & dry air advection",
            "lat": 28.697,
            "lon": 77.122,
            "canopyCover": "8.8%",
            "builtFraction": "66.9%",
            "buildingHeight": "65.7 m",
            "skyView": 0.51,
            "windSpeed": "4.0 m/s",
            "pm25": "56.6 \u00b5g/m\u00b3",
            "ndvi": 0.203,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Dwarka Sector 6",
            "risk": "Very high",
            "score": 99,
            "temp": "45.1\u00b0C",
            "lst": 45.1,
            "uhi": 7.9,
            "heat_index": 38.6,
            "wbgt": 33.0,
            "people": "11,030",
            "peopleNum": 11030,
            "driver": "Wide paved corridors & low canopy",
            "lat": 28.756,
            "lon": 77.156,
            "canopyCover": "19.4%",
            "builtFraction": "63.6%",
            "buildingHeight": "59.8 m",
            "skyView": 0.54,
            "windSpeed": "2.6 m/s",
            "pm25": "96.1 \u00b5g/m\u00b3",
            "ndvi": 0.213,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Karol Bagh Market",
            "risk": "Very high",
            "score": 99,
            "temp": "44.6\u00b0C",
            "lst": 44.6,
            "uhi": 8.2,
            "heat_index": 36.5,
            "wbgt": 30.6,
            "people": "24,103",
            "peopleNum": 24103,
            "driver": "Dense commercial roofing & AC heat rejection",
            "lat": 28.719,
            "lon": 77.054,
            "canopyCover": "23.2%",
            "builtFraction": "77.1%",
            "buildingHeight": "70.9 m",
            "skyView": 0.41,
            "windSpeed": "2.4 m/s",
            "pm25": "90.0 \u00b5g/m\u00b3",
            "ndvi": 0.176,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Laxmi Nagar",
            "risk": "Very high",
            "score": 99,
            "temp": "44.1\u00b0C",
            "lst": 44.1,
            "uhi": 7.8,
            "heat_index": 36.7,
            "wbgt": 29.7,
            "people": "15,932",
            "peopleNum": 15932,
            "driver": "High population density & low albedo",
            "lat": 28.68,
            "lon": 77.16,
            "canopyCover": "27.0%",
            "builtFraction": "67.9%",
            "buildingHeight": "73.5 m",
            "skyView": 0.45,
            "windSpeed": "4.0 m/s",
            "pm25": "55.4 \u00b5g/m\u00b3",
            "ndvi": 0.295,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Monsoon": {
        "peakLst": 47.4,
        "meanLst": 35.9,
        "minLst": 22.9,
        "uhiMean": 5.9,
        "uhiMax": 12.0,
        "heatIndexMean": 32.1,
        "wbgtMean": 27.0,
        "hotspotCount": 44,
        "totalRecords": 11318,
        "hotspotPct": 0.4,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.265,
          "treeCoverPct": 25.5,
          "imperviousPct": 59.1,
          "buildingDensityPct": 57.2,
          "buildingHeightM": 57.8,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 31.2,
          "humidityPct": 63.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 515.7,
          "pm25UgM3": 38.3,
          "populationDensity": 13853
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Anand Vihar ISBT",
            "risk": "Very high",
            "score": 99,
            "temp": "47.4\u00b0C",
            "lst": 47.4,
            "uhi": 12.0,
            "heat_index": 38.2,
            "wbgt": 34.6,
            "people": "17,902",
            "peopleNum": 17902,
            "driver": "Traffic exhaust & low vegetation",
            "lat": 28.729,
            "lon": 77.135,
            "canopyCover": "5.7%",
            "builtFraction": "84.8%",
            "buildingHeight": "72.6 m",
            "skyView": 0.38,
            "windSpeed": "2.1 m/s",
            "pm25": "53.3 \u00b5g/m\u00b3",
            "ndvi": 0.082,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Okhla Industrial Phase II",
            "risk": "Very high",
            "score": 99,
            "temp": "41.2\u00b0C",
            "lst": 41.2,
            "uhi": 11.5,
            "heat_index": 35.0,
            "wbgt": 30.5,
            "people": "11,136",
            "peopleNum": 11136,
            "driver": "Impervious asphalt & roof heat storage",
            "lat": 28.647,
            "lon": 77.041,
            "canopyCover": "16.7%",
            "builtFraction": "58.0%",
            "buildingHeight": "63.1 m",
            "skyView": 0.54,
            "windSpeed": "2.6 m/s",
            "pm25": "36.0 \u00b5g/m\u00b3",
            "ndvi": 0.208,
            "albedo": 0.16,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Chandni Chowk",
            "risk": "Very high",
            "score": 99,
            "temp": "40.0\u00b0C",
            "lst": 40.0,
            "uhi": 9.3,
            "heat_index": 34.7,
            "wbgt": 28.6,
            "people": "11,662",
            "peopleNum": 11662,
            "driver": "High building density & low sky view",
            "lat": 28.784,
            "lon": 77.145,
            "canopyCover": "27.8%",
            "builtFraction": "67.7%",
            "buildingHeight": "61.4 m",
            "skyView": 0.44,
            "windSpeed": "3.7 m/s",
            "pm25": "38.7 \u00b5g/m\u00b3",
            "ndvi": 0.288,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h4",
            "name": "Connaught Place Outer",
            "risk": "Very high",
            "score": 99,
            "temp": "39.1\u00b0C",
            "lst": 39.1,
            "uhi": 9.5,
            "heat_index": 32.7,
            "wbgt": 27.4,
            "people": "15,933",
            "peopleNum": 15933,
            "driver": "Asphalt radiation & vehicular heat",
            "lat": 28.722,
            "lon": 77.124,
            "canopyCover": "10.9%",
            "builtFraction": "75.5%",
            "buildingHeight": "62.3 m",
            "skyView": 0.46,
            "windSpeed": "9.3 m/s",
            "pm25": "50.0 \u00b5g/m\u00b3",
            "ndvi": 0.117,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Rohini Sector 10",
            "risk": "Very high",
            "score": 96,
            "temp": "38.4\u00b0C",
            "lst": 38.4,
            "uhi": 8.4,
            "heat_index": 31.8,
            "wbgt": 27.2,
            "people": "23,380",
            "peopleNum": 23380,
            "driver": "Concrete cover & dry air advection",
            "lat": 28.727,
            "lon": 77.127,
            "canopyCover": "16.5%",
            "builtFraction": "76.4%",
            "buildingHeight": "72.1 m",
            "skyView": 0.34,
            "windSpeed": "2.0 m/s",
            "pm25": "41.6 \u00b5g/m\u00b3",
            "ndvi": 0.188,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Dwarka Sector 6",
            "risk": "Very high",
            "score": 92,
            "temp": "37.8\u00b0C",
            "lst": 37.8,
            "uhi": 7.5,
            "heat_index": 30.5,
            "wbgt": 26.9,
            "people": "12,796",
            "peopleNum": 12796,
            "driver": "Wide paved corridors & low canopy",
            "lat": 28.679,
            "lon": 77.183,
            "canopyCover": "16.0%",
            "builtFraction": "65.5%",
            "buildingHeight": "74.6 m",
            "skyView": 0.42,
            "windSpeed": "2.8 m/s",
            "pm25": "59.6 \u00b5g/m\u00b3",
            "ndvi": 0.201,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Karol Bagh Market",
            "risk": "Very high",
            "score": 92,
            "temp": "37.3\u00b0C",
            "lst": 37.3,
            "uhi": 7.6,
            "heat_index": 33.8,
            "wbgt": 28.7,
            "people": "13,253",
            "peopleNum": 13253,
            "driver": "Dense commercial roofing & AC heat rejection",
            "lat": 28.757,
            "lon": 77.054,
            "canopyCover": "36.4%",
            "builtFraction": "67.9%",
            "buildingHeight": "55.9 m",
            "skyView": 0.67,
            "windSpeed": "2.5 m/s",
            "pm25": "58.3 \u00b5g/m\u00b3",
            "ndvi": 0.314,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": -0.0,
                "weight": 0
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h8",
            "name": "Laxmi Nagar",
            "risk": "Very high",
            "score": 89,
            "temp": "36.7\u00b0C",
            "lst": 36.7,
            "uhi": 7.0,
            "heat_index": 32.8,
            "wbgt": 27.2,
            "people": "14,454",
            "peopleNum": 14454,
            "driver": "High population density & low albedo",
            "lat": 28.68,
            "lon": 77.156,
            "canopyCover": "25.5%",
            "builtFraction": "60.9%",
            "buildingHeight": "55.1 m",
            "skyView": 0.55,
            "windSpeed": "4.3 m/s",
            "pm25": "35.7 \u00b5g/m\u00b3",
            "ndvi": 0.24,
            "albedo": 0.17,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Post_Monsoon": {
        "peakLst": 36.5,
        "meanLst": 25.9,
        "minLst": 11.0,
        "uhiMean": 4.4,
        "uhiMax": 12.0,
        "heatIndexMean": 20.9,
        "wbgtMean": 14.2,
        "hotspotCount": 0,
        "totalRecords": 5649,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.263,
          "treeCoverPct": 25.5,
          "imperviousPct": 59.0,
          "buildingDensityPct": 57.3,
          "buildingHeightM": 57.8,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 20.8,
          "humidityPct": 45.1,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 606.8,
          "pm25UgM3": 69.7,
          "populationDensity": 13859
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Anand Vihar ISBT",
            "risk": "Very high",
            "score": 99,
            "temp": "36.5\u00b0C",
            "lst": 36.5,
            "uhi": 12.0,
            "heat_index": 25.7,
            "wbgt": 20.0,
            "people": "19,004",
            "peopleNum": 19004,
            "driver": "Traffic exhaust & low vegetation",
            "lat": 28.664,
            "lon": 77.118,
            "canopyCover": "1.4%",
            "builtFraction": "79.4%",
            "buildingHeight": "64.6 m",
            "skyView": 0.49,
            "windSpeed": "3.2 m/s",
            "pm25": "79.3 \u00b5g/m\u00b3",
            "ndvi": 0.103,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Okhla Industrial Phase II",
            "risk": "High",
            "score": 85,
            "temp": "31.1\u00b0C",
            "lst": 31.1,
            "uhi": 9.6,
            "heat_index": 23.0,
            "wbgt": 17.3,
            "people": "26,891",
            "peopleNum": 26891,
            "driver": "Impervious asphalt & roof heat storage",
            "lat": 28.728,
            "lon": 77.121,
            "canopyCover": "15.3%",
            "builtFraction": "73.0%",
            "buildingHeight": "79.3 m",
            "skyView": 0.36,
            "windSpeed": "1.9 m/s",
            "pm25": "116.0 \u00b5g/m\u00b3",
            "ndvi": 0.214,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Chandni Chowk",
            "risk": "High",
            "score": 83,
            "temp": "29.9\u00b0C",
            "lst": 29.9,
            "uhi": 9.6,
            "heat_index": 21.2,
            "wbgt": 13.8,
            "people": "13,563",
            "peopleNum": 13563,
            "driver": "High building density & low sky view",
            "lat": 28.699,
            "lon": 77.077,
            "canopyCover": "22.9%",
            "builtFraction": "74.4%",
            "buildingHeight": "77.9 m",
            "skyView": 0.38,
            "windSpeed": "2.2 m/s",
            "pm25": "78.5 \u00b5g/m\u00b3",
            "ndvi": 0.282,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h4",
            "name": "Connaught Place Outer",
            "risk": "High",
            "score": 75,
            "temp": "29.1\u00b0C",
            "lst": 29.1,
            "uhi": 6.9,
            "heat_index": 19.9,
            "wbgt": 15.6,
            "people": "20,267",
            "peopleNum": 20267,
            "driver": "Asphalt radiation & vehicular heat",
            "lat": 28.708,
            "lon": 77.087,
            "canopyCover": "20.4%",
            "builtFraction": "82.7%",
            "buildingHeight": "69.4 m",
            "skyView": 0.42,
            "windSpeed": "2.7 m/s",
            "pm25": "69.7 \u00b5g/m\u00b3",
            "ndvi": 0.236,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Rohini Sector 10",
            "risk": "Moderate",
            "score": 74,
            "temp": "28.4\u00b0C",
            "lst": 28.4,
            "uhi": 6.9,
            "heat_index": 22.4,
            "wbgt": 17.3,
            "people": "13,398",
            "peopleNum": 13398,
            "driver": "Concrete cover & dry air advection",
            "lat": 28.685,
            "lon": 77.129,
            "canopyCover": "22.1%",
            "builtFraction": "57.6%",
            "buildingHeight": "70.3 m",
            "skyView": 0.42,
            "windSpeed": "2.4 m/s",
            "pm25": "77.3 \u00b5g/m\u00b3",
            "ndvi": 0.249,
            "albedo": 0.16,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Dwarka Sector 6",
            "risk": "Moderate",
            "score": 71,
            "temp": "27.8\u00b0C",
            "lst": 27.8,
            "uhi": 6.1,
            "heat_index": 21.6,
            "wbgt": 14.9,
            "people": "14,771",
            "peopleNum": 14771,
            "driver": "Wide paved corridors & low canopy",
            "lat": 28.755,
            "lon": 77.069,
            "canopyCover": "20.6%",
            "builtFraction": "70.0%",
            "buildingHeight": "58.9 m",
            "skyView": 0.46,
            "windSpeed": "2.3 m/s",
            "pm25": "93.5 \u00b5g/m\u00b3",
            "ndvi": 0.237,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Karol Bagh Market",
            "risk": "Moderate",
            "score": 70,
            "temp": "27.3\u00b0C",
            "lst": 27.3,
            "uhi": 6.1,
            "heat_index": 22.7,
            "wbgt": 15.4,
            "people": "13,450",
            "peopleNum": 13450,
            "driver": "Dense commercial roofing & AC heat rejection",
            "lat": 28.595,
            "lon": 76.998,
            "canopyCover": "22.5%",
            "builtFraction": "65.9%",
            "buildingHeight": "51.7 m",
            "skyView": 0.57,
            "windSpeed": "3.0 m/s",
            "pm25": "71.7 \u00b5g/m\u00b3",
            "ndvi": 0.276,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Laxmi Nagar",
            "risk": "Moderate",
            "score": 67,
            "temp": "26.7\u00b0C",
            "lst": 26.7,
            "uhi": 5.2,
            "heat_index": 16.8,
            "wbgt": 10.7,
            "people": "15,312",
            "peopleNum": 15312,
            "driver": "High population density & low albedo",
            "lat": 28.627,
            "lon": 77.037,
            "canopyCover": "21.1%",
            "builtFraction": "72.1%",
            "buildingHeight": "67.1 m",
            "skyView": 0.44,
            "windSpeed": "3.0 m/s",
            "pm25": "91.8 \u00b5g/m\u00b3",
            "ndvi": 0.172,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Winter": {
        "peakLst": 27.6,
        "meanLst": 17.1,
        "minLst": 8.0,
        "uhiMean": 4.1,
        "uhiMax": 12.0,
        "heatIndexMean": 12.1,
        "wbgtMean": 5.6,
        "hotspotCount": 0,
        "totalRecords": 8070,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.1,
          "buildingDensityPct": 57.5,
          "buildingHeightM": 57.8,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 12.1,
          "humidityPct": 37.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 594.0,
          "pm25UgM3": 111.3,
          "populationDensity": 13851
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Anand Vihar ISBT",
            "risk": "High",
            "score": 85,
            "temp": "27.6\u00b0C",
            "lst": 27.6,
            "uhi": 12.0,
            "heat_index": 14.3,
            "wbgt": 8.4,
            "people": "16,499",
            "peopleNum": 16499,
            "driver": "Traffic exhaust & low vegetation",
            "lat": 28.739,
            "lon": 77.099,
            "canopyCover": "13.1%",
            "builtFraction": "85.5%",
            "buildingHeight": "65.7 m",
            "skyView": 0.42,
            "windSpeed": "2.0 m/s",
            "pm25": "165.2 \u00b5g/m\u00b3",
            "ndvi": 0.141,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Okhla Industrial Phase II",
            "risk": "Moderate",
            "score": 70,
            "temp": "22.3\u00b0C",
            "lst": 22.3,
            "uhi": 9.6,
            "heat_index": 10.5,
            "wbgt": 5.0,
            "people": "22,945",
            "peopleNum": 22945,
            "driver": "Impervious asphalt & roof heat storage",
            "lat": 28.745,
            "lon": 77.071,
            "canopyCover": "0.0%",
            "builtFraction": "80.7%",
            "buildingHeight": "75.1 m",
            "skyView": 0.45,
            "windSpeed": "2.0 m/s",
            "pm25": "152.2 \u00b5g/m\u00b3",
            "ndvi": 0.021,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h3",
            "name": "Chandni Chowk",
            "risk": "Moderate",
            "score": 65,
            "temp": "21.2\u00b0C",
            "lst": 21.2,
            "uhi": 8.4,
            "heat_index": 13.8,
            "wbgt": 7.8,
            "people": "17,319",
            "peopleNum": 17319,
            "driver": "High building density & low sky view",
            "lat": 28.781,
            "lon": 77.126,
            "canopyCover": "20.4%",
            "builtFraction": "71.7%",
            "buildingHeight": "62.5 m",
            "skyView": 0.5,
            "windSpeed": "2.5 m/s",
            "pm25": "106.0 \u00b5g/m\u00b3",
            "ndvi": 0.197,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Connaught Place Outer",
            "risk": "Moderate",
            "score": 65,
            "temp": "20.4\u00b0C",
            "lst": 20.4,
            "uhi": 6.7,
            "heat_index": 11.1,
            "wbgt": 5.0,
            "people": "16,805",
            "peopleNum": 16805,
            "driver": "Asphalt radiation & vehicular heat",
            "lat": 28.693,
            "lon": 77.053,
            "canopyCover": "11.7%",
            "builtFraction": "78.0%",
            "buildingHeight": "72.5 m",
            "skyView": 0.39,
            "windSpeed": "2.9 m/s",
            "pm25": "105.2 \u00b5g/m\u00b3",
            "ndvi": 0.162,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Rohini Sector 10",
            "risk": "Moderate",
            "score": 65,
            "temp": "19.6\u00b0C",
            "lst": 19.6,
            "uhi": 6.4,
            "heat_index": 10.0,
            "wbgt": 5.0,
            "people": "11,221",
            "peopleNum": 11221,
            "driver": "Concrete cover & dry air advection",
            "lat": 28.684,
            "lon": 77.085,
            "canopyCover": "6.8%",
            "builtFraction": "69.4%",
            "buildingHeight": "69.2 m",
            "skyView": 0.46,
            "windSpeed": "4.0 m/s",
            "pm25": "107.4 \u00b5g/m\u00b3",
            "ndvi": 0.098,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h6",
            "name": "Dwarka Sector 6",
            "risk": "Moderate",
            "score": 65,
            "temp": "19.0\u00b0C",
            "lst": 19.0,
            "uhi": 6.4,
            "heat_index": 10.5,
            "wbgt": 5.0,
            "people": "16,711",
            "peopleNum": 16711,
            "driver": "Wide paved corridors & low canopy",
            "lat": 28.724,
            "lon": 77.053,
            "canopyCover": "24.4%",
            "builtFraction": "74.2%",
            "buildingHeight": "65.2 m",
            "skyView": 0.45,
            "windSpeed": "2.2 m/s",
            "pm25": "111.0 \u00b5g/m\u00b3",
            "ndvi": 0.261,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 1.0,
                "weight": 32
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Karol Bagh Market",
            "risk": "Moderate",
            "score": 65,
            "temp": "18.5\u00b0C",
            "lst": 18.5,
            "uhi": 5.4,
            "heat_index": 12.9,
            "wbgt": 5.0,
            "people": "13,922",
            "peopleNum": 13922,
            "driver": "Dense commercial roofing & AC heat rejection",
            "lat": 28.658,
            "lon": 77.033,
            "canopyCover": "28.7%",
            "builtFraction": "60.7%",
            "buildingHeight": "49.4 m",
            "skyView": 0.61,
            "windSpeed": "3.8 m/s",
            "pm25": "80.6 \u00b5g/m\u00b3",
            "ndvi": 0.278,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h8",
            "name": "Laxmi Nagar",
            "risk": "Moderate",
            "score": 65,
            "temp": "17.9\u00b0C",
            "lst": 17.9,
            "uhi": 4.6,
            "heat_index": 11.7,
            "wbgt": 5.0,
            "people": "10,125",
            "peopleNum": 10125,
            "driver": "High population density & low albedo",
            "lat": 28.702,
            "lon": 77.073,
            "canopyCover": "15.3%",
            "builtFraction": "65.5%",
            "buildingHeight": "53.4 m",
            "skyView": 0.5,
            "windSpeed": "3.1 m/s",
            "pm25": "114.1 \u00b5g/m\u00b3",
            "ndvi": 0.181,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      }
    }
  },
  "Bengaluru": {
    "name": "Bengaluru",
    "state": "Karnataka",
    "climateZone": "Tropical Savanna",
    "elevationM": 920.022,
    "distanceToCoastKm": 300.0,
    "center": {
      "lat": 12.971235622407258,
      "lon": 77.59429346106783
    },
    "bounds": {
      "minLat": 12.74,
      "maxLat": 13.17,
      "minLon": 77.408,
      "maxLon": 77.788
    },
    "seasons": {
      "Summer": {
        "peakLst": 43.9,
        "meanLst": 31.8,
        "minLst": 18.2,
        "uhiMean": 3.9,
        "uhiMax": 12.0,
        "heatIndexMean": 26.9,
        "wbgtMean": 22.0,
        "hotspotCount": 3125,
        "totalRecords": 8472,
        "hotspotPct": 36.9,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.262,
          "treeCoverPct": 25.3,
          "imperviousPct": 59.4,
          "buildingDensityPct": 57.6,
          "buildingHeightM": 58.0,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 26.5,
          "humidityPct": 60.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 665.9,
          "pm25UgM3": 70.1,
          "populationDensity": 14775
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Peenya Industrial Area",
            "risk": "Very high",
            "score": 99,
            "temp": "43.9\u00b0C",
            "lst": 43.9,
            "uhi": 12.0,
            "heat_index": 32.0,
            "wbgt": 27.4,
            "people": "21,661",
            "peopleNum": 21661,
            "driver": "Low canopy cover & metal roofs",
            "lat": 12.978,
            "lon": 77.613,
            "canopyCover": "4.4%",
            "builtFraction": "91.7%",
            "buildingHeight": "96.8 m",
            "skyView": 0.25,
            "windSpeed": "3.9 m/s",
            "pm25": "113.7 \u00b5g/m\u00b3",
            "ndvi": 0.006,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 2.0,
                "weight": 70
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 1.0,
                "weight": 32
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h2",
            "name": "Electronic City Phase 1",
            "risk": "Very high",
            "score": 96,
            "temp": "37.1\u00b0C",
            "lst": 37.1,
            "uhi": 9.4,
            "heat_index": 26.7,
            "wbgt": 22.8,
            "people": "15,593",
            "peopleNum": 15593,
            "driver": "Paved glass-building corridors",
            "lat": 13.001,
            "lon": 77.628,
            "canopyCover": "12.0%",
            "builtFraction": "84.9%",
            "buildingHeight": "64.1 m",
            "skyView": 0.36,
            "windSpeed": "3.0 m/s",
            "pm25": "96.7 \u00b5g/m\u00b3",
            "ndvi": 0.102,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Whitefield IT Hub",
            "risk": "Very high",
            "score": 90,
            "temp": "35.9\u00b0C",
            "lst": 35.9,
            "uhi": 7.8,
            "heat_index": 27.2,
            "wbgt": 23.3,
            "people": "12,869",
            "peopleNum": 12869,
            "driver": "Asphalt parking & reduced green buffer",
            "lat": 12.992,
            "lon": 77.601,
            "canopyCover": "5.7%",
            "builtFraction": "71.8%",
            "buildingHeight": "80.9 m",
            "skyView": 0.38,
            "windSpeed": "2.8 m/s",
            "pm25": "79.7 \u00b5g/m\u00b3",
            "ndvi": 0.032,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h4",
            "name": "Majestic Bus Terminal",
            "risk": "High",
            "score": 86,
            "temp": "35.1\u00b0C",
            "lst": 35.1,
            "uhi": 7.0,
            "heat_index": 29.2,
            "wbgt": 24.1,
            "people": "20,705",
            "peopleNum": 20705,
            "driver": "High diesel traffic & concrete surface",
            "lat": 13.037,
            "lon": 77.597,
            "canopyCover": "17.2%",
            "builtFraction": "62.1%",
            "buildingHeight": "65.5 m",
            "skyView": 0.44,
            "windSpeed": "2.9 m/s",
            "pm25": "85.4 \u00b5g/m\u00b3",
            "ndvi": 0.208,
            "albedo": 0.16,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Marathahalli Junction",
            "risk": "High",
            "score": 82,
            "temp": "34.4\u00b0C",
            "lst": 34.4,
            "uhi": 5.8,
            "heat_index": 27.8,
            "wbgt": 22.5,
            "people": "22,298",
            "peopleNum": 22298,
            "driver": "High vehicular congestion & low shade",
            "lat": 12.959,
            "lon": 77.576,
            "canopyCover": "17.4%",
            "builtFraction": "70.2%",
            "buildingHeight": "57.3 m",
            "skyView": 0.57,
            "windSpeed": "5.1 m/s",
            "pm25": "51.9 \u00b5g/m\u00b3",
            "ndvi": 0.264,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Koramangala 5th Block",
            "risk": "High",
            "score": 81,
            "temp": "33.8\u00b0C",
            "lst": 33.8,
            "uhi": 6.0,
            "heat_index": 26.5,
            "wbgt": 23.1,
            "people": "18,891",
            "peopleNum": 18891,
            "driver": "Dense built-up fraction",
            "lat": 13.038,
            "lon": 77.562,
            "canopyCover": "28.7%",
            "builtFraction": "63.9%",
            "buildingHeight": "63.8 m",
            "skyView": 0.52,
            "windSpeed": "2.3 m/s",
            "pm25": "58.7 \u00b5g/m\u00b3",
            "ndvi": 0.271,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Hebbal Flyover Junction",
            "risk": "High",
            "score": 77,
            "temp": "33.2\u00b0C",
            "lst": 33.2,
            "uhi": 4.8,
            "heat_index": 26.9,
            "wbgt": 22.6,
            "people": "18,722",
            "peopleNum": 18722,
            "driver": "Extensive concrete infrastructure",
            "lat": 12.923,
            "lon": 77.595,
            "canopyCover": "30.0%",
            "builtFraction": "53.0%",
            "buildingHeight": "53.3 m",
            "skyView": 0.57,
            "windSpeed": "3.2 m/s",
            "pm25": "64.0 \u00b5g/m\u00b3",
            "ndvi": 0.239,
            "albedo": 0.15,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Yeshwanthpur Industrial",
            "risk": "High",
            "score": 78,
            "temp": "32.6\u00b0C",
            "lst": 32.6,
            "uhi": 5.4,
            "heat_index": 27.4,
            "wbgt": 23.0,
            "people": "8,344",
            "peopleNum": 8344,
            "driver": "Roof heat retention & low ventilation",
            "lat": 12.916,
            "lon": 77.521,
            "canopyCover": "39.9%",
            "builtFraction": "56.4%",
            "buildingHeight": "45.2 m",
            "skyView": 0.56,
            "windSpeed": "2.7 m/s",
            "pm25": "66.5 \u00b5g/m\u00b3",
            "ndvi": 0.38,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": -0.1,
                "weight": -3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Monsoon": {
        "peakLst": 37.4,
        "meanLst": 26.5,
        "minLst": 13.4,
        "uhiMean": 3.6,
        "uhiMax": 12.0,
        "heatIndexMean": 22.1,
        "wbgtMean": 19.7,
        "hotspotCount": 228,
        "totalRecords": 11203,
        "hotspotPct": 2.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.265,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.2,
          "buildingDensityPct": 57.4,
          "buildingHeightM": 58.0,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 21.9,
          "humidityPct": 78.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 515.8,
          "pm25UgM3": 38.4,
          "populationDensity": 14729
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Peenya Industrial Area",
            "risk": "Very high",
            "score": 99,
            "temp": "37.4\u00b0C",
            "lst": 37.4,
            "uhi": 12.0,
            "heat_index": 25.3,
            "wbgt": 24.7,
            "people": "23,807",
            "peopleNum": 23807,
            "driver": "Low canopy cover & metal roofs",
            "lat": 12.945,
            "lon": 77.591,
            "canopyCover": "14.0%",
            "builtFraction": "90.9%",
            "buildingHeight": "76.6 m",
            "skyView": 0.3,
            "windSpeed": "3.2 m/s",
            "pm25": "59.4 \u00b5g/m\u00b3",
            "ndvi": 0.152,
            "albedo": 0.29,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 2.0,
                "weight": 70
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 1.0,
                "weight": 32
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Electronic City Phase 1",
            "risk": "High",
            "score": 86,
            "temp": "31.8\u00b0C",
            "lst": 31.8,
            "uhi": 9.5,
            "heat_index": 22.6,
            "wbgt": 18.5,
            "people": "22,141",
            "peopleNum": 22141,
            "driver": "Paved glass-building corridors",
            "lat": 12.979,
            "lon": 77.552,
            "canopyCover": "14.5%",
            "builtFraction": "72.1%",
            "buildingHeight": "57.1 m",
            "skyView": 0.42,
            "windSpeed": "2.3 m/s",
            "pm25": "63.9 \u00b5g/m\u00b3",
            "ndvi": 0.094,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Whitefield IT Hub",
            "risk": "High",
            "score": 81,
            "temp": "30.6\u00b0C",
            "lst": 30.6,
            "uhi": 8.3,
            "heat_index": 24.8,
            "wbgt": 23.2,
            "people": "19,743",
            "peopleNum": 19743,
            "driver": "Asphalt parking & reduced green buffer",
            "lat": 12.905,
            "lon": 77.604,
            "canopyCover": "29.0%",
            "builtFraction": "67.4%",
            "buildingHeight": "66.8 m",
            "skyView": 0.48,
            "windSpeed": "2.2 m/s",
            "pm25": "64.3 \u00b5g/m\u00b3",
            "ndvi": 0.323,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h4",
            "name": "Majestic Bus Terminal",
            "risk": "High",
            "score": 75,
            "temp": "29.8\u00b0C",
            "lst": 29.8,
            "uhi": 6.4,
            "heat_index": 19.3,
            "wbgt": 17.4,
            "people": "21,165",
            "peopleNum": 21165,
            "driver": "High diesel traffic & concrete surface",
            "lat": 12.983,
            "lon": 77.586,
            "canopyCover": "13.2%",
            "builtFraction": "83.0%",
            "buildingHeight": "72.4 m",
            "skyView": 0.53,
            "windSpeed": "2.1 m/s",
            "pm25": "43.0 \u00b5g/m\u00b3",
            "ndvi": 0.135,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Marathahalli Junction",
            "risk": "Moderate",
            "score": 72,
            "temp": "29.1\u00b0C",
            "lst": 29.1,
            "uhi": 5.7,
            "heat_index": 22.0,
            "wbgt": 19.4,
            "people": "18,181",
            "peopleNum": 18181,
            "driver": "High vehicular congestion & low shade",
            "lat": 12.95,
            "lon": 77.589,
            "canopyCover": "29.1%",
            "builtFraction": "84.7%",
            "buildingHeight": "57.7 m",
            "skyView": 0.48,
            "windSpeed": "1.9 m/s",
            "pm25": "44.6 \u00b5g/m\u00b3",
            "ndvi": 0.317,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h6",
            "name": "Koramangala 5th Block",
            "risk": "Moderate",
            "score": 70,
            "temp": "28.5\u00b0C",
            "lst": 28.5,
            "uhi": 5.4,
            "heat_index": 23.0,
            "wbgt": 22.1,
            "people": "14,794",
            "peopleNum": 14794,
            "driver": "Dense built-up fraction",
            "lat": 13.007,
            "lon": 77.637,
            "canopyCover": "20.9%",
            "builtFraction": "68.2%",
            "buildingHeight": "49.6 m",
            "skyView": 0.56,
            "windSpeed": "2.4 m/s",
            "pm25": "48.8 \u00b5g/m\u00b3",
            "ndvi": 0.205,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Hebbal Flyover Junction",
            "risk": "Moderate",
            "score": 69,
            "temp": "27.9\u00b0C",
            "lst": 27.9,
            "uhi": 5.3,
            "heat_index": 20.1,
            "wbgt": 17.2,
            "people": "17,705",
            "peopleNum": 17705,
            "driver": "Extensive concrete infrastructure",
            "lat": 12.862,
            "lon": 77.593,
            "canopyCover": "5.7%",
            "builtFraction": "73.9%",
            "buildingHeight": "63.1 m",
            "skyView": 0.44,
            "windSpeed": "2.9 m/s",
            "pm25": "39.1 \u00b5g/m\u00b3",
            "ndvi": 0.173,
            "albedo": 0.28,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Yeshwanthpur Industrial",
            "risk": "Moderate",
            "score": 67,
            "temp": "27.4\u00b0C",
            "lst": 27.4,
            "uhi": 4.7,
            "heat_index": 22.6,
            "wbgt": 18.8,
            "people": "17,392",
            "peopleNum": 17392,
            "driver": "Roof heat retention & low ventilation",
            "lat": 12.931,
            "lon": 77.646,
            "canopyCover": "34.6%",
            "builtFraction": "69.2%",
            "buildingHeight": "58.4 m",
            "skyView": 0.51,
            "windSpeed": "3.6 m/s",
            "pm25": "37.2 \u00b5g/m\u00b3",
            "ndvi": 0.337,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Post_Monsoon": {
        "peakLst": 33.4,
        "meanLst": 23.0,
        "minLst": 10.6,
        "uhiMean": 2.2,
        "uhiMax": 12.0,
        "heatIndexMean": 18.0,
        "wbgtMean": 13.4,
        "hotspotCount": 0,
        "totalRecords": 5612,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.6,
          "imperviousPct": 58.9,
          "buildingDensityPct": 57.3,
          "buildingHeightM": 58.0,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 18.0,
          "humidityPct": 60.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 602.9,
          "pm25UgM3": 69.6,
          "populationDensity": 14686
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Peenya Industrial Area",
            "risk": "Very high",
            "score": 96,
            "temp": "33.4\u00b0C",
            "lst": 33.4,
            "uhi": 12.0,
            "heat_index": 21.5,
            "wbgt": 19.2,
            "people": "15,498",
            "peopleNum": 15498,
            "driver": "Low canopy cover & metal roofs",
            "lat": 12.984,
            "lon": 77.59,
            "canopyCover": "11.3%",
            "builtFraction": "94.2%",
            "buildingHeight": "93.1 m",
            "skyView": 0.32,
            "windSpeed": "1.6 m/s",
            "pm25": "82.8 \u00b5g/m\u00b3",
            "ndvi": 0.219,
            "albedo": 0.3,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 2.1,
                "weight": 73
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 1.0,
                "weight": 32
              },
              {
                "name": "Low air ventilation",
                "val": 0.5,
                "weight": 14
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h2",
            "name": "Electronic City Phase 1",
            "risk": "Moderate",
            "score": 74,
            "temp": "28.3\u00b0C",
            "lst": 28.3,
            "uhi": 6.9,
            "heat_index": 19.6,
            "wbgt": 15.9,
            "people": "16,288",
            "peopleNum": 16288,
            "driver": "Paved glass-building corridors",
            "lat": 12.96,
            "lon": 77.567,
            "canopyCover": "11.5%",
            "builtFraction": "75.9%",
            "buildingHeight": "69.7 m",
            "skyView": 0.39,
            "windSpeed": "2.1 m/s",
            "pm25": "114.3 \u00b5g/m\u00b3",
            "ndvi": 0.146,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Whitefield IT Hub",
            "risk": "Moderate",
            "score": 70,
            "temp": "27.0\u00b0C",
            "lst": 27.0,
            "uhi": 6.4,
            "heat_index": 17.8,
            "wbgt": 13.9,
            "people": "18,187",
            "peopleNum": 18187,
            "driver": "Asphalt parking & reduced green buffer",
            "lat": 13.007,
            "lon": 77.522,
            "canopyCover": "21.3%",
            "builtFraction": "66.4%",
            "buildingHeight": "52.3 m",
            "skyView": 0.53,
            "windSpeed": "2.4 m/s",
            "pm25": "94.3 \u00b5g/m\u00b3",
            "ndvi": 0.133,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h4",
            "name": "Majestic Bus Terminal",
            "risk": "Moderate",
            "score": 67,
            "temp": "26.2\u00b0C",
            "lst": 26.2,
            "uhi": 5.6,
            "heat_index": 18.0,
            "wbgt": 15.9,
            "people": "17,810",
            "peopleNum": 17810,
            "driver": "High diesel traffic & concrete surface",
            "lat": 12.962,
            "lon": 77.606,
            "canopyCover": "10.9%",
            "builtFraction": "69.4%",
            "buildingHeight": "61.3 m",
            "skyView": 0.49,
            "windSpeed": "2.8 m/s",
            "pm25": "55.9 \u00b5g/m\u00b3",
            "ndvi": 0.078,
            "albedo": 0.27,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Marathahalli Junction",
            "risk": "Moderate",
            "score": 65,
            "temp": "25.6\u00b0C",
            "lst": 25.6,
            "uhi": 4.7,
            "heat_index": 19.8,
            "wbgt": 17.4,
            "people": "19,496",
            "peopleNum": 19496,
            "driver": "High vehicular congestion & low shade",
            "lat": 12.938,
            "lon": 77.578,
            "canopyCover": "21.5%",
            "builtFraction": "62.6%",
            "buildingHeight": "51.3 m",
            "skyView": 0.52,
            "windSpeed": "2.1 m/s",
            "pm25": "70.4 \u00b5g/m\u00b3",
            "ndvi": 0.252,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Koramangala 5th Block",
            "risk": "Moderate",
            "score": 65,
            "temp": "25.0\u00b0C",
            "lst": 25.0,
            "uhi": 3.8,
            "heat_index": 19.3,
            "wbgt": 15.5,
            "people": "14,808",
            "peopleNum": 14808,
            "driver": "Dense built-up fraction",
            "lat": 12.98,
            "lon": 77.671,
            "canopyCover": "20.3%",
            "builtFraction": "60.2%",
            "buildingHeight": "52.7 m",
            "skyView": 0.55,
            "windSpeed": "2.8 m/s",
            "pm25": "87.1 \u00b5g/m\u00b3",
            "ndvi": 0.221,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Hebbal Flyover Junction",
            "risk": "Moderate",
            "score": 65,
            "temp": "24.4\u00b0C",
            "lst": 24.4,
            "uhi": 3.8,
            "heat_index": 17.8,
            "wbgt": 13.4,
            "people": "19,623",
            "peopleNum": 19623,
            "driver": "Extensive concrete infrastructure",
            "lat": 12.953,
            "lon": 77.564,
            "canopyCover": "8.1%",
            "builtFraction": "73.9%",
            "buildingHeight": "70.4 m",
            "skyView": 0.31,
            "windSpeed": "2.8 m/s",
            "pm25": "108.1 \u00b5g/m\u00b3",
            "ndvi": 0.166,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h8",
            "name": "Yeshwanthpur Industrial",
            "risk": "Moderate",
            "score": 65,
            "temp": "23.8\u00b0C",
            "lst": 23.8,
            "uhi": 2.9,
            "heat_index": 17.4,
            "wbgt": 13.8,
            "people": "14,516",
            "peopleNum": 14516,
            "driver": "Roof heat retention & low ventilation",
            "lat": 12.963,
            "lon": 77.603,
            "canopyCover": "38.7%",
            "builtFraction": "72.9%",
            "buildingHeight": "63.9 m",
            "skyView": 0.48,
            "windSpeed": "3.7 m/s",
            "pm25": "62.8 \u00b5g/m\u00b3",
            "ndvi": 0.357,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": -0.1,
                "weight": -3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Winter": {
        "peakLst": 31.9,
        "meanLst": 20.8,
        "minLst": 8.0,
        "uhiMean": 2.0,
        "uhiMax": 12.0,
        "heatIndexMean": 15.7,
        "wbgtMean": 10.0,
        "hotspotCount": 0,
        "totalRecords": 8220,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.261,
          "treeCoverPct": 25.1,
          "imperviousPct": 59.5,
          "buildingDensityPct": 57.9,
          "buildingHeightM": 58.2,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 15.7,
          "humidityPct": 52.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 593.1,
          "pm25UgM3": 112.8,
          "populationDensity": 14799
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Peenya Industrial Area",
            "risk": "Very high",
            "score": 93,
            "temp": "31.9\u00b0C",
            "lst": 31.9,
            "uhi": 12.0,
            "heat_index": 20.7,
            "wbgt": 16.2,
            "people": "16,247",
            "peopleNum": 16247,
            "driver": "Low canopy cover & metal roofs",
            "lat": 12.962,
            "lon": 77.574,
            "canopyCover": "3.6%",
            "builtFraction": "98.0%",
            "buildingHeight": "74.7 m",
            "skyView": 0.43,
            "windSpeed": "1.9 m/s",
            "pm25": "163.6 \u00b5g/m\u00b3",
            "ndvi": 0.043,
            "albedo": 0.33,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 2.2,
                "weight": 77
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h2",
            "name": "Electronic City Phase 1",
            "risk": "Moderate",
            "score": 70,
            "temp": "26.0\u00b0C",
            "lst": 26.0,
            "uhi": 7.0,
            "heat_index": 16.2,
            "wbgt": 10.1,
            "people": "22,623",
            "peopleNum": 22623,
            "driver": "Paved glass-building corridors",
            "lat": 12.977,
            "lon": 77.642,
            "canopyCover": "14.2%",
            "builtFraction": "79.0%",
            "buildingHeight": "67.3 m",
            "skyView": 0.46,
            "windSpeed": "3.0 m/s",
            "pm25": "134.7 \u00b5g/m\u00b3",
            "ndvi": 0.138,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Whitefield IT Hub",
            "risk": "Moderate",
            "score": 67,
            "temp": "24.8\u00b0C",
            "lst": 24.8,
            "uhi": 6.6,
            "heat_index": 19.0,
            "wbgt": 13.0,
            "people": "14,348",
            "peopleNum": 14348,
            "driver": "Asphalt parking & reduced green buffer",
            "lat": 12.981,
            "lon": 77.527,
            "canopyCover": "13.5%",
            "builtFraction": "69.6%",
            "buildingHeight": "66.0 m",
            "skyView": 0.55,
            "windSpeed": "3.0 m/s",
            "pm25": "121.4 \u00b5g/m\u00b3",
            "ndvi": 0.164,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h4",
            "name": "Majestic Bus Terminal",
            "risk": "Moderate",
            "score": 65,
            "temp": "24.0\u00b0C",
            "lst": 24.0,
            "uhi": 5.8,
            "heat_index": 16.6,
            "wbgt": 12.8,
            "people": "15,554",
            "peopleNum": 15554,
            "driver": "High diesel traffic & concrete surface",
            "lat": 12.937,
            "lon": 77.615,
            "canopyCover": "26.9%",
            "builtFraction": "61.4%",
            "buildingHeight": "76.3 m",
            "skyView": 0.4,
            "windSpeed": "4.2 m/s",
            "pm25": "136.2 \u00b5g/m\u00b3",
            "ndvi": 0.26,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Marathahalli Junction",
            "risk": "Moderate",
            "score": 65,
            "temp": "23.3\u00b0C",
            "lst": 23.3,
            "uhi": 3.8,
            "heat_index": 14.8,
            "wbgt": 9.6,
            "people": "19,959",
            "peopleNum": 19959,
            "driver": "High vehicular congestion & low shade",
            "lat": 12.946,
            "lon": 77.624,
            "canopyCover": "24.0%",
            "builtFraction": "80.7%",
            "buildingHeight": "59.2 m",
            "skyView": 0.52,
            "windSpeed": "2.5 m/s",
            "pm25": "128.5 \u00b5g/m\u00b3",
            "ndvi": 0.244,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Koramangala 5th Block",
            "risk": "Moderate",
            "score": 65,
            "temp": "22.7\u00b0C",
            "lst": 22.7,
            "uhi": 3.5,
            "heat_index": 16.6,
            "wbgt": 12.6,
            "people": "19,947",
            "peopleNum": 19947,
            "driver": "Dense built-up fraction",
            "lat": 12.94,
            "lon": 77.582,
            "canopyCover": "14.8%",
            "builtFraction": "58.9%",
            "buildingHeight": "54.3 m",
            "skyView": 0.58,
            "windSpeed": "3.2 m/s",
            "pm25": "102.8 \u00b5g/m\u00b3",
            "ndvi": 0.16,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h7",
            "name": "Hebbal Flyover Junction",
            "risk": "Moderate",
            "score": 65,
            "temp": "22.2\u00b0C",
            "lst": 22.2,
            "uhi": 3.0,
            "heat_index": 15.0,
            "wbgt": 7.1,
            "people": "13,522",
            "peopleNum": 13522,
            "driver": "Extensive concrete infrastructure",
            "lat": 12.969,
            "lon": 77.654,
            "canopyCover": "15.3%",
            "builtFraction": "66.8%",
            "buildingHeight": "59.3 m",
            "skyView": 0.45,
            "windSpeed": "3.4 m/s",
            "pm25": "136.0 \u00b5g/m\u00b3",
            "ndvi": 0.076,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h8",
            "name": "Yeshwanthpur Industrial",
            "risk": "Moderate",
            "score": 65,
            "temp": "21.6\u00b0C",
            "lst": 21.6,
            "uhi": 2.5,
            "heat_index": 17.7,
            "wbgt": 10.4,
            "people": "15,777",
            "peopleNum": 15777,
            "driver": "Roof heat retention & low ventilation",
            "lat": 12.818,
            "lon": 77.66,
            "canopyCover": "36.2%",
            "builtFraction": "56.2%",
            "buildingHeight": "45.9 m",
            "skyView": 0.65,
            "windSpeed": "4.0 m/s",
            "pm25": "128.4 \u00b5g/m\u00b3",
            "ndvi": 0.37,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": -0.0,
                "weight": 0
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      }
    }
  },
  "Chennai": {
    "name": "Chennai",
    "state": "Tamil_Nadu",
    "climateZone": "Tropical Wet Dry",
    "elevationM": 6.154999999999999,
    "distanceToCoastKm": 3.0,
    "center": {
      "lat": 13.082532871559087,
      "lon": 80.27054161939452
    },
    "bounds": {
      "minLat": 12.869,
      "maxLat": 13.29,
      "minLon": 80.068,
      "maxLon": 80.502
    },
    "seasons": {
      "Summer": {
        "peakLst": 52.3,
        "meanLst": 40.3,
        "minLst": 27.3,
        "uhiMean": 6.3,
        "uhiMax": 12.0,
        "heatIndexMean": 37.2,
        "wbgtMean": 32.4,
        "hotspotCount": 3238,
        "totalRecords": 8407,
        "hotspotPct": 38.5,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.262,
          "treeCoverPct": 25.2,
          "imperviousPct": 59.3,
          "buildingDensityPct": 57.6,
          "buildingHeightM": 58.0,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 35.6,
          "humidityPct": 72.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 664.9,
          "pm25UgM3": 71.2,
          "populationDensity": 18453
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "T. Nagar Commercial Hub",
            "risk": "Very high",
            "score": 99,
            "temp": "52.3\u00b0C",
            "lst": 52.3,
            "uhi": 12.0,
            "heat_index": 42.7,
            "wbgt": 36.9,
            "people": "15,395",
            "peopleNum": 15395,
            "driver": "Impervious cover & dense retail roofs",
            "lat": 13.052,
            "lon": 80.195,
            "canopyCover": "4.1%",
            "builtFraction": "84.4%",
            "buildingHeight": "62.7 m",
            "skyView": 0.45,
            "windSpeed": "2.5 m/s",
            "pm25": "99.0 \u00b5g/m\u00b3",
            "ndvi": 0.048,
            "albedo": 0.28,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h2",
            "name": "Guindy Industrial Estate",
            "risk": "Very high",
            "score": 99,
            "temp": "45.6\u00b0C",
            "lst": 45.6,
            "uhi": 12.0,
            "heat_index": 37.9,
            "wbgt": 34.8,
            "people": "18,612",
            "peopleNum": 18612,
            "driver": "Low canopy & dark industrial roofing",
            "lat": 13.095,
            "lon": 80.248,
            "canopyCover": "4.5%",
            "builtFraction": "83.5%",
            "buildingHeight": "65.0 m",
            "skyView": 0.43,
            "windSpeed": "1.8 m/s",
            "pm25": "69.8 \u00b5g/m\u00b3",
            "ndvi": 0.141,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "George Town / Broadway",
            "risk": "Very high",
            "score": 99,
            "temp": "44.4\u00b0C",
            "lst": 44.4,
            "uhi": 10.4,
            "heat_index": 38.1,
            "wbgt": 33.1,
            "people": "18,669",
            "peopleNum": 18669,
            "driver": "Narrow urban canyons & high density",
            "lat": 13.158,
            "lon": 80.335,
            "canopyCover": "11.3%",
            "builtFraction": "52.5%",
            "buildingHeight": "36.3 m",
            "skyView": 0.59,
            "windSpeed": "2.9 m/s",
            "pm25": "81.5 \u00b5g/m\u00b3",
            "ndvi": 0.14,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h4",
            "name": "Ambattur Industrial Area",
            "risk": "Very high",
            "score": 99,
            "temp": "43.5\u00b0C",
            "lst": 43.5,
            "uhi": 10.4,
            "heat_index": 35.5,
            "wbgt": 31.4,
            "people": "17,730",
            "peopleNum": 17730,
            "driver": "Heat storage in pavements & metal sheds",
            "lat": 13.113,
            "lon": 80.247,
            "canopyCover": "3.9%",
            "builtFraction": "78.9%",
            "buildingHeight": "65.4 m",
            "skyView": 0.47,
            "windSpeed": "3.9 m/s",
            "pm25": "99.5 \u00b5g/m\u00b3",
            "ndvi": 0.084,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Velachery Bypass",
            "risk": "Very high",
            "score": 99,
            "temp": "42.8\u00b0C",
            "lst": 42.8,
            "uhi": 8.6,
            "heat_index": 37.3,
            "wbgt": 34.0,
            "people": "31,505",
            "peopleNum": 31505,
            "driver": "Paved wetlands & vehicular heat",
            "lat": 13.076,
            "lon": 80.253,
            "canopyCover": "11.5%",
            "builtFraction": "73.2%",
            "buildingHeight": "53.9 m",
            "skyView": 0.57,
            "windSpeed": "2.3 m/s",
            "pm25": "82.2 \u00b5g/m\u00b3",
            "ndvi": 0.117,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h6",
            "name": "Royapettah Junction",
            "risk": "Very high",
            "score": 99,
            "temp": "42.3\u00b0C",
            "lst": 42.3,
            "uhi": 8.5,
            "heat_index": 36.9,
            "wbgt": 32.0,
            "people": "20,961",
            "peopleNum": 20961,
            "driver": "High thermal mass & low sky view",
            "lat": 13.04,
            "lon": 80.345,
            "canopyCover": "17.5%",
            "builtFraction": "74.1%",
            "buildingHeight": "76.1 m",
            "skyView": 0.4,
            "windSpeed": "5.4 m/s",
            "pm25": "110.2 \u00b5g/m\u00b3",
            "ndvi": 0.226,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Central Railway Corridor",
            "risk": "Very high",
            "score": 99,
            "temp": "41.7\u00b0C",
            "lst": 41.7,
            "uhi": 8.0,
            "heat_index": 36.4,
            "wbgt": 31.8,
            "people": "20,089",
            "peopleNum": 20089,
            "driver": "Exposed ballast & concrete platforms",
            "lat": 13.066,
            "lon": 80.291,
            "canopyCover": "38.0%",
            "builtFraction": "70.2%",
            "buildingHeight": "78.2 m",
            "skyView": 0.39,
            "windSpeed": "1.7 m/s",
            "pm25": "70.8 \u00b5g/m\u00b3",
            "ndvi": 0.396,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": -0.1,
                "weight": -3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.4,
                "weight": 14
              }
            ]
          },
          {
            "id": "h8",
            "name": "Anna Nagar Roundtana",
            "risk": "Very high",
            "score": 98,
            "temp": "41.2\u00b0C",
            "lst": 41.2,
            "uhi": 7.5,
            "heat_index": 37.0,
            "wbgt": 31.8,
            "people": "18,820",
            "peopleNum": 18820,
            "driver": "Asphalt intersection & retail density",
            "lat": 13.065,
            "lon": 80.345,
            "canopyCover": "33.8%",
            "builtFraction": "60.0%",
            "buildingHeight": "58.7 m",
            "skyView": 0.63,
            "windSpeed": "2.5 m/s",
            "pm25": "52.9 \u00b5g/m\u00b3",
            "ndvi": 0.293,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Monsoon": {
        "peakLst": 45.2,
        "meanLst": 34.1,
        "minLst": 20.5,
        "uhiMean": 6.1,
        "uhiMax": 12.0,
        "heatIndexMean": 31.6,
        "wbgtMean": 29.3,
        "hotspotCount": 113,
        "totalRecords": 11269,
        "hotspotPct": 1.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.3,
          "buildingDensityPct": 57.5,
          "buildingHeightM": 58.0,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 29.9,
          "humidityPct": 89.7,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 516.1,
          "pm25UgM3": 39.4,
          "populationDensity": 18436
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "T. Nagar Commercial Hub",
            "risk": "Very high",
            "score": 99,
            "temp": "45.2\u00b0C",
            "lst": 45.2,
            "uhi": 12.0,
            "heat_index": 36.6,
            "wbgt": 34.8,
            "people": "29,947",
            "peopleNum": 29947,
            "driver": "Impervious cover & dense retail roofs",
            "lat": 13.148,
            "lon": 80.283,
            "canopyCover": "6.7%",
            "builtFraction": "86.9%",
            "buildingHeight": "63.1 m",
            "skyView": 0.42,
            "windSpeed": "2.5 m/s",
            "pm25": "55.2 \u00b5g/m\u00b3",
            "ndvi": 0.126,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Guindy Industrial Estate",
            "risk": "Very high",
            "score": 99,
            "temp": "39.3\u00b0C",
            "lst": 39.3,
            "uhi": 11.8,
            "heat_index": 33.5,
            "wbgt": 31.1,
            "people": "27,431",
            "peopleNum": 27431,
            "driver": "Low canopy & dark industrial roofing",
            "lat": 13.106,
            "lon": 80.245,
            "canopyCover": "18.5%",
            "builtFraction": "60.2%",
            "buildingHeight": "79.0 m",
            "skyView": 0.38,
            "windSpeed": "2.0 m/s",
            "pm25": "35.9 \u00b5g/m\u00b3",
            "ndvi": 0.206,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "George Town / Broadway",
            "risk": "Very high",
            "score": 99,
            "temp": "38.2\u00b0C",
            "lst": 38.2,
            "uhi": 10.4,
            "heat_index": 32.6,
            "wbgt": 30.2,
            "people": "17,700",
            "peopleNum": 17700,
            "driver": "Narrow urban canyons & high density",
            "lat": 13.011,
            "lon": 80.256,
            "canopyCover": "14.3%",
            "builtFraction": "69.3%",
            "buildingHeight": "69.7 m",
            "skyView": 0.42,
            "windSpeed": "3.1 m/s",
            "pm25": "71.0 \u00b5g/m\u00b3",
            "ndvi": 0.171,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Ambattur Industrial Area",
            "risk": "Very high",
            "score": 94,
            "temp": "37.3\u00b0C",
            "lst": 37.3,
            "uhi": 8.7,
            "heat_index": 30.5,
            "wbgt": 29.2,
            "people": "16,239",
            "peopleNum": 16239,
            "driver": "Heat storage in pavements & metal sheds",
            "lat": 13.078,
            "lon": 80.307,
            "canopyCover": "20.6%",
            "builtFraction": "83.2%",
            "buildingHeight": "82.2 m",
            "skyView": 0.47,
            "windSpeed": "2.8 m/s",
            "pm25": "39.2 \u00b5g/m\u00b3",
            "ndvi": 0.27,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Velachery Bypass",
            "risk": "Very high",
            "score": 92,
            "temp": "36.6\u00b0C",
            "lst": 36.6,
            "uhi": 8.1,
            "heat_index": 32.7,
            "wbgt": 29.6,
            "people": "21,119",
            "peopleNum": 21119,
            "driver": "Paved wetlands & vehicular heat",
            "lat": 13.081,
            "lon": 80.155,
            "canopyCover": "26.6%",
            "builtFraction": "55.6%",
            "buildingHeight": "49.8 m",
            "skyView": 0.56,
            "windSpeed": "3.4 m/s",
            "pm25": "27.6 \u00b5g/m\u00b3",
            "ndvi": 0.292,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h6",
            "name": "Royapettah Junction",
            "risk": "Very high",
            "score": 93,
            "temp": "36.0\u00b0C",
            "lst": 36.0,
            "uhi": 9.0,
            "heat_index": 34.1,
            "wbgt": 30.5,
            "people": "13,784",
            "peopleNum": 13784,
            "driver": "High thermal mass & low sky view",
            "lat": 13.112,
            "lon": 80.306,
            "canopyCover": "25.1%",
            "builtFraction": "53.1%",
            "buildingHeight": "54.4 m",
            "skyView": 0.45,
            "windSpeed": "3.1 m/s",
            "pm25": "26.1 \u00b5g/m\u00b3",
            "ndvi": 0.274,
            "albedo": 0.17,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Central Railway Corridor",
            "risk": "Very high",
            "score": 89,
            "temp": "35.5\u00b0C",
            "lst": 35.5,
            "uhi": 7.8,
            "heat_index": 32.0,
            "wbgt": 31.0,
            "people": "16,422",
            "peopleNum": 16422,
            "driver": "Exposed ballast & concrete platforms",
            "lat": 13.049,
            "lon": 80.258,
            "canopyCover": "28.0%",
            "builtFraction": "64.7%",
            "buildingHeight": "72.3 m",
            "skyView": 0.5,
            "windSpeed": "3.3 m/s",
            "pm25": "41.7 \u00b5g/m\u00b3",
            "ndvi": 0.249,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Anna Nagar Roundtana",
            "risk": "High",
            "score": 86,
            "temp": "34.9\u00b0C",
            "lst": 34.9,
            "uhi": 7.0,
            "heat_index": 32.4,
            "wbgt": 30.9,
            "people": "18,719",
            "peopleNum": 18719,
            "driver": "Asphalt intersection & retail density",
            "lat": 13.091,
            "lon": 80.241,
            "canopyCover": "14.6%",
            "builtFraction": "64.8%",
            "buildingHeight": "72.6 m",
            "skyView": 0.48,
            "windSpeed": "3.1 m/s",
            "pm25": "33.5 \u00b5g/m\u00b3",
            "ndvi": 0.195,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Post_Monsoon": {
        "peakLst": 42.4,
        "meanLst": 30.7,
        "minLst": 18.9,
        "uhiMean": 4.7,
        "uhiMax": 12.0,
        "heatIndexMean": 26.7,
        "wbgtMean": 23.0,
        "hotspotCount": 1,
        "totalRecords": 5526,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.262,
          "treeCoverPct": 25.1,
          "imperviousPct": 59.7,
          "buildingDensityPct": 58.1,
          "buildingHeightM": 58.1,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 26.0,
          "humidityPct": 71.9,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 606.0,
          "pm25UgM3": 71.2,
          "populationDensity": 18577
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "T. Nagar Commercial Hub",
            "risk": "Very high",
            "score": 99,
            "temp": "42.4\u00b0C",
            "lst": 42.4,
            "uhi": 12.0,
            "heat_index": 30.5,
            "wbgt": 28.1,
            "people": "35,160",
            "peopleNum": 35160,
            "driver": "Impervious cover & dense retail roofs",
            "lat": 13.05,
            "lon": 80.29,
            "canopyCover": "4.2%",
            "builtFraction": "89.5%",
            "buildingHeight": "64.0 m",
            "skyView": 0.46,
            "windSpeed": "3.1 m/s",
            "pm25": "102.2 \u00b5g/m\u00b3",
            "ndvi": 0.097,
            "albedo": 0.27,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 2.0,
                "weight": 70
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Guindy Industrial Estate",
            "risk": "Very high",
            "score": 94,
            "temp": "35.7\u00b0C",
            "lst": 35.7,
            "uhi": 9.7,
            "heat_index": 30.0,
            "wbgt": 26.0,
            "people": "27,640",
            "peopleNum": 27640,
            "driver": "Low canopy & dark industrial roofing",
            "lat": 13.082,
            "lon": 80.301,
            "canopyCover": "24.3%",
            "builtFraction": "62.3%",
            "buildingHeight": "67.2 m",
            "skyView": 0.45,
            "windSpeed": "3.3 m/s",
            "pm25": "78.6 \u00b5g/m\u00b3",
            "ndvi": 0.228,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "George Town / Broadway",
            "risk": "High",
            "score": 87,
            "temp": "34.6\u00b0C",
            "lst": 34.6,
            "uhi": 7.6,
            "heat_index": 27.6,
            "wbgt": 25.2,
            "people": "21,989",
            "peopleNum": 21989,
            "driver": "Narrow urban canyons & high density",
            "lat": 13.101,
            "lon": 80.291,
            "canopyCover": "24.7%",
            "builtFraction": "71.1%",
            "buildingHeight": "67.5 m",
            "skyView": 0.43,
            "windSpeed": "2.4 m/s",
            "pm25": "77.5 \u00b5g/m\u00b3",
            "ndvi": 0.236,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Ambattur Industrial Area",
            "risk": "High",
            "score": 86,
            "temp": "33.8\u00b0C",
            "lst": 33.8,
            "uhi": 7.7,
            "heat_index": 31.0,
            "wbgt": 28.5,
            "people": "16,396",
            "peopleNum": 16396,
            "driver": "Heat storage in pavements & metal sheds",
            "lat": 13.145,
            "lon": 80.232,
            "canopyCover": "24.3%",
            "builtFraction": "59.6%",
            "buildingHeight": "42.0 m",
            "skyView": 0.68,
            "windSpeed": "5.4 m/s",
            "pm25": "69.4 \u00b5g/m\u00b3",
            "ndvi": 0.219,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Velachery Bypass",
            "risk": "High",
            "score": 82,
            "temp": "33.2\u00b0C",
            "lst": 33.2,
            "uhi": 6.8,
            "heat_index": 28.0,
            "wbgt": 24.3,
            "people": "17,657",
            "peopleNum": 17657,
            "driver": "Paved wetlands & vehicular heat",
            "lat": 13.07,
            "lon": 80.285,
            "canopyCover": "22.0%",
            "builtFraction": "62.9%",
            "buildingHeight": "73.5 m",
            "skyView": 0.43,
            "windSpeed": "4.5 m/s",
            "pm25": "48.9 \u00b5g/m\u00b3",
            "ndvi": 0.227,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Royapettah Junction",
            "risk": "High",
            "score": 81,
            "temp": "32.5\u00b0C",
            "lst": 32.5,
            "uhi": 6.6,
            "heat_index": 26.9,
            "wbgt": 22.9,
            "people": "16,998",
            "peopleNum": 16998,
            "driver": "High thermal mass & low sky view",
            "lat": 13.035,
            "lon": 80.211,
            "canopyCover": "32.7%",
            "builtFraction": "64.9%",
            "buildingHeight": "55.5 m",
            "skyView": 0.55,
            "windSpeed": "3.2 m/s",
            "pm25": "65.0 \u00b5g/m\u00b3",
            "ndvi": 0.302,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h7",
            "name": "Central Railway Corridor",
            "risk": "High",
            "score": 78,
            "temp": "32.0\u00b0C",
            "lst": 32.0,
            "uhi": 5.9,
            "heat_index": 27.8,
            "wbgt": 25.9,
            "people": "26,025",
            "peopleNum": 26025,
            "driver": "Exposed ballast & concrete platforms",
            "lat": 13.042,
            "lon": 80.213,
            "canopyCover": "16.3%",
            "builtFraction": "66.4%",
            "buildingHeight": "60.3 m",
            "skyView": 0.56,
            "windSpeed": "2.6 m/s",
            "pm25": "62.4 \u00b5g/m\u00b3",
            "ndvi": 0.209,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Anna Nagar Roundtana",
            "risk": "High",
            "score": 75,
            "temp": "31.5\u00b0C",
            "lst": 31.5,
            "uhi": 5.0,
            "heat_index": 28.8,
            "wbgt": 25.4,
            "people": "15,342",
            "peopleNum": 15342,
            "driver": "Asphalt intersection & retail density",
            "lat": 13.063,
            "lon": 80.272,
            "canopyCover": "37.4%",
            "builtFraction": "27.0%",
            "buildingHeight": "48.0 m",
            "skyView": 0.66,
            "windSpeed": "2.3 m/s",
            "pm25": "65.4 \u00b5g/m\u00b3",
            "ndvi": 0.339,
            "albedo": 0.13,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 0.6,
                "weight": 21
              },
              {
                "name": "Low tree canopy cover",
                "val": -0.1,
                "weight": -3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Winter": {
        "peakLst": 40.5,
        "meanLst": 28.3,
        "minLst": 15.9,
        "uhiMean": 4.3,
        "uhiMax": 12.0,
        "heatIndexMean": 24.1,
        "wbgtMean": 19.6,
        "hotspotCount": 0,
        "totalRecords": 8292,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.263,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.1,
          "buildingDensityPct": 57.3,
          "buildingHeightM": 57.9,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 23.8,
          "humidityPct": 63.9,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 594.0,
          "pm25UgM3": 113.7,
          "populationDensity": 18347
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "T. Nagar Commercial Hub",
            "risk": "Very high",
            "score": 99,
            "temp": "40.5\u00b0C",
            "lst": 40.5,
            "uhi": 12.0,
            "heat_index": 29.7,
            "wbgt": 26.4,
            "people": "26,825",
            "peopleNum": 26825,
            "driver": "Impervious cover & dense retail roofs",
            "lat": 13.082,
            "lon": 80.281,
            "canopyCover": "14.7%",
            "builtFraction": "87.7%",
            "buildingHeight": "82.0 m",
            "skyView": 0.3,
            "windSpeed": "1.5 m/s",
            "pm25": "157.8 \u00b5g/m\u00b3",
            "ndvi": 0.185,
            "albedo": 0.3,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 1.0,
                "weight": 32
              },
              {
                "name": "Low air ventilation",
                "val": 0.5,
                "weight": 14
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h2",
            "name": "Guindy Industrial Estate",
            "risk": "Very high",
            "score": 88,
            "temp": "33.3\u00b0C",
            "lst": 33.3,
            "uhi": 9.0,
            "heat_index": 23.8,
            "wbgt": 20.8,
            "people": "27,801",
            "peopleNum": 27801,
            "driver": "Low canopy & dark industrial roofing",
            "lat": 13.078,
            "lon": 80.225,
            "canopyCover": "17.0%",
            "builtFraction": "73.5%",
            "buildingHeight": "64.8 m",
            "skyView": 0.47,
            "windSpeed": "1.9 m/s",
            "pm25": "169.2 \u00b5g/m\u00b3",
            "ndvi": 0.096,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "George Town / Broadway",
            "risk": "High",
            "score": 81,
            "temp": "32.2\u00b0C",
            "lst": 32.2,
            "uhi": 7.0,
            "heat_index": 26.8,
            "wbgt": 22.5,
            "people": "26,555",
            "peopleNum": 26555,
            "driver": "Narrow urban canyons & high density",
            "lat": 13.077,
            "lon": 80.286,
            "canopyCover": "11.0%",
            "builtFraction": "74.0%",
            "buildingHeight": "91.0 m",
            "skyView": 0.33,
            "windSpeed": "1.9 m/s",
            "pm25": "152.9 \u00b5g/m\u00b3",
            "ndvi": 0.122,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h4",
            "name": "Ambattur Industrial Area",
            "risk": "High",
            "score": 79,
            "temp": "31.4\u00b0C",
            "lst": 31.4,
            "uhi": 6.8,
            "heat_index": 24.9,
            "wbgt": 20.0,
            "people": "27,163",
            "peopleNum": 27163,
            "driver": "Heat storage in pavements & metal sheds",
            "lat": 13.052,
            "lon": 80.28,
            "canopyCover": "24.5%",
            "builtFraction": "79.4%",
            "buildingHeight": "86.8 m",
            "skyView": 0.31,
            "windSpeed": "1.8 m/s",
            "pm25": "175.3 \u00b5g/m\u00b3",
            "ndvi": 0.26,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Velachery Bypass",
            "risk": "High",
            "score": 76,
            "temp": "30.7\u00b0C",
            "lst": 30.7,
            "uhi": 6.2,
            "heat_index": 22.4,
            "wbgt": 18.0,
            "people": "23,830",
            "peopleNum": 23830,
            "driver": "Paved wetlands & vehicular heat",
            "lat": 13.097,
            "lon": 80.241,
            "canopyCover": "17.1%",
            "builtFraction": "78.3%",
            "buildingHeight": "65.2 m",
            "skyView": 0.48,
            "windSpeed": "2.7 m/s",
            "pm25": "107.5 \u00b5g/m\u00b3",
            "ndvi": 0.27,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Royapettah Junction",
            "risk": "High",
            "score": 75,
            "temp": "30.1\u00b0C",
            "lst": 30.1,
            "uhi": 6.2,
            "heat_index": 24.4,
            "wbgt": 20.0,
            "people": "18,842",
            "peopleNum": 18842,
            "driver": "High thermal mass & low sky view",
            "lat": 13.125,
            "lon": 80.306,
            "canopyCover": "14.3%",
            "builtFraction": "64.5%",
            "buildingHeight": "63.1 m",
            "skyView": 0.52,
            "windSpeed": "2.7 m/s",
            "pm25": "176.5 \u00b5g/m\u00b3",
            "ndvi": 0.229,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Central Railway Corridor",
            "risk": "Moderate",
            "score": 72,
            "temp": "29.6\u00b0C",
            "lst": 29.6,
            "uhi": 5.2,
            "heat_index": 26.2,
            "wbgt": 21.7,
            "people": "25,297",
            "peopleNum": 25297,
            "driver": "Exposed ballast & concrete platforms",
            "lat": 13.092,
            "lon": 80.32,
            "canopyCover": "37.6%",
            "builtFraction": "58.3%",
            "buildingHeight": "48.1 m",
            "skyView": 0.58,
            "windSpeed": "2.1 m/s",
            "pm25": "108.4 \u00b5g/m\u00b3",
            "ndvi": 0.241,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": -0.1,
                "weight": -3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Anna Nagar Roundtana",
            "risk": "Moderate",
            "score": 70,
            "temp": "29.1\u00b0C",
            "lst": 29.1,
            "uhi": 5.0,
            "heat_index": 24.9,
            "wbgt": 18.8,
            "people": "11,913",
            "peopleNum": 11913,
            "driver": "Asphalt intersection & retail density",
            "lat": 13.139,
            "lon": 80.242,
            "canopyCover": "13.1%",
            "builtFraction": "53.0%",
            "buildingHeight": "61.6 m",
            "skyView": 0.48,
            "windSpeed": "2.6 m/s",
            "pm25": "110.9 \u00b5g/m\u00b3",
            "ndvi": 0.142,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          }
        ]
      }
    }
  },
  "Hyderabad": {
    "name": "Hyderabad",
    "state": "Telangana",
    "climateZone": "Tropical Savanna",
    "elevationM": 541.9,
    "distanceToCoastKm": 500.0,
    "center": {
      "lat": 17.385081467193107,
      "lon": 78.48718596099944
    },
    "bounds": {
      "minLat": 17.201,
      "maxLat": 17.61,
      "minLon": 78.287,
      "maxLon": 78.684
    },
    "seasons": {
      "Summer": {
        "peakLst": 48.4,
        "meanLst": 37.0,
        "minLst": 22.9,
        "uhiMean": 5.0,
        "uhiMax": 12.0,
        "heatIndexMean": 32.3,
        "wbgtMean": 26.5,
        "hotspotCount": 3206,
        "totalRecords": 8309,
        "hotspotPct": 38.6,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.5,
          "imperviousPct": 59.0,
          "buildingDensityPct": 57.4,
          "buildingHeightM": 57.9,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 31.7,
          "humidityPct": 55.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 665.2,
          "pm25UgM3": 68.8,
          "populationDensity": 11086
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Balanagar Industrial Area",
            "risk": "Very high",
            "score": 99,
            "temp": "48.4\u00b0C",
            "lst": 48.4,
            "uhi": 12.0,
            "heat_index": 38.1,
            "wbgt": 32.9,
            "people": "16,143",
            "peopleNum": 16143,
            "driver": "Low vegetation & dense factories",
            "lat": 17.396,
            "lon": 78.436,
            "canopyCover": "11.0%",
            "builtFraction": "83.1%",
            "buildingHeight": "68.4 m",
            "skyView": 0.44,
            "windSpeed": "2.1 m/s",
            "pm25": "67.5 \u00b5g/m\u00b3",
            "ndvi": 0.125,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Charminar Old City",
            "risk": "Very high",
            "score": 99,
            "temp": "42.4\u00b0C",
            "lst": 42.4,
            "uhi": 10.7,
            "heat_index": 33.2,
            "wbgt": 26.9,
            "people": "14,913",
            "peopleNum": 14913,
            "driver": "Narrow streets & high population density",
            "lat": 17.421,
            "lon": 78.497,
            "canopyCover": "18.9%",
            "builtFraction": "84.9%",
            "buildingHeight": "66.1 m",
            "skyView": 0.49,
            "windSpeed": "2.3 m/s",
            "pm25": "114.8 \u00b5g/m\u00b3",
            "ndvi": 0.125,
            "albedo": 0.27,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Kukatpally Housing Board",
            "risk": "Very high",
            "score": 99,
            "temp": "41.1\u00b0C",
            "lst": 41.1,
            "uhi": 9.6,
            "heat_index": 32.9,
            "wbgt": 27.9,
            "people": "19,830",
            "peopleNum": 19830,
            "driver": "High concrete fraction & sparse trees",
            "lat": 17.391,
            "lon": 78.523,
            "canopyCover": "18.6%",
            "builtFraction": "65.5%",
            "buildingHeight": "66.2 m",
            "skyView": 0.44,
            "windSpeed": "2.3 m/s",
            "pm25": "79.6 \u00b5g/m\u00b3",
            "ndvi": 0.201,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Hitec City Cyber Towers",
            "risk": "Very high",
            "score": 98,
            "temp": "40.3\u00b0C",
            "lst": 40.3,
            "uhi": 7.9,
            "heat_index": 34.8,
            "wbgt": 28.4,
            "people": "8,221",
            "peopleNum": 8221,
            "driver": "Asphalt & glass heat reflection",
            "lat": 17.4,
            "lon": 78.437,
            "canopyCover": "14.2%",
            "builtFraction": "57.8%",
            "buildingHeight": "43.9 m",
            "skyView": 0.58,
            "windSpeed": "4.0 m/s",
            "pm25": "81.6 \u00b5g/m\u00b3",
            "ndvi": 0.121,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Secunderabad Station",
            "risk": "Very high",
            "score": 95,
            "temp": "39.6\u00b0C",
            "lst": 39.6,
            "uhi": 7.3,
            "heat_index": 32.0,
            "wbgt": 27.5,
            "people": "8,445",
            "peopleNum": 8445,
            "driver": "Extensive metal sheds & transit heat",
            "lat": 17.428,
            "lon": 78.5,
            "canopyCover": "25.5%",
            "builtFraction": "70.0%",
            "buildingHeight": "54.2 m",
            "skyView": 0.6,
            "windSpeed": "2.2 m/s",
            "pm25": "62.6 \u00b5g/m\u00b3",
            "ndvi": 0.302,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h6",
            "name": "Ameerpet Center",
            "risk": "Very high",
            "score": 93,
            "temp": "39.0\u00b0C",
            "lst": 39.0,
            "uhi": 6.8,
            "heat_index": 31.7,
            "wbgt": 26.3,
            "people": "13,794",
            "peopleNum": 13794,
            "driver": "Commercial density & low sky view factor",
            "lat": 17.391,
            "lon": 78.491,
            "canopyCover": "17.9%",
            "builtFraction": "77.2%",
            "buildingHeight": "63.3 m",
            "skyView": 0.54,
            "windSpeed": "5.3 m/s",
            "pm25": "59.2 \u00b5g/m\u00b3",
            "ndvi": 0.235,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Uppal Industrial Zone",
            "risk": "Very high",
            "score": 90,
            "temp": "38.4\u00b0C",
            "lst": 38.4,
            "uhi": 6.0,
            "heat_index": 32.0,
            "wbgt": 25.5,
            "people": "8,925",
            "peopleNum": 8925,
            "driver": "Industrial heat & low moisture",
            "lat": 17.425,
            "lon": 78.504,
            "canopyCover": "33.7%",
            "builtFraction": "69.5%",
            "buildingHeight": "40.5 m",
            "skyView": 0.59,
            "windSpeed": "2.3 m/s",
            "pm25": "54.0 \u00b5g/m\u00b3",
            "ndvi": 0.327,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h8",
            "name": "Sanathnagar",
            "risk": "Very high",
            "score": 88,
            "temp": "37.9\u00b0C",
            "lst": 37.9,
            "uhi": 5.9,
            "heat_index": 31.6,
            "wbgt": 25.3,
            "people": "13,551",
            "peopleNum": 13551,
            "driver": "Manufacturing shed roofs & low albedo",
            "lat": 17.366,
            "lon": 78.502,
            "canopyCover": "23.9%",
            "builtFraction": "75.3%",
            "buildingHeight": "73.0 m",
            "skyView": 0.46,
            "windSpeed": "2.4 m/s",
            "pm25": "71.1 \u00b5g/m\u00b3",
            "ndvi": 0.223,
            "albedo": 0.28,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Monsoon": {
        "peakLst": 43.2,
        "meanLst": 30.8,
        "minLst": 17.2,
        "uhiMean": 4.8,
        "uhiMax": 12.0,
        "heatIndexMean": 26.8,
        "wbgtMean": 23.3,
        "hotspotCount": 114,
        "totalRecords": 11063,
        "hotspotPct": 1.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.266,
          "treeCoverPct": 25.6,
          "imperviousPct": 59.0,
          "buildingDensityPct": 57.1,
          "buildingHeightM": 57.7,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 26.1,
          "humidityPct": 72.9,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 514.6,
          "pm25UgM3": 37.9,
          "populationDensity": 10998
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Balanagar Industrial Area",
            "risk": "Very high",
            "score": 99,
            "temp": "43.2\u00b0C",
            "lst": 43.2,
            "uhi": 12.0,
            "heat_index": 34.4,
            "wbgt": 31.4,
            "people": "18,957",
            "peopleNum": 18957,
            "driver": "Low vegetation & dense factories",
            "lat": 17.369,
            "lon": 78.489,
            "canopyCover": "2.9%",
            "builtFraction": "77.2%",
            "buildingHeight": "73.6 m",
            "skyView": 0.34,
            "windSpeed": "3.7 m/s",
            "pm25": "58.0 \u00b5g/m\u00b3",
            "ndvi": 0.094,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Charminar Old City",
            "risk": "Very high",
            "score": 96,
            "temp": "36.0\u00b0C",
            "lst": 36.0,
            "uhi": 10.3,
            "heat_index": 26.5,
            "wbgt": 22.0,
            "people": "12,840",
            "peopleNum": 12840,
            "driver": "Narrow streets & high population density",
            "lat": 17.367,
            "lon": 78.448,
            "canopyCover": "7.6%",
            "builtFraction": "85.3%",
            "buildingHeight": "79.0 m",
            "skyView": 0.37,
            "windSpeed": "2.3 m/s",
            "pm25": "49.5 \u00b5g/m\u00b3",
            "ndvi": 0.102,
            "albedo": 0.29,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Kukatpally Housing Board",
            "risk": "Very high",
            "score": 89,
            "temp": "34.9\u00b0C",
            "lst": 34.9,
            "uhi": 8.2,
            "heat_index": 28.7,
            "wbgt": 26.5,
            "people": "12,117",
            "peopleNum": 12117,
            "driver": "High concrete fraction & sparse trees",
            "lat": 17.362,
            "lon": 78.4,
            "canopyCover": "25.3%",
            "builtFraction": "53.2%",
            "buildingHeight": "74.5 m",
            "skyView": 0.43,
            "windSpeed": "2.8 m/s",
            "pm25": "36.3 \u00b5g/m\u00b3",
            "ndvi": 0.241,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Hitec City Cyber Towers",
            "risk": "Very high",
            "score": 88,
            "temp": "34.1\u00b0C",
            "lst": 34.1,
            "uhi": 8.4,
            "heat_index": 27.9,
            "wbgt": 23.4,
            "people": "17,077",
            "peopleNum": 17077,
            "driver": "Asphalt & glass heat reflection",
            "lat": 17.381,
            "lon": 78.468,
            "canopyCover": "15.6%",
            "builtFraction": "71.8%",
            "buildingHeight": "71.6 m",
            "skyView": 0.5,
            "windSpeed": "2.2 m/s",
            "pm25": "31.5 \u00b5g/m\u00b3",
            "ndvi": 0.115,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Secunderabad Station",
            "risk": "High",
            "score": 85,
            "temp": "33.4\u00b0C",
            "lst": 33.4,
            "uhi": 7.6,
            "heat_index": 26.1,
            "wbgt": 23.9,
            "people": "16,728",
            "peopleNum": 16728,
            "driver": "Extensive metal sheds & transit heat",
            "lat": 17.438,
            "lon": 78.455,
            "canopyCover": "18.3%",
            "builtFraction": "65.9%",
            "buildingHeight": "71.7 m",
            "skyView": 0.47,
            "windSpeed": "2.5 m/s",
            "pm25": "24.0 \u00b5g/m\u00b3",
            "ndvi": 0.206,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Ameerpet Center",
            "risk": "High",
            "score": 80,
            "temp": "32.8\u00b0C",
            "lst": 32.8,
            "uhi": 6.3,
            "heat_index": 27.1,
            "wbgt": 23.9,
            "people": "13,538",
            "peopleNum": 13538,
            "driver": "Commercial density & low sky view factor",
            "lat": 17.453,
            "lon": 78.503,
            "canopyCover": "29.4%",
            "builtFraction": "71.0%",
            "buildingHeight": "49.0 m",
            "skyView": 0.49,
            "windSpeed": "2.4 m/s",
            "pm25": "69.4 \u00b5g/m\u00b3",
            "ndvi": 0.259,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Uppal Industrial Zone",
            "risk": "High",
            "score": 79,
            "temp": "32.2\u00b0C",
            "lst": 32.2,
            "uhi": 6.2,
            "heat_index": 25.5,
            "wbgt": 24.5,
            "people": "11,359",
            "peopleNum": 11359,
            "driver": "Industrial heat & low moisture",
            "lat": 17.474,
            "lon": 78.414,
            "canopyCover": "8.0%",
            "builtFraction": "76.0%",
            "buildingHeight": "57.9 m",
            "skyView": 0.55,
            "windSpeed": "5.1 m/s",
            "pm25": "37.9 \u00b5g/m\u00b3",
            "ndvi": 0.112,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h8",
            "name": "Sanathnagar",
            "risk": "High",
            "score": 76,
            "temp": "31.6\u00b0C",
            "lst": 31.6,
            "uhi": 5.4,
            "heat_index": 27.7,
            "wbgt": 25.6,
            "people": "11,553",
            "peopleNum": 11553,
            "driver": "Manufacturing shed roofs & low albedo",
            "lat": 17.438,
            "lon": 78.495,
            "canopyCover": "15.8%",
            "builtFraction": "61.4%",
            "buildingHeight": "55.2 m",
            "skyView": 0.55,
            "windSpeed": "3.4 m/s",
            "pm25": "48.7 \u00b5g/m\u00b3",
            "ndvi": 0.153,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          }
        ]
      },
      "Post_Monsoon": {
        "peakLst": 38.0,
        "meanLst": 26.8,
        "minLst": 13.3,
        "uhiMean": 3.4,
        "uhiMax": 12.0,
        "heatIndexMean": 21.9,
        "wbgtMean": 16.5,
        "hotspotCount": 0,
        "totalRecords": 5663,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.263,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.0,
          "buildingDensityPct": 57.4,
          "buildingHeightM": 57.8,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 21.8,
          "humidityPct": 55.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 605.0,
          "pm25UgM3": 68.6,
          "populationDensity": 11029
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Balanagar Industrial Area",
            "risk": "Very high",
            "score": 99,
            "temp": "38.0\u00b0C",
            "lst": 38.0,
            "uhi": 12.0,
            "heat_index": 28.1,
            "wbgt": 22.1,
            "people": "14,437",
            "peopleNum": 14437,
            "driver": "Low vegetation & dense factories",
            "lat": 17.398,
            "lon": 78.438,
            "canopyCover": "2.9%",
            "builtFraction": "88.6%",
            "buildingHeight": "63.4 m",
            "skyView": 0.48,
            "windSpeed": "2.3 m/s",
            "pm25": "124.8 \u00b5g/m\u00b3",
            "ndvi": 0.112,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Charminar Old City",
            "risk": "High",
            "score": 84,
            "temp": "32.1\u00b0C",
            "lst": 32.1,
            "uhi": 8.3,
            "heat_index": 21.1,
            "wbgt": 16.9,
            "people": "15,761",
            "peopleNum": 15761,
            "driver": "Narrow streets & high population density",
            "lat": 17.392,
            "lon": 78.53,
            "canopyCover": "15.6%",
            "builtFraction": "75.3%",
            "buildingHeight": "74.5 m",
            "skyView": 0.47,
            "windSpeed": "2.0 m/s",
            "pm25": "73.2 \u00b5g/m\u00b3",
            "ndvi": 0.128,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Kukatpally Housing Board",
            "risk": "High",
            "score": 78,
            "temp": "30.8\u00b0C",
            "lst": 30.8,
            "uhi": 7.0,
            "heat_index": 21.4,
            "wbgt": 17.9,
            "people": "14,051",
            "peopleNum": 14051,
            "driver": "High concrete fraction & sparse trees",
            "lat": 17.357,
            "lon": 78.55,
            "canopyCover": "16.5%",
            "builtFraction": "78.6%",
            "buildingHeight": "68.0 m",
            "skyView": 0.46,
            "windSpeed": "3.4 m/s",
            "pm25": "114.0 \u00b5g/m\u00b3",
            "ndvi": 0.139,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h4",
            "name": "Hitec City Cyber Towers",
            "risk": "High",
            "score": 75,
            "temp": "30.0\u00b0C",
            "lst": 30.0,
            "uhi": 6.2,
            "heat_index": 21.5,
            "wbgt": 16.9,
            "people": "18,311",
            "peopleNum": 18311,
            "driver": "Asphalt & glass heat reflection",
            "lat": 17.358,
            "lon": 78.528,
            "canopyCover": "17.7%",
            "builtFraction": "77.1%",
            "buildingHeight": "72.6 m",
            "skyView": 0.41,
            "windSpeed": "2.4 m/s",
            "pm25": "114.2 \u00b5g/m\u00b3",
            "ndvi": 0.204,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Secunderabad Station",
            "risk": "Moderate",
            "score": 72,
            "temp": "29.3\u00b0C",
            "lst": 29.3,
            "uhi": 5.6,
            "heat_index": 20.6,
            "wbgt": 15.8,
            "people": "20,231",
            "peopleNum": 20231,
            "driver": "Extensive metal sheds & transit heat",
            "lat": 17.42,
            "lon": 78.473,
            "canopyCover": "12.8%",
            "builtFraction": "83.7%",
            "buildingHeight": "71.2 m",
            "skyView": 0.44,
            "windSpeed": "2.7 m/s",
            "pm25": "104.6 \u00b5g/m\u00b3",
            "ndvi": 0.145,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h6",
            "name": "Ameerpet Center",
            "risk": "Moderate",
            "score": 74,
            "temp": "28.8\u00b0C",
            "lst": 28.8,
            "uhi": 6.5,
            "heat_index": 23.5,
            "wbgt": 18.7,
            "people": "13,674",
            "peopleNum": 13674,
            "driver": "Commercial density & low sky view factor",
            "lat": 17.478,
            "lon": 78.51,
            "canopyCover": "22.9%",
            "builtFraction": "69.5%",
            "buildingHeight": "69.1 m",
            "skyView": 0.44,
            "windSpeed": "4.4 m/s",
            "pm25": "87.1 \u00b5g/m\u00b3",
            "ndvi": 0.205,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Uppal Industrial Zone",
            "risk": "Moderate",
            "score": 67,
            "temp": "28.2\u00b0C",
            "lst": 28.2,
            "uhi": 4.3,
            "heat_index": 21.4,
            "wbgt": 15.9,
            "people": "12,018",
            "peopleNum": 12018,
            "driver": "Industrial heat & low moisture",
            "lat": 17.404,
            "lon": 78.473,
            "canopyCover": "15.0%",
            "builtFraction": "73.3%",
            "buildingHeight": "76.8 m",
            "skyView": 0.46,
            "windSpeed": "3.9 m/s",
            "pm25": "75.2 \u00b5g/m\u00b3",
            "ndvi": 0.11,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h8",
            "name": "Sanathnagar",
            "risk": "Moderate",
            "score": 65,
            "temp": "27.6\u00b0C",
            "lst": 27.6,
            "uhi": 2.6,
            "heat_index": 21.1,
            "wbgt": 16.9,
            "people": "11,296",
            "peopleNum": 11296,
            "driver": "Manufacturing shed roofs & low albedo",
            "lat": 17.385,
            "lon": 78.424,
            "canopyCover": "32.4%",
            "builtFraction": "63.5%",
            "buildingHeight": "68.6 m",
            "skyView": 0.34,
            "windSpeed": "3.5 m/s",
            "pm25": "56.1 \u00b5g/m\u00b3",
            "ndvi": 0.31,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Winter": {
        "peakLst": 35.0,
        "meanLst": 24.0,
        "minLst": 9.9,
        "uhiMean": 3.1,
        "uhiMax": 12.0,
        "heatIndexMean": 19.0,
        "wbgtMean": 12.5,
        "hotspotCount": 0,
        "totalRecords": 8144,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.262,
          "treeCoverPct": 25.3,
          "imperviousPct": 59.5,
          "buildingDensityPct": 57.6,
          "buildingHeightM": 57.9,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 18.9,
          "humidityPct": 47.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 594.0,
          "pm25UgM3": 110.7,
          "populationDensity": 11066
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Balanagar Industrial Area",
            "risk": "Very high",
            "score": 99,
            "temp": "35.0\u00b0C",
            "lst": 35.0,
            "uhi": 12.0,
            "heat_index": 24.8,
            "wbgt": 18.1,
            "people": "11,536",
            "peopleNum": 11536,
            "driver": "Low vegetation & dense factories",
            "lat": 17.398,
            "lon": 78.482,
            "canopyCover": "16.3%",
            "builtFraction": "75.7%",
            "buildingHeight": "70.9 m",
            "skyView": 0.41,
            "windSpeed": "2.5 m/s",
            "pm25": "180.0 \u00b5g/m\u00b3",
            "ndvi": 0.161,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Charminar Old City",
            "risk": "High",
            "score": 79,
            "temp": "29.2\u00b0C",
            "lst": 29.2,
            "uhi": 8.5,
            "heat_index": 22.8,
            "wbgt": 17.8,
            "people": "13,953",
            "peopleNum": 13953,
            "driver": "Narrow streets & high population density",
            "lat": 17.473,
            "lon": 78.56,
            "canopyCover": "21.2%",
            "builtFraction": "67.9%",
            "buildingHeight": "55.4 m",
            "skyView": 0.55,
            "windSpeed": "2.7 m/s",
            "pm25": "118.9 \u00b5g/m\u00b3",
            "ndvi": 0.209,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Kukatpally Housing Board",
            "risk": "Moderate",
            "score": 74,
            "temp": "28.0\u00b0C",
            "lst": 28.0,
            "uhi": 7.4,
            "heat_index": 20.3,
            "wbgt": 13.8,
            "people": "11,440",
            "peopleNum": 11440,
            "driver": "High concrete fraction & sparse trees",
            "lat": 17.386,
            "lon": 78.471,
            "canopyCover": "16.4%",
            "builtFraction": "71.2%",
            "buildingHeight": "61.4 m",
            "skyView": 0.5,
            "windSpeed": "2.6 m/s",
            "pm25": "153.6 \u00b5g/m\u00b3",
            "ndvi": 0.219,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Hitec City Cyber Towers",
            "risk": "Moderate",
            "score": 72,
            "temp": "27.3\u00b0C",
            "lst": 27.3,
            "uhi": 6.9,
            "heat_index": 18.3,
            "wbgt": 10.1,
            "people": "14,105",
            "peopleNum": 14105,
            "driver": "Asphalt & glass heat reflection",
            "lat": 17.361,
            "lon": 78.52,
            "canopyCover": "0.0%",
            "builtFraction": "75.9%",
            "buildingHeight": "68.9 m",
            "skyView": 0.46,
            "windSpeed": "2.6 m/s",
            "pm25": "143.1 \u00b5g/m\u00b3",
            "ndvi": 0.064,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Secunderabad Station",
            "risk": "Moderate",
            "score": 66,
            "temp": "26.6\u00b0C",
            "lst": 26.6,
            "uhi": 5.0,
            "heat_index": 19.7,
            "wbgt": 15.8,
            "people": "8,680",
            "peopleNum": 8680,
            "driver": "Extensive metal sheds & transit heat",
            "lat": 17.445,
            "lon": 78.452,
            "canopyCover": "20.1%",
            "builtFraction": "72.0%",
            "buildingHeight": "76.2 m",
            "skyView": 0.39,
            "windSpeed": "3.2 m/s",
            "pm25": "135.5 \u00b5g/m\u00b3",
            "ndvi": 0.178,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Ameerpet Center",
            "risk": "Moderate",
            "score": 65,
            "temp": "26.0\u00b0C",
            "lst": 26.0,
            "uhi": 4.6,
            "heat_index": 18.1,
            "wbgt": 9.7,
            "people": "14,114",
            "peopleNum": 14114,
            "driver": "Commercial density & low sky view factor",
            "lat": 17.364,
            "lon": 78.42,
            "canopyCover": "19.7%",
            "builtFraction": "71.6%",
            "buildingHeight": "69.0 m",
            "skyView": 0.45,
            "windSpeed": "2.3 m/s",
            "pm25": "116.0 \u00b5g/m\u00b3",
            "ndvi": 0.206,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Uppal Industrial Zone",
            "risk": "Moderate",
            "score": 65,
            "temp": "25.4\u00b0C",
            "lst": 25.4,
            "uhi": 4.9,
            "heat_index": 18.2,
            "wbgt": 13.7,
            "people": "19,992",
            "peopleNum": 19992,
            "driver": "Industrial heat & low moisture",
            "lat": 17.376,
            "lon": 78.497,
            "canopyCover": "23.6%",
            "builtFraction": "76.1%",
            "buildingHeight": "77.1 m",
            "skyView": 0.47,
            "windSpeed": "2.4 m/s",
            "pm25": "170.5 \u00b5g/m\u00b3",
            "ndvi": 0.228,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Sanathnagar",
            "risk": "Moderate",
            "score": 65,
            "temp": "24.8\u00b0C",
            "lst": 24.8,
            "uhi": 2.8,
            "heat_index": 15.4,
            "wbgt": 9.8,
            "people": "13,548",
            "peopleNum": 13548,
            "driver": "Manufacturing shed roofs & low albedo",
            "lat": 17.345,
            "lon": 78.483,
            "canopyCover": "10.9%",
            "builtFraction": "84.0%",
            "buildingHeight": "68.1 m",
            "skyView": 0.5,
            "windSpeed": "2.2 m/s",
            "pm25": "141.9 \u00b5g/m\u00b3",
            "ndvi": 0.196,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      }
    }
  },
  "Kolkata": {
    "name": "Kolkata",
    "state": "West_Bengal",
    "climateZone": "Tropical Wet Dry",
    "elevationM": 9.055,
    "distanceToCoastKm": 60.0,
    "center": {
      "lat": 22.572607976829786,
      "lon": 88.3642161346769
    },
    "bounds": {
      "minLat": 22.363,
      "maxLat": 22.793,
      "minLon": 88.143,
      "maxLon": 88.566
    },
    "seasons": {
      "Summer": {
        "peakLst": 51.0,
        "meanLst": 39.7,
        "minLst": 26.0,
        "uhiMean": 6.6,
        "uhiMax": 12.0,
        "heatIndexMean": 36.4,
        "wbgtMean": 32.3,
        "hotspotCount": 2865,
        "totalRecords": 8271,
        "hotspotPct": 34.6,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.263,
          "treeCoverPct": 25.3,
          "imperviousPct": 59.2,
          "buildingDensityPct": 57.5,
          "buildingHeightM": 57.9,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 34.5,
          "humidityPct": 78.1,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 664.6,
          "pm25UgM3": 74.6,
          "populationDensity": 29449
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Burrabazar Wholesale Hub",
            "risk": "Very high",
            "score": 99,
            "temp": "51.0\u00b0C",
            "lst": 51.0,
            "uhi": 12.0,
            "heat_index": 42.5,
            "wbgt": 36.6,
            "people": "40,457",
            "peopleNum": 40457,
            "driver": "High building density & trapped heat",
            "lat": 22.573,
            "lon": 88.403,
            "canopyCover": "10.4%",
            "builtFraction": "82.1%",
            "buildingHeight": "70.8 m",
            "skyView": 0.42,
            "windSpeed": "2.6 m/s",
            "pm25": "90.4 \u00b5g/m\u00b3",
            "ndvi": 0.129,
            "albedo": 0.28,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Howrah Station Approach",
            "risk": "Very high",
            "score": 99,
            "temp": "44.9\u00b0C",
            "lst": 44.9,
            "uhi": 11.5,
            "heat_index": 39.2,
            "wbgt": 35.1,
            "people": "53,347",
            "peopleNum": 53347,
            "driver": "Massive concrete surfaces & traffic",
            "lat": 22.572,
            "lon": 88.372,
            "canopyCover": "7.9%",
            "builtFraction": "75.9%",
            "buildingHeight": "56.8 m",
            "skyView": 0.57,
            "windSpeed": "2.0 m/s",
            "pm25": "110.7 \u00b5g/m\u00b3",
            "ndvi": 0.126,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Topsia Tannery Cluster",
            "risk": "Very high",
            "score": 99,
            "temp": "43.7\u00b0C",
            "lst": 43.7,
            "uhi": 9.9,
            "heat_index": 37.4,
            "wbgt": 33.5,
            "people": "20,039",
            "peopleNum": 20039,
            "driver": "Dense industrial roofing & stagnant air",
            "lat": 22.621,
            "lon": 88.393,
            "canopyCover": "20.8%",
            "builtFraction": "64.1%",
            "buildingHeight": "52.7 m",
            "skyView": 0.6,
            "windSpeed": "2.6 m/s",
            "pm25": "72.8 \u00b5g/m\u00b3",
            "ndvi": 0.217,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Salt Lake Sector V",
            "risk": "Very high",
            "score": 99,
            "temp": "42.9\u00b0C",
            "lst": 42.9,
            "uhi": 9.3,
            "heat_index": 39.8,
            "wbgt": 34.7,
            "people": "29,032",
            "peopleNum": 29032,
            "driver": "Broad paved roads & glass facades",
            "lat": 22.644,
            "lon": 88.333,
            "canopyCover": "28.6%",
            "builtFraction": "56.6%",
            "buildingHeight": "45.1 m",
            "skyView": 0.63,
            "windSpeed": "3.4 m/s",
            "pm25": "69.0 \u00b5g/m\u00b3",
            "ndvi": 0.345,
            "albedo": 0.16,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h5",
            "name": "Sealdah Flyover Corridor",
            "risk": "Very high",
            "score": 99,
            "temp": "42.2\u00b0C",
            "lst": 42.2,
            "uhi": 8.4,
            "heat_index": 36.9,
            "wbgt": 32.2,
            "people": "22,250",
            "peopleNum": 22250,
            "driver": "Asphalt radiant heat & congestion",
            "lat": 22.583,
            "lon": 88.303,
            "canopyCover": "29.8%",
            "builtFraction": "52.8%",
            "buildingHeight": "53.8 m",
            "skyView": 0.49,
            "windSpeed": "2.5 m/s",
            "pm25": "95.3 \u00b5g/m\u00b3",
            "ndvi": 0.253,
            "albedo": 0.16,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Park Circus 7-Point",
            "risk": "Very high",
            "score": 99,
            "temp": "41.6\u00b0C",
            "lst": 41.6,
            "uhi": 8.3,
            "heat_index": 36.7,
            "wbgt": 33.2,
            "people": "28,760",
            "peopleNum": 28760,
            "driver": "High traffic volume & low canopy",
            "lat": 22.638,
            "lon": 88.361,
            "canopyCover": "15.9%",
            "builtFraction": "71.8%",
            "buildingHeight": "48.0 m",
            "skyView": 0.64,
            "windSpeed": "3.2 m/s",
            "pm25": "90.4 \u00b5g/m\u00b3",
            "ndvi": 0.185,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Dum Dum Cantonment",
            "risk": "Very high",
            "score": 99,
            "temp": "41.0\u00b0C",
            "lst": 41.0,
            "uhi": 9.2,
            "heat_index": 38.1,
            "wbgt": 34.2,
            "people": "26,213",
            "peopleNum": 26213,
            "driver": "Dense settlement & high humidity trap",
            "lat": 22.5,
            "lon": 88.384,
            "canopyCover": "19.8%",
            "builtFraction": "50.9%",
            "buildingHeight": "63.3 m",
            "skyView": 0.6,
            "windSpeed": "2.5 m/s",
            "pm25": "69.9 \u00b5g/m\u00b3",
            "ndvi": 0.227,
            "albedo": 0.14,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.1,
                "weight": 38
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Tollygunge Phari",
            "risk": "Very high",
            "score": 96,
            "temp": "40.5\u00b0C",
            "lst": 40.5,
            "uhi": 7.2,
            "heat_index": 35.8,
            "wbgt": 31.2,
            "people": "26,555",
            "peopleNum": 26555,
            "driver": "Urban canyon & high masonry heat",
            "lat": 22.615,
            "lon": 88.346,
            "canopyCover": "2.1%",
            "builtFraction": "70.8%",
            "buildingHeight": "64.9 m",
            "skyView": 0.41,
            "windSpeed": "2.3 m/s",
            "pm25": "110.2 \u00b5g/m\u00b3",
            "ndvi": 0.136,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          }
        ]
      },
      "Monsoon": {
        "peakLst": 47.3,
        "meanLst": 35.5,
        "minLst": 21.1,
        "uhiMean": 6.4,
        "uhiMax": 12.0,
        "heatIndexMean": 32.9,
        "wbgtMean": 30.9,
        "hotspotCount": 451,
        "totalRecords": 11137,
        "hotspotPct": 4.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.5,
          "imperviousPct": 59.2,
          "buildingDensityPct": 57.3,
          "buildingHeightM": 57.8,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 30.9,
          "humidityPct": 94.4,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 515.8,
          "pm25UgM3": 40.9,
          "populationDensity": 29464
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Burrabazar Wholesale Hub",
            "risk": "Very high",
            "score": 99,
            "temp": "47.3\u00b0C",
            "lst": 47.3,
            "uhi": 12.0,
            "heat_index": 38.4,
            "wbgt": 35.5,
            "people": "50,746",
            "peopleNum": 50746,
            "driver": "High building density & trapped heat",
            "lat": 22.565,
            "lon": 88.332,
            "canopyCover": "10.2%",
            "builtFraction": "85.5%",
            "buildingHeight": "75.4 m",
            "skyView": 0.42,
            "windSpeed": "2.7 m/s",
            "pm25": "59.6 \u00b5g/m\u00b3",
            "ndvi": 0.162,
            "albedo": 0.27,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Howrah Station Approach",
            "risk": "Very high",
            "score": 99,
            "temp": "40.6\u00b0C",
            "lst": 40.6,
            "uhi": 11.8,
            "heat_index": 34.6,
            "wbgt": 32.6,
            "people": "32,719",
            "peopleNum": 32719,
            "driver": "Massive concrete surfaces & traffic",
            "lat": 22.594,
            "lon": 88.357,
            "canopyCover": "8.1%",
            "builtFraction": "73.4%",
            "buildingHeight": "71.6 m",
            "skyView": 0.49,
            "windSpeed": "2.3 m/s",
            "pm25": "57.8 \u00b5g/m\u00b3",
            "ndvi": 0.106,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Topsia Tannery Cluster",
            "risk": "Very high",
            "score": 99,
            "temp": "39.5\u00b0C",
            "lst": 39.5,
            "uhi": 10.1,
            "heat_index": 34.5,
            "wbgt": 32.6,
            "people": "46,345",
            "peopleNum": 46345,
            "driver": "Dense industrial roofing & stagnant air",
            "lat": 22.636,
            "lon": 88.374,
            "canopyCover": "31.3%",
            "builtFraction": "64.3%",
            "buildingHeight": "71.1 m",
            "skyView": 0.41,
            "windSpeed": "3.2 m/s",
            "pm25": "53.1 \u00b5g/m\u00b3",
            "ndvi": 0.296,
            "albedo": 0.16,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h4",
            "name": "Salt Lake Sector V",
            "risk": "Very high",
            "score": 98,
            "temp": "38.7\u00b0C",
            "lst": 38.7,
            "uhi": 9.1,
            "heat_index": 33.2,
            "wbgt": 32.8,
            "people": "42,013",
            "peopleNum": 42013,
            "driver": "Broad paved roads & glass facades",
            "lat": 22.554,
            "lon": 88.435,
            "canopyCover": "17.3%",
            "builtFraction": "70.1%",
            "buildingHeight": "57.3 m",
            "skyView": 0.46,
            "windSpeed": "2.4 m/s",
            "pm25": "42.6 \u00b5g/m\u00b3",
            "ndvi": 0.176,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Sealdah Flyover Corridor",
            "risk": "Very high",
            "score": 96,
            "temp": "38.0\u00b0C",
            "lst": 38.0,
            "uhi": 8.8,
            "heat_index": 33.0,
            "wbgt": 30.5,
            "people": "35,973",
            "peopleNum": 35973,
            "driver": "Asphalt radiant heat & congestion",
            "lat": 22.541,
            "lon": 88.42,
            "canopyCover": "15.6%",
            "builtFraction": "62.0%",
            "buildingHeight": "69.9 m",
            "skyView": 0.44,
            "windSpeed": "3.0 m/s",
            "pm25": "32.2 \u00b5g/m\u00b3",
            "ndvi": 0.269,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Park Circus 7-Point",
            "risk": "Very high",
            "score": 93,
            "temp": "37.4\u00b0C",
            "lst": 37.4,
            "uhi": 8.2,
            "heat_index": 32.6,
            "wbgt": 32.6,
            "people": "36,063",
            "peopleNum": 36063,
            "driver": "High traffic volume & low canopy",
            "lat": 22.528,
            "lon": 88.346,
            "canopyCover": "26.2%",
            "builtFraction": "78.0%",
            "buildingHeight": "73.1 m",
            "skyView": 0.38,
            "windSpeed": "2.2 m/s",
            "pm25": "70.1 \u00b5g/m\u00b3",
            "ndvi": 0.262,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Dum Dum Cantonment",
            "risk": "Very high",
            "score": 89,
            "temp": "36.8\u00b0C",
            "lst": 36.8,
            "uhi": 6.9,
            "heat_index": 33.9,
            "wbgt": 30.3,
            "people": "19,873",
            "peopleNum": 19873,
            "driver": "Dense settlement & high humidity trap",
            "lat": 22.456,
            "lon": 88.39,
            "canopyCover": "19.9%",
            "builtFraction": "58.8%",
            "buildingHeight": "39.0 m",
            "skyView": 0.67,
            "windSpeed": "2.8 m/s",
            "pm25": "33.8 \u00b5g/m\u00b3",
            "ndvi": 0.187,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Tollygunge Phari",
            "risk": "Very high",
            "score": 88,
            "temp": "36.2\u00b0C",
            "lst": 36.2,
            "uhi": 7.1,
            "heat_index": 33.9,
            "wbgt": 32.6,
            "people": "24,567",
            "peopleNum": 24567,
            "driver": "Urban canyon & high masonry heat",
            "lat": 22.603,
            "lon": 88.329,
            "canopyCover": "15.0%",
            "builtFraction": "49.6%",
            "buildingHeight": "47.3 m",
            "skyView": 0.72,
            "windSpeed": "2.9 m/s",
            "pm25": "37.7 \u00b5g/m\u00b3",
            "ndvi": 0.147,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.1,
                "weight": 38
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          }
        ]
      },
      "Post_Monsoon": {
        "peakLst": 41.9,
        "meanLst": 28.9,
        "minLst": 15.9,
        "uhiMean": 4.9,
        "uhiMax": 12.0,
        "heatIndexMean": 24.5,
        "wbgtMean": 21.9,
        "hotspotCount": 1,
        "totalRecords": 5551,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.265,
          "treeCoverPct": 25.6,
          "imperviousPct": 59.1,
          "buildingDensityPct": 57.4,
          "buildingHeightM": 58.0,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 24.0,
          "humidityPct": 78.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 604.1,
          "pm25UgM3": 74.2,
          "populationDensity": 29434
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Burrabazar Wholesale Hub",
            "risk": "Very high",
            "score": 99,
            "temp": "41.9\u00b0C",
            "lst": 41.9,
            "uhi": 12.0,
            "heat_index": 31.4,
            "wbgt": 28.6,
            "people": "44,264",
            "peopleNum": 44264,
            "driver": "High building density & trapped heat",
            "lat": 22.56,
            "lon": 88.324,
            "canopyCover": "20.5%",
            "builtFraction": "72.0%",
            "buildingHeight": "76.8 m",
            "skyView": 0.35,
            "windSpeed": "2.5 m/s",
            "pm25": "86.1 \u00b5g/m\u00b3",
            "ndvi": 0.261,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 1.0,
                "weight": 32
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h2",
            "name": "Howrah Station Approach",
            "risk": "Very high",
            "score": 94,
            "temp": "34.2\u00b0C",
            "lst": 34.2,
            "uhi": 10.6,
            "heat_index": 25.4,
            "wbgt": 21.6,
            "people": "34,419",
            "peopleNum": 34419,
            "driver": "Massive concrete surfaces & traffic",
            "lat": 22.58,
            "lon": 88.391,
            "canopyCover": "19.1%",
            "builtFraction": "78.3%",
            "buildingHeight": "76.0 m",
            "skyView": 0.3,
            "windSpeed": "1.7 m/s",
            "pm25": "91.7 \u00b5g/m\u00b3",
            "ndvi": 0.228,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Topsia Tannery Cluster",
            "risk": "High",
            "score": 87,
            "temp": "33.0\u00b0C",
            "lst": 33.0,
            "uhi": 9.0,
            "heat_index": 27.3,
            "wbgt": 23.5,
            "people": "23,780",
            "peopleNum": 23780,
            "driver": "Dense industrial roofing & stagnant air",
            "lat": 22.532,
            "lon": 88.405,
            "canopyCover": "23.3%",
            "builtFraction": "65.4%",
            "buildingHeight": "48.2 m",
            "skyView": 0.58,
            "windSpeed": "3.0 m/s",
            "pm25": "64.5 \u00b5g/m\u00b3",
            "ndvi": 0.223,
            "albedo": 0.17,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Salt Lake Sector V",
            "risk": "High",
            "score": 82,
            "temp": "32.1\u00b0C",
            "lst": 32.1,
            "uhi": 7.5,
            "heat_index": 28.3,
            "wbgt": 26.3,
            "people": "38,270",
            "peopleNum": 38270,
            "driver": "Broad paved roads & glass facades",
            "lat": 22.639,
            "lon": 88.32,
            "canopyCover": "33.5%",
            "builtFraction": "54.0%",
            "buildingHeight": "62.4 m",
            "skyView": 0.55,
            "windSpeed": "3.6 m/s",
            "pm25": "79.3 \u00b5g/m\u00b3",
            "ndvi": 0.317,
            "albedo": 0.12,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h5",
            "name": "Sealdah Flyover Corridor",
            "risk": "High",
            "score": 80,
            "temp": "31.4\u00b0C",
            "lst": 31.4,
            "uhi": 7.3,
            "heat_index": 24.7,
            "wbgt": 22.1,
            "people": "43,917",
            "peopleNum": 43917,
            "driver": "Asphalt radiant heat & congestion",
            "lat": 22.579,
            "lon": 88.345,
            "canopyCover": "12.5%",
            "builtFraction": "70.5%",
            "buildingHeight": "64.2 m",
            "skyView": 0.51,
            "windSpeed": "2.5 m/s",
            "pm25": "90.1 \u00b5g/m\u00b3",
            "ndvi": 0.215,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Park Circus 7-Point",
            "risk": "High",
            "score": 78,
            "temp": "30.9\u00b0C",
            "lst": 30.9,
            "uhi": 6.8,
            "heat_index": 24.2,
            "wbgt": 23.3,
            "people": "33,768",
            "peopleNum": 33768,
            "driver": "High traffic volume & low canopy",
            "lat": 22.639,
            "lon": 88.346,
            "canopyCover": "23.2%",
            "builtFraction": "61.6%",
            "buildingHeight": "71.6 m",
            "skyView": 0.42,
            "windSpeed": "3.5 m/s",
            "pm25": "80.2 \u00b5g/m\u00b3",
            "ndvi": 0.202,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Dum Dum Cantonment",
            "risk": "High",
            "score": 76,
            "temp": "30.3\u00b0C",
            "lst": 30.3,
            "uhi": 6.3,
            "heat_index": 22.3,
            "wbgt": 19.7,
            "people": "39,958",
            "peopleNum": 39958,
            "driver": "Dense settlement & high humidity trap",
            "lat": 22.563,
            "lon": 88.309,
            "canopyCover": "15.4%",
            "builtFraction": "73.8%",
            "buildingHeight": "77.0 m",
            "skyView": 0.42,
            "windSpeed": "2.3 m/s",
            "pm25": "94.2 \u00b5g/m\u00b3",
            "ndvi": 0.191,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Tollygunge Phari",
            "risk": "Moderate",
            "score": 73,
            "temp": "29.8\u00b0C",
            "lst": 29.8,
            "uhi": 5.6,
            "heat_index": 27.5,
            "wbgt": 24.6,
            "people": "25,602",
            "peopleNum": 25602,
            "driver": "Urban canyon & high masonry heat",
            "lat": 22.516,
            "lon": 88.314,
            "canopyCover": "18.4%",
            "builtFraction": "61.7%",
            "buildingHeight": "56.3 m",
            "skyView": 0.55,
            "windSpeed": "3.0 m/s",
            "pm25": "92.5 \u00b5g/m\u00b3",
            "ndvi": 0.142,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          }
        ]
      },
      "Winter": {
        "peakLst": 36.6,
        "meanLst": 23.6,
        "minLst": 11.4,
        "uhiMean": 4.6,
        "uhiMax": 12.0,
        "heatIndexMean": 18.8,
        "wbgtMean": 15.5,
        "hotspotCount": 0,
        "totalRecords": 8187,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.5,
          "imperviousPct": 59.3,
          "buildingDensityPct": 57.6,
          "buildingHeightM": 58.0,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 18.8,
          "humidityPct": 70.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 591.5,
          "pm25UgM3": 119.0,
          "populationDensity": 29505
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Burrabazar Wholesale Hub",
            "risk": "Very high",
            "score": 99,
            "temp": "36.6\u00b0C",
            "lst": 36.6,
            "uhi": 12.0,
            "heat_index": 26.1,
            "wbgt": 23.0,
            "people": "30,378",
            "peopleNum": 30378,
            "driver": "High building density & trapped heat",
            "lat": 22.57,
            "lon": 88.349,
            "canopyCover": "7.6%",
            "builtFraction": "82.0%",
            "buildingHeight": "77.4 m",
            "skyView": 0.36,
            "windSpeed": "1.8 m/s",
            "pm25": "128.1 \u00b5g/m\u00b3",
            "ndvi": 0.064,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Howrah Station Approach",
            "risk": "High",
            "score": 80,
            "temp": "28.8\u00b0C",
            "lst": 28.8,
            "uhi": 9.1,
            "heat_index": 19.1,
            "wbgt": 17.2,
            "people": "49,382",
            "peopleNum": 49382,
            "driver": "Massive concrete surfaces & traffic",
            "lat": 22.567,
            "lon": 88.32,
            "canopyCover": "14.2%",
            "builtFraction": "78.3%",
            "buildingHeight": "77.2 m",
            "skyView": 0.37,
            "windSpeed": "2.7 m/s",
            "pm25": "138.0 \u00b5g/m\u00b3",
            "ndvi": 0.111,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Topsia Tannery Cluster",
            "risk": "High",
            "score": 76,
            "temp": "27.7\u00b0C",
            "lst": 27.7,
            "uhi": 8.1,
            "heat_index": 22.0,
            "wbgt": 18.9,
            "people": "35,353",
            "peopleNum": 35353,
            "driver": "Dense industrial roofing & stagnant air",
            "lat": 22.657,
            "lon": 88.417,
            "canopyCover": "31.9%",
            "builtFraction": "61.6%",
            "buildingHeight": "62.9 m",
            "skyView": 0.54,
            "windSpeed": "3.0 m/s",
            "pm25": "131.1 \u00b5g/m\u00b3",
            "ndvi": 0.299,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h4",
            "name": "Salt Lake Sector V",
            "risk": "Moderate",
            "score": 74,
            "temp": "26.8\u00b0C",
            "lst": 26.8,
            "uhi": 8.0,
            "heat_index": 18.6,
            "wbgt": 15.0,
            "people": "39,196",
            "peopleNum": 39196,
            "driver": "Broad paved roads & glass facades",
            "lat": 22.565,
            "lon": 88.341,
            "canopyCover": "25.0%",
            "builtFraction": "65.5%",
            "buildingHeight": "69.2 m",
            "skyView": 0.44,
            "windSpeed": "2.8 m/s",
            "pm25": "118.8 \u00b5g/m\u00b3",
            "ndvi": 0.259,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Sealdah Flyover Corridor",
            "risk": "Moderate",
            "score": 71,
            "temp": "26.2\u00b0C",
            "lst": 26.2,
            "uhi": 7.2,
            "heat_index": 16.8,
            "wbgt": 13.4,
            "people": "21,140",
            "peopleNum": 21140,
            "driver": "Asphalt radiant heat & congestion",
            "lat": 22.52,
            "lon": 88.425,
            "canopyCover": "16.0%",
            "builtFraction": "66.1%",
            "buildingHeight": "57.0 m",
            "skyView": 0.42,
            "windSpeed": "2.6 m/s",
            "pm25": "112.7 \u00b5g/m\u00b3",
            "ndvi": 0.237,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Park Circus 7-Point",
            "risk": "Moderate",
            "score": 67,
            "temp": "25.6\u00b0C",
            "lst": 25.6,
            "uhi": 6.2,
            "heat_index": 18.2,
            "wbgt": 15.9,
            "people": "36,348",
            "peopleNum": 36348,
            "driver": "High traffic volume & low canopy",
            "lat": 22.526,
            "lon": 88.332,
            "canopyCover": "26.0%",
            "builtFraction": "79.8%",
            "buildingHeight": "53.6 m",
            "skyView": 0.57,
            "windSpeed": "2.2 m/s",
            "pm25": "124.7 \u00b5g/m\u00b3",
            "ndvi": 0.287,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h7",
            "name": "Dum Dum Cantonment",
            "risk": "Moderate",
            "score": 65,
            "temp": "25.1\u00b0C",
            "lst": 25.1,
            "uhi": 5.6,
            "heat_index": 16.6,
            "wbgt": 14.2,
            "people": "29,800",
            "peopleNum": 29800,
            "driver": "Dense settlement & high humidity trap",
            "lat": 22.528,
            "lon": 88.326,
            "canopyCover": "24.2%",
            "builtFraction": "85.5%",
            "buildingHeight": "62.8 m",
            "skyView": 0.41,
            "windSpeed": "2.5 m/s",
            "pm25": "127.9 \u00b5g/m\u00b3",
            "ndvi": 0.275,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Tollygunge Phari",
            "risk": "Moderate",
            "score": 65,
            "temp": "24.5\u00b0C",
            "lst": 24.5,
            "uhi": 6.1,
            "heat_index": 17.1,
            "wbgt": 13.3,
            "people": "26,461",
            "peopleNum": 26461,
            "driver": "Urban canyon & high masonry heat",
            "lat": 22.605,
            "lon": 88.358,
            "canopyCover": "7.0%",
            "builtFraction": "68.1%",
            "buildingHeight": "55.8 m",
            "skyView": 0.51,
            "windSpeed": "2.2 m/s",
            "pm25": "108.6 \u00b5g/m\u00b3",
            "ndvi": 0.132,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          }
        ]
      }
    }
  },
  "Ahmedabad": {
    "name": "Ahmedabad",
    "state": "Gujarat",
    "climateZone": "Semi Arid",
    "elevationM": 53.204,
    "distanceToCoastKm": 150.0,
    "center": {
      "lat": 23.02261821408163,
      "lon": 72.57157358116034
    },
    "bounds": {
      "minLat": 22.839,
      "maxLat": 23.211,
      "minLon": 72.379,
      "maxLon": 72.796
    },
    "seasons": {
      "Summer": {
        "peakLst": 54.7,
        "meanLst": 43.6,
        "minLst": 29.0,
        "uhiMean": 6.6,
        "uhiMax": 12.0,
        "heatIndexMean": 38.9,
        "wbgtMean": 32.1,
        "hotspotCount": 3304,
        "totalRecords": 8352,
        "hotspotPct": 39.6,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.265,
          "treeCoverPct": 25.5,
          "imperviousPct": 59.2,
          "buildingDensityPct": 57.5,
          "buildingHeightM": 58.1,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 38.4,
          "humidityPct": 48.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 664.9,
          "pm25UgM3": 69.9,
          "populationDensity": 15372
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Vatva GIDC Industrial",
            "risk": "Very high",
            "score": 99,
            "temp": "54.7\u00b0C",
            "lst": 54.7,
            "uhi": 12.0,
            "heat_index": 43.9,
            "wbgt": 37.6,
            "people": "11,631",
            "peopleNum": 11631,
            "driver": "Chemical/metal sheds & arid winds",
            "lat": 22.991,
            "lon": 72.663,
            "canopyCover": "0.0%",
            "builtFraction": "80.3%",
            "buildingHeight": "73.1 m",
            "skyView": 0.36,
            "windSpeed": "5.9 m/s",
            "pm25": "66.4 \u00b5g/m\u00b3",
            "ndvi": 0.01,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h2",
            "name": "Kalupur Railway Corridor",
            "risk": "Very high",
            "score": 99,
            "temp": "49.0\u00b0C",
            "lst": 49.0,
            "uhi": 12.0,
            "heat_index": 42.5,
            "wbgt": 36.4,
            "people": "22,465",
            "peopleNum": 22465,
            "driver": "High masonry thermal mass & low shade",
            "lat": 23.043,
            "lon": 72.592,
            "canopyCover": "15.1%",
            "builtFraction": "61.2%",
            "buildingHeight": "63.8 m",
            "skyView": 0.48,
            "windSpeed": "2.0 m/s",
            "pm25": "74.0 \u00b5g/m\u00b3",
            "ndvi": 0.278,
            "albedo": 0.17,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h3",
            "name": "Naroda GIDC Phase 2",
            "risk": "Very high",
            "score": 99,
            "temp": "47.7\u00b0C",
            "lst": 47.7,
            "uhi": 11.1,
            "heat_index": 42.5,
            "wbgt": 36.1,
            "people": "14,048",
            "peopleNum": 14048,
            "driver": "Asphalt pavements & industrial emissivity",
            "lat": 22.944,
            "lon": 72.604,
            "canopyCover": "34.9%",
            "builtFraction": "54.3%",
            "buildingHeight": "50.3 m",
            "skyView": 0.64,
            "windSpeed": "3.4 m/s",
            "pm25": "55.8 \u00b5g/m\u00b3",
            "ndvi": 0.334,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h4",
            "name": "Maninagar Crossing",
            "risk": "Very high",
            "score": 99,
            "temp": "46.9\u00b0C",
            "lst": 46.9,
            "uhi": 10.6,
            "heat_index": 39.1,
            "wbgt": 32.2,
            "people": "22,512",
            "peopleNum": 22512,
            "driver": "Dense residential concrete & sparse green",
            "lat": 23.022,
            "lon": 72.583,
            "canopyCover": "25.9%",
            "builtFraction": "79.0%",
            "buildingHeight": "79.9 m",
            "skyView": 0.41,
            "windSpeed": "3.1 m/s",
            "pm25": "81.3 \u00b5g/m\u00b3",
            "ndvi": 0.295,
            "albedo": 0.28,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h5",
            "name": "Bapunagar Diamond Market",
            "risk": "Very high",
            "score": 99,
            "temp": "46.2\u00b0C",
            "lst": 46.2,
            "uhi": 8.2,
            "heat_index": 41.0,
            "wbgt": 34.6,
            "people": "17,529",
            "peopleNum": 17529,
            "driver": "Dense roofing & low sky view",
            "lat": 23.067,
            "lon": 72.556,
            "canopyCover": "30.1%",
            "builtFraction": "57.5%",
            "buildingHeight": "54.5 m",
            "skyView": 0.55,
            "windSpeed": "2.3 m/s",
            "pm25": "64.6 \u00b5g/m\u00b3",
            "ndvi": 0.269,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "SG Highway Thaltej",
            "risk": "Very high",
            "score": 99,
            "temp": "45.6\u00b0C",
            "lst": 45.6,
            "uhi": 8.4,
            "heat_index": 40.5,
            "wbgt": 34.7,
            "people": "18,027",
            "peopleNum": 18027,
            "driver": "Multi-lane asphalt & high solar radiation",
            "lat": 23.079,
            "lon": 72.596,
            "canopyCover": "15.3%",
            "builtFraction": "63.2%",
            "buildingHeight": "43.5 m",
            "skyView": 0.65,
            "windSpeed": "3.8 m/s",
            "pm25": "67.0 \u00b5g/m\u00b3",
            "ndvi": 0.155,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h7",
            "name": "Danilimda Industrial",
            "risk": "Very high",
            "score": 99,
            "temp": "45.0\u00b0C",
            "lst": 45.0,
            "uhi": 7.7,
            "heat_index": 35.8,
            "wbgt": 29.0,
            "people": "15,554",
            "peopleNum": 15554,
            "driver": "Heat retention in low-albedo roofs",
            "lat": 22.994,
            "lon": 72.502,
            "canopyCover": "23.4%",
            "builtFraction": "67.6%",
            "buildingHeight": "57.7 m",
            "skyView": 0.42,
            "windSpeed": "4.0 m/s",
            "pm25": "73.6 \u00b5g/m\u00b3",
            "ndvi": 0.201,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Ashram Road Commercial",
            "risk": "Very high",
            "score": 99,
            "temp": "44.5\u00b0C",
            "lst": 44.5,
            "uhi": 7.4,
            "heat_index": 36.8,
            "wbgt": 32.5,
            "people": "22,582",
            "peopleNum": 22582,
            "driver": "High building height & vehicular load",
            "lat": 23.051,
            "lon": 72.623,
            "canopyCover": "18.2%",
            "builtFraction": "72.3%",
            "buildingHeight": "54.6 m",
            "skyView": 0.58,
            "windSpeed": "3.0 m/s",
            "pm25": "68.5 \u00b5g/m\u00b3",
            "ndvi": 0.177,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Monsoon": {
        "peakLst": 48.1,
        "meanLst": 35.4,
        "minLst": 21.6,
        "uhiMean": 6.3,
        "uhiMax": 12.0,
        "heatIndexMean": 31.7,
        "wbgtMean": 26.9,
        "hotspotCount": 22,
        "totalRecords": 11199,
        "hotspotPct": 0.2,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.0,
          "buildingDensityPct": 57.2,
          "buildingHeightM": 57.6,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 30.7,
          "humidityPct": 66.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 515.6,
          "pm25UgM3": 38.6,
          "populationDensity": 15284
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Vatva GIDC Industrial",
            "risk": "Very high",
            "score": 99,
            "temp": "48.1\u00b0C",
            "lst": 48.1,
            "uhi": 12.0,
            "heat_index": 35.7,
            "wbgt": 31.8,
            "people": "20,002",
            "peopleNum": 20002,
            "driver": "Chemical/metal sheds & arid winds",
            "lat": 22.99,
            "lon": 72.574,
            "canopyCover": "5.0%",
            "builtFraction": "84.1%",
            "buildingHeight": "84.7 m",
            "skyView": 0.37,
            "windSpeed": "1.9 m/s",
            "pm25": "44.1 \u00b5g/m\u00b3",
            "ndvi": 0.052,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 1.0,
                "weight": 32
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h2",
            "name": "Kalupur Railway Corridor",
            "risk": "Very high",
            "score": 99,
            "temp": "40.6\u00b0C",
            "lst": 40.6,
            "uhi": 12.0,
            "heat_index": 31.9,
            "wbgt": 28.1,
            "people": "17,939",
            "peopleNum": 17939,
            "driver": "High masonry thermal mass & low shade",
            "lat": 23.035,
            "lon": 72.549,
            "canopyCover": "17.8%",
            "builtFraction": "78.3%",
            "buildingHeight": "74.4 m",
            "skyView": 0.4,
            "windSpeed": "2.1 m/s",
            "pm25": "45.0 \u00b5g/m\u00b3",
            "ndvi": 0.214,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Naroda GIDC Phase 2",
            "risk": "Very high",
            "score": 99,
            "temp": "39.5\u00b0C",
            "lst": 39.5,
            "uhi": 10.3,
            "heat_index": 33.2,
            "wbgt": 28.7,
            "people": "22,852",
            "peopleNum": 22852,
            "driver": "Asphalt pavements & industrial emissivity",
            "lat": 22.986,
            "lon": 72.577,
            "canopyCover": "9.9%",
            "builtFraction": "72.5%",
            "buildingHeight": "78.8 m",
            "skyView": 0.33,
            "windSpeed": "2.3 m/s",
            "pm25": "66.0 \u00b5g/m\u00b3",
            "ndvi": 0.131,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h4",
            "name": "Maninagar Crossing",
            "risk": "Very high",
            "score": 99,
            "temp": "38.6\u00b0C",
            "lst": 38.6,
            "uhi": 10.4,
            "heat_index": 29.4,
            "wbgt": 24.8,
            "people": "18,919",
            "peopleNum": 18919,
            "driver": "Dense residential concrete & sparse green",
            "lat": 23.074,
            "lon": 72.539,
            "canopyCover": "6.9%",
            "builtFraction": "69.1%",
            "buildingHeight": "84.5 m",
            "skyView": 0.31,
            "windSpeed": "3.2 m/s",
            "pm25": "38.1 \u00b5g/m\u00b3",
            "ndvi": 0.068,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Bapunagar Diamond Market",
            "risk": "Very high",
            "score": 97,
            "temp": "37.9\u00b0C",
            "lst": 37.9,
            "uhi": 9.3,
            "heat_index": 31.6,
            "wbgt": 28.9,
            "people": "17,809",
            "peopleNum": 17809,
            "driver": "Dense roofing & low sky view",
            "lat": 23.063,
            "lon": 72.606,
            "canopyCover": "19.8%",
            "builtFraction": "71.2%",
            "buildingHeight": "53.8 m",
            "skyView": 0.55,
            "windSpeed": "2.3 m/s",
            "pm25": "40.8 \u00b5g/m\u00b3",
            "ndvi": 0.186,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "SG Highway Thaltej",
            "risk": "Very high",
            "score": 94,
            "temp": "37.3\u00b0C",
            "lst": 37.3,
            "uhi": 8.5,
            "heat_index": 30.4,
            "wbgt": 26.5,
            "people": "20,131",
            "peopleNum": 20131,
            "driver": "Multi-lane asphalt & high solar radiation",
            "lat": 22.998,
            "lon": 72.581,
            "canopyCover": "21.7%",
            "builtFraction": "82.9%",
            "buildingHeight": "69.2 m",
            "skyView": 0.47,
            "windSpeed": "3.2 m/s",
            "pm25": "18.5 \u00b5g/m\u00b3",
            "ndvi": 0.349,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h7",
            "name": "Danilimda Industrial",
            "risk": "Very high",
            "score": 91,
            "temp": "36.8\u00b0C",
            "lst": 36.8,
            "uhi": 7.8,
            "heat_index": 30.5,
            "wbgt": 26.4,
            "people": "16,533",
            "peopleNum": 16533,
            "driver": "Heat retention in low-albedo roofs",
            "lat": 23.03,
            "lon": 72.549,
            "canopyCover": "13.4%",
            "builtFraction": "71.5%",
            "buildingHeight": "83.2 m",
            "skyView": 0.4,
            "windSpeed": "3.9 m/s",
            "pm25": "43.3 \u00b5g/m\u00b3",
            "ndvi": 0.112,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h8",
            "name": "Ashram Road Commercial",
            "risk": "Very high",
            "score": 89,
            "temp": "36.2\u00b0C",
            "lst": 36.2,
            "uhi": 7.3,
            "heat_index": 29.5,
            "wbgt": 25.1,
            "people": "20,964",
            "peopleNum": 20964,
            "driver": "High building height & vehicular load",
            "lat": 23.023,
            "lon": 72.523,
            "canopyCover": "17.7%",
            "builtFraction": "65.6%",
            "buildingHeight": "63.2 m",
            "skyView": 0.45,
            "windSpeed": "2.4 m/s",
            "pm25": "35.6 \u00b5g/m\u00b3",
            "ndvi": 0.233,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Post_Monsoon": {
        "peakLst": 38.4,
        "meanLst": 27.4,
        "minLst": 14.0,
        "uhiMean": 5.0,
        "uhiMax": 12.0,
        "heatIndexMean": 22.4,
        "wbgtMean": 16.1,
        "hotspotCount": 0,
        "totalRecords": 5580,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.262,
          "treeCoverPct": 25.3,
          "imperviousPct": 59.4,
          "buildingDensityPct": 57.7,
          "buildingHeightM": 58.0,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 22.4,
          "humidityPct": 48.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 604.9,
          "pm25UgM3": 70.5,
          "populationDensity": 15373
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Vatva GIDC Industrial",
            "risk": "Very high",
            "score": 99,
            "temp": "38.4\u00b0C",
            "lst": 38.4,
            "uhi": 12.0,
            "heat_index": 27.3,
            "wbgt": 24.3,
            "people": "18,997",
            "peopleNum": 18997,
            "driver": "Chemical/metal sheds & arid winds",
            "lat": 23.002,
            "lon": 72.597,
            "canopyCover": "10.5%",
            "builtFraction": "74.3%",
            "buildingHeight": "63.5 m",
            "skyView": 0.44,
            "windSpeed": "2.3 m/s",
            "pm25": "80.1 \u00b5g/m\u00b3",
            "ndvi": 0.138,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Kalupur Railway Corridor",
            "risk": "Very high",
            "score": 89,
            "temp": "32.6\u00b0C",
            "lst": 32.6,
            "uhi": 9.8,
            "heat_index": 24.3,
            "wbgt": 17.4,
            "people": "18,664",
            "peopleNum": 18664,
            "driver": "High masonry thermal mass & low shade",
            "lat": 23.051,
            "lon": 72.551,
            "canopyCover": "2.4%",
            "builtFraction": "75.5%",
            "buildingHeight": "70.5 m",
            "skyView": 0.37,
            "windSpeed": "2.3 m/s",
            "pm25": "108.5 \u00b5g/m\u00b3",
            "ndvi": 0.054,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h3",
            "name": "Naroda GIDC Phase 2",
            "risk": "High",
            "score": 86,
            "temp": "31.5\u00b0C",
            "lst": 31.5,
            "uhi": 9.7,
            "heat_index": 25.4,
            "wbgt": 20.7,
            "people": "16,553",
            "peopleNum": 16553,
            "driver": "Asphalt pavements & industrial emissivity",
            "lat": 22.986,
            "lon": 72.57,
            "canopyCover": "19.5%",
            "builtFraction": "59.2%",
            "buildingHeight": "61.3 m",
            "skyView": 0.43,
            "windSpeed": "2.0 m/s",
            "pm25": "76.6 \u00b5g/m\u00b3",
            "ndvi": 0.233,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Maninagar Crossing",
            "risk": "High",
            "score": 81,
            "temp": "30.7\u00b0C",
            "lst": 30.7,
            "uhi": 7.9,
            "heat_index": 21.7,
            "wbgt": 17.0,
            "people": "13,902",
            "peopleNum": 13902,
            "driver": "Dense residential concrete & sparse green",
            "lat": 23.008,
            "lon": 72.606,
            "canopyCover": "9.1%",
            "builtFraction": "77.3%",
            "buildingHeight": "86.5 m",
            "skyView": 0.4,
            "windSpeed": "4.7 m/s",
            "pm25": "72.8 \u00b5g/m\u00b3",
            "ndvi": 0.11,
            "albedo": 0.28,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Bapunagar Diamond Market",
            "risk": "High",
            "score": 80,
            "temp": "30.0\u00b0C",
            "lst": 30.0,
            "uhi": 8.3,
            "heat_index": 23.2,
            "wbgt": 17.4,
            "people": "20,700",
            "peopleNum": 20700,
            "driver": "Dense roofing & low sky view",
            "lat": 22.975,
            "lon": 72.567,
            "canopyCover": "26.8%",
            "builtFraction": "75.5%",
            "buildingHeight": "64.0 m",
            "skyView": 0.46,
            "windSpeed": "2.8 m/s",
            "pm25": "82.7 \u00b5g/m\u00b3",
            "ndvi": 0.257,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "SG Highway Thaltej",
            "risk": "High",
            "score": 76,
            "temp": "29.4\u00b0C",
            "lst": 29.4,
            "uhi": 7.0,
            "heat_index": 21.8,
            "wbgt": 17.2,
            "people": "17,883",
            "peopleNum": 17883,
            "driver": "Multi-lane asphalt & high solar radiation",
            "lat": 23.051,
            "lon": 72.531,
            "canopyCover": "19.5%",
            "builtFraction": "76.3%",
            "buildingHeight": "58.0 m",
            "skyView": 0.47,
            "windSpeed": "2.6 m/s",
            "pm25": "82.0 \u00b5g/m\u00b3",
            "ndvi": 0.228,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Danilimda Industrial",
            "risk": "Moderate",
            "score": 73,
            "temp": "28.8\u00b0C",
            "lst": 28.8,
            "uhi": 6.4,
            "heat_index": 20.4,
            "wbgt": 14.6,
            "people": "14,275",
            "peopleNum": 14275,
            "driver": "Heat retention in low-albedo roofs",
            "lat": 23.014,
            "lon": 72.486,
            "canopyCover": "8.9%",
            "builtFraction": "67.5%",
            "buildingHeight": "60.0 m",
            "skyView": 0.45,
            "windSpeed": "2.8 m/s",
            "pm25": "92.0 \u00b5g/m\u00b3",
            "ndvi": 0.185,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Ashram Road Commercial",
            "risk": "Moderate",
            "score": 72,
            "temp": "28.2\u00b0C",
            "lst": 28.2,
            "uhi": 6.3,
            "heat_index": 23.3,
            "wbgt": 14.7,
            "people": "14,401",
            "peopleNum": 14401,
            "driver": "High building height & vehicular load",
            "lat": 23.073,
            "lon": 72.531,
            "canopyCover": "31.0%",
            "builtFraction": "48.5%",
            "buildingHeight": "54.5 m",
            "skyView": 0.62,
            "windSpeed": "4.8 m/s",
            "pm25": "37.5 \u00b5g/m\u00b3",
            "ndvi": 0.293,
            "albedo": 0.15,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.1,
                "weight": 38
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Winter": {
        "peakLst": 31.7,
        "meanLst": 20.5,
        "minLst": 8.0,
        "uhiMean": 4.5,
        "uhiMax": 12.0,
        "heatIndexMean": 15.6,
        "wbgtMean": 8.2,
        "hotspotCount": 0,
        "totalRecords": 8118,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.266,
          "treeCoverPct": 25.6,
          "imperviousPct": 59.1,
          "buildingDensityPct": 57.2,
          "buildingHeightM": 57.6,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 15.6,
          "humidityPct": 40.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 592.3,
          "pm25UgM3": 111.8,
          "populationDensity": 15293
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Vatva GIDC Industrial",
            "risk": "Very high",
            "score": 93,
            "temp": "31.7\u00b0C",
            "lst": 31.7,
            "uhi": 12.0,
            "heat_index": 19.6,
            "wbgt": 13.1,
            "people": "18,541",
            "peopleNum": 18541,
            "driver": "Chemical/metal sheds & arid winds",
            "lat": 23.032,
            "lon": 72.513,
            "canopyCover": "4.8%",
            "builtFraction": "72.0%",
            "buildingHeight": "77.0 m",
            "skyView": 0.48,
            "windSpeed": "2.2 m/s",
            "pm25": "176.8 \u00b5g/m\u00b3",
            "ndvi": 0.062,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Kalupur Railway Corridor",
            "risk": "High",
            "score": 75,
            "temp": "25.7\u00b0C",
            "lst": 25.7,
            "uhi": 9.4,
            "heat_index": 17.2,
            "wbgt": 8.5,
            "people": "24,712",
            "peopleNum": 24712,
            "driver": "High masonry thermal mass & low shade",
            "lat": 23.055,
            "lon": 72.556,
            "canopyCover": "21.9%",
            "builtFraction": "72.6%",
            "buildingHeight": "73.5 m",
            "skyView": 0.42,
            "windSpeed": "3.6 m/s",
            "pm25": "128.1 \u00b5g/m\u00b3",
            "ndvi": 0.228,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Naroda GIDC Phase 2",
            "risk": "Moderate",
            "score": 71,
            "temp": "24.5\u00b0C",
            "lst": 24.5,
            "uhi": 8.7,
            "heat_index": 17.5,
            "wbgt": 12.4,
            "people": "15,174",
            "peopleNum": 15174,
            "driver": "Asphalt pavements & industrial emissivity",
            "lat": 23.053,
            "lon": 72.603,
            "canopyCover": "24.7%",
            "builtFraction": "75.9%",
            "buildingHeight": "62.5 m",
            "skyView": 0.41,
            "windSpeed": "3.2 m/s",
            "pm25": "167.9 \u00b5g/m\u00b3",
            "ndvi": 0.271,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Maninagar Crossing",
            "risk": "Moderate",
            "score": 68,
            "temp": "23.7\u00b0C",
            "lst": 23.7,
            "uhi": 8.1,
            "heat_index": 15.6,
            "wbgt": 9.6,
            "people": "15,782",
            "peopleNum": 15782,
            "driver": "Dense residential concrete & sparse green",
            "lat": 22.991,
            "lon": 72.634,
            "canopyCover": "29.1%",
            "builtFraction": "66.0%",
            "buildingHeight": "58.0 m",
            "skyView": 0.54,
            "windSpeed": "3.6 m/s",
            "pm25": "117.3 \u00b5g/m\u00b3",
            "ndvi": 0.276,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Bapunagar Diamond Market",
            "risk": "Moderate",
            "score": 65,
            "temp": "23.1\u00b0C",
            "lst": 23.1,
            "uhi": 7.0,
            "heat_index": 18.4,
            "wbgt": 9.6,
            "people": "24,855",
            "peopleNum": 24855,
            "driver": "Dense roofing & low sky view",
            "lat": 23.038,
            "lon": 72.575,
            "canopyCover": "14.2%",
            "builtFraction": "69.0%",
            "buildingHeight": "66.1 m",
            "skyView": 0.56,
            "windSpeed": "3.2 m/s",
            "pm25": "136.8 \u00b5g/m\u00b3",
            "ndvi": 0.145,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h6",
            "name": "SG Highway Thaltej",
            "risk": "Moderate",
            "score": 65,
            "temp": "22.4\u00b0C",
            "lst": 22.4,
            "uhi": 6.3,
            "heat_index": 17.9,
            "wbgt": 11.6,
            "people": "16,237",
            "peopleNum": 16237,
            "driver": "Multi-lane asphalt & high solar radiation",
            "lat": 23.088,
            "lon": 72.572,
            "canopyCover": "6.6%",
            "builtFraction": "65.8%",
            "buildingHeight": "49.1 m",
            "skyView": 0.55,
            "windSpeed": "3.4 m/s",
            "pm25": "83.7 \u00b5g/m\u00b3",
            "ndvi": 0.135,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h7",
            "name": "Danilimda Industrial",
            "risk": "Moderate",
            "score": 65,
            "temp": "21.9\u00b0C",
            "lst": 21.9,
            "uhi": 5.9,
            "heat_index": 15.5,
            "wbgt": 8.7,
            "people": "18,193",
            "peopleNum": 18193,
            "driver": "Heat retention in low-albedo roofs",
            "lat": 23.048,
            "lon": 72.524,
            "canopyCover": "21.4%",
            "builtFraction": "69.2%",
            "buildingHeight": "59.2 m",
            "skyView": 0.52,
            "windSpeed": "2.3 m/s",
            "pm25": "99.7 \u00b5g/m\u00b3",
            "ndvi": 0.255,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Ashram Road Commercial",
            "risk": "Moderate",
            "score": 65,
            "temp": "21.3\u00b0C",
            "lst": 21.3,
            "uhi": 6.0,
            "heat_index": 14.0,
            "wbgt": 7.1,
            "people": "16,230",
            "peopleNum": 16230,
            "driver": "High building height & vehicular load",
            "lat": 23.054,
            "lon": 72.521,
            "canopyCover": "27.6%",
            "builtFraction": "65.2%",
            "buildingHeight": "33.4 m",
            "skyView": 0.65,
            "windSpeed": "2.9 m/s",
            "pm25": "128.8 \u00b5g/m\u00b3",
            "ndvi": 0.269,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      }
    }
  },
  "Pune": {
    "name": "Pune",
    "state": "Maharashtra",
    "climateZone": "Tropical Savanna",
    "elevationM": 559.959,
    "distanceToCoastKm": 120.0,
    "center": {
      "lat": 18.519829504558544,
      "lon": 73.85675557821497
    },
    "bounds": {
      "minLat": 18.339,
      "maxLat": 18.699,
      "minLon": 73.62,
      "maxLon": 74.055
    },
    "seasons": {
      "Summer": {
        "peakLst": 45.3,
        "meanLst": 34.9,
        "minLst": 22.9,
        "uhiMean": 4.9,
        "uhiMax": 12.0,
        "heatIndexMean": 30.3,
        "wbgtMean": 24.5,
        "hotspotCount": 3216,
        "totalRecords": 8397,
        "hotspotPct": 38.3,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.265,
          "treeCoverPct": 25.5,
          "imperviousPct": 59.1,
          "buildingDensityPct": 57.2,
          "buildingHeightM": 57.8,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 29.8,
          "humidityPct": 55.1,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 664.3,
          "pm25UgM3": 69.2,
          "populationDensity": 12866
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Hadapsar Industrial Estate",
            "risk": "Very high",
            "score": 99,
            "temp": "45.3\u00b0C",
            "lst": 45.3,
            "uhi": 12.0,
            "heat_index": 34.7,
            "wbgt": 30.5,
            "people": "19,526",
            "peopleNum": 19526,
            "driver": "Industrial roofing & low canopy",
            "lat": 18.534,
            "lon": 73.867,
            "canopyCover": "16.8%",
            "builtFraction": "92.0%",
            "buildingHeight": "69.3 m",
            "skyView": 0.52,
            "windSpeed": "3.0 m/s",
            "pm25": "103.7 \u00b5g/m\u00b3",
            "ndvi": 0.176,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 2.0,
                "weight": 70
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h2",
            "name": "Shivajinagar Station",
            "risk": "Very high",
            "score": 99,
            "temp": "40.4\u00b0C",
            "lst": 40.4,
            "uhi": 10.1,
            "heat_index": 34.0,
            "wbgt": 28.8,
            "people": "19,905",
            "peopleNum": 19905,
            "driver": "Traffic concentration & asphalt heat",
            "lat": 18.504,
            "lon": 73.912,
            "canopyCover": "20.1%",
            "builtFraction": "67.3%",
            "buildingHeight": "57.5 m",
            "skyView": 0.62,
            "windSpeed": "3.9 m/s",
            "pm25": "57.9 \u00b5g/m\u00b3",
            "ndvi": 0.208,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Pimpri MIDC Phase 1",
            "risk": "Very high",
            "score": 99,
            "temp": "39.1\u00b0C",
            "lst": 39.1,
            "uhi": 9.1,
            "heat_index": 33.4,
            "wbgt": 29.0,
            "people": "16,409",
            "peopleNum": 16409,
            "driver": "Automobile manufacturing shed roofs",
            "lat": 18.467,
            "lon": 73.878,
            "canopyCover": "20.6%",
            "builtFraction": "66.3%",
            "buildingHeight": "74.8 m",
            "skyView": 0.47,
            "windSpeed": "4.3 m/s",
            "pm25": "89.0 \u00b5g/m\u00b3",
            "ndvi": 0.199,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Swargate Bus Terminal",
            "risk": "Very high",
            "score": 93,
            "temp": "38.2\u00b0C",
            "lst": 38.2,
            "uhi": 7.4,
            "heat_index": 32.2,
            "wbgt": 26.5,
            "people": "10,675",
            "peopleNum": 10675,
            "driver": "High vehicular emissions & concrete ground",
            "lat": 18.482,
            "lon": 73.833,
            "canopyCover": "20.0%",
            "builtFraction": "79.7%",
            "buildingHeight": "64.0 m",
            "skyView": 0.46,
            "windSpeed": "3.0 m/s",
            "pm25": "100.9 \u00b5g/m\u00b3",
            "ndvi": 0.222,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Hinjawadi Phase 1",
            "risk": "Very high",
            "score": 90,
            "temp": "37.5\u00b0C",
            "lst": 37.5,
            "uhi": 6.9,
            "heat_index": 31.5,
            "wbgt": 26.4,
            "people": "12,917",
            "peopleNum": 12917,
            "driver": "Extensive paved surfaces & low mature canopy",
            "lat": 18.5,
            "lon": 73.908,
            "canopyCover": "8.6%",
            "builtFraction": "64.4%",
            "buildingHeight": "62.6 m",
            "skyView": 0.52,
            "windSpeed": "2.8 m/s",
            "pm25": "78.1 \u00b5g/m\u00b3",
            "ndvi": 0.12,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h6",
            "name": "Katraj Ghat Base",
            "risk": "Very high",
            "score": 92,
            "temp": "36.9\u00b0C",
            "lst": 36.9,
            "uhi": 8.0,
            "heat_index": 30.9,
            "wbgt": 24.2,
            "people": "26,614",
            "peopleNum": 26614,
            "driver": "Dry slope radiation & built sprawl",
            "lat": 18.518,
            "lon": 73.858,
            "canopyCover": "30.2%",
            "builtFraction": "74.0%",
            "buildingHeight": "68.1 m",
            "skyView": 0.51,
            "windSpeed": "8.6 m/s",
            "pm25": "87.2 \u00b5g/m\u00b3",
            "ndvi": 0.278,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h7",
            "name": "Kothrud Paud Road",
            "risk": "High",
            "score": 86,
            "temp": "36.3\u00b0C",
            "lst": 36.3,
            "uhi": 6.1,
            "heat_index": 34.5,
            "wbgt": 26.8,
            "people": "6,837",
            "peopleNum": 6837,
            "driver": "High building density & low ventilation",
            "lat": 18.462,
            "lon": 73.915,
            "canopyCover": "19.2%",
            "builtFraction": "44.0%",
            "buildingHeight": "33.4 m",
            "skyView": 0.74,
            "windSpeed": "3.6 m/s",
            "pm25": "51.4 \u00b5g/m\u00b3",
            "ndvi": 0.189,
            "albedo": 0.15,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.0,
                "weight": 35
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Viman Nagar Commercial",
            "risk": "Very high",
            "score": 88,
            "temp": "35.8\u00b0C",
            "lst": 35.8,
            "uhi": 7.1,
            "heat_index": 32.4,
            "wbgt": 26.5,
            "people": "12,569",
            "peopleNum": 12569,
            "driver": "Glass-concrete heat absorption",
            "lat": 18.469,
            "lon": 73.82,
            "canopyCover": "27.3%",
            "builtFraction": "56.5%",
            "buildingHeight": "61.7 m",
            "skyView": 0.48,
            "windSpeed": "4.4 m/s",
            "pm25": "73.8 \u00b5g/m\u00b3",
            "ndvi": 0.303,
            "albedo": 0.17,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Monsoon": {
        "peakLst": 40.5,
        "meanLst": 28.7,
        "minLst": 16.2,
        "uhiMean": 4.7,
        "uhiMax": 12.0,
        "heatIndexMean": 24.5,
        "wbgtMean": 21.2,
        "hotspotCount": 120,
        "totalRecords": 11105,
        "hotspotPct": 1.1,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.263,
          "treeCoverPct": 25.3,
          "imperviousPct": 59.3,
          "buildingDensityPct": 57.5,
          "buildingHeightM": 57.9,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 24.1,
          "humidityPct": 72.9,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 515.9,
          "pm25UgM3": 38.1,
          "populationDensity": 12907
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Hadapsar Industrial Estate",
            "risk": "Very high",
            "score": 99,
            "temp": "40.5\u00b0C",
            "lst": 40.5,
            "uhi": 12.0,
            "heat_index": 28.9,
            "wbgt": 25.9,
            "people": "18,879",
            "peopleNum": 18879,
            "driver": "Industrial roofing & low canopy",
            "lat": 18.52,
            "lon": 73.863,
            "canopyCover": "4.7%",
            "builtFraction": "86.6%",
            "buildingHeight": "71.3 m",
            "skyView": 0.41,
            "windSpeed": "2.8 m/s",
            "pm25": "58.8 \u00b5g/m\u00b3",
            "ndvi": 0.041,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h2",
            "name": "Shivajinagar Station",
            "risk": "Very high",
            "score": 92,
            "temp": "34.0\u00b0C",
            "lst": 34.0,
            "uhi": 10.2,
            "heat_index": 28.6,
            "wbgt": 24.7,
            "people": "18,446",
            "peopleNum": 18446,
            "driver": "Traffic concentration & asphalt heat",
            "lat": 18.531,
            "lon": 73.812,
            "canopyCover": "9.2%",
            "builtFraction": "73.9%",
            "buildingHeight": "61.6 m",
            "skyView": 0.48,
            "windSpeed": "4.7 m/s",
            "pm25": "32.8 \u00b5g/m\u00b3",
            "ndvi": 0.052,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h3",
            "name": "Pimpri MIDC Phase 1",
            "risk": "High",
            "score": 84,
            "temp": "32.8\u00b0C",
            "lst": 32.8,
            "uhi": 7.9,
            "heat_index": 24.3,
            "wbgt": 21.6,
            "people": "24,605",
            "peopleNum": 24605,
            "driver": "Automobile manufacturing shed roofs",
            "lat": 18.509,
            "lon": 73.847,
            "canopyCover": "20.6%",
            "builtFraction": "78.3%",
            "buildingHeight": "81.5 m",
            "skyView": 0.36,
            "windSpeed": "2.2 m/s",
            "pm25": "49.0 \u00b5g/m\u00b3",
            "ndvi": 0.224,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 1.0,
                "weight": 32
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Swargate Bus Terminal",
            "risk": "High",
            "score": 82,
            "temp": "31.9\u00b0C",
            "lst": 31.9,
            "uhi": 7.7,
            "heat_index": 26.5,
            "wbgt": 23.1,
            "people": "17,494",
            "peopleNum": 17494,
            "driver": "High vehicular emissions & concrete ground",
            "lat": 18.534,
            "lon": 73.909,
            "canopyCover": "20.0%",
            "builtFraction": "58.2%",
            "buildingHeight": "67.3 m",
            "skyView": 0.47,
            "windSpeed": "2.6 m/s",
            "pm25": "45.8 \u00b5g/m\u00b3",
            "ndvi": 0.17,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Hinjawadi Phase 1",
            "risk": "High",
            "score": 80,
            "temp": "31.3\u00b0C",
            "lst": 31.3,
            "uhi": 7.2,
            "heat_index": 28.2,
            "wbgt": 24.7,
            "people": "11,255",
            "peopleNum": 11255,
            "driver": "Extensive paved surfaces & low mature canopy",
            "lat": 18.572,
            "lon": 73.911,
            "canopyCover": "27.0%",
            "builtFraction": "57.4%",
            "buildingHeight": "68.0 m",
            "skyView": 0.48,
            "windSpeed": "2.4 m/s",
            "pm25": "28.7 \u00b5g/m\u00b3",
            "ndvi": 0.228,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Katraj Ghat Base",
            "risk": "High",
            "score": 80,
            "temp": "30.7\u00b0C",
            "lst": 30.7,
            "uhi": 7.5,
            "heat_index": 25.5,
            "wbgt": 20.9,
            "people": "15,639",
            "peopleNum": 15639,
            "driver": "Dry slope radiation & built sprawl",
            "lat": 18.5,
            "lon": 73.862,
            "canopyCover": "13.1%",
            "builtFraction": "74.5%",
            "buildingHeight": "81.1 m",
            "skyView": 0.47,
            "windSpeed": "2.3 m/s",
            "pm25": "45.2 \u00b5g/m\u00b3",
            "ndvi": 0.224,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Kothrud Paud Road",
            "risk": "High",
            "score": 75,
            "temp": "30.1\u00b0C",
            "lst": 30.1,
            "uhi": 6.2,
            "heat_index": 25.0,
            "wbgt": 21.2,
            "people": "14,445",
            "peopleNum": 14445,
            "driver": "High building density & low ventilation",
            "lat": 18.54,
            "lon": 73.848,
            "canopyCover": "21.5%",
            "builtFraction": "62.1%",
            "buildingHeight": "72.3 m",
            "skyView": 0.54,
            "windSpeed": "3.0 m/s",
            "pm25": "24.1 \u00b5g/m\u00b3",
            "ndvi": 0.253,
            "albedo": 0.14,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Viman Nagar Commercial",
            "risk": "Moderate",
            "score": 74,
            "temp": "29.6\u00b0C",
            "lst": 29.6,
            "uhi": 5.9,
            "heat_index": 26.1,
            "wbgt": 23.0,
            "people": "25,086",
            "peopleNum": 25086,
            "driver": "Glass-concrete heat absorption",
            "lat": 18.54,
            "lon": 73.914,
            "canopyCover": "27.1%",
            "builtFraction": "71.3%",
            "buildingHeight": "57.2 m",
            "skyView": 0.48,
            "windSpeed": "3.3 m/s",
            "pm25": "60.9 \u00b5g/m\u00b3",
            "ndvi": 0.261,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Post_Monsoon": {
        "peakLst": 33.8,
        "meanLst": 22.6,
        "minLst": 9.1,
        "uhiMean": 3.2,
        "uhiMax": 12.0,
        "heatIndexMean": 17.7,
        "wbgtMean": 12.3,
        "hotspotCount": 0,
        "totalRecords": 5606,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.1,
          "buildingDensityPct": 57.4,
          "buildingHeightM": 58.2,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 17.7,
          "humidityPct": 55.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 604.9,
          "pm25UgM3": 69.5,
          "populationDensity": 12932
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Hadapsar Industrial Estate",
            "risk": "Very high",
            "score": 96,
            "temp": "33.8\u00b0C",
            "lst": 33.8,
            "uhi": 12.0,
            "heat_index": 23.9,
            "wbgt": 21.0,
            "people": "11,017",
            "peopleNum": 11017,
            "driver": "Industrial roofing & low canopy",
            "lat": 18.502,
            "lon": 73.893,
            "canopyCover": "13.1%",
            "builtFraction": "71.5%",
            "buildingHeight": "59.7 m",
            "skyView": 0.46,
            "windSpeed": "3.0 m/s",
            "pm25": "102.8 \u00b5g/m\u00b3",
            "ndvi": 0.186,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h2",
            "name": "Shivajinagar Station",
            "risk": "High",
            "score": 75,
            "temp": "27.9\u00b0C",
            "lst": 27.9,
            "uhi": 7.6,
            "heat_index": 18.9,
            "wbgt": 14.9,
            "people": "19,276",
            "peopleNum": 19276,
            "driver": "Traffic concentration & asphalt heat",
            "lat": 18.529,
            "lon": 73.873,
            "canopyCover": "1.8%",
            "builtFraction": "85.1%",
            "buildingHeight": "82.9 m",
            "skyView": 0.38,
            "windSpeed": "2.3 m/s",
            "pm25": "80.0 \u00b5g/m\u00b3",
            "ndvi": 0.105,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Pimpri MIDC Phase 1",
            "risk": "Moderate",
            "score": 72,
            "temp": "26.7\u00b0C",
            "lst": 26.7,
            "uhi": 7.5,
            "heat_index": 18.8,
            "wbgt": 13.8,
            "people": "10,185",
            "peopleNum": 10185,
            "driver": "Automobile manufacturing shed roofs",
            "lat": 18.532,
            "lon": 73.791,
            "canopyCover": "21.6%",
            "builtFraction": "66.2%",
            "buildingHeight": "50.8 m",
            "skyView": 0.52,
            "windSpeed": "6.7 m/s",
            "pm25": "37.1 \u00b5g/m\u00b3",
            "ndvi": 0.197,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Swargate Bus Terminal",
            "risk": "Moderate",
            "score": 71,
            "temp": "25.9\u00b0C",
            "lst": 25.9,
            "uhi": 7.4,
            "heat_index": 17.5,
            "wbgt": 14.0,
            "people": "14,814",
            "peopleNum": 14814,
            "driver": "High vehicular emissions & concrete ground",
            "lat": 18.535,
            "lon": 73.805,
            "canopyCover": "0.0%",
            "builtFraction": "66.4%",
            "buildingHeight": "58.6 m",
            "skyView": 0.53,
            "windSpeed": "3.7 m/s",
            "pm25": "69.3 \u00b5g/m\u00b3",
            "ndvi": -0.021,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": 0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h5",
            "name": "Hinjawadi Phase 1",
            "risk": "Moderate",
            "score": 65,
            "temp": "25.1\u00b0C",
            "lst": 25.1,
            "uhi": 5.2,
            "heat_index": 17.5,
            "wbgt": 15.4,
            "people": "12,306",
            "peopleNum": 12306,
            "driver": "Extensive paved surfaces & low mature canopy",
            "lat": 18.515,
            "lon": 73.843,
            "canopyCover": "19.4%",
            "builtFraction": "65.3%",
            "buildingHeight": "48.3 m",
            "skyView": 0.57,
            "windSpeed": "2.2 m/s",
            "pm25": "97.6 \u00b5g/m\u00b3",
            "ndvi": 0.146,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h6",
            "name": "Katraj Ghat Base",
            "risk": "Moderate",
            "score": 65,
            "temp": "24.5\u00b0C",
            "lst": 24.5,
            "uhi": 4.5,
            "heat_index": 20.9,
            "wbgt": 13.4,
            "people": "14,178",
            "peopleNum": 14178,
            "driver": "Dry slope radiation & built sprawl",
            "lat": 18.592,
            "lon": 73.869,
            "canopyCover": "14.1%",
            "builtFraction": "65.7%",
            "buildingHeight": "49.6 m",
            "skyView": 0.66,
            "windSpeed": "3.8 m/s",
            "pm25": "67.5 \u00b5g/m\u00b3",
            "ndvi": 0.185,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Kothrud Paud Road",
            "risk": "Moderate",
            "score": 65,
            "temp": "24.0\u00b0C",
            "lst": 24.0,
            "uhi": 5.4,
            "heat_index": 19.5,
            "wbgt": 14.2,
            "people": "13,535",
            "peopleNum": 13535,
            "driver": "High building density & low ventilation",
            "lat": 18.548,
            "lon": 73.955,
            "canopyCover": "13.5%",
            "builtFraction": "63.5%",
            "buildingHeight": "54.9 m",
            "skyView": 0.49,
            "windSpeed": "3.1 m/s",
            "pm25": "67.9 \u00b5g/m\u00b3",
            "ndvi": 0.21,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Viman Nagar Commercial",
            "risk": "Moderate",
            "score": 65,
            "temp": "23.4\u00b0C",
            "lst": 23.4,
            "uhi": 2.4,
            "heat_index": 16.8,
            "wbgt": 12.5,
            "people": "17,909",
            "peopleNum": 17909,
            "driver": "Glass-concrete heat absorption",
            "lat": 18.508,
            "lon": 73.803,
            "canopyCover": "19.2%",
            "builtFraction": "63.7%",
            "buildingHeight": "66.5 m",
            "skyView": 0.6,
            "windSpeed": "3.2 m/s",
            "pm25": "81.8 \u00b5g/m\u00b3",
            "ndvi": 0.231,
            "albedo": 0.16,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Winter": {
        "peakLst": 30.6,
        "meanLst": 17.8,
        "minLst": 8.0,
        "uhiMean": 2.9,
        "uhiMax": 12.0,
        "heatIndexMean": 12.9,
        "wbgtMean": 6.8,
        "hotspotCount": 0,
        "totalRecords": 8236,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.263,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.2,
          "buildingDensityPct": 57.5,
          "buildingHeightM": 58.0,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 12.9,
          "humidityPct": 47.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 593.9,
          "pm25UgM3": 110.8,
          "populationDensity": 12941
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Hadapsar Industrial Estate",
            "risk": "Very high",
            "score": 91,
            "temp": "30.6\u00b0C",
            "lst": 30.6,
            "uhi": 12.0,
            "heat_index": 15.5,
            "wbgt": 13.0,
            "people": "19,737",
            "peopleNum": 19737,
            "driver": "Industrial roofing & low canopy",
            "lat": 18.528,
            "lon": 73.876,
            "canopyCover": "0.0%",
            "builtFraction": "93.0%",
            "buildingHeight": "78.7 m",
            "skyView": 0.38,
            "windSpeed": "3.8 m/s",
            "pm25": "157.8 \u00b5g/m\u00b3",
            "ndvi": -0.025,
            "albedo": 0.28,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 2.0,
                "weight": 70
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": 0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h2",
            "name": "Shivajinagar Station",
            "risk": "Moderate",
            "score": 67,
            "temp": "23.0\u00b0C",
            "lst": 23.0,
            "uhi": 7.9,
            "heat_index": 15.6,
            "wbgt": 9.9,
            "people": "16,225",
            "peopleNum": 16225,
            "driver": "Traffic concentration & asphalt heat",
            "lat": 18.533,
            "lon": 73.912,
            "canopyCover": "17.7%",
            "builtFraction": "78.5%",
            "buildingHeight": "44.4 m",
            "skyView": 0.66,
            "windSpeed": "2.3 m/s",
            "pm25": "106.7 \u00b5g/m\u00b3",
            "ndvi": 0.202,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Pimpri MIDC Phase 1",
            "risk": "Moderate",
            "score": 65,
            "temp": "21.8\u00b0C",
            "lst": 21.8,
            "uhi": 6.3,
            "heat_index": 14.4,
            "wbgt": 8.6,
            "people": "13,125",
            "peopleNum": 13125,
            "driver": "Automobile manufacturing shed roofs",
            "lat": 18.483,
            "lon": 73.833,
            "canopyCover": "9.2%",
            "builtFraction": "68.1%",
            "buildingHeight": "75.5 m",
            "skyView": 0.36,
            "windSpeed": "2.0 m/s",
            "pm25": "137.6 \u00b5g/m\u00b3",
            "ndvi": 0.152,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h4",
            "name": "Swargate Bus Terminal",
            "risk": "Moderate",
            "score": 65,
            "temp": "21.0\u00b0C",
            "lst": 21.0,
            "uhi": 5.2,
            "heat_index": 13.7,
            "wbgt": 9.4,
            "people": "12,195",
            "peopleNum": 12195,
            "driver": "High vehicular emissions & concrete ground",
            "lat": 18.586,
            "lon": 73.828,
            "canopyCover": "12.1%",
            "builtFraction": "66.0%",
            "buildingHeight": "48.0 m",
            "skyView": 0.63,
            "windSpeed": "3.7 m/s",
            "pm25": "145.1 \u00b5g/m\u00b3",
            "ndvi": 0.098,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Hinjawadi Phase 1",
            "risk": "Moderate",
            "score": 65,
            "temp": "20.4\u00b0C",
            "lst": 20.4,
            "uhi": 5.4,
            "heat_index": 14.2,
            "wbgt": 6.4,
            "people": "14,330",
            "peopleNum": 14330,
            "driver": "Extensive paved surfaces & low mature canopy",
            "lat": 18.463,
            "lon": 73.763,
            "canopyCover": "24.8%",
            "builtFraction": "61.7%",
            "buildingHeight": "49.5 m",
            "skyView": 0.65,
            "windSpeed": "3.4 m/s",
            "pm25": "140.0 \u00b5g/m\u00b3",
            "ndvi": 0.195,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Katraj Ghat Base",
            "risk": "Moderate",
            "score": 65,
            "temp": "19.8\u00b0C",
            "lst": 19.8,
            "uhi": 4.6,
            "heat_index": 11.0,
            "wbgt": 5.4,
            "people": "15,739",
            "peopleNum": 15739,
            "driver": "Dry slope radiation & built sprawl",
            "lat": 18.483,
            "lon": 73.846,
            "canopyCover": "32.1%",
            "builtFraction": "71.1%",
            "buildingHeight": "68.0 m",
            "skyView": 0.32,
            "windSpeed": "4.8 m/s",
            "pm25": "91.7 \u00b5g/m\u00b3",
            "ndvi": 0.325,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h7",
            "name": "Kothrud Paud Road",
            "risk": "Moderate",
            "score": 65,
            "temp": "19.2\u00b0C",
            "lst": 19.2,
            "uhi": 4.0,
            "heat_index": 12.3,
            "wbgt": 6.5,
            "people": "12,581",
            "peopleNum": 12581,
            "driver": "High building density & low ventilation",
            "lat": 18.548,
            "lon": 73.856,
            "canopyCover": "27.9%",
            "builtFraction": "61.0%",
            "buildingHeight": "63.9 m",
            "skyView": 0.51,
            "windSpeed": "3.1 m/s",
            "pm25": "96.6 \u00b5g/m\u00b3",
            "ndvi": 0.26,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Viman Nagar Commercial",
            "risk": "Moderate",
            "score": 65,
            "temp": "18.6\u00b0C",
            "lst": 18.6,
            "uhi": 3.7,
            "heat_index": 10.7,
            "wbgt": 5.6,
            "people": "16,231",
            "peopleNum": 16231,
            "driver": "Glass-concrete heat absorption",
            "lat": 18.57,
            "lon": 73.821,
            "canopyCover": "7.6%",
            "builtFraction": "77.0%",
            "buildingHeight": "59.6 m",
            "skyView": 0.45,
            "windSpeed": "2.0 m/s",
            "pm25": "100.0 \u00b5g/m\u00b3",
            "ndvi": 0.021,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          }
        ]
      }
    }
  },
  "Jaipur": {
    "name": "Jaipur",
    "state": "Rajasthan",
    "climateZone": "Semi Arid",
    "elevationM": 430.867,
    "distanceToCoastKm": 700.0,
    "center": {
      "lat": 26.912457421438706,
      "lon": 75.78714800615812
    },
    "bounds": {
      "minLat": 26.728,
      "maxLat": 27.109,
      "minLon": 75.595,
      "maxLon": 76.027
    },
    "seasons": {
      "Summer": {
        "peakLst": 57.3,
        "meanLst": 43.5,
        "minLst": 29.1,
        "uhiMean": 5.5,
        "uhiMax": 12.0,
        "heatIndexMean": 38.2,
        "wbgtMean": 30.8,
        "hotspotCount": 3312,
        "totalRecords": 8431,
        "hotspotPct": 39.3,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.0,
          "buildingDensityPct": 57.3,
          "buildingHeightM": 57.8,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 38.2,
          "humidityPct": 40.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 664.4,
          "pm25UgM3": 67.9,
          "populationDensity": 7343
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "VKIA Industrial Area",
            "risk": "Very high",
            "score": 99,
            "temp": "57.3\u00b0C",
            "lst": 57.3,
            "uhi": 12.0,
            "heat_index": 43.8,
            "wbgt": 37.8,
            "people": "7,891",
            "peopleNum": 7891,
            "driver": "Low albedo industrial roofs & desert sun",
            "lat": 26.919,
            "lon": 75.81,
            "canopyCover": "0.0%",
            "builtFraction": "83.2%",
            "buildingHeight": "83.4 m",
            "skyView": 0.26,
            "windSpeed": "2.0 m/s",
            "pm25": "99.9 \u00b5g/m\u00b3",
            "ndvi": 0.036,
            "albedo": 0.27,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 1.0,
                "weight": 32
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h2",
            "name": "Walled City (Johari Bazaar)",
            "risk": "Very high",
            "score": 99,
            "temp": "48.7\u00b0C",
            "lst": 48.7,
            "uhi": 11.0,
            "heat_index": 39.2,
            "wbgt": 33.2,
            "people": "10,795",
            "peopleNum": 10795,
            "driver": "Dense stone masonry thermal inertia",
            "lat": 26.967,
            "lon": 75.763,
            "canopyCover": "16.4%",
            "builtFraction": "74.1%",
            "buildingHeight": "57.0 m",
            "skyView": 0.5,
            "windSpeed": "3.5 m/s",
            "pm25": "64.9 \u00b5g/m\u00b3",
            "ndvi": 0.211,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Sanganer Textile Hub",
            "risk": "Very high",
            "score": 99,
            "temp": "47.5\u00b0C",
            "lst": 47.5,
            "uhi": 10.4,
            "heat_index": 36.9,
            "wbgt": 30.0,
            "people": "12,690",
            "peopleNum": 12690,
            "driver": "Exposed dry ground & industrial sheds",
            "lat": 26.896,
            "lon": 75.766,
            "canopyCover": "0.9%",
            "builtFraction": "82.5%",
            "buildingHeight": "76.7 m",
            "skyView": 0.34,
            "windSpeed": "5.2 m/s",
            "pm25": "87.2 \u00b5g/m\u00b3",
            "ndvi": 0.047,
            "albedo": 0.3,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h4",
            "name": "Mansarovar Sector 7",
            "risk": "Very high",
            "score": 99,
            "temp": "46.7\u00b0C",
            "lst": 46.7,
            "uhi": 8.3,
            "heat_index": 39.9,
            "wbgt": 33.8,
            "people": "8,640",
            "peopleNum": 8640,
            "driver": "High concrete fraction & low canopy",
            "lat": 26.912,
            "lon": 75.832,
            "canopyCover": "21.8%",
            "builtFraction": "79.7%",
            "buildingHeight": "76.7 m",
            "skyView": 0.42,
            "windSpeed": "2.4 m/s",
            "pm25": "83.9 \u00b5g/m\u00b3",
            "ndvi": 0.232,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Sitapura Industrial Zone",
            "risk": "Very high",
            "score": 99,
            "temp": "46.1\u00b0C",
            "lst": 46.1,
            "uhi": 7.5,
            "heat_index": 37.6,
            "wbgt": 32.3,
            "people": "10,174",
            "peopleNum": 10174,
            "driver": "Wide asphalt roads & high solar insolation",
            "lat": 26.933,
            "lon": 75.777,
            "canopyCover": "29.6%",
            "builtFraction": "66.7%",
            "buildingHeight": "77.7 m",
            "skyView": 0.43,
            "windSpeed": "3.1 m/s",
            "pm25": "77.6 \u00b5g/m\u00b3",
            "ndvi": 0.304,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h6",
            "name": "Chandpole Bazaar",
            "risk": "Very high",
            "score": 99,
            "temp": "45.4\u00b0C",
            "lst": 45.4,
            "uhi": 7.6,
            "heat_index": 39.7,
            "wbgt": 33.3,
            "people": "6,276",
            "peopleNum": 6276,
            "driver": "Narrow urban canyons & trapped hot air",
            "lat": 26.791,
            "lon": 75.709,
            "canopyCover": "15.7%",
            "builtFraction": "66.6%",
            "buildingHeight": "52.2 m",
            "skyView": 0.57,
            "windSpeed": "4.8 m/s",
            "pm25": "88.8 \u00b5g/m\u00b3",
            "ndvi": 0.154,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h7",
            "name": "Malviya Nagar Calgiri",
            "risk": "Very high",
            "score": 99,
            "temp": "44.9\u00b0C",
            "lst": 44.9,
            "uhi": 6.4,
            "heat_index": 38.2,
            "wbgt": 31.2,
            "people": "9,149",
            "peopleNum": 9149,
            "driver": "Paved commercial frontages",
            "lat": 26.946,
            "lon": 75.763,
            "canopyCover": "22.8%",
            "builtFraction": "63.3%",
            "buildingHeight": "55.2 m",
            "skyView": 0.46,
            "windSpeed": "2.4 m/s",
            "pm25": "65.5 \u00b5g/m\u00b3",
            "ndvi": 0.306,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h8",
            "name": "Ajmer Road 200ft Bypass",
            "risk": "Very high",
            "score": 99,
            "temp": "44.3\u00b0C",
            "lst": 44.3,
            "uhi": 6.5,
            "heat_index": 39.9,
            "wbgt": 32.1,
            "people": "8,058",
            "peopleNum": 8058,
            "driver": "Asphalt radiant heating",
            "lat": 26.853,
            "lon": 75.829,
            "canopyCover": "34.7%",
            "builtFraction": "54.8%",
            "buildingHeight": "62.3 m",
            "skyView": 0.57,
            "windSpeed": "2.3 m/s",
            "pm25": "87.1 \u00b5g/m\u00b3",
            "ndvi": 0.238,
            "albedo": 0.16,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Monsoon": {
        "peakLst": 47.0,
        "meanLst": 34.2,
        "minLst": 20.9,
        "uhiMean": 5.2,
        "uhiMax": 12.0,
        "heatIndexMean": 30.1,
        "wbgtMean": 24.6,
        "hotspotCount": 3,
        "totalRecords": 11111,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.263,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.1,
          "buildingDensityPct": 57.3,
          "buildingHeightM": 57.9,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 29.5,
          "humidityPct": 58.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 515.6,
          "pm25UgM3": 37.2,
          "populationDensity": 7357
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "VKIA Industrial Area",
            "risk": "Very high",
            "score": 99,
            "temp": "47.0\u00b0C",
            "lst": 47.0,
            "uhi": 12.0,
            "heat_index": 37.1,
            "wbgt": 32.2,
            "people": "11,245",
            "peopleNum": 11245,
            "driver": "Low albedo industrial roofs & desert sun",
            "lat": 26.912,
            "lon": 75.762,
            "canopyCover": "9.3%",
            "builtFraction": "77.6%",
            "buildingHeight": "68.1 m",
            "skyView": 0.54,
            "windSpeed": "1.8 m/s",
            "pm25": "56.7 \u00b5g/m\u00b3",
            "ndvi": 0.128,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Walled City (Johari Bazaar)",
            "risk": "Very high",
            "score": 99,
            "temp": "39.4\u00b0C",
            "lst": 39.4,
            "uhi": 10.7,
            "heat_index": 31.5,
            "wbgt": 27.2,
            "people": "13,397",
            "peopleNum": 13397,
            "driver": "Dense stone masonry thermal inertia",
            "lat": 26.965,
            "lon": 75.751,
            "canopyCover": "20.1%",
            "builtFraction": "65.6%",
            "buildingHeight": "58.6 m",
            "skyView": 0.52,
            "windSpeed": "2.3 m/s",
            "pm25": "34.0 \u00b5g/m\u00b3",
            "ndvi": 0.153,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Sanganer Textile Hub",
            "risk": "Very high",
            "score": 98,
            "temp": "38.2\u00b0C",
            "lst": 38.2,
            "uhi": 9.4,
            "heat_index": 31.3,
            "wbgt": 25.0,
            "people": "13,366",
            "peopleNum": 13366,
            "driver": "Exposed dry ground & industrial sheds",
            "lat": 26.924,
            "lon": 75.821,
            "canopyCover": "14.4%",
            "builtFraction": "78.3%",
            "buildingHeight": "77.7 m",
            "skyView": 0.46,
            "windSpeed": "3.6 m/s",
            "pm25": "27.1 \u00b5g/m\u00b3",
            "ndvi": 0.166,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h4",
            "name": "Mansarovar Sector 7",
            "risk": "Very high",
            "score": 95,
            "temp": "37.5\u00b0C",
            "lst": 37.5,
            "uhi": 8.6,
            "heat_index": 32.6,
            "wbgt": 26.4,
            "people": "8,364",
            "peopleNum": 8364,
            "driver": "High concrete fraction & low canopy",
            "lat": 26.9,
            "lon": 75.798,
            "canopyCover": "22.9%",
            "builtFraction": "65.0%",
            "buildingHeight": "70.3 m",
            "skyView": 0.44,
            "windSpeed": "2.0 m/s",
            "pm25": "48.1 \u00b5g/m\u00b3",
            "ndvi": 0.186,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Sitapura Industrial Zone",
            "risk": "Very high",
            "score": 91,
            "temp": "36.8\u00b0C",
            "lst": 36.8,
            "uhi": 7.7,
            "heat_index": 33.1,
            "wbgt": 28.5,
            "people": "9,015",
            "peopleNum": 9015,
            "driver": "Wide asphalt roads & high solar insolation",
            "lat": 26.879,
            "lon": 75.771,
            "canopyCover": "14.0%",
            "builtFraction": "70.8%",
            "buildingHeight": "57.6 m",
            "skyView": 0.57,
            "windSpeed": "2.1 m/s",
            "pm25": "41.2 \u00b5g/m\u00b3",
            "ndvi": 0.159,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h6",
            "name": "Chandpole Bazaar",
            "risk": "Very high",
            "score": 88,
            "temp": "36.2\u00b0C",
            "lst": 36.2,
            "uhi": 6.8,
            "heat_index": 29.1,
            "wbgt": 22.3,
            "people": "14,808",
            "peopleNum": 14808,
            "driver": "Narrow urban canyons & trapped hot air",
            "lat": 26.942,
            "lon": 75.802,
            "canopyCover": "24.1%",
            "builtFraction": "83.3%",
            "buildingHeight": "76.8 m",
            "skyView": 0.36,
            "windSpeed": "2.7 m/s",
            "pm25": "71.4 \u00b5g/m\u00b3",
            "ndvi": 0.23,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Malviya Nagar Calgiri",
            "risk": "High",
            "score": 86,
            "temp": "35.6\u00b0C",
            "lst": 35.6,
            "uhi": 6.6,
            "heat_index": 33.2,
            "wbgt": 27.0,
            "people": "8,696",
            "peopleNum": 8696,
            "driver": "Paved commercial frontages",
            "lat": 26.905,
            "lon": 75.841,
            "canopyCover": "18.9%",
            "builtFraction": "55.1%",
            "buildingHeight": "67.2 m",
            "skyView": 0.47,
            "windSpeed": "6.0 m/s",
            "pm25": "36.0 \u00b5g/m\u00b3",
            "ndvi": 0.188,
            "albedo": 0.16,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Ajmer Road 200ft Bypass",
            "risk": "High",
            "score": 83,
            "temp": "35.1\u00b0C",
            "lst": 35.1,
            "uhi": 5.9,
            "heat_index": 35.5,
            "wbgt": 27.8,
            "people": "5,502",
            "peopleNum": 5502,
            "driver": "Asphalt radiant heating",
            "lat": 26.837,
            "lon": 75.759,
            "canopyCover": "39.9%",
            "builtFraction": "33.4%",
            "buildingHeight": "38.8 m",
            "skyView": 0.73,
            "windSpeed": "5.0 m/s",
            "pm25": "21.7 \u00b5g/m\u00b3",
            "ndvi": 0.326,
            "albedo": 0.13,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 0.7,
                "weight": 24
              },
              {
                "name": "Low tree canopy cover",
                "val": -0.1,
                "weight": -3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Post_Monsoon": {
        "peakLst": 34.8,
        "meanLst": 23.7,
        "minLst": 10.9,
        "uhiMean": 3.8,
        "uhiMax": 12.0,
        "heatIndexMean": 18.6,
        "wbgtMean": 11.2,
        "hotspotCount": 0,
        "totalRecords": 5408,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.0,
          "buildingDensityPct": 57.2,
          "buildingHeightM": 57.7,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 18.6,
          "humidityPct": 39.9,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 604.3,
          "pm25UgM3": 67.5,
          "populationDensity": 7364
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "VKIA Industrial Area",
            "risk": "Very high",
            "score": 98,
            "temp": "34.8\u00b0C",
            "lst": 34.8,
            "uhi": 12.0,
            "heat_index": 25.1,
            "wbgt": 18.4,
            "people": "5,467",
            "peopleNum": 5467,
            "driver": "Low albedo industrial roofs & desert sun",
            "lat": 26.938,
            "lon": 75.873,
            "canopyCover": "11.3%",
            "builtFraction": "83.1%",
            "buildingHeight": "53.0 m",
            "skyView": 0.58,
            "windSpeed": "3.3 m/s",
            "pm25": "68.0 \u00b5g/m\u00b3",
            "ndvi": 0.062,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Walled City (Johari Bazaar)",
            "risk": "High",
            "score": 81,
            "temp": "28.9\u00b0C",
            "lst": 28.9,
            "uhi": 9.5,
            "heat_index": 19.3,
            "wbgt": 12.4,
            "people": "13,295",
            "peopleNum": 13295,
            "driver": "Dense stone masonry thermal inertia",
            "lat": 26.924,
            "lon": 75.744,
            "canopyCover": "31.7%",
            "builtFraction": "72.8%",
            "buildingHeight": "79.0 m",
            "skyView": 0.39,
            "windSpeed": "2.3 m/s",
            "pm25": "64.9 \u00b5g/m\u00b3",
            "ndvi": 0.296,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h3",
            "name": "Sanganer Textile Hub",
            "risk": "High",
            "score": 77,
            "temp": "27.8\u00b0C",
            "lst": 27.8,
            "uhi": 8.6,
            "heat_index": 20.1,
            "wbgt": 12.4,
            "people": "9,313",
            "peopleNum": 9313,
            "driver": "Exposed dry ground & industrial sheds",
            "lat": 26.877,
            "lon": 75.77,
            "canopyCover": "25.0%",
            "builtFraction": "82.1%",
            "buildingHeight": "71.9 m",
            "skyView": 0.54,
            "windSpeed": "2.3 m/s",
            "pm25": "92.6 \u00b5g/m\u00b3",
            "ndvi": 0.324,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h4",
            "name": "Mansarovar Sector 7",
            "risk": "Moderate",
            "score": 71,
            "temp": "26.9\u00b0C",
            "lst": 26.9,
            "uhi": 6.7,
            "heat_index": 19.2,
            "wbgt": 11.9,
            "people": "8,182",
            "peopleNum": 8182,
            "driver": "High concrete fraction & low canopy",
            "lat": 26.997,
            "lon": 75.79,
            "canopyCover": "26.8%",
            "builtFraction": "67.7%",
            "buildingHeight": "56.4 m",
            "skyView": 0.61,
            "windSpeed": "3.9 m/s",
            "pm25": "56.6 \u00b5g/m\u00b3",
            "ndvi": 0.266,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Sitapura Industrial Zone",
            "risk": "Moderate",
            "score": 69,
            "temp": "26.3\u00b0C",
            "lst": 26.3,
            "uhi": 6.4,
            "heat_index": 18.4,
            "wbgt": 9.7,
            "people": "6,440",
            "peopleNum": 6440,
            "driver": "Wide asphalt roads & high solar insolation",
            "lat": 26.91,
            "lon": 75.739,
            "canopyCover": "28.7%",
            "builtFraction": "79.7%",
            "buildingHeight": "73.4 m",
            "skyView": 0.41,
            "windSpeed": "2.4 m/s",
            "pm25": "71.2 \u00b5g/m\u00b3",
            "ndvi": 0.342,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h6",
            "name": "Chandpole Bazaar",
            "risk": "Moderate",
            "score": 66,
            "temp": "25.6\u00b0C",
            "lst": 25.6,
            "uhi": 5.6,
            "heat_index": 16.4,
            "wbgt": 8.7,
            "people": "13,745",
            "peopleNum": 13745,
            "driver": "Narrow urban canyons & trapped hot air",
            "lat": 26.986,
            "lon": 75.749,
            "canopyCover": "21.0%",
            "builtFraction": "74.7%",
            "buildingHeight": "68.8 m",
            "skyView": 0.32,
            "windSpeed": "2.3 m/s",
            "pm25": "96.6 \u00b5g/m\u00b3",
            "ndvi": 0.218,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Malviya Nagar Calgiri",
            "risk": "Moderate",
            "score": 65,
            "temp": "25.1\u00b0C",
            "lst": 25.1,
            "uhi": 4.9,
            "heat_index": 19.9,
            "wbgt": 11.8,
            "people": "10,743",
            "peopleNum": 10743,
            "driver": "Paved commercial frontages",
            "lat": 26.911,
            "lon": 75.831,
            "canopyCover": "26.3%",
            "builtFraction": "64.1%",
            "buildingHeight": "52.4 m",
            "skyView": 0.57,
            "windSpeed": "2.5 m/s",
            "pm25": "81.9 \u00b5g/m\u00b3",
            "ndvi": 0.281,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h8",
            "name": "Ajmer Road 200ft Bypass",
            "risk": "Moderate",
            "score": 65,
            "temp": "24.5\u00b0C",
            "lst": 24.5,
            "uhi": 4.7,
            "heat_index": 17.1,
            "wbgt": 10.6,
            "people": "5,918",
            "peopleNum": 5918,
            "driver": "Asphalt radiant heating",
            "lat": 26.98,
            "lon": 75.785,
            "canopyCover": "24.6%",
            "builtFraction": "60.6%",
            "buildingHeight": "45.4 m",
            "skyView": 0.66,
            "windSpeed": "3.2 m/s",
            "pm25": "72.2 \u00b5g/m\u00b3",
            "ndvi": 0.308,
            "albedo": 0.16,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Winter": {
        "peakLst": 27.0,
        "meanLst": 14.5,
        "minLst": 8.0,
        "uhiMean": 3.5,
        "uhiMax": 12.0,
        "heatIndexMean": 9.4,
        "wbgtMean": 5.0,
        "hotspotCount": 0,
        "totalRecords": 8177,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.5,
          "imperviousPct": 59.4,
          "buildingDensityPct": 57.7,
          "buildingHeightM": 58.1,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 9.4,
          "humidityPct": 32.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 593.0,
          "pm25UgM3": 108.6,
          "populationDensity": 7388
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "VKIA Industrial Area",
            "risk": "High",
            "score": 84,
            "temp": "27.0\u00b0C",
            "lst": 27.0,
            "uhi": 12.0,
            "heat_index": 16.9,
            "wbgt": 9.3,
            "people": "8,938",
            "peopleNum": 8938,
            "driver": "Low albedo industrial roofs & desert sun",
            "lat": 26.906,
            "lon": 75.741,
            "canopyCover": "20.0%",
            "builtFraction": "81.0%",
            "buildingHeight": "64.2 m",
            "skyView": 0.34,
            "windSpeed": "3.7 m/s",
            "pm25": "120.3 \u00b5g/m\u00b3",
            "ndvi": 0.215,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h2",
            "name": "Walled City (Johari Bazaar)",
            "risk": "Moderate",
            "score": 65,
            "temp": "19.5\u00b0C",
            "lst": 19.5,
            "uhi": 8.8,
            "heat_index": 9.9,
            "wbgt": 5.0,
            "people": "10,782",
            "peopleNum": 10782,
            "driver": "Dense stone masonry thermal inertia",
            "lat": 26.897,
            "lon": 75.791,
            "canopyCover": "13.3%",
            "builtFraction": "78.4%",
            "buildingHeight": "71.3 m",
            "skyView": 0.37,
            "windSpeed": "1.7 m/s",
            "pm25": "181.3 \u00b5g/m\u00b3",
            "ndvi": 0.187,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Sanganer Textile Hub",
            "risk": "Moderate",
            "score": 65,
            "temp": "18.4\u00b0C",
            "lst": 18.4,
            "uhi": 7.2,
            "heat_index": 10.5,
            "wbgt": 5.0,
            "people": "9,117",
            "peopleNum": 9117,
            "driver": "Exposed dry ground & industrial sheds",
            "lat": 26.914,
            "lon": 75.762,
            "canopyCover": "21.0%",
            "builtFraction": "80.3%",
            "buildingHeight": "78.1 m",
            "skyView": 0.42,
            "windSpeed": "2.1 m/s",
            "pm25": "127.6 \u00b5g/m\u00b3",
            "ndvi": 0.195,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Mansarovar Sector 7",
            "risk": "Moderate",
            "score": 65,
            "temp": "17.6\u00b0C",
            "lst": 17.6,
            "uhi": 6.1,
            "heat_index": 9.4,
            "wbgt": 5.0,
            "people": "9,623",
            "peopleNum": 9623,
            "driver": "High concrete fraction & low canopy",
            "lat": 26.911,
            "lon": 75.738,
            "canopyCover": "11.7%",
            "builtFraction": "63.0%",
            "buildingHeight": "39.7 m",
            "skyView": 0.66,
            "windSpeed": "2.4 m/s",
            "pm25": "124.0 \u00b5g/m\u00b3",
            "ndvi": 0.172,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Sitapura Industrial Zone",
            "risk": "Moderate",
            "score": 65,
            "temp": "16.9\u00b0C",
            "lst": 16.9,
            "uhi": 5.4,
            "heat_index": 12.7,
            "wbgt": 5.1,
            "people": "8,370",
            "peopleNum": 8370,
            "driver": "Wide asphalt roads & high solar insolation",
            "lat": 26.915,
            "lon": 75.75,
            "canopyCover": "25.2%",
            "builtFraction": "70.3%",
            "buildingHeight": "66.7 m",
            "skyView": 0.53,
            "windSpeed": "5.0 m/s",
            "pm25": "114.5 \u00b5g/m\u00b3",
            "ndvi": 0.318,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h6",
            "name": "Chandpole Bazaar",
            "risk": "Moderate",
            "score": 65,
            "temp": "16.3\u00b0C",
            "lst": 16.3,
            "uhi": 5.2,
            "heat_index": 10.5,
            "wbgt": 5.0,
            "people": "5,563",
            "peopleNum": 5563,
            "driver": "Narrow urban canyons & trapped hot air",
            "lat": 26.903,
            "lon": 75.826,
            "canopyCover": "34.7%",
            "builtFraction": "61.7%",
            "buildingHeight": "79.2 m",
            "skyView": 0.43,
            "windSpeed": "2.2 m/s",
            "pm25": "121.0 \u00b5g/m\u00b3",
            "ndvi": 0.321,
            "albedo": 0.16,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h7",
            "name": "Malviya Nagar Calgiri",
            "risk": "Moderate",
            "score": 65,
            "temp": "15.8\u00b0C",
            "lst": 15.8,
            "uhi": 4.4,
            "heat_index": 9.2,
            "wbgt": 5.0,
            "people": "10,514",
            "peopleNum": 10514,
            "driver": "Paved commercial frontages",
            "lat": 26.899,
            "lon": 75.731,
            "canopyCover": "26.5%",
            "builtFraction": "61.1%",
            "buildingHeight": "64.0 m",
            "skyView": 0.56,
            "windSpeed": "2.2 m/s",
            "pm25": "127.0 \u00b5g/m\u00b3",
            "ndvi": 0.241,
            "albedo": 0.16,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Ajmer Road 200ft Bypass",
            "risk": "Moderate",
            "score": 65,
            "temp": "15.2\u00b0C",
            "lst": 15.2,
            "uhi": 4.5,
            "heat_index": 9.5,
            "wbgt": 5.0,
            "people": "5,425",
            "peopleNum": 5425,
            "driver": "Asphalt radiant heating",
            "lat": 26.93,
            "lon": 75.88,
            "canopyCover": "25.3%",
            "builtFraction": "58.9%",
            "buildingHeight": "51.1 m",
            "skyView": 0.51,
            "windSpeed": "2.7 m/s",
            "pm25": "103.7 \u00b5g/m\u00b3",
            "ndvi": 0.308,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      }
    }
  },
  "Lucknow": {
    "name": "Lucknow",
    "state": "Uttar_Pradesh",
    "climateZone": "Humid Subtropical",
    "elevationM": 122.9615,
    "distanceToCoastKm": 800.0,
    "center": {
      "lat": 26.84663525925926,
      "lon": 80.94620622222223
    },
    "bounds": {
      "minLat": 26.624,
      "maxLat": 27.048,
      "minLon": 80.743,
      "maxLon": 81.145
    },
    "seasons": {
      "Summer": {
        "peakLst": 54.6,
        "meanLst": 42.5,
        "minLst": 28.9,
        "uhiMean": 6.4,
        "uhiMax": 12.0,
        "heatIndexMean": 38.0,
        "wbgtMean": 31.9,
        "hotspotCount": 3333,
        "totalRecords": 8591,
        "hotspotPct": 38.8,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.0,
          "buildingDensityPct": 57.3,
          "buildingHeightM": 57.8,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 37.2,
          "humidityPct": 55.1,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 665.9,
          "pm25UgM3": 68.6,
          "populationDensity": 10434
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Talkatora Industrial Area",
            "risk": "Very high",
            "score": 99,
            "temp": "54.6\u00b0C",
            "lst": 54.6,
            "uhi": 12.0,
            "heat_index": 44.0,
            "wbgt": 37.5,
            "people": "12,190",
            "peopleNum": 12190,
            "driver": "Low canopy cover & metal fabrication roofs",
            "lat": 26.889,
            "lon": 80.959,
            "canopyCover": "0.8%",
            "builtFraction": "77.4%",
            "buildingHeight": "70.1 m",
            "skyView": 0.42,
            "windSpeed": "2.1 m/s",
            "pm25": "61.7 \u00b5g/m\u00b3",
            "ndvi": 0.124,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Chowk Old Quarter",
            "risk": "Very high",
            "score": 99,
            "temp": "47.6\u00b0C",
            "lst": 47.6,
            "uhi": 11.4,
            "heat_index": 36.8,
            "wbgt": 31.8,
            "people": "18,915",
            "peopleNum": 18915,
            "driver": "Dense brick masonry & low sky view",
            "lat": 26.838,
            "lon": 80.928,
            "canopyCover": "4.3%",
            "builtFraction": "81.5%",
            "buildingHeight": "87.1 m",
            "skyView": 0.27,
            "windSpeed": "1.7 m/s",
            "pm25": "74.8 \u00b5g/m\u00b3",
            "ndvi": 0.061,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 1.0,
                "weight": 32
              },
              {
                "name": "Low air ventilation",
                "val": 0.5,
                "weight": 14
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Charbagh Station Area",
            "risk": "Very high",
            "score": 99,
            "temp": "46.5\u00b0C",
            "lst": 46.5,
            "uhi": 10.5,
            "heat_index": 41.9,
            "wbgt": 35.7,
            "people": "7,635",
            "peopleNum": 7635,
            "driver": "High diesel/auto traffic & asphalt",
            "lat": 26.864,
            "lon": 81.029,
            "canopyCover": "22.6%",
            "builtFraction": "60.2%",
            "buildingHeight": "58.3 m",
            "skyView": 0.52,
            "windSpeed": "3.9 m/s",
            "pm25": "63.4 \u00b5g/m\u00b3",
            "ndvi": 0.192,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Aminabad Market",
            "risk": "Very high",
            "score": 99,
            "temp": "45.7\u00b0C",
            "lst": 45.7,
            "uhi": 8.9,
            "heat_index": 36.7,
            "wbgt": 30.1,
            "people": "16,171",
            "peopleNum": 16171,
            "driver": "Commercial density & lack of green buffer",
            "lat": 26.861,
            "lon": 80.94,
            "canopyCover": "21.2%",
            "builtFraction": "74.8%",
            "buildingHeight": "57.5 m",
            "skyView": 0.52,
            "windSpeed": "3.1 m/s",
            "pm25": "77.8 \u00b5g/m\u00b3",
            "ndvi": 0.214,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Alambagh Bus Terminal",
            "risk": "Very high",
            "score": 99,
            "temp": "45.0\u00b0C",
            "lst": 45.0,
            "uhi": 9.1,
            "heat_index": 36.7,
            "wbgt": 31.2,
            "people": "13,151",
            "peopleNum": 13151,
            "driver": "Extensive concrete bus bays",
            "lat": 26.835,
            "lon": 80.936,
            "canopyCover": "6.3%",
            "builtFraction": "63.3%",
            "buildingHeight": "76.6 m",
            "skyView": 0.4,
            "windSpeed": "3.8 m/s",
            "pm25": "55.2 \u00b5g/m\u00b3",
            "ndvi": 0.112,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h6",
            "name": "Gomti Nagar Extension Paved",
            "risk": "Very high",
            "score": 99,
            "temp": "44.4\u00b0C",
            "lst": 44.4,
            "uhi": 8.1,
            "heat_index": 39.0,
            "wbgt": 31.9,
            "people": "13,720",
            "peopleNum": 13720,
            "driver": "Unshaded paved plazas & wide roads",
            "lat": 26.837,
            "lon": 80.977,
            "canopyCover": "20.4%",
            "builtFraction": "61.0%",
            "buildingHeight": "69.8 m",
            "skyView": 0.4,
            "windSpeed": "2.0 m/s",
            "pm25": "71.8 \u00b5g/m\u00b3",
            "ndvi": 0.274,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Hazratganj Main Corridor",
            "risk": "Very high",
            "score": 99,
            "temp": "43.8\u00b0C",
            "lst": 43.8,
            "uhi": 7.9,
            "heat_index": 38.2,
            "wbgt": 33.0,
            "people": "8,220",
            "peopleNum": 8220,
            "driver": "Vehicular heat and low ventilation",
            "lat": 26.872,
            "lon": 80.899,
            "canopyCover": "28.9%",
            "builtFraction": "66.2%",
            "buildingHeight": "58.7 m",
            "skyView": 0.46,
            "windSpeed": "3.1 m/s",
            "pm25": "78.9 \u00b5g/m\u00b3",
            "ndvi": 0.266,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Indira Nagar Sector 14",
            "risk": "Very high",
            "score": 99,
            "temp": "43.3\u00b0C",
            "lst": 43.3,
            "uhi": 7.6,
            "heat_index": 39.7,
            "wbgt": 32.5,
            "people": "11,604",
            "peopleNum": 11604,
            "driver": "High built fraction & low albedo",
            "lat": 26.894,
            "lon": 80.931,
            "canopyCover": "24.9%",
            "builtFraction": "67.5%",
            "buildingHeight": "53.4 m",
            "skyView": 0.57,
            "windSpeed": "2.9 m/s",
            "pm25": "72.7 \u00b5g/m\u00b3",
            "ndvi": 0.351,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Monsoon": {
        "peakLst": 49.8,
        "meanLst": 35.2,
        "minLst": 19.9,
        "uhiMean": 6.2,
        "uhiMax": 12.0,
        "heatIndexMean": 31.7,
        "wbgtMean": 27.7,
        "hotspotCount": 44,
        "totalRecords": 11316,
        "hotspotPct": 0.4,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.265,
          "treeCoverPct": 25.5,
          "imperviousPct": 59.0,
          "buildingDensityPct": 57.3,
          "buildingHeightM": 57.7,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 30.5,
          "humidityPct": 73.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 516.4,
          "pm25UgM3": 37.8,
          "populationDensity": 10420
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Talkatora Industrial Area",
            "risk": "Very high",
            "score": 99,
            "temp": "49.8\u00b0C",
            "lst": 49.8,
            "uhi": 12.0,
            "heat_index": 37.4,
            "wbgt": 34.4,
            "people": "15,581",
            "peopleNum": 15581,
            "driver": "Low canopy cover & metal fabrication roofs",
            "lat": 26.879,
            "lon": 80.983,
            "canopyCover": "8.5%",
            "builtFraction": "84.2%",
            "buildingHeight": "73.5 m",
            "skyView": 0.4,
            "windSpeed": "2.1 m/s",
            "pm25": "63.0 \u00b5g/m\u00b3",
            "ndvi": 0.068,
            "albedo": 0.28,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Chowk Old Quarter",
            "risk": "Very high",
            "score": 99,
            "temp": "40.4\u00b0C",
            "lst": 40.4,
            "uhi": 10.8,
            "heat_index": 33.9,
            "wbgt": 33.0,
            "people": "13,800",
            "peopleNum": 13800,
            "driver": "Dense brick masonry & low sky view",
            "lat": 26.887,
            "lon": 80.91,
            "canopyCover": "10.0%",
            "builtFraction": "72.1%",
            "buildingHeight": "75.3 m",
            "skyView": 0.32,
            "windSpeed": "3.2 m/s",
            "pm25": "61.6 \u00b5g/m\u00b3",
            "ndvi": 0.056,
            "albedo": 0.28,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Charbagh Station Area",
            "risk": "Very high",
            "score": 99,
            "temp": "39.3\u00b0C",
            "lst": 39.3,
            "uhi": 10.3,
            "heat_index": 31.5,
            "wbgt": 29.2,
            "people": "13,329",
            "peopleNum": 13329,
            "driver": "High diesel/auto traffic & asphalt",
            "lat": 26.889,
            "lon": 80.917,
            "canopyCover": "13.4%",
            "builtFraction": "73.8%",
            "buildingHeight": "78.1 m",
            "skyView": 0.47,
            "windSpeed": "2.1 m/s",
            "pm25": "45.2 \u00b5g/m\u00b3",
            "ndvi": 0.146,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h4",
            "name": "Aminabad Market",
            "risk": "Very high",
            "score": 99,
            "temp": "38.4\u00b0C",
            "lst": 38.4,
            "uhi": 9.7,
            "heat_index": 31.8,
            "wbgt": 28.5,
            "people": "13,273",
            "peopleNum": 13273,
            "driver": "Commercial density & lack of green buffer",
            "lat": 26.882,
            "lon": 80.935,
            "canopyCover": "21.8%",
            "builtFraction": "76.5%",
            "buildingHeight": "78.8 m",
            "skyView": 0.44,
            "windSpeed": "4.4 m/s",
            "pm25": "40.0 \u00b5g/m\u00b3",
            "ndvi": 0.159,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Alambagh Bus Terminal",
            "risk": "Very high",
            "score": 95,
            "temp": "37.8\u00b0C",
            "lst": 37.8,
            "uhi": 8.6,
            "heat_index": 31.3,
            "wbgt": 27.4,
            "people": "9,355",
            "peopleNum": 9355,
            "driver": "Extensive concrete bus bays",
            "lat": 26.864,
            "lon": 80.947,
            "canopyCover": "25.4%",
            "builtFraction": "75.5%",
            "buildingHeight": "70.8 m",
            "skyView": 0.48,
            "windSpeed": "3.1 m/s",
            "pm25": "31.4 \u00b5g/m\u00b3",
            "ndvi": 0.222,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Gomti Nagar Extension Paved",
            "risk": "Very high",
            "score": 92,
            "temp": "37.2\u00b0C",
            "lst": 37.2,
            "uhi": 7.7,
            "heat_index": 33.0,
            "wbgt": 31.5,
            "people": "10,071",
            "peopleNum": 10071,
            "driver": "Unshaded paved plazas & wide roads",
            "lat": 26.933,
            "lon": 80.941,
            "canopyCover": "15.2%",
            "builtFraction": "68.4%",
            "buildingHeight": "54.8 m",
            "skyView": 0.57,
            "windSpeed": "3.6 m/s",
            "pm25": "57.1 \u00b5g/m\u00b3",
            "ndvi": 0.163,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h7",
            "name": "Hazratganj Main Corridor",
            "risk": "Very high",
            "score": 91,
            "temp": "36.6\u00b0C",
            "lst": 36.6,
            "uhi": 7.9,
            "heat_index": 31.1,
            "wbgt": 27.6,
            "people": "11,720",
            "peopleNum": 11720,
            "driver": "Vehicular heat and low ventilation",
            "lat": 26.878,
            "lon": 80.901,
            "canopyCover": "24.8%",
            "builtFraction": "72.8%",
            "buildingHeight": "70.7 m",
            "skyView": 0.55,
            "windSpeed": "4.5 m/s",
            "pm25": "39.9 \u00b5g/m\u00b3",
            "ndvi": 0.216,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Indira Nagar Sector 14",
            "risk": "Very high",
            "score": 89,
            "temp": "36.0\u00b0C",
            "lst": 36.0,
            "uhi": 7.4,
            "heat_index": 33.4,
            "wbgt": 29.7,
            "people": "8,728",
            "peopleNum": 8728,
            "driver": "High built fraction & low albedo",
            "lat": 26.862,
            "lon": 80.889,
            "canopyCover": "17.2%",
            "builtFraction": "72.1%",
            "buildingHeight": "42.2 m",
            "skyView": 0.62,
            "windSpeed": "2.5 m/s",
            "pm25": "42.5 \u00b5g/m\u00b3",
            "ndvi": 0.192,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Post_Monsoon": {
        "peakLst": 36.3,
        "meanLst": 24.7,
        "minLst": 12.3,
        "uhiMean": 4.7,
        "uhiMax": 12.0,
        "heatIndexMean": 19.7,
        "wbgtMean": 14.3,
        "hotspotCount": 0,
        "totalRecords": 5570,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.266,
          "treeCoverPct": 25.7,
          "imperviousPct": 58.7,
          "buildingDensityPct": 57.0,
          "buildingHeightM": 57.8,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 19.7,
          "humidityPct": 55.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 606.3,
          "pm25UgM3": 68.4,
          "populationDensity": 10362
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Talkatora Industrial Area",
            "risk": "Very high",
            "score": 99,
            "temp": "36.3\u00b0C",
            "lst": 36.3,
            "uhi": 12.0,
            "heat_index": 24.4,
            "wbgt": 20.3,
            "people": "18,547",
            "peopleNum": 18547,
            "driver": "Low canopy cover & metal fabrication roofs",
            "lat": 26.822,
            "lon": 80.957,
            "canopyCover": "14.6%",
            "builtFraction": "86.2%",
            "buildingHeight": "82.7 m",
            "skyView": 0.24,
            "windSpeed": "2.3 m/s",
            "pm25": "89.0 \u00b5g/m\u00b3",
            "ndvi": 0.176,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 1.0,
                "weight": 32
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h2",
            "name": "Chowk Old Quarter",
            "risk": "High",
            "score": 83,
            "temp": "29.9\u00b0C",
            "lst": 29.9,
            "uhi": 9.3,
            "heat_index": 19.8,
            "wbgt": 15.2,
            "people": "8,943",
            "peopleNum": 8943,
            "driver": "Dense brick masonry & low sky view",
            "lat": 26.786,
            "lon": 80.938,
            "canopyCover": "17.7%",
            "builtFraction": "77.1%",
            "buildingHeight": "62.6 m",
            "skyView": 0.42,
            "windSpeed": "2.0 m/s",
            "pm25": "87.2 \u00b5g/m\u00b3",
            "ndvi": 0.17,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Charbagh Station Area",
            "risk": "High",
            "score": 77,
            "temp": "28.7\u00b0C",
            "lst": 28.7,
            "uhi": 8.1,
            "heat_index": 20.8,
            "wbgt": 16.2,
            "people": "8,953",
            "peopleNum": 8953,
            "driver": "High diesel/auto traffic & asphalt",
            "lat": 26.836,
            "lon": 80.939,
            "canopyCover": "21.3%",
            "builtFraction": "74.4%",
            "buildingHeight": "59.1 m",
            "skyView": 0.54,
            "windSpeed": "2.5 m/s",
            "pm25": "59.4 \u00b5g/m\u00b3",
            "ndvi": 0.237,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Aminabad Market",
            "risk": "High",
            "score": 76,
            "temp": "27.9\u00b0C",
            "lst": 27.9,
            "uhi": 8.0,
            "heat_index": 23.3,
            "wbgt": 16.9,
            "people": "11,783",
            "peopleNum": 11783,
            "driver": "Commercial density & lack of green buffer",
            "lat": 26.843,
            "lon": 80.875,
            "canopyCover": "24.9%",
            "builtFraction": "60.6%",
            "buildingHeight": "43.8 m",
            "skyView": 0.57,
            "windSpeed": "3.0 m/s",
            "pm25": "61.4 \u00b5g/m\u00b3",
            "ndvi": 0.255,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Alambagh Bus Terminal",
            "risk": "High",
            "score": 75,
            "temp": "27.2\u00b0C",
            "lst": 27.2,
            "uhi": 8.1,
            "heat_index": 21.6,
            "wbgt": 15.3,
            "people": "9,175",
            "peopleNum": 9175,
            "driver": "Extensive concrete bus bays",
            "lat": 26.915,
            "lon": 80.922,
            "canopyCover": "16.9%",
            "builtFraction": "58.8%",
            "buildingHeight": "59.2 m",
            "skyView": 0.48,
            "windSpeed": "2.7 m/s",
            "pm25": "52.8 \u00b5g/m\u00b3",
            "ndvi": 0.22,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Gomti Nagar Extension Paved",
            "risk": "Moderate",
            "score": 70,
            "temp": "26.6\u00b0C",
            "lst": 26.6,
            "uhi": 6.8,
            "heat_index": 21.5,
            "wbgt": 16.8,
            "people": "10,898",
            "peopleNum": 10898,
            "driver": "Unshaded paved plazas & wide roads",
            "lat": 26.863,
            "lon": 80.966,
            "canopyCover": "26.7%",
            "builtFraction": "60.9%",
            "buildingHeight": "58.2 m",
            "skyView": 0.46,
            "windSpeed": "2.4 m/s",
            "pm25": "51.0 \u00b5g/m\u00b3",
            "ndvi": 0.275,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Hazratganj Main Corridor",
            "risk": "Moderate",
            "score": 67,
            "temp": "26.0\u00b0C",
            "lst": 26.0,
            "uhi": 5.7,
            "heat_index": 17.8,
            "wbgt": 13.2,
            "people": "16,954",
            "peopleNum": 16954,
            "driver": "Vehicular heat and low ventilation",
            "lat": 26.861,
            "lon": 80.93,
            "canopyCover": "2.4%",
            "builtFraction": "85.2%",
            "buildingHeight": "63.5 m",
            "skyView": 0.54,
            "windSpeed": "5.9 m/s",
            "pm25": "81.4 \u00b5g/m\u00b3",
            "ndvi": 0.123,
            "albedo": 0.3,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h8",
            "name": "Indira Nagar Sector 14",
            "risk": "Moderate",
            "score": 67,
            "temp": "25.5\u00b0C",
            "lst": 25.5,
            "uhi": 6.2,
            "heat_index": 22.8,
            "wbgt": 19.4,
            "people": "7,649",
            "peopleNum": 7649,
            "driver": "High built fraction & low albedo",
            "lat": 26.813,
            "lon": 80.87,
            "canopyCover": "39.3%",
            "builtFraction": "50.9%",
            "buildingHeight": "72.7 m",
            "skyView": 0.54,
            "windSpeed": "2.9 m/s",
            "pm25": "61.9 \u00b5g/m\u00b3",
            "ndvi": 0.3,
            "albedo": 0.17,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.1,
                "weight": 38
              },
              {
                "name": "Low tree canopy cover",
                "val": -0.1,
                "weight": -3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Winter": {
        "peakLst": 28.1,
        "meanLst": 15.5,
        "minLst": 8.0,
        "uhiMean": 4.5,
        "uhiMax": 12.0,
        "heatIndexMean": 10.4,
        "wbgtMean": 5.5,
        "hotspotCount": 0,
        "totalRecords": 8273,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.5,
          "imperviousPct": 59.2,
          "buildingDensityPct": 57.5,
          "buildingHeightM": 58.0,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 10.4,
          "humidityPct": 46.9,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 592.2,
          "pm25UgM3": 109.8,
          "populationDensity": 10440
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Talkatora Industrial Area",
            "risk": "High",
            "score": 86,
            "temp": "28.1\u00b0C",
            "lst": 28.1,
            "uhi": 12.0,
            "heat_index": 16.4,
            "wbgt": 9.8,
            "people": "14,436",
            "peopleNum": 14436,
            "driver": "Low canopy cover & metal fabrication roofs",
            "lat": 26.823,
            "lon": 80.946,
            "canopyCover": "13.8%",
            "builtFraction": "85.2%",
            "buildingHeight": "76.9 m",
            "skyView": 0.34,
            "windSpeed": "2.2 m/s",
            "pm25": "106.3 \u00b5g/m\u00b3",
            "ndvi": 0.24,
            "albedo": 0.28,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h2",
            "name": "Chowk Old Quarter",
            "risk": "Moderate",
            "score": 68,
            "temp": "20.5\u00b0C",
            "lst": 20.5,
            "uhi": 10.3,
            "heat_index": 12.7,
            "wbgt": 8.4,
            "people": "13,434",
            "peopleNum": 13434,
            "driver": "Dense brick masonry & low sky view",
            "lat": 26.779,
            "lon": 80.977,
            "canopyCover": "15.8%",
            "builtFraction": "62.4%",
            "buildingHeight": "69.6 m",
            "skyView": 0.44,
            "windSpeed": "4.1 m/s",
            "pm25": "128.5 \u00b5g/m\u00b3",
            "ndvi": 0.212,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Charbagh Station Area",
            "risk": "Moderate",
            "score": 65,
            "temp": "19.5\u00b0C",
            "lst": 19.5,
            "uhi": 8.0,
            "heat_index": 11.6,
            "wbgt": 5.0,
            "people": "17,037",
            "peopleNum": 17037,
            "driver": "High diesel/auto traffic & asphalt",
            "lat": 26.899,
            "lon": 80.959,
            "canopyCover": "11.5%",
            "builtFraction": "70.6%",
            "buildingHeight": "58.5 m",
            "skyView": 0.38,
            "windSpeed": "2.4 m/s",
            "pm25": "127.0 \u00b5g/m\u00b3",
            "ndvi": 0.179,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Aminabad Market",
            "risk": "Moderate",
            "score": 65,
            "temp": "18.7\u00b0C",
            "lst": 18.7,
            "uhi": 7.5,
            "heat_index": 9.6,
            "wbgt": 5.0,
            "people": "12,288",
            "peopleNum": 12288,
            "driver": "Commercial density & lack of green buffer",
            "lat": 26.88,
            "lon": 80.989,
            "canopyCover": "19.0%",
            "builtFraction": "77.7%",
            "buildingHeight": "78.9 m",
            "skyView": 0.46,
            "windSpeed": "2.1 m/s",
            "pm25": "119.1 \u00b5g/m\u00b3",
            "ndvi": 0.194,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Alambagh Bus Terminal",
            "risk": "Moderate",
            "score": 65,
            "temp": "18.1\u00b0C",
            "lst": 18.1,
            "uhi": 7.4,
            "heat_index": 12.5,
            "wbgt": 7.0,
            "people": "7,900",
            "peopleNum": 7900,
            "driver": "Extensive concrete bus bays",
            "lat": 26.829,
            "lon": 80.879,
            "canopyCover": "16.6%",
            "builtFraction": "61.5%",
            "buildingHeight": "56.1 m",
            "skyView": 0.54,
            "windSpeed": "3.1 m/s",
            "pm25": "91.1 \u00b5g/m\u00b3",
            "ndvi": 0.142,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h6",
            "name": "Gomti Nagar Extension Paved",
            "risk": "Moderate",
            "score": 65,
            "temp": "17.4\u00b0C",
            "lst": 17.4,
            "uhi": 6.7,
            "heat_index": 10.9,
            "wbgt": 5.0,
            "people": "18,042",
            "peopleNum": 18042,
            "driver": "Unshaded paved plazas & wide roads",
            "lat": 26.826,
            "lon": 80.913,
            "canopyCover": "4.7%",
            "builtFraction": "59.8%",
            "buildingHeight": "57.8 m",
            "skyView": 0.5,
            "windSpeed": "2.2 m/s",
            "pm25": "120.3 \u00b5g/m\u00b3",
            "ndvi": 0.028,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h7",
            "name": "Hazratganj Main Corridor",
            "risk": "Moderate",
            "score": 65,
            "temp": "16.8\u00b0C",
            "lst": 16.8,
            "uhi": 6.3,
            "heat_index": 12.4,
            "wbgt": 6.1,
            "people": "9,642",
            "peopleNum": 9642,
            "driver": "Vehicular heat and low ventilation",
            "lat": 26.796,
            "lon": 80.877,
            "canopyCover": "33.0%",
            "builtFraction": "56.7%",
            "buildingHeight": "28.4 m",
            "skyView": 0.73,
            "windSpeed": "4.0 m/s",
            "pm25": "90.2 \u00b5g/m\u00b3",
            "ndvi": 0.279,
            "albedo": 0.17,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h8",
            "name": "Indira Nagar Sector 14",
            "risk": "Moderate",
            "score": 65,
            "temp": "16.3\u00b0C",
            "lst": 16.3,
            "uhi": 4.6,
            "heat_index": 8.9,
            "wbgt": 5.0,
            "people": "14,941",
            "peopleNum": 14941,
            "driver": "High built fraction & low albedo",
            "lat": 26.898,
            "lon": 80.914,
            "canopyCover": "20.8%",
            "builtFraction": "75.1%",
            "buildingHeight": "67.0 m",
            "skyView": 0.53,
            "windSpeed": "4.3 m/s",
            "pm25": "98.7 \u00b5g/m\u00b3",
            "ndvi": 0.212,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      }
    }
  },
  "Nagpur": {
    "name": "Nagpur",
    "state": "Maharashtra",
    "climateZone": "Semi Arid",
    "elevationM": 310.10299999999995,
    "distanceToCoastKm": 550.0,
    "center": {
      "lat": 21.145652265100672,
      "lon": 79.08864848993288
    },
    "bounds": {
      "minLat": 20.966,
      "maxLat": 21.339,
      "minLon": 78.905,
      "maxLon": 79.324
    },
    "seasons": {
      "Summer": {
        "peakLst": 55.7,
        "meanLst": 44.9,
        "minLst": 30.6,
        "uhiMean": 5.8,
        "uhiMax": 12.0,
        "heatIndexMean": 39.9,
        "wbgtMean": 32.9,
        "hotspotCount": 3340,
        "totalRecords": 8423,
        "hotspotPct": 39.7,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.3,
          "buildingDensityPct": 57.4,
          "buildingHeightM": 58.1,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 39.6,
          "humidityPct": 45.1,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 664.8,
          "pm25UgM3": 68.5,
          "populationDensity": 9232
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "MIDC Hingna Industrial",
            "risk": "Very high",
            "score": 99,
            "temp": "55.7\u00b0C",
            "lst": 55.7,
            "uhi": 12.0,
            "heat_index": 45.2,
            "wbgt": 38.1,
            "people": "11,049",
            "peopleNum": 11049,
            "driver": "High industrial roof heat & arid sun",
            "lat": 21.133,
            "lon": 79.126,
            "canopyCover": "1.2%",
            "builtFraction": "80.5%",
            "buildingHeight": "61.5 m",
            "skyView": 0.58,
            "windSpeed": "3.0 m/s",
            "pm25": "90.8 \u00b5g/m\u00b3",
            "ndvi": 0.071,
            "albedo": 0.27,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Itwari Market Wholesale",
            "risk": "Very high",
            "score": 99,
            "temp": "50.2\u00b0C",
            "lst": 50.2,
            "uhi": 11.0,
            "heat_index": 40.4,
            "wbgt": 32.6,
            "people": "11,557",
            "peopleNum": 11557,
            "driver": "Dense masonry & zero vegetation",
            "lat": 21.145,
            "lon": 79.065,
            "canopyCover": "11.0%",
            "builtFraction": "78.0%",
            "buildingHeight": "65.8 m",
            "skyView": 0.48,
            "windSpeed": "2.3 m/s",
            "pm25": "86.9 \u00b5g/m\u00b3",
            "ndvi": 0.141,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Sitabuldi Main Market",
            "risk": "Very high",
            "score": 99,
            "temp": "49.0\u00b0C",
            "lst": 49.0,
            "uhi": 10.8,
            "heat_index": 39.2,
            "wbgt": 33.2,
            "people": "9,336",
            "peopleNum": 9336,
            "driver": "Traffic congestion & asphalt radiation",
            "lat": 21.088,
            "lon": 79.083,
            "canopyCover": "9.2%",
            "builtFraction": "70.9%",
            "buildingHeight": "66.7 m",
            "skyView": 0.43,
            "windSpeed": "2.3 m/s",
            "pm25": "110.5 \u00b5g/m\u00b3",
            "ndvi": 0.104,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h4",
            "name": "Gandhibagh Center",
            "risk": "Very high",
            "score": 99,
            "temp": "48.2\u00b0C",
            "lst": 48.2,
            "uhi": 9.3,
            "heat_index": 40.0,
            "wbgt": 35.3,
            "people": "12,681",
            "peopleNum": 12681,
            "driver": "High population density & low sky view",
            "lat": 21.182,
            "lon": 79.062,
            "canopyCover": "10.9%",
            "builtFraction": "76.7%",
            "buildingHeight": "62.8 m",
            "skyView": 0.52,
            "windSpeed": "2.0 m/s",
            "pm25": "86.5 \u00b5g/m\u00b3",
            "ndvi": 0.145,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Mahal Heritage Ward",
            "risk": "Very high",
            "score": 99,
            "temp": "47.5\u00b0C",
            "lst": 47.5,
            "uhi": 8.3,
            "heat_index": 39.6,
            "wbgt": 32.8,
            "people": "9,387",
            "peopleNum": 9387,
            "driver": "Dense brick thermal storage",
            "lat": 21.178,
            "lon": 79.107,
            "canopyCover": "16.9%",
            "builtFraction": "64.2%",
            "buildingHeight": "63.8 m",
            "skyView": 0.48,
            "windSpeed": "2.6 m/s",
            "pm25": "90.9 \u00b5g/m\u00b3",
            "ndvi": 0.249,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Wardha Road Multi-Modal",
            "risk": "Very high",
            "score": 99,
            "temp": "46.9\u00b0C",
            "lst": 46.9,
            "uhi": 8.5,
            "heat_index": 38.3,
            "wbgt": 32.5,
            "people": "18,086",
            "peopleNum": 18086,
            "driver": "Wide concrete flyovers & low shade",
            "lat": 21.171,
            "lon": 79.117,
            "canopyCover": "11.3%",
            "builtFraction": "74.8%",
            "buildingHeight": "71.2 m",
            "skyView": 0.4,
            "windSpeed": "2.2 m/s",
            "pm25": "79.4 \u00b5g/m\u00b3",
            "ndvi": 0.189,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Kalamna Grain Market",
            "risk": "Very high",
            "score": 99,
            "temp": "46.3\u00b0C",
            "lst": 46.3,
            "uhi": 6.8,
            "heat_index": 39.5,
            "wbgt": 34.7,
            "people": "7,279",
            "peopleNum": 7279,
            "driver": "Exposed tin sheds & high thermal emissivity",
            "lat": 21.142,
            "lon": 78.995,
            "canopyCover": "25.5%",
            "builtFraction": "66.9%",
            "buildingHeight": "63.3 m",
            "skyView": 0.44,
            "windSpeed": "5.8 m/s",
            "pm25": "56.3 \u00b5g/m\u00b3",
            "ndvi": 0.238,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Pardi Flyover Junction",
            "risk": "Very high",
            "score": 99,
            "temp": "45.7\u00b0C",
            "lst": 45.7,
            "uhi": 6.4,
            "heat_index": 40.4,
            "wbgt": 33.6,
            "people": "8,310",
            "peopleNum": 8310,
            "driver": "Heavy commercial vehicle corridor",
            "lat": 21.019,
            "lon": 79.089,
            "canopyCover": "24.9%",
            "builtFraction": "68.0%",
            "buildingHeight": "66.8 m",
            "skyView": 0.5,
            "windSpeed": "3.1 m/s",
            "pm25": "81.1 \u00b5g/m\u00b3",
            "ndvi": 0.258,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Monsoon": {
        "peakLst": 44.1,
        "meanLst": 32.6,
        "minLst": 18.3,
        "uhiMean": 5.6,
        "uhiMax": 12.0,
        "heatIndexMean": 28.5,
        "wbgtMean": 23.7,
        "hotspotCount": 0,
        "totalRecords": 11335,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.3,
          "buildingDensityPct": 57.6,
          "buildingHeightM": 58.2,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 27.9,
          "humidityPct": 63.1,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 515.3,
          "pm25UgM3": 37.6,
          "populationDensity": 9225
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "MIDC Hingna Industrial",
            "risk": "Very high",
            "score": 99,
            "temp": "44.1\u00b0C",
            "lst": 44.1,
            "uhi": 12.0,
            "heat_index": 34.6,
            "wbgt": 30.1,
            "people": "12,821",
            "peopleNum": 12821,
            "driver": "High industrial roof heat & arid sun",
            "lat": 21.19,
            "lon": 79.072,
            "canopyCover": "0.3%",
            "builtFraction": "86.1%",
            "buildingHeight": "68.3 m",
            "skyView": 0.31,
            "windSpeed": "1.9 m/s",
            "pm25": "49.0 \u00b5g/m\u00b3",
            "ndvi": -0.016,
            "albedo": 0.29,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": 0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h2",
            "name": "Itwari Market Wholesale",
            "risk": "Very high",
            "score": 99,
            "temp": "37.9\u00b0C",
            "lst": 37.9,
            "uhi": 10.6,
            "heat_index": 29.9,
            "wbgt": 26.2,
            "people": "10,570",
            "peopleNum": 10570,
            "driver": "Dense masonry & zero vegetation",
            "lat": 21.158,
            "lon": 79.101,
            "canopyCover": "21.5%",
            "builtFraction": "77.0%",
            "buildingHeight": "84.1 m",
            "skyView": 0.4,
            "windSpeed": "1.9 m/s",
            "pm25": "43.6 \u00b5g/m\u00b3",
            "ndvi": 0.263,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Sitabuldi Main Market",
            "risk": "Very high",
            "score": 98,
            "temp": "36.7\u00b0C",
            "lst": 36.7,
            "uhi": 10.5,
            "heat_index": 30.0,
            "wbgt": 26.2,
            "people": "7,980",
            "peopleNum": 7980,
            "driver": "Traffic congestion & asphalt radiation",
            "lat": 21.125,
            "lon": 79.168,
            "canopyCover": "26.2%",
            "builtFraction": "71.6%",
            "buildingHeight": "55.7 m",
            "skyView": 0.48,
            "windSpeed": "2.4 m/s",
            "pm25": "58.0 \u00b5g/m\u00b3",
            "ndvi": 0.309,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h4",
            "name": "Gandhibagh Center",
            "risk": "Very high",
            "score": 92,
            "temp": "35.9\u00b0C",
            "lst": 35.9,
            "uhi": 8.8,
            "heat_index": 29.6,
            "wbgt": 24.6,
            "people": "15,004",
            "peopleNum": 15004,
            "driver": "High population density & low sky view",
            "lat": 21.136,
            "lon": 79.002,
            "canopyCover": "18.8%",
            "builtFraction": "69.1%",
            "buildingHeight": "65.9 m",
            "skyView": 0.51,
            "windSpeed": "2.2 m/s",
            "pm25": "50.7 \u00b5g/m\u00b3",
            "ndvi": 0.223,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Mahal Heritage Ward",
            "risk": "Very high",
            "score": 89,
            "temp": "35.2\u00b0C",
            "lst": 35.2,
            "uhi": 8.0,
            "heat_index": 27.2,
            "wbgt": 24.0,
            "people": "14,690",
            "peopleNum": 14690,
            "driver": "Dense brick thermal storage",
            "lat": 21.166,
            "lon": 79.124,
            "canopyCover": "21.8%",
            "builtFraction": "70.4%",
            "buildingHeight": "75.6 m",
            "skyView": 0.47,
            "windSpeed": "2.5 m/s",
            "pm25": "55.5 \u00b5g/m\u00b3",
            "ndvi": 0.188,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Wardha Road Multi-Modal",
            "risk": "High",
            "score": 87,
            "temp": "34.6\u00b0C",
            "lst": 34.6,
            "uhi": 7.6,
            "heat_index": 28.8,
            "wbgt": 23.2,
            "people": "14,196",
            "peopleNum": 14196,
            "driver": "Wide concrete flyovers & low shade",
            "lat": 21.123,
            "lon": 79.101,
            "canopyCover": "17.6%",
            "builtFraction": "76.5%",
            "buildingHeight": "61.8 m",
            "skyView": 0.52,
            "windSpeed": "4.2 m/s",
            "pm25": "22.0 \u00b5g/m\u00b3",
            "ndvi": 0.21,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Kalamna Grain Market",
            "risk": "High",
            "score": 84,
            "temp": "34.0\u00b0C",
            "lst": 34.0,
            "uhi": 6.8,
            "heat_index": 28.0,
            "wbgt": 23.3,
            "people": "15,924",
            "peopleNum": 15924,
            "driver": "Exposed tin sheds & high thermal emissivity",
            "lat": 21.126,
            "lon": 79.091,
            "canopyCover": "20.3%",
            "builtFraction": "75.0%",
            "buildingHeight": "71.0 m",
            "skyView": 0.36,
            "windSpeed": "2.5 m/s",
            "pm25": "22.1 \u00b5g/m\u00b3",
            "ndvi": 0.252,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Pardi Flyover Junction",
            "risk": "High",
            "score": 82,
            "temp": "33.4\u00b0C",
            "lst": 33.4,
            "uhi": 6.7,
            "heat_index": 30.4,
            "wbgt": 25.4,
            "people": "6,103",
            "peopleNum": 6103,
            "driver": "Heavy commercial vehicle corridor",
            "lat": 21.226,
            "lon": 78.996,
            "canopyCover": "31.6%",
            "builtFraction": "56.7%",
            "buildingHeight": "72.2 m",
            "skyView": 0.53,
            "windSpeed": "3.3 m/s",
            "pm25": "34.9 \u00b5g/m\u00b3",
            "ndvi": 0.324,
            "albedo": 0.15,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Post_Monsoon": {
        "peakLst": 36.6,
        "meanLst": 25.0,
        "minLst": 10.9,
        "uhiMean": 4.0,
        "uhiMax": 12.0,
        "heatIndexMean": 20.0,
        "wbgtMean": 13.3,
        "hotspotCount": 0,
        "totalRecords": 5473,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.266,
          "treeCoverPct": 25.7,
          "imperviousPct": 58.8,
          "buildingDensityPct": 57.1,
          "buildingHeightM": 57.8,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 20.0,
          "humidityPct": 45.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 604.3,
          "pm25UgM3": 67.6,
          "populationDensity": 9148
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "MIDC Hingna Industrial",
            "risk": "Very high",
            "score": 99,
            "temp": "36.6\u00b0C",
            "lst": 36.6,
            "uhi": 12.0,
            "heat_index": 22.0,
            "wbgt": 17.9,
            "people": "17,771",
            "peopleNum": 17771,
            "driver": "High industrial roof heat & arid sun",
            "lat": 21.144,
            "lon": 79.077,
            "canopyCover": "0.2%",
            "builtFraction": "85.7%",
            "buildingHeight": "83.7 m",
            "skyView": 0.34,
            "windSpeed": "2.1 m/s",
            "pm25": "77.5 \u00b5g/m\u00b3",
            "ndvi": 0.021,
            "albedo": 0.3,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h2",
            "name": "Itwari Market Wholesale",
            "risk": "High",
            "score": 81,
            "temp": "30.0\u00b0C",
            "lst": 30.0,
            "uhi": 8.6,
            "heat_index": 20.9,
            "wbgt": 15.7,
            "people": "9,423",
            "peopleNum": 9423,
            "driver": "Dense masonry & zero vegetation",
            "lat": 21.122,
            "lon": 79.133,
            "canopyCover": "7.4%",
            "builtFraction": "70.1%",
            "buildingHeight": "61.3 m",
            "skyView": 0.47,
            "windSpeed": "2.2 m/s",
            "pm25": "77.5 \u00b5g/m\u00b3",
            "ndvi": 0.056,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Sitabuldi Main Market",
            "risk": "High",
            "score": 76,
            "temp": "28.9\u00b0C",
            "lst": 28.9,
            "uhi": 7.3,
            "heat_index": 22.5,
            "wbgt": 16.9,
            "people": "10,965",
            "peopleNum": 10965,
            "driver": "Traffic congestion & asphalt radiation",
            "lat": 21.156,
            "lon": 78.991,
            "canopyCover": "29.1%",
            "builtFraction": "69.2%",
            "buildingHeight": "42.7 m",
            "skyView": 0.59,
            "windSpeed": "2.7 m/s",
            "pm25": "68.1 \u00b5g/m\u00b3",
            "ndvi": 0.293,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h4",
            "name": "Gandhibagh Center",
            "risk": "Moderate",
            "score": 73,
            "temp": "28.2\u00b0C",
            "lst": 28.2,
            "uhi": 6.6,
            "heat_index": 19.3,
            "wbgt": 12.7,
            "people": "10,798",
            "peopleNum": 10798,
            "driver": "High population density & low sky view",
            "lat": 21.163,
            "lon": 79.161,
            "canopyCover": "22.2%",
            "builtFraction": "69.7%",
            "buildingHeight": "50.9 m",
            "skyView": 0.54,
            "windSpeed": "2.3 m/s",
            "pm25": "86.7 \u00b5g/m\u00b3",
            "ndvi": 0.237,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Mahal Heritage Ward",
            "risk": "Moderate",
            "score": 71,
            "temp": "27.6\u00b0C",
            "lst": 27.6,
            "uhi": 6.5,
            "heat_index": 24.8,
            "wbgt": 16.7,
            "people": "4,862",
            "peopleNum": 4862,
            "driver": "Dense brick thermal storage",
            "lat": 21.154,
            "lon": 79.136,
            "canopyCover": "27.9%",
            "builtFraction": "27.8%",
            "buildingHeight": "44.4 m",
            "skyView": 0.69,
            "windSpeed": "3.4 m/s",
            "pm25": "44.6 \u00b5g/m\u00b3",
            "ndvi": 0.273,
            "albedo": 0.09,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 0.6,
                "weight": 21
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Wardha Road Multi-Modal",
            "risk": "Moderate",
            "score": 67,
            "temp": "27.0\u00b0C",
            "lst": 27.0,
            "uhi": 5.2,
            "heat_index": 19.1,
            "wbgt": 12.5,
            "people": "8,661",
            "peopleNum": 8661,
            "driver": "Wide concrete flyovers & low shade",
            "lat": 21.165,
            "lon": 79.078,
            "canopyCover": "14.2%",
            "builtFraction": "81.9%",
            "buildingHeight": "69.8 m",
            "skyView": 0.42,
            "windSpeed": "4.0 m/s",
            "pm25": "61.1 \u00b5g/m\u00b3",
            "ndvi": 0.132,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h7",
            "name": "Kalamna Grain Market",
            "risk": "Moderate",
            "score": 65,
            "temp": "26.4\u00b0C",
            "lst": 26.4,
            "uhi": 4.9,
            "heat_index": 18.8,
            "wbgt": 11.0,
            "people": "10,167",
            "peopleNum": 10167,
            "driver": "Exposed tin sheds & high thermal emissivity",
            "lat": 21.12,
            "lon": 79.01,
            "canopyCover": "20.4%",
            "builtFraction": "66.7%",
            "buildingHeight": "77.8 m",
            "skyView": 0.43,
            "windSpeed": "2.3 m/s",
            "pm25": "104.4 \u00b5g/m\u00b3",
            "ndvi": 0.144,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h8",
            "name": "Pardi Flyover Junction",
            "risk": "Moderate",
            "score": 65,
            "temp": "25.9\u00b0C",
            "lst": 25.9,
            "uhi": 5.3,
            "heat_index": 21.5,
            "wbgt": 13.7,
            "people": "7,913",
            "peopleNum": 7913,
            "driver": "Heavy commercial vehicle corridor",
            "lat": 21.156,
            "lon": 79.15,
            "canopyCover": "30.8%",
            "builtFraction": "48.8%",
            "buildingHeight": "63.1 m",
            "skyView": 0.57,
            "windSpeed": "2.6 m/s",
            "pm25": "58.7 \u00b5g/m\u00b3",
            "ndvi": 0.288,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.1,
                "weight": 38
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Winter": {
        "peakLst": 30.2,
        "meanLst": 18.8,
        "minLst": 8.0,
        "uhiMean": 3.9,
        "uhiMax": 12.0,
        "heatIndexMean": 13.8,
        "wbgtMean": 6.4,
        "hotspotCount": 0,
        "totalRecords": 8145,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.2,
          "buildingDensityPct": 57.4,
          "buildingHeightM": 58.1,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 13.8,
          "humidityPct": 36.9,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 593.7,
          "pm25UgM3": 109.5,
          "populationDensity": 9192
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "MIDC Hingna Industrial",
            "risk": "Very high",
            "score": 90,
            "temp": "30.2\u00b0C",
            "lst": 30.2,
            "uhi": 12.0,
            "heat_index": 17.6,
            "wbgt": 13.1,
            "people": "13,034",
            "peopleNum": 13034,
            "driver": "High industrial roof heat & arid sun",
            "lat": 21.164,
            "lon": 79.082,
            "canopyCover": "0.4%",
            "builtFraction": "79.5%",
            "buildingHeight": "72.0 m",
            "skyView": 0.42,
            "windSpeed": "1.7 m/s",
            "pm25": "128.9 \u00b5g/m\u00b3",
            "ndvi": 0.013,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h2",
            "name": "Itwari Market Wholesale",
            "risk": "Moderate",
            "score": 71,
            "temp": "24.0\u00b0C",
            "lst": 24.0,
            "uhi": 8.8,
            "heat_index": 13.9,
            "wbgt": 7.3,
            "people": "12,646",
            "peopleNum": 12646,
            "driver": "Dense masonry & zero vegetation",
            "lat": 21.132,
            "lon": 79.09,
            "canopyCover": "20.9%",
            "builtFraction": "85.4%",
            "buildingHeight": "68.8 m",
            "skyView": 0.51,
            "windSpeed": "2.8 m/s",
            "pm25": "83.9 \u00b5g/m\u00b3",
            "ndvi": 0.257,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Sitabuldi Main Market",
            "risk": "Moderate",
            "score": 67,
            "temp": "22.8\u00b0C",
            "lst": 22.8,
            "uhi": 8.2,
            "heat_index": 13.3,
            "wbgt": 5.1,
            "people": "13,235",
            "peopleNum": 13235,
            "driver": "Traffic congestion & asphalt radiation",
            "lat": 21.162,
            "lon": 79.103,
            "canopyCover": "20.6%",
            "builtFraction": "73.9%",
            "buildingHeight": "60.4 m",
            "skyView": 0.49,
            "windSpeed": "2.1 m/s",
            "pm25": "124.4 \u00b5g/m\u00b3",
            "ndvi": 0.25,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Gandhibagh Center",
            "risk": "Moderate",
            "score": 65,
            "temp": "22.0\u00b0C",
            "lst": 22.0,
            "uhi": 6.7,
            "heat_index": 11.7,
            "wbgt": 5.0,
            "people": "11,280",
            "peopleNum": 11280,
            "driver": "High population density & low sky view",
            "lat": 21.118,
            "lon": 79.083,
            "canopyCover": "15.2%",
            "builtFraction": "75.5%",
            "buildingHeight": "59.3 m",
            "skyView": 0.55,
            "windSpeed": "1.9 m/s",
            "pm25": "120.5 \u00b5g/m\u00b3",
            "ndvi": 0.135,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Mahal Heritage Ward",
            "risk": "Moderate",
            "score": 65,
            "temp": "21.3\u00b0C",
            "lst": 21.3,
            "uhi": 6.0,
            "heat_index": 13.0,
            "wbgt": 5.6,
            "people": "8,616",
            "peopleNum": 8616,
            "driver": "Dense brick thermal storage",
            "lat": 21.1,
            "lon": 79.117,
            "canopyCover": "12.9%",
            "builtFraction": "76.6%",
            "buildingHeight": "54.7 m",
            "skyView": 0.57,
            "windSpeed": "2.3 m/s",
            "pm25": "136.5 \u00b5g/m\u00b3",
            "ndvi": 0.192,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Wardha Road Multi-Modal",
            "risk": "Moderate",
            "score": 65,
            "temp": "20.8\u00b0C",
            "lst": 20.8,
            "uhi": 5.8,
            "heat_index": 11.0,
            "wbgt": 5.0,
            "people": "12,751",
            "peopleNum": 12751,
            "driver": "Wide concrete flyovers & low shade",
            "lat": 21.188,
            "lon": 79.083,
            "canopyCover": "15.7%",
            "builtFraction": "81.9%",
            "buildingHeight": "85.4 m",
            "skyView": 0.3,
            "windSpeed": "2.9 m/s",
            "pm25": "132.0 \u00b5g/m\u00b3",
            "ndvi": 0.151,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h7",
            "name": "Kalamna Grain Market",
            "risk": "Moderate",
            "score": 65,
            "temp": "20.2\u00b0C",
            "lst": 20.2,
            "uhi": 4.9,
            "heat_index": 15.7,
            "wbgt": 8.6,
            "people": "5,959",
            "peopleNum": 5959,
            "driver": "Exposed tin sheds & high thermal emissivity",
            "lat": 21.026,
            "lon": 79.136,
            "canopyCover": "25.3%",
            "builtFraction": "67.8%",
            "buildingHeight": "56.1 m",
            "skyView": 0.51,
            "windSpeed": "2.8 m/s",
            "pm25": "142.4 \u00b5g/m\u00b3",
            "ndvi": 0.284,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h8",
            "name": "Pardi Flyover Junction",
            "risk": "Moderate",
            "score": 65,
            "temp": "19.6\u00b0C",
            "lst": 19.6,
            "uhi": 4.9,
            "heat_index": 15.2,
            "wbgt": 7.7,
            "people": "9,988",
            "peopleNum": 9988,
            "driver": "Heavy commercial vehicle corridor",
            "lat": 21.174,
            "lon": 79.145,
            "canopyCover": "26.0%",
            "builtFraction": "57.1%",
            "buildingHeight": "69.6 m",
            "skyView": 0.45,
            "windSpeed": "2.8 m/s",
            "pm25": "103.8 \u00b5g/m\u00b3",
            "ndvi": 0.221,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      }
    }
  },
  "Surat": {
    "name": "Surat",
    "state": "Gujarat",
    "climateZone": "Tropical Wet Dry",
    "elevationM": 13.041,
    "distanceToCoastKm": 20.0,
    "center": {
      "lat": 21.170559217054034,
      "lon": 72.8309943473947
    },
    "bounds": {
      "minLat": 20.96,
      "maxLat": 21.361,
      "minLon": 72.652,
      "maxLon": 73.016
    },
    "seasons": {
      "Summer": {
        "peakLst": 51.0,
        "meanLst": 39.5,
        "minLst": 25.2,
        "uhiMean": 6.4,
        "uhiMax": 12.0,
        "heatIndexMean": 36.0,
        "wbgtMean": 31.3,
        "hotspotCount": 3077,
        "totalRecords": 8416,
        "hotspotPct": 36.6,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.5,
          "imperviousPct": 59.3,
          "buildingDensityPct": 57.5,
          "buildingHeightM": 58.0,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 34.5,
          "humidityPct": 70.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 666.1,
          "pm25UgM3": 70.9,
          "populationDensity": 17243
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Pandesara GIDC",
            "risk": "Very high",
            "score": 99,
            "temp": "51.0\u00b0C",
            "lst": 51.0,
            "uhi": 12.0,
            "heat_index": 42.7,
            "wbgt": 36.7,
            "people": "20,588",
            "peopleNum": 20588,
            "driver": "Dyeing/textile sheds & high humidity trap",
            "lat": 21.152,
            "lon": 72.902,
            "canopyCover": "8.9%",
            "builtFraction": "74.5%",
            "buildingHeight": "65.5 m",
            "skyView": 0.46,
            "windSpeed": "2.9 m/s",
            "pm25": "89.0 \u00b5g/m\u00b3",
            "ndvi": 0.12,
            "albedo": 0.27,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Ring Road Textile Market",
            "risk": "Very high",
            "score": 99,
            "temp": "44.8\u00b0C",
            "lst": 44.8,
            "uhi": 12.0,
            "heat_index": 34.3,
            "wbgt": 31.8,
            "people": "21,846",
            "peopleNum": 21846,
            "driver": "Massive multi-storey concrete complexes",
            "lat": 21.137,
            "lon": 72.839,
            "canopyCover": "0.6%",
            "builtFraction": "87.0%",
            "buildingHeight": "76.0 m",
            "skyView": 0.34,
            "windSpeed": "3.3 m/s",
            "pm25": "101.5 \u00b5g/m\u00b3",
            "ndvi": 0.016,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h3",
            "name": "Katargam Diamond Cluster",
            "risk": "Very high",
            "score": 99,
            "temp": "43.6\u00b0C",
            "lst": 43.6,
            "uhi": 10.1,
            "heat_index": 38.2,
            "wbgt": 33.3,
            "people": "21,385",
            "peopleNum": 21385,
            "driver": "Dense high-rise workshops & low canopy",
            "lat": 21.187,
            "lon": 72.847,
            "canopyCover": "21.1%",
            "builtFraction": "77.5%",
            "buildingHeight": "46.5 m",
            "skyView": 0.53,
            "windSpeed": "3.8 m/s",
            "pm25": "77.3 \u00b5g/m\u00b3",
            "ndvi": 0.219,
            "albedo": 0.28,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Sachin GIDC Industrial",
            "risk": "Very high",
            "score": 99,
            "temp": "42.7\u00b0C",
            "lst": 42.7,
            "uhi": 9.1,
            "heat_index": 38.4,
            "wbgt": 34.6,
            "people": "24,218",
            "peopleNum": 24218,
            "driver": "Dark asphalt roads & metal roofing",
            "lat": 21.088,
            "lon": 72.785,
            "canopyCover": "8.8%",
            "builtFraction": "65.5%",
            "buildingHeight": "50.1 m",
            "skyView": 0.55,
            "windSpeed": "2.7 m/s",
            "pm25": "83.7 \u00b5g/m\u00b3",
            "ndvi": 0.185,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Varachha Main Road",
            "risk": "Very high",
            "score": 99,
            "temp": "42.0\u00b0C",
            "lst": 42.0,
            "uhi": 9.5,
            "heat_index": 36.5,
            "wbgt": 33.0,
            "people": "20,704",
            "peopleNum": 20704,
            "driver": "Extremely high residential density",
            "lat": 21.188,
            "lon": 72.819,
            "canopyCover": "10.4%",
            "builtFraction": "65.6%",
            "buildingHeight": "65.0 m",
            "skyView": 0.49,
            "windSpeed": "2.0 m/s",
            "pm25": "66.7 \u00b5g/m\u00b3",
            "ndvi": 0.136,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h6",
            "name": "Udhna Industrial Estate",
            "risk": "Very high",
            "score": 99,
            "temp": "41.5\u00b0C",
            "lst": 41.5,
            "uhi": 8.7,
            "heat_index": 33.6,
            "wbgt": 27.0,
            "people": "16,388",
            "peopleNum": 16388,
            "driver": "Low ventilation & high surface emissivity",
            "lat": 21.186,
            "lon": 72.798,
            "canopyCover": "16.9%",
            "builtFraction": "79.0%",
            "buildingHeight": "48.0 m",
            "skyView": 0.47,
            "windSpeed": "2.4 m/s",
            "pm25": "104.9 \u00b5g/m\u00b3",
            "ndvi": 0.211,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Rander Old Town",
            "risk": "Very high",
            "score": 97,
            "temp": "40.9\u00b0C",
            "lst": 40.9,
            "uhi": 7.3,
            "heat_index": 37.4,
            "wbgt": 31.3,
            "people": "10,306",
            "peopleNum": 10306,
            "driver": "Dense coastal settlement & trapped humidity",
            "lat": 21.081,
            "lon": 72.892,
            "canopyCover": "34.0%",
            "builtFraction": "57.4%",
            "buildingHeight": "55.9 m",
            "skyView": 0.54,
            "windSpeed": "3.3 m/s",
            "pm25": "68.6 \u00b5g/m\u00b3",
            "ndvi": 0.276,
            "albedo": 0.17,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Bhatar Commercial Zone",
            "risk": "Very high",
            "score": 95,
            "temp": "40.3\u00b0C",
            "lst": 40.3,
            "uhi": 6.6,
            "heat_index": 37.4,
            "wbgt": 33.6,
            "people": "9,081",
            "peopleNum": 9081,
            "driver": "Paved plazas & vehicular heat",
            "lat": 21.28,
            "lon": 72.752,
            "canopyCover": "33.1%",
            "builtFraction": "54.3%",
            "buildingHeight": "44.9 m",
            "skyView": 0.68,
            "windSpeed": "2.9 m/s",
            "pm25": "40.5 \u00b5g/m\u00b3",
            "ndvi": 0.326,
            "albedo": 0.17,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Monsoon": {
        "peakLst": 46.8,
        "meanLst": 34.3,
        "minLst": 21.4,
        "uhiMean": 6.3,
        "uhiMax": 12.0,
        "heatIndexMean": 31.5,
        "wbgtMean": 29.1,
        "hotspotCount": 252,
        "totalRecords": 11102,
        "hotspotPct": 2.3,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.263,
          "treeCoverPct": 25.3,
          "imperviousPct": 59.2,
          "buildingDensityPct": 57.7,
          "buildingHeightM": 58.0,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 29.9,
          "humidityPct": 87.9,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 516.4,
          "pm25UgM3": 39.1,
          "populationDensity": 17209
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Pandesara GIDC",
            "risk": "Very high",
            "score": 99,
            "temp": "46.8\u00b0C",
            "lst": 46.8,
            "uhi": 12.0,
            "heat_index": 36.1,
            "wbgt": 35.1,
            "people": "28,194",
            "peopleNum": 28194,
            "driver": "Dyeing/textile sheds & high humidity trap",
            "lat": 21.17,
            "lon": 72.856,
            "canopyCover": "10.6%",
            "builtFraction": "90.9%",
            "buildingHeight": "65.8 m",
            "skyView": 0.52,
            "windSpeed": "2.3 m/s",
            "pm25": "55.0 \u00b5g/m\u00b3",
            "ndvi": 0.183,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 2.0,
                "weight": 70
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h2",
            "name": "Ring Road Textile Market",
            "risk": "Very high",
            "score": 99,
            "temp": "39.5\u00b0C",
            "lst": 39.5,
            "uhi": 11.0,
            "heat_index": 33.6,
            "wbgt": 32.2,
            "people": "14,359",
            "peopleNum": 14359,
            "driver": "Massive multi-storey concrete complexes",
            "lat": 21.231,
            "lon": 72.773,
            "canopyCover": "9.5%",
            "builtFraction": "73.1%",
            "buildingHeight": "32.2 m",
            "skyView": 0.59,
            "windSpeed": "2.4 m/s",
            "pm25": "52.8 \u00b5g/m\u00b3",
            "ndvi": 0.126,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Katargam Diamond Cluster",
            "risk": "Very high",
            "score": 99,
            "temp": "38.4\u00b0C",
            "lst": 38.4,
            "uhi": 11.0,
            "heat_index": 32.0,
            "wbgt": 29.4,
            "people": "18,858",
            "peopleNum": 18858,
            "driver": "Dense high-rise workshops & low canopy",
            "lat": 21.149,
            "lon": 72.838,
            "canopyCover": "19.9%",
            "builtFraction": "73.9%",
            "buildingHeight": "71.8 m",
            "skyView": 0.42,
            "windSpeed": "2.4 m/s",
            "pm25": "67.0 \u00b5g/m\u00b3",
            "ndvi": 0.201,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Sachin GIDC Industrial",
            "risk": "Very high",
            "score": 97,
            "temp": "37.5\u00b0C",
            "lst": 37.5,
            "uhi": 9.6,
            "heat_index": 30.3,
            "wbgt": 27.6,
            "people": "19,491",
            "peopleNum": 19491,
            "driver": "Dark asphalt roads & metal roofing",
            "lat": 21.215,
            "lon": 72.785,
            "canopyCover": "4.6%",
            "builtFraction": "71.4%",
            "buildingHeight": "61.0 m",
            "skyView": 0.49,
            "windSpeed": "3.3 m/s",
            "pm25": "47.3 \u00b5g/m\u00b3",
            "ndvi": 0.085,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Varachha Main Road",
            "risk": "Very high",
            "score": 95,
            "temp": "36.9\u00b0C",
            "lst": 36.9,
            "uhi": 9.3,
            "heat_index": 31.2,
            "wbgt": 31.9,
            "people": "27,277",
            "peopleNum": 27277,
            "driver": "Extremely high residential density",
            "lat": 21.131,
            "lon": 72.827,
            "canopyCover": "14.6%",
            "builtFraction": "76.6%",
            "buildingHeight": "55.1 m",
            "skyView": 0.6,
            "windSpeed": "2.3 m/s",
            "pm25": "34.0 \u00b5g/m\u00b3",
            "ndvi": 0.2,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Udhna Industrial Estate",
            "risk": "Very high",
            "score": 91,
            "temp": "36.3\u00b0C",
            "lst": 36.3,
            "uhi": 8.0,
            "heat_index": 33.7,
            "wbgt": 32.5,
            "people": "18,168",
            "peopleNum": 18168,
            "driver": "Low ventilation & high surface emissivity",
            "lat": 21.179,
            "lon": 72.792,
            "canopyCover": "20.5%",
            "builtFraction": "74.6%",
            "buildingHeight": "48.1 m",
            "skyView": 0.54,
            "windSpeed": "3.1 m/s",
            "pm25": "27.6 \u00b5g/m\u00b3",
            "ndvi": 0.2,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Rander Old Town",
            "risk": "Very high",
            "score": 89,
            "temp": "35.7\u00b0C",
            "lst": 35.7,
            "uhi": 7.5,
            "heat_index": 31.1,
            "wbgt": 30.7,
            "people": "16,381",
            "peopleNum": 16381,
            "driver": "Dense coastal settlement & trapped humidity",
            "lat": 21.174,
            "lon": 72.856,
            "canopyCover": "17.1%",
            "builtFraction": "72.9%",
            "buildingHeight": "86.9 m",
            "skyView": 0.38,
            "windSpeed": "2.8 m/s",
            "pm25": "49.7 \u00b5g/m\u00b3",
            "ndvi": 0.211,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Bhatar Commercial Zone",
            "risk": "High",
            "score": 83,
            "temp": "35.1\u00b0C",
            "lst": 35.1,
            "uhi": 5.9,
            "heat_index": 32.3,
            "wbgt": 29.9,
            "people": "15,716",
            "peopleNum": 15716,
            "driver": "Paved plazas & vehicular heat",
            "lat": 21.258,
            "lon": 72.869,
            "canopyCover": "24.0%",
            "builtFraction": "58.7%",
            "buildingHeight": "64.2 m",
            "skyView": 0.49,
            "windSpeed": "6.0 m/s",
            "pm25": "13.2 \u00b5g/m\u00b3",
            "ndvi": 0.228,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Post_Monsoon": {
        "peakLst": 39.0,
        "meanLst": 28.3,
        "minLst": 14.8,
        "uhiMean": 4.8,
        "uhiMax": 12.0,
        "heatIndexMean": 23.9,
        "wbgtMean": 20.3,
        "hotspotCount": 0,
        "totalRecords": 5500,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.262,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.3,
          "buildingDensityPct": 57.4,
          "buildingHeightM": 58.1,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 23.5,
          "humidityPct": 70.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 605.5,
          "pm25UgM3": 70.7,
          "populationDensity": 17199
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Pandesara GIDC",
            "risk": "Very high",
            "score": 99,
            "temp": "39.0\u00b0C",
            "lst": 39.0,
            "uhi": 12.0,
            "heat_index": 28.1,
            "wbgt": 26.3,
            "people": "21,467",
            "peopleNum": 21467,
            "driver": "Dyeing/textile sheds & high humidity trap",
            "lat": 21.154,
            "lon": 72.863,
            "canopyCover": "15.2%",
            "builtFraction": "82.5%",
            "buildingHeight": "98.9 m",
            "skyView": 0.32,
            "windSpeed": "1.9 m/s",
            "pm25": "115.3 \u00b5g/m\u00b3",
            "ndvi": 0.197,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h2",
            "name": "Ring Road Textile Market",
            "risk": "Very high",
            "score": 89,
            "temp": "33.4\u00b0C",
            "lst": 33.4,
            "uhi": 9.5,
            "heat_index": 23.5,
            "wbgt": 22.1,
            "people": "22,090",
            "peopleNum": 22090,
            "driver": "Massive multi-storey concrete complexes",
            "lat": 21.153,
            "lon": 72.848,
            "canopyCover": "0.0%",
            "builtFraction": "84.1%",
            "buildingHeight": "86.8 m",
            "skyView": 0.33,
            "windSpeed": "1.9 m/s",
            "pm25": "84.9 \u00b5g/m\u00b3",
            "ndvi": 0.042,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h3",
            "name": "Katargam Diamond Cluster",
            "risk": "High",
            "score": 86,
            "temp": "32.2\u00b0C",
            "lst": 32.2,
            "uhi": 9.2,
            "heat_index": 23.2,
            "wbgt": 20.2,
            "people": "18,823",
            "peopleNum": 18823,
            "driver": "Dense high-rise workshops & low canopy",
            "lat": 21.186,
            "lon": 72.906,
            "canopyCover": "20.6%",
            "builtFraction": "74.2%",
            "buildingHeight": "87.2 m",
            "skyView": 0.3,
            "windSpeed": "2.2 m/s",
            "pm25": "86.4 \u00b5g/m\u00b3",
            "ndvi": 0.218,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Sachin GIDC Industrial",
            "risk": "High",
            "score": 80,
            "temp": "31.5\u00b0C",
            "lst": 31.5,
            "uhi": 7.1,
            "heat_index": 24.7,
            "wbgt": 21.0,
            "people": "15,272",
            "peopleNum": 15272,
            "driver": "Dark asphalt roads & metal roofing",
            "lat": 21.222,
            "lon": 72.809,
            "canopyCover": "36.2%",
            "builtFraction": "65.8%",
            "buildingHeight": "57.6 m",
            "skyView": 0.54,
            "windSpeed": "2.9 m/s",
            "pm25": "46.8 \u00b5g/m\u00b3",
            "ndvi": 0.402,
            "albedo": 0.15,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": -0.0,
                "weight": 0
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.4,
                "weight": 14
              }
            ]
          },
          {
            "id": "h5",
            "name": "Varachha Main Road",
            "risk": "High",
            "score": 77,
            "temp": "30.9\u00b0C",
            "lst": 30.9,
            "uhi": 6.3,
            "heat_index": 26.2,
            "wbgt": 22.7,
            "people": "23,308",
            "peopleNum": 23308,
            "driver": "Extremely high residential density",
            "lat": 21.206,
            "lon": 72.828,
            "canopyCover": "18.8%",
            "builtFraction": "50.6%",
            "buildingHeight": "54.7 m",
            "skyView": 0.6,
            "windSpeed": "2.1 m/s",
            "pm25": "76.0 \u00b5g/m\u00b3",
            "ndvi": 0.208,
            "albedo": 0.16,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.1,
                "weight": 38
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Udhna Industrial Estate",
            "risk": "High",
            "score": 78,
            "temp": "30.2\u00b0C",
            "lst": 30.2,
            "uhi": 7.2,
            "heat_index": 25.9,
            "wbgt": 22.2,
            "people": "22,769",
            "peopleNum": 22769,
            "driver": "Low ventilation & high surface emissivity",
            "lat": 21.1,
            "lon": 72.835,
            "canopyCover": "7.7%",
            "builtFraction": "59.4%",
            "buildingHeight": "59.4 m",
            "skyView": 0.47,
            "windSpeed": "4.1 m/s",
            "pm25": "61.5 \u00b5g/m\u00b3",
            "ndvi": 0.031,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h7",
            "name": "Rander Old Town",
            "risk": "Moderate",
            "score": 74,
            "temp": "29.7\u00b0C",
            "lst": 29.7,
            "uhi": 6.0,
            "heat_index": 23.0,
            "wbgt": 21.3,
            "people": "22,287",
            "peopleNum": 22287,
            "driver": "Dense coastal settlement & trapped humidity",
            "lat": 21.159,
            "lon": 72.851,
            "canopyCover": "4.5%",
            "builtFraction": "77.5%",
            "buildingHeight": "72.1 m",
            "skyView": 0.44,
            "windSpeed": "2.3 m/s",
            "pm25": "79.3 \u00b5g/m\u00b3",
            "ndvi": 0.021,
            "albedo": 0.28,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.9,
                "weight": 27
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h8",
            "name": "Bhatar Commercial Zone",
            "risk": "Moderate",
            "score": 72,
            "temp": "29.2\u00b0C",
            "lst": 29.2,
            "uhi": 5.5,
            "heat_index": 24.8,
            "wbgt": 22.3,
            "people": "12,343",
            "peopleNum": 12343,
            "driver": "Paved plazas & vehicular heat",
            "lat": 21.097,
            "lon": 72.843,
            "canopyCover": "33.1%",
            "builtFraction": "58.0%",
            "buildingHeight": "64.1 m",
            "skyView": 0.5,
            "windSpeed": "3.3 m/s",
            "pm25": "57.4 \u00b5g/m\u00b3",
            "ndvi": 0.372,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Winter": {
        "peakLst": 34.6,
        "meanLst": 23.4,
        "minLst": 10.0,
        "uhiMean": 4.4,
        "uhiMax": 12.0,
        "heatIndexMean": 18.8,
        "wbgtMean": 14.4,
        "hotspotCount": 0,
        "totalRecords": 8241,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.266,
          "treeCoverPct": 25.6,
          "imperviousPct": 59.0,
          "buildingDensityPct": 57.0,
          "buildingHeightM": 57.9,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 18.7,
          "humidityPct": 62.1,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 592.3,
          "pm25UgM3": 112.7,
          "populationDensity": 17123
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Pandesara GIDC",
            "risk": "Very high",
            "score": 98,
            "temp": "34.6\u00b0C",
            "lst": 34.6,
            "uhi": 12.0,
            "heat_index": 25.1,
            "wbgt": 20.4,
            "people": "29,469",
            "peopleNum": 29469,
            "driver": "Dyeing/textile sheds & high humidity trap",
            "lat": 21.181,
            "lon": 72.806,
            "canopyCover": "17.9%",
            "builtFraction": "73.5%",
            "buildingHeight": "85.8 m",
            "skyView": 0.26,
            "windSpeed": "2.1 m/s",
            "pm25": "180.4 \u00b5g/m\u00b3",
            "ndvi": 0.187,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h2",
            "name": "Ring Road Textile Market",
            "risk": "High",
            "score": 79,
            "temp": "28.6\u00b0C",
            "lst": 28.6,
            "uhi": 9.0,
            "heat_index": 19.8,
            "wbgt": 15.6,
            "people": "23,223",
            "peopleNum": 23223,
            "driver": "Massive multi-storey concrete complexes",
            "lat": 21.174,
            "lon": 72.831,
            "canopyCover": "12.5%",
            "builtFraction": "81.1%",
            "buildingHeight": "75.8 m",
            "skyView": 0.42,
            "windSpeed": "3.1 m/s",
            "pm25": "126.5 \u00b5g/m\u00b3",
            "ndvi": 0.146,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Katargam Diamond Cluster",
            "risk": "High",
            "score": 75,
            "temp": "27.4\u00b0C",
            "lst": 27.4,
            "uhi": 8.2,
            "heat_index": 23.8,
            "wbgt": 18.6,
            "people": "20,190",
            "peopleNum": 20190,
            "driver": "Dense high-rise workshops & low canopy",
            "lat": 21.131,
            "lon": 72.83,
            "canopyCover": "30.4%",
            "builtFraction": "67.2%",
            "buildingHeight": "67.5 m",
            "skyView": 0.47,
            "windSpeed": "2.2 m/s",
            "pm25": "80.1 \u00b5g/m\u00b3",
            "ndvi": 0.279,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h4",
            "name": "Sachin GIDC Industrial",
            "risk": "Moderate",
            "score": 70,
            "temp": "26.6\u00b0C",
            "lst": 26.6,
            "uhi": 6.8,
            "heat_index": 19.2,
            "wbgt": 16.1,
            "people": "17,153",
            "peopleNum": 17153,
            "driver": "Dark asphalt roads & metal roofing",
            "lat": 21.172,
            "lon": 72.876,
            "canopyCover": "10.7%",
            "builtFraction": "76.5%",
            "buildingHeight": "71.7 m",
            "skyView": 0.43,
            "windSpeed": "5.1 m/s",
            "pm25": "122.7 \u00b5g/m\u00b3",
            "ndvi": 0.113,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Varachha Main Road",
            "risk": "Moderate",
            "score": 69,
            "temp": "25.9\u00b0C",
            "lst": 25.9,
            "uhi": 6.9,
            "heat_index": 20.1,
            "wbgt": 15.3,
            "people": "30,718",
            "peopleNum": 30718,
            "driver": "Extremely high residential density",
            "lat": 21.157,
            "lon": 72.863,
            "canopyCover": "12.6%",
            "builtFraction": "65.8%",
            "buildingHeight": "76.1 m",
            "skyView": 0.37,
            "windSpeed": "3.8 m/s",
            "pm25": "164.0 \u00b5g/m\u00b3",
            "ndvi": 0.14,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h6",
            "name": "Udhna Industrial Estate",
            "risk": "Moderate",
            "score": 65,
            "temp": "25.3\u00b0C",
            "lst": 25.3,
            "uhi": 5.1,
            "heat_index": 17.5,
            "wbgt": 13.6,
            "people": "22,894",
            "peopleNum": 22894,
            "driver": "Low ventilation & high surface emissivity",
            "lat": 21.154,
            "lon": 72.798,
            "canopyCover": "17.1%",
            "builtFraction": "61.6%",
            "buildingHeight": "70.2 m",
            "skyView": 0.45,
            "windSpeed": "2.7 m/s",
            "pm25": "105.2 \u00b5g/m\u00b3",
            "ndvi": 0.201,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Rander Old Town",
            "risk": "Moderate",
            "score": 65,
            "temp": "24.8\u00b0C",
            "lst": 24.8,
            "uhi": 5.8,
            "heat_index": 18.6,
            "wbgt": 14.6,
            "people": "25,648",
            "peopleNum": 25648,
            "driver": "Dense coastal settlement & trapped humidity",
            "lat": 21.187,
            "lon": 72.865,
            "canopyCover": "19.8%",
            "builtFraction": "70.3%",
            "buildingHeight": "60.4 m",
            "skyView": 0.49,
            "windSpeed": "2.6 m/s",
            "pm25": "122.6 \u00b5g/m\u00b3",
            "ndvi": 0.249,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Bhatar Commercial Zone",
            "risk": "Moderate",
            "score": 65,
            "temp": "24.2\u00b0C",
            "lst": 24.2,
            "uhi": 4.0,
            "heat_index": 15.6,
            "wbgt": 12.4,
            "people": "19,458",
            "peopleNum": 19458,
            "driver": "Paved plazas & vehicular heat",
            "lat": 21.184,
            "lon": 72.827,
            "canopyCover": "24.5%",
            "builtFraction": "79.6%",
            "buildingHeight": "90.2 m",
            "skyView": 0.31,
            "windSpeed": "1.7 m/s",
            "pm25": "127.3 \u00b5g/m\u00b3",
            "ndvi": 0.194,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.5,
                "weight": 14
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      }
    }
  },
  "Bhopal": {
    "name": "Bhopal",
    "state": "Madhya_Pradesh",
    "climateZone": "Semi Arid",
    "elevationM": 526.948,
    "distanceToCoastKm": 650.0,
    "center": {
      "lat": 23.260286347570844,
      "lon": 77.41278850416343
    },
    "bounds": {
      "minLat": 23.075,
      "maxLat": 23.473,
      "minLon": 77.206,
      "maxLon": 77.6
    },
    "seasons": {
      "Summer": {
        "peakLst": 51.6,
        "meanLst": 39.1,
        "minLst": 23.9,
        "uhiMean": 5.2,
        "uhiMax": 12.0,
        "heatIndexMean": 34.3,
        "wbgtMean": 27.9,
        "hotspotCount": 3316,
        "totalRecords": 8585,
        "hotspotPct": 38.6,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.1,
          "buildingDensityPct": 57.4,
          "buildingHeightM": 58.0,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 33.9,
          "humidityPct": 50.1,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 664.4,
          "pm25UgM3": 68.2,
          "populationDensity": 7985
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Govindpura Industrial Area",
            "risk": "Very high",
            "score": 99,
            "temp": "51.6\u00b0C",
            "lst": 51.6,
            "uhi": 12.0,
            "heat_index": 38.9,
            "wbgt": 35.4,
            "people": "10,660",
            "peopleNum": 10660,
            "driver": "Metal sheds & dry rocky ground radiation",
            "lat": 23.284,
            "lon": 77.397,
            "canopyCover": "0.0%",
            "builtFraction": "79.8%",
            "buildingHeight": "82.4 m",
            "skyView": 0.41,
            "windSpeed": "3.4 m/s",
            "pm25": "83.0 \u00b5g/m\u00b3",
            "ndvi": 0.038,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h2",
            "name": "MP Nagar Zone 1",
            "risk": "Very high",
            "score": 99,
            "temp": "44.6\u00b0C",
            "lst": 44.6,
            "uhi": 11.3,
            "heat_index": 36.1,
            "wbgt": 31.0,
            "people": "9,884",
            "peopleNum": 9884,
            "driver": "Commercial concrete density & parked vehicles",
            "lat": 23.193,
            "lon": 77.412,
            "canopyCover": "11.9%",
            "builtFraction": "82.0%",
            "buildingHeight": "77.1 m",
            "skyView": 0.42,
            "windSpeed": "2.0 m/s",
            "pm25": "104.2 \u00b5g/m\u00b3",
            "ndvi": 0.157,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Old City Bada Bagh",
            "risk": "Very high",
            "score": 99,
            "temp": "43.4\u00b0C",
            "lst": 43.4,
            "uhi": 9.2,
            "heat_index": 35.3,
            "wbgt": 29.6,
            "people": "10,721",
            "peopleNum": 10721,
            "driver": "High density brick masonry & narrow roads",
            "lat": 23.188,
            "lon": 77.449,
            "canopyCover": "18.6%",
            "builtFraction": "60.0%",
            "buildingHeight": "46.0 m",
            "skyView": 0.59,
            "windSpeed": "3.3 m/s",
            "pm25": "85.1 \u00b5g/m\u00b3",
            "ndvi": 0.235,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "TT Nagar New Market",
            "risk": "Very high",
            "score": 99,
            "temp": "42.5\u00b0C",
            "lst": 42.5,
            "uhi": 8.8,
            "heat_index": 33.4,
            "wbgt": 28.6,
            "people": "12,039",
            "peopleNum": 12039,
            "driver": "Asphalt parking plazas & low tree shade",
            "lat": 23.209,
            "lon": 77.427,
            "canopyCover": "21.5%",
            "builtFraction": "81.9%",
            "buildingHeight": "69.4 m",
            "skyView": 0.47,
            "windSpeed": "2.5 m/s",
            "pm25": "80.6 \u00b5g/m\u00b3",
            "ndvi": 0.27,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Mandideep Industrial Corridor",
            "risk": "Very high",
            "score": 99,
            "temp": "41.8\u00b0C",
            "lst": 41.8,
            "uhi": 7.2,
            "heat_index": 37.0,
            "wbgt": 30.0,
            "people": "8,003",
            "peopleNum": 8003,
            "driver": "Heavy industrial heat and dry winds",
            "lat": 23.199,
            "lon": 77.4,
            "canopyCover": "31.9%",
            "builtFraction": "75.3%",
            "buildingHeight": "67.0 m",
            "skyView": 0.52,
            "windSpeed": "9.5 m/s",
            "pm25": "45.5 \u00b5g/m\u00b3",
            "ndvi": 0.333,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h6",
            "name": "Bairagarh Main Road",
            "risk": "Very high",
            "score": 97,
            "temp": "41.2\u00b0C",
            "lst": 41.2,
            "uhi": 6.8,
            "heat_index": 37.8,
            "wbgt": 30.4,
            "people": "7,866",
            "peopleNum": 7866,
            "driver": "Linear commercial asphalt corridor",
            "lat": 23.237,
            "lon": 77.458,
            "canopyCover": "15.5%",
            "builtFraction": "60.0%",
            "buildingHeight": "62.5 m",
            "skyView": 0.58,
            "windSpeed": "2.3 m/s",
            "pm25": "82.2 \u00b5g/m\u00b3",
            "ndvi": 0.173,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Hamidia Road Transit",
            "risk": "Very high",
            "score": 94,
            "temp": "40.6\u00b0C",
            "lst": 40.6,
            "uhi": 6.0,
            "heat_index": 34.9,
            "wbgt": 27.8,
            "people": "10,949",
            "peopleNum": 10949,
            "driver": "Bus terminal emissions & paved area",
            "lat": 23.201,
            "lon": 77.414,
            "canopyCover": "25.2%",
            "builtFraction": "64.9%",
            "buildingHeight": "70.1 m",
            "skyView": 0.56,
            "windSpeed": "4.9 m/s",
            "pm25": "78.0 \u00b5g/m\u00b3",
            "ndvi": 0.309,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h8",
            "name": "Kolar Road Commercial",
            "risk": "Very high",
            "score": 93,
            "temp": "40.0\u00b0C",
            "lst": 40.0,
            "uhi": 6.1,
            "heat_index": 35.6,
            "wbgt": 29.1,
            "people": "10,556",
            "peopleNum": 10556,
            "driver": "Rapid concrete development & low green buffer",
            "lat": 23.352,
            "lon": 77.451,
            "canopyCover": "15.8%",
            "builtFraction": "53.1%",
            "buildingHeight": "49.6 m",
            "skyView": 0.46,
            "windSpeed": "6.1 m/s",
            "pm25": "58.9 \u00b5g/m\u00b3",
            "ndvi": 0.175,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Monsoon": {
        "peakLst": 42.4,
        "meanLst": 30.8,
        "minLst": 16.4,
        "uhiMean": 4.9,
        "uhiMax": 12.0,
        "heatIndexMean": 26.8,
        "wbgtMean": 22.6,
        "hotspotCount": 25,
        "totalRecords": 11062,
        "hotspotPct": 0.2,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.266,
          "treeCoverPct": 25.6,
          "imperviousPct": 58.9,
          "buildingDensityPct": 57.2,
          "buildingHeightM": 57.6,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 26.2,
          "humidityPct": 68.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 514.7,
          "pm25UgM3": 37.2,
          "populationDensity": 7954
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Govindpura Industrial Area",
            "risk": "Very high",
            "score": 99,
            "temp": "42.4\u00b0C",
            "lst": 42.4,
            "uhi": 12.0,
            "heat_index": 29.5,
            "wbgt": 25.6,
            "people": "14,347",
            "peopleNum": 14347,
            "driver": "Metal sheds & dry rocky ground radiation",
            "lat": 23.252,
            "lon": 77.429,
            "canopyCover": "8.5%",
            "builtFraction": "79.8%",
            "buildingHeight": "81.1 m",
            "skyView": 0.35,
            "windSpeed": "2.2 m/s",
            "pm25": "64.9 \u00b5g/m\u00b3",
            "ndvi": 0.139,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "MP Nagar Zone 1",
            "risk": "Very high",
            "score": 96,
            "temp": "36.2\u00b0C",
            "lst": 36.2,
            "uhi": 10.3,
            "heat_index": 28.8,
            "wbgt": 24.7,
            "people": "6,112",
            "peopleNum": 6112,
            "driver": "Commercial concrete density & parked vehicles",
            "lat": 23.316,
            "lon": 77.39,
            "canopyCover": "30.2%",
            "builtFraction": "74.3%",
            "buildingHeight": "76.3 m",
            "skyView": 0.46,
            "windSpeed": "5.6 m/s",
            "pm25": "24.8 \u00b5g/m\u00b3",
            "ndvi": 0.207,
            "albedo": 0.27,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Old City Bada Bagh",
            "risk": "Very high",
            "score": 92,
            "temp": "35.0\u00b0C",
            "lst": 35.0,
            "uhi": 9.5,
            "heat_index": 28.0,
            "wbgt": 22.0,
            "people": "9,973",
            "peopleNum": 9973,
            "driver": "High density brick masonry & narrow roads",
            "lat": 23.21,
            "lon": 77.398,
            "canopyCover": "30.3%",
            "builtFraction": "70.9%",
            "buildingHeight": "69.5 m",
            "skyView": 0.45,
            "windSpeed": "2.4 m/s",
            "pm25": "44.9 \u00b5g/m\u00b3",
            "ndvi": 0.269,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "TT Nagar New Market",
            "risk": "Very high",
            "score": 88,
            "temp": "34.1\u00b0C",
            "lst": 34.1,
            "uhi": 8.4,
            "heat_index": 29.6,
            "wbgt": 25.5,
            "people": "9,592",
            "peopleNum": 9592,
            "driver": "Asphalt parking plazas & low tree shade",
            "lat": 23.191,
            "lon": 77.431,
            "canopyCover": "28.5%",
            "builtFraction": "59.7%",
            "buildingHeight": "57.5 m",
            "skyView": 0.6,
            "windSpeed": "3.4 m/s",
            "pm25": "29.4 \u00b5g/m\u00b3",
            "ndvi": 0.301,
            "albedo": 0.17,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h5",
            "name": "Mandideep Industrial Corridor",
            "risk": "High",
            "score": 86,
            "temp": "33.4\u00b0C",
            "lst": 33.4,
            "uhi": 8.1,
            "heat_index": 26.8,
            "wbgt": 22.4,
            "people": "9,304",
            "peopleNum": 9304,
            "driver": "Heavy industrial heat and dry winds",
            "lat": 23.314,
            "lon": 77.395,
            "canopyCover": "19.0%",
            "builtFraction": "66.1%",
            "buildingHeight": "75.0 m",
            "skyView": 0.43,
            "windSpeed": "2.7 m/s",
            "pm25": "43.2 \u00b5g/m\u00b3",
            "ndvi": 0.194,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Bairagarh Main Road",
            "risk": "High",
            "score": 83,
            "temp": "32.8\u00b0C",
            "lst": 32.8,
            "uhi": 7.3,
            "heat_index": 27.9,
            "wbgt": 22.9,
            "people": "8,619",
            "peopleNum": 8619,
            "driver": "Linear commercial asphalt corridor",
            "lat": 23.354,
            "lon": 77.385,
            "canopyCover": "27.5%",
            "builtFraction": "57.8%",
            "buildingHeight": "40.2 m",
            "skyView": 0.63,
            "windSpeed": "3.7 m/s",
            "pm25": "31.1 \u00b5g/m\u00b3",
            "ndvi": 0.176,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Hamidia Road Transit",
            "risk": "High",
            "score": 80,
            "temp": "32.2\u00b0C",
            "lst": 32.2,
            "uhi": 6.6,
            "heat_index": 25.7,
            "wbgt": 21.3,
            "people": "9,049",
            "peopleNum": 9049,
            "driver": "Bus terminal emissions & paved area",
            "lat": 23.212,
            "lon": 77.444,
            "canopyCover": "19.9%",
            "builtFraction": "59.1%",
            "buildingHeight": "65.7 m",
            "skyView": 0.39,
            "windSpeed": "3.0 m/s",
            "pm25": "32.8 \u00b5g/m\u00b3",
            "ndvi": 0.273,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Kolar Road Commercial",
            "risk": "High",
            "score": 80,
            "temp": "31.6\u00b0C",
            "lst": 31.6,
            "uhi": 6.9,
            "heat_index": 30.5,
            "wbgt": 26.2,
            "people": "6,057",
            "peopleNum": 6057,
            "driver": "Rapid concrete development & low green buffer",
            "lat": 23.231,
            "lon": 77.382,
            "canopyCover": "30.1%",
            "builtFraction": "57.8%",
            "buildingHeight": "62.0 m",
            "skyView": 0.52,
            "windSpeed": "3.5 m/s",
            "pm25": "37.9 \u00b5g/m\u00b3",
            "ndvi": 0.26,
            "albedo": 0.17,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Post_Monsoon": {
        "peakLst": 33.8,
        "meanLst": 22.9,
        "minLst": 11.5,
        "uhiMean": 3.5,
        "uhiMax": 12.0,
        "heatIndexMean": 17.8,
        "wbgtMean": 11.8,
        "hotspotCount": 0,
        "totalRecords": 5506,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.262,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.2,
          "buildingDensityPct": 57.4,
          "buildingHeightM": 57.7,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 17.8,
          "humidityPct": 50.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 604.3,
          "pm25UgM3": 67.9,
          "populationDensity": 7967
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Govindpura Industrial Area",
            "risk": "Very high",
            "score": 96,
            "temp": "33.8\u00b0C",
            "lst": 33.8,
            "uhi": 12.0,
            "heat_index": 19.9,
            "wbgt": 17.6,
            "people": "11,026",
            "peopleNum": 11026,
            "driver": "Metal sheds & dry rocky ground radiation",
            "lat": 23.24,
            "lon": 77.423,
            "canopyCover": "11.6%",
            "builtFraction": "87.5%",
            "buildingHeight": "68.9 m",
            "skyView": 0.48,
            "windSpeed": "1.7 m/s",
            "pm25": "128.5 \u00b5g/m\u00b3",
            "ndvi": 0.145,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "MP Nagar Zone 1",
            "risk": "High",
            "score": 77,
            "temp": "28.0\u00b0C",
            "lst": 28.0,
            "uhi": 8.6,
            "heat_index": 20.3,
            "wbgt": 14.0,
            "people": "5,882",
            "peopleNum": 5882,
            "driver": "Commercial concrete density & parked vehicles",
            "lat": 23.371,
            "lon": 77.436,
            "canopyCover": "16.1%",
            "builtFraction": "61.6%",
            "buildingHeight": "46.0 m",
            "skyView": 0.54,
            "windSpeed": "2.9 m/s",
            "pm25": "74.6 \u00b5g/m\u00b3",
            "ndvi": 0.245,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Old City Bada Bagh",
            "risk": "Moderate",
            "score": 72,
            "temp": "26.8\u00b0C",
            "lst": 26.8,
            "uhi": 7.4,
            "heat_index": 17.5,
            "wbgt": 13.6,
            "people": "11,717",
            "peopleNum": 11717,
            "driver": "High density brick masonry & narrow roads",
            "lat": 23.264,
            "lon": 77.417,
            "canopyCover": "13.3%",
            "builtFraction": "75.9%",
            "buildingHeight": "70.3 m",
            "skyView": 0.42,
            "windSpeed": "1.9 m/s",
            "pm25": "70.2 \u00b5g/m\u00b3",
            "ndvi": 0.116,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h4",
            "name": "TT Nagar New Market",
            "risk": "Moderate",
            "score": 68,
            "temp": "26.0\u00b0C",
            "lst": 26.0,
            "uhi": 6.1,
            "heat_index": 20.1,
            "wbgt": 13.2,
            "people": "9,774",
            "peopleNum": 9774,
            "driver": "Asphalt parking plazas & low tree shade",
            "lat": 23.352,
            "lon": 77.367,
            "canopyCover": "25.5%",
            "builtFraction": "71.0%",
            "buildingHeight": "52.9 m",
            "skyView": 0.59,
            "windSpeed": "3.3 m/s",
            "pm25": "97.4 \u00b5g/m\u00b3",
            "ndvi": 0.296,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h5",
            "name": "Mandideep Industrial Corridor",
            "risk": "Moderate",
            "score": 68,
            "temp": "25.3\u00b0C",
            "lst": 25.3,
            "uhi": 6.8,
            "heat_index": 19.9,
            "wbgt": 12.6,
            "people": "4,610",
            "peopleNum": 4610,
            "driver": "Heavy industrial heat and dry winds",
            "lat": 23.296,
            "lon": 77.334,
            "canopyCover": "24.4%",
            "builtFraction": "59.5%",
            "buildingHeight": "58.7 m",
            "skyView": 0.53,
            "windSpeed": "2.6 m/s",
            "pm25": "77.5 \u00b5g/m\u00b3",
            "ndvi": 0.297,
            "albedo": 0.17,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h6",
            "name": "Bairagarh Main Road",
            "risk": "Moderate",
            "score": 65,
            "temp": "24.7\u00b0C",
            "lst": 24.7,
            "uhi": 4.9,
            "heat_index": 19.2,
            "wbgt": 11.8,
            "people": "9,365",
            "peopleNum": 9365,
            "driver": "Linear commercial asphalt corridor",
            "lat": 23.382,
            "lon": 77.406,
            "canopyCover": "24.1%",
            "builtFraction": "58.3%",
            "buildingHeight": "58.5 m",
            "skyView": 0.59,
            "windSpeed": "3.1 m/s",
            "pm25": "84.4 \u00b5g/m\u00b3",
            "ndvi": 0.227,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Hamidia Road Transit",
            "risk": "Moderate",
            "score": 65,
            "temp": "24.2\u00b0C",
            "lst": 24.2,
            "uhi": 5.1,
            "heat_index": 17.1,
            "wbgt": 11.8,
            "people": "10,683",
            "peopleNum": 10683,
            "driver": "Bus terminal emissions & paved area",
            "lat": 23.242,
            "lon": 77.393,
            "canopyCover": "13.2%",
            "builtFraction": "61.5%",
            "buildingHeight": "52.1 m",
            "skyView": 0.62,
            "windSpeed": "5.0 m/s",
            "pm25": "74.6 \u00b5g/m\u00b3",
            "ndvi": 0.14,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h8",
            "name": "Kolar Road Commercial",
            "risk": "Moderate",
            "score": 65,
            "temp": "23.7\u00b0C",
            "lst": 23.7,
            "uhi": 4.0,
            "heat_index": 18.5,
            "wbgt": 12.6,
            "people": "8,348",
            "peopleNum": 8348,
            "driver": "Rapid concrete development & low green buffer",
            "lat": 23.308,
            "lon": 77.456,
            "canopyCover": "29.9%",
            "builtFraction": "56.0%",
            "buildingHeight": "64.6 m",
            "skyView": 0.51,
            "windSpeed": "2.7 m/s",
            "pm25": "71.2 \u00b5g/m\u00b3",
            "ndvi": 0.295,
            "albedo": 0.16,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Winter": {
        "peakLst": 28.2,
        "meanLst": 16.1,
        "minLst": 8.0,
        "uhiMean": 3.2,
        "uhiMax": 12.0,
        "heatIndexMean": 11.0,
        "wbgtMean": 5.4,
        "hotspotCount": 0,
        "totalRecords": 8233,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.263,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.2,
          "buildingDensityPct": 57.3,
          "buildingHeightM": 57.9,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 11.0,
          "humidityPct": 42.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 591.8,
          "pm25UgM3": 108.9,
          "populationDensity": 7978
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Govindpura Industrial Area",
            "risk": "High",
            "score": 86,
            "temp": "28.2\u00b0C",
            "lst": 28.2,
            "uhi": 12.0,
            "heat_index": 17.0,
            "wbgt": 11.5,
            "people": "9,869",
            "peopleNum": 9869,
            "driver": "Metal sheds & dry rocky ground radiation",
            "lat": 23.283,
            "lon": 77.406,
            "canopyCover": "6.4%",
            "builtFraction": "84.1%",
            "buildingHeight": "78.7 m",
            "skyView": 0.32,
            "windSpeed": "3.0 m/s",
            "pm25": "139.8 \u00b5g/m\u00b3",
            "ndvi": 0.082,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "MP Nagar Zone 1",
            "risk": "Moderate",
            "score": 65,
            "temp": "21.2\u00b0C",
            "lst": 21.2,
            "uhi": 8.3,
            "heat_index": 12.3,
            "wbgt": 7.9,
            "people": "13,206",
            "peopleNum": 13206,
            "driver": "Commercial concrete density & parked vehicles",
            "lat": 23.205,
            "lon": 77.392,
            "canopyCover": "19.8%",
            "builtFraction": "70.3%",
            "buildingHeight": "62.4 m",
            "skyView": 0.37,
            "windSpeed": "2.0 m/s",
            "pm25": "100.3 \u00b5g/m\u00b3",
            "ndvi": 0.253,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Old City Bada Bagh",
            "risk": "Moderate",
            "score": 65,
            "temp": "20.0\u00b0C",
            "lst": 20.0,
            "uhi": 7.4,
            "heat_index": 11.9,
            "wbgt": 5.0,
            "people": "11,090",
            "peopleNum": 11090,
            "driver": "High density brick masonry & narrow roads",
            "lat": 23.203,
            "lon": 77.405,
            "canopyCover": "20.8%",
            "builtFraction": "64.5%",
            "buildingHeight": "56.9 m",
            "skyView": 0.54,
            "windSpeed": "2.5 m/s",
            "pm25": "142.8 \u00b5g/m\u00b3",
            "ndvi": 0.219,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "TT Nagar New Market",
            "risk": "Moderate",
            "score": 65,
            "temp": "19.2\u00b0C",
            "lst": 19.2,
            "uhi": 5.9,
            "heat_index": 10.5,
            "wbgt": 5.0,
            "people": "9,028",
            "peopleNum": 9028,
            "driver": "Asphalt parking plazas & low tree shade",
            "lat": 23.329,
            "lon": 77.416,
            "canopyCover": "9.4%",
            "builtFraction": "63.8%",
            "buildingHeight": "56.2 m",
            "skyView": 0.59,
            "windSpeed": "3.4 m/s",
            "pm25": "89.3 \u00b5g/m\u00b3",
            "ndvi": 0.135,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h5",
            "name": "Mandideep Industrial Corridor",
            "risk": "Moderate",
            "score": 65,
            "temp": "18.5\u00b0C",
            "lst": 18.5,
            "uhi": 5.6,
            "heat_index": 12.1,
            "wbgt": 5.0,
            "people": "16,923",
            "peopleNum": 16923,
            "driver": "Heavy industrial heat and dry winds",
            "lat": 23.265,
            "lon": 77.395,
            "canopyCover": "26.2%",
            "builtFraction": "72.3%",
            "buildingHeight": "80.7 m",
            "skyView": 0.31,
            "windSpeed": "4.5 m/s",
            "pm25": "166.4 \u00b5g/m\u00b3",
            "ndvi": 0.266,
            "albedo": 0.17,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 1.0,
                "weight": 32
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Bairagarh Main Road",
            "risk": "Moderate",
            "score": 65,
            "temp": "17.9\u00b0C",
            "lst": 17.9,
            "uhi": 4.3,
            "heat_index": 13.2,
            "wbgt": 7.5,
            "people": "10,648",
            "peopleNum": 10648,
            "driver": "Linear commercial asphalt corridor",
            "lat": 23.192,
            "lon": 77.449,
            "canopyCover": "27.6%",
            "builtFraction": "56.6%",
            "buildingHeight": "51.7 m",
            "skyView": 0.52,
            "windSpeed": "2.9 m/s",
            "pm25": "85.9 \u00b5g/m\u00b3",
            "ndvi": 0.226,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Hamidia Road Transit",
            "risk": "Moderate",
            "score": 65,
            "temp": "17.4\u00b0C",
            "lst": 17.4,
            "uhi": 4.4,
            "heat_index": 13.4,
            "wbgt": 7.7,
            "people": "5,828",
            "peopleNum": 5828,
            "driver": "Bus terminal emissions & paved area",
            "lat": 23.275,
            "lon": 77.298,
            "canopyCover": "28.5%",
            "builtFraction": "46.6%",
            "buildingHeight": "43.1 m",
            "skyView": 0.71,
            "windSpeed": "3.4 m/s",
            "pm25": "122.5 \u00b5g/m\u00b3",
            "ndvi": 0.231,
            "albedo": 0.17,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.0,
                "weight": 35
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Kolar Road Commercial",
            "risk": "Moderate",
            "score": 65,
            "temp": "16.8\u00b0C",
            "lst": 16.8,
            "uhi": 3.2,
            "heat_index": 10.6,
            "wbgt": 5.0,
            "people": "8,676",
            "peopleNum": 8676,
            "driver": "Rapid concrete development & low green buffer",
            "lat": 23.251,
            "lon": 77.471,
            "canopyCover": "25.3%",
            "builtFraction": "67.5%",
            "buildingHeight": "73.0 m",
            "skyView": 0.44,
            "windSpeed": "2.7 m/s",
            "pm25": "125.9 \u00b5g/m\u00b3",
            "ndvi": 0.228,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      }
    }
  },
  "Indore": {
    "name": "Indore",
    "state": "Madhya_Pradesh",
    "climateZone": "Semi Arid",
    "elevationM": 553.015,
    "distanceToCoastKm": 600.0,
    "center": {
      "lat": 22.71906820093739,
      "lon": 75.85736032327846
    },
    "bounds": {
      "minLat": 22.517,
      "maxLat": 22.936,
      "minLon": 75.666,
      "maxLon": 76.049
    },
    "seasons": {
      "Summer": {
        "peakLst": 48.4,
        "meanLst": 38.1,
        "minLst": 25.0,
        "uhiMean": 5.1,
        "uhiMax": 12.0,
        "heatIndexMean": 33.1,
        "wbgtMean": 26.6,
        "hotspotCount": 3313,
        "totalRecords": 8403,
        "hotspotPct": 39.4,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.263,
          "treeCoverPct": 25.2,
          "imperviousPct": 59.4,
          "buildingDensityPct": 57.7,
          "buildingHeightM": 58.2,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 32.8,
          "humidityPct": 48.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 664.0,
          "pm25UgM3": 69.0,
          "populationDensity": 9861
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Sanwer Road Industrial Sector",
            "risk": "Very high",
            "score": 99,
            "temp": "48.4\u00b0C",
            "lst": 48.4,
            "uhi": 12.0,
            "heat_index": 37.8,
            "wbgt": 31.7,
            "people": "12,537",
            "peopleNum": 12537,
            "driver": "Dense manufacturing sheds & asphalt",
            "lat": 22.708,
            "lon": 75.839,
            "canopyCover": "9.3%",
            "builtFraction": "74.9%",
            "buildingHeight": "70.6 m",
            "skyView": 0.46,
            "windSpeed": "1.9 m/s",
            "pm25": "109.1 \u00b5g/m\u00b3",
            "ndvi": 0.111,
            "albedo": 0.17,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Rajwada / Sarafa Market",
            "risk": "Very high",
            "score": 99,
            "temp": "43.2\u00b0C",
            "lst": 43.2,
            "uhi": 10.7,
            "heat_index": 36.0,
            "wbgt": 30.5,
            "people": "12,965",
            "peopleNum": 12965,
            "driver": "High thermal mass & dense pedestrian heat",
            "lat": 22.664,
            "lon": 75.806,
            "canopyCover": "10.0%",
            "builtFraction": "73.3%",
            "buildingHeight": "62.4 m",
            "skyView": 0.5,
            "windSpeed": "3.3 m/s",
            "pm25": "91.8 \u00b5g/m\u00b3",
            "ndvi": 0.262,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Pithampur Sector 1 Link",
            "risk": "Very high",
            "score": 99,
            "temp": "42.1\u00b0C",
            "lst": 42.1,
            "uhi": 9.9,
            "heat_index": 35.8,
            "wbgt": 28.5,
            "people": "10,248",
            "peopleNum": 10248,
            "driver": "Heavy industrial roofs & lack of tree canopy",
            "lat": 22.739,
            "lon": 75.825,
            "canopyCover": "18.4%",
            "builtFraction": "64.4%",
            "buildingHeight": "44.3 m",
            "skyView": 0.63,
            "windSpeed": "5.1 m/s",
            "pm25": "61.1 \u00b5g/m\u00b3",
            "ndvi": 0.166,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h4",
            "name": "Vijay Nagar Scheme 54",
            "risk": "Very high",
            "score": 99,
            "temp": "41.3\u00b0C",
            "lst": 41.3,
            "uhi": 7.6,
            "heat_index": 37.8,
            "wbgt": 30.6,
            "people": "4,938",
            "peopleNum": 4938,
            "driver": "Commercial glass-concrete & wide roads",
            "lat": 22.758,
            "lon": 75.837,
            "canopyCover": "17.3%",
            "builtFraction": "40.5%",
            "buildingHeight": "34.0 m",
            "skyView": 0.67,
            "windSpeed": "2.5 m/s",
            "pm25": "58.8 \u00b5g/m\u00b3",
            "ndvi": 0.295,
            "albedo": 0.14,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 0.9,
                "weight": 31
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h5",
            "name": "Palasia Square",
            "risk": "Very high",
            "score": 98,
            "temp": "40.7\u00b0C",
            "lst": 40.7,
            "uhi": 7.6,
            "heat_index": 34.7,
            "wbgt": 26.6,
            "people": "10,208",
            "peopleNum": 10208,
            "driver": "Multi-arm junction traffic & asphalt radiant heat",
            "lat": 22.673,
            "lon": 75.888,
            "canopyCover": "30.3%",
            "builtFraction": "52.5%",
            "buildingHeight": "58.4 m",
            "skyView": 0.55,
            "windSpeed": "2.4 m/s",
            "pm25": "54.0 \u00b5g/m\u00b3",
            "ndvi": 0.274,
            "albedo": 0.12,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Sapna Sangeeta Road",
            "risk": "Very high",
            "score": 97,
            "temp": "40.1\u00b0C",
            "lst": 40.1,
            "uhi": 7.7,
            "heat_index": 34.8,
            "wbgt": 28.8,
            "people": "12,291",
            "peopleNum": 12291,
            "driver": "High commercial frontage & AC heat rejection",
            "lat": 22.782,
            "lon": 75.798,
            "canopyCover": "6.2%",
            "builtFraction": "55.2%",
            "buildingHeight": "43.7 m",
            "skyView": 0.56,
            "windSpeed": "3.8 m/s",
            "pm25": "68.8 \u00b5g/m\u00b3",
            "ndvi": 0.055,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h7",
            "name": "Rau Bypass Corridor",
            "risk": "Very high",
            "score": 91,
            "temp": "39.5\u00b0C",
            "lst": 39.5,
            "uhi": 5.9,
            "heat_index": 33.4,
            "wbgt": 26.9,
            "people": "10,380",
            "peopleNum": 10380,
            "driver": "Logistics hub asphalt & low albedo",
            "lat": 22.736,
            "lon": 75.864,
            "canopyCover": "17.3%",
            "builtFraction": "69.0%",
            "buildingHeight": "69.0 m",
            "skyView": 0.43,
            "windSpeed": "1.9 m/s",
            "pm25": "87.5 \u00b5g/m\u00b3",
            "ndvi": 0.131,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h8",
            "name": "Bhawarkua Student Hub",
            "risk": "Very high",
            "score": 92,
            "temp": "38.9\u00b0C",
            "lst": 38.9,
            "uhi": 6.7,
            "heat_index": 31.7,
            "wbgt": 24.6,
            "people": "9,627",
            "peopleNum": 9627,
            "driver": "High building density & low green space",
            "lat": 22.783,
            "lon": 75.893,
            "canopyCover": "24.8%",
            "builtFraction": "58.0%",
            "buildingHeight": "51.5 m",
            "skyView": 0.5,
            "windSpeed": "4.0 m/s",
            "pm25": "77.9 \u00b5g/m\u00b3",
            "ndvi": 0.25,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Monsoon": {
        "peakLst": 43.0,
        "meanLst": 29.8,
        "minLst": 16.3,
        "uhiMean": 4.8,
        "uhiMax": 12.0,
        "heatIndexMean": 25.5,
        "wbgtMean": 21.3,
        "hotspotCount": 18,
        "totalRecords": 11314,
        "hotspotPct": 0.2,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.263,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.3,
          "buildingDensityPct": 57.6,
          "buildingHeightM": 58.2,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 25.1,
          "humidityPct": 66.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 516.9,
          "pm25UgM3": 37.8,
          "populationDensity": 9844
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Sanwer Road Industrial Sector",
            "risk": "Very high",
            "score": 99,
            "temp": "43.0\u00b0C",
            "lst": 43.0,
            "uhi": 12.0,
            "heat_index": 30.8,
            "wbgt": 29.6,
            "people": "14,444",
            "peopleNum": 14444,
            "driver": "Dense manufacturing sheds & asphalt",
            "lat": 22.743,
            "lon": 75.843,
            "canopyCover": "0.0%",
            "builtFraction": "87.2%",
            "buildingHeight": "74.0 m",
            "skyView": 0.44,
            "windSpeed": "1.9 m/s",
            "pm25": "42.3 \u00b5g/m\u00b3",
            "ndvi": 0.034,
            "albedo": 0.27,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h2",
            "name": "Rajwada / Sarafa Market",
            "risk": "Very high",
            "score": 94,
            "temp": "35.0\u00b0C",
            "lst": 35.0,
            "uhi": 10.1,
            "heat_index": 28.3,
            "wbgt": 24.7,
            "people": "14,082",
            "peopleNum": 14082,
            "driver": "High thermal mass & dense pedestrian heat",
            "lat": 22.723,
            "lon": 75.854,
            "canopyCover": "28.4%",
            "builtFraction": "71.0%",
            "buildingHeight": "82.6 m",
            "skyView": 0.35,
            "windSpeed": "1.8 m/s",
            "pm25": "40.3 \u00b5g/m\u00b3",
            "ndvi": 0.19,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Pithampur Sector 1 Link",
            "risk": "Very high",
            "score": 88,
            "temp": "33.8\u00b0C",
            "lst": 33.8,
            "uhi": 8.6,
            "heat_index": 28.3,
            "wbgt": 24.1,
            "people": "5,619",
            "peopleNum": 5619,
            "driver": "Heavy industrial roofs & lack of tree canopy",
            "lat": 22.701,
            "lon": 75.91,
            "canopyCover": "22.4%",
            "builtFraction": "57.2%",
            "buildingHeight": "43.1 m",
            "skyView": 0.57,
            "windSpeed": "4.8 m/s",
            "pm25": "40.7 \u00b5g/m\u00b3",
            "ndvi": 0.172,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Vijay Nagar Scheme 54",
            "risk": "High",
            "score": 84,
            "temp": "33.0\u00b0C",
            "lst": 33.0,
            "uhi": 7.5,
            "heat_index": 24.7,
            "wbgt": 22.0,
            "people": "12,397",
            "peopleNum": 12397,
            "driver": "Commercial glass-concrete & wide roads",
            "lat": 22.708,
            "lon": 75.854,
            "canopyCover": "22.8%",
            "builtFraction": "66.0%",
            "buildingHeight": "51.9 m",
            "skyView": 0.58,
            "windSpeed": "2.0 m/s",
            "pm25": "36.7 \u00b5g/m\u00b3",
            "ndvi": 0.21,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Palasia Square",
            "risk": "High",
            "score": 83,
            "temp": "32.3\u00b0C",
            "lst": 32.3,
            "uhi": 7.7,
            "heat_index": 26.3,
            "wbgt": 21.2,
            "people": "7,866",
            "peopleNum": 7866,
            "driver": "Multi-arm junction traffic & asphalt radiant heat",
            "lat": 22.709,
            "lon": 75.896,
            "canopyCover": "32.0%",
            "builtFraction": "66.7%",
            "buildingHeight": "58.4 m",
            "skyView": 0.63,
            "windSpeed": "2.8 m/s",
            "pm25": "25.5 \u00b5g/m\u00b3",
            "ndvi": 0.284,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h6",
            "name": "Sapna Sangeeta Road",
            "risk": "High",
            "score": 78,
            "temp": "31.7\u00b0C",
            "lst": 31.7,
            "uhi": 6.3,
            "heat_index": 24.2,
            "wbgt": 18.8,
            "people": "8,170",
            "peopleNum": 8170,
            "driver": "High commercial frontage & AC heat rejection",
            "lat": 22.692,
            "lon": 75.828,
            "canopyCover": "6.1%",
            "builtFraction": "70.6%",
            "buildingHeight": "66.8 m",
            "skyView": 0.52,
            "windSpeed": "2.5 m/s",
            "pm25": "28.4 \u00b5g/m\u00b3",
            "ndvi": 0.064,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h7",
            "name": "Rau Bypass Corridor",
            "risk": "Moderate",
            "score": 74,
            "temp": "31.2\u00b0C",
            "lst": 31.2,
            "uhi": 4.9,
            "heat_index": 25.2,
            "wbgt": 20.6,
            "people": "15,504",
            "peopleNum": 15504,
            "driver": "Logistics hub asphalt & low albedo",
            "lat": 22.726,
            "lon": 75.879,
            "canopyCover": "16.0%",
            "builtFraction": "63.7%",
            "buildingHeight": "52.1 m",
            "skyView": 0.57,
            "windSpeed": "2.2 m/s",
            "pm25": "29.3 \u00b5g/m\u00b3",
            "ndvi": 0.169,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Bhawarkua Student Hub",
            "risk": "Moderate",
            "score": 74,
            "temp": "30.6\u00b0C",
            "lst": 30.6,
            "uhi": 5.5,
            "heat_index": 25.0,
            "wbgt": 22.0,
            "people": "12,117",
            "peopleNum": 12117,
            "driver": "High building density & low green space",
            "lat": 22.684,
            "lon": 75.815,
            "canopyCover": "19.2%",
            "builtFraction": "61.5%",
            "buildingHeight": "61.0 m",
            "skyView": 0.46,
            "windSpeed": "2.2 m/s",
            "pm25": "43.9 \u00b5g/m\u00b3",
            "ndvi": 0.176,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Post_Monsoon": {
        "peakLst": 32.0,
        "meanLst": 22.3,
        "minLst": 9.2,
        "uhiMean": 3.4,
        "uhiMax": 12.0,
        "heatIndexMean": 17.2,
        "wbgtMean": 11.0,
        "hotspotCount": 0,
        "totalRecords": 5454,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.263,
          "treeCoverPct": 25.3,
          "imperviousPct": 59.3,
          "buildingDensityPct": 57.6,
          "buildingHeightM": 57.9,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 17.2,
          "humidityPct": 48.1,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 607.1,
          "pm25UgM3": 68.9,
          "populationDensity": 9835
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Sanwer Road Industrial Sector",
            "risk": "Very high",
            "score": 93,
            "temp": "32.0\u00b0C",
            "lst": 32.0,
            "uhi": 12.0,
            "heat_index": 22.1,
            "wbgt": 18.7,
            "people": "10,199",
            "peopleNum": 10199,
            "driver": "Dense manufacturing sheds & asphalt",
            "lat": 22.749,
            "lon": 75.855,
            "canopyCover": "0.0%",
            "builtFraction": "81.5%",
            "buildingHeight": "63.8 m",
            "skyView": 0.5,
            "windSpeed": "3.0 m/s",
            "pm25": "106.1 \u00b5g/m\u00b3",
            "ndvi": 0.106,
            "albedo": 0.27,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Rajwada / Sarafa Market",
            "risk": "High",
            "score": 79,
            "temp": "27.5\u00b0C",
            "lst": 27.5,
            "uhi": 9.6,
            "heat_index": 18.3,
            "wbgt": 13.3,
            "people": "16,158",
            "peopleNum": 16158,
            "driver": "High thermal mass & dense pedestrian heat",
            "lat": 22.774,
            "lon": 75.873,
            "canopyCover": "14.8%",
            "builtFraction": "84.0%",
            "buildingHeight": "60.1 m",
            "skyView": 0.39,
            "windSpeed": "2.4 m/s",
            "pm25": "64.7 \u00b5g/m\u00b3",
            "ndvi": 0.175,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Pithampur Sector 1 Link",
            "risk": "Moderate",
            "score": 73,
            "temp": "26.3\u00b0C",
            "lst": 26.3,
            "uhi": 8.0,
            "heat_index": 15.9,
            "wbgt": 9.5,
            "people": "9,945",
            "peopleNum": 9945,
            "driver": "Heavy industrial roofs & lack of tree canopy",
            "lat": 22.698,
            "lon": 75.844,
            "canopyCover": "13.3%",
            "builtFraction": "79.7%",
            "buildingHeight": "83.6 m",
            "skyView": 0.34,
            "windSpeed": "2.3 m/s",
            "pm25": "82.1 \u00b5g/m\u00b3",
            "ndvi": 0.234,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Vijay Nagar Scheme 54",
            "risk": "Moderate",
            "score": 67,
            "temp": "25.6\u00b0C",
            "lst": 25.6,
            "uhi": 6.1,
            "heat_index": 15.3,
            "wbgt": 9.0,
            "people": "15,343",
            "peopleNum": 15343,
            "driver": "Commercial glass-concrete & wide roads",
            "lat": 22.728,
            "lon": 75.897,
            "canopyCover": "23.3%",
            "builtFraction": "81.3%",
            "buildingHeight": "70.6 m",
            "skyView": 0.42,
            "windSpeed": "2.7 m/s",
            "pm25": "84.1 \u00b5g/m\u00b3",
            "ndvi": 0.244,
            "albedo": 0.28,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Palasia Square",
            "risk": "Moderate",
            "score": 65,
            "temp": "24.9\u00b0C",
            "lst": 24.9,
            "uhi": 5.5,
            "heat_index": 15.8,
            "wbgt": 9.7,
            "people": "7,302",
            "peopleNum": 7302,
            "driver": "Multi-arm junction traffic & asphalt radiant heat",
            "lat": 22.709,
            "lon": 75.769,
            "canopyCover": "21.5%",
            "builtFraction": "69.6%",
            "buildingHeight": "64.4 m",
            "skyView": 0.48,
            "windSpeed": "2.7 m/s",
            "pm25": "103.7 \u00b5g/m\u00b3",
            "ndvi": 0.18,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Sapna Sangeeta Road",
            "risk": "Moderate",
            "score": 65,
            "temp": "24.3\u00b0C",
            "lst": 24.3,
            "uhi": 4.5,
            "heat_index": 16.5,
            "wbgt": 9.3,
            "people": "12,282",
            "peopleNum": 12282,
            "driver": "High commercial frontage & AC heat rejection",
            "lat": 22.675,
            "lon": 75.84,
            "canopyCover": "17.6%",
            "builtFraction": "61.7%",
            "buildingHeight": "56.2 m",
            "skyView": 0.66,
            "windSpeed": "4.5 m/s",
            "pm25": "40.3 \u00b5g/m\u00b3",
            "ndvi": 0.202,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Rau Bypass Corridor",
            "risk": "Moderate",
            "score": 65,
            "temp": "23.7\u00b0C",
            "lst": 23.7,
            "uhi": 4.5,
            "heat_index": 17.9,
            "wbgt": 11.2,
            "people": "15,721",
            "peopleNum": 15721,
            "driver": "Logistics hub asphalt & low albedo",
            "lat": 22.717,
            "lon": 75.841,
            "canopyCover": "27.9%",
            "builtFraction": "58.7%",
            "buildingHeight": "61.5 m",
            "skyView": 0.55,
            "windSpeed": "3.4 m/s",
            "pm25": "71.1 \u00b5g/m\u00b3",
            "ndvi": 0.278,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h8",
            "name": "Bhawarkua Student Hub",
            "risk": "Moderate",
            "score": 65,
            "temp": "23.2\u00b0C",
            "lst": 23.2,
            "uhi": 4.1,
            "heat_index": 17.0,
            "wbgt": 7.9,
            "people": "9,622",
            "peopleNum": 9622,
            "driver": "High building density & low green space",
            "lat": 22.756,
            "lon": 75.874,
            "canopyCover": "14.0%",
            "builtFraction": "67.0%",
            "buildingHeight": "87.2 m",
            "skyView": 0.32,
            "windSpeed": "2.3 m/s",
            "pm25": "104.2 \u00b5g/m\u00b3",
            "ndvi": 0.191,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      },
      "Winter": {
        "peakLst": 26.8,
        "meanLst": 16.0,
        "minLst": 8.0,
        "uhiMean": 3.1,
        "uhiMax": 12.0,
        "heatIndexMean": 10.9,
        "wbgtMean": 5.3,
        "hotspotCount": 0,
        "totalRecords": 8113,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.263,
          "treeCoverPct": 25.3,
          "imperviousPct": 59.5,
          "buildingDensityPct": 57.8,
          "buildingHeightM": 58.2,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 10.9,
          "humidityPct": 40.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 593.7,
          "pm25UgM3": 110.2,
          "populationDensity": 9866
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Sanwer Road Industrial Sector",
            "risk": "High",
            "score": 84,
            "temp": "26.8\u00b0C",
            "lst": 26.8,
            "uhi": 12.0,
            "heat_index": 13.3,
            "wbgt": 9.5,
            "people": "15,971",
            "peopleNum": 15971,
            "driver": "Dense manufacturing sheds & asphalt",
            "lat": 22.729,
            "lon": 75.85,
            "canopyCover": "0.0%",
            "builtFraction": "96.5%",
            "buildingHeight": "89.7 m",
            "skyView": 0.33,
            "windSpeed": "2.5 m/s",
            "pm25": "173.3 \u00b5g/m\u00b3",
            "ndvi": 0.05,
            "albedo": 0.28,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 2.1,
                "weight": 73
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 1.0,
                "weight": 32
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h2",
            "name": "Rajwada / Sarafa Market",
            "risk": "Moderate",
            "score": 65,
            "temp": "21.1\u00b0C",
            "lst": 21.1,
            "uhi": 7.8,
            "heat_index": 10.5,
            "wbgt": 5.0,
            "people": "14,936",
            "peopleNum": 14936,
            "driver": "High thermal mass & dense pedestrian heat",
            "lat": 22.729,
            "lon": 75.826,
            "canopyCover": "18.5%",
            "builtFraction": "75.8%",
            "buildingHeight": "77.9 m",
            "skyView": 0.27,
            "windSpeed": "3.3 m/s",
            "pm25": "166.1 \u00b5g/m\u00b3",
            "ndvi": 0.193,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Pithampur Sector 1 Link",
            "risk": "Moderate",
            "score": 65,
            "temp": "20.0\u00b0C",
            "lst": 20.0,
            "uhi": 7.1,
            "heat_index": 11.0,
            "wbgt": 5.1,
            "people": "9,680",
            "peopleNum": 9680,
            "driver": "Heavy industrial roofs & lack of tree canopy",
            "lat": 22.702,
            "lon": 75.801,
            "canopyCover": "14.0%",
            "builtFraction": "71.5%",
            "buildingHeight": "72.7 m",
            "skyView": 0.43,
            "windSpeed": "3.1 m/s",
            "pm25": "120.0 \u00b5g/m\u00b3",
            "ndvi": 0.194,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Vijay Nagar Scheme 54",
            "risk": "Moderate",
            "score": 65,
            "temp": "19.2\u00b0C",
            "lst": 19.2,
            "uhi": 6.0,
            "heat_index": 12.4,
            "wbgt": 6.0,
            "people": "10,340",
            "peopleNum": 10340,
            "driver": "Commercial glass-concrete & wide roads",
            "lat": 22.664,
            "lon": 75.833,
            "canopyCover": "18.1%",
            "builtFraction": "66.0%",
            "buildingHeight": "64.1 m",
            "skyView": 0.48,
            "windSpeed": "3.3 m/s",
            "pm25": "129.0 \u00b5g/m\u00b3",
            "ndvi": 0.256,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Palasia Square",
            "risk": "Moderate",
            "score": 65,
            "temp": "18.5\u00b0C",
            "lst": 18.5,
            "uhi": 6.0,
            "heat_index": 8.6,
            "wbgt": 5.0,
            "people": "10,254",
            "peopleNum": 10254,
            "driver": "Multi-arm junction traffic & asphalt radiant heat",
            "lat": 22.747,
            "lon": 75.829,
            "canopyCover": "6.2%",
            "builtFraction": "89.0%",
            "buildingHeight": "66.4 m",
            "skyView": 0.41,
            "windSpeed": "2.2 m/s",
            "pm25": "174.6 \u00b5g/m\u00b3",
            "ndvi": 0.075,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 2.0,
                "weight": 70
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h6",
            "name": "Sapna Sangeeta Road",
            "risk": "Moderate",
            "score": 65,
            "temp": "17.9\u00b0C",
            "lst": 17.9,
            "uhi": 5.8,
            "heat_index": 10.4,
            "wbgt": 5.0,
            "people": "12,577",
            "peopleNum": 12577,
            "driver": "High commercial frontage & AC heat rejection",
            "lat": 22.679,
            "lon": 75.861,
            "canopyCover": "22.7%",
            "builtFraction": "66.3%",
            "buildingHeight": "56.9 m",
            "skyView": 0.63,
            "windSpeed": "2.5 m/s",
            "pm25": "131.1 \u00b5g/m\u00b3",
            "ndvi": 0.262,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Rau Bypass Corridor",
            "risk": "Moderate",
            "score": 65,
            "temp": "17.4\u00b0C",
            "lst": 17.4,
            "uhi": 4.1,
            "heat_index": 10.8,
            "wbgt": 5.0,
            "people": "12,396",
            "peopleNum": 12396,
            "driver": "Logistics hub asphalt & low albedo",
            "lat": 22.699,
            "lon": 75.9,
            "canopyCover": "19.0%",
            "builtFraction": "74.3%",
            "buildingHeight": "67.4 m",
            "skyView": 0.48,
            "windSpeed": "3.1 m/s",
            "pm25": "92.6 \u00b5g/m\u00b3",
            "ndvi": 0.231,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Bhawarkua Student Hub",
            "risk": "Moderate",
            "score": 65,
            "temp": "16.8\u00b0C",
            "lst": 16.8,
            "uhi": 4.0,
            "heat_index": 6.8,
            "wbgt": 5.0,
            "people": "17,778",
            "peopleNum": 17778,
            "driver": "High building density & low green space",
            "lat": 22.666,
            "lon": 75.834,
            "canopyCover": "25.5%",
            "builtFraction": "74.6%",
            "buildingHeight": "59.5 m",
            "skyView": 0.46,
            "windSpeed": "2.6 m/s",
            "pm25": "99.5 \u00b5g/m\u00b3",
            "ndvi": 0.255,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          }
        ]
      }
    }
  },
  "Chandigarh": {
    "name": "Chandigarh",
    "state": "Chandigarh",
    "climateZone": "Humid Subtropical",
    "elevationM": 321.222,
    "distanceToCoastKm": 850.0,
    "center": {
      "lat": 30.733598339371976,
      "lon": 76.77944257246378
    },
    "bounds": {
      "minLat": 30.544,
      "maxLat": 30.912,
      "minLon": 76.581,
      "maxLon": 76.975
    },
    "seasons": {
      "Summer": {
        "peakLst": 52.8,
        "meanLst": 40.8,
        "minLst": 28.2,
        "uhiMean": 5.8,
        "uhiMax": 12.0,
        "heatIndexMean": 36.3,
        "wbgtMean": 30.3,
        "hotspotCount": 3267,
        "totalRecords": 8296,
        "hotspotPct": 39.4,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.5,
          "imperviousPct": 59.2,
          "buildingDensityPct": 57.5,
          "buildingHeightM": 57.9,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 35.5,
          "humidityPct": 55.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 664.9,
          "pm25UgM3": 68.9,
          "populationDensity": 11649
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Industrial Area Phase 1",
            "risk": "Very high",
            "score": 99,
            "temp": "52.8\u00b0C",
            "lst": 52.8,
            "uhi": 12.0,
            "heat_index": 42.8,
            "wbgt": 37.1,
            "people": "13,473",
            "peopleNum": 13473,
            "driver": "Low canopy cover & metal fabrication roofs",
            "lat": 30.776,
            "lon": 76.8,
            "canopyCover": "15.1%",
            "builtFraction": "84.3%",
            "buildingHeight": "78.9 m",
            "skyView": 0.36,
            "windSpeed": "1.8 m/s",
            "pm25": "90.9 \u00b5g/m\u00b3",
            "ndvi": 0.157,
            "albedo": 0.27,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 1.0,
                "weight": 32
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Industrial Area Phase 2",
            "risk": "Very high",
            "score": 99,
            "temp": "46.1\u00b0C",
            "lst": 46.1,
            "uhi": 11.4,
            "heat_index": 42.4,
            "wbgt": 35.7,
            "people": "12,173",
            "peopleNum": 12173,
            "driver": "Paved loading yards & industrial heat",
            "lat": 30.798,
            "lon": 76.718,
            "canopyCover": "23.2%",
            "builtFraction": "54.7%",
            "buildingHeight": "61.7 m",
            "skyView": 0.6,
            "windSpeed": "3.0 m/s",
            "pm25": "54.0 \u00b5g/m\u00b3",
            "ndvi": 0.288,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h3",
            "name": "Sector 17 Commercial Plaza",
            "risk": "Very high",
            "score": 99,
            "temp": "45.0\u00b0C",
            "lst": 45.0,
            "uhi": 10.2,
            "heat_index": 36.6,
            "wbgt": 31.1,
            "people": "12,113",
            "peopleNum": 12113,
            "driver": "Massive concrete pavement & low daytime shade",
            "lat": 30.704,
            "lon": 76.791,
            "canopyCover": "18.3%",
            "builtFraction": "72.1%",
            "buildingHeight": "64.8 m",
            "skyView": 0.47,
            "windSpeed": "2.5 m/s",
            "pm25": "55.5 \u00b5g/m\u00b3",
            "ndvi": 0.147,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h4",
            "name": "Sector 22 Shastri Market",
            "risk": "Very high",
            "score": 99,
            "temp": "44.1\u00b0C",
            "lst": 44.1,
            "uhi": 9.6,
            "heat_index": 41.8,
            "wbgt": 35.1,
            "people": "8,748",
            "peopleNum": 8748,
            "driver": "High footfall density & retail heat",
            "lat": 30.759,
            "lon": 76.75,
            "canopyCover": "36.0%",
            "builtFraction": "42.5%",
            "buildingHeight": "39.5 m",
            "skyView": 0.69,
            "windSpeed": "2.5 m/s",
            "pm25": "47.1 \u00b5g/m\u00b3",
            "ndvi": 0.321,
            "albedo": 0.14,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 0.9,
                "weight": 31
              },
              {
                "name": "Low tree canopy cover",
                "val": -0.0,
                "weight": 0
              },
              {
                "name": "Roof thermal storage",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h5",
            "name": "Sector 26 Timber Market",
            "risk": "Very high",
            "score": 99,
            "temp": "43.4\u00b0C",
            "lst": 43.4,
            "uhi": 8.1,
            "heat_index": 35.9,
            "wbgt": 31.6,
            "people": "16,516",
            "peopleNum": 16516,
            "driver": "Exposed yards & dry ground emissivity",
            "lat": 30.763,
            "lon": 76.76,
            "canopyCover": "18.2%",
            "builtFraction": "75.7%",
            "buildingHeight": "68.9 m",
            "skyView": 0.43,
            "windSpeed": "1.9 m/s",
            "pm25": "104.6 \u00b5g/m\u00b3",
            "ndvi": 0.188,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Manimajra Housing Complex",
            "risk": "Very high",
            "score": 99,
            "temp": "42.8\u00b0C",
            "lst": 42.8,
            "uhi": 8.4,
            "heat_index": 35.2,
            "wbgt": 30.6,
            "people": "10,653",
            "peopleNum": 10653,
            "driver": "Dense residential concrete fraction",
            "lat": 30.745,
            "lon": 76.751,
            "canopyCover": "20.7%",
            "builtFraction": "69.7%",
            "buildingHeight": "76.9 m",
            "skyView": 0.35,
            "windSpeed": "2.5 m/s",
            "pm25": "72.2 \u00b5g/m\u00b3",
            "ndvi": 0.181,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Sector 43 ISBT Terminal",
            "risk": "Very high",
            "score": 99,
            "temp": "42.2\u00b0C",
            "lst": 42.2,
            "uhi": 7.1,
            "heat_index": 35.2,
            "wbgt": 29.7,
            "people": "9,166",
            "peopleNum": 9166,
            "driver": "Extensive asphalt bus bays & exhaust heat",
            "lat": 30.711,
            "lon": 76.726,
            "canopyCover": "17.1%",
            "builtFraction": "64.2%",
            "buildingHeight": "63.2 m",
            "skyView": 0.54,
            "windSpeed": "3.5 m/s",
            "pm25": "51.3 \u00b5g/m\u00b3",
            "ndvi": 0.183,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Sector 35 Commercial Belt",
            "risk": "Very high",
            "score": 97,
            "temp": "41.7\u00b0C",
            "lst": 41.7,
            "uhi": 6.4,
            "heat_index": 36.1,
            "wbgt": 29.9,
            "people": "18,807",
            "peopleNum": 18807,
            "driver": "High vehicular parking & AC exhaust",
            "lat": 30.759,
            "lon": 76.748,
            "canopyCover": "29.4%",
            "builtFraction": "69.1%",
            "buildingHeight": "74.2 m",
            "skyView": 0.43,
            "windSpeed": "3.6 m/s",
            "pm25": "53.3 \u00b5g/m\u00b3",
            "ndvi": 0.339,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Monsoon": {
        "peakLst": 46.2,
        "meanLst": 33.6,
        "minLst": 19.6,
        "uhiMean": 5.6,
        "uhiMax": 12.0,
        "heatIndexMean": 29.9,
        "wbgtMean": 26.0,
        "hotspotCount": 47,
        "totalRecords": 11027,
        "hotspotPct": 0.4,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.264,
          "treeCoverPct": 25.4,
          "imperviousPct": 59.4,
          "buildingDensityPct": 57.5,
          "buildingHeightM": 58.0,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 28.9,
          "humidityPct": 73.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 516.7,
          "pm25UgM3": 38.1,
          "populationDensity": 11680
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Industrial Area Phase 1",
            "risk": "Very high",
            "score": 99,
            "temp": "46.2\u00b0C",
            "lst": 46.2,
            "uhi": 12.0,
            "heat_index": 33.9,
            "wbgt": 31.4,
            "people": "11,304",
            "peopleNum": 11304,
            "driver": "Low canopy cover & metal fabrication roofs",
            "lat": 30.766,
            "lon": 76.81,
            "canopyCover": "9.7%",
            "builtFraction": "92.2%",
            "buildingHeight": "64.7 m",
            "skyView": 0.34,
            "windSpeed": "2.1 m/s",
            "pm25": "55.5 \u00b5g/m\u00b3",
            "ndvi": 0.103,
            "albedo": 0.25,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 2.0,
                "weight": 70
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Industrial Area Phase 2",
            "risk": "Very high",
            "score": 99,
            "temp": "38.9\u00b0C",
            "lst": 38.9,
            "uhi": 10.6,
            "heat_index": 31.7,
            "wbgt": 27.2,
            "people": "12,290",
            "peopleNum": 12290,
            "driver": "Paved loading yards & industrial heat",
            "lat": 30.776,
            "lon": 76.703,
            "canopyCover": "14.6%",
            "builtFraction": "67.7%",
            "buildingHeight": "73.1 m",
            "skyView": 0.42,
            "windSpeed": "2.8 m/s",
            "pm25": "36.7 \u00b5g/m\u00b3",
            "ndvi": 0.253,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Sector 17 Commercial Plaza",
            "risk": "Very high",
            "score": 99,
            "temp": "37.7\u00b0C",
            "lst": 37.7,
            "uhi": 10.4,
            "heat_index": 32.0,
            "wbgt": 28.4,
            "people": "12,111",
            "peopleNum": 12111,
            "driver": "Massive concrete pavement & low daytime shade",
            "lat": 30.816,
            "lon": 76.761,
            "canopyCover": "20.7%",
            "builtFraction": "68.6%",
            "buildingHeight": "61.8 m",
            "skyView": 0.46,
            "windSpeed": "2.7 m/s",
            "pm25": "52.2 \u00b5g/m\u00b3",
            "ndvi": 0.255,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Sector 22 Shastri Market",
            "risk": "Very high",
            "score": 94,
            "temp": "36.8\u00b0C",
            "lst": 36.8,
            "uhi": 8.9,
            "heat_index": 31.6,
            "wbgt": 27.0,
            "people": "17,986",
            "peopleNum": 17986,
            "driver": "High footfall density & retail heat",
            "lat": 30.744,
            "lon": 76.811,
            "canopyCover": "30.6%",
            "builtFraction": "67.1%",
            "buildingHeight": "62.4 m",
            "skyView": 0.47,
            "windSpeed": "4.3 m/s",
            "pm25": "25.2 \u00b5g/m\u00b3",
            "ndvi": 0.232,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Sector 26 Timber Market",
            "risk": "Very high",
            "score": 92,
            "temp": "36.2\u00b0C",
            "lst": 36.2,
            "uhi": 8.5,
            "heat_index": 29.8,
            "wbgt": 24.7,
            "people": "12,745",
            "peopleNum": 12745,
            "driver": "Exposed yards & dry ground emissivity",
            "lat": 30.726,
            "lon": 76.714,
            "canopyCover": "20.7%",
            "builtFraction": "61.8%",
            "buildingHeight": "62.8 m",
            "skyView": 0.52,
            "windSpeed": "2.9 m/s",
            "pm25": "28.6 \u00b5g/m\u00b3",
            "ndvi": 0.263,
            "albedo": 0.21,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h6",
            "name": "Manimajra Housing Complex",
            "risk": "Very high",
            "score": 88,
            "temp": "35.5\u00b0C",
            "lst": 35.5,
            "uhi": 7.3,
            "heat_index": 29.6,
            "wbgt": 26.6,
            "people": "16,916",
            "peopleNum": 16916,
            "driver": "Dense residential concrete fraction",
            "lat": 30.739,
            "lon": 76.74,
            "canopyCover": "20.1%",
            "builtFraction": "71.2%",
            "buildingHeight": "74.8 m",
            "skyView": 0.42,
            "windSpeed": "3.0 m/s",
            "pm25": "27.4 \u00b5g/m\u00b3",
            "ndvi": 0.162,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.1,
                "weight": 2
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h7",
            "name": "Sector 43 ISBT Terminal",
            "risk": "High",
            "score": 86,
            "temp": "35.0\u00b0C",
            "lst": 35.0,
            "uhi": 6.9,
            "heat_index": 28.1,
            "wbgt": 24.5,
            "people": "13,194",
            "peopleNum": 13194,
            "driver": "Extensive asphalt bus bays & exhaust heat",
            "lat": 30.69,
            "lon": 76.722,
            "canopyCover": "21.2%",
            "builtFraction": "74.5%",
            "buildingHeight": "63.8 m",
            "skyView": 0.49,
            "windSpeed": "2.5 m/s",
            "pm25": "40.6 \u00b5g/m\u00b3",
            "ndvi": 0.233,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Sector 35 Commercial Belt",
            "risk": "High",
            "score": 86,
            "temp": "34.5\u00b0C",
            "lst": 34.5,
            "uhi": 7.2,
            "heat_index": 33.2,
            "wbgt": 27.9,
            "people": "9,974",
            "peopleNum": 9974,
            "driver": "High vehicular parking & AC exhaust",
            "lat": 30.686,
            "lon": 76.788,
            "canopyCover": "27.3%",
            "builtFraction": "58.3%",
            "buildingHeight": "60.0 m",
            "skyView": 0.59,
            "windSpeed": "3.4 m/s",
            "pm25": "53.5 \u00b5g/m\u00b3",
            "ndvi": 0.285,
            "albedo": 0.18,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      },
      "Post_Monsoon": {
        "peakLst": 33.8,
        "meanLst": 22.6,
        "minLst": 9.1,
        "uhiMean": 4.1,
        "uhiMax": 12.0,
        "heatIndexMean": 17.5,
        "wbgtMean": 12.2,
        "hotspotCount": 0,
        "totalRecords": 5640,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.265,
          "treeCoverPct": 25.5,
          "imperviousPct": 59.2,
          "buildingDensityPct": 57.4,
          "buildingHeightM": 57.8,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 17.5,
          "humidityPct": 55.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 606.8,
          "pm25UgM3": 69.2,
          "populationDensity": 11658
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Industrial Area Phase 1",
            "risk": "Very high",
            "score": 96,
            "temp": "33.8\u00b0C",
            "lst": 33.8,
            "uhi": 12.0,
            "heat_index": 22.8,
            "wbgt": 18.6,
            "people": "20,431",
            "peopleNum": 20431,
            "driver": "Low canopy cover & metal fabrication roofs",
            "lat": 30.725,
            "lon": 76.811,
            "canopyCover": "17.1%",
            "builtFraction": "84.9%",
            "buildingHeight": "74.3 m",
            "skyView": 0.44,
            "windSpeed": "2.2 m/s",
            "pm25": "99.6 \u00b5g/m\u00b3",
            "ndvi": 0.181,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.9,
                "weight": 66
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h2",
            "name": "Industrial Area Phase 2",
            "risk": "High",
            "score": 78,
            "temp": "27.8\u00b0C",
            "lst": 27.8,
            "uhi": 9.0,
            "heat_index": 18.4,
            "wbgt": 14.4,
            "people": "19,257",
            "peopleNum": 19257,
            "driver": "Paved loading yards & industrial heat",
            "lat": 30.737,
            "lon": 76.766,
            "canopyCover": "20.7%",
            "builtFraction": "76.7%",
            "buildingHeight": "66.7 m",
            "skyView": 0.42,
            "windSpeed": "2.6 m/s",
            "pm25": "80.4 \u00b5g/m\u00b3",
            "ndvi": 0.238,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h3",
            "name": "Sector 17 Commercial Plaza",
            "risk": "High",
            "score": 75,
            "temp": "26.6\u00b0C",
            "lst": 26.6,
            "uhi": 8.8,
            "heat_index": 19.9,
            "wbgt": 15.1,
            "people": "13,943",
            "peopleNum": 13943,
            "driver": "Massive concrete pavement & low daytime shade",
            "lat": 30.792,
            "lon": 76.823,
            "canopyCover": "22.6%",
            "builtFraction": "63.1%",
            "buildingHeight": "47.9 m",
            "skyView": 0.58,
            "windSpeed": "2.4 m/s",
            "pm25": "59.6 \u00b5g/m\u00b3",
            "ndvi": 0.213,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h4",
            "name": "Sector 22 Shastri Market",
            "risk": "Moderate",
            "score": 72,
            "temp": "25.8\u00b0C",
            "lst": 25.8,
            "uhi": 7.9,
            "heat_index": 15.9,
            "wbgt": 10.5,
            "people": "12,568",
            "peopleNum": 12568,
            "driver": "High footfall density & retail heat",
            "lat": 30.774,
            "lon": 76.772,
            "canopyCover": "22.7%",
            "builtFraction": "74.1%",
            "buildingHeight": "66.4 m",
            "skyView": 0.47,
            "windSpeed": "3.3 m/s",
            "pm25": "57.2 \u00b5g/m\u00b3",
            "ndvi": 0.186,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.3,
                "weight": 9
              },
              {
                "name": "Roof thermal storage",
                "val": 0.9,
                "weight": 28
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h5",
            "name": "Sector 26 Timber Market",
            "risk": "Moderate",
            "score": 66,
            "temp": "25.1\u00b0C",
            "lst": 25.1,
            "uhi": 6.3,
            "heat_index": 16.5,
            "wbgt": 11.4,
            "people": "12,817",
            "peopleNum": 12817,
            "driver": "Exposed yards & dry ground emissivity",
            "lat": 30.703,
            "lon": 76.843,
            "canopyCover": "16.3%",
            "builtFraction": "71.7%",
            "buildingHeight": "64.5 m",
            "skyView": 0.5,
            "windSpeed": "4.0 m/s",
            "pm25": "56.8 \u00b5g/m\u00b3",
            "ndvi": 0.107,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.6,
                "weight": 56
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.5,
                "weight": 15
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h6",
            "name": "Manimajra Housing Complex",
            "risk": "Moderate",
            "score": 66,
            "temp": "24.5\u00b0C",
            "lst": 24.5,
            "uhi": 6.5,
            "heat_index": 21.4,
            "wbgt": 16.0,
            "people": "7,248",
            "peopleNum": 7248,
            "driver": "Dense residential concrete fraction",
            "lat": 30.766,
            "lon": 76.741,
            "canopyCover": "34.9%",
            "builtFraction": "41.1%",
            "buildingHeight": "42.4 m",
            "skyView": 0.7,
            "windSpeed": "2.7 m/s",
            "pm25": "39.3 \u00b5g/m\u00b3",
            "ndvi": 0.369,
            "albedo": 0.15,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 0.9,
                "weight": 31
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h7",
            "name": "Sector 43 ISBT Terminal",
            "risk": "Moderate",
            "score": 65,
            "temp": "23.9\u00b0C",
            "lst": 23.9,
            "uhi": 5.0,
            "heat_index": 18.6,
            "wbgt": 12.5,
            "people": "16,225",
            "peopleNum": 16225,
            "driver": "Extensive asphalt bus bays & exhaust heat",
            "lat": 30.751,
            "lon": 76.758,
            "canopyCover": "30.3%",
            "builtFraction": "65.3%",
            "buildingHeight": "60.1 m",
            "skyView": 0.49,
            "windSpeed": "2.4 m/s",
            "pm25": "66.4 \u00b5g/m\u00b3",
            "ndvi": 0.307,
            "albedo": 0.2,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.4,
                "weight": 49
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.1,
                "weight": 3
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h8",
            "name": "Sector 35 Commercial Belt",
            "risk": "Moderate",
            "score": 65,
            "temp": "23.4\u00b0C",
            "lst": 23.4,
            "uhi": 5.0,
            "heat_index": 16.7,
            "wbgt": 10.8,
            "people": "11,937",
            "peopleNum": 11937,
            "driver": "High vehicular parking & AC exhaust",
            "lat": 30.811,
            "lon": 76.8,
            "canopyCover": "19.9%",
            "builtFraction": "61.1%",
            "buildingHeight": "48.1 m",
            "skyView": 0.6,
            "windSpeed": "2.6 m/s",
            "pm25": "47.7 \u00b5g/m\u00b3",
            "ndvi": 0.163,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.5,
                "weight": 16
              },
              {
                "name": "Low air ventilation",
                "val": 0.2,
                "weight": 5
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          }
        ]
      },
      "Winter": {
        "peakLst": 24.1,
        "meanLst": 13.0,
        "minLst": 8.0,
        "uhiMean": 4.1,
        "uhiMax": 12.0,
        "heatIndexMean": 7.8,
        "wbgtMean": 5.0,
        "hotspotCount": 0,
        "totalRecords": 8157,
        "hotspotPct": 0.0,
        "coolingOpportunity": 2.9,
        "env": {
          "ndvi": 0.263,
          "treeCoverPct": 25.3,
          "imperviousPct": 59.4,
          "buildingDensityPct": 57.6,
          "buildingHeightM": 57.9,
          "skyViewFactor": 0.54,
          "albedo": 0.19,
          "airTempC": 7.8,
          "humidityPct": 47.0,
          "windSpeedMs": 3.2,
          "solarRadiationWm2": 593.1,
          "pm25UgM3": 110.6,
          "populationDensity": 11676
        },
        "hotspots": [
          {
            "id": "h1",
            "name": "Industrial Area Phase 1",
            "risk": "High",
            "score": 79,
            "temp": "24.1\u00b0C",
            "lst": 24.1,
            "uhi": 12.0,
            "heat_index": 14.0,
            "wbgt": 6.7,
            "people": "19,472",
            "peopleNum": 19472,
            "driver": "Low canopy cover & metal fabrication roofs",
            "lat": 30.697,
            "lon": 76.759,
            "canopyCover": "9.6%",
            "builtFraction": "83.8%",
            "buildingHeight": "59.7 m",
            "skyView": 0.53,
            "windSpeed": "2.1 m/s",
            "pm25": "141.5 \u00b5g/m\u00b3",
            "ndvi": 0.127,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.8,
                "weight": 63
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.7,
                "weight": 21
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h2",
            "name": "Industrial Area Phase 2",
            "risk": "Moderate",
            "score": 65,
            "temp": "18.0\u00b0C",
            "lst": 18.0,
            "uhi": 8.7,
            "heat_index": 6.7,
            "wbgt": 5.0,
            "people": "17,566",
            "peopleNum": 17566,
            "driver": "Paved loading yards & industrial heat",
            "lat": 30.726,
            "lon": 76.771,
            "canopyCover": "8.0%",
            "builtFraction": "76.2%",
            "buildingHeight": "84.5 m",
            "skyView": 0.38,
            "windSpeed": "4.0 m/s",
            "pm25": "105.0 \u00b5g/m\u00b3",
            "ndvi": 0.104,
            "albedo": 0.24,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.8,
                "weight": 24
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h3",
            "name": "Sector 17 Commercial Plaza",
            "risk": "Moderate",
            "score": 65,
            "temp": "16.8\u00b0C",
            "lst": 16.8,
            "uhi": 8.0,
            "heat_index": 10.1,
            "wbgt": 5.4,
            "people": "13,469",
            "peopleNum": 13469,
            "driver": "Massive concrete pavement & low daytime shade",
            "lat": 30.744,
            "lon": 76.748,
            "canopyCover": "35.5%",
            "builtFraction": "55.3%",
            "buildingHeight": "60.7 m",
            "skyView": 0.57,
            "windSpeed": "2.2 m/s",
            "pm25": "150.3 \u00b5g/m\u00b3",
            "ndvi": 0.377,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": -0.0,
                "weight": 0
              },
              {
                "name": "Roof thermal storage",
                "val": 0.6,
                "weight": 19
              },
              {
                "name": "Low air ventilation",
                "val": 0.3,
                "weight": 8
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          },
          {
            "id": "h4",
            "name": "Sector 22 Shastri Market",
            "risk": "Moderate",
            "score": 65,
            "temp": "16.0\u00b0C",
            "lst": 16.0,
            "uhi": 6.9,
            "heat_index": 7.4,
            "wbgt": 5.0,
            "people": "16,174",
            "peopleNum": 16174,
            "driver": "High footfall density & retail heat",
            "lat": 30.762,
            "lon": 76.797,
            "canopyCover": "0.0%",
            "builtFraction": "77.8%",
            "buildingHeight": "70.5 m",
            "skyView": 0.33,
            "windSpeed": "2.0 m/s",
            "pm25": "106.1 \u00b5g/m\u00b3",
            "ndvi": 0.048,
            "albedo": 0.26,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.7,
                "weight": 59
              },
              {
                "name": "Low tree canopy cover",
                "val": 1.0,
                "weight": 30
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.0,
                "weight": 0
              }
            ]
          },
          {
            "id": "h5",
            "name": "Sector 26 Timber Market",
            "risk": "Moderate",
            "score": 65,
            "temp": "15.4\u00b0C",
            "lst": 15.4,
            "uhi": 7.1,
            "heat_index": 8.8,
            "wbgt": 5.0,
            "people": "8,694",
            "peopleNum": 8694,
            "driver": "Exposed yards & dry ground emissivity",
            "lat": 30.724,
            "lon": 76.83,
            "canopyCover": "12.9%",
            "builtFraction": "69.1%",
            "buildingHeight": "71.6 m",
            "skyView": 0.39,
            "windSpeed": "6.7 m/s",
            "pm25": "65.8 \u00b5g/m\u00b3",
            "ndvi": 0.157,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.6,
                "weight": 18
              },
              {
                "name": "Roof thermal storage",
                "val": 0.7,
                "weight": 22
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.1,
                "weight": 3
              }
            ]
          },
          {
            "id": "h6",
            "name": "Manimajra Housing Complex",
            "risk": "Moderate",
            "score": 65,
            "temp": "14.8\u00b0C",
            "lst": 14.8,
            "uhi": 6.5,
            "heat_index": 8.2,
            "wbgt": 5.0,
            "people": "9,744",
            "peopleNum": 9744,
            "driver": "Dense residential concrete fraction",
            "lat": 30.707,
            "lon": 76.74,
            "canopyCover": "22.3%",
            "builtFraction": "54.7%",
            "buildingHeight": "59.5 m",
            "skyView": 0.47,
            "windSpeed": "2.0 m/s",
            "pm25": "127.9 \u00b5g/m\u00b3",
            "ndvi": 0.239,
            "albedo": 0.23,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.2,
                "weight": 42
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h7",
            "name": "Sector 43 ISBT Terminal",
            "risk": "Moderate",
            "score": 65,
            "temp": "14.2\u00b0C",
            "lst": 14.2,
            "uhi": 5.2,
            "heat_index": 7.0,
            "wbgt": 5.0,
            "people": "10,903",
            "peopleNum": 10903,
            "driver": "Extensive asphalt bus bays & exhaust heat",
            "lat": 30.772,
            "lon": 76.804,
            "canopyCover": "19.7%",
            "builtFraction": "68.2%",
            "buildingHeight": "74.8 m",
            "skyView": 0.44,
            "windSpeed": "2.0 m/s",
            "pm25": "124.5 \u00b5g/m\u00b3",
            "ndvi": 0.206,
            "albedo": 0.22,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.5,
                "weight": 52
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.4,
                "weight": 12
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.4,
                "weight": 11
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.2,
                "weight": 7
              }
            ]
          },
          {
            "id": "h8",
            "name": "Sector 35 Commercial Belt",
            "risk": "Moderate",
            "score": 65,
            "temp": "13.7\u00b0C",
            "lst": 13.7,
            "uhi": 4.6,
            "heat_index": 9.5,
            "wbgt": 5.0,
            "people": "9,465",
            "peopleNum": 9465,
            "driver": "High vehicular parking & AC exhaust",
            "lat": 30.849,
            "lon": 76.718,
            "canopyCover": "26.4%",
            "builtFraction": "58.6%",
            "buildingHeight": "61.1 m",
            "skyView": 0.47,
            "windSpeed": "4.3 m/s",
            "pm25": "118.9 \u00b5g/m\u00b3",
            "ndvi": 0.341,
            "albedo": 0.19,
            "driverBreakdown": [
              {
                "name": "Impervious surface fraction",
                "val": 1.3,
                "weight": 45
              },
              {
                "name": "Low tree canopy cover",
                "val": 0.2,
                "weight": 6
              },
              {
                "name": "Roof thermal storage",
                "val": 0.8,
                "weight": 25
              },
              {
                "name": "Low air ventilation",
                "val": 0.0,
                "weight": 0
              },
              {
                "name": "Vegetation cooling buffer",
                "val": -0.3,
                "weight": 10
              }
            ]
          }
        ]
      }
    }
  }
};
export type CityName = keyof typeof CITIES_DATA;
