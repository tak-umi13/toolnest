import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES, CATEGORIES, articlePath } from "@/lib/registry";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Guides & Explainers — ${SITE.name}`,
  description: `Plain-English guides and explainers from ${SITE.name} — how the formulas and rules behind our calculators and tools actually work.`,
  alternates: { canonical: absoluteUrl("/guides") },
};

export default function GuidesPage() {
  const cats = CATEGORIES.filter((c) => ARTICLES.some((a) => a.category === c.id));

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <h1>Guides &amp; explainers</h1>
      <p className="lead muted" style={{ maxWidth: 640 }}>
        {ARTICLES.length} plain-English guides explaining the formulas, rules and ideas behind our
        tools — so you understand the numbers, not just see them.
      </p>

      {cats.map((c) => {
        const arts = ARTICLES.filter((a) => a.category === c.id);
        return (
          <section className="section" key={c.id}>
            <div className="section-head">
              <h2>{c.emoji} {c.name}</h2>
              <Link href={`/${c.id}`} className="small">All {c.name.toLowerCase()} →</Link>
            </div>
            <div className="tool-grid">
              {arts.map((a) => (
                <Link key={`${a.category}/${a.slug}`} href={articlePath(a)} className="tool-card">
                  <span className="tag">Guide</span>
                  <h3>{a.h1}</h3>
                  <p>{a.description}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
