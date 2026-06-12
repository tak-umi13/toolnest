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

  const result = useMemo(() => {
    const n = unit === "years" ? tenure * 12 : tenure;
    const r = rate / 12 / 100;
    if (principal <= 0 || n <= 0) return null;
    const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    return { emi, total, interest: total - principal };
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
        <div className="stat-row">
          <div className="stat"><div className="num">₹{inr(result.emi)}</div><div className="lbl">Monthly EMI</div></div>
          <div className="stat"><div className="num">₹{inr(result.interest)}</div><div className="lbl">Total interest</div></div>
          <div className="stat"><div className="num">₹{inr(result.total)}</div><div className="lbl">Total payable</div></div>
        </div>
      ) : (
        <p className="muted">Enter a loan amount, rate and tenure to see your EMI.</p>
      )}
    </div>
  );
}
