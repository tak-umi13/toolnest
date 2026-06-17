"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

const UNICODE_FRAC: Record<string, number> = { "½": 0.5, "⅓": 1 / 3, "⅔": 2 / 3, "¼": 0.25, "¾": 0.75, "⅛": 0.125, "⅜": 0.375, "⅝": 0.625, "⅞": 0.875 };

// Parse a leading quantity: "1 1/2", "3/4", "0.5", "2", "½".
function parseQty(line: string): { qty: number; rest: string } | null {
  let s = line.trimStart();
  const uni = UNICODE_FRAC[s[0]];
  if (uni !== undefined) return { qty: uni, rest: s.slice(1).trim() };
  const m = s.match(/^(\d+)\s+(\d+)\/(\d+)\s*(.*)$/); // mixed: 1 1/2
  if (m) return { qty: +m[1] + +m[2] / +m[3], rest: m[4] };
  const f = s.match(/^(\d+)\/(\d+)\s*(.*)$/); // fraction: 3/4
  if (f) return { qty: +f[1] / +f[2], rest: f[3] };
  const d = s.match(/^(\d*\.?\d+)\s*(.*)$/); // decimal/integer
  if (d) return { qty: +d[1], rest: d[2] };
  return null;
}

// Render a number back as a tidy fraction where it's a common cooking amount.
function pretty(n: number): string {
  const whole = Math.floor(n);
  const frac = n - whole;
  const commons: [number, string][] = [[0, ""], [0.125, "⅛"], [0.25, "¼"], [1 / 3, "⅓"], [0.375, "⅜"], [0.5, "½"], [0.625, "⅝"], [2 / 3, "⅔"], [0.75, "¾"], [0.875, "⅞"], [1, ""]];
  let best = commons[0];
  for (const c of commons) if (Math.abs(frac - c[0]) < Math.abs(frac - best[0])) best = c;
  if (best[0] === 1) return String(whole + 1);
  if (Math.abs(frac - best[0]) > 0.04) return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);
  if (whole === 0) return best[1] || "0";
  return best[1] ? `${whole} ${best[1]}` : String(whole);
}

export function RecipeConverter() {
  const [from, setFrom] = useState(4);
  const [to, setTo] = useState(6);
  const [text, setText] = useState("2 cups flour\n1 1/2 cups sugar\n3 eggs\n1/2 tsp salt\n200 g butter");

  const { output, ratio } = useMemo(() => {
    const ratio = from > 0 ? to / from : 0;
    const lines = text.split(/\r?\n/).map((line) => {
      if (!line.trim()) return "";
      const p = parseQty(line);
      if (!p) return line; // no leading quantity — leave as-is
      return `${pretty(p.qty * ratio)} ${p.rest}`.trimEnd();
    });
    return { output: lines.join("\n"), ratio };
  }, [text, from, to]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Original servings</label><input className="input" type="number" min={1} value={from} onChange={(e) => setFrom(Number(e.target.value))} /></div>
        <div className="field"><label>Desired servings</label><input className="input" type="number" min={1} value={to} onChange={(e) => setTo(Number(e.target.value))} /></div>
      </div>
      <p className="muted small" style={{ marginTop: -4, marginBottom: 8 }}>Scaling factor: ×{new Intl.NumberFormat(undefined, { maximumFractionDigits: 3 }).format(ratio)}</p>
      <div className="field">
        <label htmlFor="rc">Ingredients (one per line, quantity first)</label>
        <textarea id="rc" className="textarea" style={{ minHeight: 130 }} value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="field">
        <label>Scaled recipe</label>
        <div className="tool-output" style={{ whiteSpace: "pre-wrap" }}>{output || "Enter ingredients to scale."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
      <p className="muted small" style={{ marginTop: 10 }}>
        Scales each ingredient by the serving ratio, keeping units and rounding to friendly
        fractions (½, ¾…). Lines without a leading number pass through unchanged. Cooking times and
        pan sizes don&apos;t scale linearly — adjust those by eye. Runs in your browser.
      </p>
    </div>
  );
}
