"use client";

import { useMemo, useState } from "react";

type Row = { id: number; start: string; end: string };

function toMinutes(t: string): number | null {
  const m = t.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const h = +m[1];
  const min = +m[2];
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

const fmtHM = (mins: number) => `${Math.floor(mins / 60)}h ${mins % 60}m`;

export function HoursCalculator() {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, start: "09:00", end: "17:00" },
    { id: 2, start: "", end: "" },
  ]);
  const [breakMin, setBreakMin] = useState(30);
  const [rate, setRate] = useState(0);

  const r = useMemo(() => {
    let total = 0;
    let counted = 0;
    for (const row of rows) {
      const s = toMinutes(row.start);
      const e = toMinutes(row.end);
      if (s === null || e === null) continue;
      let d = e - s;
      if (d < 0) d += 1440; // overnight
      total += d;
      counted++;
    }
    const net = Math.max(0, total - Math.max(0, breakMin) * counted);
    const decimal = net / 60;
    return { net, decimal, pay: decimal * Math.max(0, rate) };
  }, [rows, breakMin, rate]);

  const update = (id: number, key: "start" | "end", v: string) =>
    setRows((p) => p.map((row) => (row.id === id ? { ...row, [key]: v } : row)));
  const addRow = () => setRows((p) => [...p, { id: Math.max(0, ...p.map((x) => x.id)) + 1, start: "", end: "" }]);
  const removeRow = (id: number) => setRows((p) => (p.length > 1 ? p.filter((x) => x.id !== id) : p));

  return (
    <div>
      <label className="small" style={{ fontWeight: 600 }}>Work sessions (start &amp; end)</label>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "8px 0 12px" }}>
        {rows.map((row, i) => (
          <div key={row.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="muted small" style={{ width: 22 }}>{i + 1}</span>
            <input className="input" type="time" value={row.start} onChange={(e) => update(row.id, "start", e.target.value)} />
            <span className="muted">→</span>
            <input className="input" type="time" value={row.end} onChange={(e) => update(row.id, "end", e.target.value)} />
            <button type="button" className="btn" onClick={() => removeRow(row.id)} aria-label="Remove row" style={{ padding: "8px 12px" }}>✕</button>
          </div>
        ))}
      </div>
      <button type="button" className="btn" onClick={addRow}>+ Add session</button>
      <div className="row" style={{ marginTop: 14 }}>
        <div className="field"><label>Break per session (min)</label><input className="input" type="number" min={0} value={breakMin} onChange={(e) => setBreakMin(+e.target.value)} /></div>
        <div className="field"><label>Hourly rate <span className="muted small">(optional)</span></label><input className="input" type="number" min={0} step="0.01" value={rate} onChange={(e) => setRate(+e.target.value)} /></div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmtHM(r.net)}</div><div className="lbl">Total time</div></div>
        <div className="stat"><div className="num">{r.decimal.toFixed(2)}</div><div className="lbl">Decimal hours</div></div>
        {rate > 0 && <div className="stat"><div className="num">{r.pay.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div><div className="lbl">Estimated pay</div></div>}
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Add a row for each shift or work block; the calculator sums them, subtracts your break
        from each, and handles overnight shifts. Decimal hours (e.g. 7.50) is what timesheets
        and payroll expect. Runs entirely in your browser.
      </p>
    </div>
  );
}
