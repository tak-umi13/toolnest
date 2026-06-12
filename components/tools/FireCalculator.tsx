"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(Math.round(n));

// FIRE number = annual expenses ÷ safe withdrawal rate (the 4% rule ⇒ 25×).
// Years-to-FIRE is found by simulating savings growth month by month.
export function FireCalculator() {
  const [annualExpenses, setAnnualExpenses] = useState(40000);
  const [swr, setSwr] = useState(4);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyInvest, setMonthlyInvest] = useState(2000);
  const [returnRate, setReturnRate] = useState(7);

  const result = useMemo(() => {
    if (annualExpenses <= 0 || swr <= 0) return null;
    const fireNumber = annualExpenses / (swr / 100);
    const r = returnRate / 12 / 100;
    let balance = currentSavings;
    let months = 0;
    const cap = 100 * 12; // stop at 100 years — effectively "never"
    while (balance < fireNumber && months < cap) {
      balance = (balance + monthlyInvest) * (1 + r);
      months++;
    }
    return {
      fireNumber,
      reachable: months < cap,
      years: Math.floor(months / 12),
      months: months % 12,
      multiple: 100 / swr,
    };
  }, [annualExpenses, swr, currentSavings, monthlyInvest, returnRate]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Annual expenses</label><input className="input" type="number" value={annualExpenses} onChange={(e) => setAnnualExpenses(Number(e.target.value))} /></div>
        <div className="field"><label>Safe withdrawal rate (%)</label><input className="input" type="number" step="0.25" value={swr} onChange={(e) => setSwr(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Current savings</label><input className="input" type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} /></div>
        <div className="field"><label>Monthly investment</label><input className="input" type="number" value={monthlyInvest} onChange={(e) => setMonthlyInvest(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Expected return (% p.a.)</label><input className="input" type="number" step="0.5" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} /></div>
      </div>
      {result && (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">{fmt(result.fireNumber)}</div><div className="lbl">Your FIRE number ({result.multiple.toFixed(0)}× expenses)</div></div>
            <div className="stat">
              <div className="num">{result.reachable ? `${result.years}y ${result.months}m` : "100+ yrs"}</div>
              <div className="lbl">Time to FIRE at this pace</div>
            </div>
          </div>
          {!result.reachable && (
            <p className="muted small" style={{ marginTop: 10 }}>
              At this savings rate the target isn&apos;t reached — try increasing the
              monthly investment or reducing expenses.
            </p>
          )}
        </>
      )}
    </div>
  );
}
