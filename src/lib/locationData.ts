// Coordinates for Norwegian fylker and kommuner
// Used for PVGIS API calls to get accurate solar production data

export const locationData = {
  // Fylke coordinates (capital cities)
  "Oslo": { lat: 59.9139, lon: 10.7522 },
  "Viken": { lat: 59.7454, lon: 10.6450 }, // Drammen as main city
  "Vestland": { lat: 60.3913, lon: 5.3221 }, // Bergen
  "Trøndelag": { lat: 63.4305, lon: 10.3951 }, // Trondheim
  "Rogaland": { lat: 58.9690, lon: 5.7331 }, // Stavanger
  "Agder": { lat: 58.1464, lon: 7.9956 }, // Kristiansand
  "Møre og Romsdal": { lat: 62.4722, lon: 6.1549 }, // Ålesund
  "Nordland": { lat: 67.2804, lon: 14.4049 }, // Bodø
  "Troms og Finnmark": { lat: 69.6492, lon: 18.9553 }, // Tromsø
  "Innlandet": { lat: 60.7945, lon: 11.0680 }, // Hamar
  "Telemark": { lat: 59.2096, lon: 9.6080 }, // Skien

  // Kommune coordinates (Oslo is already defined above)
  
  // Viken kommuner
  "Bærum": { lat: 59.9139, lon: 10.5022 },
  "Drammen": { lat: 59.7454, lon: 10.6450 },
  "Fredrikstad": { lat: 59.2181, lon: 10.9378 },
  "Sarpsborg": { lat: 59.2839, lon: 11.1097 },
  "Asker": { lat: 59.8367, lon: 10.4378 },
  
  // Vestland kommuner
  "Bergen": { lat: 60.3913, lon: 5.3221 },
  "Askøy": { lat: 60.4667, lon: 5.2000 },
  "Øygarden": { lat: 60.5833, lon: 4.9167 },
  
  // Trøndelag kommuner
  "Trondheim": { lat: 63.4305, lon: 10.3951 },
  "Stjørdal": { lat: 63.4667, lon: 10.9167 },
  "Steinkjer": { lat: 64.0167, lon: 11.5000 },
  
  // Rogaland kommuner
  "Stavanger": { lat: 58.9690, lon: 5.7331 },
  "Sandnes": { lat: 58.8500, lon: 5.7331 },
  "Haugesund": { lat: 59.4139, lon: 5.2681 },
  
  // Agder kommuner
  "Kristiansand": { lat: 58.1464, lon: 7.9956 },
  "Arendal": { lat: 58.4618, lon: 8.7669 },
  "Grimstad": { lat: 58.3406, lon: 8.5931 },
  
  // Møre og Romsdal kommuner
  "Ålesund": { lat: 62.4722, lon: 6.1549 },
  "Molde": { lat: 62.7333, lon: 7.1500 },
  "Kristiansund": { lat: 63.1167, lon: 7.7333 },
  
  // Nordland kommuner
  "Bodø": { lat: 67.2804, lon: 14.4049 },
  "Mo i Rana": { lat: 66.3167, lon: 14.1667 },
  
  // Troms og Finnmark kommuner
  "Tromsø": { lat: 69.6492, lon: 18.9553 },
  "Alta": { lat: 69.9689, lon: 23.2717 },
  
  // Innlandet kommuner
  "Hamar": { lat: 60.7945, lon: 11.0680 },
  "Lillehammer": { lat: 61.1167, lon: 10.4667 },
  "Gjøvik": { lat: 60.7833, lon: 10.7000 },
  
  // Telemark kommuner
  "Skien": { lat: 59.2096, lon: 9.6080 },
  "Porsgrunn": { lat: 59.1333, lon: 9.6500 }
};

// Fallback production values per kW (kWh/year) for different regions
// Used when PVGIS API fails
export const fallbackProductionPerKW = {
  "Oslo": 950,
  "Viken": 920,
  "Vestland": 900,
  "Trøndelag": 850,
  "Rogaland": 930,
  "Agder": 940,
  "Møre og Romsdal": 880,
  "Nordland": 800,
  "Troms og Finnmark": 750,
  "Innlandet": 860,
  "Telemark": 880
};

export type LocationType = keyof typeof locationData;
