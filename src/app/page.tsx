import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Solcelle Kalkulator</h1>
              <p className="text-text-secondary text-sm">Beregn din besparelse i Norge</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-secondary">🇳🇴 Norge</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Beregn din solcelle-besparing
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Få oversikt over besparelse, tilbakebetalingstid og tilgjengelig støtte 
              fra Enova og din kommune. Start din grønne energireise i dag!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-card">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-semibold text-text-primary mb-2">Beregn besparelse</h3>
                <p className="text-sm text-text-secondary">
                  Se hvor mye du kan spare på strømregningen med solceller
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-card">
                <div className="text-3xl mb-2">🏛️</div>
                <h3 className="font-semibold text-text-primary mb-2">Enova-støtte</h3>
                <p className="text-sm text-text-secondary">
                  Få oversikt over tilgjengelig støtte fra staten og kommunen
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-card">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold text-text-primary mb-2">Tilbakebetalingstid</h3>
                <p className="text-sm text-text-secondary">
                  Se hvor raskt investeringen betaler seg tilbake
                </p>
              </div>
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

      {/* Info Section */}
      <section className="py-12 bg-background-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-text-primary mb-4">
                Hvorfor velge solceller?
              </h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Reduser strømregningen med opptil 80%
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Få støtte fra Enova og din kommune
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Øk boligverdien med grønn energi
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Bidra til en bærekraftig fremtid
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-text-primary mb-4">
                Hvordan fungerer det?
              </h3>
              <ol className="space-y-3 text-text-secondary">
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                  Velg ditt fylke og systemstørrelse
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                  Få beregnet besparelse og tilbakebetalingstid
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                  Kontakt lokale installatører for tilbud
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
              © 2024 Solcelle Kalkulator. Beregningene er estimater basert på gjennomsnittlige forhold.
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
