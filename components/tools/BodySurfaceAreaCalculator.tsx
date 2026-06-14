"use client";

import { useMemo, useState } from "react";
import { lbToKg, inToCm } from "../../lib/health";

export function BodySurfaceAreaCalculator() {
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);

  const r = useMemo(() => {
    const kg = units === "metric" ? weight : lbToKg(weight);
    const cm = units === "metric" ? height : inToCm(height);
    if (kg <= 0 || cm <= 0) return null;
    const mosteller = Math.sqrt((cm * kg) / 3600);
    const dubois = 0.007184 * Math.pow(cm, 0.725) * Math.pow(kg, 0.425);
    const haycock = 0.024265 * Math.pow(cm, 0.3964) * Math.pow(kg, 0.5378);
    return { mosteller, dubois, haycock };
  }, [units, weight, height]);

  return (
    <div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button type="button" className={units === "metric" ? "btn btn-primary" : "btn"} onClick={() => { setUnits("metric"); setWeight(70); setHeight(175); }}>Metric</button>
        <button type="button" className={units === "imperial" ? "btn btn-primary" : "btn"} onClick={() => { setUnits("imperial"); setWeight(154); setHeight(69); }}>Imperial</button>
      </div>
      <div className="row">
        <div className="field"><label>Weight ({units === "metric" ? "kg" : "lb"})</label><input className="input" type="number" min={0} value={weight} onChange={(e) => setWeight(Number(e.target.value))} /></div>
        <div className="field"><label>Height ({units === "metric" ? "cm" : "in"})</label><input className="input" type="number" min={0} value={height} onChange={(e) => setHeight(Number(e.target.value))} /></div>
      </div>
      {r ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">{r.mosteller.toFixed(2)} m²</div><div className="lbl">Mosteller</div></div>
            <div className="stat"><div className="num">{r.dubois.toFixed(2)} m²</div><div className="lbl">Du Bois</div></div>
            <div className="stat"><div className="num">{r.haycock.toFixed(2)} m²</div><div className="lbl">Haycock</div></div>
          </div>
        </>
      ) : (
        <p className="muted small">Enter your weight and height.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Body surface area (BSA) is used in medicine to dose some drugs and assess metabolic needs.
        The Mosteller formula is the most common; Du Bois and Haycock are shown for comparison.
        An estimate for reference, not a prescription. Runs in your browser.
      </p>
    </div>
  );
}
