import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { AdSlot } from "@/components/AdSlot";
import { SITE } from "@/lib/site-config";
import { BLOG_POSTS } from "@/lib/blog";
import { CalendarDays, ArrowRight } from "lucide-react";

const title = `Blog — ${SITE.longName}`;
const desc = `Artikel seputar Bahasa Nias (Li Niha), budaya, dan pembelajaran kosakata di ${SITE.longName}.`;

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title }, { name: "description", content: desc },
      { property: "og:title", content: title }, { property: "og:description", content: desc },
      { property: "og:url", content: `${SITE.url}/blog` }, { property: "og:type", content: "website" },
      { property: "og:image", content: SITE.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
      { name: "twitter:image", content: SITE.ogImage },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/blog` }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        name: title,
        description: desc,
        inLanguage: "id",
        blogPost: BLOG_POSTS.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          image: p.cover ?? SITE.ogImage,
          author: { "@type": "Organization", name: p.author ?? SITE.organization },
          url: `${SITE.url}/blog/${p.slug}`,
        })),
      }),
    }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <Layout>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <Breadcrumbs items={[{ label: "Beranda", to: "/" }, { label: "Blog" }]} />
          <h1 className="mt-3 font-serif text-3xl font-bold md:text-4xl">Blog Kamus Nias</h1>
          <p className="mt-2 text-muted-foreground">{desc}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <ul className="grid gap-5 md:grid-cols-2">
          {BLOG_POSTS.map((p) => (
            <li key={p.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:border-primary hover:shadow"
              >
                {p.cover && (
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="aspect-[16/9] w-full object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                    <CalendarDays className="h-3 w-3" />
                    {new Date(p.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                  <h2 className="mt-2 font-serif text-xl font-bold leading-snug group-hover:text-primary">{p.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  <span className="mt-auto pt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Baca selengkapnya <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <AdSlot type="adsense" slot="inArticle" />
      </section>
    </Layout>
  );
}
