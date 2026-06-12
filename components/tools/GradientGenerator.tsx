"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

export function GradientGenerator() {
  const [from, setFrom] = useState("#2563eb");
  const [to, setTo] = useState("#9333ea");
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<"linear" | "radial">("linear");

  const css =
    type === "linear"
      ? `linear-gradient(${angle}deg, ${from}, ${to})`
      : `radial-gradient(circle, ${from}, ${to})`;
  const rule = `background: ${css};`;

  return (
    <div>
      <div
        style={{ height: 140, borderRadius: 12, border: "1px solid var(--border)", background: css, marginBottom: 16 }}
        aria-label="Gradient preview"
      />
      <div className="row">
        <div className="field"><label>From color</label><input className="input" type="color" value={from} onChange={(e) => setFrom(e.target.value)} style={{ height: 44, padding: 4 }} /></div>
        <div className="field"><label>To color</label><input className="input" type="color" value={to} onChange={(e) => setTo(e.target.value)} style={{ height: 44, padding: 4 }} /></div>
      </div>
      <div className="row">
        <div className="field">
          <label>Type</label>
          <select className="select" value={type} onChange={(e) => setType(e.target.value as "linear" | "radial")}>
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
        </div>
        <div className="field">
          <label>Angle ({angle}°)</label>
          <input type="range" min={0} max={360} value={angle} disabled={type === "radial"} onChange={(e) => setAngle(Number(e.target.value))} style={{ width: "100%" }} aria-label="Gradient angle" />
        </div>
      </div>
      <div className="field">
        <label>CSS</label>
        <div className="tool-output">{rule}</div>
      </div>
      <CopyButton value={rule} label="Copy CSS" className="btn btn-primary" />
    </div>
  );
}
