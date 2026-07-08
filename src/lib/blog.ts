// Loader artikel blog.
//
// Artikel disimpan di `content/posts/`. Dua format didukung:
//   - `.ts` : file TypeScript yang meng-export BlogPost sebagai default.
//   - `.md` : markdown dengan frontmatter YAML sederhana.
//
// File di-load otomatis via `import.meta.glob` — tambah/hapus artikel cukup
// dengan membuat/menghapus file di folder tersebut.

import type { BlogPost } from "./blog-types";

export type { BlogPost } from "./blog-types";

const tsModules = import.meta.glob<{ default: BlogPost }>(
  "../../content/posts/*.ts",
  { eager: true },
);

const mdModules = import.meta.glob<string>(
  "../../content/posts/*.md",
  { eager: true, query: "?raw", import: "default" },
);

// Parser frontmatter YAML ringan (subset: string, string kutip, array [..]).
function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, unknown> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z0-9_]+)\s*:\s*(.*)$/.exec(line);
    if (!kv) continue;
    const key = kv[1];
    let val: string = kv[2].trim();
    if (!val) { data[key] = ""; continue; }
    if (val.startsWith("[") && val.endsWith("]")) {
      const inner = val.slice(1, -1).trim();
      data[key] = inner
        ? inner.split(",").map((s) => s.trim().replace(/^["']|["']$/g, ""))
        : [];
      continue;
    }
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, body: m[2] };
}

function mdToPost(path: string, raw: string): BlogPost | null {
  const { data, body } = parseFrontmatter(raw);
  const slug = (data.slug as string) || path.split("/").pop()!.replace(/\.md$/, "");
  const title = (data.title as string) || slug;
  if (!title) return null;
  const rawDate = (data.date as string) || new Date().toISOString();
  const date = rawDate.slice(0, 10); // YYYY-MM-DD
  const rawUpdated = (data.updated as string) || (data.modified as string) || "";
  const updated = rawUpdated ? rawUpdated.slice(0, 10) : undefined;
  return {
    slug,
    title,
    description: (data.description as string) || "",
    date,
    updated,
    author: (data.author as string) || undefined,
    category: (data.category as string) || undefined,
    cover: ((data.cover as string) || (data.thumbnail as string) || "") || undefined,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
    content: body.trim(),
  };
}

const mdPosts: BlogPost[] = Object.entries(mdModules)
  .map(([p, raw]) => mdToPost(p, raw))
  .filter((p): p is BlogPost => !!p);

const tsPosts: BlogPost[] = Object.values(tsModules).map((m) => m.default);

// TS override MD kalau slug bentrok.
const bySlug = new Map<string, BlogPost>();
for (const p of mdPosts) bySlug.set(p.slug, p);
for (const p of tsPosts) bySlug.set(p.slug, p);

export const BLOG_POSTS: BlogPost[] = Array.from(bySlug.values())
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPost = (slug: string) =>
  BLOG_POSTS.find((p) => p.slug === slug);
