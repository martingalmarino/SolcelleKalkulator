import React from "react";
import { 
  Sun, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Heart
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Kalkulator", href: "#" },
      { name: "Hvordan det fungerer", href: "#" },
      { name: "Priser", href: "#" },
      { name: "API", href: "#" }
    ],
    support: [
      { name: "Hjelp", href: "#" },
      { name: "Kontakt oss", href: "#" },
      { name: "Status", href: "#" },
      { name: "FAQ", href: "#" }
    ],
    company: [
      { name: "Om oss", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Karriere", href: "#" },
      { name: "Partnere", href: "#" }
    ],
    legal: [
      { name: "Personvern", href: "#" },
      { name: "Vilkår", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "GDPR", href: "#" }
    ]
  };

  return (
    <footer className="bg-text-primary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Solcelle Kalkulator</h3>
                <p className="text-text-muted text-sm">Beregn din besparelse</p>
              </div>
            </div>
            <p className="text-text-muted leading-relaxed mb-6 max-w-md">
              Vi hjelper norske husholdninger med å beregne besparelse og tilbakebetalingstid 
              for solcelleanlegg med de nyeste dataene og teknologien.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-text-muted">
                <Mail className="w-4 h-4" />
                <span className="text-sm">kontakt@solcellekalkulator.no</span>
              </div>
              <div className="flex items-center gap-3 text-text-muted">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+47 123 45 678</span>
              </div>
              <div className="flex items-center gap-3 text-text-muted">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Oslo, Norge</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">Produkt</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-text-muted hover:text-white transition-colors duration-200 text-sm flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-text-muted hover:text-white transition-colors duration-200 text-sm flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Selskap</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-text-muted hover:text-white transition-colors duration-200 text-sm flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Juridisk</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-text-muted hover:text-white transition-colors duration-200 text-sm flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <span>© {currentYear} Solcelle Kalkulator. Alle rettigheter forbeholdt.</span>
            </div>
            
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <span>Laget med</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>i Norge</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
