import React from "react";
import { DollarSign, Building2, Clock } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

function FeatureCard({ icon, title, description, highlight }: FeatureCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-1 border border-border-muted">
      {/* Icon Container */}
      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      
      {/* Content */}
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-3">
          {title}
        </h3>
        <p className="text-text-secondary leading-relaxed mb-4">
          {description}
        </p>
        {highlight && (
          <div className="inline-flex items-center px-3 py-1 bg-success-100 text-success-700 text-sm font-medium rounded-full">
            {highlight}
          </div>
        )}
      </div>
      
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-success-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}

export default function FeatureCards() {
  const features = [
    {
      icon: <DollarSign className="w-8 h-8 text-primary-600" />,
      title: "Beregn besparelse",
      description: "Se hvor mye du kan spare på strømregningen med solceller basert på din lokasjon og systemstørrelse.",
      highlight: "Opptil 80% reduksjon"
    },
    {
      icon: <Building2 className="w-8 h-8 text-primary-600" />,
      title: "Enova-støtte",
      description: "Få oversikt over tilgjengelig støtte fra staten og din kommune for å redusere installasjonskostnader.",
      highlight: "Opptil 47.500 NOK"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary-600" />,
      title: "Tilbakebetalingstid",
      description: "Se hvor raskt investeringen betaler seg tilbake med vår avanserte ROI-kalkulator.",
      highlight: "Typisk 8-12 år"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Hvorfor velge vår kalkulator?
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Vi bruker de nyeste dataene og teknologien for å gi deg de mest nøyaktige beregningene
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              highlight={feature.highlight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
