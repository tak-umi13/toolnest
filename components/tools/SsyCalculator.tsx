"use client";

import { useMemo, useState } from "react";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

// Sukanya Samriddhi Yojana: deposits for the first 15 years from account
// opening; the account matures 21 years after opening, with interest
// (government-set, revised quarterly) compounding yearly throughout.
export function SsyCalculator() {
  const [yearlyDeposit, setYearlyDeposit] = useState(150000);
  const [rate, setRate] = useState(8.2);

  const result = useMemo(() => {
    const deposit = Math.min(Math.max(yearlyDeposit, 250), 150000);
    const r = rate / 100;
    let balance = 0;
    for (let y = 1; y <= 21; y++) {
      if (y <= 15) balance += deposit; // deposits only in years 1–15
      balance *= 1 + r;
    }
    const invested = deposit * 15;
    return { invested, maturity: balance, interest: balance - invested, deposit };
  }, [yearlyDeposit, rate]);

  return (
    <div>
      <div className="row">
        <div className="field">
          <label>Yearly deposit (₹250 – ₹1,50,000)</label>
          <input className="input" type="number" min={250} max={150000} value={yearlyDeposit} onChange={(e) => setYearlyDeposit(Number(e.target.value))} />
        </div>
        <div className="field">
          <label>Interest rate (% p.a.)</label>
          <input className="input" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">₹{inr(result.invested)}</div><div className="lbl">Total deposited (15 yrs)</div></div>
        <div className="stat"><div className="num">₹{inr(result.interest)}</div><div className="lbl">Total interest</div></div>
        <div className="stat"><div className="num">₹{inr(result.maturity)}</div><div className="lbl">Maturity value (21 yrs)</div></div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Deposits run for the first 15 years; the account matures 21 years after opening.
        The rate is set by the government and revised quarterly — 8.2% as of FY 2025-26 Q1.
      </p>
    </div>
  );
}
