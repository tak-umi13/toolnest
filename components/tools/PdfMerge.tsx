"use client";

import { useRef, useState } from "react";

// Client-side PDF merge: pdf-lib is dynamically imported so its weight is only
// paid when the user actually merges. Files never leave the browser — that's
// the differentiator over upload-based merge sites.
export function PdfMerge() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const pdfs = [...list].filter((f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"));
    setFiles((prev) => [...prev, ...pdfs]);
    setError("");
    if (inputRef.current) inputRef.current.value = ""; // allow re-adding same file
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= files.length) return;
    const next = [...files];
    [next[i], next[j]] = [next[j], next[i]];
    setFiles(next);
  }

  async function merge() {
    setBusy(true);
    setError("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const out = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        let doc;
        try {
          doc = await PDFDocument.load(bytes);
        } catch {
          throw new Error(`Couldn't read "${file.name}" — it may be password-protected or corrupted.`);
        }
        const pages = await out.copyPages(doc, doc.getPageIndices());
        for (const p of pages) out.addPage(p);
      }
      const merged = await out.save();
      const url = URL.createObjectURL(new Blob([merged.buffer as ArrayBuffer], { type: "application/pdf" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Merge failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="field">
        <label htmlFor="pdfm">Add PDF files (in the order you want them merged)</label>
        <input ref={inputRef} id="pdfm" className="input" type="file" accept="application/pdf,.pdf" multiple onChange={(e) => addFiles(e.target.files)} style={{ paddingTop: 9 }} />
      </div>
      {files.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px" }}>
          {files.map((f, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", border: "1px solid var(--border)", borderRadius: 8, marginBottom: 6 }}>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {i + 1}. {f.name} <span className="muted small">({(f.size / 1024 / 1024).toFixed(2)} MB)</span>
              </span>
              <button type="button" className="btn" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
              <button type="button" className="btn" onClick={() => move(i, 1)} disabled={i === files.length - 1} aria-label="Move down">↓</button>
              <button type="button" className="btn" onClick={() => setFiles(files.filter((_, j) => j !== i))} aria-label="Remove">✕</button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="error-text">⚠ {error}</p>}
      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={merge} disabled={files.length < 2 || busy}>
          {busy ? "Merging…" : `Merge ${files.length || ""} PDFs & download`}
        </button>
        {files.length > 0 && (
          <button type="button" className="btn" onClick={() => setFiles([])} disabled={busy}>Clear all</button>
        )}
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Merging happens entirely in your browser — your PDFs are never uploaded
        to any server. Password-protected PDFs can&apos;t be merged.
      </p>
    </div>
  );
}
