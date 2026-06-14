"use client";

import { useMemo, useState } from "react";
import { inToCm, cmToIn, kgToLb, type Sex } from "../../lib/health";

export function IdealWeightCalculator() {
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [height, setHeight] = useState(175);

  const r = useMemo(() => {
    const cm = units === "metric" ? height : inToCm(height);
    const inchesOver5ft = Math.max(0, cmToIn(cm) - 60);
    if (cm <= 0) return null;
    const male = sex === "male";
    const kg = {
      Devine: (male ? 50 : 45.5) + 2.3 * inchesOver5ft,
      Robinson: (male ? 52 : 49) + (male ? 1.9 : 1.7) * inchesOver5ft,
      Miller: (male ? 56.2 : 53.1) + (male ? 1.41 : 1.36) * inchesOver5ft,
      Hamwi: (male ? 48 : 45.5) + (male ? 2.7 : 2.2) * inchesOver5ft,
    };
    const vals = Object.values(kg);
    return { kg, min: Math.min(...vals), max: Math.max(...vals) };
  }, [units, sex, height]);

  const show = (kg: number) => (units === "metric" ? `${kg.toFixed(1)} kg` : `${kgToLb(kg).toFixed(1)} lb`);

  return (
    <div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button type="button" className={units === "metric" ? "btn btn-primary" : "btn"} onClick={() => { setUnits("metric"); setHeight(175); }}>Metric (cm)</button>
        <button type="button" className={units === "imperial" ? "btn btn-primary" : "btn"} onClick={() => { setUnits("imperial"); setHeight(69); }}>Imperial (in)</button>
      </div>
      <div className="row">
        <div className="field"><label>Sex</label><select className="select" value={sex} onChange={(e) => setSex(e.target.value as Sex)}><option value="male">Male</option><option value="female">Female</option></select></div>
        <div className="field"><label>Height ({units === "metric" ? "cm" : "in"})</label><input className="input" type="number" min={0} value={height} onChange={(e) => setHeight(Number(e.target.value))} /></div>
      </div>
      {r ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">{show(r.min)}</div><div className="lbl">Range low</div></div>
            <div className="stat"><div className="num">{show(r.max)}</div><div className="lbl">Range high</div></div>
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label>By formula</label>
            <div className="tool-output" style={{ padding: 0 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {Object.entries(r.kg).map(([name, kg]) => (
                    <tr key={name} style={{ borderTop: "1px solid var(--border, #2a2f3a)" }}>
                      <td className="muted" style={{ padding: "6px 12px" }}>{name}</td>
                      <td style={{ padding: "6px 12px", fontWeight: 600 }}>{show(kg)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <p className="muted small">Enter your height.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Shows ideal body weight from the classic Devine, Robinson, Miller and Hamwi formulas,
        which are based on height and sex. They&apos;re rough guides — healthy weight also depends
        on build, muscle and body composition. Not medical advice. Runs in your browser.
      </p>
    </div>
  );
}
