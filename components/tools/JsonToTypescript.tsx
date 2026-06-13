"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

// Infer TypeScript interfaces from a JSON sample. Nested objects become their
// own named interfaces; arrays are typed by their first element (a pragmatic
// choice that covers the common "array of records" shape).
type Shape = string;

function tsType(value: unknown, name: string, out: Map<string, string>): Shape {
  if (value === null) return "null";
  if (Array.isArray(value)) {
    if (value.length === 0) return "unknown[]";
    return `${tsType(value[0], name, out)}[]`;
  }
  switch (typeof value) {
    case "string": return "string";
    case "number": return "number";
    case "boolean": return "boolean";
    case "object": {
      const iface = pascal(name);
      const lines: string[] = [];
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
        const t = tsType(v, k, out);
        const key = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
        lines.push(`  ${key}: ${t};`);
      }
      out.set(iface, `interface ${iface} {\n${lines.join("\n")}\n}`);
      return iface;
    }
    default: return "unknown";
  }
}

function pascal(s: string) {
  const p = s.replace(/[_-]+/g, " ").replace(/\s+(.)/g, (_, c) => c.toUpperCase()).replace(/\s+/g, "");
  const out = p.charAt(0).toUpperCase() + p.slice(1);
  return /^[A-Za-z_$]/.test(out) ? out || "Root" : "Root";
}

export function JsonToTypescript() {
  const [input, setInput] = useState('{\n  "id": 1,\n  "name": "Ada",\n  "active": true,\n  "roles": ["admin", "user"],\n  "profile": { "age": 36, "city": "London" }\n}');
  const [rootName, setRootName] = useState("Root");

  const { output, error } = useMemo(() => {
    try {
      const parsed = JSON.parse(input);
      const out = new Map<string, string>();
      tsType(parsed, rootName || "Root", out);
      // Reverse so the root interface appears first (it's inserted last).
      return { output: [...out.values()].reverse().join("\n\n"), error: "" };
    } catch (e) {
      return { output: "", error: (e as Error).message };
    }
  }, [input, rootName]);

  return (
    <div>
      <div className="field">
        <label htmlFor="jt">JSON sample</label>
        <textarea id="jt" className="textarea" style={{ fontFamily: "monospace", minHeight: 180 }} value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <div className="field" style={{ maxWidth: 280 }}>
        <label htmlFor="jtr">Root interface name</label>
        <input id="jtr" className="input" value={rootName} onChange={(e) => setRootName(e.target.value)} />
      </div>
      {error && <p className="small" style={{ color: "#ff6b6b" }}>Invalid JSON: {error}</p>}
      <div className="field">
        <label>TypeScript interfaces</label>
        <div className="tool-output" style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>{output || "Your TypeScript interfaces will appear here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
      <p className="muted small" style={{ marginTop: 10 }}>
        Nested objects become their own interfaces; arrays are typed from their first item.
        Paste a representative sample for the best result. Runs in your browser.
      </p>
    </div>
  );
}
