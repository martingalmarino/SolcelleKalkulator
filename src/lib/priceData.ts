// Strømpris (NOK/kWh) estimados por fylke y kommune
// Valores de referencia para MVP. Se pueden actualizar con datos oficiales de SSB o Nord Pool.

export const priceData = {
  Oslo: 0.18,
  Viken: 0.19,
  Vestland: 0.20,
  Trøndelag: 0.17,
  Rogaland: 0.18,
  Agder: 0.18,
  "Møre og Romsdal": 0.19,
  Nordland: 0.17,
  "Troms og Finnmark": 0.16,
  Innlandet: 0.18,
  Telemark: 0.18
};

// Kommune data with pricing and parent fylke
export const kommuneData = {
  // Oslo
  "Oslo": { price: 0.18, fylke: "Oslo" },
  
  // Viken
  "Bærum": { price: 0.19, fylke: "Viken" },
  "Drammen": { price: 0.19, fylke: "Viken" },
  "Fredrikstad": { price: 0.19, fylke: "Viken" },
  "Sarpsborg": { price: 0.19, fylke: "Viken" },
  "Asker": { price: 0.19, fylke: "Viken" },
  
  // Vestland
  "Bergen": { price: 0.20, fylke: "Vestland" },
  "Askøy": { price: 0.20, fylke: "Vestland" },
  "Øygarden": { price: 0.20, fylke: "Vestland" },
  
  // Trøndelag
  "Trondheim": { price: 0.17, fylke: "Trøndelag" },
  "Stjørdal": { price: 0.17, fylke: "Trøndelag" },
  "Steinkjer": { price: 0.17, fylke: "Trøndelag" },
  
  // Rogaland
  "Stavanger": { price: 0.18, fylke: "Rogaland" },
  "Sandnes": { price: 0.18, fylke: "Rogaland" },
  "Haugesund": { price: 0.18, fylke: "Rogaland" },
  
  // Agder
  "Kristiansand": { price: 0.18, fylke: "Agder" },
  "Arendal": { price: 0.18, fylke: "Agder" },
  "Grimstad": { price: 0.18, fylke: "Agder" },
  
  // Møre og Romsdal
  "Ålesund": { price: 0.19, fylke: "Møre og Romsdal" },
  "Molde": { price: 0.19, fylke: "Møre og Romsdal" },
  "Kristiansund": { price: 0.19, fylke: "Møre og Romsdal" },
  
  // Nordland
  "Bodø": { price: 0.17, fylke: "Nordland" },
  "Mo i Rana": { price: 0.17, fylke: "Nordland" },
  
  // Troms og Finnmark
  "Tromsø": { price: 0.16, fylke: "Troms og Finnmark" },
  "Alta": { price: 0.16, fylke: "Troms og Finnmark" },
  
  // Innlandet
  "Hamar": { price: 0.18, fylke: "Innlandet" },
  "Lillehammer": { price: 0.18, fylke: "Innlandet" },
  "Gjøvik": { price: 0.18, fylke: "Innlandet" },
  
  // Telemark
  "Skien": { price: 0.18, fylke: "Telemark" },
  "Porsgrunn": { price: 0.18, fylke: "Telemark" }
};

export type FylkeType = keyof typeof priceData;
export type KommuneType = keyof typeof kommuneData;
