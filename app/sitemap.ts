import type { MetadataRoute } from "next";
import { ARTICLES, CATEGORIES, TOOLS, articlePath, categoryPath, toolPath } from "@/lib/registry";
import { absoluteUrl } from "@/lib/site";

// Auto-generated sitemap. Because it iterates the registry, every tool you add
// is included with no extra work — this is the discovery half of programmatic SEO.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/tools"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: absoluteUrl(categoryPath(c)),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const toolPages: MetadataRoute.Sitemap = TOOLS.map((t) => ({
    url: absoluteUrl(toolPath(t)),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const articlePages: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: absoluteUrl(articlePath(a)),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.55,
  }));

  return [...staticPages, ...categoryPages, ...toolPages, ...articlePages];
}
