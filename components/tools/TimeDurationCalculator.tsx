"use client";

import { useMemo, useState } from "react";

function toMinutes(t: string): number | null {
  const m = t.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

export function TimeDurationCalculator() {
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:30");
  const [overnight, setOvernight] = useState(true);
  const [breakMin, setBreakMin] = useState(60);

  const r = useMemo(() => {
    const s = toMinutes(start);
    const e = toMinutes(end);
    if (s === null || e === null) return null;
    let mins = e - s;
    if (mins < 0) mins = overnight ? mins + 1440 : 0;
    const net = Math.max(0, mins - Math.max(0, breakMin));
    return { gross: mins, net };
  }, [start, end, overnight, breakMin]);

  const fmt = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div>
      <div className="row">
        <div className="field"><label htmlFor="ts">Start time</label><input id="ts" className="input" type="time" value={start} onChange={(e) => setStart(e.target.value)} /></div>
        <div className="field"><label htmlFor="te">End time</label><input id="te" className="input" type="time" value={end} onChange={(e) => setEnd(e.target.value)} /></div>
      </div>
      <div className="field" style={{ maxWidth: 280 }}>
        <label htmlFor="tb">Break (minutes)</label>
        <input id="tb" className="input" type="number" min={0} value={breakMin} onChange={(e) => setBreakMin(Number(e.target.value))} />
      </div>
      <label className="small" style={{ display: "block", marginBottom: 12 }}>
        <input type="checkbox" checked={overnight} onChange={(e) => setOvernight(e.target.checked)} /> End time can be next day (overnight)
      </label>
      {r ? (
        <div className="stat-row">
          <div className="stat"><div className="num">{fmt(r.net)}</div><div className="lbl">Net duration</div></div>
          <div className="stat"><div className="num">{fmt(r.gross)}</div><div className="lbl">Before break</div></div>
          <div className="stat"><div className="num">{(r.net / 60).toFixed(2)}</div><div className="lbl">Net hours (decimal)</div></div>
        </div>
      ) : (
        <p className="muted small">Enter valid start and end times (HH:MM).</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Calculates hours worked between two times, minus your break. The decimal hours figure
        (e.g. 7.50) is handy for timesheets and payroll. Runs in your browser.
      </p>
    </div>
  );
}
