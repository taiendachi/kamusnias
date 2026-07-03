import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site-config";

const title = `Terms of Service — ${SITE.name}`;
const desc = `Ketentuan layanan ${SITE.longName}: aturan penggunaan kamus, kontribusi kosakata, hak cipta, dan pembatasan lainnya.`;
const url = `${SITE.url}/page/terms-of-service`;

export const Route = createFileRoute("/page/terms-of-service")({
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
        name: "Terms of Service",
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
        <Breadcrumbs items={[{ label: "Beranda", to: "/" }, { label: "Terms of Service" }]} />
        <header className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Halaman Legal</p>
          <h1 className={`mt-2 ${h1}`}>Ketentuan Layanan</h1>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            Aturan penggunaan konten kamus, kontribusi kosakata, dan hak cipta
            di {SITE.longName}.
          </p>
        </header>

        <section className="mt-6 text-[0.95rem] md:text-base">
          <h2 className={h2}>1. Penerimaan Ketentuan</h2>
          <p className={p}>
            Dengan mengakses <strong>{SITE.longName}</strong>, Anda dianggap
            memahami dan menyetujui seluruh ketentuan penggunaan yang
            tercantum di halaman ini.
          </p>

          <h2 className={h2}>2. Penggunaan Konten</h2>
          <h3 className={h3}>2.1. Penggunaan yang Diperbolehkan</h3>
          <ul className={ul}>
            <li>Membaca dan mempelajari kosakata untuk kebutuhan pribadi</li>
            <li>Mengutip entri kamus untuk keperluan pendidikan dan penelitian dengan mencantumkan sumber</li>
            <li>Membagikan tautan artikel di media sosial</li>
          </ul>
          <h3 className={h3}>2.2. Penggunaan yang Dilarang</h3>
          <ul className={ul}>
            <li>Menyalin seluruh basis data kamus untuk dipublikasikan ulang tanpa izin</li>
            <li>Menggunakan konten untuk tujuan komersial tanpa izin tertulis</li>
            <li>Melakukan scraping otomatis dalam skala besar yang membebani server</li>
            <li>Mendistribusikan ulang konten dengan mengubah atribusi</li>
          </ul>

          <h2 className={h2}>3. Kontribusi Pengguna</h2>
          <p className={p}>
            Saran kosakata, koreksi, dan artikel yang Anda kirim melalui
            formulir resmi menjadi bagian dari basis data publik
            {" "}{SITE.longName}.
          </p>
          <h3 className={h3}>3.1. Hak Editorial</h3>
          <p className={p}>
            Kami berhak menyunting, menolak, atau menghapus kontribusi demi
            menjaga kualitas dan konsistensi konten.
          </p>
          <h3 className={h3}>3.2. Jaminan Kontributor</h3>
          <p className={p}>
            Dengan mengirim kontribusi, Anda menjamin bahwa materi tersebut
            bukan hasil menyalin karya berhak cipta pihak lain tanpa izin.
          </p>

          <h2 className={h2}>4. Hak Kekayaan Intelektual</h2>
          <p className={p}>
            Struktur situs, logo, dan penyajian data adalah milik
            {" "}{SITE.organization}. Kosakata Bahasa Nias itu sendiri
            merupakan warisan budaya masyarakat Nias dan bukan objek hak
            eksklusif kami.
          </p>

          <h2 className={h2}>5. Ketersediaan Layanan</h2>
          <p className={p}>
            Kami tidak menjamin bahwa situs akan selalu tersedia tanpa
            gangguan. Pemeliharaan, pembaruan, atau kendala teknis dapat
            menyebabkan situs tidak dapat diakses sementara.
          </p>

          <h2 className={h2}>6. Pembatasan Tanggung Jawab</h2>
          <p className={p}>
            Kami tidak bertanggung jawab atas kerugian langsung maupun tidak
            langsung yang timbul dari penggunaan atau ketidakmampuan
            menggunakan situs ini.
          </p>

          <h2 className={h2}>7. Perubahan Ketentuan</h2>
          <p className={p}>
            Ketentuan ini dapat diperbarui sewaktu-waktu. Perubahan berlaku
            sejak dimuat pada halaman ini. Pemakaian berkelanjutan atas situs
            berarti persetujuan Anda atas versi terbaru.
          </p>

          <h2 className={h2}>8. Kontak</h2>
          <p className={p}>
            Pertanyaan terkait ketentuan layanan dapat dikirimkan ke{" "}
            <a className="font-medium text-primary underline" href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>
        </section>
      </article>
    </Layout>
  );
}
