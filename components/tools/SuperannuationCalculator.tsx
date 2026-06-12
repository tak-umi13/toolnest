"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(Math.round(n));

// Australian super projection: employer Super Guarantee contributions (12% of
// ordinary earnings from 1 July 2025), less the 15% contributions tax, invested
// monthly with salary growing annually until retirement.
export function SuperannuationCalculator() {
  const [salary, setSalary] = useState(90000);
  const [balance0, setBalance0] = useState(50000);
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(67);
  const [sgRate, setSgRate] = useState(12);
  const [returnRate, setReturnRate] = useState(7);
  const [salaryGrowth, setSalaryGrowth] = useState(3);

  const result = useMemo(() => {
    const years = retireAge - age;
    if (years <= 0 || salary <= 0) return null;
    const r = returnRate / 12 / 100;
    let pay = salary;
    let balance = balance0;
    let contributed = 0;
    for (let y = 0; y < years; y++) {
      const monthlyContribution = ((pay * sgRate) / 100 / 12) * 0.85; // 15% contributions tax
      for (let m = 0; m < 12; m++) {
        balance = (balance + monthlyContribution) * (1 + r);
        contributed += monthlyContribution;
      }
      pay *= 1 + salaryGrowth / 100;
    }
    return { balance, contributed, growth: balance - balance0 - contributed, years };
  }, [salary, balance0, age, retireAge, sgRate, returnRate, salaryGrowth]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Annual salary ($, before tax)</label><input className="input" type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} /></div>
        <div className="field"><label>Current super balance ($)</label><input className="input" type="number" min={0} value={balance0} onChange={(e) => setBalance0(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Current age</label><input className="input" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} /></div>
        <div className="field"><label>Retirement age</label><input className="input" type="number" value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Super guarantee rate (%)</label><input className="input" type="number" step="0.5" value={sgRate} onChange={(e) => setSgRate(Number(e.target.value))} /></div>
        <div className="field"><label>Investment return (% p.a.)</label><input className="input" type="number" step="0.5" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Salary growth (% p.a.)</label><input className="input" type="number" step="0.5" value={salaryGrowth} onChange={(e) => setSalaryGrowth(Number(e.target.value))} /></div>
      </div>
      {result ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">${fmt(result.balance)}</div><div className="lbl">Super at {retireAge}</div></div>
            <div className="stat"><div className="num">${fmt(result.contributed)}</div><div className="lbl">Contributions (after tax)</div></div>
            <div className="stat"><div className="num">${fmt(result.growth)}</div><div className="lbl">Investment growth</div></div>
          </div>
          <p className="muted small" style={{ marginTop: 10 }}>
            Uses the 12% Super Guarantee rate (since 1 July 2025) with the 15%
            contributions tax deducted. Figures are in today&apos;s dollars if you use
            a real (after-inflation) return.
          </p>
        </>
      ) : (
        <p className="muted">Retirement age must be greater than current age.</p>
      )}
    </div>
  );
}
