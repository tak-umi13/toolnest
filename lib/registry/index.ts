import type { Article, Category, Tool } from "./types";
import { categories } from "./categories";
import { financeArticles } from "./articles/finance";
import { devArticles } from "./articles/dev";
import { textTools } from "./tools/text";
import { devTools } from "./tools/dev";
import { colorTools } from "./tools/color";
import { convertTools } from "./tools/convert";
import { financeTools } from "./tools/finance";
import { seoTools } from "./tools/seo";

export type { Article, ArticleSection, Category, Tool, FAQ, MonetizationTier } from "./types";

// The whole catalog. To add a tool: append to a category file above. To add a
// category: add to categories.ts and create a tools/<id>.ts file. Everything
// downstream (pages, sitemap, search, links) reads from these two arrays.
export const CATEGORIES: Category[] = categories;

export const TOOLS: Tool[] = [
  ...textTools,
  ...devTools,
  ...colorTools,
  ...convertTools,
  ...financeTools,
  ...seoTools,
];

// Supporting-content guides (topical authority layer). One entry = one page at
// /{category}/guides/{slug}, with metadata, schema and internal links included.
export const ARTICLES: Article[] = [...financeArticles, ...devArticles];

// ---- Lookups -------------------------------------------------------------

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getToolsInCategory(categoryId: string): Tool[] {
  return TOOLS.filter((t) => t.category === categoryId);
}

export function getTool(categoryId: string, slug: string): Tool | undefined {
  return TOOLS.find((t) => t.category === categoryId && t.slug === slug);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getArticle(categoryId: string, slug: string): Article | undefined {
  return ARTICLES.find((a) => a.category === categoryId && a.slug === slug);
}

export function getArticlesInCategory(categoryId: string): Article[] {
  return ARTICLES.filter((a) => a.category === categoryId);
}

/** Guides that support a given tool — rendered on the tool page sidebar. */
export function articlesForTool(toolSlug: string): Article[] {
  return ARTICLES.filter((a) => a.relatedTools.includes(toolSlug));
}

// ---- URL helpers (single source of truth for the URL scheme) -------------

export function categoryPath(category: Pick<Category, "id">): string {
  return `/${category.id}`;
}

export function toolPath(tool: Pick<Tool, "category" | "slug">): string {
  return `/${tool.category}/${tool.slug}`;
}

export function articlePath(article: Pick<Article, "category" | "slug">): string {
  return `/${article.category}/guides/${article.slug}`;
}

// Featured/trending = highest estimated demand. Used on the homepage.
export function trendingTools(limit = 8): Tool[] {
  return [...TOOLS]
    .sort((a, b) => (b.volumeEstimate ?? 0) - (a.volumeEstimate ?? 0))
    .slice(0, limit);
}
