import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Next serves this at /robots.txt. Points crawlers at the sitemap so new tool
// pages get discovered automatically as the catalog grows.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
