// Artikel blog. File ini adalah sumber tunggal untuk 1 (satu) artikel.
// Semua artikel di folder content/posts/ akan otomatis tampil di /blog
// dan dimasukkan ke sitemap.xml.
import type { BlogPost } from "@/lib/blog-types";

const post: BlogPost = {
  slug: "mengenal-bahasa-nias-li-niha",
  title: "Mengenal Bahasa Nias (Li Niha): Sejarah, Dialek, dan Keunikan",
  description:
    "Pengantar Bahasa Nias atau Li Niha — sejarah singkat, dialek utara/tengah/selatan, dan ciri khas fonologi yang membuatnya unik di rumpun Austronesia.",
  date: "2026-06-01",
  author: "Tim Kamus Nias",
  cover:
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiaxR1jXN5R6loBiRr2Mao46qDY6cMnAeAzaWx-UFx4q4DeDU7y0muQgFZLsTY5PVc6q7XTDAhW_NjveD0qhp11nrFyieXBYSURug7oSQiAWYVr2op1bBRsaqHu51dMTr3TLHUT64UJZ4R4flySb2l01AU4Huet9dASICxmTotTcUiEjExjvDzsTzaYfqY/s1563/kamus%20nias.png",
  tags: ["bahasa", "nias", "li niha"],
  content: `Bahasa Nias atau **Li Niha** adalah bahasa daerah yang dituturkan oleh masyarakat Pulau Nias di lepas pantai barat Sumatera Utara. Bahasa ini termasuk dalam rumpun Austronesia, sub-keluarga Melayu-Polinesia Barat.

## Keunikan Fonologi Li Niha

Salah satu ciri paling khas Li Niha adalah seluruh kata berakhir dengan vokal — tidak pernah konsonan. Hal ini membuat tuturan Bahasa Nias terdengar mengalir dan musikal.

### Ciri-ciri utama

- Semua kata berakhir dengan huruf vokal (a, e, i, o, u, ö)
- Memiliki vokal khas **ö** yang tidak ada dalam Bahasa Indonesia
- Intonasi cenderung musikal dan berirama

## Pembagian Dialek

Secara dialek, Li Niha umumnya dibagi menjadi tiga wilayah. Perbedaan terletak pada kosakata tertentu dan beberapa pola pelafalan, namun penutur dari ketiga wilayah umumnya tetap dapat saling memahami.

| Dialek | Wilayah | Ciri Khas |
| ------ | ------- | --------- |
| Utara | Gunungsitoli dan sekitarnya | Dianggap dialek standar |
| Tengah | Nias bagian tengah | Peralihan utara–selatan |
| Selatan | Teluk Dalam dan sekitarnya | Kosakata dan lafal tersendiri |

## Pentingnya Pelestarian

Pelestarian Bahasa Nias menjadi penting di era modern karena penggunaannya di kalangan generasi muda menurun. **Kamus Nias** hadir sebagai salah satu upaya digital untuk mendokumentasikan kosakata dan memudahkan siapa pun mempelajari Li Niha.`,
};

export default post;
