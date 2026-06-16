"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

type QA = { id: number; q: string; a: string };

export function FaqSchemaGenerator() {
  const [rows, setRows] = useState<QA[]>([
    { id: 1, q: "Is the tool free?", a: "Yes, it's completely free with no sign-up." },
    { id: 2, q: "Does it work on mobile?", a: "Yes, it runs in any modern browser on any device." },
  ]);

  const update = (id: number, k: "q" | "a", v: string) =>
    setRows((p) => p.map((r) => (r.id === id ? { ...r, [k]: v } : r)));
  const add = () => setRows((p) => [...p, { id: Math.max(0, ...p.map((r) => r.id)) + 1, q: "", a: "" }]);
  const remove = (id: number) => setRows((p) => (p.length > 1 ? p.filter((r) => r.id !== id) : p));

  const output = useMemo(() => {
    const valid = rows.filter((r) => r.q.trim() && r.a.trim());
    if (valid.length === 0) return "";
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: valid.map((r) => ({
        "@type": "Question",
        name: r.q.trim(),
        acceptedAnswer: { "@type": "Answer", text: r.a.trim() },
      })),
    };
    return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  }, [rows]);

  return (
    <div>
      <label className="small" style={{ fontWeight: 600 }}>Questions &amp; answers</label>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "8px 0 12px" }}>
        {rows.map((r, i) => (
          <div key={r.id} style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span className="small muted">Q{i + 1}</span>
              <button type="button" className="btn" style={{ padding: "4px 10px" }} onClick={() => remove(r.id)} aria-label="Remove">✕</button>
            </div>
            <input className="input" style={{ marginBottom: 6 }} value={r.q} onChange={(e) => update(r.id, "q", e.target.value)} placeholder="Question" />
            <textarea className="textarea" style={{ minHeight: 60 }} value={r.a} onChange={(e) => update(r.id, "a", e.target.value)} placeholder="Answer" />
          </div>
        ))}
      </div>
      <button type="button" className="btn" onClick={add}>+ Add question</button>
      <div className="field" style={{ marginTop: 14 }}>
        <label>FAQ schema (JSON-LD)</label>
        <div className="tool-output" style={{ fontFamily: "var(--mono)", whiteSpace: "pre-wrap" }}>{output || "Add at least one complete question and answer."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
      <p className="muted small" style={{ marginTop: 10 }}>
        Generates valid FAQPage structured data (JSON-LD). Paste it into the
        <code>&lt;head&gt;</code> (or body) of the page whose visible content matches these Q&amp;As —
        Google requires the FAQ to be visible on the page. It can earn rich results in search. Runs in your browser.
      </p>
    </div>
  );
}
