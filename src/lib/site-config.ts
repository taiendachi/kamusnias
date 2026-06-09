// Site-wide configuration. Edit ad slot IDs and sheet info here.

export const SITE = {
  name: "Kamus Nias",
  longName: "Kamus Bahasa Nias Online",
  tagline: "Kamus Bahasa Nias terlengkap — Indonesia ⇄ Nias",
  description:
    "Kamus Bahasa Nias Online terlengkap. Terjemahan Indonesia ke Nias dan Nias ke Indonesia, dilengkapi jenis kata, contoh, serta wawasan budaya Nias.",
  locale: "id_ID",
  // Google Sheet (must be published / shareable). Uses gviz CSV endpoint — no API key needed.
  sheetId: "1z-MNQCt0Id7BayxJHJx8N_JQ06JtZvBtGKWLs9tb8-8",
  sheetName: "", // optional sheet/tab name
  twitter: "@kamusnias",
  organization: "Kamus Nias",
} as const;

export const csvUrl = () => {
  const base = `https://docs.google.com/spreadsheets/d/${SITE.sheetId}/gviz/tq?tqx=out:csv`;
  return SITE.sheetName ? `${base}&sheet=${encodeURIComponent(SITE.sheetName)}` : base;
};

// Ad slot configuration. Placeholders by default — replace with real publisher IDs later.
export const ADS = {
  adsense: {
    enabled: false,
    client: "ca-pub-XXXXXXXXXXXXXXXX",
    slots: {
      header: "1111111111",
      inArticle: "2222222222",
      sidebar: "3333333333",
      stickyMobile: "4444444444",
    },
  },
  mgid: { enabled: false, widgetId: "MGID-WIDGET-ID" },
  asterra: { enabled: false, zoneId: "ASTERRA-ZONE-ID" },
  banner: { enabled: true }, // direct-sold banner placeholder
} as const;
