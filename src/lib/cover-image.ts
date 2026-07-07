// Helper untuk gambar cover artikel (Blogger CDN).
// - Blogger URL berpola `/sXXXX/` (mis. `/s16000/`) sering terlalu besar dan
//   kadang gagal termuat pada koneksi lambat. Kita paksa varian `w1200` yang
//   jauh lebih ringan namun tetap tajam sebagai hero 1200×630.
// - Sediakan proxy fallback via images.weserv.nl untuk dipakai di `onError`
//   sehingga jika Blogger CDN sedang bermasalah, gambar tetap muncul.

export function normalizeCover(url: string): string {
  if (!url) return url;
  try {
    // Ganti segmen ukuran Blogger `/sNNNN[-...]/` menjadi `/w1200/`.
    return url.replace(/\/s\d{2,5}(-[^/]*)?\//i, "/w1200/");
  } catch {
    return url;
  }
}

/**
 * URL fallback via proxy images.weserv.nl. Proxy ini menghapus header
 * `Referer`/`Content-Disposition` bermasalah dan meng-cache di CDN sendiri.
 */
export function proxyCover(url: string, width = 1200): string {
  if (!url) return url;
  const clean = url.replace(/^https?:\/\//i, "");
  return `https://images.weserv.nl/?url=${encodeURIComponent(clean)}&w=${width}&output=webp`;
}

/** Handler `onError` untuk <img>: coba proxy sekali, lalu menyerah. */
export function coverErrorHandler(
  e: React.SyntheticEvent<HTMLImageElement>,
  original: string,
  width = 1200,
) {
  const img = e.currentTarget;
  if (img.dataset.fallback === "1") return;
  img.dataset.fallback = "1";
  img.src = proxyCover(original, width);
}
