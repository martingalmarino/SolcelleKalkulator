import React from "react";
import { Sun, Zap, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-success-50 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Beregn din{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-success-600">
                solcelle-besparing
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              Få oversikt over besparelse, tilbakebetalingstid og tilgjengelig støtte 
              fra Enova og din kommune. Start din grønne energireise i dag.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-text-muted">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-medium">PVGIS Data</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-success-500" />
              <span className="text-sm font-medium">Enova Støtte</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-medium">ROI Kalkulator</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              <span className="relative z-10">Start beregning</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button className="px-8 py-4 border-2 border-primary-200 hover:border-primary-300 text-primary-700 hover:text-primary-800 font-semibold rounded-xl transition-all duration-300 hover:bg-primary-50">
              Lær mer
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-100 rounded-full opacity-60 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-success-100 rounded-full opacity-60 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-primary-200 rounded-full opacity-40 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
    </section>
  );
}
