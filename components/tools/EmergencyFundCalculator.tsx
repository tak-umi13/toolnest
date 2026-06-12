"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(Math.round(n));

const COVER_OPTIONS = [3, 6, 9, 12];

export function EmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(2500);
  const [months, setMonths] = useState(6);
  const [currentSavings, setCurrentSavings] = useState(4000);
  const [monthlySaving, setMonthlySaving] = useState(300);

  const result = useMemo(() => {
    const target = Math.max(0, monthlyExpenses) * months;
    const gap = Math.max(0, target - currentSavings);
    const monthsToGoal = gap > 0 && monthlySaving > 0 ? Math.ceil(gap / monthlySaving) : 0;
    const pct = target > 0 ? Math.min(100, (currentSavings / target) * 100) : 0;
    return { target, gap, monthsToGoal, pct };
  }, [monthlyExpenses, months, currentSavings, monthlySaving]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Essential monthly expenses</label><input className="input" type="number" min={0} value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} /></div>
        <div className="field"><label>Current emergency savings</label><input className="input" type="number" min={0} value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} /></div>
      </div>
      <div className="field">
        <label>Months of cover ({months})</label>
        <div className="btn-row">
          {COVER_OPTIONS.map((m) => (
            <button key={m} type="button" className={m === months ? "btn btn-primary" : "btn"} onClick={() => setMonths(m)}>{m} months</button>
          ))}
        </div>
      </div>
      <div className="field">
        <label>How much you can save per month</label>
        <input className="input" type="number" min={0} value={monthlySaving} onChange={(e) => setMonthlySaving(Number(e.target.value))} />
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmt(result.target)}</div><div className="lbl">Target fund ({months} months)</div></div>
        <div className="stat"><div className="num">{result.pct.toFixed(0)}%</div><div className="lbl">Funded so far</div></div>
        <div className="stat">
          <div className="num">{result.gap === 0 ? "Done ✓" : result.monthsToGoal > 0 ? `${result.monthsToGoal} mo` : "—"}</div>
          <div className="lbl">{result.gap === 0 ? "Fully funded" : "Time to goal"}</div>
        </div>
      </div>
    </div>
  );
}
