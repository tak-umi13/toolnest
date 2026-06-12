// The data model that powers programmatic SEO. Every tool page and category hub
// is rendered from these two shapes — add an entry, get a fully optimized page
// (metadata, schema, breadcrumbs, internal links, sitemap entry) for free.

export interface FAQ {
  q: string;
  a: string;
}

export type MonetizationTier = "Very High" | "High" | "Medium" | "Low";

export interface Category {
  /** Stable id; also used as the URL segment, e.g. "finance" -> /finance */
  id: string;
  name: string; // "Finance Calculators"
  title: string; // SEO <title> for the hub page
  description: string; // meta description for the hub page
  intro: string; // human intro paragraph shown on the hub
  emoji: string;
  monetization: {
    tier: MonetizationTier;
    method: string; // primary method, e.g. "AdSense + lead-gen"
    note: string;
  };
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

/**
 * A supporting-content guide (the "topical authority" layer). Guides target
 * informational keywords around a tool's commercial keyword, link back to the
 * tool, and are rendered at /{category}/guides/{slug} from this data alone.
 */
export interface Article {
  slug: string;
  /** Category id this guide belongs to. Must match a Category.id. */
  category: string;
  title: string; // SEO <title>
  h1: string;
  description: string; // meta description
  keywords: string[];
  intro: string;
  sections: ArticleSection[];
  faqs?: FAQ[];
  /** Tool slugs this guide supports — rendered as CTAs and sidebar links. */
  relatedTools: string[];
  relatedArticles?: string[];
}

export interface Tool {
  /** URL segment within its category, e.g. "sip-calculator" -> /finance/sip-calculator */
  slug: string;
  /** Category id this tool belongs to. Must match a Category.id. */
  category: string;
  name: string; // "SIP Calculator"
  h1: string; // on-page H1 (can differ slightly from name for keywords)
  tagline: string; // one line under the H1
  title: string; // SEO <title>
  description: string; // meta description (CTR-optimized, ~150 chars)
  intro: string; // intro paragraph rendered above the tool
  keywords: string[];
  /** Key into the client component registry (components/tools/ToolRenderer). */
  component: string;
  /**
   * Optional config passed to the widget. Lets one parametrized component power
   * many tools — e.g. a single UnitConverter renders length/weight/speed/… by
   * varying `params.set`.
   */
  params?: Record<string, string | number | boolean>;
  howTo: string[]; // numbered "how to use" steps
  faqs: FAQ[]; // rendered as <details> + FAQPage schema
  /** Optional hand-picked related tool slugs; the linker fills the rest. */
  related?: string[];
  /**
   * Monthly search volume for the primary keyword — best of US/India, validated
   * via DataForSEO (June 2026, see scripts/keyword-report.json). Drives the
   * homepage "trending" ordering and build priority.
   */
  volumeEstimate?: number;
}
