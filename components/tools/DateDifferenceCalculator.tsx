"use client";

import { useMemo, useState } from "react";

function diff(from: string, to: string, includeEnd: boolean) {
  const a = new Date(from);
  const b = new Date(to);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
  const [start, end] = a <= b ? [a, b] : [b, a];
  const msPerDay = 86400000;
  let totalDays = Math.round((end.getTime() - start.getTime()) / msPerDay);
  if (includeEnd) totalDays += 1;

  // Calendar breakdown (years/months/days) by borrowing.
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }
  if (months < 0) { years -= 1; months += 12; }

  return {
    totalDays,
    weeks: Math.floor(totalDays / 7),
    remDays: totalDays % 7,
    years, months, days,
  };
}

export function DateDifferenceCalculator() {
  const today = new Date().toISOString().slice(0, 10);
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const [includeEnd, setIncludeEnd] = useState(false);

  const r = useMemo(() => diff(from, to, includeEnd), [from, to, includeEnd]);

  return (
    <div>
      <div className="row">
        <div className="field"><label htmlFor="df">From date</label><input id="df" className="input" type="date" value={from} onChange={(e) => setFrom(e.target.value)} /></div>
        <div className="field"><label htmlFor="dt">To date</label><input id="dt" className="input" type="date" value={to} onChange={(e) => setTo(e.target.value)} /></div>
      </div>
      <label className="small" style={{ display: "block", marginBottom: 12 }}>
        <input type="checkbox" checked={includeEnd} onChange={(e) => setIncludeEnd(e.target.checked)} /> Include the end day in the count
      </label>
      {r ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">{r.totalDays.toLocaleString()}</div><div className="lbl">Total days</div></div>
            <div className="stat"><div className="num">{r.weeks}<span className="muted small"> w {r.remDays} d</span></div><div className="lbl">Weeks</div></div>
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label>In years, months &amp; days</label>
            <div className="tool-output" style={{ fontSize: "1.1rem" }}>
              {r.years > 0 && `${r.years} year${r.years === 1 ? "" : "s"}, `}
              {r.months} month{r.months === 1 ? "" : "s"}, {r.days} day{r.days === 1 ? "" : "s"}
            </div>
          </div>
        </>
      ) : (
        <p className="muted small">Enter two valid dates to see the difference.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        The calendar breakdown counts real month lengths (so it handles leap years), while
        &quot;total days&quot; is the exact day count. Tick the box to count both endpoints —
        useful for booking nights or leave days. Runs in your browser.
      </p>
    </div>
  );
}
