import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site-config";

const title = `Disclaimer — ${SITE.name}`;
const desc = `Disclaimer resmi ${SITE.longName}: batasan tanggung jawab atas konten kamus dan artikel Bahasa Nias (Li Niha).`;

export const Route = createFileRoute("/page/disclaimer")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:url", content: `${SITE.url}/page/disclaimer` },
      { property: "og:type", content: "article" },
      { property: "og:image", content: SITE.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
      { name: "twitter:image", content: SITE.ogImage },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/page/disclaimer` }],
  }),
  component: Page,
});

function Page() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Beranda", to: "/" }, { label: "Disclaimer" }]} />
        <h1 className="mt-3 font-serif text-3xl font-bold md:text-4xl">Disclaimer</h1>
        <div className="prose prose-neutral mt-6 max-w-none dark:prose-invert">
          <p>
            Seluruh konten yang tersedia di <strong>{SITE.longName}</strong> —
            termasuk kosakata, terjemahan, artikel, dan materi pendukung
            lainnya — disediakan sebagai bahan referensi umum untuk membantu
            pelestarian Bahasa Nias (Li Niha).
          </p>
          <h2>Batasan Tanggung Jawab</h2>
          <p>
            Kami berupaya menjaga keakuratan data, namun tidak memberikan
            jaminan mutlak atas kelengkapan atau kebenaran setiap entri.
            Pengguna diharapkan melakukan verifikasi mandiri sebelum
            menggunakan informasi untuk keperluan akademik, hukum, atau resmi.
          </p>
          <h2>Tautan Eksternal</h2>
          <p>
            Situs ini dapat memuat tautan ke pihak ketiga. Kami tidak
            bertanggung jawab atas konten atau kebijakan privasi situs
            tersebut.
          </p>
          <h2>Kontak</h2>
          <p>
            Untuk koreksi atau masukan, silakan hubungi{" "}
            <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>
        </div>
      </article>
    </Layout>
  );
}
