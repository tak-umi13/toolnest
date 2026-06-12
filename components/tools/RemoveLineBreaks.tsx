"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

export function RemoveLineBreaks() {
  const [text, setText] = useState("");
  const [replaceWithSpace, setReplaceWithSpace] = useState(true);
  const [collapseSpaces, setCollapseSpaces] = useState(true);

  const output = useMemo(() => {
    let out = text.replace(/\r?\n/g, replaceWithSpace ? " " : "");
    if (collapseSpaces) out = out.replace(/[ \t]{2,}/g, " ").trim();
    return out;
  }, [text, replaceWithSpace, collapseSpaces]);

  return (
    <div>
      <div className="field">
        <label htmlFor="rlb">Text with line breaks</label>
        <textarea id="rlb" className="textarea" placeholder={"Paste text that has\nunwanted line\nbreaks…"} value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <label className="small"><input type="checkbox" checked={replaceWithSpace} onChange={(e) => setReplaceWithSpace(e.target.checked)} /> Replace breaks with a space</label>
        <label className="small"><input type="checkbox" checked={collapseSpaces} onChange={(e) => setCollapseSpaces(e.target.checked)} /> Collapse extra spaces</label>
      </div>
      <div className="field">
        <label>Result</label>
        <div className="tool-output">{output || "Cleaned text appears here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
    </div>
  );
}
