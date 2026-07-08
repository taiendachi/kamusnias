
## Audit singkat kondisi SEO saat ini

Yang **sudah ada** dan solid:
- Sitemap dinamis (`/sitemap.xml`) mencakup halaman statis, semua artikel blog, dan semua entri kamus.
- `robots.txt` dengan `Allow: /` + `Sitemap:`.
- Meta per-route (title, description, og:*, twitter:*), canonical per leaf, `og:url` self-reference.
- JSON-LD: `WebSite` + `SearchAction` (root), `WebPage` + `FAQPage` (home), `BlogPosting` + `BreadcrumbList` (artikel).
- RSS feed, verifikasi Bing.
- Cover image dengan fallback proxy (`images.weserv.nl`).
- Bahasa Indonesia (`inLanguage: "id"`).

**Yang kurang / berdampak besar untuk SEO modern & Google Discover:**

## 1. Gambar Discover-ready (paling krusial untuk Discover)

Google Discover **hanya menampilkan artikel dengan gambar berlisensi lebar min. 1200 px** dan situs yang mengizinkan lewat `max-image-preview:large`. Saat ini:
- Meta robots root sudah punya `max-image-preview:large` ✅
- Tapi `og:image` artikel pakai URL Blogger yang di-normalize ke `/w1200/`. Discover butuh gambar **absolut, high-res, dan rasio 16:9 atau lebih lebar** — belum ada jaminan setiap thumbnail Blogger memenuhi ini.
- Belum ada properti `image` array multi-rasio (1:1, 4:3, 16:9) pada `BlogPosting` — Google merekomendasikan minimal 1 rasio 16:9 dengan lebar ≥1200 px.

**Fix:** ubah `BlogPosting.image` jadi array 3 URL (proxied via weserv dengan `&w=1200&h=1200&fit=cover`, `&w=1200&h=900`, `&w=1600&h=900`) + tambah `twitter:image:alt` dan `og:image:width/height` pada halaman artikel.

## 2. Article schema kurang lengkap untuk Rich Results

`BlogPosting` sekarang tidak memuat:
- `wordCount` (bantu klasifikasi long-form)
- `articleSection` (kategori dari frontmatter — kita sudah punya field `category`)
- `articleBody` (opsional tapi bagus untuk AI Overview / SGE)
- `author.url` dan `author.@type: Person` bila penulis manusia (saat ini semua `Organization`, sah tapi lemah untuk E-E-A-T)
- `dateModified` sama persis dengan `datePublished` — Google membaca ini sebagai artikel tak pernah diperbarui.

**Fix:** ambil `updated` dari frontmatter (fallback ke `date`), hitung word count sederhana dari `content`, isi `articleSection`.

## 3. Breadcrumb visual di halaman artikel

`BreadcrumbList` JSON-LD sudah ada, tapi Google butuh breadcrumb **terlihat di DOM** untuk memicu tampilan breadcrumb di SERP. Cek: komponen `Breadcrumbs` sudah dipakai di `blog.$slug.tsx` ✅ — tapi belum di `/kata/$slug`, `/blog` index, `/kamus`. Tambahkan.

## 4. Sitemap Image + News extension

Untuk Google Images & Discover, `sitemap.xml` bisa menyertakan `<image:image>` per URL artikel. Untuk situs dengan artikel budaya yang timeless ini, News sitemap tidak relevan (butuh publish <2 hari), tapi **Image sitemap** sangat membantu indeks gambar cover.

**Fix:** tambahkan namespace `xmlns:image` dan `<image:image><image:loc>` di setiap entry `/blog/{slug}`.

## 5. hreflang & Bahasa

Site punya `og:locale:alternate: nia_ID` tapi tidak ada `<link rel="alternate" hreflang>`. Kalau ke depan ada versi Nias murni, ini akan penting. Untuk sekarang tambah `hreflang="id"` dan `hreflang="x-default"` self-reference di root — sinyal ke Google bahwa target utama Indonesia.

## 6. E-E-A-T signals (Experience/Expertise/Authoritativeness/Trust)

Google 2024+ semakin ketat pada sinyal E-E-A-T, khusus konten budaya/bahasa yang bisa YMYL-adjacent:
- **Author page**: belum ada `/penulis/tim-redaksi`. Cukup buat 1 halaman ringkas + link dari byline artikel.
- **Publisher logo di JSON-LD**: sekarang pakai `SITE.ogImage` (favicon 512×512). Google mensyaratkan logo publisher `≤600×60` aspect landscape. Buat `logo.png` khusus atau pakai varian dari `kamus-nias-logo.png`.
- **Halaman "Tentang" + "Kontak" + "Kebijakan Privasi"** sudah ada ✅ — Trust OK.
- Tambahkan `sameAs` di JSON-LD Organization: link ke media sosial resmi (Facebook, Instagram, YouTube kalau ada).

