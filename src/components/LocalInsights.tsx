import React from "react";
import { Zap, Gift, MapPin, TrendingUp } from "lucide-react";
import { priceData, FylkeType } from "@/lib/priceData";
import { incentivesData } from "@/lib/incentivesData";

interface LocalInsightsProps {
  fylke: FylkeType;
  kommune?: string;
}

export default function LocalInsights({ fylke, kommune }: LocalInsightsProps) {
  const powerPrice = priceData[fylke];
  const enovaSupport = incentivesData.enova;
  const fylkeSupport = incentivesData.local[fylke];
  const kommuneSupport = kommune ? incentivesData.kommune[kommune as keyof typeof incentivesData.kommune] : null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nb-NO', {
      style: 'currency',
      currency: 'NOK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalSupport = enovaSupport.baseGrantNOK + 
    (fylkeSupport?.extraGrantNOK || 0) + 
    (kommuneSupport?.extraGrantNOK || 0);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lokale forhold i {kommune ? `${kommune}, ` : ''}{fylke}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oversikt over strømpriser og tilgjengelig støtte i ditt område
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Strømpris */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Strømpris</h3>
                <p className="text-sm text-gray-600">Gjennomsnittlig</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {powerPrice} NOK/kWh
            </div>
          </div>

          {/* Enova Støtte */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Enova Støtte</h3>
                <p className="text-sm text-gray-600">Grunnstøtte</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(enovaSupport.baseGrantNOK)}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              + {formatCurrency(enovaSupport.perKWNOK)}/kW
            </p>
          </div>

          {/* Fylke Støtte */}
          {fylkeSupport && (
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Fylke Støtte</h3>
                  <p className="text-sm text-gray-600">{fylke}</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(fylkeSupport.extraGrantNOK)}
              </div>
            </div>
          )}

          {/* Kommune Støtte */}
          {kommuneSupport && (
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Kommune Støtte</h3>
                  <p className="text-sm text-gray-600">{kommune}</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(kommuneSupport.extraGrantNOK)}
              </div>
            </div>
          )}
        </div>

        {/* Total Support Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">
              Total tilgjengelig støtte
            </h3>
            <div className="text-4xl font-bold mb-4">
              {formatCurrency(totalSupport)}
            </div>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Opptil {formatCurrency(totalSupport)} i støtte kan være tilgjengelig for ditt solcelleprosjekt 
              {kommune ? ` i ${kommune}, ${fylke}` : ` i ${fylke}`}. 
              Dette inkluderer Enova-støtte, fylkesstøtte og lokale tilskudd.
            </p>
          </div>
        </div>

        {/* Support Details */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Støttedetaljer
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Enova grunnstøtte</span>
                <span className="font-semibold text-gray-900">{formatCurrency(enovaSupport.baseGrantNOK)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Enova per kW</span>
                <span className="font-semibold text-gray-900">{formatCurrency(enovaSupport.perKWNOK)}/kW</span>
              </div>
              {fylkeSupport && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{fylke} fylke</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(fylkeSupport.extraGrantNOK)}</span>
                </div>
              )}
              {kommuneSupport && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{kommune} kommune</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(kommuneSupport.extraGrantNOK)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Viktig informasjon
            </h4>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <strong>Enova maksimum:</strong> {formatCurrency(enovaSupport.maxNOK)} per installasjon
              </p>
              <p>
                <strong>Strømpris:</strong> Basert på gjennomsnittlige markedspriser for {fylke}
              </p>
              <p>
                <strong>Støtte:</strong> Kan variere avhengig av systemstørrelse og lokale forhold
              </p>
              {fylkeSupport && (
                <p>
                  <strong>Fylke:</strong> {fylkeSupport.description}
                </p>
              )}
              {kommuneSupport && (
                <p>
                  <strong>Kommune:</strong> {kommuneSupport.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
