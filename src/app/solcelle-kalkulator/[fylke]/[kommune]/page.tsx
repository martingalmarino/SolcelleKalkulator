import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Zap, Building2, TrendingUp } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Calculator from "@/components/Calculator";
import LocalInsights from "@/components/LocalInsights";
import InfoSections from "@/components/InfoSections";
import FAQSection from "@/components/FAQSection";
import SEOInterlinking from "@/components/SEOInterlinking";
import Footer from "@/components/Footer";
import { kommuneData, KommuneType, priceData } from "@/lib/priceData";
import { incentivesData } from "@/lib/incentivesData";

interface KommunePageProps {
  params: {
    fylke: string;
    kommune: string;
  };
}

// Generate static params for all kommuner for SSG
export async function generateStaticParams() {
  const params: { fylke: string; kommune: string }[] = [];
  
  Object.entries(kommuneData).forEach(([kommune, data]) => {
    const fylkeSlug = data.fylke.toLowerCase().replace(/\s+/g, '-');
    const kommuneSlug = kommune.toLowerCase().replace(/\s+/g, '-');
    params.push({ fylke: fylkeSlug, kommune: kommuneSlug });
  });
  
  return params;
}

// Generate metadata for each kommune page
export async function generateMetadata({ params }: KommunePageProps): Promise<Metadata> {
  const kommuneKey = Object.keys(kommuneData).find(key => 
    key.toLowerCase().replace(/\s+/g, '-') === params.kommune
  );

  if (!kommuneKey) {
    return {
      title: "Side ikke funnet",
      description: "Den forespurte kommune-siden ble ikke funnet.",
    };
  }

  const kommuneName = kommuneKey;
  const kommuneInfo = kommuneData[kommuneKey as KommuneType];
  const fylkeName = kommuneInfo.fylke;
  const powerPrice = kommuneInfo.price;

  return {
    title: `Solcelle Kalkulator i ${kommuneName}, ${fylkeName} – Beregn besparelse og støtte | Norge`,
    description: `Beregn din besparelse og tilbakebetalingstid for solcelleanlegg i ${kommuneName}, ${fylkeName}. Få oversikt over Enova-støtte, fylkesstøtte og lokal kommune-støtte. Strømpris: ${powerPrice} NOK/kWh.`,
    keywords: `solceller ${kommuneName}, solcellekalkulator ${kommuneName} ${fylkeName}, Enova støtte ${kommuneName}, lokal støtte solceller ${kommuneName}, solenergi ${kommuneName}, tilbakebetalingstid solceller ${kommuneName}, strømpris ${kommuneName}`,
    openGraph: {
      title: `Solcelle Kalkulator i ${kommuneName}, ${fylkeName} – Beregn besparelse og støtte`,
      description: `Beregn din besparelse og tilbakebetalingstid for solcelleanlegg i ${kommuneName}, ${fylkeName}. Få oversikt over tilgjengelig støtte og lokale forhold.`,
      type: "website",
      locale: "nb_NO",
      url: `https://solcellekalkulator.no/solcelle-kalkulator/${params.fylke}/${params.kommune}`,
    },
  };
}

export default function KommunePage({ params }: KommunePageProps) {
  const kommuneKey = Object.keys(kommuneData).find(key => 
    key.toLowerCase().replace(/\s+/g, '-') === params.kommune
  );

  if (!kommuneKey) {
    notFound();
  }

  const kommuneName = kommuneKey;
  const kommuneInfo = kommuneData[kommuneKey as KommuneType];
  const fylkeName = kommuneInfo.fylke;
  const powerPrice = kommuneInfo.price;
  const enovaSupport = incentivesData.enova;
  const fylkeSupport = incentivesData.local[fylkeName as keyof typeof incentivesData.local];
  const kommuneSupport = incentivesData.kommune[kommuneKey as keyof typeof incentivesData.kommune];

  const breadcrumbItems = [
    { name: "Solcelle Kalkulator", href: "/solcelle-kalkulator" },
    { name: fylkeName, href: `/solcelle-kalkulator/${params.fylke}` },
    { name: kommuneName, href: `/solcelle-kalkulator/${params.fylke}/${params.kommune}` }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* Kommune Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 lg:py-32">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              {kommuneName}, {fylkeName}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Solcelle Kalkulator i{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                {kommuneName}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Beregn din besparelse med solceller i {kommuneName}, {fylkeName}.
              Få oversikt over tilgjengelig støtte fra Enova, fylke og kommune.
            </p>
          </div>

          {/* Kommune-specific info cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Strømpris</h3>
              <p className="text-2xl font-bold text-blue-600 mb-1">{powerPrice} NOK/kWh</p>
              <p className="text-sm text-gray-600">I {kommuneName}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enova</h3>
              <p className="text-2xl font-bold text-green-600 mb-1">{enovaSupport.baseGrantNOK.toLocaleString()} NOK</p>
              <p className="text-sm text-gray-600">Grunnstøtte</p>
            </div>

            {fylkeSupport && (
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fylke</h3>
                <p className="text-2xl font-bold text-green-600 mb-1">{fylkeSupport.extraGrantNOK.toLocaleString()} NOK</p>
                <p className="text-sm text-gray-600">{fylkeName}</p>
              </div>
            )}

            {kommuneSupport && (
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center group hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Kommune</h3>
                <p className="text-2xl font-bold text-green-600 mb-1">{kommuneSupport.extraGrantNOK.toLocaleString()} NOK</p>
                <p className="text-sm text-gray-600">{kommuneName}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Calculator />
      <LocalInsights fylke={fylkeName as keyof typeof priceData} kommune={kommuneName} />
      <InfoSections />
      <FAQSection fylke={fylkeName} kommune={kommuneName} />
      <SEOInterlinking fylke={fylkeName as keyof typeof priceData} kommune={kommuneName as KommuneType} />
      <Footer />
    </div>
  );
}
