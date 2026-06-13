"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

// Encode via UTF-8 bytes so emoji and accented characters round-trip correctly.
function textToBinary(text: string): string {
  const bytes = new TextEncoder().encode(text);
  return Array.from(bytes, (b) => b.toString(2).padStart(8, "0")).join(" ");
}

function binaryToText(bin: string): { text: string; error: string } {
  const tokens = bin.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return { text: "", error: "" };
  if (!tokens.every((t) => /^[01]{8}$/.test(t))) return { text: "", error: "Use 8-bit groups of 0s and 1s separated by spaces." };
  const bytes = Uint8Array.from(tokens, (t) => parseInt(t, 2));
  try {
    return { text: new TextDecoder().decode(bytes), error: "" };
  } catch {
    return { text: "", error: "Those bytes aren't valid UTF-8 text." };
  }
}

export function TextToBinary() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("Hi!");

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: "", error: "" };
    if (mode === "encode") return { output: textToBinary(input), error: "" };
    const r = binaryToText(input);
    return { output: r.text, error: r.error };
  }, [mode, input]);

  return (
    <div>
      <div className="field">
        <label>Mode</label>
        <div className="btn-row">
          <button type="button" className={mode === "encode" ? "btn btn-primary" : "btn"} onClick={() => { setMode("encode"); setInput("Hi!"); }}>Text → Binary</button>
          <button type="button" className={mode === "decode" ? "btn btn-primary" : "btn"} onClick={() => { setMode("decode"); setInput("01001000 01101001"); }}>Binary → Text</button>
        </div>
      </div>
      <div className="field">
        <label htmlFor="tb">{mode === "encode" ? "Text" : "Binary (8-bit groups)"}</label>
        <textarea id="tb" className="textarea" style={{ fontFamily: "monospace" }} value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {error && <p className="small" style={{ color: "#ff6b6b" }}>{error}</p>}
      <div className="field">
        <label>Result</label>
        <div className="tool-output" style={{ fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{output || "Your result will appear here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
      <p className="muted small" style={{ marginTop: 10 }}>
        Encoding uses UTF-8, so emoji and accented letters convert correctly (some become
        several bytes). Each byte is shown as 8 bits. Runs in your browser.
      </p>
    </div>
  );
}
