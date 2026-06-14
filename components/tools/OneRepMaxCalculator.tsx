"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => Math.round(n * 10) / 10;

export function OneRepMaxCalculator() {
  const [weight, setWeight] = useState(100);
  const [reps, setReps] = useState(5);
  const [unit, setUnit] = useState<"kg" | "lb">("kg");

  const r = useMemo(() => {
    if (weight <= 0 || reps < 1 || reps > 36) return null;
    const epley = weight * (1 + reps / 30);
    const brzycki = weight * (36 / (37 - reps));
    const oneRm = reps === 1 ? weight : (epley + brzycki) / 2;
    return { oneRm };
  }, [weight, reps]);

  const PCTS = [100, 95, 90, 85, 80, 75, 70, 65, 60];

  return (
    <div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button type="button" className={unit === "kg" ? "btn btn-primary" : "btn"} onClick={() => setUnit("kg")}>kg</button>
        <button type="button" className={unit === "lb" ? "btn btn-primary" : "btn"} onClick={() => setUnit("lb")}>lb</button>
      </div>
      <div className="row">
        <div className="field"><label>Weight lifted ({unit})</label><input className="input" type="number" min={0} value={weight} onChange={(e) => setWeight(Number(e.target.value))} /></div>
        <div className="field"><label>Reps performed</label><input className="input" type="number" min={1} max={36} value={reps} onChange={(e) => setReps(Number(e.target.value))} /></div>
      </div>
      {r ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">{fmt(r.oneRm)} {unit}</div><div className="lbl">Estimated 1RM</div></div>
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label>Training percentages</label>
            <div className="tool-output" style={{ padding: 0 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {PCTS.map((p) => (
                    <tr key={p} style={{ borderTop: "1px solid var(--border, #2a2f3a)" }}>
                      <td className="muted" style={{ padding: "6px 12px" }}>{p}%</td>
                      <td style={{ padding: "6px 12px", fontWeight: 600 }}>{fmt((r.oneRm * p) / 100)} {unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <p className="muted small">Enter a weight and 1–36 reps.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Estimates your one-rep max (the most you could lift for a single rep) from a set, averaging
        the Epley and Brzycki formulas. Estimates are least accurate above ~10 reps. Warm up and
        use a spotter for heavy attempts. Runs in your browser.
      </p>
    </div>
  );
}
