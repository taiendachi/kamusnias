import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site-config";

const title = `Privacy Policy — ${SITE.name}`;
const desc = `Kebijakan privasi ${SITE.longName}: cara kami menangani data pengunjung, cookie, analitik, dan iklan pihak ketiga.`;
const url = `${SITE.url}/page/privacy-policy`;

export const Route = createFileRoute("/page/privacy-policy")({
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
        name: "Privacy Policy",
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
        <Breadcrumbs items={[{ label: "Beranda", to: "/" }, { label: "Privacy Policy" }]} />
        <header className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Halaman Legal</p>
          <h1 className={`mt-2 ${h1}`}>Kebijakan Privasi</h1>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            Bagaimana {SITE.longName} mengumpulkan, menggunakan, dan
            melindungi informasi pengunjung yang mengakses situs ini.
          </p>
        </header>

        <section className="mt-6 text-[0.95rem] md:text-base">
          <h2 className={h2}>1. Pendahuluan</h2>
          <p className={p}>
            Kebijakan privasi ini menjelaskan praktik pengumpulan dan
            penggunaan informasi oleh <strong>{SITE.longName}</strong>. Dengan
            mengakses situs kami, Anda menyetujui ketentuan yang dijelaskan di
            halaman ini.
          </p>

          <h2 className={h2}>2. Data yang Kami Kumpulkan</h2>
          <h3 className={h3}>2.1. Data Teknis Anonim</h3>
          <ul className={ul}>
            <li>Jenis perangkat, sistem operasi, dan browser</li>
            <li>Halaman yang dikunjungi dan waktu kunjungan</li>
            <li>Alamat IP dalam bentuk teragregasi (tidak diasosiasikan dengan identitas Anda)</li>
          </ul>
          <h3 className={h3}>2.2. Data yang Anda Berikan</h3>
          <ul className={ul}>
            <li>Alamat email jika Anda mengirim pesan melalui formulir kontak</li>
            <li>Nama dan saran kosakata jika Anda menggunakan formulir saran</li>
          </ul>

          <h2 className={h2}>3. Cookie</h2>
          <p className={p}>
            Kami menggunakan cookie untuk menyimpan preferensi (mis. tema
            terang/gelap) dan mengukur trafik secara agregat. Anda dapat
            menonaktifkan cookie melalui pengaturan browser.
          </p>

          <h2 className={h2}>4. Iklan Pihak Ketiga</h2>
          <p className={p}>
            Situs ini dapat menampilkan iklan dari mitra periklanan seperti
            <strong> Google AdSense</strong>. Mitra tersebut dapat menggunakan
            cookie untuk menayangkan iklan berdasarkan kunjungan Anda ke situs
            ini dan situs lain.
          </p>
          <h3 className={h3}>4.1. Opt-out</h3>
          <p className={p}>
            Anda dapat menonaktifkan iklan yang dipersonalisasi melalui{" "}
            <a className="font-medium text-primary underline" href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Pengaturan Iklan Google</a>.
          </p>

          <h2 className={h2}>5. Analitik</h2>
          <p className={p}>
            Kami dapat menggunakan layanan analitik pihak ketiga untuk
            memahami cara pengunjung berinteraksi dengan situs. Data yang
            digunakan bersifat agregat dan tidak mengidentifikasi individu.
          </p>

          <h2 className={h2}>6. Keamanan Data</h2>
          <p className={p}>
            Kami menerapkan langkah-langkah teknis yang wajar untuk melindungi
            data Anda, namun tidak ada sistem yang sepenuhnya aman dari
            gangguan pihak ketiga.
          </p>

          <h2 className={h2}>7. Hak Pengguna</h2>
          <ul className={ul}>
            <li>Meminta akses terhadap data pribadi yang pernah Anda kirim</li>
            <li>Meminta koreksi terhadap data yang tidak akurat</li>
            <li>Meminta penghapusan data pribadi Anda</li>
          </ul>
          <p className={p}>
            Ajukan permintaan melalui{" "}
            <a className="font-medium text-primary underline" href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>

          <h2 className={h2}>8. Perubahan Kebijakan</h2>
          <p className={p}>
            Kebijakan ini dapat diperbarui sewaktu-waktu. Versi terbaru selalu
            tersedia di halaman ini.
          </p>
        </section>
      </article>
    </Layout>
  );
}
