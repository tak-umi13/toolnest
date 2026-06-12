"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);

export function PercentageIncreaseCalculator() {
  const [from, setFrom] = useState(80);
  const [to, setTo] = useState(100);

  const result = useMemo(() => {
    if (from === 0) return null; // change from zero is undefined
    const change = ((to - from) / Math.abs(from)) * 100;
    return { change, diff: to - from, increased: change >= 0 };
  }, [from, to]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Initial value</label><input className="input" type="number" value={from} onChange={(e) => setFrom(Number(e.target.value))} /></div>
        <div className="field"><label>Final value</label><input className="input" type="number" value={to} onChange={(e) => setTo(Number(e.target.value))} /></div>
      </div>
      {result ? (
        <>
          <div className="stat-row">
            <div className="stat">
              <div className="num">{result.increased ? "+" : ""}{fmt(result.change)}%</div>
              <div className="lbl">{result.increased ? "Increase" : "Decrease"}</div>
            </div>
            <div className="stat"><div className="num">{fmt(result.diff)}</div><div className="lbl">Absolute change</div></div>
          </div>
          <p className="muted small" style={{ marginTop: 10 }}>
            Formula: (final − initial) ÷ |initial| × 100 = ({fmt(to)} − {fmt(from)}) ÷ {fmt(Math.abs(from))} × 100
          </p>
        </>
      ) : (
        <p className="muted">The initial value can&apos;t be zero — percentage change from zero is undefined.</p>
      )}
    </div>
  );
}
