"use client";

import { useMemo, useState } from "react";

function countDays(from: string, to: string) {
  const a = new Date(from);
  const b = new Date(to);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
  const [start, end] = a <= b ? [a, b] : [b, a];
  let business = 0;
  let weekend = 0;
  const cur = new Date(start);
  while (cur <= end) {
    const day = cur.getUTCDay();
    if (day === 0 || day === 6) weekend++;
    else business++;
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  const total = business + weekend;
  return { business, weekend, total };
}

export function BusinessDaysCalculator() {
  const today = new Date().toISOString().slice(0, 10);
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const [holidays, setHolidays] = useState(0);

  const r = useMemo(() => countDays(from, to), [from, to]);
  const netBusiness = r ? Math.max(0, r.business - Math.max(0, Math.floor(holidays))) : 0;

  return (
    <div>
      <div className="row">
        <div className="field"><label htmlFor="bf">From date</label><input id="bf" className="input" type="date" value={from} onChange={(e) => setFrom(e.target.value)} /></div>
        <div className="field"><label htmlFor="bt">To date</label><input id="bt" className="input" type="date" value={to} onChange={(e) => setTo(e.target.value)} /></div>
      </div>
      <div className="field" style={{ maxWidth: 280 }}>
        <label htmlFor="bh">Public holidays in range <span className="muted small">(optional)</span></label>
        <input id="bh" className="input" type="number" min={0} value={holidays} onChange={(e) => setHolidays(Number(e.target.value))} />
      </div>
      {r ? (
        <div className="stat-row">
          <div className="stat"><div className="num">{netBusiness}</div><div className="lbl">Business days</div></div>
          <div className="stat"><div className="num">{r.weekend}</div><div className="lbl">Weekend days</div></div>
          <div className="stat"><div className="num">{r.total}</div><div className="lbl">Total days</div></div>
        </div>
      ) : (
        <p className="muted small">Enter two valid dates to count working days.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Counts Monday–Friday between the two dates (inclusive of both ends) and subtracts any
        public holidays you enter. Weekends are fixed as Saturday and Sunday. Runs in your browser.
      </p>
    </div>
  );
}
