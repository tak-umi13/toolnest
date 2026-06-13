"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";
import { reduceFraction } from "../../lib/mathx";

export function DecimalToFraction() {
  const [mode, setMode] = useState<"dec2frac" | "frac2dec">("dec2frac");
  const [input, setInput] = useState("0.75");

  const result = useMemo(() => {
    const s = input.trim().replace(/,/g, "");
    if (!s) return null;
    if (mode === "dec2frac") {
      if (!/^-?\d*\.?\d+$/.test(s)) return { error: "Enter a valid decimal, e.g. 0.75." };
      const neg = s.startsWith("-");
      const [intPart, decPart = ""] = s.replace("-", "").split(".");
      const denom = Math.pow(10, decPart.length);
      const numer = (parseInt(intPart || "0", 10) * denom) + parseInt(decPart || "0", 10);
      const [n, d] = reduceFraction(numer, denom);
      const whole = Math.floor(n / d);
      const rem = n - whole * d;
      const sign = neg ? "-" : "";
      const main = `${sign}${n}/${d}`;
      const mixed = rem !== 0 && whole >= 1 ? `${sign}${whole} ${rem}/${d}` : null;
      return { main, mixed, copy: main };
    }
    const m = s.match(/^(-?\d+)\s*\/\s*(\d+)$/);
    if (!m) return { error: "Enter a fraction like 3/8." };
    const d = parseInt(m[2], 10);
    if (d === 0) return { error: "Denominator can't be zero." };
    const n = parseInt(m[1], 10);
    const [rn, rd] = reduceFraction(n, d);
    const value = n / d;
    return { main: String(value), mixed: `reduced ${rn}/${rd}`, copy: String(value) };
  }, [input, mode]);

  return (
    <div>
      <div className="field">
        <label>Mode</label>
        <div className="btn-row">
          <button type="button" className={mode === "dec2frac" ? "btn btn-primary" : "btn"} onClick={() => { setMode("dec2frac"); setInput("0.75"); }}>Decimal → Fraction</button>
          <button type="button" className={mode === "frac2dec" ? "btn btn-primary" : "btn"} onClick={() => { setMode("frac2dec"); setInput("3/8"); }}>Fraction → Decimal</button>
        </div>
      </div>
      <div className="field" style={{ maxWidth: 280 }}>
        <label htmlFor="df">{mode === "dec2frac" ? "Decimal" : "Fraction (e.g. 3/8)"}</label>
        <input id="df" className="input" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {result?.error && <p className="small" style={{ color: "#ff6b6b" }}>{result.error}</p>}
      {result && !result.error && (
        <>
          <div className="tool-output" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            {result.main}
            {result.mixed && <span className="muted" style={{ fontSize: "1rem", marginLeft: 8 }}>{mode === "dec2frac" ? `= ${result.mixed}` : `(${result.mixed})`}</span>}
          </div>
          <CopyButton value={result.copy!} className="btn" />
        </>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Terminating decimals convert to an exact fraction in lowest terms (e.g. 0.75 = 3/4).
        Fractions convert to their decimal value and reduced form. Runs in your browser.
      </p>
    </div>
  );
}
