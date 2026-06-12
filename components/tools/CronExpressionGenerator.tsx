"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

const PRESETS: { label: string; expr: string }[] = [
  { label: "Every minute", expr: "* * * * *" },
  { label: "Every 5 minutes", expr: "*/5 * * * *" },
  { label: "Every 15 minutes", expr: "*/15 * * * *" },
  { label: "Every hour", expr: "0 * * * *" },
  { label: "Every day at midnight", expr: "0 0 * * *" },
  { label: "Every day at 9am", expr: "0 9 * * *" },
  { label: "Every Monday at 9am", expr: "0 9 * * 1" },
  { label: "First of every month", expr: "0 0 1 * *" },
];

const FIELDS = ["Minute", "Hour", "Day (month)", "Month", "Day (week)"];
const RANGES = ["0-59", "0-23", "1-31", "1-12", "0-6 (Sun=0)"];

function describe(parts: string[]): string {
  if (parts.length !== 5 || parts.some((p) => !p.trim())) return "Enter all five fields.";
  const [min, hr, dom, mon, dow] = parts;
  const seg: string[] = [];
  seg.push(min === "*" ? "every minute" : min.startsWith("*/") ? `every ${min.slice(2)} minutes` : `at minute ${min}`);
  if (hr !== "*") seg.push(`past hour ${hr}`);
  if (dom !== "*") seg.push(`on day-of-month ${dom}`);
  if (mon !== "*") seg.push(`in month ${mon}`);
  if (dow !== "*") seg.push(`on weekday ${dow}`);
  return "Runs " + seg.join(", ") + ".";
}

export function CronExpressionGenerator() {
  const [parts, setParts] = useState(["0", "9", "*", "*", "1"]);
  const expr = parts.join(" ");

  return (
    <div>
      <div className="field">
        <label>Presets</label>
        <div className="btn-row" style={{ flexWrap: "wrap" }}>
          {PRESETS.map((p) => (
            <button key={p.expr} type="button" className="btn" onClick={() => setParts(p.expr.split(" "))}>{p.label}</button>
          ))}
        </div>
      </div>
      <div className="row" style={{ flexWrap: "wrap" }}>
        {FIELDS.map((f, i) => (
          <div className="field" key={f} style={{ minWidth: 90 }}>
            <label>{f}</label>
            <input className="input" value={parts[i]} onChange={(e) => setParts(parts.map((p, j) => (j === i ? e.target.value : p)))} />
            <small className="muted">{RANGES[i]}</small>
          </div>
        ))}
      </div>
      <div className="field">
        <label>Cron expression</label>
        <div className="tool-output" style={{ fontSize: "1.3rem" }}>{expr}</div>
      </div>
      <p className="muted">{describe(parts)}</p>
      <CopyButton value={expr} label="Copy expression" className="btn btn-primary" />
    </div>
  );
}
