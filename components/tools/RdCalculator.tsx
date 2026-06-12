"use client";

import { useMemo, useState } from "react";

const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

// Recurring deposit: monthly instalments with quarterly compounding (the bank
// convention in India). A month-by-month simulation keeps the math honest
// without the closed-form gymnastics.
export function RdCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(5);

  const result = useMemo(() => {
    if (monthly <= 0 || years <= 0) return null;
    const months = Math.round(years * 12);
    let balance = 0;
    for (let m = 1; m <= months; m++) {
      balance += monthly; // instalment at the start of the month
      if (m % 3 === 0) balance *= 1 + rate / 4 / 100; // quarterly compounding
    }
    const invested = monthly * months;
    return { maturity: balance, invested, interest: balance - invested };
  }, [monthly, rate, years]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Monthly deposit (₹)</label><input className="input" type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} /></div>
        <div className="field"><label>Interest rate (% p.a.)</label><input className="input" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Tenure (years)</label><input className="input" type="number" step="0.5" value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
        <div />
      </div>
      {result ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">₹{inr(result.invested)}</div><div className="lbl">Total deposited</div></div>
            <div className="stat"><div className="num">₹{inr(result.interest)}</div><div className="lbl">Interest earned</div></div>
            <div className="stat"><div className="num">₹{inr(result.maturity)}</div><div className="lbl">Maturity value</div></div>
          </div>
          <p className="muted small" style={{ marginTop: 12 }}>
            Uses quarterly compounding, the standard for Indian bank RDs. Banks may round differently by a few rupees; RD interest is taxable at your slab rate.
          </p>
        </>
      ) : (
        <p className="muted">Enter your monthly deposit, rate and tenure.</p>
      )}
    </div>
  );
}
