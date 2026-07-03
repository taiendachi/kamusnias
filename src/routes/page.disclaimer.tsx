import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site-config";

const title = `Disclaimer — ${SITE.name}`;
const desc = `Disclaimer resmi ${SITE.longName}: batasan tanggung jawab atas konten kamus dan artikel Bahasa Nias (Li Niha).`;
const url = `${SITE.url}/page/disclaimer`;

export const Route = createFileRoute("/page/disclaimer")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:url", content: url },
      { property: "og:type", content: "article" },
      { property: "og:image", content: SITE.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
      { name: "twitter:image", content: SITE.ogImage },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Disclaimer",
        url,
        inLanguage: "id",
        isPartOf: { "@type": "WebSite", name: SITE.longName, url: SITE.url },
      }),
    }],
  }),
  component: Page,
});

const h1 = "scroll-mt-24 font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl";
const h2 = "mt-10 scroll-mt-24 border-b border-border pb-2 font-serif text-2xl font-bold text-foreground md:text-[1.7rem]";
const h3 = "mt-6 scroll-mt-24 text-lg font-bold text-foreground md:text-xl";
const p = "my-4 leading-relaxed text-foreground/90";
const ul = "my-4 ml-6 list-disc space-y-1.5 marker:text-primary";

function Page() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Beranda", to: "/" }, { label: "Disclaimer" }]} />
        <header className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Halaman Legal</p>
          <h1 className={`mt-2 ${h1}`}>Disclaimer Kamus Nias</h1>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            Batasan tanggung jawab atas seluruh konten kosakata, terjemahan, dan artikel Bahasa Nias (Li Niha) di {SITE.longName}.
          </p>
        </header>

        <section className="mt-6 text-[0.95rem] md:text-base">
          <h2 className={h2}>1. Sifat Konten</h2>
          <p className={p}>
            Seluruh konten yang tersedia di <strong>{SITE.longName}</strong> —
            termasuk entri kamus, terjemahan Indonesia ⇄ Nias, artikel blog,
            dan materi pendukung lainnya — disediakan sebagai bahan referensi
            umum untuk membantu pelestarian Bahasa Nias.
          </p>

          <h2 className={h2}>2. Batasan Tanggung Jawab</h2>
          <p className={p}>
            Kami berupaya menjaga keakuratan data, namun tidak memberikan
            jaminan mutlak atas kelengkapan atau kebenaran setiap entri.
          </p>
          <h3 className={h3}>2.1. Penggunaan Akademik dan Resmi</h3>
          <p className={p}>
            Pengguna diharapkan melakukan verifikasi mandiri sebelum
            menggunakan informasi untuk keperluan akademik, publikasi ilmiah,
            hukum, atau keperluan resmi lainnya.
          </p>
          <h3 className={h3}>2.2. Kesalahan dan Kelalaian</h3>
          <ul className={ul}>
            <li>Kami tidak bertanggung jawab atas kerugian yang timbul dari penggunaan konten.</li>
            <li>Kesalahan penulisan, ejaan, atau terjemahan dapat terjadi dan akan diperbaiki jika dilaporkan.</li>
            <li>Perbedaan dialek (utara, tengah, selatan) dapat menyebabkan variasi kosakata.</li>
          </ul>

          <h2 className={h2}>3. Tautan Eksternal</h2>
          <p className={p}>
            Situs ini dapat memuat tautan ke pihak ketiga. Kami tidak
            bertanggung jawab atas konten, kebijakan privasi, atau praktik
            situs eksternal tersebut.
          </p>

          <h2 className={h2}>4. Iklan Pihak Ketiga</h2>
          <p className={p}>
            Kami dapat menampilkan iklan dari jaringan periklanan seperti
            Google AdSense. Konten iklan sepenuhnya berada di bawah kendali
            pihak ketiga dan tidak mencerminkan pandangan {SITE.longName}.
          </p>

          <h2 className={h2}>5. Perubahan Disclaimer</h2>
          <p className={p}>
            Disclaimer ini dapat diperbarui sewaktu-waktu tanpa pemberitahuan
            terlebih dahulu. Perubahan berlaku sejak dimuat pada halaman ini.
          </p>

          <h2 className={h2}>6. Kontak</h2>
          <p className={p}>
            Untuk koreksi, klarifikasi, atau masukan, silakan hubungi kami di{" "}
            <a className="font-medium text-primary underline" href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>
        </section>
      </article>
    </Layout>
  );
}
