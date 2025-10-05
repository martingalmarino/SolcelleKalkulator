// PVGIS API client for solar radiation data
// Example call: https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=59.9&lon=10.7&peakpower=5&loss=14

export interface PVGISResponse {
  outputs: {
    totals: {
      fixed: {
        E_y: number; // Annual kWh produced
      };
    };
  };
}

export interface SolarData {
  annualProductionKWh: number;
  peakSunHours: number;
}

// Coordinates for major cities in each fylke (for MVP)
export const fylkeCoordinates = {
  Oslo: { lat: 59.9139, lon: 10.7522 },
  Viken: { lat: 59.7458, lon: 10.2344 },
  Vestland: { lat: 60.3913, lon: 5.3221 },
  Trøndelag: { lat: 63.4305, lon: 10.3951 },
  Rogaland: { lat: 58.9700, lon: 5.7331 },
  Agder: { lat: 58.1467, lon: 7.9956 },
  "Møre og Romsdal": { lat: 62.4722, lon: 6.1549 },
  Nordland: { lat: 67.2804, lon: 14.4049 },
  "Troms og Finnmark": { lat: 69.6492, lon: 18.9553 },
  Innlandet: { lat: 60.7945, lon: 11.0680 },
  Telemark: { lat: 59.3914, lon: 8.7123 }
};

export async function fetchSolarData(
  fylke: keyof typeof fylkeCoordinates,
  systemSizeKW: number
): Promise<SolarData> {
  const coords = fylkeCoordinates[fylke];
  
  try {
    const response = await fetch(
      `https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=${coords.lat}&lon=${coords.lon}&peakpower=${systemSizeKW}&loss=14`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch solar data');
    }
    
    const data: PVGISResponse = await response.json();
    const annualProductionKWh = data.outputs.totals.fixed.E_y;
    const peakSunHours = annualProductionKWh / systemSizeKW;
    
    return {
      annualProductionKWh,
      peakSunHours
    };
  } catch (error) {
    console.error('Error fetching solar data:', error);
    // Fallback values based on typical Norwegian solar conditions
    const fallbackProduction = systemSizeKW * 800; // Conservative estimate
    return {
      annualProductionKWh: fallbackProduction,
      peakSunHours: 800
    };
  }
}
