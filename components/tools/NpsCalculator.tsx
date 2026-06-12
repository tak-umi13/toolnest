"use client";

import { useMemo, useState } from "react";

const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

// NPS: monthly contributions compound until retirement (60). At exit, at least
// 40% of the corpus must buy an annuity; up to 60% can be withdrawn lump sum.
export function NpsCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [rate, setRate] = useState(10);

  const result = useMemo(() => {
    const yearsLeft = retireAge - age;
    if (monthly <= 0 || yearsLeft <= 0) return null;
    const n = yearsLeft * 12;
    const i = rate / 12 / 100;
    const corpus = i === 0 ? monthly * n : monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = monthly * n;
    return { corpus, invested, gains: corpus - invested, lump: corpus * 0.6, annuity: corpus * 0.4 };
  }, [monthly, age, retireAge, rate]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Monthly contribution (₹)</label><input className="input" type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} /></div>
        <div className="field"><label>Expected return (% p.a.)</label><input className="input" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Current age</label><input className="input" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} /></div>
        <div className="field"><label>Retirement age</label><input className="input" type="number" value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))} /></div>
      </div>
      {result ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">₹{inr(result.invested)}</div><div className="lbl">Invested</div></div>
            <div className="stat"><div className="num">₹{inr(result.gains)}</div><div className="lbl">Est. gains</div></div>
            <div className="stat"><div className="num">₹{inr(result.corpus)}</div><div className="lbl">Corpus at {retireAge}</div></div>
          </div>
          <p className="muted small" style={{ marginTop: 12 }}>
            At exit you can withdraw up to 60% as a tax-free lump sum (₹{inr(result.lump)}) — at least 40% (₹{inr(result.annuity)}) must purchase an annuity that pays your pension. Returns are market-linked and not guaranteed.
          </p>
        </>
      ) : (
        <p className="muted">Enter your contribution, ages and expected return (retirement age must be above current age).</p>
      )}
    </div>
  );
}
