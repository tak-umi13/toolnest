import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Web app manifest: enables "Add to Home Screen" with a proper name and icon —
// repeat visitors are the point of a utility site, so make installing it easy.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8fa",
    theme_color: "#2563eb",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
