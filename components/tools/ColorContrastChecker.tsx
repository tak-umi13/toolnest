"use client";

import { useState } from "react";
import { hexToRgb, contrastRatio } from "../../lib/color";

function Pass({ ok }: { ok: boolean }) {
  return (
    <span style={{ color: ok ? "#5bd17a" : "#ff6b6b", fontWeight: 700 }}>
      {ok ? "✓ Pass" : "✗ Fail"}
    </span>
  );
}

export function ColorContrastChecker() {
  const [fg, setFg] = useState("#1f2937");
  const [bg, setBg] = useState("#ffffff");

  const fgRgb = hexToRgb(fg) ?? { r: 0, g: 0, b: 0 };
  const bgRgb = hexToRgb(bg) ?? { r: 255, g: 255, b: 255 };
  const ratio = contrastRatio(fgRgb, bgRgb);
  const r = Math.round(ratio * 100) / 100;

  // WCAG thresholds: normal text AA 4.5 / AAA 7; large text AA 3 / AAA 4.5.
  const checks = [
    { label: "Normal text — AA", min: 4.5 },
    { label: "Normal text — AAA", min: 7 },
    { label: "Large text — AA", min: 3 },
    { label: "Large text — AAA", min: 4.5 },
  ];

  return (
    <div>
      <div className="row">
        <div className="field">
          <label htmlFor="fg">Text color</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} style={{ width: 48, height: 40, border: "none", background: "none" }} />
            <input id="fg" className="input" value={fg} onChange={(e) => setFg(e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="bg">Background color</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} style={{ width: 48, height: 40, border: "none", background: "none" }} />
            <input id="bg" className="input" value={bg} onChange={(e) => setBg(e.target.value)} />
          </div>
        </div>
      </div>
      <div style={{ background: bg, color: fg, borderRadius: 10, padding: 20, margin: "12px 0", border: "1px solid var(--border, #2a2f3a)" }}>
        <div style={{ fontSize: 24, fontWeight: 700 }}>Large text preview</div>
        <div style={{ fontSize: 15 }}>Normal body text preview — the quick brown fox jumps over the lazy dog.</div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{r}:1</div><div className="lbl">Contrast ratio</div></div>
      </div>
      <div className="field" style={{ marginTop: 12 }}>
        <div className="tool-output" style={{ padding: 0 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {checks.map((c) => (
                <tr key={c.label} style={{ borderTop: "1px solid var(--border, #2a2f3a)" }}>
                  <td style={{ padding: "8px 12px" }}>{c.label} <span className="muted small">(≥{c.min}:1)</span></td>
                  <td style={{ padding: "8px 12px", textAlign: "right" }}><Pass ok={ratio >= c.min} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Ratios follow WCAG 2.1: normal text needs 4.5:1 (AA) or 7:1 (AAA); large text
        (18pt+/14pt bold) needs 3:1 (AA) or 4.5:1 (AAA). Calculated in your browser.
      </p>
    </div>
  );
}
