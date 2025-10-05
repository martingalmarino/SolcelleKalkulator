"use client";
import React, { useState } from "react";
import { calcROI, ROICalculationResult } from "../lib/calcROI";
import { priceData, FylkeType } from "../lib/priceData";
import { fetchSolarData } from "../lib/pvgisClient";
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
      // Fetch solar data from PVGIS API
      const solarData = await fetchSolarData(fylke, systemSize);
      
      // Calculate ROI
      const roi = calcROI({
        fylke,
        systemSizeKW: systemSize,
        annualProductionKWh: solarData.annualProductionKWh
      });
      
      setResult(roi);
    } catch (err) {
      setError("Kunne ikke hente solcelledata. Prøv igjen senere.");
      console.error("Calculation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fylkeOptions = Object.keys(priceData) as FylkeType[];

  return (
    <div className="bg-white rounded-lg shadow-card p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-primary mb-2">
          Solcelle Kalkulator
        </h2>
        <p className="text-text-secondary text-sm">
          Beregn din besparelse og tilbakebetalingstid
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Velg fylke
          </label>
          <select 
            value={fylke} 
            onChange={(e) => setFylke(e.target.value as FylkeType)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {fylkeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Systemstørrelse (kW)
          </label>
          <input 
            type="number" 
            value={systemSize} 
            onChange={(e) => setSystemSize(Number(e.target.value))}
            min="1"
            max="50"
            step="0.5"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="F.eks. 5"
          />
          <p className="text-xs text-text-secondary mt-1">
            Typisk husholdning: 3-8 kW
          </p>
        </div>

        <button 
          onClick={handleCalculate}
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors duration-200"
        >
          {isLoading ? "Beregner..." : "Beregn besparelse"}
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {result && <ResultCard result={result} fylke={fylke} />}
      </div>
    </div>
  );
}
