"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";
import { caesarShift } from "../../lib/cipher";

export function Rot13() {
  const [text, setText] = useState("");
  // ROT13 is its own inverse, so one transform handles both encode and decode.
  const output = useMemo(() => caesarShift(text, 13), [text]);

  return (
    <div>
      <div className="field">
        <label htmlFor="r13">Text</label>
        <textarea id="r13" className="textarea" placeholder="Type text to ROT13 encode or decode…" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="field">
        <label>ROT13 output</label>
        <div className="tool-output" style={{ fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{output || "Your ROT13 text will appear here."}</div>
      </div>
      <div className="btn-row">
        <CopyButton value={output} className="btn btn-primary" />
        <button type="button" className="btn" onClick={() => setText(output)} disabled={!output}>↻ Use output as input</button>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        ROT13 is a Caesar cipher with a fixed shift of 13. Because the alphabet has 26 letters,
        applying it twice returns the original text — so the same button both encodes and decodes.
        It&apos;s used to hide spoilers and puzzle answers, not for real security. Runs in your browser.
      </p>
    </div>
  );
}
