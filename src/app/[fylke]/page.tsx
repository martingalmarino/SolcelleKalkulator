import { Metadata } from "next";
import { notFound } from "next/navigation";
import Calculator from "@/components/Calculator";
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Solcelle Kalkulator</h1>
              <p className="text-text-secondary text-sm">Beregn din besparelse i {fylkeName}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-secondary">🇳🇴 {fylkeName}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Solceller i {fylkeName}
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Beregn din besparelse med solceller i {fylkeName}. 
              Få oversikt over tilgjengelig støtte og tilbakebetalingstid for ditt område.
            </p>
          </div>

          {/* Fylke-specific info */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-card text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-text-primary mb-2">Strømpris</h3>
              <p className="text-2xl font-bold text-primary">{powerPrice} NOK/kWh</p>
              <p className="text-sm text-text-secondary mt-1">Gjennomsnittlig pris i {fylkeName}</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-card text-center">
              <div className="text-3xl mb-2">🏛️</div>
              <h3 className="font-semibold text-text-primary mb-2">Enova-støtte</h3>
              <p className="text-2xl font-bold text-secondary">{enovaSupport.baseGrantNOK.toLocaleString()} NOK</p>
              <p className="text-sm text-text-secondary mt-1">Grunnstøtte + {enovaSupport.perKWNOK} NOK/kW</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-card text-center">
              <div className="text-3xl mb-2">🏘️</div>
              <h3 className="font-semibold text-text-primary mb-2">Lokal støtte</h3>
              {localSupport ? (
                <>
                  <p className="text-2xl font-bold text-secondary">{localSupport.extraGrantNOK.toLocaleString()} NOK</p>
                  <p className="text-sm text-text-secondary mt-1">Ekstra tilskudd fra {fylkeName}</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold text-text-secondary">Ikke tilgjengelig</p>
                  <p className="text-sm text-text-secondary mt-1">Kontakt din kommune</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Calculator />
          </div>
        </div>
      </section>

      {/* Fylke-specific information */}
      <section className="py-12 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-text-primary mb-4">
                Solceller i {fylkeName}
              </h3>
              <div className="space-y-4 text-text-secondary">
                <p>
                  {fylkeName} har gode forhold for solcelleinstallasjon med gjennomsnittlig 
                  strømpris på {powerPrice} NOK/kWh. Dette gir deg en solid besparelse 
                  på strømregningen.
                </p>
                {localSupport && (
                  <p>
                    <strong>Lokal støtte:</strong> {localSupport.description}
                  </p>
                )}
                <p>
                  <strong>Enova-støtte:</strong> {enovaSupport.description}
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-text-primary mb-4">
                Neste steg
              </h3>
              <ol className="space-y-3 text-text-secondary">
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                  Bruk kalkulatoren for å beregne din besparelse
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                  Kontakt lokale installatører i {fylkeName}
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                  Søk om støtte fra Enova og din kommune
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                  Start din grønne energireise!
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm opacity-80">
              © 2024 Solcelle Kalkulator. Beregningene er estimater basert på gjennomsnittlige forhold i {fylkeName}.
            </p>
            <p className="text-xs opacity-60 mt-2">
              Faktiske resultater kan variere avhengig av lokale forhold og installasjonskvalitet.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
