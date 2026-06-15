"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

type Mode = "pick" | "shuffle";

export function RandomListGenerator() {
  const [text, setText] = useState("Alice\nBob\nCharlie\nDana\nElla\nFinn");
  const [mode, setMode] = useState<Mode>("pick");
  const [pickN, setPickN] = useState(1);
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState("");

  function run() {
    const items = text.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    if (items.length === 0) { setError("Add some items, one per line."); setResult([]); return; }
    // Fisher–Yates shuffle.
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
    setError("");
    if (mode === "shuffle") setResult(shuffled);
    else setResult(shuffled.slice(0, Math.max(1, Math.min(items.length, pickN))));
  }

  return (
    <div>
      <div className="field">
        <label htmlFor="rl">Your list (one item per line)</label>
        <textarea id="rl" className="textarea" style={{ minHeight: 120 }} value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="row">
        <div className="field">
          <label>Action</label>
          <div className="btn-row">
            <button type="button" className={mode === "pick" ? "btn btn-primary" : "btn"} onClick={() => setMode("pick")}>Pick winners</button>
            <button type="button" className={mode === "shuffle" ? "btn btn-primary" : "btn"} onClick={() => setMode("shuffle")}>Shuffle all</button>
          </div>
        </div>
        {mode === "pick" && (
          <div className="field"><label>How many to pick</label><input className="input" type="number" min={1} value={pickN} onChange={(e) => setPickN(Number(e.target.value))} /></div>
        )}
      </div>
      <button type="button" className="btn btn-primary" onClick={run}>{mode === "pick" ? "Pick randomly" : "Shuffle"}</button>
      {error && <p className="small" style={{ color: "#ff6b6b", marginTop: 10 }}>{error}</p>}
      {result.length > 0 && (
        <div className="field" style={{ marginTop: 12 }}>
          <label>{mode === "pick" ? `Winner${result.length > 1 ? "s" : ""}` : "Shuffled order"}</label>
          <div className="tool-output" style={{ fontSize: mode === "pick" && result.length === 1 ? "1.4rem" : "1rem", fontWeight: mode === "pick" ? 700 : 400, whiteSpace: "pre-wrap" }}>{result.join("\n")}</div>
          <CopyButton value={result.join("\n")} className="btn" />
        </div>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Pick random winners from a list (raffles, giveaways, picking who goes first) or shuffle the
        whole list into a random order. Uses an unbiased Fisher–Yates shuffle. Runs in your browser.
      </p>
    </div>
  );
}
