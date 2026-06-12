"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);

const MULTIPLIERS = [1.5, 2];

export function OvertimePayCalculator() {
  const [rate, setRate] = useState(20);
  const [multiplier, setMultiplier] = useState(1.5);
  const [regularHours, setRegularHours] = useState(40);
  const [overtimeHours, setOvertimeHours] = useState(5);

  const r = useMemo(() => {
    const otRate = rate * multiplier;
    const regularPay = rate * Math.max(0, regularHours);
    const overtimePay = otRate * Math.max(0, overtimeHours);
    return { otRate, regularPay, overtimePay, total: regularPay + overtimePay };
  }, [rate, multiplier, regularHours, overtimeHours]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Regular hourly rate</label><input className="input" type="number" step="0.25" min={0} value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
        <div className="field">
          <label>Overtime multiplier ({multiplier}×)</label>
          <div className="btn-row">
            {MULTIPLIERS.map((m) => (
              <button key={m} type="button" className={m === multiplier ? "btn btn-primary" : "btn"} onClick={() => setMultiplier(m)}>
                {m === 1.5 ? "Time & a half (1.5×)" : "Double time (2×)"}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="field"><label>Regular hours (per week)</label><input className="input" type="number" min={0} value={regularHours} onChange={(e) => setRegularHours(Number(e.target.value))} /></div>
        <div className="field"><label>Overtime hours worked</label><input className="input" type="number" min={0} value={overtimeHours} onChange={(e) => setOvertimeHours(Number(e.target.value))} /></div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmt(r.otRate)}</div><div className="lbl">Overtime rate /hr</div></div>
        <div className="stat"><div className="num">{fmt(r.overtimePay)}</div><div className="lbl">Overtime pay</div></div>
        <div className="stat"><div className="num">{fmt(r.total)}</div><div className="lbl">Total weekly pay</div></div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        In the US, non-exempt employees get at least 1.5× for hours over 40/week
        (FLSA). Check your contract or local law for when 2× applies.
      </p>
    </div>
  );
}