## 7. Core Web Vitals & performa

- Font Google dimuat lewat `<link rel="stylesheet">` blocking — sudah `preconnect`. Bagus, tapi belum `font-display: swap` (google fonts default OK) dan belum ada `?display=swap` di URL. **Cek:** URL sudah pakai `&display=swap` ✅.
- Hero image cover di artikel `loading="eager"` + `decoding="async"` ✅.
- Yang belum: `fetchpriority="high"` pada cover artikel (LCP), dan `preload` `<link>` untuk cover di route head. **Fix ringan.**

## 8. AI Search / SGE readiness

Untuk muncul di AI Overview & Perplexity/Bing Chat:
- Tambah `Speakable` schema di artikel (sekarang cuma di home).
- Tambah `HowTo` schema di "Cara Menggunakan Kamus" (sudah ada `<ol>` di home) — mudah dan berdampak.
- FAQ per artikel: banyak artikel sudah punya format Q&A implisit — bisa parse `<h3>` yang berakhir `?` jadi FAQPage. Optional, dibahas terpisah kalau user mau.

## 9. Halaman `/kata/$slug` (entri kamus)

Ini halaman terbanyak (ribuan) tapi belum punya JSON-LD khusus. Tambah `DefinedTerm` + `DefinedTermSet` schema — dukungan Google terbatas, tapi bagus untuk knowledge graph & Bing.

## 10. Detail teknis lain

- Tambah `<meta name="format-detection" content="telephone=no">` (opsional, hindari iOS auto-link nomor).
- Tambah `theme-color` per skema warna (dark mode) — `theme-color` sudah ada, tapi hanya satu warna.
- `og:image:type: image/png` (atau jpeg) — bantu crawler beberapa platform.
- Tambah `<link rel="author">` ke halaman penulis di artikel.
- Sitemap: tambah `<lastmod>` untuk halaman statis pakai tanggal build (bantu Google prioritaskan crawl).

---

## Rencana implementasi (kalau di-approve)

Saya kelompokkan per prioritas dampak. Bisa dieksekusi bertahap; kalau mau semua, urutan aman:

**Batch A — dampak Discover & Rich Results (wajib):**
1. `src/lib/cover-image.ts` — tambah `discoverImages()` yang balikan array 3 rasio via weserv.
2. `src/routes/blog.$slug.tsx` — `BlogPosting.image` jadi array, tambah `wordCount`, `articleSection`, `dateModified` dari frontmatter `updated`, `Speakable`. Preload cover + `fetchpriority="high"`.
3. `src/lib/blog-types.ts` — tambah field opsional `updated`, sudah ada `category`.
4. Publisher logo: buat rujukan ke logo landscape (pakai `kamus-nias-logo.png` sudah landscape).

**Batch B — sitemap & crawling:**
5. `src/routes/sitemap[.]xml.ts` — namespace `xmlns:image`, tambah `<image:image>` per artikel, `<lastmod>` untuk statis pakai `new Date().toISOString().slice(0,10)`.
6. Root JSON-LD: `sameAs` (butuh URL media sosial dari user), `publisher.logo` proper.

**Batch C — E-E-A-T & UX:**
7. Breadcrumb visual di `/blog` (index), `/kamus`, `/kata/$slug`.
8. Halaman `/penulis/tim-redaksi` sederhana + link dari byline artikel.
9. `hreflang` alternate di root.

**Batch D — Kata entry & bonus:**
10. `DefinedTerm` schema di `/kata/$slug`.
11. `HowTo` schema di home (Cara Menggunakan).

---

## Pertanyaan sebelum mulai

1. Apakah ada akun media sosial resmi (Facebook / Instagram / YouTube / X) yang bisa saya masukkan sebagai `sameAs` + hubungkan di footer? Saat ini `SITE.twitter = "@kamusnias"` — apakah handle ini aktif?
2. Untuk `dateModified`, apakah frontmatter artikel mau saya tambahkan field `updated`? Atau pakai `date` publish saja dan Google akan tetap OK?
3. Apakah semua batch dijalankan sekaligus, atau prioritaskan **Batch A + B** dulu (paling berdampak untuk Discover)?

Setelah dijawab, saya lanjut ke build mode dan implementasi.
