import Link from "next/link";
import { ARTICLES, CATEGORIES, TOOLS, articlePath, categoryPath } from "@/lib/registry";
import { SITE } from "@/lib/site";

// Compact footer: category names link to each hub (one tidy column), with the
// Guides list kept in full. Deeper tool links live on the category pages.
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
          <div>
            <strong className="small">Tools</strong>
            {CATEGORIES.map((c) => (
              <Link key={c.id} href={categoryPath(c)}>
                {c.name}
              </Link>
            ))}
          </div>
          <div>
            <strong className="small">Guides</strong>
            <Link href="/guides">All guides</Link>
            {ARTICLES.slice(0, 5).map((a) => (
              <Link key={`${a.category}/${a.slug}`} href={articlePath(a)}>
                {a.h1}
              </Link>
            ))}
          </div>
        </div>
        <hr className="div" />
        <p className="muted small center">
          © {new Date().getFullYear()} {SITE.name}. All tools run locally in your
          browser — your data stays with you.
          <br />
          <Link href="/about">About</Link> ·{" "}
          <Link href="/guides">Guides</Link> ·{" "}
          <Link href="/privacy">Privacy Policy</Link> ·{" "}
          <Link href="/contact">Contact</Link>
        </p>
      </div>
    </footer>
  );
}
