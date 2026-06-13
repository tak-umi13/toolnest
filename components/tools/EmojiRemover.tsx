"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

export function EmojiRemover() {
  const [text, setText] = useState("");
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [removeSymbols, setRemoveSymbols] = useState(false);

  const { output, removed } = useMemo(() => {
    let out = text;
    // Pictographic emoji, variation selectors and zero-width joiners.
    const emojiRe = /(\p{Extended_Pictographic}|️|‍|[\u{1F1E6}-\u{1F1FF}])/gu;
    const before = [...text].length;
    out = out.replace(emojiRe, "");
    if (removeSymbols) out = out.replace(/[←-⇿⌀-➿⬀-⯿]/g, "");
    if (collapseSpaces) out = out.replace(/[ \t]{2,}/g, " ").replace(/ +$/gm, "").trim();
    const after = [...out.replace(/\s/g, "")].length;
    const beforeNoSpace = [...text.replace(/\s/g, "")].length;
    return { output: out, removed: Math.max(0, beforeNoSpace - after) || (before > [...out].length ? before - [...out].length : 0) };
  }, [text, collapseSpaces, removeSymbols]);

  return (
    <div>
      <div className="field">
        <label htmlFor="er">Text</label>
        <textarea id="er" className="textarea" placeholder="Paste text with emoji (e.g. AI-generated content)…" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="btn-row" style={{ marginBottom: 12, flexWrap: "wrap" }}>
        <label className="small"><input type="checkbox" checked={collapseSpaces} onChange={(e) => setCollapseSpaces(e.target.checked)} /> Tidy up leftover spaces</label>
        <label className="small"><input type="checkbox" checked={removeSymbols} onChange={(e) => setRemoveSymbols(e.target.checked)} /> Also remove arrows &amp; misc symbols</label>
      </div>
      <div className="field">
        <label>Cleaned text {text && <span className="muted small">({removed} emoji/symbol{removed === 1 ? "" : "s"} removed)</span>}</label>
        <div className="tool-output" style={{ whiteSpace: "pre-wrap" }}>{output || "Your cleaned text will appear here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
      <p className="muted small" style={{ marginTop: 10 }}>
        Strips emoji, flags and zero-width joiners — handy for cleaning AI-generated copy,
        usernames, file names and data before processing. Runs entirely in your browser.
      </p>
    </div>
  );
}
