"use client";

import { useMemo, useState } from "react";

const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

// Fixed deposits in India compound quarterly by convention.
const FREQ = [
  { label: "Quarterly (standard)", value: 4 },
  { label: "Monthly", value: 12 },
  { label: "Half-yearly", value: 2 },
  { label: "Annually", value: 1 },
];

export function FdCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [freq, setFreq] = useState(4);

  const result = useMemo(() => {
    if (principal <= 0 || years <= 0) return null;
    const maturity = principal * Math.pow(1 + rate / 100 / freq, freq * years);
    return { maturity, interest: maturity - principal };
  }, [principal, rate, years, freq]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Deposit amount (₹)</label><input className="input" type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} /></div>
        <div className="field"><label>Interest rate (% p.a.)</label><input className="input" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Tenure (years)</label><input className="input" type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
        <div className="field"><label>Compounding</label>
          <select className="select" value={freq} onChange={(e) => setFreq(Number(e.target.value))}>
            {FREQ.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>
      </div>
      {result ? (
        <div className="stat-row">
          <div className="stat"><div className="num">₹{inr(principal)}</div><div className="lbl">Deposit</div></div>
          <div className="stat"><div className="num">₹{inr(result.interest)}</div><div className="lbl">Interest</div></div>
          <div className="stat"><div className="num">₹{inr(result.maturity)}</div><div className="lbl">Maturity value</div></div>
        </div>
      ) : (
        <p className="muted">Enter your deposit, rate and tenure to see the FD maturity value.</p>
      )}
    </div>
  );
}
