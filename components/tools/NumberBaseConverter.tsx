"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

const BASES = [
  { label: "Binary (2)", value: 2 },
  { label: "Octal (8)", value: 8 },
  { label: "Decimal (10)", value: 10 },
  { label: "Hex (16)", value: 16 },
];

export function NumberBaseConverter() {
  const [input, setInput] = useState("");
  const [from, setFrom] = useState(10);

  const parsed = (() => {
    const v = input.trim().toLowerCase().replace(/^0x|^0b|^0o/, "");
    if (!v) return null;
    const valid = new RegExp(`^[0-9a-z]+$`).test(v) && [...v].every((c) => parseInt(c, 36) < from);
    if (!valid) return null;
    const n = parseInt(v, from);
    return Number.isNaN(n) ? null : n;
  })();

  return (
    <div>
      <div className="row">
        <div className="field"><label>Value</label><input className="input" placeholder="e.g. 255" value={input} onChange={(e) => setInput(e.target.value)} /></div>
        <div className="field"><label>From base</label>
          <select className="select" value={from} onChange={(e) => setFrom(Number(e.target.value))}>
            {BASES.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>
        </div>
      </div>
      {input.trim() && parsed === null && <p className="error-text">⚠ Not a valid base-{from} number.</p>}
      {parsed !== null && (
        <div className="stat-row" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="stat"><div className="lbl">Binary</div><div className="num" style={{ fontSize: "1rem", wordBreak: "break-all" }}>{parsed.toString(2)}</div></div>
          <div className="stat"><div className="lbl">Octal</div><div className="num" style={{ fontSize: "1rem" }}>{parsed.toString(8)}</div></div>
          <div className="stat"><div className="lbl">Decimal</div><div className="num" style={{ fontSize: "1rem" }}>{parsed.toString(10)}</div></div>
          <div className="stat"><div className="lbl">Hex</div><div className="num" style={{ fontSize: "1rem" }}>{parsed.toString(16).toUpperCase()}</div></div>
        </div>
      )}
      {parsed !== null && <div style={{ marginTop: 12 }}><CopyButton value={parsed.toString(10)} label="Copy decimal" className="btn btn-primary" /></div>}
    </div>
  );
}
