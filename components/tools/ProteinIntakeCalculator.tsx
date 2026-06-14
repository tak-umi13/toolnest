"use client";

import { useMemo, useState } from "react";
import { lbToKg } from "../../lib/health";

// Grams of protein per kg of body weight, as [low, high] ranges by goal.
const GOALS = [
  { id: "sedentary", label: "Sedentary (general health)", lo: 0.8, hi: 1.0 },
  { id: "active", label: "Active / recreational", lo: 1.2, hi: 1.4 },
  { id: "muscle", label: "Build muscle", lo: 1.6, hi: 2.2 },
  { id: "cut", label: "Lose fat, keep muscle", lo: 1.8, hi: 2.4 },
  { id: "endurance", label: "Endurance athlete", lo: 1.2, hi: 1.6 },
] as const;

export function ProteinIntakeCalculator() {
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState(70);
  const [goal, setGoal] = useState(2);

  const r = useMemo(() => {
    const kg = units === "metric" ? weight : lbToKg(weight);
    if (kg <= 0) return null;
    const g = GOALS[goal];
    return { lo: Math.round(kg * g.lo), hi: Math.round(kg * g.hi) };
  }, [units, weight, goal]);

  return (
    <div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button type="button" className={units === "metric" ? "btn btn-primary" : "btn"} onClick={() => { setUnits("metric"); setWeight(70); }}>Metric (kg)</button>
        <button type="button" className={units === "imperial" ? "btn btn-primary" : "btn"} onClick={() => { setUnits("imperial"); setWeight(154); }}>Imperial (lb)</button>
      </div>
      <div className="row">
        <div className="field"><label>Body weight ({units === "metric" ? "kg" : "lb"})</label><input className="input" type="number" min={0} value={weight} onChange={(e) => setWeight(Number(e.target.value))} /></div>
        <div className="field"><label>Goal</label><select className="select" value={goal} onChange={(e) => setGoal(Number(e.target.value))}>{GOALS.map((g, i) => <option key={g.id} value={i}>{g.label}</option>)}</select></div>
      </div>
      {r && (
        <div className="stat-row">
          <div className="stat"><div className="num">{r.lo}–{r.hi}g</div><div className="lbl">Protein per day</div></div>
        </div>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Suggests a daily protein range based on body weight and goal. Active people and those
        building or preserving muscle need more than the basic RDA of 0.8 g/kg. Spread intake
        across meals. A general guide, not medical or dietary advice. Runs in your browser.
      </p>
    </div>
  );
}
