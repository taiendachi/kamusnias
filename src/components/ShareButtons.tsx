import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Linkedin, Send, Share2, Heart } from "lucide-react";

interface Props {
  url: string;
  title: string;
  description?: string;
  image?: string;
}

/**
 * Tombol share ke media sosial. URL wajib absolut (https://...) supaya
 * crawler bisa mengambil OG tag (gambar, judul, deskripsi) dari halaman.
 */
export function ShareButtons({ url, title, description = "", image }: Props) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const d = encodeURIComponent(description);
  const img = image ? encodeURIComponent(image) : "";

  const items = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}&quote=${t}`,
      icon: Facebook,
      className: "bg-[#1877F2] hover:bg-[#0d65d9] text-white",
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      icon: Twitter,
      className: "bg-black hover:bg-neutral-800 text-white",
    },
    {
      name: "Threads",
      href: `https://www.threads.net/intent/post?text=${t}%20${u}`,
      icon: ThreadsIcon,
      className: "bg-black hover:bg-neutral-800 text-white",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      icon: Linkedin,
      className: "bg-[#0A66C2] hover:bg-[#084d94] text-white",
    },
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${t}%20${u}`,
      icon: WhatsAppIcon,
      className: "bg-[#25D366] hover:bg-[#1ebe57] text-white",
    },
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${u}&text=${t}`,
      icon: Send,
      className: "bg-[#229ED9] hover:bg-[#1a86b8] text-white",
    },
    {
      name: "Pinterest",
      href: `https://pinterest.com/pin/create/button/?url=${u}&media=${img}&description=${d}`,
      icon: PinterestIcon,
      className: "bg-[#E60023] hover:bg-[#b8001c] text-white",
    },
  ];

  const nativeShare = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, text: description, url });
      } catch {}
    }
  };

  return (
    <section aria-label="Bagikan artikel" className="mt-10 rounded-xl border border-border bg-muted/40 p-5">
      <div className="flex items-center gap-2">
        <Share2 className="h-4 w-4 text-primary" />
        <h2 className="font-serif text-lg font-bold">Bagikan artikel ini</h2>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Bantu sebarkan pengetahuan Bahasa Nias — klik salah satu tombol di bawah.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((s) => (
          <li key={s.name}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Bagikan ke ${s.name}`}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm transition ${s.className}`}
            >
              <s.icon className="h-3.5 w-3.5" aria-hidden />
              {s.name}
            </a>
          </li>
        ))}
        {typeof navigator !== "undefined" && "share" in navigator && (
          <li>
            <button
              type="button"
              onClick={nativeShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-muted"
              aria-label="Bagikan via aplikasi lain"
            >
              <Share2 className="h-3.5 w-3.5" /> Lainnya
            </button>
          </li>
        )}
      </ul>

      <div className="mt-5 flex flex-col items-start gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Suka artikel ini? Dukung kami agar terus berkembang.
        </p>
        <Link
          to="/support"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#e11d2a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c41722] hover:shadow-md"
        >
          <Heart className="h-4 w-4 fill-current" /> Dukung Kamus Nias
        </Link>
      </div>
    </section>
  );
}

function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.19 2C6.6 2 3 5.6 3 12.02 3 18.4 6.6 22 12.19 22c5.5 0 9.06-3.53 9.06-9.44 0-4.03-1.9-6.6-5.36-7.24-.3-1.6-1.2-2.62-2.94-3.06A5.7 5.7 0 0 0 12.19 2Zm0 1.6c1.4 0 2.42.53 2.94 1.55.2.4.34.9.4 1.46-.9-.13-1.85-.2-2.87-.2-1.86 0-3.2.44-3.98 1.3-.68.76-.98 1.8-.98 3.06 0 1.35.44 2.42 1.32 3.18.87.76 2 1.14 3.4 1.14 1.55 0 2.75-.45 3.6-1.36.75-.8 1.15-1.86 1.2-3.16 1.85.6 2.78 2.03 2.78 4.35 0 4.8-2.6 7.44-7.4 7.44-4.55 0-7.4-2.94-7.4-8.34 0-5.4 2.85-8.42 7.6-8.42Zm-.66 5.66c1.05 0 2 .08 2.88.22a4.6 4.6 0 0 1-.77 2.44c-.55.72-1.35 1.08-2.4 1.08-1.66 0-2.53-.7-2.53-2.05 0-1.13.85-1.7 2.82-1.7Z"/>
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.5 3.5A10.4 10.4 0 0 0 3.6 15.9L2 22l6.3-1.6a10.4 10.4 0 0 0 15.6-9A10.4 10.4 0 0 0 20.5 3.5Zm-8.4 16a8.6 8.6 0 0 1-4.4-1.2l-.3-.2-3.7 1 1-3.6-.2-.3a8.6 8.6 0 1 1 7.6 4.3Zm4.7-6.4c-.3-.1-1.5-.7-1.8-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.1-.3.2-.5.1a7 7 0 0 1-2-1.3 7.7 7.7 0 0 1-1.4-1.7c-.2-.3 0-.4.1-.5l.4-.4c.1-.2.2-.3.3-.5s0-.4 0-.5c0-.2-.6-1.4-.8-1.9-.2-.5-.5-.4-.6-.4H8.4a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.2 5.2 5.2 0 0 0 1.1 2.7 12 12 0 0 0 4.5 4c.6.2 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.2-.3-.3-.6-.4Z"/>
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.3-5.4s-.3-.7-.3-1.7c0-1.6.9-2.8 2.1-2.8 1 0 1.5.7 1.5 1.6 0 1-.6 2.5-1 3.9-.3 1.2.6 2.1 1.7 2.1 2 0 3.6-2.2 3.6-5.3 0-2.8-2-4.7-4.9-4.7-3.3 0-5.3 2.5-5.3 5.1 0 1 .4 2.1.9 2.7l.1.3-.4 1.4c-.1.2-.2.3-.5.2-1.6-.7-2.5-3-2.5-4.8 0-3.9 2.8-7.5 8.2-7.5 4.3 0 7.6 3 7.6 7.2 0 4.3-2.7 7.7-6.4 7.7-1.3 0-2.5-.7-2.9-1.4l-.8 3c-.3 1-1 2.3-1.5 3.1A10 10 0 1 0 12 2Z"/>
    </svg>
  );
}
