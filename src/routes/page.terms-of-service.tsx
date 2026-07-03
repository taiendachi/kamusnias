import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site-config";

const title = `Terms of Service — ${SITE.name}`;
const desc = `Ketentuan layanan ${SITE.longName}: aturan penggunaan konten kamus dan artikel Bahasa Nias (Li Niha).`;

export const Route = createFileRoute("/page/terms-of-service")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:url", content: `${SITE.url}/page/terms-of-service` },
      { property: "og:type", content: "article" },
      { property: "og:image", content: SITE.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
      { name: "twitter:image", content: SITE.ogImage },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/page/terms-of-service` }],
  }),
  component: Page,
});

function Page() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Beranda", to: "/" }, { label: "Terms of Service" }]} />
        <h1 className="mt-3 font-serif text-3xl font-bold md:text-4xl">Terms of Service</h1>
        <div className="prose prose-neutral mt-6 max-w-none dark:prose-invert">
          <p>
            Dengan mengakses <strong>{SITE.longName}</strong>, Anda menyetujui
            ketentuan penggunaan berikut ini.
          </p>
          <h2>Penggunaan Konten</h2>
          <ul>
            <li>Konten dapat digunakan secara bebas untuk keperluan pembelajaran dan non-komersial.</li>
            <li>Wajib mencantumkan sumber apabila mengutip atau menyebarluaskan konten.</li>
            <li>Dilarang menyalin seluruh isi kamus untuk dipublikasikan ulang tanpa izin.</li>
          </ul>
          <h2>Kontribusi</h2>
          <p>
            Saran kosakata dan artikel yang Anda kirim menjadi bagian dari
            basis data publik <strong>{SITE.longName}</strong> dan dapat
            disunting untuk kualitas serta konsistensi.
          </p>
          <h2>Perubahan</h2>
          <p>
            Ketentuan ini dapat diperbarui sewaktu-waktu. Perubahan berlaku
            sejak dimuat pada halaman ini.
          </p>
        </div>
      </article>
    </Layout>
  );
}
