"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

// UTF-8 safe Base64: btoa/atob only handle Latin-1, so we round-trip through
// TextEncoder/TextDecoder to support emojis and non-ASCII text correctly.
function encodeB64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function decodeB64(b64: string): string {
  const binary = atob(b64.trim());
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handle(mode: "encode" | "decode") {
    setError("");
    if (!input.trim()) {
      setOutput("");
      return;
    }
    try {
      setOutput(mode === "encode" ? encodeB64(input) : decodeB64(input));
    } catch {
      setOutput("");
      setError(mode === "decode" ? "That doesn't look like valid Base64." : "Could not encode that input.");
    }
  }

  return (
    <div>
      <div className="field">
        <label htmlFor="b64">Text or Base64</label>
        <textarea
          id="b64"
          className="textarea"
          placeholder="Type text to encode, or paste Base64 to decode…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button className="btn btn-primary" type="button" onClick={() => handle("encode")}>Encode →</button>
        <button className="btn" type="button" onClick={() => handle("decode")}>← Decode</button>
      </div>
      {error && <p className="error-text">⚠ {error}</p>}
      <div className="field">
        <label>Result</label>
        <div className="tool-output">{output || "Result will appear here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
    </div>
  );
}
