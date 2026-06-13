"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

// Best-effort repair of the malformed JSON that LLMs and loose configs often
// produce. Each step is conservative and reported so you can see what changed.
function repair(input: string): { fixes: string[]; text: string } {
  let s = input;
  const fixes: string[] = [];

  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) { s = fence[1]; fixes.push("removed Markdown code fence"); }

  const trimmed = s.trim();
  // Smart quotes → straight quotes.
  if (/[“”‘’]/.test(s)) { s = s.replace(/[“”]/g, '"').replace(/[‘’]/g, "'"); fixes.push("normalised smart quotes"); }
  // Single-quoted strings/keys → double-quoted (rough but effective).
  if (/'/.test(s) && !/"/.test(trimmed.replace(/'[^']*'/g, ""))) {
    s = s.replace(/'([^']*)'/g, '"$1"'); fixes.push("converted single quotes to double quotes");
  } else if (/'/.test(s)) {
    s = s.replace(/'([^']*)'/g, '"$1"'); fixes.push("converted single quotes to double quotes");
  }
  // Unquoted object keys → quoted.
  if (/[{,]\s*[A-Za-z_$][\w$]*\s*:/.test(s)) {
    s = s.replace(/([{,]\s*)([A-Za-z_$][\w$]*)(\s*:)/g, '$1"$2"$3'); fixes.push("quoted unquoted keys");
  }
  // Trailing commas before } or ].
  if (/,\s*[}\]]/.test(s)) { s = s.replace(/,(\s*[}\]])/g, "$1"); fixes.push("removed trailing commas"); }
  // Python literals.
  if (/\b(True|False|None)\b/.test(s)) {
    s = s.replace(/\bTrue\b/g, "true").replace(/\bFalse\b/g, "false").replace(/\bNone\b/g, "null");
    fixes.push("converted Python True/False/None");
  }
  return { fixes, text: s.trim() };
}

export function JsonRepair() {
  const [input, setInput] = useState("{\n  name: 'Ada',\n  active: True,\n  roles: ['admin', 'user',],\n}");

  const result = useMemo(() => {
    if (!input.trim()) return null;
    const { fixes, text } = repair(input);
    try {
      const parsed = JSON.parse(text);
      return { ok: true, output: JSON.stringify(parsed, null, 2), fixes, error: "" };
    } catch (e) {
      return { ok: false, output: text, fixes, error: (e as Error).message };
    }
  }, [input]);

  return (
    <div>
      <div className="field">
        <label htmlFor="jr">Broken JSON</label>
        <textarea id="jr" className="textarea" style={{ fontFamily: "monospace", minHeight: 150 }} value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {result && (
        <>
          {result.fixes.length > 0 && (
            <p className="small" style={{ color: "#5bd17a" }}>Applied: {result.fixes.join(", ")}.</p>
          )}
          {!result.ok && (
            <p className="small" style={{ color: "#ff9f43" }}>
              Auto-fixes applied, but it still doesn&apos;t fully parse: {result.error}. The
              best-effort output is below — you may need a manual tweak.
            </p>
          )}
          <div className="field">
            <label>{result.ok ? "Repaired & formatted JSON" : "Best-effort output"}</label>
            <div className="tool-output" style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>{result.output}</div>
          </div>
          <CopyButton value={result.output} className="btn btn-primary" />
        </>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Fixes the usual suspects in LLM and hand-written JSON: code fences, single quotes,
        unquoted keys, trailing commas, smart quotes and Python <code>True/False/None</code>.
        Everything runs in your browser.
      </p>
    </div>
  );
}
