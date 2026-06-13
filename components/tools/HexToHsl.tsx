"use client";

import { useState } from "react";
import { CopyButton } from "./ui";
import { hexToRgb, rgbToHsl } from "../../lib/color";

export function HexToHsl() {
  const [hex, setHex] = useState("#2563eb");
  const rgb = hexToRgb(hex);
  const valid = rgb !== null;
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
  const hslStr = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "";

  return (
    <div>
      <div className="row" style={{ alignItems: "center" }}>
        <div className="field">
          <label htmlFor="hh">Pick</label>
          <input id="hh" type="color" value={valid ? hex : "#2563eb"} onChange={(e) => setHex(e.target.value)} style={{ width: 64, height: 44, border: "none", background: "none", cursor: "pointer" }} />
        </div>
        <div className="field" style={{ flex: 1 }}>
          <label htmlFor="hht">HEX color</label>
          <input id="hht" className="input" value={hex} onChange={(e) => setHex(e.target.value)} placeholder="#2563eb" />
        </div>
      </div>
      {valid && hsl ? (
        <>
          <div style={{ height: 72, borderRadius: 10, background: hex, border: "1px solid var(--border, #2a2f3a)", margin: "12px 0" }} />
          <div className="stat-row">
            <div className="stat"><div className="num">{hsl.h}°</div><div className="lbl">Hue</div></div>
            <div className="stat"><div className="num">{hsl.s}%</div><div className="lbl">Saturation</div></div>
            <div className="stat"><div className="num">{hsl.l}%</div><div className="lbl">Lightness</div></div>
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label>CSS HSL</label>
            <div className="tool-output" style={{ fontFamily: "monospace" }}>{hslStr}</div>
          </div>
          <CopyButton value={hslStr} className="btn btn-primary" />
        </>
      ) : (
        <p className="small" style={{ color: "#ff6b6b", marginTop: 12 }}>Enter a valid 3- or 6-digit hex code, e.g. #2563eb.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        HSL (hue, saturation, lightness) is easier to tweak than hex — adjust lightness for
        tints/shades or rotate the hue for color schemes. Converted in your browser.
      </p>
    </div>
  );
}
