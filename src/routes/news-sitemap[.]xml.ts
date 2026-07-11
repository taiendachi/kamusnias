import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE } from "@/lib/site-config";

const BASE_URL = "https://kamusnias.or.id";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Google News sitemap: only articles published within the last 2 days.
export const Route = createFileRoute("/news-sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Google News accepts articles up to 2 days old. Fallback ke artikel
        // terbaru jika tidak ada yang memenuhi, supaya sitemap tidak kosong
        // (urlset kosong ditolak Search Console dengan error "Tidak ada tag XML").
        const cutoff = Date.now() - 1000 * 60 * 60 * 48;
        let recent = BLOG_POSTS.filter((p) => {
          const t = new Date(p.date).getTime();
          return !Number.isNaN(t) && t >= cutoff;
        });
        if (recent.length === 0 && BLOG_POSTS.length > 0) {
          recent = BLOG_POSTS.slice(0, 1);
        }

        const urls = recent
          .map((p) => {
            const loc = `${BASE_URL}/blog/${p.slug}`;
            const pubDate = new Date(p.date).toISOString();
            return `  <url>
    <loc>${loc}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(SITE.longName)}</news:name>
        <news:language>id</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapeXml(p.title)}</news:title>
    </news:news>
  </url>`;
          })
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=600",
          },
        });
      },
    },
  },
});
