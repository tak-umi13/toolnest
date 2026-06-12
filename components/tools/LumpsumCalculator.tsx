"use client";

import { useMemo, useState } from "react";

const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

export function LumpsumCalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    if (amount <= 0 || years <= 0) return null;
    const fv = amount * Math.pow(1 + rate / 100, years);
    return { fv, gain: fv - amount };
  }, [amount, rate, years]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>One-time investment (₹)</label><input className="input" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
        <div className="field"><label>Expected return (% p.a.)</label><input className="input" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Duration (years)</label><input className="input" type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
        <div />
      </div>
      {result ? (
        <div className="stat-row">
          <div className="stat"><div className="num">₹{inr(amount)}</div><div className="lbl">Invested</div></div>
          <div className="stat"><div className="num">₹{inr(result.gain)}</div><div className="lbl">Est. gains</div></div>
          <div className="stat"><div className="num">₹{inr(result.fv)}</div><div className="lbl">Maturity value</div></div>
        </div>
      ) : (
        <p className="muted">Enter an amount, expected return and duration.</p>
      )}
      <p className="muted small" style={{ marginTop: 12 }}>
        Market returns vary year to year — this projects a constant assumed rate, so treat it as an estimate.
      </p>
    </div>
  );
}
