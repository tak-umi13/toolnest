import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, getCategory, getToolsInCategory, getArticlesInCategory, toolPath, articlePath } from "@/lib/registry";
import { categoryMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { AdSlot } from "@/components/AdSlot";

// Pre-render one static page per category at build time.
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

// Next 16: route params are async — await them before use.
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  return cat ? categoryMetadata(cat) : {};
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const tools = getToolsInCategory(cat.id);
  const guides = getArticlesInCategory(cat.id);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: cat.name, path: `/${cat.id}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs crumbs={crumbs} />
      <div className="container">
        <h1>{cat.emoji} {cat.name}</h1>
        <p className="lead muted">{cat.intro}</p>

        <div className="tool-grid" style={{ marginTop: 20 }}>
          {tools.map((t) => (
            <Link key={t.slug} href={toolPath(t)} className="tool-card">
              <h3>{t.name}</h3>
              <p>{t.tagline}</p>
            </Link>
          ))}
        </div>

        {guides.length > 0 && (
          <section className="section">
            <h2>Guides &amp; explainers</h2>
            <div className="tool-grid">
              {guides.map((g) => (
                <Link key={g.slug} href={articlePath(g)} className="tool-card">
                  <span className="tag">Guide</span>
                  <h3>{g.h1}</h3>
                  <p>{g.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <AdSlot label="In-content ad" style={{ margin: "28px 0" }} />
      </div>
    </>
  );
}
