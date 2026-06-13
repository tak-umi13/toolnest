"use client";

import { useMemo, useState } from "react";

export function DayOfWeekCalculator() {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState("2000-01-01");

  const r = useMemo(() => {
    const d = new Date(date + "T00:00:00");
    if (Number.isNaN(d.getTime())) return null;
    const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
    // ISO day of year.
    const start = new Date(d.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((d.getTime() - start.getTime()) / 86400000);
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    return { weekday, dayOfYear, isWeekend };
  }, [date]);

  return (
    <div>
      <div className="field" style={{ maxWidth: 280 }}>
        <label htmlFor="dow">Date</label>
        <input id="dow" className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      {r ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num" style={{ fontSize: "1.6rem" }}>{r.weekday}</div><div className="lbl">Day of the week</div></div>
            <div className="stat"><div className="num">{r.dayOfYear}</div><div className="lbl">Day of the year</div></div>
            <div className="stat"><div className="num">{r.isWeekend ? "Weekend" : "Weekday"}</div><div className="lbl">Type</div></div>
          </div>
        </>
      ) : (
        <p className="muted small">Pick a valid date.</p>
      )}
      <div className="btn-row" style={{ marginTop: 12 }}>
        <button type="button" className="btn" onClick={() => setDate(today)}>Today</button>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Find which day of the week any date falls on — past or future. Works for birthdays
        (&quot;what day was I born?&quot;), historical dates and planning. Uses real calendar
        dates, so leap years are handled correctly. Runs in your browser.
      </p>
    </div>
  );
}
