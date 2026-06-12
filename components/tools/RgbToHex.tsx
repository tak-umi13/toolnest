"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

const clamp = (n: number) => Math.max(0, Math.min(255, isNaN(n) ? 0 : Math.round(n)));
const toHex = (r: number, g: number, b: number) =>
  "#" + [r, g, b].map((n) => clamp(n).toString(16).padStart(2, "0")).join("");

export function RgbToHex() {
  const [r, setR] = useState(37);
  const [g, setG] = useState(99);
  const [b, setB] = useState(235);

  const hex = toHex(r, g, b);
  const rgbString = `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`;

  const channel = (label: string, value: number, set: (n: number) => void) => (
    <div className="field">
      <label>{label}</label>
      <input className="input" type="number" min={0} max={255} value={value} onChange={(e) => set(Number(e.target.value))} />
      <input type="range" min={0} max={255} value={clamp(value)} onChange={(e) => set(Number(e.target.value))} aria-label={`${label} slider`} style={{ width: "100%", marginTop: 6 }} />
    </div>
  );

  return (
    <div>
      <div className="row">
        {channel("R", r, setR)}
        {channel("G", g, setG)}
        {channel("B", b, setB)}
      </div>
      <div className="row">
        <div className="field">
          <label>Preview</label>
          <div style={{ height: 56, borderRadius: 8, border: "1px solid var(--border)", background: rgbString }} />
        </div>
        <div className="field">
          <label>HEX value</label>
          <div className="tool-output" style={{ minHeight: 56, display: "flex", alignItems: "center", fontSize: "1.2rem" }}>{hex}</div>
        </div>
      </div>
      <div className="btn-row">
        <CopyButton value={hex} label="Copy HEX" className="btn btn-primary" />
        <CopyButton value={rgbString} label="Copy RGB" />
      </div>
    </div>
  );
}
