import { Link } from "@tanstack/react-router";
import { Moon, Sun, Languages, BookOpen } from "lucide-react";
import { useState, type ReactNode } from "react";
import { SITE } from "@/lib/site-config";
import { useI18n, toggleTheme } from "@/lib/i18n";
import { SearchBox } from "./SearchBox";
import { StickyMobileAd } from "./AdSlot";

export function Header() {
  const { lang, setLang, t } = useI18n();
  const [isDark, setIsDark] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl gradient-ocean text-primary-foreground shadow-sm">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-serif text-base font-bold">{SITE.name}</div>
            <div className="hidden text-[10px] uppercase tracking-wider text-muted-foreground sm:block">
              Bahasa · Budaya · Nias
            </div>
          </div>
        </Link>
        <div className="hidden flex-1 md:block">
          <SearchBox />
        </div>
        <nav className="ml-auto hidden items-center gap-1 text-sm font-medium md:flex">
          <Link to="/budaya" className="rounded-md px-3 py-1.5 hover:bg-muted">{t.culture}</Link>
          <Link to="/tentang" className="rounded-md px-3 py-1.5 hover:bg-muted">{t.about}</Link>
        </nav>
        <button
          onClick={() => setLang(lang === "id" ? "ni" : "id")}
          aria-label={t.toggleLang}
          className="flex items-center gap-1 rounded-md border border-border px-2 py-1.5 text-xs font-semibold hover:bg-muted"
        >
          <Languages className="h-3.5 w-3.5" />
          {lang.toUpperCase()}
        </button>
        <button
          onClick={() => { toggleTheme(); setIsDark((d) => !d); }}
          aria-label={t.toggleTheme}
          className="rounded-md border border-border p-1.5 hover:bg-muted"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
      <div className="border-t border-border px-4 py-2 md:hidden">
        <SearchBox />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="font-serif text-lg font-bold">{SITE.longName}</div>
          <p className="mt-2 text-sm text-muted-foreground">{SITE.description}</p>
        </div>
        <div>
          <div className="text-sm font-semibold">Navigasi</div>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Beranda</Link></li>
            <li><Link to="/budaya" className="hover:text-foreground">Budaya Nias</Link></li>
            <li><Link to="/tentang" className="hover:text-foreground">Tentang</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Tentang Bahasa Nias</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Bahasa Nias (Li Niha) dituturkan oleh masyarakat Pulau Nias di lepas pantai
            barat Sumatera. Termasuk rumpun Austronesia.
          </p>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name}. Ya'ahowu!
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
      <Footer />
      <StickyMobileAd />
    </div>
  );
}
