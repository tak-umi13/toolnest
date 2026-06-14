// Global site configuration. The canonical domain comes from the environment so
// the same build works in dev and prod; everything SEO-related (sitemap, robots,
// canonical tags, Open Graph) derives from SITE.url.

export const SITE = {
  name: "ToolNest",
  // No trailing slash. Override via NEXT_PUBLIC_SITE_URL in .env.local.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, ""),
  tagline: "Fast, free, no-signup online tools",
  email: "toolnest.app13@gmail.com",
  description:
    "A growing library of fast, free, no-signup tools — converters, calculators, generators, formatters and validators that just work in your browser.",
  twitter: "@toolnest",
  locale: "en_US",
  // GA4 Measurement ID (G-XXXXXXXXXX). Set NEXT_PUBLIC_GA_ID in the environment.
  // Empty string ⇒ analytics is skipped entirely (e.g. local dev).
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
};

export function absoluteUrl(path: string): string {
  if (!path.startsWith("/")) path = "/" + path;
  return SITE.url + path;
}
