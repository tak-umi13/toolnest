"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

export function UrlEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handle(mode: "encode" | "decode") {
    setError("");
    if (!input.trim()) {
      setOutput("");
      return;
    }
    try {
      setOutput(mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input));
    } catch {
      setOutput("");
      setError("That isn't valid URL-encoded text (check for stray % signs).");
    }
  }

  return (
    <div>
      <div className="field">
        <label htmlFor="url">Text or URL-encoded string</label>
        <textarea id="url" className="textarea" placeholder="https://example.com/?q=hello world&x=a/b" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button className="btn btn-primary" type="button" onClick={() => handle("encode")}>Encode →</button>
        <button className="btn" type="button" onClick={() => handle("decode")}>← Decode</button>
      </div>
      {error && <p className="error-text">⚠ {error}</p>}
      <div className="field">
        <label>Result</label>
        <div className="tool-output">{output || "Result appears here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
    </div>
  );
}
