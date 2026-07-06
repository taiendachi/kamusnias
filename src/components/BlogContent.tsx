import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react";
import { ChevronDown, List } from "lucide-react";

/**
 * Renderer markdown ringan + TOC otomatis untuk artikel blog.
 * - `## Judul`   → H2 (dengan id anchor, masuk ke TOC)
 * - `### Judul`  → H3 (dengan id anchor, masuk ke TOC)
 * - `#### Judul` → H4
 * - `- item` / `1. item` / `| a | b |` / `> quote`
 * - `**tebal**`, `*miring*`, `` `kode` ``
 * - `![alt](url)` → gambar responsif
 */

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function renderInline(text: string): ReactNode {
  const re = /(!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("![")) {
      const im = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(tok);
      if (im) {
        nodes.push(
          <img
            key={i}
            src={im[2]}
            alt={im[1]}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="my-4 h-auto w-full rounded-lg border border-border object-cover"
          />,
        );
      }
    } else if (tok.startsWith("[")) {
      const lm = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok);
      if (lm) {
        const href = lm[2];
        const isExternal = /^https?:\/\//i.test(href) && !/kamusnias\.or\.id/i.test(href);
        nodes.push(
          <a
            key={i}
            href={href}
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="font-medium text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
          >
            {renderInline(lm[1])}
          </a>,
        );
      }
    } else if (tok.startsWith("**")) {
      nodes.push(<strong key={i}>{renderInline(tok.slice(2, -2))}</strong>);
    } else if (tok.startsWith("`")) {
      nodes.push(<code key={i} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em] break-words">{tok.slice(1, -1)}</code>);
    } else {
      nodes.push(<em key={i}>{renderInline(tok.slice(1, -1))}</em>);
    }
    last = m.index + tok.length;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

const isTableRow = (l: string) => /^\s*\|.*\|\s*$/.test(l);
const isTableSep = (l: string) => /^\s*\|[\s\-:|]+\|\s*$/.test(l);
const splitRow = (l: string) =>
  l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());

interface Heading { level: 2 | 3; text: string; id: string; }

