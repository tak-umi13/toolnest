"use client";

import { useMemo, useState } from "react";

interface MatchRow {
  text: string;
  index: number;
  groups: string[];
}

export function RegexTester() {
  const [pattern, setPattern] = useState("\\d+");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Order 42 shipped on day 7, invoice #1042.");

  const result = useMemo<
    { ok: true; matches: MatchRow[] } | { ok: false; error: string } | null
  >(() => {
    if (!pattern) return null;
    let re: RegExp;
    try {
      re = new RegExp(pattern, flags);
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "Invalid pattern" };
    }
    if (!text) return { ok: true, matches: [] };
    try {
      const raw = flags.includes("g")
        ? [...text.matchAll(re)].slice(0, 100)
        : (() => {
            const m = text.match(re);
            return m ? [m] : [];
          })();
      const matches: MatchRow[] = raw.map((m) => ({
        text: m[0],
        index: m.index ?? 0,
        groups: m.slice(1).map((g) => g ?? ""),
      }));
      return { ok: true, matches };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "Match failed" };
    }
  }, [pattern, flags, text]);

  return (
    <div>
      <div className="row" style={{ gridTemplateColumns: "1fr 120px" }}>
        <div className="field"><label htmlFor="rx">Pattern</label><input id="rx" className="input" style={{ fontFamily: "var(--mono)" }} value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="e.g. [a-z]+\d*" /></div>
        <div className="field"><label htmlFor="rxf">Flags</label><input id="rxf" className="input" style={{ fontFamily: "var(--mono)" }} value={flags} onChange={(e) => setFlags(e.target.value.replace(/[^gimsuy]/g, ""))} placeholder="gim" /></div>
      </div>
      <div className="field">
        <label htmlFor="rxt">Test text</label>
        <textarea id="rxt" className="textarea" style={{ minHeight: 110 }} value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      {result && !result.ok && <p className="error-text">⚠ {result.error}</p>}
      {result && result.ok && (
        <div className="panel">
          <h4>{result.matches.length} match{result.matches.length === 1 ? "" : "es"}{result.matches.length === 100 ? " (first 100 shown)" : ""}</h4>
          {result.matches.length > 0 && (
            <ul className="related-list">
              {result.matches.map((m, i) => (
                <li key={i} style={{ fontFamily: "var(--mono)", fontSize: "0.88rem" }}>
                  <span className="muted">[{m.index}]</span> {m.text}
                  {m.groups.length > 0 && <span className="muted small"> — groups: {m.groups.join(", ")}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <p className="muted small" style={{ marginTop: 12 }}>
        Uses JavaScript regex syntax (the flavor used in browsers and Node.js). Everything runs locally.
      </p>
    </div>
  );
}
