import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Layout } from "@/components/Layout";
import { LazyInView } from "@/components/LazyInView";
import { AdSlot } from "@/components/AdSlot";
import { BlogContent } from "@/components/BlogContent";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AuthorProfile } from "@/components/AuthorProfile";
import { SITE } from "@/lib/site-config";
import { BLOG_POSTS, getPost } from "@/lib/blog";
import { normalizeCover, coverErrorHandler, discoverImages, ogImageUrl } from "@/lib/cover-image";
import { CalendarDays } from "lucide-react";


const ShareButtons = lazy(() =>
  import("@/components/ShareButtons").then((m) => ({ default: m.ShareButtons })),
);

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    if (!post) {
      return {
        meta: [
          { title: "Artikel tidak ditemukan" },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    }
    const url = `${SITE.url}/blog/${params.slug}`;
    const cover = post.cover ? normalizeCover(post.cover) : SITE.ogImage;
    // Gambar khusus Open Graph / Twitter: dijamin 1200×630 JPG lewat proxy
    // agar Facebook, LinkedIn, dsb. menampilkan large image card.
    const ogImage = post.cover ? ogImageUrl(post.cover) : SITE.ogImage;
    const imageSet = post.cover ? discoverImages(post.cover) : [SITE.ogImage];
    const dateModified = post.updated || post.date;
    // Word count sederhana dari markdown body.
    const wordCount = post.content
      ? post.content.replace(/[#*_>`\-\[\]()!|]/g, " ").split(/\s+/).filter(Boolean).length
      : undefined;
    const publisherLogo = `${SITE.url}/kamus-nias-logo.png`;

    // Berita layak Google News: publish dalam 2 hari terakhir.
    const publishedTime = new Date(post.date).getTime();
    const isNews = !Number.isNaN(publishedTime) && Date.now() - publishedTime <= 1000 * 60 * 60 * 48;
    const article = {
      "@context": "https://schema.org",
      "@type": isNews ? "NewsArticle" : "BlogPosting",
      headline: post.title,
      description: post.description,
      image: imageSet,
      datePublished: post.date,
      dateModified,
      inLanguage: "id",
      author: {
        "@type": "Organization",
        name: post.author ?? SITE.organization,
        url: SITE.url,
      },
      publisher: {
        "@type": "Organization",
        name: SITE.organization,
        url: SITE.url,
        logo: {
          "@type": "ImageObject",
          url: publisherLogo,
          width: 512,
          height: 512,
        },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      keywords: (post.tags ?? []).join(", "),
      articleSection: post.category || "Blog",
      ...(wordCount ? { wordCount } : {}),
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "article header p"],
      },
    };
    const breadcrumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE.url}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    };

    return {
      meta: [
        { title: `${post.title} — ${SITE.name}` },
        { name: "description", content: post.description },
        { name: "keywords", content: (post.tags ?? []).join(", ") },
        { name: "author", content: post.author ?? SITE.organization },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
        { property: "article:published_time", content: post.date },
        { property: "article:modified_time", content: dateModified },
        { property: "article:author", content: post.author ?? SITE.organization },
        { property: "article:section", content: post.category || "Blog" },
        ...(post.tags ?? []).map((t) => ({ property: "article:tag", content: t })),
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },
        { property: "og:image:secure_url", content: ogImage },
        { property: "og:image:type", content: "image/jpeg" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: post.title },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
        { name: "twitter:image", content: ogImage },
        { name: "twitter:image:alt", content: post.title },
      ],
      links: [
        { rel: "canonical", href: url },
        ...(post.cover
          ? [{ rel: "preload", as: "image", href: cover, fetchpriority: "high" } as Record<string, string>]
          : []),
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(article) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbs) },
      ],
    };
  },
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-serif text-3xl font-bold">Artikel tidak ditemukan</h1>
        <p className="mt-2 text-muted-foreground">Mungkin tautan salah atau artikel telah dihapus.</p>
        <Link to="/blog" className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Kembali ke Blog</Link>
      </div>
    </Layout>
  ),
  errorComponent: ({ reset }) => (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-xl font-semibold">Artikel gagal dimuat</h1>
        <button onClick={reset} className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Coba lagi</button>
      </div>
    </Layout>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: "Beranda", to: "/" },
            { label: "Blog", to: "/blog" },
            { label: post.title },
          ]}
        />
        <header className="mt-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <CalendarDays className="h-3 w-3" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </time>
            {post.author && <span>· {post.author}</span>}
          </div>
          <h1 className="mt-2 font-serif text-3xl font-bold leading-tight md:text-4xl">{post.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{post.description}</p>
          {post.cover && (
            <img
              src={normalizeCover(post.cover)}
              alt={post.title}
              width={1200}
              height={630}
              loading="eager"
              // @ts-expect-error fetchpriority atribut HTML resmi, belum di typedef React lama
              fetchpriority="high"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(e) => coverErrorHandler(e, post.cover!, 1200)}
              className="mt-5 aspect-[1200/630] w-full rounded-xl border border-border object-cover"
            />
          )}

        </header>

        <AdSlot type="adsense" slot="inArticle" />

        <BlogContent content={post.content} />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tg: string) => (
              <span key={tg} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">#{tg}</span>
            ))}
          </div>
        )}

        <LazyInView minHeight={220}>
          <Suspense fallback={<div className="mt-10 h-40 rounded-xl border border-border bg-muted/40" />}>
            <ShareButtons
              url={`${SITE.url}/blog/${post.slug}`}
              title={post.title}
              description={post.description}
              image={post.cover || SITE.ogImage}
            />
          </Suspense>
        </LazyInView>

        <AdSlot type="mgid" slot="inArticle" />

        <AuthorProfile />

        {others.length > 0 && (
          <section className="mt-10 border-t border-border pt-6">
            <h2 className="font-serif text-xl font-bold">Artikel lainnya</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="group block overflow-hidden rounded-lg border border-border bg-card hover:border-primary"
                  >
                    {p.cover && (
                      <img
                        src={normalizeCover(p.cover)}
                        alt={p.title}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => coverErrorHandler(e, p.cover!, 640)}
                        className="aspect-[16/9] w-full object-cover"
                      />
                    )}

                    <div className="p-4">
                      <div className="font-semibold group-hover:text-primary">{p.title}</div>
                      <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.description}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </Layout>
  );
}
