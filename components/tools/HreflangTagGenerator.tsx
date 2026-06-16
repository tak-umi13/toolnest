"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

type Row = { id: number; lang: string; url: string };

export function HreflangTagGenerator() {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, lang: "en", url: "https://example.com/" },
    { id: 2, lang: "en-gb", url: "https://example.com/gb/" },
    { id: 3, lang: "fr", url: "https://example.com/fr/" },
  ]);
  const [xDefault, setXDefault] = useState("https://example.com/");

  const update = (id: number, k: "lang" | "url", v: string) =>
    setRows((p) => p.map((r) => (r.id === id ? { ...r, [k]: v } : r)));
  const add = () => setRows((p) => [...p, { id: Math.max(0, ...p.map((r) => r.id)) + 1, lang: "", url: "" }]);
  const remove = (id: number) => setRows((p) => (p.length > 1 ? p.filter((r) => r.id !== id) : p));

  const output = useMemo(() => {
    const lines = rows
      .filter((r) => r.lang.trim() && r.url.trim())
      .map((r) => `<link rel="alternate" hreflang="${r.lang.trim().toLowerCase()}" href="${r.url.trim()}" />`);
    if (xDefault.trim()) lines.push(`<link rel="alternate" hreflang="x-default" href="${xDefault.trim()}" />`);
    return lines.join("\n");
  }, [rows, xDefault]);

  return (
    <div>
      <label className="small" style={{ fontWeight: 600 }}>Language/region versions</label>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "8px 0 12px" }}>
        {rows.map((r) => (
          <div key={r.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input className="input" style={{ width: 110 }} value={r.lang} onChange={(e) => update(r.id, "lang", e.target.value)} placeholder="en-gb" aria-label="hreflang code" />
            <input className="input" value={r.url} onChange={(e) => update(r.id, "url", e.target.value)} placeholder="https://example.com/gb/" aria-label="URL" />
            <button type="button" className="btn" style={{ padding: "8px 12px" }} onClick={() => remove(r.id)} aria-label="Remove">✕</button>
          </div>
        ))}
      </div>
      <button type="button" className="btn" onClick={add}>+ Add version</button>
      <div className="field" style={{ maxWidth: 380, marginTop: 14 }}>
        <label htmlFor="hx">x-default URL <span className="muted small">(fallback, optional)</span></label>
        <input id="hx" className="input" value={xDefault} onChange={(e) => setXDefault(e.target.value)} />
      </div>
      <div className="field">
        <label>hreflang tags</label>
        <div className="tool-output" style={{ fontFamily: "var(--mono)", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{output || "Add at least one language version."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
      <p className="muted small" style={{ marginTop: 10 }}>
        hreflang tells Google which language/region version of a page to show each user. Put
        these in the <code>&lt;head&gt;</code> of <strong>every</strong> version, and make sure each
        version links to all the others (including itself). Codes are ISO language (en) optionally
        with a region (en-gb). Runs in your browser.
      </p>
    </div>
  );
}
