import Link from "next/link";
import { CATEGORIES, TOOLS, categoryPath, getToolsInCategory, toolPath } from "@/lib/registry";
import { SITE } from "@/lib/site";

// The footer is a sitewide internal-linking surface: linking the top tool in
// each category from every page pushes authority to the pages that monetize best.
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-cols">
          <div>
            <Link href="/" className="brand">
              Tool<span>Nest</span>
            </Link>
            <p className="muted small" style={{ marginTop: 10 }}>
              {SITE.tagline}. {TOOLS.length} tools and growing — converters,
              calculators, generators and validators that run right in your browser.
            </p>
          </div>
          {CATEGORIES.map((c) => {
            const top = getToolsInCategory(c.id).slice(0, 4);
            return (
              <div key={c.id}>
                <strong className="small">{c.name}</strong>
                <Link href={categoryPath(c)}>All {c.name.toLowerCase()}</Link>
                {top.map((t) => (
                  <Link key={t.slug} href={toolPath(t)}>
                    {t.name}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
        <hr className="div" />
        <p className="muted small center">
          © {new Date().getFullYear()} {SITE.name}. All tools run locally in your
          browser — your data stays with you.
        </p>
      </div>
    </footer>
  );
}
