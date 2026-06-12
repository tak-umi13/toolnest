"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(Math.round(n));

// Standard repayment (capital + interest) mortgage on a reducing balance —
// the same amortization math banks use in the UK, Australia, US and elsewhere.
export function MortgageCalculator() {
  const [price, setPrice] = useState(300000);
  const [deposit, setDeposit] = useState(60000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(25);
  const [showSchedule, setShowSchedule] = useState(false);

  const result = useMemo(() => {
    const loan = price - deposit;
    const n = years * 12;
    const r = rate / 12 / 100;
    if (loan <= 0 || n <= 0) return null;
    const monthly = r === 0 ? loan / n : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;

    // Year-wise amortization — shows how interest front-loads, which is what
    // overpayment and remortgage decisions hinge on.
    const schedule: { year: number; principalPaid: number; interestPaid: number; balance: number }[] = [];
    let balance = loan;
    let yp = 0, yi = 0;
    for (let m = 1; m <= n; m++) {
      const interest = balance * r;
      const principalPart = Math.min(monthly - interest, balance);
      balance = Math.max(0, balance - principalPart);
      yp += principalPart;
      yi += interest;
      if (m % 12 === 0 || m === n) {
        schedule.push({ year: Math.ceil(m / 12), principalPaid: yp, interestPaid: yi, balance });
        yp = 0; yi = 0;
      }
    }
    const ltv = price > 0 ? (loan / price) * 100 : 0;
    return { loan, monthly, total, interest: total - loan, ltv, schedule };
  }, [price, deposit, rate, years]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Property price</label><input className="input" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></div>
        <div className="field"><label>Deposit / down payment</label><input className="input" type="number" value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Interest rate (% p.a.)</label><input className="input" type="number" step="0.05" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
        <div className="field"><label>Term (years)</label><input className="input" type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
      </div>
      {result ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">{fmt(result.monthly)}</div><div className="lbl">Monthly repayment</div></div>
            <div className="stat"><div className="num">{fmt(result.loan)}</div><div className="lbl">Loan amount ({result.ltv.toFixed(0)}% LTV)</div></div>
            <div className="stat"><div className="num">{fmt(result.interest)}</div><div className="lbl">Total interest</div></div>
          </div>
          <div className="btn-row" style={{ marginTop: 12 }}>
            <button type="button" className="btn" onClick={() => setShowSchedule(!showSchedule)}>
              {showSchedule ? "Hide" : "Show"} year-by-year schedule
            </button>
          </div>
          {showSchedule && (
            <div style={{ overflowX: "auto", marginTop: 12 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "right" }}>
                    <th style={{ textAlign: "left", padding: "8px 6px" }}>Year</th>
                    <th style={{ padding: "8px 6px" }}>Principal paid</th>
                    <th style={{ padding: "8px 6px" }}>Interest paid</th>
                    <th style={{ padding: "8px 6px" }}>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map((row) => (
                    <tr key={row.year} style={{ borderBottom: "1px solid var(--border)", textAlign: "right" }}>
                      <td style={{ textAlign: "left", padding: "6px" }}>{row.year}</td>
                      <td style={{ padding: "6px" }}>{fmt(row.principalPaid)}</td>
                      <td style={{ padding: "6px" }}>{fmt(row.interestPaid)}</td>
                      <td style={{ padding: "6px" }}>{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <p className="muted">The deposit must be less than the property price.</p>
      )}
    </div>
  );
}
