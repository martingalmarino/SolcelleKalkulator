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
    <div className="min-h-screen bg-background">
      {/* Fylke Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-success-50 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              {fylkeName} fylke
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Solceller i{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-success-600">
                {fylkeName}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              Beregn din besparelse med solceller i {fylkeName}. 
              Få oversikt over tilgjengelig støtte og tilbakebetalingstid for ditt område.
            </p>
          </div>

          {/* Fylke-specific info cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-elevated border border-border-muted text-center group hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Strømpris</h3>
              <p className="text-3xl font-bold text-primary-600 mb-2">{powerPrice} NOK/kWh</p>
              <p className="text-text-secondary">Gjennomsnittlig pris i {fylkeName}</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-elevated border border-border-muted text-center group hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-success-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-8 h-8 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Enova-støtte</h3>
              <p className="text-3xl font-bold text-success-600 mb-2">{enovaSupport.baseGrantNOK.toLocaleString()} NOK</p>
              <p className="text-text-secondary">Grunnstøtte + {enovaSupport.perKWNOK} NOK/kW</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-elevated border border-border-muted text-center group hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-success-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Lokal støtte</h3>
              {localSupport ? (
                <>
                  <p className="text-3xl font-bold text-success-600 mb-2">{localSupport.extraGrantNOK.toLocaleString()} NOK</p>
                  <p className="text-text-secondary">Ekstra tilskudd fra {fylkeName}</p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-text-secondary mb-2">Ikke tilgjengelig</p>
                  <p className="text-text-secondary">Kontakt din kommune</p>
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
