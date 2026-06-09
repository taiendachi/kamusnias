// Statis-blog data. Tambah artikel baru di sini — otomatis muncul di /blog
// dan sitemap. Setiap artikel punya slug, judul, deskripsi (SEO), tanggal,
// dan konten markdown ringan (paragraf dipisah baris kosong).

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO YYYY-MM-DD
  author?: string;
  cover?: string;
  tags?: string[];
  content: string; // paragraf dipisah baris kosong (\n\n)
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "mengenal-bahasa-nias-li-niha",
    title: "Mengenal Bahasa Nias (Li Niha): Sejarah, Dialek, dan Keunikan",
    description:
      "Pengantar Bahasa Nias atau Li Niha — sejarah singkat, dialek utara/tengah/selatan, dan ciri khas fonologi yang membuatnya unik di rumpun Austronesia.",
    date: "2026-06-01",
    author: "Tim Kamus Nias",
    tags: ["bahasa", "nias", "li niha"],
    content: `Bahasa Nias atau Li Niha adalah bahasa daerah yang dituturkan oleh masyarakat Pulau Nias di lepas pantai barat Sumatera Utara. Bahasa ini termasuk dalam rumpun Austronesia, sub-keluarga Melayu-Polinesia Barat.

Salah satu ciri paling khas Li Niha adalah seluruh kata berakhir dengan vokal — tidak pernah konsonan. Hal ini membuat tuturan Bahasa Nias terdengar mengalir dan musikal.

Secara dialek, Li Niha umumnya dibagi menjadi tiga: dialek utara, tengah, dan selatan. Perbedaan terletak pada kosakata tertentu dan beberapa pola pelafalan, namun penutur dari ketiga wilayah umumnya tetap dapat saling memahami.

Pelestarian Bahasa Nias menjadi penting di era modern karena penggunaannya di kalangan generasi muda menurun. Kamus Nias hadir sebagai salah satu upaya digital untuk mendokumentasikan kosakata dan memudahkan siapa pun mempelajari Li Niha.`,
  },
  {
    slug: "panduan-belajar-kosakata-nias-untuk-pemula",
    title: "Panduan Belajar Kosakata Nias untuk Pemula",
    description:
      "Langkah praktis memulai belajar kosakata Bahasa Nias: mulai dari sapaan harian, angka, hingga tips menghafal kata dengan cepat.",
    date: "2026-06-05",
    author: "Tim Kamus Nias",
    tags: ["belajar", "pemula", "kosakata"],
    content: `Belajar Bahasa Nias bisa dimulai dari hal paling sederhana — sapaan harian. Kata "Ya'ahowu" misalnya, adalah sapaan universal masyarakat Nias yang berarti salam berkah.

Langkah berikutnya adalah menguasai kosakata dasar: anggota keluarga, angka, anggota tubuh, dan kata kerja sehari-hari. Pilih 5–10 kata per hari dan ulangi sepanjang minggu.

Manfaatkan fitur pencarian di Kamus Nias untuk menemukan padanan kata Indonesia ⇄ Nias dengan cepat. Telusuri menurut huruf untuk mengenal pola kata yang berakhir vokal.

Tips terakhir: gunakan kata-kata baru dalam kalimat sederhana. Bahasa hidup ketika digunakan, bukan hanya dihafal.`,
  },
];

export const getPost = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);
