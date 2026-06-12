import Link from "next/link";
import { CATEGORIES, categoryPath } from "@/lib/registry";
import { ThemeToggle } from "./ThemeToggle";

// Top-level nav exposes every category, so any tool is reachable in two clicks
// from anywhere (home/category -> tool). This shallow depth is deliberate SEO
// architecture, not just convenience.
export function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="brand">
          Tool<span>Nest</span>
        </Link>
        <nav className="nav" aria-label="Categories">
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={categoryPath(c)}>
              {c.name}
            </Link>
          ))}
          <Link href="/tools">All Tools</Link>
        </nav>
        <div className="header-right">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
