"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

export function ExponentCalculator() {
  const [base, setBase] = useState("2");
  const [exp, setExp] = useState("10");

  const r = useMemo(() => {
    const b = Number(base);
    const e = Number(exp);
    if (base.trim() === "" || exp.trim() === "" || Number.isNaN(b) || Number.isNaN(e)) return null;
    const value = Math.pow(b, e);
    if (!Number.isFinite(value)) return { ok: false as const, error: "Result is too large or undefined (e.g. 0 to a negative power)." };
    // Show the expanded multiplication for small positive integer exponents.
    const expanded = Number.isInteger(e) && e > 1 && e <= 8 ? Array(e).fill(base).join(" × ") : null;
    return { ok: true as const, value, expanded };
  }, [base, exp]);

  return (
    <div>
      <div className="row">
        <div className="field"><label htmlFor="eb">Base</label><input id="eb" className="input" value={base} onChange={(e) => setBase(e.target.value)} /></div>
        <div className="field"><label htmlFor="ee">Exponent (power)</label><input id="ee" className="input" value={exp} onChange={(e) => setExp(e.target.value)} /></div>
      </div>
      {r && !r.ok && <p className="small" style={{ color: "#ff6b6b" }}>{r.error}</p>}
      {r && r.ok && (
        <>
          <div className="tool-output" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
            {base}<sup>{exp}</sup> = {r.value.toLocaleString(undefined, { maximumFractionDigits: 10 })}
          </div>
          {r.expanded && <p className="muted small" style={{ marginTop: 6 }}>= {r.expanded}</p>}
          <CopyButton value={String(r.value)} className="btn" />
        </>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Raises the base to the power of the exponent (base<sup>exp</sup>). Exponents can be
        negative (reciprocal) or fractional (roots) — for example 2<sup>-1</sup> = 0.5 and
        9<sup>0.5</sup> = 3. Calculated in your browser.
      </p>
    </div>
  );
}
