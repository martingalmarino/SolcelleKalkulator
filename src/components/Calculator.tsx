"use client";
import React, { useState } from "react";
import { Calculator as CalculatorIcon, MapPin, Zap, Loader2 } from "lucide-react";
import { calcROI, ROICalculationResult } from "../lib/calcROI";
import { priceData, FylkeType } from "../lib/priceData";
import { locationData, fallbackProductionPerKW } from "../lib/locationData";
import ResultCard from "./ResultCard";

export default function Calculator() {
  const [fylke, setFylke] = useState<FylkeType>("Oslo");
  const [systemSize, setSystemSize] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ROICalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log(`Calculating ROI for ${fylke}, ${systemSize} kW system`);
      
      // Get location coordinates for the selected fylke
      const location = locationData[fylke];
      
      let annualProduction: number;
      
      if (location) {
        // Try to fetch real PVGIS data
        console.log(`Fetching PVGIS data for ${fylke} at lat: ${location.lat}, lon: ${location.lon}`);
        
        const { fetchAnnualProduction } = await import("../lib/pvgisClient");
        const pvgisProduction = await fetchAnnualProduction(location.lat, location.lon, systemSize);
        
        if (pvgisProduction !== null) {
          annualProduction = pvgisProduction;
          console.log(`Using PVGIS data: ${annualProduction} kWh/year`);
        } else {
          // Fallback to estimated production
          const fallbackProduction = fallbackProductionPerKW[fylke] || 900;
          annualProduction = systemSize * fallbackProduction;
          console.log(`Using fallback production: ${fallbackProduction} kWh/kW = ${annualProduction} kWh/year`);
        }
      } else {
        // No location data, use fallback
        const fallbackProduction = fallbackProductionPerKW[fylke] || 900;
        annualProduction = systemSize * fallbackProduction;
        console.log(`No location data for ${fylke}, using fallback: ${fallbackProduction} kWh/kW = ${annualProduction} kWh/year`);
      }

      // Calculate ROI with the production data
      const roi = calcROI({
        fylke,
        systemSizeKW: systemSize,
        annualProductionKWh: annualProduction
      });

      console.log(`ROI calculation result:`, roi);
      setResult(roi);
      
    } catch (err) {
      console.error("Calculation error:", err);
      setError("Kunne ikke hente solcelledata. Prøv igjen senere.");
      
      // Even if there's an error, try to provide a fallback calculation
      try {
        const fallbackProduction = fallbackProductionPerKW[fylke] || 900;
        const fallbackAnnualProduction = systemSize * fallbackProduction;
        
        const fallbackROI = calcROI({
          fylke,
          systemSizeKW: systemSize,
          annualProductionKWh: fallbackAnnualProduction
        });
        
        setResult(fallbackROI);
        setError("Bruker estimerte verdier - PVGIS data ikke tilgjengelig.");
      } catch (fallbackErr) {
        console.error("Fallback calculation also failed:", fallbackErr);
        setError("Kunne ikke beregne resultater. Prøv igjen senere.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fylkeOptions = Object.keys(priceData) as FylkeType[];

  return (
    <section id="calculator" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Calculator Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-6">
              <CalculatorIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Solcelle Kalkulator
            </h2>
            <p className="text-xl text-gray-600">
              Få en nøyaktig beregning av din potensielle besparelse
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 lg:p-12 border border-gray-100">
            <div className="space-y-6 md:space-y-8">
              {/* Fylke Selection */}
              <div className="space-y-2 md:space-y-3">
                <label className="flex items-center gap-2 text-base md:text-lg font-semibold text-gray-900">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  Velg ditt fylke
                </label>
                <select 
                  value={fylke} 
                  onChange={(e) => setFylke(e.target.value as FylkeType)}
                  className="w-full border-2 border-gray-200 rounded-lg md:rounded-xl px-3 md:px-4 py-3 md:py-4 text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                  title="Velg ditt fylke"
                >
                  {fylkeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* System Size Input */}
              <div className="space-y-2 md:space-y-3">
                <label className="flex items-center gap-2 text-base md:text-lg font-semibold text-gray-900">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  Systemstørrelse (kW)
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={systemSize} 
                    onChange={(e) => setSystemSize(Number(e.target.value))}
                    min="1"
                    max="50"
                    step="0.5"
                    className="w-full border-2 border-gray-200 rounded-lg md:rounded-xl px-3 md:px-4 py-3 md:py-4 text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-gray-50"
                    placeholder="F.eks. 5"
                  />
                  <div className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm md:text-base">
                    kW
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Typisk husholdning: 3-8 kW
                </p>
              </div>

              {/* Calculate Button */}
              <button 
                onClick={handleCalculate}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 md:py-4 rounded-lg md:rounded-xl font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:transform-none disabled:shadow-none"
              >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2 md:gap-3">
                      <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                      Henter solcelledata...
                    </div>
                  ) : (
                    "Beregn besparelse"
                  )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg md:rounded-xl p-3 md:p-4">
                  <p className="text-red-700 font-medium text-sm md:text-base">{error}</p>
                </div>
              )}

              {/* Results */}
              {result && (
                <div>
                  <ResultCard result={result} fylke={fylke} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
