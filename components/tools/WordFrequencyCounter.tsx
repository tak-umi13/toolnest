"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

// Common English stop words — removing them surfaces the meaningful keywords,
// which is the SEO use case for this tool.
const STOPWORDS = new Set(
  "a an and are as at be by for from has he in is it its of on that the to was were will with i you your we they this but or not have do".split(" ")
);

export function WordFrequencyCounter() {
  const [text, setText] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(true);
  const [removeStop, setRemoveStop] = useState(false);
  const [minLen, setMinLen] = useState(1);

  const { rows, total } = useMemo(() => {
    const matches = text.match(/[\p{L}\p{N}'-]+/gu) || [];
    const counts = new Map<string, number>();
    for (const raw of matches) {
      const w = ignoreCase ? raw.toLowerCase() : raw;
      if (w.length < minLen) continue;
      if (removeStop && STOPWORDS.has(w.toLowerCase())) continue;
      counts.set(w, (counts.get(w) || 0) + 1);
    }
    const rows = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    const total = rows.reduce((s, [, n]) => s + n, 0);
    return { rows, total };
  }, [text, ignoreCase, removeStop, minLen]);

  const top = rows.slice(0, 100);
  const copyText = rows.map(([w, n]) => `${w}\t${n}`).join("\n");

  return (
    <div>
      <div className="field">
        <label htmlFor="wf">Your text</label>
        <textarea id="wf" className="textarea" placeholder="Paste an article, essay or any text…" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="btn-row" style={{ marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
        <label className="small"><input type="checkbox" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} /> Ignore case</label>
        <label className="small"><input type="checkbox" checked={removeStop} onChange={(e) => setRemoveStop(e.target.checked)} /> Remove common words</label>
        <label className="small">Min length{" "}
          <input type="number" min={1} max={20} value={minLen} onChange={(e) => setMinLen(Math.max(1, Number(e.target.value)))} style={{ width: 56 }} className="input" />
        </label>
      </div>
      {rows.length > 0 && (
        <p className="muted small" style={{ marginBottom: 8 }}>
          {rows.length} unique word{rows.length === 1 ? "" : "s"} · {total} counted
          {rows.length > 100 ? " (showing top 100)" : ""}
        </p>
      )}
      <div className="field">
        <div className="tool-output" style={{ maxHeight: 360, overflowY: "auto" }}>
          {top.length === 0 ? (
            "Word frequencies will appear here, most common first."
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left" }}>
                  <th style={{ padding: "4px 8px" }}>#</th>
                  <th style={{ padding: "4px 8px" }}>Word</th>
                  <th style={{ padding: "4px 8px" }}>Count</th>
                  <th style={{ padding: "4px 8px" }}>%</th>
                </tr>
              </thead>
              <tbody>
                {top.map(([w, n], i) => (
                  <tr key={w} style={{ borderTop: "1px solid var(--border, #2a2f3a)" }}>
                    <td className="muted" style={{ padding: "4px 8px" }}>{i + 1}</td>
                    <td style={{ padding: "4px 8px" }}>{w}</td>
                    <td style={{ padding: "4px 8px" }}>{n}</td>
                    <td className="muted" style={{ padding: "4px 8px" }}>{total ? ((n / total) * 100).toFixed(1) : "0"}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <CopyButton value={copyText} label="Copy as table (TSV)" className="btn btn-primary" />
    </div>
  );
}
