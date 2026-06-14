"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

// BigInt for an exact result — 21! already exceeds JavaScript's safe integers.
function factorial(n: number): bigint {
  let r = 1n;
  for (let i = 2n; i <= BigInt(n); i++) r *= i;
  return r;
}

export function FactorialCalculator() {
  const [value, setValue] = useState("10");

  const r = useMemo(() => {
    const n = Number(value);
    if (value.trim() === "" || !Number.isInteger(n)) return null;
    if (n < 0) return { ok: false as const, error: "Factorial is only defined for non-negative integers." };
    if (n > 2000) return { ok: false as const, error: "Enter a number up to 2000 (results get extremely large)." };
    const exact = factorial(n).toString();
    const approx = exact.length > 18 ? `${exact[0]}.${exact.slice(1, 5)} × 10^${exact.length - 1}` : null;
    return { ok: true as const, exact, approx, digits: exact.length };
  }, [value]);

  return (
    <div>
      <div className="field" style={{ maxWidth: 220 }}>
        <label htmlFor="fc">n</label>
        <input id="fc" className="input" value={value} onChange={(e) => setValue(e.target.value)} placeholder="10" />
      </div>
      {r && !r.ok && <p className="small" style={{ color: "#ff6b6b" }}>{r.error}</p>}
      {r && r.ok && (
        <>
          {r.approx && <p style={{ marginBottom: 6 }}>≈ <strong>{r.approx}</strong> <span className="muted small">({r.digits} digits)</span></p>}
          <div className="field">
            <label>{value}! =</label>
            <div className="tool-output" style={{ fontFamily: "var(--mono)", maxHeight: 200, overflowY: "auto", wordBreak: "break-all" }}>{r.exact}</div>
          </div>
          <CopyButton value={r.exact} className="btn" />
        </>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        The factorial n! is the product of all whole numbers from 1 to n (and 0! = 1). The exact
        value is computed with big-integer math, so even large factorials are precise. Runs in your browser.
      </p>
    </div>
  );
}
