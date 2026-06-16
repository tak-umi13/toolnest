"use client";

import { useMemo, useState } from "react";

// Practical limits Google typically shows before truncating with "…".
const TITLE_MAX = 60;
const DESC_MAX = 160;

const clip = (s: string, max: number) => (s.length > max ? s.slice(0, max).trimEnd() + "…" : s);

function counter(len: number, max: number) {
  const over = len > max;
  return { color: over ? "#dc2626" : len > max * 0.85 ? "#d97706" : "#16a34a", over };
}

export function SerpSimulator() {
  const [title, setTitle] = useState("Free Online Word Counter — Count Words & Characters");
  const [url, setUrl] = useState("https://toolnest.biz/text/word-counter");
  const [desc, setDesc] = useState("Count words, characters, sentences and reading time instantly in your browser. Free, no sign-up.");

  const display = useMemo(() => {
    let crumb = url;
    try {
      const u = new URL(url);
      crumb = u.hostname.replace(/^www\./, "") + (u.pathname === "/" ? "" : u.pathname.replace(/\//g, " › "));
    } catch { /* leave as typed */ }
    return { crumb, title: clip(title, TITLE_MAX), desc: clip(desc, DESC_MAX) };
  }, [title, url, desc]);

  const tc = counter(title.length, TITLE_MAX);
  const dc = counter(desc.length, DESC_MAX);

  return (
    <div>
      <div className="field">
        <label htmlFor="ss-t">Title tag <span className="small" style={{ color: tc.color }}>({title.length}/{TITLE_MAX}{tc.over ? " — will be truncated" : ""})</span></label>
        <input id="ss-t" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="ss-u">Page URL</label>
        <input id="ss-u" className="input" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="ss-d">Meta description <span className="small" style={{ color: dc.color }}>({desc.length}/{DESC_MAX}{dc.over ? " — will be truncated" : ""})</span></label>
        <textarea id="ss-d" className="textarea" style={{ minHeight: 70 }} value={desc} onChange={(e) => setDesc(e.target.value)} />
      </div>
      <div className="field">
        <label>Google preview</label>
        <div className="tool-output" style={{ background: "#fff", color: "#1a0dab", fontFamily: "arial, sans-serif" }}>
          <div style={{ color: "#202124", fontSize: 12, lineHeight: 1.3 }}>{display.crumb}</div>
          <div style={{ color: "#1a0dab", fontSize: 20, lineHeight: 1.3, margin: "2px 0", fontWeight: 400 }}>{display.title || "Your title here"}</div>
          <div style={{ color: "#4d5156", fontSize: 14, lineHeight: 1.45 }}>{display.desc || "Your meta description will appear here."}</div>
        </div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        A live preview of how your page may appear in Google results. Titles over ~{TITLE_MAX} characters
        and descriptions over ~{DESC_MAX} get cut off with an ellipsis — the counters warn you. Google may
        still rewrite titles/snippets, so treat this as a guide. Runs in your browser.
      </p>
    </div>
  );
}
