import React from "react";
import { 
  TrendingUp, 
  Shield, 
  Home,
  ArrowRight,
  Calculator,
  Users,
  FileText,
  Zap
} from "lucide-react";

export default function InfoSections() {
  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-success-600" />,
      title: "Reduser strømregningen",
      description: "Med opptil 80% reduksjon på din månedlige strømregning"
    },
    {
      icon: <Shield className="w-6 h-6 text-success-600" />,
      title: "Få støtte fra Enova",
      description: "Opptil 47.500 NOK i støtte fra staten og din kommune"
    },
    {
      icon: <Home className="w-6 h-6 text-success-600" />,
      title: "Øk boligverdien",
      description: "Solceller øker verdien på din eiendom betydelig"
    },
    {
      icon: <Zap className="w-6 h-6 text-success-600" />,
      title: "Bidra til bærekraft",
      description: "Reduser din klimafotavtrykk med fornybar energi"
    }
  ];

  const steps = [
    {
      number: "01",
      icon: <Calculator className="w-6 h-6 text-primary-600" />,
      title: "Velg ditt fylke og systemstørrelse",
      description: "Bruk vår kalkulator for å få en nøyaktig beregning basert på din lokasjon"
    },
    {
      number: "02",
      icon: <Users className="w-6 h-6 text-primary-600" />,
      title: "Kontakt lokale installatører",
      description: "Få tilbud fra sertifiserte installatører i ditt område"
    },
    {
      number: "03",
      icon: <FileText className="w-6 h-6 text-primary-600" />,
      title: "Søk om støtte",
      description: "Vi hjelper deg med å søke om Enova-støtte og lokale tilskudd"
    },
    {
      number: "04",
      icon: <Zap className="w-6 h-6 text-primary-600" />,
      title: "Start din grønne energireise",
      description: "Nyt besparelsene og bidra til en bærekraftig fremtid"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Benefits */}
          <div>
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                Hvorfor velge solceller?
              </h2>
              <p className="text-xl text-text-secondary leading-relaxed">
                Solceller er ikke bare bra for miljøet, men også for din økonomi. 
                Med stigende strømpriser og tilgjengelig støtte, er det perfekt tid å investere.
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="group flex items-start gap-4 p-6 bg-white rounded-2xl border border-border-muted hover:border-primary-200 hover:shadow-card transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - How it works */}
          <div>
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                Hvordan fungerer det?
              </h2>
              <p className="text-xl text-text-secondary leading-relaxed">
                Fra beregning til installasjon - vi guider deg gjennom hele prosessen 
                for å sikre at du får det beste resultatet.
              </p>
            </div>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="group relative"
                >
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-8 bg-border-muted group-hover:bg-primary-300 transition-colors duration-300"></div>
                  )}
                  
                  <div className="flex items-start gap-6">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {step.number}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className="text-lg font-semibold text-text-primary mb-3">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-gradient-to-br from-primary-50 to-success-50 rounded-3xl border border-primary-200">
              <div className="text-center">
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Klar til å komme i gang?
                </h3>
                <p className="text-text-secondary mb-6">
                  Start med å beregne din potensielle besparelse i dag
                </p>
                <button className="group inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Start beregning
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
