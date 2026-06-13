import { ogCard, OG_SIZE } from "@/lib/ogCard";
import { TOOLS, getTool, getCategory } from "@/lib/registry";

// One branded social card per tool, generated at build time with the tool's
// own name and tagline. Mirrors the page's params so all are pre-rendered.
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ category: t.category, tool: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ category: string; tool: string }> }) {
  const { category, tool: toolSlug } = await params;
  const tool = getTool(category, toolSlug);
  const cat = getCategory(category);
  return ogCard({
    title: tool?.name ?? "Free Online Tool",
    subtitle: tool?.tagline,
    badge: cat?.name,
  });
}
