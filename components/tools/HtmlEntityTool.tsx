"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

const MAP: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

function encode(s: string): string {
  return s.replace(/[&<>"']/g, (c) => MAP[c]);
}

// DOMParser handles every named and numeric entity correctly, so decoding
// doesn't need a giant lookup table.
function decode(s: string): string {
  return new DOMParser().parseFromString(s, "text/html").documentElement.textContent ?? "";
}

export function HtmlEntityTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div>
      <div className="field">
        <label htmlFor="he">Text or HTML entities</label>
        <textarea id="he" className="textarea" placeholder={'e.g. <a href="x">Tom & Jerry</a>  or  &lt;b&gt;hi&lt;/b&gt;'} value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button className="btn btn-primary" type="button" onClick={() => setOutput(encode(input))}>Encode →</button>
        <button className="btn" type="button" onClick={() => setOutput(decode(input))}>← Decode</button>
      </div>
      <div className="field">
        <label>Result</label>
        <div className="tool-output">{output || "Result appears here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
    </div>
  );
}
