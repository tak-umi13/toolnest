"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

function to12h(hhmm: string): string | null {
  const m = hhmm.match(/^(\d{1,2}):?(\d{2})$/);
  if (!m) return null;
  let h = +m[1];
  const min = +m[2];
  if (h > 23 || min > 59) return null;
  const period = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return `${h}:${String(min).padStart(2, "0")} ${period}`;
}

function to24h(input: string): string | null {
  const m = input.trim().match(/^(\d{1,2}):?(\d{2})\s*([ap]\.?m\.?)$/i);
  if (!m) return null;
  let h = +m[1];
  const min = +m[2];
  const pm = /p/i.test(m[3]);
  if (h < 1 || h > 12 || min > 59) return null;
  if (h === 12) h = 0;
  if (pm) h += 12;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

export function MilitaryTimeConverter() {
  const [mode, setMode] = useState<"to12" | "to24">("to12");
  const [input, setInput] = useState("1430");

  const result = useMemo(() => {
    if (!input.trim()) return null;
    return mode === "to12" ? to12h(input) : to24h(input);
  }, [input, mode]);

  return (
    <div>
      <div className="field">
        <label>Mode</label>
        <div className="btn-row">
          <button type="button" className={mode === "to12" ? "btn btn-primary" : "btn"} onClick={() => { setMode("to12"); setInput("1430"); }}>Military → 12-hour</button>
          <button type="button" className={mode === "to24" ? "btn btn-primary" : "btn"} onClick={() => { setMode("to24"); setInput("2:30 PM"); }}>12-hour → Military</button>
        </div>
      </div>
      <div className="field" style={{ maxWidth: 280 }}>
        <label htmlFor="mt">{mode === "to12" ? "Military time (e.g. 1430)" : "12-hour time (e.g. 2:30 PM)"}</label>
        <input id="mt" className="input" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {result ? (
        <div className="tool-output" style={{ fontSize: "1.6rem", fontWeight: 700 }}>
          {result}
          <span style={{ marginLeft: 12 }}><CopyButton value={result} className="btn" /></span>
        </div>
      ) : (
        <p className="small" style={{ color: "#ff6b6b" }}>Enter a valid {mode === "to12" ? "24-hour time like 1430 or 14:30" : "12-hour time like 2:30 PM"}.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Military (24-hour) time runs 0000–2359 with no AM/PM — midnight is 0000, noon is 1200,
        and 1430 is 2:30 PM. Converts both ways in your browser.
      </p>
    </div>
  );
}
