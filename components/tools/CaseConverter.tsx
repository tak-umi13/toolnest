"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

type Mode = "upper" | "lower" | "title" | "sentence" | "capitalize";

function convert(text: string, mode: Mode): string {
  switch (mode) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "capitalize":
      return text.replace(/\b\w/g, (c) => c.toUpperCase());
    case "title":
      // Title Case but keep common small words lowercase unless first word.
      const small = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "in", "of", "on", "or", "the", "to", "vs"]);
      return text
        .toLowerCase()
        .split(/(\s+)/)
        .map((w, i) =>
          w.trim() && (i === 0 || !small.has(w)) ? w.charAt(0).toUpperCase() + w.slice(1) : w
        )
        .join("");
    case "sentence":
      return text
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  }
}

export function CaseConverter() {
  const [text, setText] = useState("");

  const buttons: { mode: Mode; label: string }[] = [
    { mode: "upper", label: "UPPERCASE" },
    { mode: "lower", label: "lowercase" },
    { mode: "title", label: "Title Case" },
    { mode: "sentence", label: "Sentence case" },
    { mode: "capitalize", label: "Capitalize Each Word" },
  ];

  return (
    <div>
      <div className="field">
        <label htmlFor="cc">Text</label>
        <textarea
          id="cc"
          className="textarea"
          placeholder="Type or paste your text…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="btn-row">
        {buttons.map((b) => (
          <button key={b.mode} className="btn" type="button" onClick={() => setText(convert(text, b.mode))}>
            {b.label}
          </button>
        ))}
        <CopyButton value={text} className="btn btn-primary" />
      </div>
    </div>
  );
}
