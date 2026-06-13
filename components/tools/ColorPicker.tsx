"use client";

import { useState } from "react";
import { CopyButton } from "./ui";
import { hexToRgb, rgbToHsl, rgbToHsv, rgbToCmyk } from "../../lib/color";

export function ColorPicker() {
  const [hex, setHex] = useState("#2563eb");
  const rgb = hexToRgb(hex) ?? { r: 37, g: 99, b: 235 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

  const rows: { label: string; value: string }[] = [
    { label: "HEX", value: hex.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: "HSV", value: `${hsv.h}°, ${hsv.s}%, ${hsv.v}%` },
    { label: "CMYK", value: `${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%` },
  ];

  return (
    <div>
      <div className="row" style={{ alignItems: "center" }}>
        <div className="field">
          <label htmlFor="cp">Pick a color</label>
          <input id="cp" type="color" value={hex} onChange={(e) => setHex(e.target.value)} style={{ width: 80, height: 48, border: "none", background: "none", cursor: "pointer" }} />
        </div>
        <div className="field" style={{ flex: 1 }}>
          <label htmlFor="cph">HEX</label>
          <input id="cph" className="input" value={hex} onChange={(e) => setHex(e.target.value.startsWith("#") || e.target.value === "" ? e.target.value : "#" + e.target.value)} />
        </div>
      </div>
      <div style={{ height: 96, borderRadius: 10, background: hex, border: "1px solid var(--border, #2a2f3a)", margin: "12px 0" }} />
      <div className="field">
        <div className="tool-output" style={{ padding: 0 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} style={{ borderTop: "1px solid var(--border, #2a2f3a)" }}>
                  <td className="muted" style={{ padding: "8px 12px", width: 70 }}>{r.label}</td>
                  <td style={{ padding: "8px 12px", fontFamily: "monospace" }}>{r.value}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right" }}><CopyButton value={r.value} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Pick a color with the swatch or type a HEX code to get RGB, HSL, HSV and CMYK
        instantly. Everything runs in your browser.
      </p>
    </div>
  );
}
