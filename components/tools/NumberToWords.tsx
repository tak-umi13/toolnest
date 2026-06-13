"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

const ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const SCALES = ["", "thousand", "million", "billion", "trillion"];

function threeDigits(n: number): string {
  let out = "";
  if (n >= 100) {
    out += ONES[Math.floor(n / 100)] + " hundred";
    n %= 100;
    if (n) out += " ";
  }
  if (n >= 20) {
    out += TENS[Math.floor(n / 10)];
    if (n % 10) out += "-" + ONES[n % 10];
  } else if (n > 0) {
    out += ONES[n];
  }
  return out;
}

function toWords(numStr: string): string {
  if (!/^-?\d+$/.test(numStr)) return "";
  let neg = false;
  let s = numStr;
  if (s.startsWith("-")) { neg = true; s = s.slice(1); }
  s = s.replace(/^0+/, "") || "0";
  if (s === "0") return "zero";
  if (s.length > 15) return "";
  const groups: number[] = [];
  for (let i = s.length; i > 0; i -= 3) groups.push(parseInt(s.slice(Math.max(0, i - 3), i), 10));
  const parts: string[] = [];
  for (let i = groups.length - 1; i >= 0; i--) {
    if (groups[i] === 0) continue;
    parts.push(threeDigits(groups[i]) + (SCALES[i] ? " " + SCALES[i] : ""));
  }
  const words = parts.join(" ");
  return (neg ? "negative " : "") + words;
}

const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

export function NumberToWords() {
  const [input, setInput] = useState("12345");

  const { lower, title, error } = useMemo(() => {
    const clean = input.replace(/,/g, "").trim();
    if (!clean) return { lower: "", title: "", error: "" };
    const words = toWords(clean);
    if (!words) return { lower: "", title: "", error: "Enter a whole number up to 15 digits." };
    return { lower: words, title: words.split(" ").map(cap).join(" "), error: "" };
  }, [input]);

  return (
    <div>
      <div className="field">
        <label htmlFor="nw">Number</label>
        <input id="nw" className="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="12345" />
      </div>
      {error && <p className="small" style={{ color: "#ff6b6b" }}>{error}</p>}
      {lower && (
        <>
          <div className="field">
            <label>In words (lowercase)</label>
            <div className="tool-output">{lower}</div>
            <CopyButton value={lower} className="btn" />
          </div>
          <div className="field">
            <label>Title Case</label>
            <div className="tool-output">{title}</div>
            <CopyButton value={title} className="btn" />
          </div>
        </>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Spells out whole numbers using the short scale (thousand, million, billion…). Handy
        for writing cheques, contracts and invoices. Runs entirely in your browser.
      </p>
    </div>
  );
}
