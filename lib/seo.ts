import type { Metadata } from "next";
import type { Article, Category, FAQ, Tool } from "./registry/types";
import { SITE, absoluteUrl } from "./site";
import { articlePath, categoryPath, toolPath } from "./registry";

// ---- Metadata builders ---------------------------------------------------
// Centralizing metadata means every page gets canonical URLs, Open Graph and
// Twitter cards consistently. Change the recipe once, fix it everywhere.

export function toolMetadata(tool: Tool): Metadata {
  const url = absoluteUrl(toolPath(tool));
  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: SITE.locale,
    },
    twitter: {
      card: "summary",
      title: tool.title,
      description: tool.description,
    },
  };
}

export function categoryMetadata(category: Category): Metadata {
  const url = absoluteUrl(categoryPath(category));
  return {
    title: category.title,
    description: category.description,
    alternates: { canonical: url },
    openGraph: {
      title: category.title,
      description: category.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: SITE.locale,
    },
    twitter: { card: "summary", title: category.title, description: category.description },
  };
}

export function articleMetadata(article: Article): Metadata {
  const url = absoluteUrl(articlePath(article));
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      siteName: SITE.name,
      type: "article",
      locale: SITE.locale,
    },
    twitter: { card: "summary", title: article.title, description: article.description },
  };
}

// ---- JSON-LD structured data ---------------------------------------------
// Returns plain objects; a <JsonLd> component serializes them into a script tag.

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function softwareAppJsonLd(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url: absoluteUrl(toolPath(tool)),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web browser)",
    // Free, no-signup tools: declaring a $0 price is accurate and unlocks the
    // rich result. Don't fake review ratings — that violates Google's policy.
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    ...(tool.updated ? { dateModified: tool.updated } : {}),
  };
}

// Works for tools and guides alike — anything carrying a faqs array.
export function faqJsonLd(item: { faqs?: FAQ[] }) {
  if (!item.faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: item.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleJsonLd(article: Article) {
  const url = absoluteUrl(articlePath(article));
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.h1,
    description: article.description,
    url,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    ...(article.updated ? { dateModified: article.updated } : {}),
  };
}
