import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { AdSlot } from "@/components/AdSlot";
import { SITE } from "@/lib/site-config";

const title = `Budaya Nias — ${SITE.name}`;
const desc = "Mengenal budaya Nias: rumah adat Omo Hada, lompat batu Hombo Batu, tari perang Maena, dan kekayaan tradisi Pulau Nias.";

export const Route = createFileRoute("/budaya")({
  head: () => ({
    meta: [
      { title }, { name: "description", content: desc },
      { property: "og:title", content: title }, { property: "og:description", content: desc },
      { property: "og:url", content: "/budaya" }, { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/budaya" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: desc,
        inLanguage: "id",
        author: { "@type": "Organization", name: SITE.organization },
      }),
    }],
  }),
  component: () => (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">Budaya Pulau Nias</h1>
        <p className="mt-3 text-muted-foreground">{desc}</p>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            { t: "Omo Hada", d: "Rumah adat tradisional Nias dengan struktur kayu tahan gempa dan ukiran bermakna." },
            { t: "Hombo Batu", d: "Tradisi lompat batu setinggi ±2 meter — simbol kedewasaan pemuda Nias Selatan." },
            { t: "Tari Maena", d: "Tarian sukacita yang melibatkan komunitas, sering ditampilkan di pesta adat." },
            { t: "Fahombo", d: "Upacara dan permainan budaya yang menjadi identitas pemuda Nias." },
          ].map((x) => (
            <div key={x.t} className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-serif text-xl font-bold">{x.t}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </section>

        <AdSlot type="adsense" slot="inArticle" />

        <section className="mt-8">
          <h2 className="font-serif text-2xl font-bold">Bahasa Nias (Li Niha)</h2>
          <p className="mt-2 text-foreground/90">
            Bahasa Nias atau <em>Li Niha</em> termasuk rumpun Austronesia, dengan dialek utara,
            tengah, dan selatan. Kata-kata dalam Bahasa Nias tidak pernah diakhiri konsonan —
            ciri khas yang membedakannya dari banyak bahasa daerah lain di Indonesia.
          </p>
        </section>
      </article>
    </Layout>
  ),
});
