"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

// Minor words stay lowercase in title case — unless they're the first or last
// word. This is what separates real title case from "capitalize every word".
const MINOR = new Set(
  "a an and as at but by for from in into nor of on onto or per so the to up via vs with yet".split(" ")
);

function toTitleCase(input: string): string {
  return input.split(/(\n)/).map((segment) => {
    if (segment === "\n") return segment;
    const words = segment.split(/(\s+)/); // keep whitespace tokens
    const wordIdx = words.map((w) => /\S/.test(w));
    const lastWord = wordIdx.lastIndexOf(true);
    const firstWord = wordIdx.indexOf(true);
    return words
      .map((w, i) => {
        if (!/\S/.test(w)) return w;
        const lower = w.toLowerCase();
        const isMinor = MINOR.has(lower);
        const cap = lower.charAt(0).toUpperCase() + lower.slice(1);
        if (i === firstWord || i === lastWord) return cap;
        return isMinor ? lower : cap;
      })
      .join("");
  }).join("");
}

type Mode = "title" | "sentence" | "upper" | "lower";

export function TitleCaseConverter() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<Mode>("title");

  const output = useMemo(() => {
    switch (mode) {
      case "title": return toTitleCase(text);
      case "upper": return text.toUpperCase();
      case "lower": return text.toLowerCase();
      case "sentence":
        return text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
    }
  }, [text, mode]);

  const MODES: { id: Mode; label: string }[] = [
    { id: "title", label: "Title Case" },
    { id: "sentence", label: "Sentence case" },
    { id: "upper", label: "UPPERCASE" },
    { id: "lower", label: "lowercase" },
  ];

  return (
    <div>
      <div className="field">
        <label htmlFor="tc">Your text</label>
        <textarea id="tc" className="textarea" placeholder="the lord of the rings: return of the king" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="field">
        <label>Style</label>
        <div className="btn-row" style={{ flexWrap: "wrap" }}>
          {MODES.map((m) => (
            <button key={m.id} type="button" className={m.id === mode ? "btn btn-primary" : "btn"} onClick={() => setMode(m.id)}>{m.label}</button>
          ))}
        </div>
      </div>
      <div className="field">
        <label>Result</label>
        <div className="tool-output" style={{ whiteSpace: "pre-wrap" }}>{output || "Your converted text will appear here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
      <p className="muted small" style={{ marginTop: 10 }}>
        Title Case follows standard style rules: small words like <em>a, the, of, and, to</em>
        stay lowercase unless they&apos;re the first or last word of the line.
      </p>
    </div>
  );
}
