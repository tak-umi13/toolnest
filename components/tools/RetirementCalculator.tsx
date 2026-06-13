"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(Math.round(n));

export function RetirementCalculator() {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [savings, setSavings] = useState(50000);
  const [monthly, setMonthly] = useState(1000);
  const [returnRate, setReturnRate] = useState(7);
  const [swr, setSwr] = useState(4);

  const r = useMemo(() => {
    const years = retireAge - age;
    if (years <= 0) return null;
    const m = returnRate / 12 / 100;
    let corpus = savings;
    let contributed = 0;
    for (let i = 0; i < years * 12; i++) {
      corpus = (corpus + monthly) * (1 + m);
      contributed += monthly;
    }
    const annualIncome = corpus * (swr / 100);
    return { corpus, contributed: contributed + savings, growth: corpus - contributed - savings, annualIncome, monthlyIncome: annualIncome / 12 };
  }, [age, retireAge, savings, monthly, returnRate, swr]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Current age</label><input className="input" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} /></div>
        <div className="field"><label>Retirement age</label><input className="input" type="number" value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Current savings</label><input className="input" type="number" min={0} value={savings} onChange={(e) => setSavings(Number(e.target.value))} /></div>
        <div className="field"><label>Monthly contribution</label><input className="input" type="number" min={0} value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Expected return (% p.a.)</label><input className="input" type="number" step="0.5" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} /></div>
        <div className="field"><label>Withdrawal rate in retirement (%)</label><input className="input" type="number" step="0.25" value={swr} onChange={(e) => setSwr(Number(e.target.value))} /></div>
      </div>
      {r ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">{fmt(r.corpus)}</div><div className="lbl">Corpus at {retireAge}</div></div>
            <div className="stat"><div className="num">{fmt(r.monthlyIncome)}</div><div className="lbl">Sustainable monthly income</div></div>
            <div className="stat"><div className="num">{fmt(r.growth)}</div><div className="lbl">Investment growth</div></div>
          </div>
          <p className="muted small" style={{ marginTop: 10 }}>
            Income uses a {swr}% withdrawal rate on the projected corpus. Use a real
            (after-inflation) return to read everything in today&apos;s money. Works in
            any currency.
          </p>
        </>
      ) : (
        <p className="muted">Retirement age must be greater than current age.</p>
      )}
    </div>
  );
}
