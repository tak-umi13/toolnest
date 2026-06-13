"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

export function TextCleaner() {
  const [text, setText] = useState("");
  const [opts, setOpts] = useState({
    trimLines: true,
    collapseSpaces: true,
    removeBlankLines: false,
    stripHtml: false,
    removeSpecial: false,
    smartToStraight: true,
    singleLine: false,
  });

  const set = (k: keyof typeof opts) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setOpts((p) => ({ ...p, [k]: e.target.checked }));

  const output = useMemo(() => {
    let s = text;
    if (opts.stripHtml) s = s.replace(/<[^>]*>/g, "");
    if (opts.smartToStraight) s = s.replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/[–—]/g, "-").replace(/…/g, "...");
    if (opts.removeSpecial) s = s.replace(/[^\p{L}\p{N}\s.,!?;:'"()\-]/gu, "");
    if (opts.collapseSpaces) s = s.replace(/[ \t]{2,}/g, " ");
    if (opts.trimLines) s = s.split("\n").map((l) => l.trim()).join("\n");
    if (opts.removeBlankLines) s = s.replace(/\n{2,}/g, "\n").replace(/^\n+|\n+$/g, "");
    if (opts.singleLine) s = s.replace(/\s*\n\s*/g, " ").replace(/\s{2,}/g, " ").trim();
    return s;
  }, [text, opts]);

  const checks: [keyof typeof opts, string][] = [
    ["trimLines", "Trim each line"],
    ["collapseSpaces", "Collapse multiple spaces"],
    ["removeBlankLines", "Remove blank lines"],
    ["smartToStraight", "Smart quotes/dashes → plain"],
    ["stripHtml", "Strip HTML tags"],
    ["removeSpecial", "Remove special characters"],
    ["singleLine", "Join into a single line"],
  ];

  return (
    <div>
      <div className="field">
        <label htmlFor="tcl">Text to clean</label>
        <textarea id="tcl" className="textarea" style={{ minHeight: 130 }} placeholder="Paste messy text — from PDFs, the web, or AI output…" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="field">
        <label>Cleanup options</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 6 }}>
          {checks.map(([k, label]) => (
            <label key={k} className="small"><input type="checkbox" checked={opts[k]} onChange={set(k)} /> {label}</label>
          ))}
        </div>
      </div>
      <div className="field">
        <label>Cleaned text</label>
        <div className="tool-output" style={{ whiteSpace: "pre-wrap" }}>{output || "Your cleaned text will appear here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
      <p className="muted small" style={{ marginTop: 10 }}>
        Tidy up text pasted from PDFs, web pages, emails or AI assistants — collapse spacing,
        strip HTML, normalise curly quotes and more. Toggle only what you need. Runs in your browser.
      </p>
    </div>
  );
}
