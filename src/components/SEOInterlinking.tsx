"use client";
import React from "react";
import { ChevronRight, MapPin, ArrowRight } from "lucide-react";
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
          {/* Breadcrumbs */}
          <nav className="mb-12" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                  )}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-gray-900 font-medium">{crumb.name}</span>
                  ) : (
                    <Link 
                      href={crumb.href}
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Related Regions */}
          {relatedRegions.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                {kommune ? `Andre kommuner i ${fylke}` : 'Andre populære steder for solceller'}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                      className="group flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                          <MapPin className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {region.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {region.type === 'kommune' ? region.fylke : 'Fylke'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">
                          {price} NOK/kWh
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Additional Resources */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Flere ressurser
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/solcelle-kalkulator"
                className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                  Alle fylker
                </h4>
                <p className="text-sm text-gray-600">
                  Se oversikt over alle tilgjengelige fylker og deres strømpriser
                </p>
              </Link>
              
              <Link 
                href="#"
                className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                  Støtteordninger
                </h4>
                <p className="text-sm text-gray-600">
                  Lær mer om Enova-støtte og lokale tilskudd
                </p>
              </Link>
              
              <Link 
                href="#"
                className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
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
