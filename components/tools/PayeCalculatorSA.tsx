"use client";

import { useMemo, useState } from "react";

// South Africa PAYE — SARS 2024/2025 tax year (1 Mar 2024 – 28 Feb 2025).
// Annual brackets: [lower threshold, base tax, marginal rate above lower].
const BRACKETS: [number, number, number][] = [
  [0, 0, 0.18],
  [237100, 42678, 0.26],
  [370500, 77362, 0.31],
  [512800, 121475, 0.36],
  [673000, 179147, 0.39],
  [857900, 251258, 0.41],
  [1817000, 644489, 0.45],
];
const REBATE = { under65: 17235, age65to74: 17235 + 9444, age75plus: 17235 + 9444 + 3145 };

function annualTax(income: number, rebate: number): number {
  let base = BRACKETS[0];
  for (const b of BRACKETS) if (income > b[0]) base = b;
  const tax = base[1] + (income - base[0]) * base[2];
  return Math.max(0, tax - rebate);
}

const fmt = (n: number) => "R" + new Intl.NumberFormat("en-ZA", { maximumFractionDigits: 0 }).format(Math.round(n));

export function PayeCalculatorSA() {
  const [gross, setGross] = useState(40000);
  const [period, setPeriod] = useState<"month" | "year">("month");
  const [age, setAge] = useState<keyof typeof REBATE>("under65");

  const r = useMemo(() => {
    const annual = period === "month" ? gross * 12 : gross;
    const tax = annualTax(annual, REBATE[age]);
    const net = annual - tax;
    return { annual, tax, net, monthlyTax: tax / 12, monthlyNet: net / 12, rate: annual > 0 ? (tax / annual) * 100 : 0 };
  }, [gross, period, age]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Gross salary</label><input className="input" type="number" min={0} value={gross} onChange={(e) => setGross(Number(e.target.value))} /></div>
        <div className="field">
          <label>Period</label>
          <select className="select" value={period} onChange={(e) => setPeriod(e.target.value as "month" | "year")}>
            <option value="month">Per month</option>
            <option value="year">Per year</option>
          </select>
        </div>
        <div className="field">
          <label>Age</label>
          <select className="select" value={age} onChange={(e) => setAge(e.target.value as keyof typeof REBATE)}>
            <option value="under65">Under 65</option>
            <option value="age65to74">65 to 74</option>
            <option value="age75plus">75 and over</option>
          </select>
        </div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmt(r.monthlyTax)}</div><div className="lbl">PAYE / month</div></div>
        <div className="stat"><div className="num">{fmt(r.monthlyNet)}</div><div className="lbl">Net / month</div></div>
        <div className="stat"><div className="num">{r.rate.toFixed(1)}%</div><div className="lbl">Effective rate</div></div>
      </div>
      <div className="stat-row" style={{ marginTop: 10 }}>
        <div className="stat"><div className="num">{fmt(r.tax)}</div><div className="lbl">Annual tax</div></div>
        <div className="stat"><div className="num">{fmt(r.net)}</div><div className="lbl">Annual net</div></div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Uses SARS 2024/2025 tax brackets and age rebates. PAYE is the income tax withheld each
        month; it excludes UIF and any medical/retirement credits. A planning estimate, not a
        SARS assessment. Calculated in your browser.
      </p>
    </div>
  );
}
