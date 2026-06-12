"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);

export function SalaryToHourlyCalculator() {
  const [mode, setMode] = useState<"annual" | "hourly">("annual");
  const [amount, setAmount] = useState(50000);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);

  const r = useMemo(() => {
    const hours = Math.max(1, hoursPerWeek) * Math.max(1, weeksPerYear);
    const annual = mode === "annual" ? amount : amount * hours;
    return {
      annual,
      monthly: annual / 12,
      weekly: annual / Math.max(1, weeksPerYear),
      daily: annual / Math.max(1, weeksPerYear) / 5,
      hourly: annual / hours,
    };
  }, [mode, amount, hoursPerWeek, weeksPerYear]);

  return (
    <div>
      <div className="btn-row" style={{ marginBottom: 14 }}>
        <button type="button" className={`btn ${mode === "annual" ? "btn-primary" : ""}`} onClick={() => { setMode("annual"); setAmount(50000); }}>I know my annual salary</button>
        <button type="button" className={`btn ${mode === "hourly" ? "btn-primary" : ""}`} onClick={() => { setMode("hourly"); setAmount(25); }}>I know my hourly rate</button>
      </div>
      <div className="row">
        <div className="field">
          <label>{mode === "annual" ? "Annual salary" : "Hourly rate"}</label>
          <input className="input" type="number" min={0} value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        </div>
        <div className="field"><label>Hours per week</label><input className="input" type="number" min={1} value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} /></div>
        <div className="field"><label>Working weeks per year</label><input className="input" type="number" min={1} max={52} value={weeksPerYear} onChange={(e) => setWeeksPerYear(Number(e.target.value))} /></div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmt(r.hourly)}</div><div className="lbl">Hourly</div></div>
        <div className="stat"><div className="num">{fmt(r.daily)}</div><div className="lbl">Daily (5-day week)</div></div>
        <div className="stat"><div className="num">{fmt(r.weekly)}</div><div className="lbl">Weekly</div></div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmt(r.monthly)}</div><div className="lbl">Monthly</div></div>
        <div className="stat"><div className="num">{fmt(r.annual)}</div><div className="lbl">Annual</div></div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Gross (before tax) figures. Set working weeks below 52 to account for unpaid leave.
      </p>
    </div>
  );
}
