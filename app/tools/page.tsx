import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, TOOLS, getToolsInCategory, categoryPath, toolPath } from "@/lib/registry";
import { absoluteUrl } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: `All Tools — ${TOOLS.length} Free Online Utilities`,
  description: `Browse all ${TOOLS.length} free online tools — converters, calculators, generators, formatters and validators. No signup, instant results.`,
  alternates: { canonical: absoluteUrl("/tools") },
};

export default function AllToolsPage() {
  return (
    <>
      <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "All Tools", path: "/tools" }]} />
      <div className="container">
        <h1>All Tools</h1>
        <p className="muted">Every tool, grouped by category. {TOOLS.length} and counting.</p>

        {CATEGORIES.map((c) => (
          <section className="section" key={c.id}>
            <div className="section-head">
              <h2>{c.emoji} {c.name}</h2>
              <Link href={categoryPath(c)} className="small">Hub →</Link>
            </div>
            <div className="tool-grid">
              {getToolsInCategory(c.id).map((t) => (
                <Link key={t.slug} href={toolPath(t)} className="tool-card">
                  <h3>{t.name}</h3>
                  <p>{t.tagline}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
