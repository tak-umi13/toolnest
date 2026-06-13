"use client";

import { useMemo, useState } from "react";

// ISO 8601 week number: weeks start Monday, week 1 is the week with the year's
// first Thursday. This is the standard used in business, the EU and ISO calendars.
function isoWeek(d: Date): { week: number; year: number } {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = (date.getUTCDay() + 6) % 7; // Mon=0 … Sun=6
  date.setUTCDate(date.getUTCDate() - dayNum + 3); // nearest Thursday
  const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4));
  const firstDayNum = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayNum + 3);
  const week = 1 + Math.round((date.getTime() - firstThursday.getTime()) / (7 * 86400000));
  return { week, year: date.getUTCFullYear() };
}

export function WeekNumberCalculator() {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);

  const r = useMemo(() => {
    const d = new Date(date + "T00:00:00");
    if (Number.isNaN(d.getTime())) return null;
    const { week, year } = isoWeek(d);
    const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
    return { week, year, weekday };
  }, [date]);

  return (
    <div>
      <div className="field" style={{ maxWidth: 280 }}>
        <label htmlFor="wn">Date</label>
        <input id="wn" className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      {r ? (
        <div className="stat-row">
          <div className="stat"><div className="num">{r.week}</div><div className="lbl">ISO week number</div></div>
          <div className="stat"><div className="num">{r.year}</div><div className="lbl">ISO week-year</div></div>
          <div className="stat"><div className="num" style={{ fontSize: "1rem" }}>{r.weekday}</div><div className="lbl">Weekday</div></div>
        </div>
      ) : (
        <p className="muted small">Pick a valid date.</p>
      )}
      <div className="btn-row" style={{ marginTop: 12 }}>
        <button type="button" className="btn" onClick={() => setDate(today)}>This week</button>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Uses the ISO 8601 standard: weeks start on Monday and week 1 is the week containing the
        year&apos;s first Thursday. Near New Year the ISO week-year can differ from the calendar
        year. Runs in your browser.
      </p>
    </div>
  );
}
