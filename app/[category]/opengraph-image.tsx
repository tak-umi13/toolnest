import { ogCard, OG_SIZE } from "@/lib/ogCard";
import { CATEGORIES, getCategory, getToolsInCategory } from "@/lib/registry";

// Per-category hub social card.
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  const n = getToolsInCategory(category).length;
  return ogCard({
    title: cat?.name ?? "Free Online Tools",
    subtitle: cat ? `${n} free ${cat.name.toLowerCase()} that run in your browser` : undefined,
    badge: "Category",
  });
}
