"use client";

import { useMemo, useState } from "react";

// Pakistan salaried income tax — Finance Act 2024 (tax year 2024-25).
// Annual brackets: [lower, base tax, marginal rate above lower].
const BRACKETS: [number, number, number][] = [
  [0, 0, 0],
  [600000, 0, 0.05],
  [1200000, 30000, 0.15],
  [2200000, 180000, 0.25],
  [3200000, 430000, 0.30],
  [4100000, 700000, 0.35],
];

function annualTax(income: number): number {
  let base = BRACKETS[0];
  for (const b of BRACKETS) if (income > b[0]) base = b;
  let tax = base[1] + (income - base[0]) * base[2];
  if (income > 10000000) tax *= 1.1; // 10% surcharge above Rs 10M
  return Math.max(0, tax);
}

const fmt = (n: number) => "Rs " + new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(Math.round(n));

export function PakistanIncomeTax() {
  const [salary, setSalary] = useState(150000);
  const [period, setPeriod] = useState<"month" | "year">("month");

  const r = useMemo(() => {
    const annual = period === "month" ? salary * 12 : salary;
    const tax = annualTax(annual);
    const net = annual - tax;
    return { annual, tax, net, monthlyTax: tax / 12, monthlyNet: net / 12, rate: annual > 0 ? (tax / annual) * 100 : 0 };
  }, [salary, period]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Taxable salary</label><input className="input" type="number" min={0} value={salary} onChange={(e) => setSalary(Number(e.target.value))} /></div>
        <div className="field">
          <label>Period</label>
          <select className="select" value={period} onChange={(e) => setPeriod(e.target.value as "month" | "year")}>
            <option value="month">Per month</option>
            <option value="year">Per year</option>
          </select>
        </div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmt(r.monthlyTax)}</div><div className="lbl">Tax / month</div></div>
        <div className="stat"><div className="num">{fmt(r.monthlyNet)}</div><div className="lbl">Take-home / month</div></div>
        <div className="stat"><div className="num">{r.rate.toFixed(1)}%</div><div className="lbl">Effective rate</div></div>
      </div>
      <div className="stat-row" style={{ marginTop: 10 }}>
        <div className="stat"><div className="num">{fmt(r.tax)}</div><div className="lbl">Annual tax</div></div>
        <div className="stat"><div className="num">{fmt(r.net)}</div><div className="lbl">Annual take-home</div></div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Uses the salaried-individual slabs from the Finance Act 2024 (tax year 2024-25), with the
        10% surcharge applied above Rs 10,000,000 taxable income. A planning estimate, not an FBR
        assessment. Calculated in your browser.
      </p>
    </div>
  );
}
