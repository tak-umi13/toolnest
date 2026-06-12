"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

export function RemoveDuplicateLines() {
  const [text, setText] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [trim, setTrim] = useState(true);

  const { output, removed } = useMemo(() => {
    const lines = text.split(/\r?\n/);
    const seen = new Set<string>();
    const kept: string[] = [];
    for (const raw of lines) {
      const line = trim ? raw.trim() : raw;
      const key = ignoreCase ? line.toLowerCase() : line;
      if (seen.has(key)) continue;
      seen.add(key);
      kept.push(line);
    }
    return { output: kept.join("\n"), removed: lines.length - kept.length };
  }, [text, ignoreCase, trim]);

  return (
    <div>
      <div className="field">
        <label htmlFor="rd">Paste your list (one item per line)</label>
        <textarea
          id="rd"
          className="textarea"
          placeholder={"apple\nbanana\napple\ncherry"}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <label className="small"><input type="checkbox" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} /> Ignore case</label>
        <label className="small"><input type="checkbox" checked={trim} onChange={(e) => setTrim(e.target.checked)} /> Trim whitespace</label>
      </div>
      <div className="field">
        <label>Result {text && <span className="muted small">({removed} duplicate{removed === 1 ? "" : "s"} removed)</span>}</label>
        <div className="tool-output">{output || "Your deduplicated list will appear here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
    </div>
  );
}
