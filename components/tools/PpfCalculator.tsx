"use client";

import { useMemo, useState } from "react";

const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

// PPF: yearly deposits, interest compounded annually, 15-year lock-in.
// Deposits at the start of each year → future value of an annuity-due.
export function PpfCalculator() {
  const [deposit, setDeposit] = useState(150000);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(15);

  const result = useMemo(() => {
    if (deposit <= 0 || years <= 0) return null;
    const r = rate / 100;
    const maturity = r === 0 ? deposit * years : deposit * ((Math.pow(1 + r, years) - 1) / r) * (1 + r);
    const invested = deposit * years;
    return { maturity, invested, interest: maturity - invested };
  }, [deposit, rate, years]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Yearly deposit (₹, max 1,50,000)</label><input className="input" type="number" value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} /></div>
        <div className="field"><label>Interest rate (% p.a.)</label><input className="input" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Duration (years, min 15)</label><input className="input" type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
        <div />
      </div>
      {deposit > 150000 && <p className="error-text">⚠ The PPF deposit limit is ₹1,50,000 per financial year.</p>}
      {result ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">₹{inr(result.invested)}</div><div className="lbl">Total invested</div></div>
            <div className="stat"><div className="num">₹{inr(result.interest)}</div><div className="lbl">Interest earned</div></div>
            <div className="stat"><div className="num">₹{inr(result.maturity)}</div><div className="lbl">Maturity value</div></div>
          </div>
          <p className="muted small" style={{ marginTop: 12 }}>
            The PPF rate is set quarterly by the government (7.1% has been typical recently) and interest is fully tax-free. The account locks for 15 years, extendable in 5-year blocks.
          </p>
        </>
      ) : (
        <p className="muted">Enter your yearly deposit, rate and duration.</p>
      )}
    </div>
  );
}
