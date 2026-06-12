"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

// Keywords that start a new line at the base indent level.
const NEWLINE_KW = [
  "SELECT", "FROM", "WHERE", "AND", "OR", "GROUP BY", "ORDER BY", "HAVING",
  "LIMIT", "OFFSET", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM",
  "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "OUTER JOIN", "JOIN",
  "ON", "UNION ALL", "UNION",
];

function formatSql(sql: string, indentUnit: string): string {
  // Collapse whitespace, then uppercase keywords for consistency.
  let s = sql.replace(/\s+/g, " ").trim();
  // Sort longest-first so "GROUP BY" matches before "BY"/"GROUP".
  const kws = [...NEWLINE_KW].sort((a, b) => b.length - a.length);
  for (const kw of kws) {
    const re = new RegExp(`\\b${kw.replace(/ /g, "\\s+")}\\b`, "gi");
    s = s.replace(re, kw);
  }
  // Break before each clause keyword.
  for (const kw of kws) {
    s = s.split(kw).join(`\n${kw}`);
  }
  const lines = s.split("\n").map((l) => l.trim()).filter(Boolean);
  return lines
    .map((line) => {
      // Indent the column list that follows SELECT onto continuation lines.
      if (/^SELECT\b/i.test(line)) {
        const cols = line.replace(/^SELECT\s*/i, "").split(",").map((c) => c.trim());
        if (cols.length > 1) return `SELECT\n${cols.map((c) => indentUnit + c).join(",\n")}`;
      }
      return line;
    })
    .join("\n");
}

export function SqlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);

  function run() {
    if (!input.trim()) { setOutput(""); return; }
    setOutput(formatSql(input, " ".repeat(indent)));
  }

  return (
    <div>
      <div className="field">
        <label htmlFor="sf">SQL input</label>
        <textarea id="sf" className="textarea" placeholder="select id, name, email from users where active = 1 order by name" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button className="btn btn-primary" type="button" onClick={run}>Format SQL</button>
        <select className="select" style={{ width: "auto" }} value={indent} onChange={(e) => setIndent(Number(e.target.value))} aria-label="Indent size">
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
        </select>
      </div>
      <div className="field">
        <label>Output</label>
        <div className="tool-output">{output || "Formatted SQL will appear here."}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
    </div>
  );
}
