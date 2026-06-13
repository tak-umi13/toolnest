"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

export function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState("");

  function generate() {
    const lo = Math.ceil(Math.min(min, max));
    const hi = Math.floor(Math.max(min, max));
    const n = Math.max(1, Math.min(10000, Math.floor(count)));
    const range = hi - lo + 1;
    if (unique && n > range) {
      setError(`Can't pick ${n} unique numbers from only ${range} possible values.`);
      setResults([]);
      return;
    }
    setError("");
    let out: number[];
    if (unique) {
      const pool = Array.from({ length: range }, (_, i) => lo + i);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      out = pool.slice(0, n);
    } else {
      out = Array.from({ length: n }, () => lo + Math.floor(Math.random() * range));
    }
    if (sorted) out.sort((a, b) => a - b);
    setResults(out);
  }

  return (
    <div>
      <div className="row">
        <div className="field"><label>Minimum</label><input className="input" type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} /></div>
        <div className="field"><label>Maximum</label><input className="input" type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} /></div>
        <div className="field"><label>How many</label><input className="input" type="number" min={1} max={10000} value={count} onChange={(e) => setCount(Number(e.target.value))} /></div>
      </div>
      <div className="btn-row" style={{ marginBottom: 12, flexWrap: "wrap" }}>
        <label className="small"><input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} /> No duplicates</label>
        <label className="small"><input type="checkbox" checked={sorted} onChange={(e) => setSorted(e.target.checked)} /> Sort ascending</label>
      </div>
      <button className="btn btn-primary" type="button" onClick={generate}>Generate</button>
      {error && <p className="small" style={{ color: "#ff6b6b", marginTop: 10 }}>{error}</p>}
      {results.length > 0 && (
        <div className="field" style={{ marginTop: 12 }}>
          <label>Result{results.length > 1 ? `s (${results.length})` : ""}</label>
          <div className="tool-output" style={{ fontFamily: "monospace", fontSize: results.length === 1 ? "1.6rem" : "1rem", wordBreak: "break-word" }}>
            {results.join(", ")}
          </div>
          <CopyButton value={results.join(", ")} className="btn" />
        </div>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Numbers are drawn with the browser&apos;s pseudo-random generator — great for raffles,
        games and sampling, but not for cryptographic keys. Both ends are inclusive.
      </p>
    </div>
  );
}
