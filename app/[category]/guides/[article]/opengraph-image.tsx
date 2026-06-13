import { ogCard, OG_SIZE } from "@/lib/ogCard";
import { ARTICLES, getArticle } from "@/lib/registry";

// Per-guide article social card.
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ category: a.category, article: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ category: string; article: string }> }) {
  const { category, article } = await params;
  const a = getArticle(category, article);
  return ogCard({
    title: a?.h1 ?? "Guide",
    subtitle: a?.description,
    badge: "Guide",
  });
}
