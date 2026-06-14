"use client";

import { useMemo, useState } from "react";

export function ModuloCalculator() {
  const [a, setA] = useState("17");
  const [b, setB] = useState("5");

  const r = useMemo(() => {
    const x = Number(a);
    const y = Number(b);
    if (a.trim() === "" || b.trim() === "" || Number.isNaN(x) || Number.isNaN(y)) return null;
    if (y === 0) return { ok: false as const, error: "Cannot divide by zero." };
    const truncated = x % y;                       // JavaScript's % (sign follows dividend)
    const floored = ((x % y) + y) % y;             // mathematical mod (sign follows divisor)
    const quotient = Math.trunc(x / y);
    return { ok: true as const, truncated, floored, quotient, same: truncated === floored };
  }, [a, b]);

  return (
    <div>
      <div className="row">
        <div className="field"><label htmlFor="ma">Dividend (a)</label><input id="ma" className="input" value={a} onChange={(e) => setA(e.target.value)} /></div>
        <div className="field"><label htmlFor="mb">Divisor (b)</label><input id="mb" className="input" value={b} onChange={(e) => setB(e.target.value)} /></div>
      </div>
      {r && !r.ok && <p className="small" style={{ color: "#ff6b6b" }}>{r.error}</p>}
      {r && r.ok && (
        <>
          <div className="tool-output" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
            {a} mod {b} = {r.truncated}
          </div>
          <div className="stat-row">
            <div className="stat"><div className="num">{r.quotient}</div><div className="lbl">Quotient</div></div>
            {!r.same && <div className="stat"><div className="num">{r.floored}</div><div className="lbl">Floored mod (math)</div></div>}
          </div>
        </>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        The modulo is the remainder after dividing a by b. With negative numbers the answer
        differs by convention: the &quot;truncated&quot; remainder (used by JavaScript, C and Java)
        takes the dividend&apos;s sign, while the mathematical &quot;floored&quot; mod takes the
        divisor&apos;s sign. Both are shown when they differ. Runs in your browser.
      </p>
    </div>
  );
}
