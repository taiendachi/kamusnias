import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { fetchDictionary } from "@/lib/dictionary";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries = [
          { path: "/", priority: "1.0", changefreq: "daily" },
          { path: "/budaya", priority: "0.7", changefreq: "monthly" },
          { path: "/tentang", priority: "0.5", changefreq: "yearly" },
        ];

        let wordEntries: { path: string; priority: string; changefreq: string }[] = [];
        try {
          const entries = await fetchDictionary();
          wordEntries = entries.map((e) => ({
            path: `/kata/${e.slug}`,
            priority: "0.8",
            changefreq: "monthly",
          }));
        } catch {
          // sheet unreachable at build time — sitemap still ships with static routes
        }

        const all = [...staticEntries, ...wordEntries];
        const urls = all
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
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
