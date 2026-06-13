"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(n);

export function PercentageDifferenceCalculator() {
  const [a, setA] = useState(40);
  const [b, setB] = useState(60);

  const r = useMemo(() => {
    const avg = (Math.abs(a) + Math.abs(b)) / 2;
    const diff = avg === 0 ? 0 : (Math.abs(a - b) / avg) * 100;       // % difference (symmetric)
    const change = a === 0 ? null : ((b - a) / Math.abs(a)) * 100;    // % change from a to b
    return { diff, change };
  }, [a, b]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Value 1</label><input className="input" type="number" value={a} onChange={(e) => setA(Number(e.target.value))} /></div>
        <div className="field"><label>Value 2</label><input className="input" type="number" value={b} onChange={(e) => setB(Number(e.target.value))} /></div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmt(r.diff)}%</div><div className="lbl">Percentage difference</div></div>
        <div className="stat">
          <div className="num" style={{ color: r.change == null ? undefined : r.change >= 0 ? "#16a34a" : "#dc2626" }}>
            {r.change == null ? "—" : `${r.change >= 0 ? "+" : ""}${fmt(r.change)}%`}
          </div>
          <div className="lbl">% change (1 → 2)</div>
        </div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        <strong>Percentage difference</strong> compares two values symmetrically, relative to
        their average — order doesn&apos;t matter. <strong>Percentage change</strong> is
        directional, measured from value 1 to value 2. People often mean different things by
        &quot;% difference&quot;, so both are shown. Calculated in your browser.
      </p>
    </div>
  );
}
