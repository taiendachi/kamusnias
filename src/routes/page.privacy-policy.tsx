import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site-config";

const title = `Privacy Policy — ${SITE.name}`;
const desc = `Kebijakan privasi ${SITE.longName}: cara kami menangani data pengunjung, cookie, dan iklan pihak ketiga.`;

export const Route = createFileRoute("/page/privacy-policy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:url", content: `${SITE.url}/page/privacy-policy` },
      { property: "og:type", content: "article" },
      { property: "og:image", content: SITE.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
      { name: "twitter:image", content: SITE.ogImage },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/page/privacy-policy` }],
  }),
  component: Page,
});

function Page() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-10">
        <Breadcrumbs items={[{ label: "Beranda", to: "/" }, { label: "Privacy Policy" }]} />
        <h1 className="mt-3 font-serif text-3xl font-bold md:text-4xl">Privacy Policy</h1>
        <div className="prose prose-neutral mt-6 max-w-none dark:prose-invert">
          <p>
            Kebijakan privasi ini menjelaskan bagaimana{" "}
            <strong>{SITE.longName}</strong> mengumpulkan dan menggunakan
            informasi ketika Anda mengakses situs kami.
          </p>
          <h2>Data yang Kami Kumpulkan</h2>
          <ul>
            <li>Data teknis anonim (jenis perangkat, browser, halaman yang dikunjungi) melalui analitik.</li>
            <li>Alamat email hanya jika Anda mengirim pesan melalui formulir kontak atau form saran.</li>
          </ul>
          <h2>Cookie & Iklan</h2>
          <p>
            Situs ini dapat menggunakan cookie untuk pengalaman pengguna serta
            menampilkan iklan dari pihak ketiga seperti Google AdSense. Anda
            dapat menonaktifkan cookie melalui pengaturan browser.
          </p>
          <h2>Hak Pengguna</h2>
          <p>
            Anda berhak meminta penghapusan data pribadi yang pernah Anda
            kirim ke kami melalui{" "}
            <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>
        </div>
      </article>
    </Layout>
  );
}
