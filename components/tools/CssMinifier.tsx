"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

// Safe CSS minification: strip comments and collapse whitespace without
// touching string/url contents enough to break common stylesheets.
function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // comments
    .replace(/\s+/g, " ") // collapse whitespace
    .replace(/\s*([{}:;,>~+])\s*/g, "$1") // tighten around punctuation
    .replace(/;}/g, "}") // drop last semicolon in a block
    .replace(/\s*!\s*important/g, "!important")
    .trim();
}

export function CssMinifier() {
  const [css, setCss] = useState("");

  const { output, savedPct, before, after } = useMemo(() => {
    const output = minifyCss(css);
    const before = css.length;
    const after = output.length;
    const savedPct = before ? Math.round(((before - after) / before) * 100) : 0;
    return { output, savedPct, before, after };
  }, [css]);

  return (
    <div>
      <div className="field">
        <label htmlFor="cm">CSS</label>
        <textarea id="cm" className="textarea" style={{ fontFamily: "monospace", minHeight: 180 }} placeholder={"/* comment */\n.button {\n  color: #fff;\n  padding: 8px 16px;\n}"} value={css} onChange={(e) => setCss(e.target.value)} />
      </div>
      {css && (
        <div className="stat-row">
          <div className="stat"><div className="num">{before}</div><div className="lbl">Before (chars)</div></div>
          <div className="stat"><div className="num">{after}</div><div className="lbl">After (chars)</div></div>
          <div className="stat"><div className="num">{savedPct}%</div><div className="lbl">Smaller</div></div>
        </div>
      )}
      <div className="field" style={{ marginTop: 12 }}>
        <label>Minified CSS</label>
        <div className="tool-output" style={{ fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{output || "Your minified CSS will appear here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
      <p className="muted small" style={{ marginTop: 10 }}>
        Removes comments and unnecessary whitespace and tightens punctuation. It keeps your
        rules intact — no renaming or restructuring. Runs entirely in your browser.
      </p>
    </div>
  );
}
