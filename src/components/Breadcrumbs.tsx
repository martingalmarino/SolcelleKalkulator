"use client";
import React from "react";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Generate JSON-LD for breadcrumbs
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://solcellekalkulator.no${item.href}`
    }))
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav className="bg-white border-b border-gray-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-4">
            <Link 
              href="/"
              className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
            </Link>
            
            {items.map((item, index) => (
              <React.Fragment key={item.href}>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                {index === items.length - 1 ? (
                  <span className="text-gray-900 font-medium text-sm">{item.name}</span>
                ) : (
                  <Link 
                    href={item.href}
                    className="text-blue-600 hover:text-blue-700 hover:underline text-sm transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
