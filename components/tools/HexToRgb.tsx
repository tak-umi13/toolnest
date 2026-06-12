"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

interface Rgb {
  r: number;
  g: number;
  b: number;
}

function parseHex(hex: string): Rgb | null {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join(""); // expand shorthand
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }: Rgb): string {
  const c = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

export function HexToRgb() {
  const [hex, setHex] = useState("#2563eb");
  const rgb = parseHex(hex);

  function setChannel(ch: keyof Rgb, value: number) {
    const base = rgb ?? { r: 0, g: 0, b: 0 };
    setHex(rgbToHex({ ...base, [ch]: isNaN(value) ? 0 : value }));
  }

  const rgbString = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "";

  return (
    <div>
      <div className="row">
        <div className="field">
          <label htmlFor="hx">HEX</label>
          <input id="hx" className="input" value={hex} onChange={(e) => setHex(e.target.value)} placeholder="#2563eb" />
        </div>
        <div className="field">
          <label>Preview</label>
          <div style={{ height: 44, borderRadius: 8, border: "1px solid var(--border)", background: rgb ? rgbString : "transparent" }} />
        </div>
      </div>
      <div className="row">
        <div className="field"><label>R</label><input className="input" type="number" min={0} max={255} value={rgb?.r ?? ""} onChange={(e) => setChannel("r", parseInt(e.target.value, 10))} /></div>
        <div className="field"><label>G</label><input className="input" type="number" min={0} max={255} value={rgb?.g ?? ""} onChange={(e) => setChannel("g", parseInt(e.target.value, 10))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>B</label><input className="input" type="number" min={0} max={255} value={rgb?.b ?? ""} onChange={(e) => setChannel("b", parseInt(e.target.value, 10))} /></div>
        <div className="field"><label>RGB value</label><div className="tool-output" style={{ minHeight: 44 }}>{rgbString || "Invalid hex"}</div></div>
      </div>
      <div className="btn-row">
        <CopyButton value={hex} label="Copy HEX" />
        <CopyButton value={rgbString} label="Copy RGB" className="btn btn-primary" />
      </div>
    </div>
  );
}
