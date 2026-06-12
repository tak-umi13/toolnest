"use client";

import { useState } from "react";
import { CopyButton } from "./ui";
import type { ToolParams } from "./ToolRenderer";

// Each set maps unit -> how many base units it represents. Conversion is then
// just: value * factor[from] / factor[to]. One widget, many tools.
const SETS: Record<string, { units: Record<string, number> }> = {
  length: { units: { Kilometers: 1000, Meters: 1, Centimeters: 0.01, Millimeters: 0.001, Miles: 1609.344, Yards: 0.9144, Feet: 0.3048, Inches: 0.0254 } },
  weight: { units: { Tonnes: 1000, Kilograms: 1, Grams: 0.001, Milligrams: 1e-6, Pounds: 0.45359237, Ounces: 0.028349523125 } },
  data: { units: { Bits: 1 / 8, Bytes: 1, Kilobytes: 1024, Megabytes: 1024 ** 2, Gigabytes: 1024 ** 3, Terabytes: 1024 ** 4 } },
  speed: { units: { "Meters/sec": 1, "Kilometers/hour": 1000 / 3600, "Miles/hour": 1609.344 / 3600, Knots: 1852 / 3600, "Feet/sec": 0.3048 } },
  time: { units: { Milliseconds: 0.001, Seconds: 1, Minutes: 60, Hours: 3600, Days: 86400, Weeks: 604800 } },
  area: { units: { "Square meters": 1, "Square kilometers": 1e6, "Square feet": 0.09290304, "Square yards": 0.83612736, Acres: 4046.8564224, Hectares: 10000 } },
  volume: { units: { Liters: 1, Milliliters: 0.001, "Cubic meters": 1000, "Gallons (US)": 3.785411784, "Quarts (US)": 0.946352946, "Cups (US)": 0.2365882365, "Fluid ounces (US)": 0.0295735295625 } },
  pressure: { units: { Pascals: 1, Kilopascals: 1000, Bar: 100000, PSI: 6894.757293168, Atmospheres: 101325, "Torr (mmHg)": 133.322368421 } },
  energy: { units: { Joules: 1, Kilojoules: 1000, Calories: 4.184, Kilocalories: 4184, "Watt-hours": 3600, "Kilowatt-hours": 3600000 } },
};

export function UnitConverter({ params }: { params?: ToolParams }) {
  const setKey = (params?.set as string) || "length";
  const set = SETS[setKey] ?? SETS.length;
  const keys = Object.keys(set.units);

  const [value, setValue] = useState("1");
  const [from, setFrom] = useState(keys[0]);
  const [to, setTo] = useState(keys[1] ?? keys[0]);

  const n = Number(value);
  const result = !value.trim() || Number.isNaN(n) ? null : (n * set.units[from]) / set.units[to];
  const resultStr = result === null ? "" : result.toLocaleString(undefined, { maximumFractionDigits: 6 });

  return (
    <div>
      <div className="field">
        <label>Value</label>
        <input className="input" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter a number" />
      </div>
      <div className="row">
        <div className="field"><label>From</label>
          <select className="select" value={from} onChange={(e) => setFrom(e.target.value)}>
            {keys.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div className="field"><label>To</label>
          <select className="select" value={to} onChange={(e) => setTo(e.target.value)}>
            {keys.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
      </div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button className="btn" type="button" onClick={() => { setFrom(to); setTo(from); }}>⇅ Swap</button>
      </div>
      <div className="field">
        <label>Result</label>
        <div className="tool-output" style={{ fontSize: "1.1rem" }}>
          {result === null ? "Enter a number to convert." : `${value} ${from} = ${resultStr} ${to}`}
        </div>
      </div>
      <CopyButton value={resultStr} label="Copy result" className="btn btn-primary" />
    </div>
  );
}
