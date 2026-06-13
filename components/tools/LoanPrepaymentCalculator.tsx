"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(Math.round(n));

// Compares both standard prepayment options against the current loan:
// keep the same EMI (tenure shrinks — saves the most interest) or keep the
// same tenure (EMI shrinks — eases monthly cash flow).
export function LoanPrepaymentCalculator() {
  const [balance, setBalance] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [months, setMonths] = useState(180);
  const [prepay, setPrepay] = useState(300000);

  const r = useMemo(() => {
    const r12 = rate / 12 / 100;
    if (balance <= 0 || months <= 0 || r12 <= 0 || prepay < 0 || prepay >= balance) return null;
    const emi = (balance * r12 * Math.pow(1 + r12, months)) / (Math.pow(1 + r12, months) - 1);
    const oldInterest = emi * months - balance;
    const newBalance = balance - prepay;

    // Option A: same EMI, shorter tenure. Solve n from the annuity formula.
    const nA = Math.ceil(-Math.log(1 - (newBalance * r12) / emi) / Math.log(1 + r12));
    const interestA = emi * nA - newBalance;
    const savedA = oldInterest - interestA;

    // Option B: same tenure, lower EMI.
    const emiB = (newBalance * r12 * Math.pow(1 + r12, months)) / (Math.pow(1 + r12, months) - 1);
    const interestB = emiB * months - newBalance;
    const savedB = oldInterest - interestB;

    return { emi, oldInterest, nA, monthsSaved: months - nA, savedA, emiB, emiDrop: emi - emiB, savedB };
  }, [balance, rate, months, prepay]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Outstanding loan balance</label><input className="input" type="number" min={0} value={balance} onChange={(e) => setBalance(Number(e.target.value))} /></div>
        <div className="field"><label>Interest rate (% p.a.)</label><input className="input" type="number" step="0.05" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Remaining tenure (months)</label><input className="input" type="number" min={1} value={months} onChange={(e) => setMonths(Number(e.target.value))} /></div>
        <div className="field"><label>One-time prepayment</label><input className="input" type="number" min={0} value={prepay} onChange={(e) => setPrepay(Number(e.target.value))} /></div>
      </div>
      {r ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">{fmt(r.emi)}</div><div className="lbl">Current EMI</div></div>
            <div className="stat"><div className="num">{fmt(r.oldInterest)}</div><div className="lbl">Interest without prepaying</div></div>
          </div>
          <h3 style={{ marginBottom: 6 }}>Option A — keep the same EMI (recommended)</h3>
          <div className="stat-row">
            <div className="stat"><div className="num">{r.monthsSaved}</div><div className="lbl">Months cut from tenure</div></div>
            <div className="stat"><div className="num">{fmt(r.savedA)}</div><div className="lbl">Interest saved</div></div>
          </div>
          <h3 style={{ marginBottom: 6 }}>Option B — keep the same tenure</h3>
          <div className="stat-row">
            <div className="stat"><div className="num">{fmt(r.emiDrop)}</div><div className="lbl">EMI reduction /month</div></div>
            <div className="stat"><div className="num">{fmt(r.savedB)}</div><div className="lbl">Interest saved</div></div>
          </div>
          <p className="muted small" style={{ marginTop: 10 }}>
            Keeping the EMI unchanged saves {fmt(r.savedA - r.savedB)} more interest
            than reducing the EMI, because the balance falls faster while interest
            is front-loaded.
          </p>
        </>
      ) : (
        <p className="muted">The prepayment must be smaller than the outstanding balance.</p>
      )}
    </div>
  );
}
