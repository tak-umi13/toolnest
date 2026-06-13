"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

export function QueryStringParser() {
  const [input, setInput] = useState("https://example.com/search?q=hello+world&page=2&sort=desc&tags=a&tags=b");

  const { rows, base, error } = useMemo(() => {
    if (!input.trim()) return { rows: [] as [string, string][], base: "", error: "" };
    try {
      let qs = input;
      let base = "";
      const qIdx = input.indexOf("?");
      if (qIdx !== -1) {
        base = input.slice(0, qIdx);
        qs = input.slice(qIdx + 1);
      }
      const hashIdx = qs.indexOf("#");
      if (hashIdx !== -1) qs = qs.slice(0, hashIdx);
      const params = new URLSearchParams(qs);
      const rows = [...params.entries()];
      return { rows, base, error: "" };
    } catch (e) {
      return { rows: [], base: "", error: (e as Error).message };
    }
  }, [input]);

  const json = useMemo(() => {
    const obj: Record<string, string | string[]> = {};
    for (const [k, v] of rows) {
      if (k in obj) {
        const cur = obj[k];
        obj[k] = Array.isArray(cur) ? [...cur, v] : [cur as string, v];
      } else obj[k] = v;
    }
    return JSON.stringify(obj, null, 2);
  }, [rows]);

  return (
    <div>
      <div className="field">
        <label htmlFor="qs">URL or query string</label>
        <textarea id="qs" className="textarea" style={{ fontFamily: "monospace", minHeight: 80 }} value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {error && <p className="small" style={{ color: "#ff6b6b" }}>{error}</p>}
      {base && <p className="muted small">Base: <span style={{ fontFamily: "monospace" }}>{base}</span></p>}
      <div className="field">
        <label>Parameters {rows.length > 0 && <span className="muted small">({rows.length})</span>}</label>
        <div className="tool-output" style={{ padding: 0 }}>
          {rows.length === 0 ? (
            <div style={{ padding: 12 }}>Paste a URL or query string to see its parameters decoded.</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ textAlign: "left" }}><th style={{ padding: "6px 12px" }}>Key</th><th style={{ padding: "6px 12px" }}>Value (decoded)</th></tr></thead>
              <tbody>
                {rows.map(([k, v], i) => (
                  <tr key={i} style={{ borderTop: "1px solid var(--border, #2a2f3a)" }}>
                    <td style={{ padding: "6px 12px", fontFamily: "monospace" }}>{k}</td>
                    <td style={{ padding: "6px 12px", fontFamily: "monospace" }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {rows.length > 0 && (
        <>
          <div className="field">
            <label>As JSON</label>
            <div className="tool-output" style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>{json}</div>
          </div>
          <CopyButton value={json} label="Copy JSON" className="btn btn-primary" />
        </>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Values are URL-decoded (so <code>+</code> and <code>%20</code> become spaces). Repeated
        keys are grouped into an array in the JSON output. Runs in your browser.
      </p>
    </div>
  );
}
