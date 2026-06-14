"use client";

import { useMemo, useState } from "react";

// Macro split presets as [protein%, carbs%, fat%].
const SPLITS = [
  { id: "balanced", label: "Balanced (30/40/30)", p: 30, c: 40, f: 30 },
  { id: "highprotein", label: "High protein (40/30/30)", p: 40, c: 30, f: 30 },
  { id: "lowcarb", label: "Low carb (40/20/40)", p: 40, c: 20, f: 40 },
  { id: "keto", label: "Keto (30/5/65)", p: 30, c: 5, f: 65 },
  { id: "endurance", label: "Endurance (25/55/20)", p: 25, c: 55, f: 20 },
] as const;

const CAL = { p: 4, c: 4, f: 9 }; // calories per gram

export function MacroCalculator() {
  const [calories, setCalories] = useState(2000);
  const [split, setSplit] = useState(0);

  const r = useMemo(() => {
    const s = SPLITS[split];
    return {
      protein: (calories * (s.p / 100)) / CAL.p,
      carbs: (calories * (s.c / 100)) / CAL.c,
      fat: (calories * (s.f / 100)) / CAL.f,
    };
  }, [calories, split]);

  const g = (n: number) => Math.round(n);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Daily calories</label><input className="input" type="number" min={0} value={calories} onChange={(e) => setCalories(Number(e.target.value))} /></div>
        <div className="field">
          <label>Macro split</label>
          <select className="select" value={split} onChange={(e) => setSplit(Number(e.target.value))}>
            {SPLITS.map((s, i) => <option key={s.id} value={i}>{s.label}</option>)}
          </select>
        </div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{g(r.protein)}g</div><div className="lbl">Protein</div></div>
        <div className="stat"><div className="num">{g(r.carbs)}g</div><div className="lbl">Carbs</div></div>
        <div className="stat"><div className="num">{g(r.fat)}g</div><div className="lbl">Fat</div></div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Splits your daily calorie target into grams of protein, carbs and fat (4, 4 and 9
        calories per gram). Pick the split that matches your goal. A general estimate — not a
        diet or medical plan. Runs in your browser.
      </p>
    </div>
  );
}
