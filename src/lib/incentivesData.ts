// Enova + incentivos locales (aproximados) por fylke
// Para MVP. Ajustar con datos oficiales o ampliarlos cuando se integren APIs locales.

export const incentivesData = {
  enova: {
    baseGrantNOK: 7500,              // Subsidio fijo Enova
    perKWNOK: 1250,                   // Adicional por kW
    maxNOK: 47500,                     // Tope máximo
    description: "Enova gir økonomisk støtte til installasjon av solcelleanlegg i norske boliger."
  },
  local: {
    Oslo: {
      extraGrantNOK: 5000,
      description: "Oslo kommune gir ekstra tilskudd til husholdninger som investerer i solcelleanlegg."
    },
    Viken: {
      extraGrantNOK: 4000,
      description: "Viken støtter energieffektive tiltak inkludert solceller gjennom lokale programmer."
    },
    Vestland: {
      extraGrantNOK: 3500,
      description: "Vestland fylke tilbyr støtteordninger for fornybar energi i samarbeid med kommunene."
    },
    Trøndelag: {
      extraGrantNOK: 3000,
      description: "Trøndelag gir støtte til boligeiere som installerer solceller og varmepumper."
    },
    Rogaland: {
      extraGrantNOK: 2500,
      description: "Rogaland har et lokalt tilskudd for å fremme installasjon av fornybar energi."
    },
    Agder: {
      extraGrantNOK: 2500,
      description: "Agder fylke støtter solcelleprosjekter for å øke lokal energiproduksjon."
    },
    "Møre og Romsdal": {
      extraGrantNOK: 2000,
      description: "Tilskudd for energitiltak inkludert solcelleinstallasjon i samarbeid med Enova."
    },
    Nordland: {
      extraGrantNOK: 3000,
      description: "Nordland tilbyr lokal støtte til fornybar energi, spesielt i områder med lavere solinnstråling."
    },
    "Troms og Finnmark": {
      extraGrantNOK: 2000,
      description: "Lokal støtte tilgjengelig for å kompensere for lavere soltimer."
    },
    Innlandet: {
      extraGrantNOK: 2500,
      description: "Innlandet gir økonomiske insentiver for energieffektive løsninger inkludert solceller."
    },
    Telemark: {
      extraGrantNOK: 2000,
      description: "Tilskudd for å redusere installasjonskostnader for solcelleanlegg."
    }
  },
  kommune: {
    // Kommune-specific incentives (additional to fylke)
    "Oslo": { extraGrantNOK: 3000, description: "Oslo kommune gir ekstra tilskudd for energieffektive løsninger." },
    "Bærum": { extraGrantNOK: 2000, description: "Bærum kommune støtter solcelleinstallasjoner for private husholdninger." },
    "Drammen": { extraGrantNOK: 1500, description: "Drammen kommune tilbyr lokale tilskudd for fornybar energi." },
    "Bergen": { extraGrantNOK: 2500, description: "Bergen kommune gir støtte til solcelleprosjekter i samarbeid med Vestland fylke." },
    "Trondheim": { extraGrantNOK: 2000, description: "Trondheim kommune støtter energieffektive tiltak inkludert solceller." },
    "Stavanger": { extraGrantNOK: 1800, description: "Stavanger kommune gir lokale tilskudd for solcelleinstallasjoner." },
    "Kristiansand": { extraGrantNOK: 1500, description: "Kristiansand kommune støtter fornybar energi i private boliger." },
    "Ålesund": { extraGrantNOK: 1200, description: "Ålesund kommune gir tilskudd for solcelleprosjekter." },
    "Bodø": { extraGrantNOK: 2000, description: "Bodø kommune støtter energieffektive løsninger inkludert solceller." },
    "Tromsø": { extraGrantNOK: 1500, description: "Tromsø kommune gir lokale tilskudd for å kompensere for lavere soltimer." },
    "Hamar": { extraGrantNOK: 1000, description: "Hamar kommune støtter solcelleinstallasjoner for private husholdninger." },
    "Skien": { extraGrantNOK: 1000, description: "Skien kommune gir tilskudd for energieffektive tiltak." }
  }
};
