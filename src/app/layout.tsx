import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Solcelle Kalkulator - Beregn din besparelse | Norge",
  description: "Beregn besparelse og tilbakebetalingstid for solcelleanlegg i Norge. Få oversikt over Enova-støtte og lokale tilskudd i ditt fylke.",
  keywords: "solceller, Norge, kalkulator, besparelse, Enova, tilbakebetalingstid, fornybar energi",
  openGraph: {
    title: "Solcelle Kalkulator - Beregn din besparelse",
    description: "Beregn besparelse og tilbakebetalingstid for solcelleanlegg i Norge",
    type: "website",
    locale: "nb_NO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
