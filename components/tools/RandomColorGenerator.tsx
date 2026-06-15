"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

function randomHex(): string {
  return "#" + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, "0");
}

export function RandomColorGenerator() {
  const [count, setCount] = useState(8);
  const [colors, setColors] = useState<string[]>(() => Array.from({ length: 8 }, randomHex));

  function generate() {
    const n = Math.max(1, Math.min(60, count));
    setColors(Array.from({ length: n }, randomHex));
  }

  return (
    <div>
      <div className="row">
        <div className="field"><label>How many colors</label><input className="input" type="number" min={1} max={60} value={count} onChange={(e) => setCount(Number(e.target.value))} /></div>
        <div className="field" style={{ display: "flex", alignItems: "flex-end" }}>
          <button type="button" className="btn btn-primary" onClick={generate}>Generate colors</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 10, marginTop: 6 }}>
        {colors.map((hex, i) => (
          <div key={i} style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)" }}>
            <div style={{ background: hex, height: 70, display: "flex", alignItems: "flex-end", justifyContent: "flex-end", padding: 6 }}>
              <CopyButton value={hex.toUpperCase()} label="Copy" className="btn" />
            </div>
            <div style={{ padding: "6px 8px", fontFamily: "var(--mono)", fontSize: 13 }}>{hex.toUpperCase()}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <CopyButton value={colors.map((c) => c.toUpperCase()).join(", ")} label="Copy all HEX" className="btn" />
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Generates random hex colors for palettes, design mockups, testing and inspiration. Click a
        swatch&apos;s Copy button for one, or copy them all. Runs in your browser.
      </p>
    </div>
  );
}
