"use client";

import { useMemo, useState } from "react";

function ymd(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  if (days < 0) { months -= 1; days += new Date(to.getFullYear(), to.getMonth(), 0).getDate(); }
  if (months < 0) { years -= 1; months += 12; }
  return { years, months, days };
}

export function DaysUntilCalculator() {
  const today = new Date().toISOString().slice(0, 10);
  const [target, setTarget] = useState(today);

  const r = useMemo(() => {
    const t = new Date(target + "T00:00:00");
    if (Number.isNaN(t.getTime())) return null;
    const now = new Date();
    const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const msPerDay = 86400000;
    const totalDays = Math.round((t.getTime() - todayMid.getTime()) / msPerDay);
    const past = totalDays < 0;
    const abs = Math.abs(totalDays);
    const [a, b] = past ? [t, todayMid] : [todayMid, t];
    const parts = ymd(a, b);
    const weekday = t.toLocaleDateString("en-US", { weekday: "long" });
    return { totalDays, past, abs, weeks: Math.floor(abs / 7), remDays: abs % 7, parts, weekday };
  }, [target]);

  return (
    <div>
      <div className="field" style={{ maxWidth: 280 }}>
        <label htmlFor="du">Target date</label>
        <input id="du" className="input" type="date" value={target} onChange={(e) => setTarget(e.target.value)} />
      </div>
      {r ? (
        <>
          <div className="stat-row">
            <div className="stat">
              <div className="num">{r.totalDays === 0 ? "Today" : r.abs.toLocaleString()}</div>
              <div className="lbl">{r.totalDays === 0 ? "🎉" : r.past ? "Days ago" : "Days until"}</div>
            </div>
            <div className="stat"><div className="num">{r.weeks}<span className="muted small"> w {r.remDays} d</span></div><div className="lbl">Weeks</div></div>
            <div className="stat"><div className="num" style={{ fontSize: "1rem" }}>{r.weekday}</div><div className="lbl">Falls on</div></div>
          </div>
          {r.totalDays !== 0 && (
            <p className="small" style={{ marginTop: 10 }}>
              That&apos;s {r.parts.years > 0 && `${r.parts.years} year${r.parts.years === 1 ? "" : "s"}, `}
              {r.parts.months} month{r.parts.months === 1 ? "" : "s"} and {r.parts.days} day{r.parts.days === 1 ? "" : "s"}{" "}
              {r.past ? "ago" : "from today"}.
            </p>
          )}
        </>
      ) : (
        <p className="muted small">Pick a valid date.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Counts the days between today and any date — future (days until) or past (days ago) —
        and shows the calendar breakdown and the weekday it falls on. Runs in your browser.
      </p>
    </div>
  );
}
