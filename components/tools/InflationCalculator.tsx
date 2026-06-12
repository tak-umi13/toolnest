"use client";

import { useMemo, useState } from "react";

const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

export function InflationCalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    if (amount <= 0 || years <= 0) return null;
    const factor = Math.pow(1 + rate / 100, years);
    // Future cost of today's expense, and today's purchasing power of the same amount.
    return { future: amount * factor, power: amount / factor, factor };
  }, [amount, rate, years]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Amount today (₹)</label><input className="input" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
        <div className="field"><label>Inflation rate (% p.a.)</label><input className="input" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Years</label><input className="input" type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
        <div />
      </div>
      {result ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">₹{inr(result.future)}</div><div className="lbl">Future cost</div></div>
            <div className="stat"><div className="num">₹{inr(result.power)}</div><div className="lbl">Future buying power of ₹{inr(amount)}</div></div>
            <div className="stat"><div className="num">×{result.factor.toFixed(2)}</div><div className="lbl">Price multiple</div></div>
          </div>
          <p className="muted small" style={{ marginTop: 12 }}>
            What costs ₹{inr(amount)} today will cost about ₹{inr(result.future)} in {years} years at {rate}% inflation — and ₹{inr(amount)} kept idle will buy only ₹{inr(result.power)} worth of today&apos;s goods.
          </p>
        </>
      ) : (
        <p className="muted">Enter an amount, inflation rate and time horizon.</p>
      )}
    </div>
  );
}
