import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { fetchDictionary } from "@/lib/dictionary";
import { BLOG_POSTS } from "@/lib/blog";
import { normalizeCover } from "@/lib/cover-image";

const BASE_URL = "https://kamusnias.or.id";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        type Entry = {
          path: string;
          priority: string;
          changefreq: string;
          lastmod?: string;
          image?: { loc: string; title?: string };
        };
        const today = new Date().toISOString().slice(0, 10);
        const staticEntries: Entry[] = [
          { path: "/", priority: "1.0", changefreq: "daily", lastmod: today },
          { path: "/kamus", priority: "0.9", changefreq: "weekly", lastmod: today },
          { path: "/blog", priority: "0.8", changefreq: "weekly", lastmod: today },
          { path: "/tentang", priority: "0.5", changefreq: "yearly", lastmod: today },
          { path: "/kontak", priority: "0.4", changefreq: "yearly", lastmod: today },
          { path: "/saran", priority: "0.5", changefreq: "yearly", lastmod: today },
          { path: "/support", priority: "0.4", changefreq: "yearly", lastmod: today },
          { path: "/page/disclaimer", priority: "0.3", changefreq: "yearly", lastmod: today },
          { path: "/page/privacy-policy", priority: "0.3", changefreq: "yearly", lastmod: today },
          { path: "/page/terms-of-service", priority: "0.3", changefreq: "yearly", lastmod: today },
        ];

        const blogEntries: Entry[] = BLOG_POSTS.map((p) => ({
          path: `/blog/${p.slug}`,
          priority: "0.7",
          changefreq: "monthly",
          lastmod: p.updated || p.date,
          image: p.cover ? { loc: normalizeCover(p.cover), title: p.title } : undefined,
        }));

        let wordEntries: Entry[] = [];
        try {
          const entries = await fetchDictionary();
          wordEntries = entries.map((e) => ({
            path: `/kata/${e.slug}`,
            priority: "0.6",
            changefreq: "monthly",
          }));
        } catch {
          // sheet unreachable at build time — sitemap still ships
        }

        const escapeXml = (s: string) =>
          s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

        const all = [...staticEntries, ...blogEntries, ...wordEntries];
        const urls = all
          .map((e) => {
            const parts = [
              `  <url>`,
              `    <loc>${BASE_URL}${e.path}</loc>`,
              e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
              `    <changefreq>${e.changefreq}</changefreq>`,
              `    <priority>${e.priority}</priority>`,
              e.image
                ? `    <image:image>\n      <image:loc>${escapeXml(e.image.loc)}</image:loc>${e.image.title ? `\n      <image:title>${escapeXml(e.image.title)}</image:title>` : ""}\n    </image:image>`
                : null,
              `  </url>`,
            ].filter(Boolean);
            return parts.join("\n");
          })
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
