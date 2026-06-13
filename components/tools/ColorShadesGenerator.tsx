"use client";

import { useState } from "react";
import { CopyButton } from "./ui";
import { hexToRgb, rgbToHsl, hslToRgb, rgbToHex } from "../../lib/color";

// Tints mix toward white (raise lightness), shades mix toward black (lower it),
// keeping hue/saturation fixed so the ramp stays on-brand.
function ramp(hex: string) {
  const rgb = hexToRgb(hex) ?? { r: 37, g: 99, b: 235 };
  const { h, s } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const steps: { label: string; hex: string }[] = [];
  for (let l = 95; l >= 5; l -= 10) {
    const c = hslToRgb(h, s, l);
    steps.push({ label: `${l}%`, hex: rgbToHex(c.r, c.g, c.b) });
  }
  return steps;
}

export function ColorShadesGenerator() {
  const [hex, setHex] = useState("#2563eb");
  const steps = ramp(hex);
  const allCss = steps.map((s) => s.hex).join(", ");

  return (
    <div>
      <div className="row" style={{ alignItems: "center" }}>
        <div className="field">
          <label htmlFor="cs">Base color</label>
          <input id="cs" type="color" value={hex} onChange={(e) => setHex(e.target.value)} style={{ width: 64, height: 44, border: "none", background: "none", cursor: "pointer" }} />
        </div>
        <div className="field" style={{ flex: 1 }}>
          <label htmlFor="csh">HEX</label>
          <input id="csh" className="input" value={hex} onChange={(e) => setHex(e.target.value)} />
        </div>
      </div>
      <div className="field" style={{ marginTop: 12 }}>
        <label>Tints &amp; shades (light → dark)</label>
        <div style={{ display: "flex", flexDirection: "column", borderRadius: 10, overflow: "hidden", border: "1px solid var(--border, #2a2f3a)" }}>
          {steps.map((s) => {
            const lnum = parseInt(s.label);
            return (
              <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: s.hex, color: lnum > 55 ? "#111" : "#fff", padding: "10px 14px" }}>
                <span style={{ fontFamily: "monospace", fontWeight: 600 }}>{s.hex.toUpperCase()}</span>
                <CopyButton value={s.hex.toUpperCase()} />
              </div>
            );
          })}
        </div>
      </div>
      <CopyButton value={allCss} label="Copy all HEX" className="btn btn-primary" />
      <p className="muted small" style={{ marginTop: 10 }}>
        Each swatch keeps the base hue and saturation while stepping lightness from 95%
        (lightest tint) down to 5% (darkest shade) — a ready-made palette ramp for a
        design system. Generated in your browser.
      </p>
    </div>
  );
}
