"use client";

import { useMemo, useState } from "react";

// Platform character limits people most often check against. Showing live
// "remaining" counts is the depth differentiator over a plain char counter.
const LIMITS = [
  { label: "Tweet / X post", limit: 280 },
  { label: "SMS (single)", limit: 160 },
  { label: "Meta title (SEO)", limit: 60 },
  { label: "Meta description (SEO)", limit: 160 },
  { label: "Instagram caption", limit: 2200 },
  { label: "Facebook post (ideal)", limit: 477 },
  { label: "LinkedIn headline", limit: 220 },
  { label: "YouTube title", limit: 100 },
] as const;

export function CharacterCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const lines = text ? text.split(/\r?\n/).length : 0;
    return { chars, charsNoSpaces, words, lines };
  }, [text]);

  return (
    <div>
      <div className="field">
        <label htmlFor="cc">Your text</label>
        <textarea
          id="cc"
          className="textarea"
          placeholder="Type or paste your text here…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{stats.chars}</div><div className="lbl">Characters</div></div>
        <div className="stat"><div className="num">{stats.charsNoSpaces}</div><div className="lbl">No spaces</div></div>
        <div className="stat"><div className="num">{stats.words}</div><div className="lbl">Words</div></div>
        <div className="stat"><div className="num">{stats.lines}</div><div className="lbl">Lines</div></div>
      </div>
      <div className="field" style={{ marginTop: 16 }}>
        <label>Platform limits</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {LIMITS.map((p) => {
            const remaining = p.limit - stats.chars;
            const over = remaining < 0;
            return (
              <div key={p.label} className="small" style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border, #2a2f3a)", padding: "4px 0" }}>
                <span>{p.label} <span className="muted">({p.limit})</span></span>
                <span style={{ color: over ? "#ff6b6b" : "#5bd17a", fontWeight: 600 }}>
                  {over ? `${-remaining} over` : `${remaining} left`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Counts update live and everything runs in your browser. Limits are the
        practical maximums each platform displays before truncating.
      </p>
    </div>
  );
}