function TOC({ headings }: { headings: Heading[] }) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length < 2 || typeof window === "undefined") return;
    const nodes = headings
      .map((h) => document.getElementById(h.id))
      .filter((n): n is HTMLElement => !!n);
    if (nodes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: [0, 1] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [headings]);

  const jump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setActiveId(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Update URL hash for shareable deep-link, tanpa memicu scroll ulang
    if (typeof history !== "undefined") history.replaceState(null, "", `#${id}`);
  };

  if (headings.length < 2) return null;
  return (
    <nav
      aria-label="Daftar isi"
      className="my-6 rounded-lg border border-border bg-muted/40"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold">
          <List className="h-4 w-4 text-primary" />
          Daftar Isi
          <span className="text-xs font-normal text-muted-foreground">({headings.length})</span>
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ol className="list-decimal space-y-1.5 border-t border-border px-6 py-3 pl-8 text-sm marker:text-primary">
          {headings.map((h) => {
            const isActive = h.id === activeId;
            return (
              <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => jump(e, h.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`block rounded px-1 py-0.5 transition-colors hover:text-primary hover:underline ${
                    isActive
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-foreground/80"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ol>
      )}
    </nav>
  );
}

export function BlogContent({ content }: { content: string }) {
  const headings = useMemo<Heading[]>(() => {
    const hs: Heading[] = [];
    const used = new Set<string>();
    for (const line of content.split("\n")) {
      const m = /^(#{2,3})\s+(.*)$/.exec(line.trim());
      if (!m) continue;
      const level = (m[1].length as 2 | 3);
      const text = m[2].replace(/[*`_]/g, "");
      let id = slugify(text);
      let n = 2;
      while (used.has(id)) id = `${slugify(text)}-${n++}`;
      used.add(id);
      hs.push({ level, text, id });
    }
    return hs;
  }, [content]);

  const idQueue = useMemo(() => headings.map((h) => h.id), [headings]);
  let idIdx = 0;

  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { i++; continue; }

    const h = /^(#{1,4})\s+(.*)$/.exec(trimmed);
    if (h) {
      const level = Math.max(h[1].length, 2);
      const text = h[2];
      if (level === 2) {
        blocks.push(
          <h2 id={idQueue[idIdx++]} key={key++} className="mt-10 scroll-mt-24 border-b border-border pb-2 font-serif text-2xl font-bold text-foreground md:text-[1.7rem]">
            {renderInline(text)}
          </h2>,
        );
      } else if (level === 3) {
        blocks.push(
          <h3 id={idQueue[idIdx++]} key={key++} className="mt-7 scroll-mt-24 text-lg font-bold text-foreground md:text-xl">
            {renderInline(text)}
          </h3>,
        );
      } else {
        blocks.push(
          <h4 key={key++} className="mt-5 text-sm font-bold uppercase tracking-wide text-primary md:text-base">
            {renderInline(text)}
          </h4>,
        );
      }
      i++;
      continue;
    }

    // Standalone image: ![alt](url)
    const imgOnly = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(trimmed);
    if (imgOnly) {
      blocks.push(
        <figure key={key++} className="my-5">
          <img
            src={imgOnly[2]}
            alt={imgOnly[1]}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-auto w-full rounded-lg border border-border object-cover"
          />
          {imgOnly[1] && (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground">{imgOnly[1]}</figcaption>
          )}
        </figure>,
      );
      i++;
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul key={key++} className="my-4 ml-6 list-disc space-y-1.5 marker:text-primary">
          {items.map((it, j) => <li key={j} className="leading-relaxed">{renderInline(it)}</li>)}
        </ul>,
      );
      continue;
    }

    if (/^\d+[.)]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+[.)]\s+/, ""));
        i++;
      }
      blocks.push(
        <ol key={key++} className="my-4 ml-6 list-decimal space-y-1.5 marker:font-semibold marker:text-primary">
          {items.map((it, j) => <li key={j} className="leading-relaxed">{renderInline(it)}</li>)}
        </ol>,
      );
      continue;
    }

    if (isTableRow(trimmed)) {
      const rows: string[] = [];
      while (i < lines.length && isTableRow(lines[i].trim())) {
        rows.push(lines[i].trim());
        i++;
      }
      const header = splitRow(rows[0]);
      const body = rows.slice(1).filter((r) => !isTableSep(r)).map(splitRow);
      blocks.push(
        <div
          key={key++}
          role="table"
          aria-label="Tabel data"
          className="my-5 w-full space-y-3"
        >
          {body.map((row, r) => (
            <div
              key={r}
              role="row"
              className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
            >
              {row.map((c, j) => (
                <div
                  key={j}
                  className="grid grid-cols-[minmax(0,40%)_minmax(0,60%)] items-start gap-3 border-b border-border p-3 last:border-b-0 sm:grid-cols-[minmax(0,32%)_minmax(0,68%)] sm:gap-4 sm:px-4 sm:py-3"
                >
                  <div
                    role="rowheader"
                    className="break-words text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs"
                  >
                    {renderInline(header[j] ?? "")}
                  </div>
                  <div role="cell" className="break-words text-sm sm:text-[0.95rem]">
                    {renderInline(c)}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>,
      );
      continue;
    }

    if (trimmed.startsWith(">")) {
      const parts: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        parts.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote key={key++} className="my-5 border-l-4 border-primary bg-primary/5 px-4 py-3 italic text-foreground/85">
          {parts.map((p, j) => <Fragment key={j}>{j > 0 && <br />}{renderInline(p)}</Fragment>)}
        </blockquote>,
      );
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,4})\s/.test(lines[i].trim()) &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !/^\d+[.)]\s+/.test(lines[i].trim()) &&
      !isTableRow(lines[i].trim()) &&
      !lines[i].trim().startsWith(">")
    ) {
      para.push(lines[i].trim());
      i++;
    }
    blocks.push(
      <p key={key++} className="my-4 leading-relaxed">{renderInline(para.join(" "))}</p>,
    );
  }

  return (
    <div className="mt-6 max-w-none text-[0.95rem] text-foreground/90 md:text-base">
      <TOC headings={headings} />
      {blocks}
    </div>
  );
}
