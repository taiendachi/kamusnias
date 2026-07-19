

/**
 * Kartu profil penulis — tampil otomatis di akhir setiap artikel blog.
 * Desain: foto lingkaran, nama menonjol, deskripsi ringkas, responsif.
 */
export function AuthorProfile() {
  return (
    <aside
      aria-label="Profil Penulis"
      className="mt-10 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
        <img
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjbkGM-FLGAQDv9ffmEaZj0zuDubJHmTMy1J1fMoKNDLL2waDSgeodfG7K7f7TNJcyMSWWdxJGv_g-rv5jpPyfHowBLMlm08u_vM4ND926gDS1H82hnwYacSxAALCD-WuoFaHPfBOPd8wHmu05qqNhOfy565g_Uc5jLZa9atNP2dRgpoEXUnYzy-DMbhQPb/s1168/Raka%20Adinatha.jpg"
          alt="Foto profil Taien Dachi, penulis Kamus Nias"
          width={96}
          height={96}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-24 w-24 shrink-0 rounded-full border-2 border-primary/30 object-cover shadow-sm"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Ditulis oleh
          </p>
          <h2 className="mt-1 font-serif text-xl font-bold text-foreground">
            Taien Dachi
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80">
            Penulis yang berfokus menghadirkan informasi dan berita seputar
            masyarakat Nias, meliputi bahasa, sejarah, budaya, pariwisata, serta
            berbagai aspek kehidupan sosial masyarakat Nias secara akurat,
            informatif, dan mudah dipahami.
          </p>
        </div>
      </div>
    </aside>
  );
}
