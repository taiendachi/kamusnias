import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { AdSlot } from "@/components/AdSlot";
import { SITE } from "@/lib/site-config";

const title = `Tentang ${SITE.longName}`;
const desc = `${SITE.longName} adalah proyek pelestarian Bahasa Nias (Li Niha) — kamus online gratis untuk masyarakat luas.`;

export const Route = createFileRoute("/tentang")({
  head: () => ({
    meta: [
      { title }, { name: "description", content: desc },
      { property: "og:title", content: title }, { property: "og:description", content: desc },
      { property: "og:url", content: "/tentang" }, { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/tentang" }],
  }),
  component: () => (
    <Layout>
      <article className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="font-serif text-3xl font-bold">{title}</h1>
        <p className="mt-3 text-muted-foreground">{desc}</p>
        <div className="prose prose-sm mt-6 max-w-none text-foreground/90">
          <h2 className="font-serif text-xl font-bold">Misi</h2>
          <p>Mendokumentasikan dan menyebarluaskan kosakata Bahasa Nias agar tetap lestari di tengah modernisasi.</p>
          <h2 className="font-serif text-xl font-bold">Sumber Data</h2>
          <p>Data kosakata dikelola melalui Google Sheet sehingga selalu dapat diperbarui dan dilengkapi oleh kontributor.</p>
          <h2 className="font-serif text-xl font-bold">Kontribusi</h2>
          <p>Anda dapat mengirim usulan kata melalui email atau formulir kontribusi yang akan kami tambahkan.</p>
        </div>
        <AdSlot type="adsense" slot="inArticle" />
      </article>
    </Layout>
  ),
});
