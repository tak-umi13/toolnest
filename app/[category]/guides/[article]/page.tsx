import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ARTICLES,
  getArticle,
  getCategory,
  getToolBySlug,
  articlePath,
  categoryPath,
  toolPath,
} from "@/lib/registry";
import { articleMetadata, articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { AdSlot } from "@/components/AdSlot";
import type { Article } from "@/lib/registry";

// One static page per guide, generated from the article registry — the same
// data-driven pattern as tool pages, applied to the topical-authority layer.
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ category: a.category, article: a.slug }));
}

// Next 16: route params are async — await them before use.
export async function generateMetadata({ params }: { params: Promise<{ category: string; article: string }> }): Promise<Metadata> {
  const { category, article } = await params;
  const a = getArticle(category, article);
  return a ? articleMetadata(a) : {};
}

// Anchor ids for the table of contents.
function anchor(heading: string): string {
  return heading.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

// ~200 wpm silent-reading estimate across all rendered text.
function readingMinutes(article: Article): number {
  const text = [
    article.intro,
    ...article.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]),
    ...(article.faqs ?? []).flatMap((f) => [f.q, f.a]),
  ].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

export default async function ArticlePage({ params }: { params: Promise<{ category: string; article: string }> }) {
  const { category, article: articleSlug } = await params;
  const article = getArticle(category, articleSlug);
  if (!article) notFound();

  const cat = getCategory(article.category)!;
  const tools = article.relatedTools.map(getToolBySlug).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const primaryTool = tools[0];
  const related = (article.relatedArticles ?? [])
    .map((slug) => getArticle(article.category, slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const crumbs = [
    { name: "Home", path: "/" },
    { name: cat.name, path: categoryPath(cat) },
    { name: article.h1, path: articlePath(article) },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd data={faqJsonLd(article)} />

      <Breadcrumbs crumbs={crumbs} />

      <div className="container">
        <header style={{ marginBottom: 14 }}>
          <h1>{article.h1}</h1>
          <span className="read-time">⏱ {readingMinutes(article)} min read</span>
        </header>

        <div className="tool-layout">
          <div className="prose">
            <p className="lead muted">{article.intro}</p>

            {/* Article → tool link: the conversion path this guide exists for. */}
            {primaryTool && (
              <p>
                <Link href={toolPath(primaryTool)} className="btn btn-primary">
                  Try the {primaryTool.name} →
                </Link>
              </p>
            )}

            <nav className="toc" aria-label="Table of contents">
              <strong>On this page</strong>
              {article.sections.map((s) => (
                <a key={s.heading} href={`#${anchor(s.heading)}`}>
                  {s.heading}
                </a>
              ))}
            </nav>

            {article.sections.map((s, i) => (
              <section key={i}>
                <h2 id={anchor(s.heading)}>{s.heading}</h2>
                {s.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {s.bullets && (
                  <ul>
                    {s.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <AdSlot label="In-content ad" style={{ margin: "24px 0" }} />

            {article.faqs && article.faqs.length > 0 && (
              <>
                <h2>Frequently asked questions</h2>
                {article.faqs.map((f, i) => (
                  <details className="faq-item" key={i}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </>
            )}
          </div>

          <aside className="sidebar">
            {tools.length > 0 && (
              <div className="panel">
                <h4>Try these tools</h4>
                <ul className="related-list">
                  {tools.map((t) => (
                    <li key={t.slug}>
                      <Link href={toolPath(t)}>{t.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {related.length > 0 && (
              <div className="panel">
                <h4>Related guides</h4>
                <ul className="related-list">
                  {related.map((a) => (
                    <li key={a.slug}>
                      <Link href={articlePath(a)}>{a.h1}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <AdSlot label="Sidebar ad" />
          </aside>
        </div>
      </div>
    </>
  );
}
