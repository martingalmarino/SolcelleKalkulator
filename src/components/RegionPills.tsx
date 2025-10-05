"use client";
import React from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { priceData, FylkeType } from "@/lib/priceData";
import Link from "next/link";

interface RegionPillProps {
  fylke: FylkeType;
  price: number;
}

function RegionPill({ fylke, price }: RegionPillProps) {
  const slug = fylke.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <Link 
      href={`/solcelle-kalkulator/${slug}`}
      className="group relative flex items-center gap-3 px-4 py-3 bg-white border-2 border-blue-200 hover:border-blue-600 hover:bg-blue-600 text-blue-700 hover:text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
    >
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        <span className="font-semibold text-sm md:text-base">{fylke}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xs md:text-sm font-medium">{price} NOK/kWh</span>
        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </Link>
  );
}

export default function RegionPills() {
  const fylker = Object.entries(priceData) as [FylkeType, number][];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Velg ditt fylke
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Få tilpassede beregninger og støtteinformasjon for ditt område
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {fylker.map(([fylke, price]) => (
            <RegionPill key={fylke} fylke={fylke} price={price} />
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Ikke funnet ditt fylke?{" "}
            <Link 
              href="/solcelle-kalkulator" 
              className="text-blue-600 hover:text-blue-700 font-medium underline"
            >
              Se alle tilgjengelige områder
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
