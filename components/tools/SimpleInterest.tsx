"use client";

import { useMemo, useState } from "react";

const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

export function SimpleInterest() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);

  const result = useMemo(() => {
    if (principal <= 0 || years <= 0) return null;
    const interest = (principal * rate * years) / 100;
    return { interest, total: principal + interest };
  }, [principal, rate, years]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Principal (₹)</label><input className="input" type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} /></div>
        <div className="field"><label>Rate (% p.a.)</label><input className="input" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Time (years)</label><input className="input" type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
        <div />
      </div>
      {result ? (
        <div className="stat-row">
          <div className="stat"><div className="num">₹{inr(principal)}</div><div className="lbl">Principal</div></div>
          <div className="stat"><div className="num">₹{inr(result.interest)}</div><div className="lbl">Simple interest</div></div>
          <div className="stat"><div className="num">₹{inr(result.total)}</div><div className="lbl">Total amount</div></div>
        </div>
      ) : (
        <p className="muted">Enter a principal, rate and time to compute simple interest.</p>
      )}
    </div>
  );
}
