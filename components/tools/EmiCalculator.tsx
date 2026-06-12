"use client";

import { useMemo, useState } from "react";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

// Optional params let one component back several loan-specific pages
// (home loan, car loan, …) with sensible defaults for each.
export function EmiCalculator({ params }: { params?: Record<string, string | number | boolean> }) {
  const [principal, setPrincipal] = useState(Number(params?.principal ?? 1000000));
  const [rate, setRate] = useState(Number(params?.rate ?? 8.5));
  const [tenure, setTenure] = useState(Number(params?.years ?? 20));
  const [unit, setUnit] = useState<"years" | "months">("years");

  const [showSchedule, setShowSchedule] = useState(false);

  const result = useMemo(() => {
    const n = unit === "years" ? tenure * 12 : tenure;
    const r = rate / 12 / 100;
    if (principal <= 0 || n <= 0) return null;
    const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;

    // Year-wise amortization: walk the loan month by month, bucket into years.
    // This is the depth most EMI widgets skip — it shows HOW the interest front-
    // loads, which is what prepayment decisions hinge on.
    const schedule: { year: number; principalPaid: number; interestPaid: number; balance: number }[] = [];
    let balance = principal;
    let yp = 0, yi = 0;
    for (let m = 1; m <= n; m++) {
      const interest = balance * r;
      const principalPart = Math.min(emi - interest, balance);
      balance = Math.max(0, balance - principalPart);
      yp += principalPart;
      yi += interest;
      if (m % 12 === 0 || m === n) {
        schedule.push({ year: Math.ceil(m / 12), principalPaid: yp, interestPaid: yi, balance });
        yp = 0; yi = 0;
      }
    }
    return { emi, total, interest: total - principal, schedule };
  }, [principal, rate, tenure, unit]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Loan amount (₹)</label><input className="input" type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} /></div>
        <div className="field"><label>Interest rate (% p.a.)</label><input className="input" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Tenure</label><input className="input" type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} /></div>
        <div className="field"><label>Unit</label>
          <select className="select" value={unit} onChange={(e) => setUnit(e.target.value as "years" | "months")}>
            <option value="years">Years</option>
            <option value="months">Months</option>
          </select>
        </div>
      </div>
      {result ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">₹{inr(result.emi)}</div><div className="lbl">Monthly EMI</div></div>
            <div className="stat"><div className="num">₹{inr(result.interest)}</div><div className="lbl">Total interest</div></div>
            <div className="stat"><div className="num">₹{inr(result.total)}</div><div className="lbl">Total payable</div></div>
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
                      <td style={{ padding: "6px" }}>₹{inr(row.principalPaid)}</td>
                      <td style={{ padding: "6px" }}>₹{inr(row.interestPaid)}</td>
                      <td style={{ padding: "6px" }}>₹{inr(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <p className="muted">Enter a loan amount, rate and tenure to see your EMI.</p>
      )}
    </div>
  );
}
