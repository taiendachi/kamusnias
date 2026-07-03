// Loader artikel blog.
//
// Semua artikel disimpan sebagai file terpisah di folder `content/posts/`.
// File-file itu di-load otomatis via `import.meta.glob` — tambah/hapus
// artikel cukup dengan membuat/menghapus file `.ts` di folder tersebut.
// Tidak perlu mengubah file ini setiap kali menambah artikel baru.
//
// Panduan struktur & sintaks penulisan artikel ada di `src/lib/blog-types.ts`.

import type { BlogPost } from "./blog-types";

export type { BlogPost } from "./blog-types";

const modules = import.meta.glob<{ default: BlogPost }>(
  "../../content/posts/*.ts",
  { eager: true },
);

export const BLOG_POSTS: BlogPost[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPost = (slug: string) =>
  BLOG_POSTS.find((p) => p.slug === slug);
