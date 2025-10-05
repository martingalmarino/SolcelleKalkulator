"use client";
import React from "react";
import { Sun, Zap, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 lg:py-32">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Beregn din{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                solcelle-besparing
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Få oversikt over besparelse, tilbakebetalingstid og tilgjengelig støtte 
              fra Enova og din kommune. Start din grønne energireise i dag.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-gray-500">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">PVGIS Data</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Enova Støtte</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">ROI Kalkulator</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-sm md:text-base"
            >
              <span className="relative z-10">Start beregning</span>
            </button>
            <button 
              onClick={() => document.getElementById('info-sections')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 md:px-8 py-3 md:py-4 border-2 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 font-semibold rounded-lg md:rounded-xl transition-all duration-300 hover:bg-blue-50 text-sm md:text-base"
            >
              Lær mer
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
