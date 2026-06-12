"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

export function TextRepeater() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(10);
  const [sep, setSep] = useState<"newline" | "space" | "none">("newline");

  const output = useMemo(() => {
    const n = Math.min(Math.max(count, 1), 10000);
    if (!text) return "";
    const joiner = sep === "newline" ? "\n" : sep === "space" ? " " : "";
    return Array.from({ length: n }, () => text).join(joiner);
  }, [text, count, sep]);

  return (
    <div>
      <div className="field">
        <label htmlFor="tr">Text to repeat</label>
        <input id="tr" className="input" placeholder="e.g. hello" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="row">
        <div className="field"><label>Times</label><input className="input" type="number" min={1} max={10000} value={count} onChange={(e) => setCount(Number(e.target.value))} /></div>
        <div className="field"><label>Separator</label>
          <select className="select" value={sep} onChange={(e) => setSep(e.target.value as typeof sep)}>
            <option value="newline">New line</option>
            <option value="space">Space</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label>Result</label>
        <div className="tool-output">{output || "Repeated text appears here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
    </div>
  );
}
