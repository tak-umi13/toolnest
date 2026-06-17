"use client";

import { useState } from "react";

type Size = { name: string; size: string; ratio: string };
const DATA: Record<string, Size[]> = {
  Instagram: [
    { name: "Square post", size: "1080 × 1080", ratio: "1:1" },
    { name: "Portrait post", size: "1080 × 1350", ratio: "4:5" },
    { name: "Story / Reel", size: "1080 × 1920", ratio: "9:16" },
    { name: "Profile picture", size: "320 × 320", ratio: "1:1" },
  ],
  "Facebook": [
    { name: "Shared post", size: "1200 × 630", ratio: "1.91:1" },
    { name: "Cover photo", size: "851 × 315", ratio: "2.7:1" },
    { name: "Story", size: "1080 × 1920", ratio: "9:16" },
    { name: "Profile picture", size: "360 × 360", ratio: "1:1" },
  ],
  "X / Twitter": [
    { name: "In-stream image", size: "1600 × 900", ratio: "16:9" },
    { name: "Header", size: "1500 × 500", ratio: "3:1" },
    { name: "Profile picture", size: "400 × 400", ratio: "1:1" },
  ],
  YouTube: [
    { name: "Thumbnail", size: "1280 × 720", ratio: "16:9" },
    { name: "Channel banner", size: "2560 × 1440", ratio: "16:9" },
    { name: "Channel icon", size: "800 × 800", ratio: "1:1" },
  ],
  LinkedIn: [
    { name: "Shared post image", size: "1200 × 627", ratio: "1.91:1" },
    { name: "Cover (personal)", size: "1584 × 396", ratio: "4:1" },
    { name: "Profile picture", size: "400 × 400", ratio: "1:1" },
  ],
  TikTok: [
    { name: "Video", size: "1080 × 1920", ratio: "9:16" },
    { name: "Profile picture", size: "200 × 200", ratio: "1:1" },
  ],
  Pinterest: [
    { name: "Standard pin", size: "1000 × 1500", ratio: "2:3" },
    { name: "Profile picture", size: "165 × 165", ratio: "1:1" },
  ],
};

export function SocialMediaImageSizes() {
  const platforms = Object.keys(DATA);
  const [active, setActive] = useState("Instagram");

  return (
    <div>
      <div className="btn-row" style={{ flexWrap: "wrap", marginBottom: 12 }}>
        {platforms.map((p) => (
          <button key={p} type="button" className={p === active ? "btn btn-primary" : "btn"} onClick={() => setActive(p)}>{p}</button>
        ))}
      </div>
      <div className="field">
        <label>{active} — recommended sizes (pixels)</label>
        <div className="tool-output" style={{ padding: 0 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ textAlign: "left" }}><th style={{ padding: "8px 12px" }}>Placement</th><th style={{ padding: "8px 12px" }}>Size</th><th style={{ padding: "8px 12px" }}>Ratio</th></tr></thead>
            <tbody>
              {DATA[active].map((s) => (
                <tr key={s.name} style={{ borderTop: "1px solid var(--border, #2a2f3a)" }}>
                  <td style={{ padding: "8px 12px" }}>{s.name}</td>
                  <td style={{ padding: "8px 12px", fontFamily: "var(--mono)", fontWeight: 600 }}>{s.size}</td>
                  <td className="muted" style={{ padding: "8px 12px" }}>{s.ratio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Recommended upload dimensions for each platform. Use the highest resolution shown — platforms
        downscale cleanly but never upscale. Sizes are kept current with each platform&apos;s guidance;
        always preview before posting as platforms tweak these periodically.
      </p>
    </div>
  );
}
