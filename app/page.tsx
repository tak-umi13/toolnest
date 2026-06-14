import Link from "next/link";
import {
  ARTICLES,
  CATEGORIES,
  TOOLS,
  getCategory,
  getToolsInCategory,
  trendingTools,
  articlePath,
  categoryPath,
  toolPath,
} from "@/lib/registry";
import { ToolSearch, type SearchItem } from "@/components/ToolSearch";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { RecentlyUsed } from "@/components/RecentTools";
import { SITE, absoluteUrl } from "@/lib/site";
import type { Metadata } from "next";

// Explicit self-canonical so the homepage resolves to the apex domain (not www
// or the old host) for search engines.
export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

export default function HomePage() {
  const searchItems: SearchItem[] = TOOLS.map((t) => ({
    name: t.name,
    category: getCategory(t.category)?.name ?? t.category,
    path: toolPath(t),
    tagline: t.tagline,
    keywords: t.keywords,
  }));

  return (
    <div className="container">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url }} />
      <section className="hero">
        <span className="eyebrow"><span className="eyebrow-dot" />Free online tools · No sign-up · No tracking</span>
        <h1>{TOOLS.length} fast, free tools,<br />right in your browser</h1>
        <p className="lead">
          Converters, calculators, generators, formatters and validators that run
          instantly — locally, with nothing uploaded. {SITE.tagline}.
        </p>
        <ToolSearch items={searchItems} />
        <div className="hero-badges">
          <span className="hero-badge">✓ 100% free</span>
          <span className="hero-badge">✓ No sign-up</span>
          <span className="hero-badge">🔒 Runs in your browser</span>
          <span className="hero-badge">⚡ Instant results</span>
        </div>
        <div className="trust-bar" role="list" aria-label="Site at a glance">
          <div className="trust-item" role="listitem"><span className="trust-num">{TOOLS.length}</span><span className="trust-lbl">Tools</span></div>
          <div className="trust-item" role="listitem"><span className="trust-num">{CATEGORIES.length}</span><span className="trust-lbl">Categories</span></div>
          <div className="trust-item" role="listitem"><span className="trust-num">{ARTICLES.length}</span><span className="trust-lbl">Guides</span></div>
          <div className="trust-item" role="listitem"><span className="trust-num">100%</span><span className="trust-lbl">Private</span></div>
        </div>
      </section>

      <RecentlyUsed />

      <section className="section">
        <h2>Browse by category</h2>
        <div className="cat-grid">
          {CATEGORIES.map((c) => {
            const n = getToolsInCategory(c.id).length;
            return (
              <Link key={c.id} href={categoryPath(c)} className="cat-card" data-cat={c.id}>
                <div className="emoji">{c.emoji}</div>
                <h3>{c.name}</h3>
                <p>{n} tool{n === 1 ? "" : "s"}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <AdSlot label="Leaderboard ad" style={{ margin: "8px 0" }} />

      <section className="section">
        <div className="section-head">
          <h2>Trending tools</h2>
          <Link href="/tools" className="small">View all →</Link>
        </div>
        <div className="tool-grid">
          {trendingTools(8).map((t) => (
            <Link key={t.slug} href={toolPath(t)} className="tool-card">
              <span className="tag">{getCategory(t.category)?.name}</span>
              <h3>{t.name}</h3>
              <p>{t.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Guides &amp; explainers</h2>
        </div>
        <div className="tool-grid">
          {ARTICLES.slice(0, 6).map((a) => (
            <Link key={`${a.category}/${a.slug}`} href={articlePath(a)} className="tool-card">
              <span className="tag">Guide</span>
              <h3>{a.h1}</h3>
              <p>{a.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
