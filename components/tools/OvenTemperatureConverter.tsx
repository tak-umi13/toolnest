"use client";

import { useMemo, useState } from "react";

// Gas mark → Celsius reference points (conventional oven).
const GAS: [number, number][] = [
  [0.25, 110], [0.5, 120], [1, 140], [2, 150], [3, 160], [4, 180],
  [5, 190], [6, 200], [7, 220], [8, 230], [9, 240],
];

function cToGas(c: number): string {
  let best = GAS[0];
  for (const g of GAS) if (Math.abs(g[1] - c) < Math.abs(best[1] - c)) best = g;
  // Only call it a gas mark if reasonably close to a known point.
  return Math.abs(best[1] - c) <= 8 ? String(best[0]) : "—";
}

export function OvenTemperatureConverter() {
  const [value, setValue] = useState(180);
  const [unit, setUnit] = useState<"C" | "F" | "gas">("C");

  const r = useMemo(() => {
    let c: number;
    if (unit === "C") c = value;
    else if (unit === "F") c = (value - 32) * 5 / 9;
    else {
      const g = GAS.find((x) => x[0] === value);
      c = g ? g[1] : NaN;
    }
    if (Number.isNaN(c)) return null;
    return { c: Math.round(c), f: Math.round(c * 9 / 5 + 32), gas: cToGas(c), fan: Math.round(c - 20) };
  }, [value, unit]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Temperature</label>
          {unit === "gas" ? (
            <select className="select" value={value} onChange={(e) => setValue(Number(e.target.value))}>
              {GAS.map(([g]) => <option key={g} value={g}>Gas Mark {g}</option>)}
            </select>
          ) : (
            <input className="input" type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
          )}
        </div>
        <div className="field"><label>From</label>
          <select className="select" value={unit} onChange={(e) => { const u = e.target.value as "C" | "F" | "gas"; setUnit(u); setValue(u === "gas" ? 4 : u === "F" ? 350 : 180); }}>
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
            <option value="gas">Gas Mark</option>
          </select>
        </div>
      </div>
      {r ? (
        <div className="stat-row">
          <div className="stat"><div className="num">{r.c}°C</div><div className="lbl">Celsius</div></div>
          <div className="stat"><div className="num">{r.f}°F</div><div className="lbl">Fahrenheit</div></div>
          <div className="stat"><div className="num">{r.gas}</div><div className="lbl">Gas Mark</div></div>
          <div className="stat"><div className="num">{r.fan}°C</div><div className="lbl">Fan / convection</div></div>
        </div>
      ) : (
        <p className="muted small">Enter a temperature.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Converts between Celsius, Fahrenheit and UK gas marks for conventional ovens. For a fan
        (convection) oven, reduce the conventional Celsius by about 20°C — shown above. Gas marks
        snap to the nearest standard setting. Runs in your browser.
      </p>
    </div>
  );
}
