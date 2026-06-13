"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

// Iterate by code point (not UTF-16 unit) so astral characters and emoji map to
// a single U+XXXX value instead of a surrogate pair.
function toCodePoints(text: string): string {
  return Array.from(text, (ch) => "U+" + ch.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")).join(" ");
}
function toJsEscapes(text: string): string {
  return Array.from(text, (ch) => {
    const cp = ch.codePointAt(0)!;
    if (cp > 0xffff) return "\\u{" + cp.toString(16).toUpperCase() + "}";
    return "\\u" + cp.toString(16).toUpperCase().padStart(4, "0");
  }).join("");
}
function fromCodePoints(input: string): string {
  const tokens = input.trim().match(/(?:U\+|0x|\\u\{?|&#x|&#)?([0-9a-fA-F]+)\}?;?/g);
  if (!tokens) return "";
  try {
    return tokens
      .map((t) => {
        const m = t.match(/([0-9a-fA-F]+)/);
        if (!m) return "";
        // Decimal only when written as &#123; ; otherwise treat as hex.
        const isDecimal = /^&#\d+;?$/.test(t.trim());
        const cp = parseInt(m[1], isDecimal ? 10 : 16);
        return Number.isFinite(cp) && cp <= 0x10ffff ? String.fromCodePoint(cp) : "";
      })
      .join("");
  } catch {
    return "";
  }
}

export function UnicodeConverter() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("Hi 👋");

  const out = useMemo(() => {
    if (!input) return { primary: "", escapes: "" };
    if (mode === "encode") return { primary: toCodePoints(input), escapes: toJsEscapes(input) };
    return { primary: fromCodePoints(input), escapes: "" };
  }, [input, mode]);

  return (
    <div>
      <div className="field">
        <label>Mode</label>
        <div className="btn-row">
          <button type="button" className={mode === "encode" ? "btn btn-primary" : "btn"} onClick={() => { setMode("encode"); setInput("Hi 👋"); }}>Text → Unicode</button>
          <button type="button" className={mode === "decode" ? "btn btn-primary" : "btn"} onClick={() => { setMode("decode"); setInput("U+0048 U+0069"); }}>Unicode → Text</button>
        </div>
      </div>
      <div className="field">
        <label htmlFor="uc">{mode === "encode" ? "Text" : "Code points (U+XXXX, hex, or &#decimal;)"}</label>
        <textarea id="uc" className="textarea" style={{ fontFamily: "monospace" }} value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <div className="field">
        <label>{mode === "encode" ? "Code points" : "Text"}</label>
        <div className="tool-output" style={{ fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{out.primary || "Your result will appear here."}</div>
        <CopyButton value={out.primary} className="btn btn-primary" />
      </div>
      {mode === "encode" && out.escapes && (
        <div className="field">
          <label>JavaScript / JSON escapes</label>
          <div className="tool-output" style={{ fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{out.escapes}</div>
          <CopyButton value={out.escapes} label="Copy escapes" className="btn" />
        </div>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Each character maps to its Unicode code point (e.g. U+1F44B for 👋). Decoding accepts
        U+XXXX, raw hex, \\u escapes or HTML entities. Emoji and accented letters round-trip
        correctly. Runs in your browser.
      </p>
    </div>
  );
}
