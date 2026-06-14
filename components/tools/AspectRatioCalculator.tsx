"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";
import { gcd } from "../../lib/mathx";

const PRESETS = ["16:9", "4:3", "21:9", "1:1", "3:2", "9:16"];

export function AspectRatioCalculator() {
  const [rw, setRw] = useState(16);
  const [rh, setRh] = useState(9);
  const [w, setW] = useState(1920);
  const [h, setH] = useState(1080);

  const setRatio = (a: number, b: number) => {
    setRw(a); setRh(b);
    if (a > 0) setH(Math.round((w * b) / a)); // keep width, resolve height
  };
  const onWidth = (val: number) => { setW(val); if (rw > 0) setH(Math.round((val * rh) / rw)); };
  const onHeight = (val: number) => { setH(val); if (rh > 0) setW(Math.round((val * rw) / rh)); };

  const simplified = useMemo(() => {
    if (!w || !h) return null;
    const g = gcd(w, h) || 1;
    return `${w / g}:${h / g}`;
  }, [w, h]);

  return (
    <div>
      <div className="field">
        <label>Aspect ratio</label>
        <div className="btn-row" style={{ flexWrap: "wrap", marginBottom: 8 }}>
          {PRESETS.map((p) => (
            <button key={p} type="button" className={`${rw}:${rh}` === p ? "btn btn-primary" : "btn"} onClick={() => { const [a, b] = p.split(":").map(Number); setRatio(a, b); }}>{p}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input className="input" type="number" min={1} value={rw} onChange={(e) => setRatio(Number(e.target.value), rh)} style={{ width: 80 }} aria-label="ratio width" />
          <span>:</span>
          <input className="input" type="number" min={1} value={rh} onChange={(e) => setRatio(rw, Number(e.target.value))} style={{ width: 80 }} aria-label="ratio height" />
        </div>
      </div>
      <div className="row">
        <div className="field"><label>Width (px)</label><input className="input" type="number" min={0} value={w} onChange={(e) => onWidth(Number(e.target.value))} /></div>
        <div className="field"><label>Height (px)</label><input className="input" type="number" min={0} value={h} onChange={(e) => onHeight(Number(e.target.value))} /></div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{w} × {h}</div><div className="lbl">Dimensions</div></div>
        <div className="stat"><div className="num">{simplified ?? "—"}</div><div className="lbl">Simplified ratio</div></div>
      </div>
      <div style={{ marginTop: 10 }}><CopyButton value={`${w}x${h}`} label="Copy dimensions" className="btn" /></div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Pick a ratio (or type your own) and set either width or height — the other updates to keep
        the proportions. Editing a dimension also shows its simplified ratio. Runs in your browser.
      </p>
    </div>
  );
}
