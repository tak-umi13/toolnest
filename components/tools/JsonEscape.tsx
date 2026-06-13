"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

export function JsonEscape() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");

  const { output, error } = useMemo(() => {
    if (!text) return { output: "", error: "" };
    try {
      if (mode === "escape") {
        // JSON.stringify produces a quoted, escaped string; strip the outer quotes.
        const s = JSON.stringify(text);
        return { output: s.slice(1, -1), error: "" };
      }
      // Unescape: wrap in quotes and let JSON.parse decode the escapes.
      const parsed = JSON.parse(`"${text.replace(/"/g, '\\"')}"`);
      return { output: parsed as string, error: "" };
    } catch (e) {
      return { output: "", error: (e as Error).message };
    }
  }, [text, mode]);

  return (
    <div>
      <div className="field">
        <label>Mode</label>
        <div className="btn-row">
          <button type="button" className={mode === "escape" ? "btn btn-primary" : "btn"} onClick={() => setMode("escape")}>Escape</button>
          <button type="button" className={mode === "unescape" ? "btn btn-primary" : "btn"} onClick={() => setMode("unescape")}>Unescape</button>
        </div>
      </div>
      <div className="field">
        <label htmlFor="je">{mode === "escape" ? "Text to escape" : "Escaped string"}</label>
        <textarea id="je" className="textarea" style={{ fontFamily: "monospace" }} placeholder={mode === "escape" ? 'Line one\nLine "two"' : 'Line one\\nLine \\"two\\"'} value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      {error && <p className="small" style={{ color: "#ff6b6b" }}>Could not {mode}: {error}</p>}
      <div className="field">
        <label>Result</label>
        <div className="tool-output" style={{ fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{output || "Your result will appear here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
      <p className="muted small" style={{ marginTop: 10 }}>
        Escape turns text into a safe JSON string value (quotes, newlines and backslashes
        encoded); unescape reverses it. Useful for embedding text in JSON config or APIs.
      </p>
    </div>
  );
}
