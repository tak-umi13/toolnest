import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { MenuTab } from "./MenuTab";

// With 10 categories an inline nav wrapped to several rows, so the brand sits on
// the left and everything (categories, all tools, guides, about, contact) is
// consolidated into one Menu tab on the right. Internal-link depth is preserved
// via the homepage category grid, the footer mega-menu and the /guides hub.
export function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="brand">
          Tool<span>Nest</span>
        </Link>
        <div className="header-right">
          <MenuTab />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
