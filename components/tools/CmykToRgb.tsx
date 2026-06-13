"use client";

import { useState } from "react";
import { CopyButton } from "./ui";
import { cmykToRgb, rgbToHex, clamp } from "../../lib/color";

export function CmykToRgb() {
  const [c, setC] = useState(84);
  const [m, setM] = useState(58);
  const [y, setY] = useState(0);
  const [k, setK] = useState(8);

  const rgb = cmykToRgb(c, m, y, k);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  const field = (label: string, val: number, set: (n: number) => void) => (
    <div className="field">
      <label>{label} (%)</label>
      <input className="input" type="number" min={0} max={100} value={val} onChange={(e) => set(clamp(Number(e.target.value), 0, 100))} />
      <input type="range" min={0} max={100} value={val} onChange={(e) => set(Number(e.target.value))} style={{ width: "100%" }} />
    </div>
  );

  return (
    <div>
      <div className="row" style={{ flexWrap: "wrap" }}>
        {field("Cyan", c, setC)}
        {field("Magenta", m, setM)}
        {field("Yellow", y, setY)}
        {field("Black (K)", k, setK)}
      </div>
      <div style={{ height: 80, borderRadius: 10, background: hex, border: "1px solid var(--border, #2a2f3a)", margin: "12px 0" }} />
      <div className="stat-row">
        <div className="stat"><div className="num">{hex.toUpperCase()}</div><div className="lbl">HEX</div></div>
        <div className="stat"><div className="num">{rgb.r}, {rgb.g}, {rgb.b}</div><div className="lbl">RGB</div></div>
      </div>
      <div className="btn-row" style={{ marginTop: 12 }}>
        <CopyButton value={hex.toUpperCase()} label="Copy HEX" className="btn btn-primary" />
        <CopyButton value={rgbStr} label="Copy RGB" className="btn" />
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        CMYK is a subtractive print model, so converting to RGB is an approximation — exact
        on-screen color also depends on the ICC profile your printer uses. Calculated in your browser.
      </p>
    </div>
  );
}
