import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Zap, Building2, TrendingUp } from "lucide-react";
import Calculator from "@/components/Calculator";
import InfoSections from "@/components/InfoSections";
import Footer from "@/components/Footer";
import { priceData, FylkeType } from "@/lib/priceData";
import { incentivesData } from "@/lib/incentivesData";

interface FylkePageProps {
  params: {
    fylke: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(priceData).map((fylke) => ({
    fylke: fylke.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: FylkePageProps): Promise<Metadata> {
  const fylkeKey = Object.keys(priceData).find(
    key => key.toLowerCase().replace(/\s+/g, '-') === params.fylke
  ) as FylkeType;

  if (!fylkeKey) {
    return {
      title: "Fylke ikke funnet",
    };
  }

  const fylkeName = fylkeKey;
  const localSupport = incentivesData.local[fylkeKey]?.extraGrantNOK || 0;
  const powerPrice = priceData[fylkeKey];

  return {
    title: `Solcelle Kalkulator ${fylkeName} - Beregn besparelse og støtte`,
    description: `Beregn din solcelle-besparing i ${fylkeName}. Strømpris: ${powerPrice} NOK/kWh. Lokal støtte: ${localSupport > 0 ? localSupport + ' NOK' : 'Ikke tilgjengelig'}. Få oversikt over Enova-støtte og tilbakebetalingstid.`,
    keywords: `solceller ${fylkeName}, Enova støtte, lokal tilskudd, strømpris ${fylkeName}, fornybar energi`,
    openGraph: {
      title: `Solcelle Kalkulator ${fylkeName}`,
      description: `Beregn din solcelle-besparing i ${fylkeName} med lokal støtte og Enova-tilskudd`,
      type: "website",
      locale: "nb_NO",
    },
  };
}

export default function FylkePage({ params }: FylkePageProps) {
  const fylkeKey = Object.keys(priceData).find(
    key => key.toLowerCase().replace(/\s+/g, '-') === params.fylke
  ) as FylkeType;

  if (!fylkeKey) {
    notFound();
  }

  const fylkeName = fylkeKey;
  const powerPrice = priceData[fylkeKey];
  const localSupport = incentivesData.local[fylkeKey];
  const enovaSupport = incentivesData.enova;

  return (
    <div className="min-h-screen bg-white">
      {/* Fylke Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 lg:py-32">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              {fylkeName} fylke
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Solceller i{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                {fylkeName}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Beregn din besparelse med solceller i {fylkeName}. 
              Få oversikt over tilgjengelig støtte og tilbakebetalingstid for ditt område.
            </p>
          </div>

          {/* Fylke-specific info cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Strømpris</h3>
              <p className="text-3xl font-bold text-blue-600 mb-2">{powerPrice} NOK/kWh</p>
              <p className="text-gray-600">Gjennomsnittlig pris i {fylkeName}</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enova-støtte</h3>
              <p className="text-3xl font-bold text-green-600 mb-2">{enovaSupport.baseGrantNOK.toLocaleString()} NOK</p>
              <p className="text-gray-600">Grunnstøtte + {enovaSupport.perKWNOK} NOK/kW</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lokal støtte</h3>
              {localSupport ? (
                <>
                  <p className="text-3xl font-bold text-green-600 mb-2">{localSupport.extraGrantNOK.toLocaleString()} NOK</p>
                  <p className="text-gray-600">Ekstra tilskudd fra {fylkeName}</p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-gray-600 mb-2">Ikke tilgjengelig</p>
                  <p className="text-gray-600">Kontakt din kommune</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Calculator />
      <InfoSections />
      <Footer />
    </div>
  );
}
