"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(Math.round(n));

export function SavingsGoalCalculator() {
  const [goal, setGoal] = useState(20000);
  const [current, setCurrent] = useState(2000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(4);

  const r = useMemo(() => {
    const remaining = goal - current;
    if (remaining <= 0) return { months: 0, done: true, contributed: 0, interest: 0 };
    const monthlyRate = rate / 100 / 12;
    let balance = current;
    let months = 0;
    const max = 1200; // 100 years guard
    while (balance < goal && months < max) {
      balance = balance * (1 + monthlyRate) + monthly;
      months++;
    }
    if (months >= max) return { months: null as number | null, done: false, contributed: 0, interest: 0 };
    const contributed = current + monthly * months;
    return { months, done: false, contributed, interest: goal - contributed };
  }, [goal, current, monthly, rate]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Savings goal</label><input className="input" type="number" value={goal} onChange={(e) => setGoal(Number(e.target.value))} /></div>
        <div className="field"><label>Current savings</label><input className="input" type="number" value={current} onChange={(e) => setCurrent(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Monthly contribution</label><input className="input" type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} /></div>
        <div className="field"><label>Annual return (%)</label><input className="input" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
      </div>
      {r.done ? (
        <p className="small" style={{ color: "#5bd17a" }}>You&apos;ve already reached your goal! 🎉</p>
      ) : r.months === null ? (
        <p className="small" style={{ color: "#ff6b6b" }}>With these inputs the goal takes over 100 years — increase your monthly contribution.</p>
      ) : (
        <div className="stat-row">
          <div className="stat"><div className="num">{Math.floor(r.months / 12)}y {r.months % 12}m</div><div className="lbl">Time to goal</div></div>
          <div className="stat"><div className="num">{fmt(r.contributed)}</div><div className="lbl">You contribute</div></div>
          <div className="stat"><div className="num" style={{ color: "#5bd17a" }}>{fmt(r.interest)}</div><div className="lbl">From returns</div></div>
        </div>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Assumes your contribution is added at the end of each month and returns compound monthly.
        Real returns vary — treat this as a planning estimate, not a guarantee.
      </p>
    </div>
  );
}
