# ToolNest — programmatic SEO tool platform

A data-driven Next.js platform for shipping hundreds-to-thousands of "boring but
searchable" utility tools (converters, calculators, generators, formatters,
validators). Every page — metadata, schema, breadcrumbs, internal links, sitemap
entry — is generated from a central **tool registry**, so growth is "add a data
entry," not "build a new page."

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

Set your production domain in `.env.local` (copy from `.env.example`):

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

This drives canonical URLs, `sitemap.xml`, `robots.txt` and Open Graph tags.

**Deploying:** see [DEPLOY.md](DEPLOY.md) for the Vercel checklist (env vars,
custom domain, Search Console submission, monetization order). Runs on
Next 16 / React 19 with security headers preconfigured.

## Architecture

```
app/
  layout.tsx              Root shell, no-flash dark mode, sitewide metadata
  page.tsx                Homepage (hero, search, categories, trending)
  tools/page.tsx          Full tool directory
  [category]/page.tsx     Category hub (1 static page per category)
  [category]/[tool]/page.tsx   Tool template (1 static page per tool)
  sitemap.ts, robots.ts   SEO discovery, generated from the registry
lib/
  registry/               THE ENGINE — the single source of truth
    types.ts              Tool & Category shapes
    categories.ts         Categories + monetization tiers
    tools/*.ts            Tool definitions (1 entry = 1 SEO page)
    index.ts              Aggregation, lookups, URL helpers
  seo.ts                  Metadata + JSON-LD builders
  related.ts              Internal-linking engine (scoring is yours to shape)
  site.ts                 Global config
components/
  tools/                  The interactive widgets + ToolRenderer registry
  Header, Footer, Breadcrumbs, ToolSearch, ThemeToggle, AdSlot, JsonLd
```

## How to add a tool (the whole workflow)

1. **Add a registry entry** in the right `lib/registry/tools/<category>.ts`. Fill
   in `slug`, `title`, `description`, `intro`, `keywords`, `howTo`, `faqs`, and a
   `component` key.
2. **Build the widget** in `components/tools/<Name>.tsx` (a `"use client"`
   component) and register its key in `components/tools/ToolRenderer.tsx`.
3. That's it. The page, metadata, breadcrumbs, schema, sitemap entry, search
   index and internal links all appear automatically.

To add a **category**: add it to `categories.ts` and create
`lib/registry/tools/<id>.ts`, then include it in `registry/index.ts`.

## SEO features built in

- Per-page `<title>`, meta description, canonical, Open Graph + Twitter cards
- JSON-LD: `BreadcrumbList`, `SoftwareApplication`, `FAQPage`
- Auto `sitemap.xml` + `robots.txt`
- Static generation (SSG) of every tool page for speed + crawlability
- Internal linking: related tools, footer hubs, category cross-links (≤3 clicks)

## Monetization

Each category declares a tier in `categories.ts` (Finance/SEO monetize best).
`<AdSlot>` placeholders are pre-sized so dropping in real ad code won't shift
layout (protects Core Web Vitals). Add affiliate/lead-gen blocks per the tier note.

## Honest note on keyword data

`volumeEstimate` values are **curated estimates** to prioritize build order, not
API-verified numbers. To validate for real, wire up DataForSEO using the
credentials in `.env.example` (the app does not call it yet).

## Roadmap to 1,000

The 12 seeded tools prove the template across 5 categories. Scaling is a content
exercise: batch-add registry entries (start with the highest-estimate, lowest-
competition tools), reuse widget patterns where possible (every "X to Y"
converter shares one component shape), and let the engine do the SEO plumbing.
```
