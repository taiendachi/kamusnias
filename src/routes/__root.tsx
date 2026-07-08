import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SITE } from "@/lib/site-config";
import { I18nProvider, ThemeProvider } from "@/lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Halaman tidak ditemukan</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Kata atau halaman yang Anda cari tidak tersedia.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Kembali ke beranda
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Halaman gagal dimuat</h1>
        <p className="mt-2 text-sm text-muted-foreground">Terjadi kesalahan. Silakan coba lagi.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >Coba lagi</button>
          <a href="/" className="rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent">Beranda</a>
        </div>
      </div>
    </div>
  );
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.longName,
  alternateName: SITE.name,
  url: SITE.url,
  inLanguage: ["id", "nia"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE.url}/cari?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: SITE.organization,
    url: SITE.url,
  },
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const v = SITE.verification;
    const verificationMeta = ([
      v.google && { name: "google-site-verification", content: v.google },
      v.bing && { name: "msvalidate.01", content: v.bing },
      v.yandex && { name: "yandex-verification", content: v.yandex },
      v.pinterest && { name: "p:domain_verify", content: v.pinterest },
      v.facebook && { name: "facebook-domain-verification", content: v.facebook },
      v.adsensePublisherId && { name: "google-adsense-account", content: v.adsensePublisherId },
    ].filter(Boolean) as unknown) as Array<{ name: string; content: string }>;

    const scripts: Array<Record<string, unknown>> = [
      { type: "application/ld+json", children: JSON.stringify(orgJsonLd) },
    ];
    if (v.adsensePublisherId) {
      scripts.push({
        src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${v.adsensePublisherId}`,
        async: true,
        crossOrigin: "anonymous" as const,
      });
    }

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
        { title: `${SITE.longName} — ${SITE.tagline}` },
        { name: "description", content: SITE.description },
        { name: "author", content: SITE.organization },
        { name: "theme-color", content: "#1e6091" },
        { name: "geo.placename", content: "Nias, Indonesia" },
        { name: "geo.region", content: "ID-SU" },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
        ...verificationMeta,
        { property: "og:site_name", content: SITE.longName },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "id_ID" },
        { property: "og:locale:alternate", content: "nia_ID" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: SITE.twitter },
        { property: "og:image", content: SITE.ogImage },
        { property: "og:image:width", content: "512" },
        { property: "og:image:height", content: "512" },
        { property: "og:image:alt", content: SITE.longName },
        { name: "twitter:image", content: SITE.ogImage },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "apple-touch-icon", href: "/favicon.png" },
        { rel: "manifest", href: "/manifest.webmanifest" },
        { rel: "alternate", type: "application/rss+xml", title: `${SITE.longName} — Blog RSS`, href: "/rss.xml" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        { rel: "preconnect", href: "https://docs.google.com", crossOrigin: "anonymous" },
        { rel: "dns-prefetch", href: "https://docs.google.com" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,700;1,400&display=swap" },
      ],
      scripts,
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <Outlet />
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
