// Strømpris (NOK/kWh) estimados por fylke
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

export type FylkeType = keyof typeof priceData;
