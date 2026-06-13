"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

const TABLE: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
  [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

function toRoman(n: number): string {
  let out = "";
  for (const [v, sym] of TABLE) {
    while (n >= v) { out += sym; n -= v; }
  }
  return out;
}

function fromRoman(s: string): number | null {
  const str = s.toUpperCase().trim();
  if (!/^[MDCLXVI]+$/.test(str)) return null;
  let i = 0;
  let total = 0;
  for (const [v, sym] of TABLE) {
    while (str.startsWith(sym, i)) { total += v; i += sym.length; }
  }
  // Round-trip check rejects malformed numerals like "IIII" or "VV".
  return i === str.length && toRoman(total) === str ? total : null;
}

export function RomanNumeralConverter() {
  const [num, setNum] = useState("2026");
  const [roman, setRoman] = useState("MMXXVI");

  const numResult = useMemo(() => {
    const n = parseInt(num, 10);
    if (!num.trim() || Number.isNaN(n)) return { ok: false, msg: "Enter a whole number." };
    if (n < 1 || n > 3999) return { ok: false, msg: "Standard Roman numerals cover 1–3999." };
    return { ok: true, value: toRoman(n) };
  }, [num]);

  const romanResult = useMemo(() => {
    if (!roman.trim()) return { ok: false, msg: "Enter a Roman numeral." };
    const n = fromRoman(roman);
    return n === null ? { ok: false, msg: "Not a valid Roman numeral." } : { ok: true, value: String(n) };
  }, [roman]);

  return (
    <div>
      <div className="field">
        <label htmlFor="rn1">Number → Roman</label>
        <input id="rn1" className="input" value={num} onChange={(e) => setNum(e.target.value)} placeholder="2026" />
        <div className="tool-output" style={{ marginTop: 8, fontSize: "1.2rem", letterSpacing: 1 }}>
          {numResult.ok ? numResult.value : <span className="muted">{numResult.msg}</span>}
        </div>
        {numResult.ok && <CopyButton value={numResult.value!} className="btn" />}
      </div>
      <div className="field" style={{ marginTop: 16 }}>
        <label htmlFor="rn2">Roman → Number</label>
        <input id="rn2" className="input" value={roman} onChange={(e) => setRoman(e.target.value)} placeholder="MMXXVI" style={{ textTransform: "uppercase" }} />
        <div className="tool-output" style={{ marginTop: 8, fontSize: "1.2rem" }}>
          {romanResult.ok ? romanResult.value : <span className="muted">{romanResult.msg}</span>}
        </div>
        {romanResult.ok && <CopyButton value={romanResult.value!} className="btn" />}
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Standard Roman numerals run from I (1) to MMMCMXCIX (3999) using subtractive
        notation (IV = 4, IX = 9). Invalid forms like IIII or VV are rejected. Runs in your browser.
      </p>
    </div>
  );
}
