"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

// Pretty-print XML by re-indenting on tag boundaries. Pure string work — no DOM
// parser — so it also tidies XML fragments that aren't a full document.
function formatXml(xml: string, indentUnit: string): string {
  // Put every tag on its own line first.
  const normalised = xml.replace(/>\s*</g, ">\n<").trim();
  let depth = 0;
  const out: string[] = [];
  for (const raw of normalised.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const isClosing = /^<\//.test(line);
    const isSelfContained =
      /^<[^>]+\/>$/.test(line) || // self-closing <br/>
      /^<\?/.test(line) || // declaration <?xml?>
      /^<!--/.test(line) || // comment
      /^<[^/!?][^>]*>.*<\/[^>]+>$/.test(line); // <tag>text</tag> on one line
    if (isClosing) depth = Math.max(0, depth - 1);
    out.push(indentUnit.repeat(depth) + line);
    const isOpening = /^<[^/!?]/.test(line) && !isSelfContained;
    if (isOpening) depth++;
  }
  return out.join("\n");
}

export function XmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  function run(minify: boolean) {
    setError("");
    if (!input.trim()) { setOutput(""); return; }
    // Validate well-formedness with the browser's XML parser when available.
    if (typeof window !== "undefined" && "DOMParser" in window) {
      const doc = new DOMParser().parseFromString(input, "application/xml");
      const err = doc.querySelector("parsererror");
      if (err) {
        setOutput("");
        setError(err.textContent?.split("\n")[0] || "Invalid XML.");
        return;
      }
    }
    setOutput(minify ? input.replace(/>\s+</g, "><").trim() : formatXml(input, " ".repeat(indent)));
  }

  return (
    <div>
      <div className="field">
        <label htmlFor="xf">XML input</label>
        <textarea id="xf" className="textarea" placeholder='<note><to>Ada</to><from>Linus</from></note>' value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button className="btn btn-primary" type="button" onClick={() => run(false)}>Beautify</button>
        <button className="btn" type="button" onClick={() => run(true)}>Minify</button>
        <select className="select" style={{ width: "auto" }} value={indent} onChange={(e) => setIndent(Number(e.target.value))} aria-label="Indent size">
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
        </select>
      </div>
      {error && <p className="error-text">⚠ {error}</p>}
      <div className="field">
        <label>Output</label>
        <div className="tool-output">{output || "Formatted XML will appear here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
    </div>
  );
}
