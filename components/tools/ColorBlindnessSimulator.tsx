"use client";

import { useState } from "react";
import { hexToRgb, rgbToHex, simulateColorBlind, type ColorBlindType } from "../../lib/color";

const TYPES: { id: ColorBlindType; label: string; note: string }[] = [
  { id: "deuteranopia", label: "Deuteranopia", note: "green-weak (most common, ~6% of men)" },
  { id: "protanopia", label: "Protanopia", note: "red-weak (~1% of men)" },
  { id: "tritanopia", label: "Tritanopia", note: "blue-yellow (rare)" },
];

export function ColorBlindnessSimulator() {
  const [hex, setHex] = useState("#e11d48");
  const rgb = hexToRgb(hex) ?? { r: 225, g: 29, b: 72 };

  return (
    <div>
      <div className="row" style={{ alignItems: "center" }}>
        <div className="field">
          <label htmlFor="cb">Color to test</label>
          <input id="cb" type="color" value={hex} onChange={(e) => setHex(e.target.value)} style={{ width: 64, height: 44, border: "none", background: "none", cursor: "pointer" }} />
        </div>
        <div className="field" style={{ flex: 1 }}>
          <label htmlFor="cbh">HEX</label>
          <input id="cbh" className="input" value={hex} onChange={(e) => setHex(e.target.value)} />
        </div>
      </div>
      <div className="field" style={{ marginTop: 12 }}>
        <label>How this color appears</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
          <Swatch title="Normal vision" note="unaffected" hex={hex} />
          {TYPES.map((t) => {
            const sim = simulateColorBlind(rgb, t.id);
            return <Swatch key={t.id} title={t.label} note={t.note} hex={rgbToHex(sim.r, sim.g, sim.b)} />;
          })}
        </div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        A fast in-browser approximation of how a color shifts for the three main types of
        color-vision deficiency. Use it to check that color-coded UI (charts, status dots,
        links) stays distinguishable — pair colors that still differ in all four swatches.
      </p>
    </div>
  );
}

function Swatch({ title, note, hex }: { title: string; note: string; hex: string }) {
  return (
    <div style={{ border: "1px solid var(--border, #2a2f3a)", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ height: 72, background: hex }} />
      <div style={{ padding: "8px 10px" }}>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
        <div className="muted" style={{ fontSize: 12 }}>{note}</div>
        <div style={{ fontFamily: "monospace", fontSize: 12, marginTop: 2 }}>{hex.toUpperCase()}</div>
      </div>
    </div>
  );
}
