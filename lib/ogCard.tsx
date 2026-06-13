import { ImageResponse } from "next/og";

// Shared Open Graph card renderer — every page type (tool, category, guide,
// home) gets a consistent branded 1200×630 social image generated at build
// time, no design work per page. Satori requires explicit display:flex.

export const OG_SIZE = { width: 1200, height: 630 };

export function ogCard({ title, subtitle, badge }: { title: string; subtitle?: string; badge?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundImage: "linear-gradient(135deg, #0e1117 0%, #16224a 100%)",
          color: "#f5f7fa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 38, fontWeight: 700 }}>
          <span style={{ color: "#5b8cff" }}>Tool</span>
          <span>Nest</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {badge && <div style={{ display: "flex", fontSize: 26, color: "#8aa0c8", textTransform: "uppercase", letterSpacing: 2 }}>{badge}</div>}
          <div style={{ display: "flex", fontSize: title.length > 32 ? 54 : 68, fontWeight: 700, lineHeight: 1.15 }}>{title}</div>
          {subtitle && (
            <div style={{ display: "flex", fontSize: 28, color: "#aab8d0", lineHeight: 1.4 }}>
              {subtitle.length > 120 ? subtitle.slice(0, 117) + "…" : subtitle}
            </div>
          )}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#8aa0c8" }}>Free · No sign-up · Runs in your browser</div>
      </div>
    ),
    OG_SIZE
  );
}
