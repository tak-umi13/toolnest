"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function FindAndReplace() {
  const [text, setText] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [caseInsensitive, setCaseInsensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);

  const { output, count, error } = useMemo(() => {
    if (!find) return { output: text, count: 0, error: "" };
    try {
      let pattern = useRegex ? find : escapeRegExp(find);
      if (wholeWord) pattern = `\\b(?:${pattern})\\b`;
      const flags = "g" + (caseInsensitive ? "i" : "");
      const re = new RegExp(pattern, flags);
      const count = (text.match(re) || []).length;
      return { output: text.replace(re, replace), count, error: "" };
    } catch (e) {
      return { output: text, count: 0, error: (e as Error).message };
    }
  }, [text, find, replace, caseInsensitive, useRegex, wholeWord]);

  return (
    <div>
      <div className="field">
        <label htmlFor="fr">Text</label>
        <textarea id="fr" className="textarea" placeholder="Paste your text here…" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="row">
        <div className="field">
          <label htmlFor="ff">Find</label>
          <input id="ff" className="input" value={find} onChange={(e) => setFind(e.target.value)} placeholder={useRegex ? "regex pattern" : "text to find"} />
        </div>
        <div className="field">
          <label htmlFor="fp">Replace with</label>
          <input id="fp" className="input" value={replace} onChange={(e) => setReplace(e.target.value)} placeholder="replacement" />
        </div>
      </div>
      <div className="btn-row" style={{ marginBottom: 12, flexWrap: "wrap" }}>
        <label className="small"><input type="checkbox" checked={caseInsensitive} onChange={(e) => setCaseInsensitive(e.target.checked)} /> Ignore case</label>
        <label className="small"><input type="checkbox" checked={wholeWord} onChange={(e) => setWholeWord(e.target.checked)} disabled={useRegex} /> Whole word</label>
        <label className="small"><input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} /> Regex</label>
      </div>
      {error && <p className="small" style={{ color: "#ff6b6b" }}>Invalid regex: {error}</p>}
      <div className="field">
        <label>Result {find && !error && <span className="muted small">({count} match{count === 1 ? "" : "es"} replaced)</span>}</label>
        <div className="tool-output" style={{ whiteSpace: "pre-wrap" }}>{output || "Your result will appear here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
      <p className="muted small" style={{ marginTop: 10 }}>
        Enable <strong>Regex</strong> to use patterns like <code>\d+</code> or capture
        groups (<code>$1</code>) in the replacement. Everything runs locally in your browser.
      </p>
    </div>
  );
}
