"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

const ALGOS = ["SHA-256", "SHA-1", "SHA-384", "SHA-512"] as const;

export function HashGenerator() {
  const [text, setText] = useState("");
  const [algo, setAlgo] = useState<(typeof ALGOS)[number]>("SHA-256");
  const [hash, setHash] = useState("");
  const [busy, setBusy] = useState(false);

  async function compute() {
    if (!text) {
      setHash("");
      return;
    }
    setBusy(true);
    const data = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest(algo, data);
    const hex = Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
    setHash(hex);
    setBusy(false);
  }

  return (
    <div>
      <div className="field">
        <label htmlFor="hash">Text to hash</label>
        <textarea id="hash" className="textarea" placeholder="Type or paste text…" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <select className="select" style={{ width: "auto" }} value={algo} onChange={(e) => setAlgo(e.target.value as typeof algo)}>
          {ALGOS.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <button className="btn btn-primary" type="button" onClick={compute} disabled={busy}>{busy ? "Hashing…" : "Generate hash"}</button>
      </div>
      <div className="field">
        <label>{algo} hash (hex)</label>
        <div className="tool-output">{hash || "The hash appears here."}</div>
      </div>
      <CopyButton value={hash} className="btn btn-primary" />
    </div>
  );
}
