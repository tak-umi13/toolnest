"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

type Mode = "az" | "za" | "num-asc" | "num-desc" | "len-asc" | "len-desc" | "reverse" | "shuffle";

const MODES: { id: Mode; label: string }[] = [
  { id: "az", label: "A → Z" },
  { id: "za", label: "Z → A" },
  { id: "num-asc", label: "Number ↑" },
  { id: "num-desc", label: "Number ↓" },
  { id: "len-asc", label: "Length ↑" },
  { id: "len-desc", label: "Length ↓" },
  { id: "reverse", label: "Reverse" },
  { id: "shuffle", label: "Shuffle" },
];

const numOf = (s: string) => parseFloat(s.replace(/[^0-9.+-]/g, ""));

export function SortTextLines() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<Mode>("az");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [removeDupes, setRemoveDupes] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [seed, setSeed] = useState(0); // bump to re-shuffle

  const output = useMemo(() => {
    let lines = text.split(/\r?\n/);
    if (removeEmpty) lines = lines.filter((l) => l.trim() !== "");
    if (removeDupes) {
      const seen = new Set<string>();
      lines = lines.filter((l) => {
        const k = caseSensitive ? l : l.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
    }
    const cmp = (a: string, b: string) => {
      const x = caseSensitive ? a : a.toLowerCase();
      const y = caseSensitive ? b : b.toLowerCase();
      return x.localeCompare(y);
    };
    switch (mode) {
      case "az": lines.sort(cmp); break;
      case "za": lines.sort((a, b) => cmp(b, a)); break;
      case "num-asc": lines.sort((a, b) => (numOf(a) || 0) - (numOf(b) || 0)); break;
      case "num-desc": lines.sort((a, b) => (numOf(b) || 0) - (numOf(a) || 0)); break;
      case "len-asc": lines.sort((a, b) => a.length - b.length); break;
      case "len-desc": lines.sort((a, b) => b.length - a.length); break;
      case "reverse": lines.reverse(); break;
      case "shuffle":
        for (let i = lines.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [lines[i], lines[j]] = [lines[j], lines[i]];
        }
        break;
    }
    return lines.join("\n");
    // seed is intentionally a dependency so "Shuffle" re-rolls on click
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, mode, caseSensitive, removeDupes, removeEmpty, seed]);

  return (
    <div>
      <div className="field">
        <label htmlFor="sl">Lines to sort</label>
        <textarea id="sl" className="textarea" placeholder={"banana\napple\ncherry"} value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="field">
        <label>Sort order</label>
        <div className="btn-row" style={{ flexWrap: "wrap" }}>
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              className={m.id === mode ? "btn btn-primary" : "btn"}
              onClick={() => {
                setMode(m.id);
                if (m.id === "shuffle") setSeed((s) => s + 1);
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <div className="btn-row" style={{ marginBottom: 12, flexWrap: "wrap" }}>
        <label className="small"><input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} /> Case sensitive</label>
        <label className="small"><input type="checkbox" checked={removeDupes} onChange={(e) => setRemoveDupes(e.target.checked)} /> Remove duplicates</label>
        <label className="small"><input type="checkbox" checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)} /> Remove empty lines</label>
      </div>
      <div className="field">
        <label>Result</label>
        <div className="tool-output" style={{ whiteSpace: "pre-wrap" }}>{output || "Your sorted lines will appear here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
    </div>
  );
}
