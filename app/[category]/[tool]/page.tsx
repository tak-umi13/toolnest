import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS, getCategory, getTool, toolPath, categoryPath, articlesForTool, articlePath } from "@/lib/registry";
import { getRelatedTools } from "@/lib/related";
import { toolMetadata, breadcrumbJsonLd, softwareAppJsonLd, faqJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { AdSlot } from "@/components/AdSlot";
import { ShareButton } from "@/components/ShareButton";
import { RecentTracker } from "@/components/RecentTools";
import { ToolRenderer } from "@/components/tools/ToolRenderer";

// One static page per tool. This single template is the whole point of the
// data-driven design: 12 tools or 1,200, the rendering code never changes.
export function generateStaticParams() {
  return TOOLS.map((t) => ({ category: t.category, tool: t.slug }));
}

// Next 16: route params are async — await them before use.
export async function generateMetadata({ params }: { params: Promise<{ category: string; tool: string }> }): Promise<Metadata> {
  const { category, tool: toolSlug } = await params;
  const tool = getTool(category, toolSlug);
  return tool ? toolMetadata(tool) : {};
}

export default async function ToolPage({ params }: { params: Promise<{ category: string; tool: string }> }) {
  const { category, tool: toolSlug } = await params;
  const tool = getTool(category, toolSlug);
  if (!tool) notFound();

  const cat = getCategory(tool.category)!;
  const related = getRelatedTools(tool, TOOLS, 6);
  const guides = articlesForTool(tool.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: cat.name, path: categoryPath(cat) },
    { name: tool.name, path: toolPath(tool) },
  ];

  return (
    <>
      {/* Three schema types per page: breadcrumb trail, the tool itself, and FAQs. */}
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={softwareAppJsonLd(tool)} />
      <JsonLd data={faqJsonLd(tool)} />

      <Breadcrumbs crumbs={crumbs} />

      <div className="container">
        <RecentTracker name={tool.name} path={toolPath(tool)} />
        <header style={{ marginBottom: 18, display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 12 }}>
          <div style={{ flex: "1 1 auto", minWidth: 240 }}>
            <h1>{tool.h1}</h1>
            <p className="lead muted" style={{ margin: 0 }}>{tool.tagline}</p>
            {tool.updated && (
              <p className="small" style={{ margin: "8px 0 0", color: "var(--primary)" }}>
                ✓ {tool.updateNote ? `${tool.updateNote} · ` : ""}updated{" "}
                {new Date(tool.updated).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            )}
          </div>
          <ShareButton title={tool.name} />
        </header>

        <div className="tool-layout">
          <div>
            {/* The interactive widget */}
            <div className="tool-shell">
              <ToolRenderer component={tool.component} params={tool.params} />
            </div>

            {/* YMYL trust signal: finance & health results are informational, and we say so. */}
            {cat.id === "finance" && (
              <p className="muted small" style={{ marginTop: 10 }}>
                Results are estimates for information only, not financial advice. See{" "}
                <Link href="/about">how we build and verify our calculators</Link>.
              </p>
            )}
            {cat.id === "health" && (
              <p className="muted small" style={{ marginTop: 10 }}>
                Results are general estimates for information only, not medical advice — consult a
                qualified professional for health decisions. See{" "}
                <Link href="/about">how we build our calculators</Link>.
              </p>
            )}

            <p className="prose" style={{ marginTop: 20 }}>{tool.intro}</p>

            {/* How-to */}
            <div className="prose">
              <h2>How to use the {tool.name}</h2>
              <ol>
                {tool.howTo.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            <AdSlot label="In-content ad" style={{ margin: "24px 0" }} />

            {/* FAQ */}
            <div className="prose">
              <h2>Frequently asked questions</h2>
              {tool.faqs.map((f, i) => (
                <details className="faq-item" key={i}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Sidebar: related tools (internal linking) + ad */}
          <aside className="sidebar">
            {related.length > 0 && (
              <div className="panel">
                <h4>Related tools</h4>
                <ul className="related-list">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={toolPath(r)}>{r.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {guides.length > 0 && (
              <div className="panel">
                <h4>Guides &amp; explainers</h4>
                <ul className="related-list">
                  {guides.map((g) => (
                    <li key={g.slug}>
                      <Link href={articlePath(g)}>{g.h1}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="panel">
              <h4>{cat.emoji} {cat.name}</h4>
              <p className="muted small">{cat.intro}</p>
              <Link href={categoryPath(cat)} className="btn btn-ghost" style={{ marginTop: 8 }}>
                See all {cat.name.toLowerCase()} →
              </Link>
            </div>
            <AdSlot label="Sidebar ad" />
          </aside>
        </div>
      </div>
    </>
  );
}
