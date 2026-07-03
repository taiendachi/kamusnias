# content/posts

Folder ini menyimpan **semua artikel blog**. Satu file `.ts` = satu artikel.

## Cara menambah artikel baru

1. Buat file baru: `content/posts/slug-artikel-anda.ts`.
   Nama file akan menjadi bagian dari URL: `https://kamusnias.lovable.app/blog/slug-artikel-anda`.
2. Isi dengan template berikut:

   ```ts
   import type { BlogPost } from "@/lib/blog-types";

   const post: BlogPost = {
     slug: "slug-artikel-anda",           // WAJIB sama dengan nama file
     title: "Judul Artikel",              // otomatis jadi H1 — jangan tulis "#" di content
     description: "Ringkasan 1–2 kalimat untuk SEO & meta description.",
     date: "2026-07-03",                  // format YYYY-MM-DD
     author: "Tim Kamus Nias",
     cover: "https://.../gambar.png",     // URL absolut, otomatis jadi og:image
     tags: ["nias", "budaya"],
     content: `Paragraf pembuka artikel.

   ## Sub-judul H2

   Isi paragraf.

   ### Sub-bagian H3

   - bullet point
   - bullet point

   | Kolom A | Kolom B |
   | ------- | ------- |
   | isi     | isi     |
   `,
   };

   export default post;
   ```

3. Simpan. Artikel otomatis muncul di `/blog`, halaman artikel, sitemap.xml,
   dan Daftar Isi (TOC) otomatis dibuat dari heading `##`/`###`.

## Panduan menulis konten SEO

Struktur heading:

- `title` di file → otomatis **H1** halaman
- `## Judul` → **H2** (masuk ke TOC)
- `### Sub` → **H3** (masuk ke TOC)
- `#### Poin` → **H4**

Elemen lain:

- `- item` → bullet point
- `1. item` → numbered list
- `| a | b |` → tabel (baris kedua = pemisah `| - | - |`)
- `> kutipan` → blockquote
- `**tebal**`, `*miring*`, `` `kode` ``
- `![alt](url)` → gambar responsif

Kosongkan satu baris antar blok.

## Yang **tidak** perlu diubah

- `src/lib/blog.ts` — sudah otomatis membaca semua file di folder ini.
- Sitemap — sudah ikut daftar artikel dari sini.
