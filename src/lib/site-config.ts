// Site-wide configuration. Edit ad slot IDs and sheet info here.

export const SITE = {
  name: "Kamus Nias - Li Niha",
  longName: "Kamus Nias - Li Niha",
  tagline: "Kamus Bahasa Nias terlengkap — Indonesia ⇄ Nias (Li Niha)",
  description:
    "Kamus Nias - Li Niha. Kamus Bahasa Nias online terlengkap untuk terjemahan Indonesia ⇄ Nias, dilengkapi jenis kata, contoh, dan artikel seputar Bahasa Nias.",
  url: "https://kamusnias.or.id",
  ogImage: "https://kamusnias.or.id/favicon.png",

  locale: "id_ID",
  contactEmail: "halo@kamusnias.or.id",
  // Google Sheet (must be published / shareable). Uses gviz CSV endpoint — no API key needed.
  sheetId: "1z-MNQCt0Id7BayxJHJx8N_JQ06JtZvBtGKWLs9tb8-8",
  sheetName: "",
  twitter: "@kamusnias",
  organization: "Kamus Nias",
  // Dukungan / Support
  support: {
    number: "085213307191",
    numberDisplay: "0852-1330-7191",
    accountName: "Taien Dachi",
    // Upload QR QRIS (satu QR untuk GoPay, DANA, OVO, ShopeePay, dll)
    // ke src/assets lalu set path-nya di sini.
    qrImage: "" as string,
  },
  // === Verifikasi search engine & AdSense ===
  // Isi kode verifikasi di sini, lalu commit. Meta tag otomatis ter-render
  // di <head> semua halaman lewat src/routes/__root.tsx.
  //
  //  - google:   Google Search Console → "HTML tag" → salin isi content=""
  //              contoh: "abc123xyz..."
  //  - bing:     Bing Webmaster Tools → Meta tag → salin isi content=""
  //  - yandex:   Yandex Webmaster (opsional)
  //  - pinterest, facebook: opsional, isi kalau memang mau diverifikasi
  //  - adsensePublisherId:
  //              ID publisher AdSense lengkap "ca-pub-XXXXXXXXXXXXXXXX".
  //              Setelah diisi, meta google-adsense-account + script AdSense
  //              utama akan otomatis dimuat sehingga proses review lebih cepat.
  verification: {
    google: "",
    bing: "3E415FC9D58B6F777BF0D3175B32EDBD",
    yandex: "",
    pinterest: "",
    facebook: "",
    adsensePublisherId: "",
  },
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
  banner: { enabled: true },
} as const;
