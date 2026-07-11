import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE } from "@/lib/site-config";
import { normalizeCover } from "@/lib/cover-image";

const BASE_URL = "https://kamusnias.or.id";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const Route = createFileRoute("/atom.xml")({
  server: {
    handlers: {
      GET: async () => {
        const updated = new Date(
          BLOG_POSTS[0]?.updated || BLOG_POSTS[0]?.date || new Date().toISOString(),
        ).toISOString();

        const entries = BLOG_POSTS.map((p) => {
          const url = `${BASE_URL}/blog/${p.slug}`;
          const published = new Date(p.date).toISOString();
          const modified = new Date(p.updated || p.date).toISOString();
          const cover = p.cover ? normalizeCover(p.cover) : "";
          return `  <entry>
    <title>${escapeXml(p.title)}</title>
    <link rel="alternate" type="text/html" href="${url}" />
    <id>${url}</id>
    <published>${published}</published>
    <updated>${modified}</updated>
    <summary>${escapeXml(p.description)}</summary>
    ${p.author ? `<author><name>${escapeXml(p.author)}</name></author>` : `<author><name>${escapeXml(SITE.organization)}</name></author>`}
    ${cover ? `<link rel="enclosure" type="image/jpeg" href="${escapeXml(cover)}" />` : ""}
    ${(p.tags ?? []).map((t) => `<category term="${escapeXml(t)}" />`).join("\n    ")}
  </entry>`;
        }).join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE.longName)} — Blog</title>
  <subtitle>${escapeXml(SITE.description)}</subtitle>
  <link rel="alternate" type="text/html" href="${BASE_URL}/blog" />
  <link rel="self" type="application/atom+xml" href="${BASE_URL}/atom.xml" />
  <id>${BASE_URL}/</id>
  <updated>${updated}</updated>
  <author><name>${escapeXml(SITE.organization)}</name></author>
${entries}
</feed>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/atom+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
