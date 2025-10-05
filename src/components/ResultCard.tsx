"use client";
import React from "react";
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Gift, 
  MapPin, 
  Calculator,
  Mail,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
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

  const getPaybackStatus = (years: number) => {
    if (years <= 8) return {
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: CheckCircle2,
      message: "Utmerket investering!",
      badge: "Anbefalt"
    };
    if (years <= 12) return {
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: Clock,
      message: "God investering",
      badge: "OK"
    };
    return {
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: AlertCircle,
      message: "Vurder alternativer",
      badge: "Vurder"
    };
  };

  const paybackStatus = getPaybackStatus(result.paybackYears);
  const StatusIcon = paybackStatus.icon;

  return (
    <div className="mt-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 md:px-8 py-4 md:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
              <Calculator className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg md:text-xl font-bold text-white">Dine resultater</h3>
              <p className="text-blue-100 flex items-center gap-1 text-sm md:text-base">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span className="truncate">{fylke} fylke</span>
              </p>
            </div>
          </div>
          <div className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${paybackStatus.bgColor} ${paybackStatus.color} border ${paybackStatus.borderColor} flex-shrink-0`}>
            {paybackStatus.badge}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Annual Savings */}
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100 shadow-lg">
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm md:text-base">Årlig besparelse</h4>
                <p className="text-xs md:text-sm text-gray-600">På strømregningen</p>
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-green-600">
              {formatCurrency(result.annualSavings)}
            </div>
          </div>

          {/* Payback Period */}
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100 shadow-lg">
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className={`w-10 h-10 md:w-12 md:h-12 ${paybackStatus.bgColor} rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0`}>
                <StatusIcon className={`w-5 h-5 md:w-6 md:h-6 ${paybackStatus.color}`} />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm md:text-base">Tilbakebetalingstid</h4>
                <p className="text-xs md:text-sm text-gray-600">{paybackStatus.message}</p>
              </div>
            </div>
            <div className={`text-2xl md:text-3xl font-bold ${paybackStatus.color}`}>
              {formatYears(result.paybackYears)}
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100 shadow-lg mb-6 md:mb-8">
          <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
            <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            Kostnadsoversikt
          </h4>
          <div className="space-y-3 md:space-y-4">
            <div className="flex justify-between items-center py-2 md:py-3 border-b border-gray-100">
              <span className="text-gray-600 text-sm md:text-base">Systemkostnad</span>
              <span className="font-semibold text-gray-900 text-sm md:text-base">{formatCurrency(result.systemCost)}</span>
            </div>
            <div className="flex justify-between items-center py-2 md:py-3 border-b border-gray-100">
              <span className="text-gray-600 flex items-center gap-2 text-sm md:text-base">
                <Gift className="w-3 h-3 md:w-4 md:h-4 text-green-600 flex-shrink-0" />
                Støtte fra Enova
              </span>
              <span className="font-semibold text-green-600 text-sm md:text-base">-{formatCurrency(result.enovaSupport)}</span>
            </div>
            {result.localSupport > 0 && (
              <div className="flex justify-between items-center py-2 md:py-3 border-b border-gray-100">
                <span className="text-gray-600 flex items-center gap-2 text-sm md:text-base">
                  <Gift className="w-3 h-3 md:w-4 md:h-4 text-green-600 flex-shrink-0" />
                  Lokal støtte
                </span>
                <span className="font-semibold text-green-600 text-sm md:text-base">-{formatCurrency(result.localSupport)}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2 md:py-3 bg-blue-50 rounded-lg md:rounded-xl px-3 md:px-4">
              <span className="font-semibold text-gray-900 text-sm md:text-base">Netto kostnad</span>
              <span className="text-xl md:text-2xl font-bold text-blue-600">{formatCurrency(result.netCost)}</span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className="group relative w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg mb-3 md:mb-4">
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <Mail className="w-4 h-4 md:w-5 md:h-5" />
              Kontakt installatør
            </div>
          </button>
          <p className="text-xs md:text-sm text-gray-600">
            Få tilbud fra lokale installatører i {fylke}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 px-4 md:px-8 py-3 md:py-4 border-t border-gray-100">
        <div className="flex items-start gap-2 md:gap-3">
          <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs md:text-sm text-gray-600">
            <strong>Merk:</strong> Beregningene er estimater basert på gjennomsnittlige forhold. 
            Faktiske resultater kan variere avhengig av lokale forhold og installasjonskvalitet.
          </p>
        </div>
      </div>
    </div>
  );
}
