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
      color: "text-success-600",
      bgColor: "bg-success-50",
      borderColor: "border-success-200",
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
    <div className="mt-8 bg-gradient-to-br from-white to-background-muted rounded-3xl shadow-elevated border border-border-muted overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Dine resultater</h3>
              <p className="text-primary-100 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {fylke} fylke
              </p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${paybackStatus.bgColor} ${paybackStatus.color} border ${paybackStatus.borderColor}`}>
            {paybackStatus.badge}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Annual Savings */}
          <div className="bg-white rounded-2xl p-6 border border-border-muted shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success-600" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary">Årlig besparelse</h4>
                <p className="text-sm text-text-secondary">På strømregningen</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-success-600">
              {formatCurrency(result.annualSavings)}
            </div>
          </div>

          {/* Payback Period */}
          <div className="bg-white rounded-2xl p-6 border border-border-muted shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 ${paybackStatus.bgColor} rounded-xl flex items-center justify-center`}>
                <StatusIcon className={`w-6 h-6 ${paybackStatus.color}`} />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary">Tilbakebetalingstid</h4>
                <p className="text-sm text-text-secondary">{paybackStatus.message}</p>
              </div>
            </div>
            <div className={`text-3xl font-bold ${paybackStatus.color}`}>
              {formatYears(result.paybackYears)}
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-border-muted shadow-soft mb-8">
          <h4 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary-600" />
            Kostnadsoversikt
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-border-muted">
              <span className="text-text-secondary">Systemkostnad</span>
              <span className="font-semibold text-text-primary">{formatCurrency(result.systemCost)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border-muted">
              <span className="text-text-secondary flex items-center gap-2">
                <Gift className="w-4 h-4 text-success-600" />
                Støtte fra Enova
              </span>
              <span className="font-semibold text-success-600">-{formatCurrency(result.enovaSupport)}</span>
            </div>
            {result.localSupport > 0 && (
              <div className="flex justify-between items-center py-3 border-b border-border-muted">
                <span className="text-text-secondary flex items-center gap-2">
                  <Gift className="w-4 h-4 text-success-600" />
                  Lokal støtte
                </span>
                <span className="font-semibold text-success-600">-{formatCurrency(result.localSupport)}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-3 bg-primary-50 rounded-xl px-4">
              <span className="font-semibold text-text-primary">Netto kostnad</span>
              <span className="text-2xl font-bold text-primary-600">{formatCurrency(result.netCost)}</span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className="group relative w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg mb-4">
            <div className="flex items-center justify-center gap-3">
              <Mail className="w-5 h-5" />
              Kontakt installatør
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-800 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <p className="text-sm text-text-secondary">
            Få tilbud fra lokale installatører i {fylke}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-background-muted px-8 py-4 border-t border-border-muted">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-text-muted mt-0.5 flex-shrink-0" />
          <p className="text-sm text-text-secondary">
            <strong>Merk:</strong> Beregningene er estimater basert på gjennomsnittlige forhold. 
            Faktiske resultater kan variere avhengig av lokale forhold og installasjonskvalitet.
          </p>
        </div>
      </div>
    </div>
  );
}
