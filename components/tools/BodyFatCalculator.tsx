"use client";

import { useMemo, useState } from "react";
import { inToCm, type Sex } from "../../lib/health";

const CATS: [number, string][] = [
  [6, "Essential fat"], [14, "Athletes"], [18, "Fitness"], [25, "Average"], [100, "Obese"],
];
function category(bf: number, sex: Sex): string {
  // Thresholds shift by sex; add ~8 points for women's healthy ranges.
  const adj = sex === "female" ? 8 : 0;
  for (const [max, label] of CATS) if (bf <= max + adj) return label;
  return "Obese";
}

export function BodyFatCalculator() {
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [height, setHeight] = useState(175);
  const [neck, setNeck] = useState(38);
  const [waist, setWaist] = useState(85);
  const [hip, setHip] = useState(95);

  const r = useMemo(() => {
    const cv = (v: number) => (units === "metric" ? v : inToCm(v));
    const h = cv(height), n = cv(neck), w = cv(waist), hp = cv(hip);
    if (h <= 0 || n <= 0 || w <= 0) return null;
    let bf: number;
    if (sex === "male") {
      if (w - n <= 0) return null;
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      if (w + hp - n <= 0) return null;
      bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.221 * Math.log10(h)) - 450;
    }
    if (!Number.isFinite(bf) || bf <= 0) return null;
    return { bf: Math.min(75, bf), cat: category(bf, sex) };
  }, [units, sex, height, neck, waist, hip]);

  const u = units === "metric" ? "cm" : "in";

  return (
    <div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button type="button" className={units === "metric" ? "btn btn-primary" : "btn"} onClick={() => { setUnits("metric"); setHeight(175); setNeck(38); setWaist(85); setHip(95); }}>Metric (cm)</button>
        <button type="button" className={units === "imperial" ? "btn btn-primary" : "btn"} onClick={() => { setUnits("imperial"); setHeight(69); setNeck(15); setWaist(34); setHip(37); }}>Imperial (in)</button>
      </div>
      <div className="row">
        <div className="field"><label>Sex</label><select className="select" value={sex} onChange={(e) => setSex(e.target.value as Sex)}><option value="male">Male</option><option value="female">Female</option></select></div>
        <div className="field"><label>Height ({u})</label><input className="input" type="number" min={0} value={height} onChange={(e) => setHeight(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Neck ({u})</label><input className="input" type="number" min={0} value={neck} onChange={(e) => setNeck(Number(e.target.value))} /></div>
        <div className="field"><label>Waist ({u})</label><input className="input" type="number" min={0} value={waist} onChange={(e) => setWaist(Number(e.target.value))} /></div>
      </div>
      {sex === "female" && (
        <div className="field" style={{ maxWidth: 200 }}><label>Hip ({u})</label><input className="input" type="number" min={0} value={hip} onChange={(e) => setHip(Number(e.target.value))} /></div>
      )}
      {r ? (
        <div className="stat-row">
          <div className="stat"><div className="num">{r.bf.toFixed(1)}%</div><div className="lbl">Body fat</div></div>
          <div className="stat"><div className="num" style={{ fontSize: "1.1rem" }}>{r.cat}</div><div className="lbl">Category</div></div>
        </div>
      ) : (
        <p className="muted small">Enter your measurements (waist must exceed neck).</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Uses the U.S. Navy circumference method, which estimates body fat from tape measurements.
        It&apos;s a quick estimate, not as precise as a DEXA scan, and not medical advice. Runs in your browser.
      </p>
    </div>
  );
}
