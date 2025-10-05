"use client";
import React from "react";
import { ChevronRight, MapPin, ArrowRight, TrendingUp, HelpCircle } from "lucide-react";
import Link from "next/link";
import { priceData, FylkeType } from "@/lib/priceData";
import { kommuneData, KommuneType } from "@/lib/priceData";

interface SEOInterlinkingProps {
  fylke?: FylkeType;
  kommune?: KommuneType;
}

export default function SEOInterlinking({ fylke, kommune }: SEOInterlinkingProps) {
  // Generate breadcrumbs
  const breadcrumbs = [
    { name: "Hjem", href: "/" },
    { name: "Solcelle Kalkulator", href: "/solcelle-kalkulator" }
  ];

  if (fylke) {
    const fylkeSlug = fylke.toLowerCase().replace(/\s+/g, '-');
    breadcrumbs.push({ name: fylke, href: `/solcelle-kalkulator/${fylkeSlug}` });
  }

  if (kommune) {
    const kommuneSlug = kommune.toLowerCase().replace(/\s+/g, '-');
    breadcrumbs.push({ name: kommune, href: `/solcelle-kalkulator/${fylke?.toLowerCase().replace(/\s+/g, '-')}/${kommuneSlug}` });
  }

  // Get related regions
  const getRelatedRegions = () => {
    if (kommune && fylke) {
      // If we're on a kommune page, show other kommuner in the same fylke
      const kommunerInFylke = Object.entries(kommuneData)
        .filter(([, data]) => data.fylke === fylke)
        .filter(([name]) => name !== kommune)
        .slice(0, 4)
        .map(([name]) => ({ name, type: 'kommune' as const, fylke }));
      
      return kommunerInFylke;
    } else if (fylke) {
      // If we're on a fylke page, show other fylker
      const otherFylker = Object.keys(priceData)
        .filter(name => name !== fylke)
        .slice(0, 5)
        .map(name => ({ name, type: 'fylke' as const }));
      
      return otherFylker;
    }
    
    return [];
  };

  const relatedRegions = getRelatedRegions();

  // Generate JSON-LD for breadcrumbs
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://solcellekalkulator.no${crumb.href}`
    }))
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Related Regions */}
          {relatedRegions.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {kommune ? `Andre kommuner i ${fylke}` : 'Andre populære steder for solceller'}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Utforsk andre områder i Norge for å sammenligne strømpriser og tilgjengelig støtte
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedRegions.map((region) => {
                  const href = region.type === 'kommune' 
                    ? `/solcelle-kalkulator/${region.fylke?.toLowerCase().replace(/\s+/g, '-')}/${region.name.toLowerCase().replace(/\s+/g, '-')}`
                    : `/solcelle-kalkulator/${region.name.toLowerCase().replace(/\s+/g, '-')}`;
                  
                  const price = region.type === 'kommune' 
                    ? kommuneData[region.name as KommuneType]?.price
                    : priceData[region.name as FylkeType];

                  return (
                    <Link
                      key={region.name}
                      href={href}
                      className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                          {region.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {region.type === 'kommune' ? region.fylke : 'Fylke'}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">Strømpris</span>
                          <span className="text-lg font-bold text-blue-600">
                            {price} NOK/kWh
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Additional Resources */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Flere ressurser
              </h3>
              <p className="text-gray-600">
                Utforsk mer informasjon om solceller og støtteordninger
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/solcelle-kalkulator"
                className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                  Alle fylker
                </h4>
                <p className="text-sm text-gray-600">
                  Se oversikt over alle tilgjengelige fylker og deres strømpriser
                </p>
              </Link>
              
              <Link 
                href="#"
                className="group p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300 mb-2">
                  Støtteordninger
                </h4>
                <p className="text-sm text-gray-600">
                  Lær mer om Enova-støtte og lokale tilskudd
                </p>
              </Link>
              
              <Link 
                href="#"
                className="group p-6 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 mb-2">
                  Ofte stilte spørsmål
                </h4>
                <p className="text-sm text-gray-600">
                  Få svar på vanlige spørsmål om solceller
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
