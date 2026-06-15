"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

export function RandomLetterGenerator() {
  const [count, setCount] = useState(1);
  const [caseMode, setCaseMode] = useState<"upper" | "lower" | "mixed">("upper");
  const [unique, setUnique] = useState(false);
  const [list, setList] = useState<string[]>([]);
  const [error, setError] = useState("");

  function letter() {
    const c = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    if (caseMode === "lower") return c.toLowerCase();
    if (caseMode === "mixed") return Math.random() < 0.5 ? c : c.toLowerCase();
    return c;
  }

  function generate() {
    const n = Math.max(1, Math.min(1000, count));
    if (unique && n > 26 && caseMode !== "mixed") {
      setError("Only 26 unique letters are available (turn off 'no repeats' or use mixed case).");
      setList([]);
      return;
    }
    setError("");
    if (unique && caseMode !== "mixed") {
      // Shuffle the alphabet (Fisher–Yates) and take the first n for no repeats.
      const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((c) => (caseMode === "lower" ? c.toLowerCase() : c));
      for (let i = base.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [base[i], base[j]] = [base[j], base[i]]; }
      setList(base.slice(0, n));
      return;
    }
    setList(Array.from({ length: n }, letter));
  }

  return (
    <div>
      <div className="row">
        <div className="field"><label>How many letters</label><input className="input" type="number" min={1} max={1000} value={count} onChange={(e) => setCount(Number(e.target.value))} /></div>
        <div className="field">
          <label>Case</label>
          <select className="select" value={caseMode} onChange={(e) => setCaseMode(e.target.value as "upper" | "lower" | "mixed")}>
            <option value="upper">UPPERCASE</option>
            <option value="lower">lowercase</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>
      </div>
      <label className="small" style={{ display: "block", marginBottom: 12 }}><input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} /> No repeats</label>
      <button type="button" className="btn btn-primary" onClick={generate}>Generate</button>
      {error && <p className="small" style={{ color: "#ff6b6b", marginTop: 10 }}>{error}</p>}
      {list.length > 0 && (
        <div className="field" style={{ marginTop: 12 }}>
          <label>Result</label>
          <div className="tool-output" style={{ fontSize: list.length <= 3 ? "2rem" : "1.1rem", fontFamily: "var(--mono)", letterSpacing: 2 }}>{list.join(" ")}</div>
          <CopyButton value={list.join(" ")} className="btn" />
        </div>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Generates random letters A–Z — for games, drawing prompts, naming and picking. Use &quot;no
        repeats&quot; for a unique set. Runs in your browser.
      </p>
    </div>
  );
}
