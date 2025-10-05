"use client";
import React from "react";
import { ROICalculationResult } from "../lib/calcROI";
import { FylkeType } from "../lib/priceData";

interface ResultCardProps {
  result: ROICalculationResult;
  fylke: FylkeType;
}

export default function ResultCard({ result, fylke }: ResultCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nb-NO', {
      style: 'currency',
      currency: 'NOK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatYears = (years: number) => {
    if (years < 1) {
      return `${Math.round(years * 12)} måneder`;
    }
    return `${years.toFixed(1)} år`;
  };

  const getPaybackColor = (years: number) => {
    if (years <= 8) return "text-secondary";
    if (years <= 12) return "text-yellow-600";
    return "text-red-600";
  };

  const getPaybackMessage = (years: number) => {
    if (years <= 8) return "Utmerket investering!";
    if (years <= 12) return "God investering";
    return "Vurder alternativer";
  };

  return (
    <div className="mt-6 bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-primary mb-2">
          Dine resultater
        </h3>
        <p className="text-sm text-text-secondary">
          Basert på {fylke} fylke
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-text-primary font-medium">Årlig besparelse:</span>
          <span className="text-lg font-bold text-secondary">
            {formatCurrency(result.annualSavings)}
          </span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-text-primary font-medium">Tilbakebetalingstid:</span>
          <div className="text-right">
            <span className={`text-lg font-bold ${getPaybackColor(result.paybackYears)}`}>
              {formatYears(result.paybackYears)}
            </span>
            <p className="text-xs text-text-secondary">
              {getPaybackMessage(result.paybackYears)}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-text-primary font-medium">Systemkostnad:</span>
          <span className="text-text-primary">
            {formatCurrency(result.systemCost)}
          </span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-text-primary font-medium">Støtte fra Enova:</span>
          <span className="text-green-600 font-medium">
            {formatCurrency(result.enovaSupport)}
          </span>
        </div>

        {result.localSupport > 0 && (
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-text-primary font-medium">Lokal støtte:</span>
            <span className="text-green-600 font-medium">
              {formatCurrency(result.localSupport)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center py-2 bg-white rounded-lg px-3 py-2">
          <span className="text-text-primary font-semibold">Netto kostnad:</span>
          <span className="text-lg font-bold text-primary">
            {formatCurrency(result.netCost)}
          </span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg">
          📩 Kontakt installatør
        </button>
        <p className="text-xs text-text-secondary mt-2">
          Få tilbud fra lokale installatører i {fylke}
        </p>
      </div>

      <div className="mt-4 p-3 bg-blue-100 rounded-lg">
        <p className="text-xs text-blue-800">
          <strong>Merk:</strong> Beregningene er estimater basert på gjennomsnittlige forhold. 
          Faktiske resultater kan variere avhengig av lokale forhold og installasjonskvalitet.
        </p>
      </div>
    </div>
  );
}
