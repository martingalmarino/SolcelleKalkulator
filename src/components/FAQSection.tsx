"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  fylke?: string;
  kommune?: string;
}

export default function FAQSection({ fylke, kommune }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Generate dynamic FAQs based on location
  const generateFAQs = (): FAQItem[] => {
    const location = kommune ? `${kommune}, ${fylke}` : fylke || "Norge";
    
    return [
      {
        question: `Hvor mye støtte kan jeg få fra Enova i ${location}?`,
        answer: `I ${location} kan du få opptil 47.500 NOK i Enova-støtte for solcelleanlegg. Grunnstøtten er 7.500 NOK pluss 1.250 NOK per kW installert kapasitet. For et typisk 5 kW anlegg vil du få 7.500 + (5 × 1.250) = 13.750 NOK i Enova-støtte.`
      },
      {
        question: `Hvor lang er tilbakebetalingstiden for solceller i ${location}?`,
        answer: `Tilbakebetalingstiden i ${location} varierer vanligvis mellom 8-15 år, avhengig av systemstørrelse, strømforbruk og tilgjengelig støtte. Med vår kalkulator kan du få en nøyaktig beregning basert på dine spesifikke forhold og lokale strømpriser.`
      },
      {
        question: `Hva koster solcellepaneler i ${location}?`,
        answer: `Solcellepaneler koster vanligvis mellom 10.000-15.000 NOK per kW installert kapasitet i ${location}. For et typisk hjem med 5 kW anlegg vil kostnaden være ca. 50.000-75.000 NOK før støtte. Med Enova-støtte og eventuelle lokale tilskudd kan nettokostnaden reduseres betydelig.`
      },
      {
        question: `Er det lokale tilskudd tilgjengelig i ${location}?`,
        answer: `${location} har lokale støtteordninger som kan gi ekstra tilskudd utover Enova-støtten. Disse varierer mellom kommuner og fylker. Vår kalkulator inkluderer all tilgjengelig støtte for å gi deg den mest nøyaktige beregningen av din nettokostnad.`
      }
    ];
  };

  const faqs = generateFAQs();

  // Generate JSON-LD for FAQ schema
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ofte stilte spørsmål
            </h2>
            <p className="text-xl text-gray-600">
              Få svar på vanlige spørsmål om solceller i {kommune ? `${kommune}, ${fylke}` : fylke || "Norge"}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Har du flere spørsmål?
              </h3>
              <p className="text-gray-600 mb-6">
                Kontakt lokale installatører i {kommune ? `${kommune}, ${fylke}` : fylke || "ditt område"} 
                for personlig rådgivning og tilbud.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-300">
                Kontakt installatør
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
