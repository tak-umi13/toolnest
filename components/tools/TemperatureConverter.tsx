"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

const UNITS = ["Celsius", "Fahrenheit", "Kelvin"] as const;
type Unit = (typeof UNITS)[number];

// Temperature can't use a single factor table — each scale has a different zero
// point — so we pivot through Celsius with explicit formulas.
function toCelsius(v: number, u: Unit): number {
  if (u === "Fahrenheit") return ((v - 32) * 5) / 9;
  if (u === "Kelvin") return v - 273.15;
  return v;
}
function fromCelsius(c: number, u: Unit): number {
  if (u === "Fahrenheit") return (c * 9) / 5 + 32;
  if (u === "Kelvin") return c + 273.15;
  return c;
}

export function TemperatureConverter() {
  const [value, setValue] = useState("100");
  const [from, setFrom] = useState<Unit>("Celsius");
  const [to, setTo] = useState<Unit>("Fahrenheit");

  const n = Number(value);
  const result = !value.trim() || Number.isNaN(n) ? null : fromCelsius(toCelsius(n, from), to);
  const resultStr = result === null ? "" : Number(result.toFixed(4)).toLocaleString();

  return (
    <div>
      <div className="field">
        <label>Temperature</label>
        <input className="input" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter a temperature" />
      </div>
      <div className="row">
        <div className="field"><label>From</label>
          <select className="select" value={from} onChange={(e) => setFrom(e.target.value as Unit)}>
            {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div className="field"><label>To</label>
          <select className="select" value={to} onChange={(e) => setTo(e.target.value as Unit)}>
            {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button className="btn" type="button" onClick={() => { setFrom(to); setTo(from); }}>⇅ Swap</button>
      </div>
      <div className="field">
        <label>Result</label>
        <div className="tool-output" style={{ fontSize: "1.1rem" }}>
          {result === null ? "Enter a temperature to convert." : `${value} ${from} = ${resultStr} ${to}`}
        </div>
      </div>
      <CopyButton value={resultStr} label="Copy result" className="btn btn-primary" />
    </div>
  );
}
