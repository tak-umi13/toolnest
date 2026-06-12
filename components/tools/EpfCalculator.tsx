"use client";

import { useMemo, useState } from "react";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

// EPF projection: employee contributes 12% of basic+DA; of the employer's 12%,
// 8.33% goes to EPS (pension, capped at ₹15,000 wage base) and the rest to EPF.
// Interest (EPFO-declared yearly) accrues monthly on the running balance.
export function EpfCalculator() {
  const [basic, setBasic] = useState(30000);
  const [age, setAge] = useState(28);
  const [retireAge, setRetireAge] = useState(58);
  const [rate, setRate] = useState(8.25);
  const [salaryGrowth, setSalaryGrowth] = useState(5);

  const result = useMemo(() => {
    const years = retireAge - age;
    if (years <= 0 || basic <= 0) return null;
    const monthlyRate = rate / 12 / 100;
    let wage = basic;
    let balance = 0;
    let contributed = 0;
    for (let y = 0; y < years; y++) {
      for (let m = 0; m < 12; m++) {
        const employee = wage * 0.12;
        const epsWageBase = Math.min(wage, 15000);
        const employerToEpf = wage * 0.12 - epsWageBase * 0.0833;
        const monthly = employee + employerToEpf;
        balance = (balance + monthly) * (1 + monthlyRate);
        contributed += monthly;
      }
      wage *= 1 + salaryGrowth / 100; // annual increment
    }
    return { balance, contributed, interest: balance - contributed, years };
  }, [basic, age, retireAge, rate, salaryGrowth]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Monthly basic + DA (₹)</label><input className="input" type="number" value={basic} onChange={(e) => setBasic(Number(e.target.value))} /></div>
        <div className="field"><label>Expected salary growth (% p.a.)</label><input className="input" type="number" step="0.5" value={salaryGrowth} onChange={(e) => setSalaryGrowth(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Current age</label><input className="input" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} /></div>
        <div className="field"><label>Retirement age</label><input className="input" type="number" value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>EPF interest rate (% p.a.)</label><input className="input" type="number" step="0.05" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
      </div>
      {result ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">₹{inr(result.contributed)}</div><div className="lbl">Total contributions</div></div>
            <div className="stat"><div className="num">₹{inr(result.interest)}</div><div className="lbl">Interest earned</div></div>
            <div className="stat"><div className="num">₹{inr(result.balance)}</div><div className="lbl">EPF corpus at {retireAge}</div></div>
          </div>
          <p className="muted small" style={{ marginTop: 10 }}>
            Includes your 12% and the employer&apos;s EPF share (12% minus the 8.33% EPS
            diversion on wages up to ₹15,000). EPFO declared 8.25% for FY 2024-25.
          </p>
        </>
      ) : (
        <p className="muted">Retirement age must be greater than current age.</p>
      )}
    </div>
  );
}
