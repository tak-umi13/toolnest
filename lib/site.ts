// Global site configuration. The canonical domain comes from the environment so
// the same build works in dev and prod; everything SEO-related (sitemap, robots,
// canonical tags, Open Graph) derives from SITE.url.

export const SITE = {
  name: "ToolNest",
  // No trailing slash. Override via NEXT_PUBLIC_SITE_URL in .env.local.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, ""),
  tagline: "Fast, free, no-signup online tools",
  description:
    "A growing library of fast, free, no-signup tools — converters, calculators, generators, formatters and validators that just work in your browser.",
  twitter: "@toolnest",
  locale: "en_US",
};

export function absoluteUrl(path: string): string {
  if (!path.startsWith("/")) path = "/" + path;
  return SITE.url + path;
}
