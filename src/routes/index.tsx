import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { SearchBox } from "@/components/SearchBox";
import { AdSlot } from "@/components/AdSlot";
import { fetchDictionary } from "@/lib/dictionary";
import { SITE } from "@/lib/site-config";
import { useI18n } from "@/lib/i18n";
import { BookMarked, Globe2, Sparkles } from "lucide-react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWYZ".split("");

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${SITE.longName} — ${SITE.tagline}`,
  description: SITE.description,
  inLanguage: "id",
  isPartOf: { "@type": "WebSite", name: SITE.longName, url: "/" },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".hero-sub"],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apa itu Kamus Bahasa Nias?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kamus Bahasa Nias adalah kamus online yang menerjemahkan kata Bahasa Indonesia ke Bahasa Nias (Li Niha) dan sebaliknya, lengkap dengan jenis kata dan konteks budaya.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah Kamus Bahasa Nias gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, Kamus Nias dapat diakses sepenuhnya gratis melalui browser apa pun, di desktop maupun ponsel.",
      },
    },
    {
      "@type": "Question",
      name: "Apa nama Bahasa Nias dalam bahasa aslinya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bahasa Nias disebut Li Niha oleh penutur aslinya dan termasuk rumpun bahasa Austronesia.",
      },
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.longName} — ${SITE.tagline}` },
      { name: "description", content: SITE.description },
      { name: "keywords", content: "kamus nias, kamus bahasa nias, li niha, bahasa daerah nias, terjemahan nias indonesia, budaya nias" },
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
        <h2 className="font-serif text-2xl font-bold">{t.pickLetter}</h2>
        <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-9 md:grid-cols-13">
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

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-3">
        <FeatureCard
          icon={<BookMarked className="h-5 w-5" />}
          title="Kosakata Lengkap"
          desc="Ribuan kata Indonesia ↔ Nias dengan jenis kata dan konteks."
        />
        <FeatureCard
          icon={<Globe2 className="h-5 w-5" />}
          title="Dwi-bahasa UI"
          desc="Tampilan bisa dialihkan ke Li Niha untuk pelestarian bahasa."
        />
        <FeatureCard
          icon={<Sparkles className="h-5 w-5" />}
          title="Cepat & SEO-friendly"
          desc="Setiap kata memiliki halaman tersendiri yang siap diindeks."
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="font-serif text-2xl font-bold">Kata Pilihan</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {entries.slice(0, 12).map((e) => (
            <Link
              key={e.id}
              to="/kata/$slug"
              params={{ slug: e.slug }}
              className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-primary hover:shadow"
            >
              <div>
                <div className="font-semibold">{e.indo}</div>
                {e.jenis && <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{e.jenis}</div>}
              </div>
              <div className="font-serif italic text-ocean group-hover:text-primary">{e.nias}</div>
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

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">{icon}</div>
      <div className="mt-3 font-serif text-lg font-bold">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
