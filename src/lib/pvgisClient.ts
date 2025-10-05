// PVGIS API integration for accurate solar production data
// API endpoint: https://re.jrc.ec.europa.eu/api/v5_2/PVcalc
// No API key required - open data from European Commission

interface SolarData {
  annualProductionKWh: number;
  monthlyData?: number[]; // Optional monthly breakdown
}

interface PVGISResponse {
  outputs: {
    totals: {
      fixed: {
        E_y: number; // Annual energy production in kWh
      };
    };
  };
}

// Cache for PVGIS API responses
const cache = new Map<string, SolarData>();

// Generate cache key
function getCacheKey(lat: number, lon: number, systemSizeKW: number): string {
  return `${lat.toFixed(4)},${lon.toFixed(4)},${systemSizeKW}`;
}

// Fetch annual solar production from PVGIS API
export async function fetchAnnualProduction(
  lat: number, 
  lon: number, 
  systemSizeKW: number
): Promise<number | null> {
  const cacheKey = getCacheKey(lat, lon, systemSizeKW);
  
  // Check cache first
  if (cache.has(cacheKey)) {
    console.log(`Using cached PVGIS data for ${cacheKey}`);
    return cache.get(cacheKey)!.annualProductionKWh;
  }

  const url = `https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=${lat}&lon=${lon}&peakpower=${systemSizeKW}&loss=14&outputformat=json`;
  
  try {
    console.log(`Fetching PVGIS data from: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`PVGIS API error: ${response.status} ${response.statusText}`);
    }

    const data: PVGISResponse = await response.json();
    
    if (!data.outputs?.totals?.fixed?.E_y) {
      throw new Error('Invalid PVGIS response format');
    }

    const annualProduction = Math.round(data.outputs.totals.fixed.E_y);
    
    // Cache the result
    const solarData: SolarData = {
      annualProductionKWh: annualProduction
    };
    cache.set(cacheKey, solarData);
    
    console.log(`PVGIS data cached: ${annualProduction} kWh for ${systemSizeKW} kW system`);
    
    return annualProduction;
    
  } catch (error) {
    console.error('PVGIS fetch failed:', error);
    return null;
  }
}

// Legacy function for backward compatibility
export async function fetchSolarData(fylke: string, systemSizeKW: number): Promise<SolarData> {
  // Import location data dynamically to avoid circular dependencies
  const { locationData, fallbackProductionPerKW } = await import('./locationData');
  
  const location = locationData[fylke as keyof typeof locationData];
  
  if (!location) {
    console.warn(`No location data found for ${fylke}, using fallback`);
    const fallbackProduction = fallbackProductionPerKW[fylke as keyof typeof fallbackProductionPerKW] || 900;
    return {
      annualProductionKWh: systemSizeKW * fallbackProduction
    };
  }

  const annualProduction = await fetchAnnualProduction(
    location.lat, 
    location.lon, 
    systemSizeKW
  );

  if (annualProduction === null) {
    // Use fallback production
    const fallbackProduction = fallbackProductionPerKW[fylke as keyof typeof fallbackProductionPerKW] || 900;
    console.log(`Using fallback production: ${fallbackProduction} kWh/kW for ${fylke}`);
    return {
      annualProductionKWh: systemSizeKW * fallbackProduction
    };
  }

  return {
    annualProductionKWh: annualProduction
  };
}

// Clear cache (useful for testing or when cache becomes too large)
export function clearPVGISCache(): void {
  cache.clear();
  console.log('PVGIS cache cleared');
}

// Get cache size (for monitoring)
export function getCacheSize(): number {
  return cache.size;
}