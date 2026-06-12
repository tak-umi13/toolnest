"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

type Mode = "chars" | "words" | "lines";

function reverse(text: string, mode: Mode): string {
  if (mode === "chars") return [...text].reverse().join("");
  if (mode === "words") return text.split(/(\s+)/).reverse().join("");
  return text.split(/\r?\n/).reverse().join("\n");
}

export function ReverseText() {
  const [text, setText] = useState("");
  const [out, setOut] = useState("");

  return (
    <div>
      <div className="field">
        <label htmlFor="rt">Text</label>
        <textarea id="rt" className="textarea" placeholder="Type or paste text to reverse…" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button className="btn" type="button" onClick={() => setOut(reverse(text, "chars"))}>Reverse characters</button>
        <button className="btn" type="button" onClick={() => setOut(reverse(text, "words"))}>Reverse words</button>
        <button className="btn" type="button" onClick={() => setOut(reverse(text, "lines"))}>Reverse lines</button>
      </div>
      <div className="field">
        <label>Result</label>
        <div className="tool-output">{out || "Reversed text appears here."}</div>
      </div>
      <CopyButton value={out} className="btn btn-primary" />
    </div>
  );
}
