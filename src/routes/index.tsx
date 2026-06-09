import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { SearchBox } from "@/components/SearchBox";
import { AdSlot } from "@/components/AdSlot";
import { fetchDictionary } from "@/lib/dictionary";
import { SITE } from "@/lib/site-config";
import { useI18n } from "@/lib/i18n";
import { BLOG_POSTS } from "@/lib/blog";
import { Sparkles, CalendarDays, ArrowRight } from "lucide-react";

const ALPHABET = "ABCDEFGHIJKLMNOPRSTUWYZ".split("");

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${SITE.longName} — ${SITE.tagline}`,
  description: SITE.description,
  inLanguage: "id",
  isPartOf: { "@type": "WebSite", name: SITE.longName, url: "/" },
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".hero-sub"] },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Apa itu Kamus Nias - Li Niha?", acceptedAnswer: { "@type": "Answer", text: "Kamus Nias - Li Niha adalah kamus online yang menerjemahkan kata Bahasa Indonesia ke Bahasa Nias (Li Niha) dan sebaliknya, lengkap dengan jenis kata dan konteks budaya." } },
    { "@type": "Question", name: "Apakah Kamus Nias gratis?", acceptedAnswer: { "@type": "Answer", text: "Ya, Kamus Nias dapat diakses sepenuhnya gratis melalui browser apa pun." } },
    { "@type": "Question", name: "Apa nama Bahasa Nias dalam bahasa aslinya?", acceptedAnswer: { "@type": "Answer", text: "Bahasa Nias disebut Li Niha oleh penutur aslinya dan termasuk rumpun bahasa Austronesia." } },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.longName} — ${SITE.tagline}` },
      { name: "description", content: SITE.description },
      { name: "keywords", content: "kamus nias, kamus bahasa nias, li niha, li ono niha, bahasa daerah nias, terjemahan nias indonesia" },
      { property: "og:title", content: `${SITE.longName} — ${SITE.tagline}` },
      { property: "og:description", content: SITE.description },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: SITE.longName },
      { name: "twitter:description", content: SITE.description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(homeJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useI18n();
  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["dictionary"],
    queryFn: fetchDictionary,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <Layout>
      <section className="relative overflow-hidden border-b border-border nias-motif-bg">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center md:py-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold-foreground ring-1 ring-gold/40">
            <Sparkles className="h-3 w-3" /> Ya'ahowu — Selamat datang
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-6xl">
            {t.heroTitle}
          </h1>
          <p className="hero-sub mx-auto mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
            {t.heroSub}
          </p>
          <div className="mx-auto mt-6 max-w-2xl">
            <SearchBox autoFocus />
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            {isLoading ? t.loading : `${entries.length.toLocaleString("id-ID")} ${t.totalWords}`}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <AdSlot type="adsense" slot="header" label="Header banner" height={90} />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-serif text-2xl font-bold">{t.pickLetter}</h2>
          <Link to="/kamus" className="text-sm font-medium text-primary hover:underline">
            Lihat semua kamus →
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-9 md:grid-cols-12">
          {ALPHABET.map((letter) => (
            <Link
              key={letter}
              to="/cari"
              search={{ q: letter.toLowerCase() }}
              className="grid aspect-square place-items-center rounded-lg border border-border bg-card font-serif text-lg font-bold transition hover:bg-primary hover:text-primary-foreground hover:shadow"
            >
              {letter}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="font-serif text-2xl font-bold">Artikel Terbaru</h2>
            <p className="text-sm text-muted-foreground">Wawasan seputar Bahasa & Budaya Nias.</p>
          </div>
          <Link to="/blog" className="text-sm font-medium text-primary hover:underline">
            Semua artikel →
          </Link>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.slice(0, 6).map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 transition hover:border-primary hover:shadow"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                <CalendarDays className="h-3 w-3" />
                {new Date(p.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
              </div>
              <h3 className="mt-2 font-serif text-lg font-bold leading-snug group-hover:text-primary">
                {p.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.description}</p>
              <span className="mt-auto pt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Baca selengkapnya <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <AdSlot type="mgid" slot="inArticle" label="MGID widget" height={250} />
      </div>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="font-serif text-2xl font-bold">{t.faq}</h2>
        <dl className="mt-4 space-y-3">
          {faqJsonLd.mainEntity.map((qa) => (
            <details key={qa.name} className="group rounded-lg border border-border bg-card p-4 open:shadow-sm">
              <summary className="cursor-pointer font-semibold">{qa.name}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{qa.acceptedAnswer.text}</p>
            </details>
          ))}
        </dl>
      </section>
    </Layout>
  );
}
