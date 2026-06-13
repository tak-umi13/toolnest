"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

type By = "chars" | "words";

// Split text into chunks under a size limit, preferring to break on whitespace
// so words aren't cut in half. Aimed at pasting long text into LLMs with a
// context/character limit.
function splitText(text: string, size: number, by: By): string[] {
  if (!text || size < 1) return [];
  const chunks: string[] = [];
  if (by === "words") {
    const words = text.split(/(\s+)/); // keep separators
    let cur = "";
    let count = 0;
    for (const w of words) {
      const isWord = /\S/.test(w);
      if (isWord && count >= size) { chunks.push(cur.trim()); cur = ""; count = 0; }
      cur += w;
      if (isWord) count++;
    }
    if (cur.trim()) chunks.push(cur.trim());
    return chunks;
  }
  // chars: break on the last whitespace before the limit when possible.
  let i = 0;
  while (i < text.length) {
    let end = Math.min(i + size, text.length);
    if (end < text.length) {
      const slice = text.slice(i, end);
      const lastWs = slice.lastIndexOf(" ");
      const lastNl = slice.lastIndexOf("\n");
      const brk = Math.max(lastWs, lastNl);
      if (brk > size * 0.5) end = i + brk + 1;
    }
    chunks.push(text.slice(i, end).trim());
    i = end;
  }
  return chunks.filter(Boolean);
}

export function TextSplitter() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(2000);
  const [by, setBy] = useState<By>("chars");

  const chunks = useMemo(() => splitText(text, size, by), [text, size, by]);

  return (
    <div>
      <div className="field">
        <label htmlFor="ts">Long text</label>
        <textarea id="ts" className="textarea" style={{ minHeight: 140 }} placeholder="Paste a long document to split into chunks…" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="row">
        <div className="field">
          <label>Split by</label>
          <div className="btn-row">
            <button type="button" className={by === "chars" ? "btn btn-primary" : "btn"} onClick={() => setBy("chars")}>Characters</button>
            <button type="button" className={by === "words" ? "btn btn-primary" : "btn"} onClick={() => setBy("words")}>Words</button>
          </div>
        </div>
        <div className="field">
          <label htmlFor="tss">Max {by} per chunk</label>
          <input id="tss" className="input" type="number" min={1} value={size} onChange={(e) => setSize(Number(e.target.value))} />
        </div>
      </div>
      {chunks.length > 0 && (
        <p className="muted small" style={{ marginBottom: 8 }}>{chunks.length} chunk{chunks.length === 1 ? "" : "s"}</p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {chunks.map((c, i) => (
          <div key={i} className="field" style={{ margin: 0 }}>
            <label>Chunk {i + 1} <span className="muted small">({c.length} chars)</span></label>
            <div className="tool-output" style={{ whiteSpace: "pre-wrap", maxHeight: 160, overflowY: "auto" }}>{c}</div>
            <CopyButton value={c} label={`Copy chunk ${i + 1}`} className="btn" />
          </div>
        ))}
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Splits long text into smaller pieces that fit a chatbot or API context limit, breaking
        on spaces so words stay whole. Paste each chunk in order. Runs in your browser.
      </p>
    </div>
  );
}
