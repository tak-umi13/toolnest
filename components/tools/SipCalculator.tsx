"use client";

import { useMemo, useState } from "react";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

export function SipCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    const n = years * 12;
    const i = rate / 12 / 100;
    if (monthly <= 0 || n <= 0) return null;
    // Future value of a series, with contributions at the start of each month.
    const maturity = i === 0 ? monthly * n : monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = monthly * n;
    return { maturity, invested, gain: maturity - invested };
  }, [monthly, rate, years]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Monthly investment (₹)</label><input className="input" type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} /></div>
        <div className="field"><label>Expected return (% p.a.)</label><input className="input" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Duration (years)</label><input className="input" type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
        <div />
      </div>
      {result ? (
        <div className="stat-row">
          <div className="stat"><div className="num">₹{inr(result.invested)}</div><div className="lbl">Invested</div></div>
          <div className="stat"><div className="num">₹{inr(result.gain)}</div><div className="lbl">Est. returns</div></div>
          <div className="stat"><div className="num">₹{inr(result.maturity)}</div><div className="lbl">Maturity value</div></div>
        </div>
      ) : (
        <p className="muted">Enter your monthly amount, return and duration.</p>
      )}
      <p className="muted small" style={{ marginTop: 12 }}>
        Returns are market-linked and not guaranteed — this is an estimate based on a constant assumed rate.
      </p>
    </div>
  );
}
