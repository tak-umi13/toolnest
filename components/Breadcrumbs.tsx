import Link from "next/link";
import type { Crumb } from "@/lib/seo";

// Visible breadcrumb trail. Pairs with breadcrumbJsonLd() so the same hierarchy
// is exposed to both users and search engines. Keeps tools within 3 clicks of
// home, as the architecture brief requires.
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="breadcrumbs container" aria-label="Breadcrumb">
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1;
        return (
          <span key={c.path}>
            {last ? (
              <span aria-current="page">{c.name}</span>
            ) : (
              <Link href={c.path}>{c.name}</Link>
            )}
            {!last && <span className="sep">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
