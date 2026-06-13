"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

type Mode = "round" | "floor" | "ceil";

function roundTo(x: number, places: number, mode: Mode): number {
  const f = Math.pow(10, places);
  const scaled = x * f;
  const fn = mode === "floor" ? Math.floor : mode === "ceil" ? Math.ceil : Math.round;
  return fn(scaled) / f;
}

function sigFigs(x: number, sig: number): number {
  if (x === 0) return 0;
  const d = Math.ceil(Math.log10(Math.abs(x)));
  const power = sig - d;
  const mag = Math.pow(10, power);
  return Math.round(x * mag) / mag;
}

export function RoundingCalculator() {
  const [value, setValue] = useState("3.14159");
  const [places, setPlaces] = useState(2);
  const [mode, setMode] = useState<Mode>("round");
  const [sig, setSig] = useState(3);

  const r = useMemo(() => {
    const x = Number(value);
    if (value.trim() === "" || Number.isNaN(x)) return null;
    return {
      decimals: roundTo(x, places, mode),
      nearest: [1, 10, 100, 1000].map((step) => ({ step, val: (mode === "floor" ? Math.floor : mode === "ceil" ? Math.ceil : Math.round)(x / step) * step })),
      sig: sigFigs(x, Math.max(1, sig)),
    };
  }, [value, places, mode, sig]);

  return (
    <div>
      <div className="row">
        <div className="field"><label htmlFor="rv">Number</label><input id="rv" className="input" value={value} onChange={(e) => setValue(e.target.value)} /></div>
        <div className="field">
          <label htmlFor="rm">Mode</label>
          <select id="rm" className="select" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="round">Round (nearest)</option>
            <option value="floor">Round down (floor)</option>
            <option value="ceil">Round up (ceil)</option>
          </select>
        </div>
      </div>
      {r ? (
        <>
          <div className="row">
            <div className="field">
              <label>To {places} decimal place{places === 1 ? "" : "s"}</label>
              <input type="range" min={0} max={8} value={places} onChange={(e) => setPlaces(Number(e.target.value))} style={{ width: "100%" }} />
              <div className="tool-output" style={{ fontSize: "1.2rem", fontWeight: 700 }}>{r.decimals}<CopyButton value={String(r.decimals)} className="btn" /></div>
            </div>
            <div className="field">
              <label>To {sig} significant figure{sig === 1 ? "" : "s"}</label>
              <input type="range" min={1} max={8} value={sig} onChange={(e) => setSig(Number(e.target.value))} style={{ width: "100%" }} />
              <div className="tool-output" style={{ fontSize: "1.2rem", fontWeight: 700 }}>{r.sig}</div>
            </div>
          </div>
          <div className="field">
            <label>To the nearest…</label>
            <div className="stat-row">
              {r.nearest.map((x) => (
                <div className="stat" key={x.step}><div className="num">{x.val.toLocaleString()}</div><div className="lbl">Nearest {x.step}</div></div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="muted small">Enter a number to round.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Round to a number of decimal places or significant figures, or to the nearest 10/100/1000 —
        with round, floor (down) or ceil (up) modes. Runs in your browser.
      </p>
    </div>
  );
}
