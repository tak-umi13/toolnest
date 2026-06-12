"use client";

import { useMemo, useState } from "react";

const toInput = (d: Date) => d.toISOString().slice(0, 10);

// Exact calendar age with borrow logic: months/days are computed against real
// month lengths, not 30-day approximations.
function diffYmd(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  if (days < 0) {
    months--;
    // days in the month before `to`
    days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months, days };
}

export function AgeCalculator() {
  const [dob, setDob] = useState("2000-01-01");
  const [asOf, setAsOf] = useState(() => toInput(new Date()));

  const r = useMemo(() => {
    const b = new Date(dob + "T00:00:00");
    const a = new Date(asOf + "T00:00:00");
    if (isNaN(b.getTime()) || isNaN(a.getTime()) || a < b) return null;
    const { years, months, days } = diffYmd(b, a);
    const totalDays = Math.round((a.getTime() - b.getTime()) / 86400000);
    // Next birthday relative to the as-of date.
    let next = new Date(a.getFullYear(), b.getMonth(), b.getDate());
    if (next <= a) next = new Date(a.getFullYear() + 1, b.getMonth(), b.getDate());
    const toNext = Math.round((next.getTime() - a.getTime()) / 86400000);
    const weekdayBorn = b.toLocaleDateString("en-US", { weekday: "long" });
    return { years, months, days, totalDays, totalWeeks: Math.floor(totalDays / 7), totalMonths: years * 12 + months, toNext, weekdayBorn };
  }, [dob, asOf]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Date of birth</label><input className="input" type="date" value={dob} onChange={(e) => setDob(e.target.value)} /></div>
        <div className="field"><label>Age as of</label><input className="input" type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)} /></div>
      </div>
      {r ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">{r.years}y {r.months}m {r.days}d</div><div className="lbl">Exact age</div></div>
            <div className="stat"><div className="num">{r.toNext}</div><div className="lbl">Days to next birthday</div></div>
          </div>
          <div className="stat-row">
            <div className="stat"><div className="num">{r.totalMonths.toLocaleString()}</div><div className="lbl">Total months</div></div>
            <div className="stat"><div className="num">{r.totalWeeks.toLocaleString()}</div><div className="lbl">Total weeks</div></div>
            <div className="stat"><div className="num">{r.totalDays.toLocaleString()}</div><div className="lbl">Total days</div></div>
          </div>
          <p className="muted small" style={{ marginTop: 10 }}>You were born on a {r.weekdayBorn}.</p>
        </>
      ) : (
        <p className="muted">Enter a date of birth on or before the &ldquo;as of&rdquo; date.</p>
      )}
    </div>
  );
}
