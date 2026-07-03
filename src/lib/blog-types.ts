// Tipe untuk artikel blog. Dipakai oleh file di content/posts/*.ts dan
// oleh loader di src/lib/blog.ts.
//
// ===== CARA MENULIS ARTIKEL (struktur SEO) =====
// Judul artikel (title) otomatis menjadi H1 — JANGAN tulis `#` di konten.
// Di dalam `content` gunakan sintaks markdown ringan berikut:
//
//   ## Sub-judul utama        → H2
//   ### Sub-bagian            → H3
//   #### Poin detail          → H4
//   - item                    → bullet point
//   1. item                   → numbered list
//   | Kolom A | Kolom B |     → tabel (baris pertama = header,
//   | ------- | ------- |       baris kedua = pemisah, sisanya isi)
//   | isi     | isi     |
//   > kutipan                 → blockquote
//   **tebal**  *miring*  `kode` → format inline
//   ![alt](url)               → gambar
//
// Pisahkan setiap blok dengan satu baris kosong.

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO YYYY-MM-DD
  author?: string;
  /**
   * URL absolut gambar cover artikel (mis. dari Blogger). Dipakai sebagai
   * thumbnail di /blog, hero di halaman artikel, dan otomatis menjadi
   * og:image / twitter:image saat dibagikan ke media sosial.
   */
  cover?: string;
  tags?: string[];
  content: string;
}
