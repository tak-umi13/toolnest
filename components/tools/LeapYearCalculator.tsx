"use client";

import { useMemo, useState } from "react";

const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

export function LeapYearCalculator() {
  const [year, setYear] = useState(new Date().getFullYear());

  const r = useMemo(() => {
    if (!Number.isInteger(year)) return null;
    const leap = isLeap(year);
    let next = year + 1;
    while (!isLeap(next)) next++;
    let prev = year - 1;
    while (!isLeap(prev)) prev--;
    return { leap, next, prev, days: leap ? 366 : 365 };
  }, [year]);

  return (
    <div>
      <div className="field" style={{ maxWidth: 220 }}>
        <label htmlFor="ly">Year</label>
        <input id="ly" className="input" type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value, 10))} />
      </div>
      {r ? (
        <>
          <div className="tool-output" style={{ fontSize: "1.2rem", fontWeight: 700, color: r.leap ? "#16a34a" : "var(--text)" }}>
            {year} is {r.leap ? "a leap year ✓ (366 days)" : "not a leap year (365 days)"}
          </div>
          <div className="stat-row">
            <div className="stat"><div className="num">{r.prev}</div><div className="lbl">Previous leap year</div></div>
            <div className="stat"><div className="num">{r.next}</div><div className="lbl">Next leap year</div></div>
            <div className="stat"><div className="num">{r.days}</div><div className="lbl">Days this year</div></div>
          </div>
        </>
      ) : (
        <p className="muted small">Enter a year.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        A year is a leap year if it&apos;s divisible by 4 — except century years, which must
        also be divisible by 400. So 2000 was a leap year but 1900 wasn&apos;t. Runs in your browser.
      </p>
    </div>
  );
}
