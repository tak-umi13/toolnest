"use client";

import { useMemo, useState } from "react";

const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

export function CagrCalculator() {
  const [initial, setInitial] = useState(100000);
  const [final, setFinal] = useState(250000);
  const [years, setYears] = useState(5);

  const result = useMemo(() => {
    if (initial <= 0 || final <= 0 || years <= 0) return null;
    const cagr = (Math.pow(final / initial, 1 / years) - 1) * 100;
    const absolute = ((final - initial) / initial) * 100;
    return { cagr, absolute };
  }, [initial, final, years]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Initial value (₹)</label><input className="input" type="number" value={initial} onChange={(e) => setInitial(Number(e.target.value))} /></div>
        <div className="field"><label>Final value (₹)</label><input className="input" type="number" value={final} onChange={(e) => setFinal(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Years held</label><input className="input" type="number" step="0.5" value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
        <div />
      </div>
      {result ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">{result.cagr.toFixed(2)}%</div><div className="lbl">CAGR (p.a.)</div></div>
            <div className="stat"><div className="num">{result.absolute.toFixed(1)}%</div><div className="lbl">Absolute return</div></div>
          </div>
          <p className="muted small" style={{ marginTop: 12 }}>
            ₹{inr(initial)} growing to ₹{inr(final)} over {years} years equals a steady {result.cagr.toFixed(2)}% per year compounded.
          </p>
        </>
      ) : (
        <p className="muted">Enter the starting value, ending value and holding period.</p>
      )}
    </div>
  );
}
