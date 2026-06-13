import { ogCard, OG_SIZE } from "@/lib/ogCard";
import { SITE } from "@/lib/site";
import { TOOLS } from "@/lib/registry";

// Homepage social card. Next.js auto-injects this as the site's og:image.
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `${SITE.name} — ${SITE.tagline}`;

export default function Image() {
  return ogCard({
    title: `${TOOLS.length} fast, free online tools`,
    subtitle: "Converters, calculators, generators, formatters and validators — no sign-up.",
  });
}
