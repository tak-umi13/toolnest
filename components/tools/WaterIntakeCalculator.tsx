"use client";

import { useMemo, useState } from "react";
import { lbToKg } from "../../lib/health";

export function WaterIntakeCalculator() {
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState(70);
  const [exercise, setExercise] = useState(30);

  const r = useMemo(() => {
    const kg = units === "metric" ? weight : lbToKg(weight);
    if (kg <= 0) return null;
    // ~35 ml per kg baseline + ~350 ml per 30 min of exercise.
    const ml = kg * 35 + (Math.max(0, exercise) / 30) * 350;
    return { liters: ml / 1000, oz: ml / 29.5735, cups: ml / 240 };
  }, [units, weight, exercise]);

  return (
    <div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button type="button" className={units === "metric" ? "btn btn-primary" : "btn"} onClick={() => { setUnits("metric"); setWeight(70); }}>Metric (kg)</button>
        <button type="button" className={units === "imperial" ? "btn btn-primary" : "btn"} onClick={() => { setUnits("imperial"); setWeight(154); }}>Imperial (lb)</button>
      </div>
      <div className="row">
        <div className="field"><label>Body weight ({units === "metric" ? "kg" : "lb"})</label><input className="input" type="number" min={0} value={weight} onChange={(e) => setWeight(Number(e.target.value))} /></div>
        <div className="field"><label>Exercise (min/day)</label><input className="input" type="number" min={0} value={exercise} onChange={(e) => setExercise(Number(e.target.value))} /></div>
      </div>
      {r ? (
        <div className="stat-row">
          <div className="stat"><div className="num">{r.liters.toFixed(1)} L</div><div className="lbl">Per day</div></div>
          <div className="stat"><div className="num">{Math.round(r.oz)} oz</div><div className="lbl">Fluid ounces</div></div>
          <div className="stat"><div className="num">{Math.round(r.cups)}</div><div className="lbl">Cups (240ml)</div></div>
        </div>
      ) : (
        <p className="muted small">Enter your weight.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Estimates daily water needs from body weight (~35 ml per kg) plus extra for exercise.
        Needs also rise with heat, altitude, illness and pregnancy — drink to thirst and check
        urine colour. Includes water from food and drinks. Not medical advice. Runs in your browser.
      </p>
    </div>
  );
}
