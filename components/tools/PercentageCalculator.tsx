"use client";

import { useState } from "react";

const fmt = (n: number) => (Number.isFinite(n) ? Number(n.toFixed(2)).toLocaleString() : "—");

export function PercentageCalculator() {
  // Section 1: what is p% of v
  const [p, setP] = useState(15);
  const [v, setV] = useState(200);
  // Section 2: a is what % of b
  const [a, setA] = useState(50);
  const [b, setB] = useState(200);
  // Section 3: % change from o to n
  const [o, setO] = useState(100);
  const [n, setN] = useState(125);

  const change = ((n - o) / o) * 100;

  return (
    <div>
      <div className="field">
        <label>What is X% of Y?</label>
        <div className="row">
          <input className="input" type="number" value={p} onChange={(e) => setP(Number(e.target.value))} aria-label="percent" />
          <input className="input" type="number" value={v} onChange={(e) => setV(Number(e.target.value))} aria-label="value" />
        </div>
        <div className="tool-output">{p}% of {v} = <strong>{fmt((p / 100) * v)}</strong></div>
      </div>

      <hr className="div" />

      <div className="field">
        <label>X is what percent of Y?</label>
        <div className="row">
          <input className="input" type="number" value={a} onChange={(e) => setA(Number(e.target.value))} aria-label="part" />
          <input className="input" type="number" value={b} onChange={(e) => setB(Number(e.target.value))} aria-label="whole" />
        </div>
        <div className="tool-output">{a} is <strong>{fmt((a / b) * 100)}%</strong> of {b}</div>
      </div>

      <hr className="div" />

      <div className="field">
        <label>Percentage change from X to Y</label>
        <div className="row">
          <input className="input" type="number" value={o} onChange={(e) => setO(Number(e.target.value))} aria-label="old" />
          <input className="input" type="number" value={n} onChange={(e) => setN(Number(e.target.value))} aria-label="new" />
        </div>
        <div className="tool-output">
          {change >= 0 ? "Increase" : "Decrease"} of <strong>{fmt(Math.abs(change))}%</strong>
        </div>
      </div>
    </div>
  );
}
