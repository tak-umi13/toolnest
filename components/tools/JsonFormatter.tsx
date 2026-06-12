"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  function run(minify: boolean) {
    setError("");
    if (!input.trim()) {
      setOutput("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, minify ? 0 : indent));
    } catch (e) {
      setOutput("");
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }

  return (
    <div>
      <div className="field">
        <label htmlFor="jf">JSON input</label>
        <textarea
          id="jf"
          className="textarea"
          placeholder='{"name":"ToolNest","tools":12}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button className="btn btn-primary" type="button" onClick={() => run(false)}>Beautify</button>
        <button className="btn" type="button" onClick={() => run(true)}>Minify</button>
        <select className="select" style={{ width: "auto" }} value={indent} onChange={(e) => setIndent(Number(e.target.value))} aria-label="Indent size">
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
        </select>
      </div>
      {error && <p className="error-text">⚠ {error}</p>}
      <div className="field">
        <label>Output</label>
        <div className="tool-output">{output || "Formatted JSON will appear here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
    </div>
  );
}
