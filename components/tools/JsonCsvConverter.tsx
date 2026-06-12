"use client";

import { useState } from "react";
import { CopyButton } from "./ui";
import type { ToolParams } from "./ToolRenderer";

// Escape a single CSV field: wrap in quotes if it contains a comma, quote or
// newline, doubling any embedded quotes (RFC 4180).
function csvField(value: unknown): string {
  const s =
    value === null || value === undefined
      ? ""
      : typeof value === "object"
        ? JSON.stringify(value)
        : String(value);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function jsonToCsv(input: string): string {
  const data = JSON.parse(input);
  const rows = Array.isArray(data) ? data : [data];
  if (rows.length === 0) return "";
  // Column order = union of keys across all objects, first-seen wins.
  const keys: string[] = [];
  for (const row of rows) {
    if (row && typeof row === "object" && !Array.isArray(row)) {
      for (const k of Object.keys(row)) if (!keys.includes(k)) keys.push(k);
    }
  }
  if (keys.length === 0) throw new Error("Expected an array of objects.");
  const header = keys.map(csvField).join(",");
  const body = rows
    .map((row) => keys.map((k) => csvField((row ?? {})[k])).join(","))
    .join("\n");
  return `${header}\n${body}`;
}

// Parse CSV honouring quoted fields, escaped quotes and quoted newlines.
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); field = ""; row = [];
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.length > 1 || r[0] !== "");
}

function csvToJson(input: string): string {
  const rows = parseCsv(input.trim());
  if (rows.length < 1) return "[]";
  const [headers, ...body] = rows;
  const out = body.map((cells) => {
    const obj: Record<string, string | number | boolean> = {};
    headers.forEach((h, i) => {
      const raw = cells[i] ?? "";
      // Coerce obvious numbers and booleans so the JSON is usefully typed.
      if (raw === "true" || raw === "false") obj[h] = raw === "true";
      else if (raw !== "" && !isNaN(Number(raw))) obj[h] = Number(raw);
      else obj[h] = raw;
    });
    return obj;
  });
  return JSON.stringify(out, null, 2);
}

export function JsonCsvConverter({ params }: { params?: ToolParams }) {
  const toCsv = params?.direction !== "csv-to-json";
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const placeholder = toCsv
    ? '[{"name":"Ada","role":"Engineer"},{"name":"Linus","role":"Maintainer"}]'
    : "name,role\nAda,Engineer\nLinus,Maintainer";

  function run() {
    setError("");
    if (!input.trim()) { setOutput(""); return; }
    try {
      setOutput(toCsv ? jsonToCsv(input) : csvToJson(input));
    } catch (e) {
      setOutput("");
      setError(e instanceof Error ? e.message : "Conversion failed.");
    }
  }

  return (
    <div>
      <div className="field">
        <label htmlFor="jc-in">{toCsv ? "JSON input" : "CSV input"}</label>
        <textarea id="jc-in" className="textarea" placeholder={placeholder} value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button className="btn btn-primary" type="button" onClick={run}>
          {toCsv ? "Convert to CSV" : "Convert to JSON"}
        </button>
      </div>
      {error && <p className="error-text">⚠ {error}</p>}
      <div className="field">
        <label>{toCsv ? "CSV output" : "JSON output"}</label>
        <div className="tool-output">{output || (toCsv ? "CSV will appear here." : "JSON will appear here.")}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
    </div>
  );
}
