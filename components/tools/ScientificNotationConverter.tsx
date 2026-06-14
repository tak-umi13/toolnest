"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

function toScientific(s: string): string | null {
  const x = Number(s);
  if (Number.isNaN(x)) return null;
  if (x === 0) return "0 × 10^0";
  const exp = Math.floor(Math.log10(Math.abs(x)));
  const mantissa = x / Math.pow(10, exp);
  const m = Number(mantissa.toPrecision(10)).toString();
  return `${m} × 10^${exp}`;
}

function fromScientific(s: string): string | null {
  // Accept "a × 10^b", "a x 10^b", "a*10^b" or "aeb" / "aEb".
  const t = s.trim().replace(/\s|×|x|\*/gi, "");
  let m = t.match(/^(-?\d*\.?\d+)(?:10\^)(-?\d+)$/);
  if (!m) m = t.match(/^(-?\d*\.?\d+)e(-?\d+)$/i);
  if (!m) return null;
  const val = parseFloat(m[1]) * Math.pow(10, parseInt(m[2], 10));
  if (!Number.isFinite(val)) return null;
  return Number(val.toPrecision(12)).toString();
}

export function ScientificNotationConverter() {
  const [mode, setMode] = useState<"toSci" | "toStd">("toSci");
  const [input, setInput] = useState("149600000");

  const result = useMemo(() => {
    if (!input.trim()) return null;
    return mode === "toSci" ? toScientific(input) : fromScientific(input);
  }, [input, mode]);

  return (
    <div>
      <div className="field">
        <label>Mode</label>
        <div className="btn-row">
          <button type="button" className={mode === "toSci" ? "btn btn-primary" : "btn"} onClick={() => { setMode("toSci"); setInput("149600000"); }}>Standard → Scientific</button>
          <button type="button" className={mode === "toStd" ? "btn btn-primary" : "btn"} onClick={() => { setMode("toStd"); setInput("1.496 × 10^8"); }}>Scientific → Standard</button>
        </div>
      </div>
      <div className="field">
        <label htmlFor="sn">{mode === "toSci" ? "Number" : "Scientific notation (e.g. 1.496 × 10^8 or 1.496e8)"}</label>
        <input id="sn" className="input" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {result ? (
        <div className="tool-output" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
          {result}<span style={{ marginLeft: 12 }}><CopyButton value={result} className="btn" /></span>
        </div>
      ) : (
        <p className="small" style={{ color: "#ff6b6b" }}>Enter a valid {mode === "toSci" ? "number" : "scientific notation like 1.5 × 10^8 or 1.5e8"}.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Scientific notation writes a number as a value between 1 and 10 times a power of ten —
        for example 149,600,000 = 1.496 × 10⁸. Accepts × 10^n or e-notation (1.496e8). Runs in your browser.
      </p>
    </div>
  );
}
