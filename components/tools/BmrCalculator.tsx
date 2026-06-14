"use client";

import { useMemo, useState } from "react";
import { lbToKg, inToCm, ACTIVITY, type Sex } from "../../lib/health";

const fmt = (n: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(Math.round(n));

export function BmrCalculator() {
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [activity, setActivity] = useState(2);

  const r = useMemo(() => {
    const kg = units === "metric" ? weight : lbToKg(weight);
    const cm = units === "metric" ? height : inToCm(height);
    if (kg <= 0 || cm <= 0 || age <= 0) return null;
    // Mifflin-St Jeor.
    const bmr = 10 * kg + 6.25 * cm - 5 * age + (sex === "male" ? 5 : -161);
    return { bmr, tdee: bmr * ACTIVITY[activity].factor };
  }, [units, sex, age, weight, height, activity]);

  return (
    <div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button type="button" className={units === "metric" ? "btn btn-primary" : "btn"} onClick={() => { setUnits("metric"); setWeight(70); setHeight(175); }}>Metric (kg/cm)</button>
        <button type="button" className={units === "imperial" ? "btn btn-primary" : "btn"} onClick={() => { setUnits("imperial"); setWeight(154); setHeight(69); }}>Imperial (lb/in)</button>
      </div>
      <div className="row">
        <div className="field"><label>Sex</label>
          <select className="select" value={sex} onChange={(e) => setSex(e.target.value as Sex)}><option value="male">Male</option><option value="female">Female</option></select>
        </div>
        <div className="field"><label>Age</label><input className="input" type="number" min={1} value={age} onChange={(e) => setAge(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Weight ({units === "metric" ? "kg" : "lb"})</label><input className="input" type="number" min={0} value={weight} onChange={(e) => setWeight(Number(e.target.value))} /></div>
        <div className="field"><label>Height ({units === "metric" ? "cm" : "in"})</label><input className="input" type="number" min={0} value={height} onChange={(e) => setHeight(Number(e.target.value))} /></div>
      </div>
      <div className="field">
        <label>Activity level</label>
        <select className="select" value={activity} onChange={(e) => setActivity(Number(e.target.value))}>
          {ACTIVITY.map((a, i) => <option key={a.id} value={i}>{a.label}</option>)}
        </select>
      </div>
      {r && (
        <div className="stat-row">
          <div className="stat"><div className="num">{fmt(r.bmr)}</div><div className="lbl">BMR (cal/day)</div></div>
          <div className="stat"><div className="num">{fmt(r.tdee)}</div><div className="lbl">TDEE (cal/day)</div></div>
        </div>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        BMR (basal metabolic rate) is the energy your body uses at rest, via the Mifflin-St Jeor
        equation. TDEE multiplies BMR by your activity level — roughly the calories to maintain
        your weight. A general estimate, not medical advice. Runs in your browser.
      </p>
    </div>
  );
}
