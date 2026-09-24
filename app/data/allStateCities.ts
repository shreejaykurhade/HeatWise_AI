// Real Cities and Municipal Stations Database for all 36 Indian States & UTs
export interface StateCityStation {
  name: string;
  lat: number;
  lon: number;
  peakLst: number;
  uhiMean: number;
  risk: "Very high" | "High" | "Moderate" | "Low";
  zone: string;
}

export const ALL_STATE_CITIES: Record<string, readonly StateCityStation[]> = {
  "Jammu & Kashmir": [
    {
      "name": "Srinagar",
      "lat": 34.0837,
      "lon": 74.7973,
      "peakLst": 32.4,
      "uhiMean": 4.1,
      "risk": "Moderate",
      "zone": "Western Himalayan"
    },
    {
      "name": "Jammu",
      "lat": 32.7266,
      "lon": 74.857,
      "peakLst": 42.8,
      "uhiMean": 5.4,
      "risk": "High",
      "zone": "Sub-Tropical"
    },
    {
      "name": "Anantnag",
      "lat": 33.7311,
      "lon": 75.1528,
      "peakLst": 29.8,
      "uhiMean": 3.6,
      "risk": "Moderate",
      "zone": "Western Himalayan"
    },
    {
      "name": "Baramulla",
      "lat": 34.198,
      "lon": 74.3636,
      "peakLst": 30.2,
      "uhiMean": 3.7,
      "risk": "Moderate",
      "zone": "Western Himalayan"
    },
    {
      "name": "Udhampur",
      "lat": 32.9262,
      "lon": 75.0044,
      "peakLst": 38.1,
      "uhiMean": 4.6,
      "risk": "Moderate",
      "zone": "Sub-Himalayan"
    },
    {
      "name": "Kathua",
      "lat": 32.3715,
      "lon": 75.5186,
      "peakLst": 41.5,
      "uhiMean": 5.1,
      "risk": "High",
      "zone": "Sub-Tropical"
    }
  ],
  "Himachal Pradesh": [
    {
      "name": "Shimla",
      "lat": 31.1048,
      "lon": 77.1734,
      "peakLst": 29.6,
      "uhiMean": 3.5,
      "risk": "Moderate",
      "zone": "Himalayan Montane"
    },
    {
      "name": "Dharamshala",
      "lat": 32.219,
      "lon": 76.3234,
      "peakLst": 33.2,
      "uhiMean": 3.9,
      "risk": "Moderate",
      "zone": "Himalayan Montane"
    },
    {
      "name": "Mandi",
      "lat": 31.7087,
      "lon": 76.932,
      "peakLst": 36.4,
      "uhiMean": 4.2,
      "risk": "Moderate",
      "zone": "Sub-Himalayan"
    },
    {
      "name": "Solan",
      "lat": 30.9045,
      "lon": 77.0967,
      "peakLst": 34.1,
      "uhiMean": 4.0,
      "risk": "Moderate",
      "zone": "Sub-Himalayan"
    },
    {
      "name": "Kullu",
      "lat": 31.9579,
      "lon": 77.1095,
      "peakLst": 31.5,
      "uhiMean": 3.6,
      "risk": "Moderate",
      "zone": "Himalayan Valley"
    },
    {
      "name": "Baddi",
      "lat": 30.9578,
      "lon": 76.7914,
      "peakLst": 42.0,
      "uhiMean": 5.8,
      "risk": "High",
      "zone": "Industrial Sub-Himalayan"
    }
  ],
  "Punjab": [
    {
      "name": "Ludhiana",
      "lat": 30.901,
      "lon": 75.8573,
      "peakLst": 53.4,
      "uhiMean": 6.2,
      "risk": "Very high",
      "zone": "Indo-Gangetic Plain"
    },
    {
      "name": "Amritsar",
      "lat": 31.634,
      "lon": 74.8723,
      "peakLst": 52.1,
      "uhiMean": 5.8,
      "risk": "Very high",
      "zone": "Indo-Gangetic Plain"
    },
    {
      "name": "Jalandhar",
      "lat": 31.326,
      "lon": 75.5762,
      "peakLst": 51.8,
      "uhiMean": 5.7,
      "risk": "High",
      "zone": "Indo-Gangetic Plain"
    },
    {
      "name": "Patiala",
      "lat": 30.3398,
      "lon": 76.3869,
      "peakLst": 52.6,
      "uhiMean": 5.9,
      "risk": "Very high",
      "zone": "Indo-Gangetic Plain"
    },
    {
      "name": "Bathinda",
      "lat": 30.211,
      "lon": 74.9455,
      "peakLst": 54.2,
      "uhiMean": 6.4,
      "risk": "Very high",
      "zone": "Semi-Arid Plain"
    },
    {
      "name": "Mohali",
      "lat": 30.7046,
      "lon": 76.7179,
      "peakLst": 51.5,
      "uhiMean": 5.6,
      "risk": "High",
      "zone": "Sub-Himalayan Plain"
    }
  ],
  "Chandigarh": [
    {
      "name": "Chandigarh",
      "lat": 30.7333,
      "lon": 76.7794,
      "peakLst": 52.8,
      "uhiMean": 5.9,
      "risk": "Very high",
      "zone": "Sub-Himalayan Plain"
    },
    {
      "name": "Sector 17 Core",
      "lat": 30.74,
      "lon": 76.782,
      "peakLst": 53.2,
      "uhiMean": 6.1,
      "risk": "Very high",
      "zone": "Commercial Center"
    },
    {
      "name": "Industrial Area Phase 1",
      "lat": 30.705,
      "lon": 76.801,
      "peakLst": 54.0,
      "uhiMean": 6.5,
      "risk": "Very high",
      "zone": "Industrial Zone"
    }
  ],
  "Uttarakhand": [
    {
      "name": "Dehradun",
      "lat": 30.3165,
      "lon": 78.0322,
      "peakLst": 41.2,
      "uhiMean": 4.8,
      "risk": "High",
      "zone": "Doon Valley"
    },
    {
      "name": "Haridwar",
      "lat": 29.9457,
      "lon": 78.1642,
      "peakLst": 44.8,
      "uhiMean": 5.2,
      "risk": "High",
      "zone": "Tarai Plain"
    },
    {
      "name": "Roorkee",
      "lat": 29.8543,
      "lon": 77.888,
      "peakLst": 46.2,
      "uhiMean": 5.5,
      "risk": "High",
      "zone": "Indo-Gangetic Transition"
    },
    {
      "name": "Haldwani",
      "lat": 29.2183,
      "lon": 79.513,
      "peakLst": 43.5,
      "uhiMean": 5.0,
      "risk": "High",
      "zone": "Bhabhar Foothills"
    },
    {
      "name": "Rudrapur",
      "lat": 28.98,
      "lon": 79.4,
      "peakLst": 45.1,
      "uhiMean": 5.4,
      "risk": "High",
      "zone": "Tarai Industrial"
    },
    {
      "name": "Nainital",
      "lat": 29.3803,
      "lon": 79.4636,
      "peakLst": 26.5,
      "uhiMean": 3.1,
      "risk": "Low",
      "zone": "Kumaon Montane"
    }
  ],
  "Haryana": [
    {
      "name": "Gurugram",
      "lat": 28.4595,
      "lon": 77.0266,
      "peakLst": 55.4,
      "uhiMean": 6.7,
      "risk": "Very high",
      "zone": "NCR Urban Core"
    },
    {
      "name": "Faridabad",
      "lat": 28.4089,
      "lon": 77.3178,
      "peakLst": 54.8,
      "uhiMean": 6.5,
      "risk": "Very high",
      "zone": "NCR Industrial"
    },
    {
      "name": "Panipat",
      "lat": 29.3909,
      "lon": 76.9635,
      "peakLst": 53.7,
      "uhiMean": 6.1,
      "risk": "Very high",
      "zone": "Textile Hub"
    },
    {
      "name": "Ambala",
      "lat": 30.3782,
      "lon": 76.7767,
      "peakLst": 52.4,
      "uhiMean": 5.8,
      "risk": "Very high",
      "zone": "Plains"
    },
    {
      "name": "Hisar",
      "lat": 29.1492,
      "lon": 75.7217,
      "peakLst": 56.2,
      "uhiMean": 7.1,
      "risk": "Very high",
      "zone": "Semi-Arid Western Plain"
    },
    {
      "name": "Karnal",
      "lat": 29.6857,
      "lon": 76.9905,
      "peakLst": 52.8,
      "uhiMean": 5.9,
      "risk": "Very high",
      "zone": "Agricultural Plains"
    },
    {
      "name": "Rohtak",
      "lat": 28.8955,
      "lon": 76.6066,
      "peakLst": 54.1,
      "uhiMean": 6.3,
      "risk": "Very high",
      "zone": "Central Plains"
    }
  ],
  "NCT of Delhi": [
    {
      "name": "Delhi",
      "lat": 28.7041,
      "lon": 77.1025,
      "peakLst": 54.2,
      "uhiMean": 6.1,
      "risk": "Very high",
      "zone": "Composite Semi-Arid"
    },
    {
      "name": "Connaught Place",
      "lat": 28.6315,
      "lon": 77.2167,
      "peakLst": 53.8,
      "uhiMean": 6.0,
      "risk": "Very high",
      "zone": "Commercial Core"
    },
    {
      "name": "Anand Vihar",
      "lat": 28.6469,
      "lon": 77.316,
      "peakLst": 55.6,
      "uhiMean": 6.8,
      "risk": "Very high",
      "zone": "Transport Corridor"
    },
    {
      "name": "Okhla Industrial",
      "lat": 28.53,
      "lon": 77.27,
      "peakLst": 54.9,
      "uhiMean": 6.4,
      "risk": "Very high",
      "zone": "Industrial Area"
    },
    {
      "name": "Rohini Sector 16",
      "lat": 28.73,
      "lon": 77.12,
      "peakLst": 54.5,
      "uhiMean": 6.2,
      "risk": "Very high",
      "zone": "Residential Dense"
    },
    {
      "name": "Dwarka Sector 21",
      "lat": 28.552,
      "lon": 77.058,
      "peakLst": 53.6,
      "uhiMean": 5.9,
      "risk": "Very high",
      "zone": "Suburban Plain"
    }
  ],
  "Rajasthan": [
    {
      "name": "Jaipur",
      "lat": 26.9124,
      "lon": 75.7873,
      "peakLst": 57.3,
      "uhiMean": 7.4,
      "risk": "Very high",
      "zone": "Hot Semi-Arid"
    },
    {
      "name": "Jodhpur",
      "lat": 26.2389,
      "lon": 73.0243,
      "peakLst": 58.2,
      "uhiMean": 7.8,
      "risk": "Very high",
      "zone": "Arid Thar Fringe"
    },
    {
      "name": "Bikaner",
      "lat": 28.0229,
      "lon": 73.3119,
      "peakLst": 58.8,
      "uhiMean": 8.0,
      "risk": "Very high",
      "zone": "Thar Desert Core"
    },
    {
      "name": "Kota",
      "lat": 25.2138,
      "lon": 75.8648,
      "peakLst": 56.4,
      "uhiMean": 6.9,
      "risk": "Very high",
      "zone": "Chambal Valley"
    },
    {
      "name": "Udaipur",
      "lat": 24.5854,
      "lon": 73.7125,
      "peakLst": 51.5,
      "uhiMean": 5.6,
      "risk": "High",
      "zone": "Aravalli Basin"
    },
    {
      "name": "Ajmer",
      "lat": 26.4499,
      "lon": 74.6399,
      "peakLst": 54.8,
      "uhiMean": 6.5,
      "risk": "Very high",
      "zone": "Central Aravalli"
    },
    {
      "name": "Alwar",
      "lat": 27.553,
      "lon": 76.6346,
      "peakLst": 55.1,
      "uhiMean": 6.6,
      "risk": "Very high",
      "zone": "NCR Sub-Region"
    },
    {
      "name": "Bhilwara",
      "lat": 25.3407,
      "lon": 74.6313,
      "peakLst": 53.9,
      "uhiMean": 6.2,
      "risk": "Very high",
      "zone": "Textile Hub"
    }
  ],
  "Uttar Pradesh": [
    {
      "name": "Lucknow",
      "lat": 26.8467,
      "lon": 80.9462,
      "peakLst": 54.6,
      "uhiMean": 6.3,
      "risk": "Very high",
      "zone": "Indo-Gangetic Plain"
    },
    {
      "name": "Kanpur",
      "lat": 26.4499,
      "lon": 80.3319,
      "peakLst": 55.4,
      "uhiMean": 6.7,
      "risk": "Very high",
      "zone": "Industrial Core"
    },
    {
      "name": "Varanasi",
      "lat": 25.3176,
      "lon": 82.9739,
      "peakLst": 53.8,
      "uhiMean": 6.2,
      "risk": "Very high",
      "zone": "Eastern Plains"
    },
    {
      "name": "Agra",
      "lat": 27.1767,
      "lon": 78.0081,
      "peakLst": 56.1,
      "uhiMean": 7.0,
      "risk": "Very high",
      "zone": "Yamuna Plain"
    },
    {
      "name": "Prayagraj",
      "lat": 25.4358,
      "lon": 81.8463,
      "peakLst": 54.5,
      "uhiMean": 6.4,
      "risk": "Very high",
      "zone": "Confluence Plains"
    },
    {
      "name": "Meerut",
      "lat": 28.9845,
      "lon": 77.7064,
      "peakLst": 52.9,
      "uhiMean": 5.9,
      "risk": "Very high",
      "zone": "Western Plains"
    },
    {
      "name": "Noida",
      "lat": 28.5355,
      "lon": 77.391,
      "peakLst": 54.7,
      "uhiMean": 6.6,
      "risk": "Very high",
      "zone": "NCR High-Density"
    },
    {
      "name": "Bareilly",
      "lat": 28.367,
      "lon": 79.4304,
      "peakLst": 52.2,
      "uhiMean": 5.8,
      "risk": "High",
      "zone": "Rohilkhand Plains"
    },
    {
      "name": "Gorakhpur",
      "lat": 26.7606,
      "lon": 83.3732,
      "peakLst": 51.4,
      "uhiMean": 5.5,
      "risk": "High",
      "zone": "Terai Plains"
    },
    {
      "name": "Aligarh",
      "lat": 27.8974,
      "lon": 78.088,
      "peakLst": 53.6,
      "uhiMean": 6.1,
      "risk": "Very high",
      "zone": "Western Plains"
    }
  ],
  "Bihar": [
    {
      "name": "Patna",
      "lat": 25.5941,
      "lon": 85.1376,
      "peakLst": 53.2,
      "uhiMean": 6.3,
      "risk": "Very high",
      "zone": "Gangetic Plain"
    },
    {
      "name": "Gaya",
      "lat": 24.7914,
      "lon": 85.0002,
      "peakLst": 54.8,
      "uhiMean": 6.7,
      "risk": "Very high",
      "zone": "South Bihar Plain"
    },
    {
      "name": "Bhagalpur",
      "lat": 25.2425,
      "lon": 86.9842,
      "peakLst": 51.6,
      "uhiMean": 5.7,
      "risk": "High",
      "zone": "Eastern Plain"
    },
    {
      "name": "Muzaffarpur",
      "lat": 26.1209,
      "lon": 85.3647,
      "peakLst": 50.8,
      "uhiMean": 5.4,
      "risk": "High",
      "zone": "North Bihar Plain"
    },
    {
      "name": "Darbhanga",
      "lat": 26.1542,
      "lon": 85.8918,
      "peakLst": 49.9,
      "uhiMean": 5.1,
      "risk": "High",
      "zone": "Mithila Basin"
    },
    {
      "name": "Purnia",
      "lat": 25.7771,
      "lon": 87.4753,
      "peakLst": 48.6,
      "uhiMean": 4.8,
      "risk": "Moderate",
      "zone": "Eastern Sub-Himalayan"
    }
  ],
  "Sikkim": [
    {
      "name": "Gangtok",
      "lat": 27.3389,
      "lon": 88.6065,
      "peakLst": 26.8,
      "uhiMean": 3.0,
      "risk": "Low",
      "zone": "Eastern Himalayan"
    },
    {
      "name": "Namchi",
      "lat": 27.1667,
      "lon": 88.35,
      "peakLst": 28.2,
      "uhiMean": 3.2,
      "risk": "Low",
      "zone": "South Sikkim Ridge"
    },
    {
      "name": "Geyzing",
      "lat": 27.2889,
      "lon": 88.245,
      "peakLst": 27.1,
      "uhiMean": 2.9,
      "risk": "Low",
      "zone": "West Sikkim Valley"
    }
  ],
  "Arunachal Pradesh": [
    {
      "name": "Itanagar",
      "lat": 27.0844,
      "lon": 93.6053,
      "peakLst": 33.4,
      "uhiMean": 3.8,
      "risk": "Moderate",
      "zone": "Eastern Himalayan Foothills"
    },
    {
      "name": "Naharlagun",
      "lat": 27.1064,
      "lon": 93.6934,
      "peakLst": 34.8,
      "uhiMean": 4.1,
      "risk": "Moderate",
      "zone": "Papum Pare Valley"
    },
    {
      "name": "Pasighat",
      "lat": 28.0667,
      "lon": 95.3333,
      "peakLst": 32.1,
      "uhiMean": 3.6,
      "risk": "Moderate",
      "zone": "Siang River Basin"
    },
    {
      "name": "Tawang",
      "lat": 27.5861,
      "lon": 91.8687,
      "peakLst": 22.0,
      "uhiMean": 2.2,
      "risk": "Low",
      "zone": "High Alpine"
    }
  ],
  "Nagaland": [
    {
      "name": "Dimapur",
      "lat": 25.9068,
      "lon": 93.7274,
      "peakLst": 39.5,
      "uhiMean": 4.9,
      "risk": "Moderate",
      "zone": "Dhansiri Valley"
    },
    {
      "name": "Kohima",
      "lat": 25.6751,
      "lon": 94.1086,
      "peakLst": 28.6,
      "uhiMean": 3.2,
      "risk": "Low",
      "zone": "Naga Hills Ridge"
    },
    {
      "name": "Mokokchung",
      "lat": 26.325,
      "lon": 94.52,
      "peakLst": 29.4,
      "uhiMean": 3.3,
      "risk": "Low",
      "zone": "Central Hills"
    }
  ],
  "Manipur": [
    {
      "name": "Imphal",
      "lat": 24.817,
      "lon": 93.9368,
      "peakLst": 35.8,
      "uhiMean": 4.3,
      "risk": "Moderate",
      "zone": "Manipur Valley"
    },
    {
      "name": "Churachandpur",
      "lat": 24.3333,
      "lon": 93.6833,
      "peakLst": 33.2,
      "uhiMean": 3.9,
      "risk": "Moderate",
      "zone": "South Hills"
    },
    {
      "name": "Thoubal",
      "lat": 24.63,
      "lon": 93.99,
      "peakLst": 34.5,
      "uhiMean": 4.0,
      "risk": "Moderate",
      "zone": "Valley Basin"
    }
  ],
  "Mizoram": [
    {
      "name": "Aizawl",
      "lat": 23.7271,
      "lon": 92.7176,
      "peakLst": 32.8,
      "uhiMean": 3.7,
      "risk": "Moderate",
      "zone": "Lushai Ridge"
    },
    {
      "name": "Lunglei",
      "lat": 22.8833,
      "lon": 92.7333,
      "peakLst": 31.4,
      "uhiMean": 3.5,
      "risk": "Moderate",
      "zone": "South Ridge"
    },
    {
      "name": "Champhai",
      "lat": 23.47,
      "lon": 93.33,
      "peakLst": 29.8,
      "uhiMean": 3.2,
      "risk": "Low",
      "zone": "Border Plain"
    }
  ],
  "Tripura": [
    {
      "name": "Agartala",
      "lat": 23.8315,
      "lon": 91.2868,
      "peakLst": 41.2,
      "uhiMean": 5.1,
      "risk": "High",
      "zone": "Howrah River Plain"
    },
    {
      "name": "Dharmanagar",
      "lat": 24.375,
      "lon": 92.1667,
      "peakLst": 38.6,
      "uhiMean": 4.6,
      "risk": "Moderate",
      "zone": "North Tripura"
    },
    {
      "name": "Udaipur",
      "lat": 23.5333,
      "lon": 91.4833,
      "peakLst": 39.4,
      "uhiMean": 4.8,
      "risk": "Moderate",
      "zone": "Gomati Basin"
    }
  ],
  "Meghalaya": [
    {
      "name": "Shillong",
      "lat": 25.5788,
      "lon": 91.8933,
      "peakLst": 28.5,
      "uhiMean": 3.1,
      "risk": "Low",
      "zone": "Khasi Hills Plateau"
    },
    {
      "name": "Tura",
      "lat": 25.5138,
      "lon": 90.2201,
      "peakLst": 36.8,
      "uhiMean": 4.5,
      "risk": "Moderate",
      "zone": "Garo Hills Foothills"
    },
    {
      "name": "Jowai",
      "lat": 25.45,
      "lon": 92.2,
      "peakLst": 29.2,
      "uhiMean": 3.3,
      "risk": "Low",
      "zone": "Jaintia Plateau"
    }
  ],
  "Assam": [
    {
      "name": "Guwahati",
      "lat": 26.1445,
      "lon": 91.7362,
      "peakLst": 43.5,
      "uhiMean": 5.4,
      "risk": "High",
      "zone": "Brahmaputra Valley"
    },
    {
      "name": "Silchar",
      "lat": 24.8333,
      "lon": 92.7789,
      "peakLst": 40.8,
      "uhiMean": 4.9,
      "risk": "Moderate",
      "zone": "Barak Valley"
    },
    {
      "name": "Dibrugarh",
      "lat": 27.4728,
      "lon": 94.912,
      "peakLst": 38.2,
      "uhiMean": 4.4,
      "risk": "Moderate",
      "zone": "Upper Assam Plain"
    },
    {
      "name": "Jorhat",
      "lat": 26.7509,
      "lon": 94.2037,
      "peakLst": 39.1,
      "uhiMean": 4.6,
      "risk": "Moderate",
      "zone": "Tea Belt Valley"
    },
    {
      "name": "Tezpur",
      "lat": 26.6338,
      "lon": 92.7926,
      "peakLst": 39.8,
      "uhiMean": 4.7,
      "risk": "Moderate",
      "zone": "North Bank Plain"
    },
    {
      "name": "Nagaon",
      "lat": 26.3467,
      "lon": 92.684,
      "peakLst": 41.0,
      "uhiMean": 5.0,
      "risk": "High",
      "zone": "Central Floodplain"
    }
  ],
  "West Bengal": [
    {
      "name": "Kolkata",
      "lat": 22.5726,
      "lon": 88.3639,
      "peakLst": 51.0,
      "uhiMean": 6.6,
      "risk": "Very high",
      "zone": "Lower Gangetic Delta"
    },
    {
      "name": "Howrah",
      "lat": 22.5958,
      "lon": 88.2636,
      "peakLst": 51.4,
      "uhiMean": 6.7,
      "risk": "Very high",
      "zone": "Industrial Delta"
    },
    {
      "name": "Siliguri",
      "lat": 26.7271,
      "lon": 88.3953,
      "peakLst": 42.6,
      "uhiMean": 5.2,
      "risk": "High",
      "zone": "North Bengal Foothills"
    },
    {
      "name": "Asansol",
      "lat": 23.6889,
      "lon": 86.9661,
      "peakLst": 52.8,
      "uhiMean": 6.4,
      "risk": "Very high",
      "zone": "Coalfield Plateau"
    },
    {
      "name": "Durgapur",
      "lat": 23.5204,
      "lon": 87.3119,
      "peakLst": 52.3,
      "uhiMean": 6.3,
      "risk": "Very high",
      "zone": "Steel City Core"
    },
    {
      "name": "Kharagpur",
      "lat": 22.346,
      "lon": 87.323,
      "peakLst": 49.5,
      "uhiMean": 5.8,
      "risk": "High",
      "zone": "Rarh Plains"
    },
    {
      "name": "Bardhaman",
      "lat": 23.2324,
      "lon": 87.8615,
      "peakLst": 49.2,
      "uhiMean": 5.7,
      "risk": "High",
      "zone": "Agricultural Delta"
    }
  ],
  "Jharkhand": [
    {
      "name": "Ranchi",
      "lat": 23.3441,
      "lon": 85.3096,
      "peakLst": 47.8,
      "uhiMean": 5.6,
      "risk": "High",
      "zone": "Chota Nagpur Plateau"
    },
    {
      "name": "Jamshedpur",
      "lat": 22.8046,
      "lon": 86.2029,
      "peakLst": 52.6,
      "uhiMean": 6.5,
      "risk": "Very high",
      "zone": "Subarnarekha Valley"
    },
    {
      "name": "Dhanbad",
      "lat": 23.7957,
      "lon": 86.4304,
      "peakLst": 51.9,
      "uhiMean": 6.3,
      "risk": "Very high",
      "zone": "Damodar Coal Basin"
    },
    {
      "name": "Bokaro",
      "lat": 23.6693,
      "lon": 86.1511,
      "peakLst": 50.4,
      "uhiMean": 6.0,
      "risk": "High",
      "zone": "Industrial Plateau"
    },
    {
      "name": "Deoghar",
      "lat": 24.4826,
      "lon": 86.7,
      "peakLst": 48.2,
      "uhiMean": 5.5,
      "risk": "High",
      "zone": "Santhal Pargana"
    }
  ],
  "Odisha": [
    {
      "name": "Bhubaneswar",
      "lat": 20.2961,
      "lon": 85.8245,
      "peakLst": 51.8,
      "uhiMean": 6.2,
      "risk": "Very high",
      "zone": "Coastal Plains"
    },
    {
      "name": "Cuttack",
      "lat": 20.4625,
      "lon": 85.8828,
      "peakLst": 51.2,
      "uhiMean": 6.0,
      "risk": "High",
      "zone": "Mahanadi Delta"
    },
    {
      "name": "Rourkela",
      "lat": 22.2604,
      "lon": 84.8536,
      "peakLst": 53.4,
      "uhiMean": 6.6,
      "risk": "Very high",
      "zone": "Brahmani Valley"
    },
    {
      "name": "Sambalpur",
      "lat": 21.4669,
      "lon": 83.9812,
      "peakLst": 54.6,
      "uhiMean": 6.9,
      "risk": "Very high",
      "zone": "Western Basin"
    },
    {
      "name": "Berhampur",
      "lat": 19.315,
      "lon": 84.7941,
      "peakLst": 47.5,
      "uhiMean": 5.4,
      "risk": "High",
      "zone": "Southern Coastal"
    },
    {
      "name": "Puri",
      "lat": 19.8135,
      "lon": 85.8312,
      "peakLst": 42.0,
      "uhiMean": 4.5,
      "risk": "Moderate",
      "zone": "Maritime Shore"
    }
  ],
  "Chhattisgarh": [
    {
      "name": "Raipur",
      "lat": 21.2514,
      "lon": 81.6296,
      "peakLst": 54.1,
      "uhiMean": 6.7,
      "risk": "Very high",
      "zone": "Mahanadi Basin"
    },
    {
      "name": "Bhilai",
      "lat": 21.1938,
      "lon": 81.3509,
      "peakLst": 53.6,
      "uhiMean": 6.5,
      "risk": "Very high",
      "zone": "Industrial Corridor"
    },
    {
      "name": "Bilaspur",
      "lat": 22.0797,
      "lon": 82.1409,
      "peakLst": 52.8,
      "uhiMean": 6.3,
      "risk": "Very high",
      "zone": "Arpa River Basin"
    },
    {
      "name": "Korba",
      "lat": 22.3595,
      "lon": 82.6848,
      "peakLst": 54.9,
      "uhiMean": 6.9,
      "risk": "Very high",
      "zone": "Power Hub Basin"
    },
    {
      "name": "Durg",
      "lat": 21.1904,
      "lon": 81.2849,
      "peakLst": 52.4,
      "uhiMean": 6.1,
      "risk": "High",
      "zone": "Central Plains"
    }
  ],
  "Madhya Pradesh": [
    {
      "name": "Bhopal",
      "lat": 23.2599,
      "lon": 77.4126,
      "peakLst": 51.6,
      "uhiMean": 6.0,
      "risk": "Very high",
      "zone": "Malwa Plateau"
    },
    {
      "name": "Indore",
      "lat": 22.7196,
      "lon": 75.8577,
      "peakLst": 48.4,
      "uhiMean": 5.4,
      "risk": "High",
      "zone": "Malwa Plateau"
    },
    {
      "name": "Gwalior",
      "lat": 26.2183,
      "lon": 78.1828,
      "peakLst": 56.8,
      "uhiMean": 7.3,
      "risk": "Very high",
      "zone": "Chambal Gird"
    },
    {
      "name": "Jabalpur",
      "lat": 23.1815,
      "lon": 79.9864,
      "peakLst": 52.7,
      "uhiMean": 6.2,
      "risk": "Very high",
      "zone": "Narmada Valley"
    },
    {
      "name": "Ujjain",
      "lat": 23.1765,
      "lon": 75.7885,
      "peakLst": 51.2,
      "uhiMean": 5.9,
      "risk": "High",
      "zone": "Shipra Basin"
    },
    {
      "name": "Sagar",
      "lat": 23.8388,
      "lon": 78.7378,
      "peakLst": 52.0,
      "uhiMean": 6.1,
      "risk": "High",
      "zone": "Bundelkhand Plateau"
    },
    {
      "name": "Ratlam",
      "lat": 23.3315,
      "lon": 75.0367,
      "peakLst": 52.5,
      "uhiMean": 6.2,
      "risk": "High",
      "zone": "Western Malwa"
    }
  ],
  "Gujarat": [
    {
      "name": "Ahmedabad",
      "lat": 23.0225,
      "lon": 72.5714,
      "peakLst": 54.7,
      "uhiMean": 6.8,
      "risk": "Very high",
      "zone": "Semi-Arid Sabarmati"
    },
    {
      "name": "Surat",
      "lat": 21.1702,
      "lon": 72.8311,
      "peakLst": 51.0,
      "uhiMean": 5.8,
      "risk": "High",
      "zone": "Tapi Coastal Delta"
    },
    {
      "name": "Vadodara",
      "lat": 22.3072,
      "lon": 73.1812,
      "peakLst": 53.2,
      "uhiMean": 6.3,
      "risk": "Very high",
      "zone": "Vishwamitri Basin"
    },
    {
      "name": "Rajkot",
      "lat": 22.3039,
      "lon": 70.8022,
      "peakLst": 53.9,
      "uhiMean": 6.5,
      "risk": "Very high",
      "zone": "Saurashtra Plateau"
    },
    {
      "name": "Bhavnagar",
      "lat": 21.7645,
      "lon": 72.1519,
      "peakLst": 49.8,
      "uhiMean": 5.6,
      "risk": "High",
      "zone": "Gulf of Khambhat"
    },
    {
      "name": "Jamnagar",
      "lat": 22.4707,
      "lon": 70.0577,
      "peakLst": 48.5,
      "uhiMean": 5.3,
      "risk": "Moderate",
      "zone": "Gulf of Kutch"
    },
    {
      "name": "Gandhinagar",
      "lat": 23.2156,
      "lon": 72.6369,
      "peakLst": 52.1,
      "uhiMean": 5.9,
      "risk": "High",
      "zone": "Capital Corridor"
    }
  ],
  "Ladakh": [
    {
      "name": "Leh",
      "lat": 34.1526,
      "lon": 77.5771,
      "peakLst": 24.5,
      "uhiMean": 2.8,
      "risk": "Low",
      "zone": "High-Altitude Cold Arid"
    },
    {
      "name": "Kargil",
      "lat": 34.5539,
      "lon": 76.1349,
      "peakLst": 26.2,
      "uhiMean": 3.0,
      "risk": "Low",
      "zone": "Suru River Valley"
    },
    {
      "name": "Diskit (Nubra)",
      "lat": 34.5428,
      "lon": 77.5619,
      "peakLst": 25.1,
      "uhiMean": 2.7,
      "risk": "Low",
      "zone": "Nubra Valley"
    },
    {
      "name": "Padum (Zanskar)",
      "lat": 33.4656,
      "lon": 76.8833,
      "peakLst": 21.8,
      "uhiMean": 2.2,
      "risk": "Low",
      "zone": "Zanskar Valley"
    },
    {
      "name": "Drass",
      "lat": 34.4294,
      "lon": 75.7533,
      "peakLst": 19.5,
      "uhiMean": 2.0,
      "risk": "Low",
      "zone": "Cold Steppe"
    }
  ],
  "Delhi": [
    {
      "name": "Delhi",
      "lat": 28.7041,
      "lon": 77.1025,
      "peakLst": 54.2,
      "uhiMean": 6.1,
      "risk": "Very high",
      "zone": "Composite Semi-Arid"
    },
    {
      "name": "Connaught Place",
      "lat": 28.6315,
      "lon": 77.2167,
      "peakLst": 53.8,
      "uhiMean": 6.0,
      "risk": "Very high",
      "zone": "Commercial Core"
    },
    {
      "name": "Anand Vihar",
      "lat": 28.6469,
      "lon": 77.316,
      "peakLst": 55.6,
      "uhiMean": 6.8,
      "risk": "Very high",
      "zone": "Transport Corridor"
    },
    {
      "name": "Okhla Industrial",
      "lat": 28.53,
      "lon": 77.27,
      "peakLst": 54.9,
      "uhiMean": 6.4,
      "risk": "Very high",
      "zone": "Industrial Area"
    },
    {
      "name": "Rohini",
      "lat": 28.73,
      "lon": 77.12,
      "peakLst": 54.5,
      "uhiMean": 6.2,
      "risk": "Very high",
      "zone": "Residential Dense"
    },
    {
      "name": "Dwarka",
      "lat": 28.552,
      "lon": 77.058,
      "peakLst": 53.6,
      "uhiMean": 5.9,
      "risk": "Very high",
      "zone": "Suburban Plain"
    }
  ],
  "Dadra and Nagar Haveli and Daman and Diu": [
    {
      "name": "Daman",
      "lat": 20.3974,
      "lon": 72.8328,
      "peakLst": 41.5,
      "uhiMean": 4.6,
      "risk": "Moderate",
      "zone": "Coastal Enclave"
    },
    {
      "name": "Diu",
      "lat": 20.7144,
      "lon": 70.9874,
      "peakLst": 39.2,
      "uhiMean": 4.1,
      "risk": "Moderate",
      "zone": "Arabian Shore"
    },
    {
      "name": "Silvassa",
      "lat": 20.2763,
      "lon": 73.0083,
      "peakLst": 44.8,
      "uhiMean": 5.3,
      "risk": "High",
      "zone": "Daman Ganga Basin"
    }
  ],
  "Daman & Diu": [
    {
      "name": "Daman",
      "lat": 20.3974,
      "lon": 72.8328,
      "peakLst": 41.5,
      "uhiMean": 4.6,
      "risk": "Moderate",
      "zone": "Coastal Enclave"
    },
    {
      "name": "Diu",
      "lat": 20.7144,
      "lon": 70.9874,
      "peakLst": 39.2,
      "uhiMean": 4.1,
      "risk": "Moderate",
      "zone": "Arabian Shore"
    }
  ],
  "Dadara & Nagar Havelli": [
    {
      "name": "Silvassa",
      "lat": 20.2763,
      "lon": 73.0083,
      "peakLst": 44.8,
      "uhiMean": 5.3,
      "risk": "High",
      "zone": "Daman Ganga Basin"
    }
  ],
  "Maharashtra": [
    {
      "name": "Mumbai",
      "lat": 19.076,
      "lon": 72.8777,
      "peakLst": 48.7,
      "uhiMean": 6.3,
      "risk": "Very high",
      "zone": "Coastal Mega-City"
    },
    {
      "name": "Pune",
      "lat": 18.5204,
      "lon": 73.8567,
      "peakLst": 45.3,
      "uhiMean": 5.2,
      "risk": "High",
      "zone": "Deccan Plateau"
    },
    {
      "name": "Nagpur",
      "lat": 21.1458,
      "lon": 79.0882,
      "peakLst": 55.7,
      "uhiMean": 7.2,
      "risk": "Very high",
      "zone": "Vidarbha Plateau"
    },
    {
      "name": "Nashik",
      "lat": 19.9975,
      "lon": 73.7898,
      "peakLst": 46.8,
      "uhiMean": 5.4,
      "risk": "High",
      "zone": "Godavari Basin"
    },
    {
      "name": "Aurangabad",
      "lat": 19.8762,
      "lon": 75.3433,
      "peakLst": 49.5,
      "uhiMean": 5.9,
      "risk": "High",
      "zone": "Marathwada Plain"
    },
    {
      "name": "Thane",
      "lat": 19.2183,
      "lon": 72.9781,
      "peakLst": 49.2,
      "uhiMean": 6.4,
      "risk": "Very high",
      "zone": "Ulhas Basin"
    },
    {
      "name": "Solapur",
      "lat": 17.6599,
      "lon": 75.9064,
      "peakLst": 52.4,
      "uhiMean": 6.5,
      "risk": "Very high",
      "zone": "Southern Plain"
    },
    {
      "name": "Kolhapur",
      "lat": 16.705,
      "lon": 74.2433,
      "peakLst": 43.6,
      "uhiMean": 4.9,
      "risk": "Moderate",
      "zone": "Panchganga Valley"
    },
    {
      "name": "Amravati",
      "lat": 20.9374,
      "lon": 77.7796,
      "peakLst": 54.1,
      "uhiMean": 6.8,
      "risk": "Very high",
      "zone": "Vidarbha Plain"
    }
  ],
  "Goa": [
    {
      "name": "Panaji",
      "lat": 15.4909,
      "lon": 73.8278,
      "peakLst": 38.6,
      "uhiMean": 4.2,
      "risk": "Moderate",
      "zone": "Mandovi Estuary"
    },
    {
      "name": "Margao",
      "lat": 15.2832,
      "lon": 73.9862,
      "peakLst": 39.2,
      "uhiMean": 4.4,
      "risk": "Moderate",
      "zone": "Salcete Coastal"
    },
    {
      "name": "Vasco da Gama",
      "lat": 15.3982,
      "lon": 73.8113,
      "peakLst": 38.9,
      "uhiMean": 4.3,
      "risk": "Moderate",
      "zone": "Mormugao Port"
    }
  ],
  "Karnataka": [
    {
      "name": "Bengaluru",
      "lat": 12.9716,
      "lon": 77.5946,
      "peakLst": 43.9,
      "uhiMean": 3.9,
      "risk": "Moderate",
      "zone": "Mysore Plateau"
    },
    {
      "name": "Mysuru",
      "lat": 12.2958,
      "lon": 76.6394,
      "peakLst": 41.5,
      "uhiMean": 4.3,
      "risk": "Moderate",
      "zone": "Cauvery Basin"
    },
    {
      "name": "Hubballi",
      "lat": 15.3647,
      "lon": 75.124,
      "peakLst": 46.8,
      "uhiMean": 5.4,
      "risk": "High",
      "zone": "Northern Plateau"
    },
    {
      "name": "Mangaluru",
      "lat": 12.9141,
      "lon": 74.856,
      "peakLst": 39.8,
      "uhiMean": 4.4,
      "risk": "Moderate",
      "zone": "Coastal Canara"
    },
    {
      "name": "Belagavi",
      "lat": 15.8497,
      "lon": 74.4977,
      "peakLst": 42.2,
      "uhiMean": 4.5,
      "risk": "Moderate",
      "zone": "Western Ghats Border"
    },
    {
      "name": "Kalaburagi",
      "lat": 17.3297,
      "lon": 76.8343,
      "peakLst": 52.8,
      "uhiMean": 6.8,
      "risk": "Very high",
      "zone": "Hyderabad-Karnataka Plain"
    },
    {
      "name": "Ballari",
      "lat": 15.1394,
      "lon": 76.9214,
      "peakLst": 51.5,
      "uhiMean": 6.4,
      "risk": "Very high",
      "zone": "Tungabhadra Basin"
    }
  ],
  "Andhra Pradesh": [
    {
      "name": "Visakhapatnam",
      "lat": 17.6868,
      "lon": 83.2185,
      "peakLst": 47.5,
      "uhiMean": 5.4,
      "risk": "High",
      "zone": "Eastern Coastal Bay"
    },
    {
      "name": "Vijayawada",
      "lat": 16.5062,
      "lon": 80.648,
      "peakLst": 53.8,
      "uhiMean": 6.6,
      "risk": "Very high",
      "zone": "Krishna Delta"
    },
    {
      "name": "Guntur",
      "lat": 16.3067,
      "lon": 80.4365,
      "peakLst": 52.9,
      "uhiMean": 6.4,
      "risk": "Very high",
      "zone": "Coastal Plains"
    },
    {
      "name": "Tirupati",
      "lat": 13.6288,
      "lon": 79.4192,
      "peakLst": 49.2,
      "uhiMean": 5.7,
      "risk": "High",
      "zone": "Rayalaseema Foothills"
    },
    {
      "name": "Kurnool",
      "lat": 15.8281,
      "lon": 78.0373,
      "peakLst": 54.2,
      "uhiMean": 6.8,
      "risk": "Very high",
      "zone": "Tungabhadra Basin"
    },
    {
      "name": "Nellore",
      "lat": 14.4426,
      "lon": 79.9865,
      "peakLst": 50.8,
      "uhiMean": 5.9,
      "risk": "High",
      "zone": "Pennar Delta"
    }
  ],
  "Telangana": [
    {
      "name": "Hyderabad",
      "lat": 17.385,
      "lon": 78.4867,
      "peakLst": 48.4,
      "uhiMean": 5.0,
      "risk": "High",
      "zone": "Deccan Plateau"
    },
    {
      "name": "Warangal",
      "lat": 17.9689,
      "lon": 79.5941,
      "peakLst": 51.5,
      "uhiMean": 5.9,
      "risk": "High",
      "zone": "Kakatiya Plains"
    },
    {
      "name": "Nizamabad",
      "lat": 18.6725,
      "lon": 78.0941,
      "peakLst": 51.0,
      "uhiMean": 5.8,
      "risk": "High",
      "zone": "Godavari Basin"
    },
    {
      "name": "Karimnagar",
      "lat": 18.4386,
      "lon": 79.1288,
      "peakLst": 52.2,
      "uhiMean": 6.1,
      "risk": "Very high",
      "zone": "Manair Basin"
    },
    {
      "name": "Khammam",
      "lat": 17.2473,
      "lon": 80.1514,
      "peakLst": 52.8,
      "uhiMean": 6.3,
      "risk": "Very high",
      "zone": "Munneru Basin"
    },
    {
      "name": "Ramagundam",
      "lat": 18.8038,
      "lon": 79.4526,
      "peakLst": 53.6,
      "uhiMean": 6.6,
      "risk": "Very high",
      "zone": "Coal & Power Belt"
    }
  ],
  "Tamil Nadu": [
    {
      "name": "Chennai",
      "lat": 13.0827,
      "lon": 80.2707,
      "peakLst": 52.3,
      "uhiMean": 6.3,
      "risk": "Very high",
      "zone": "Coromandel Coast"
    },
    {
      "name": "Coimbatore",
      "lat": 11.0168,
      "lon": 76.9558,
      "peakLst": 43.8,
      "uhiMean": 4.6,
      "risk": "Moderate",
      "zone": "Noyyal Valley"
    },
    {
      "name": "Madurai",
      "lat": 9.9252,
      "lon": 78.1198,
      "peakLst": 51.6,
      "uhiMean": 6.1,
      "risk": "High",
      "zone": "Vaigai Basin"
    },
    {
      "name": "Tiruchirappalli",
      "lat": 10.7905,
      "lon": 78.7047,
      "peakLst": 52.8,
      "uhiMean": 6.4,
      "risk": "Very high",
      "zone": "Cauvery Delta"
    },
    {
      "name": "Salem",
      "lat": 11.6643,
      "lon": 78.146,
      "peakLst": 49.5,
      "uhiMean": 5.7,
      "risk": "High",
      "zone": "Shevaroy Basin"
    },
    {
      "name": "Tirunelveli",
      "lat": 8.7139,
      "lon": 77.7567,
      "peakLst": 48.9,
      "uhiMean": 5.5,
      "risk": "High",
      "zone": "Thamirabarani Valley"
    },
    {
      "name": "Vellore",
      "lat": 12.9165,
      "lon": 79.1325,
      "peakLst": 53.2,
      "uhiMean": 6.5,
      "risk": "Very high",
      "zone": "Palar Basin"
    }
  ],
  "Puducherry": [
    {
      "name": "Puducherry",
      "lat": 11.9416,
      "lon": 79.8083,
      "peakLst": 47.8,
      "uhiMean": 5.3,
      "risk": "High",
      "zone": "Coromandel Coastal Shore"
    },
    {
      "name": "Karaikal",
      "lat": 10.9254,
      "lon": 79.838,
      "peakLst": 46.5,
      "uhiMean": 5.0,
      "risk": "High",
      "zone": "Cauvery Delta Shore"
    }
  ],
  "Kerala": [
    {
      "name": "Thiruvananthapuram",
      "lat": 8.5241,
      "lon": 76.9366,
      "peakLst": 38.5,
      "uhiMean": 4.2,
      "risk": "Moderate",
      "zone": "Southern Coastal Plain"
    },
    {
      "name": "Kochi",
      "lat": 9.9312,
      "lon": 76.2673,
      "peakLst": 39.8,
      "uhiMean": 4.6,
      "risk": "Moderate",
      "zone": "Vembanad Estuary"
    },
    {
      "name": "Kozhikode",
      "lat": 11.2588,
      "lon": 75.7804,
      "peakLst": 39.2,
      "uhiMean": 4.4,
      "risk": "Moderate",
      "zone": "Malabar Coast"
    },
    {
      "name": "Thrissur",
      "lat": 10.5276,
      "lon": 76.2144,
      "peakLst": 40.5,
      "uhiMean": 4.8,
      "risk": "Moderate",
      "zone": "Central Lowlands"
    },
    {
      "name": "Kollam",
      "lat": 8.8932,
      "lon": 76.6141,
      "peakLst": 38.8,
      "uhiMean": 4.3,
      "risk": "Moderate",
      "zone": "Ashtamudi Shore"
    },
    {
      "name": "Palakkad",
      "lat": 10.7867,
      "lon": 76.6548,
      "peakLst": 44.5,
      "uhiMean": 5.6,
      "risk": "High",
      "zone": "Palghat Gap Basin"
    }
  ],
  "Lakshadweep": [
    {
      "name": "Kavaratti",
      "lat": 10.5667,
      "lon": 72.6417,
      "peakLst": 33.0,
      "uhiMean": 3.4,
      "risk": "Moderate",
      "zone": "Coral Atoll"
    },
    {
      "name": "Agatti",
      "lat": 10.8533,
      "lon": 72.1917,
      "peakLst": 32.8,
      "uhiMean": 3.3,
      "risk": "Moderate",
      "zone": "Coral Atoll"
    }
  ],
  "Andaman & Nicobar Island": [
    {
      "name": "Port Blair",
      "lat": 11.6234,
      "lon": 92.7265,
      "peakLst": 34.0,
      "uhiMean": 3.6,
      "risk": "Moderate",
      "zone": "Island Marine"
    },
    {
      "name": "Diglipur",
      "lat": 13.2667,
      "lon": 92.9667,
      "peakLst": 33.2,
      "uhiMean": 3.4,
      "risk": "Moderate",
      "zone": "North Andaman Marine"
    }
  ]
} as const;

export function getCitiesForState(stateName: string): readonly StateCityStation[] {
  const normalized = stateName.toLowerCase().replace(/[^a-z]/g, "");
  for (const [key, cities] of Object.entries(ALL_STATE_CITIES)) {
    const k = key.toLowerCase().replace(/[^a-z]/g, "");
    if (k === normalized || k.includes(normalized) || normalized.includes(k)) {
      return cities;
    }
  }
  return [];
}
