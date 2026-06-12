"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

// Accent-stripping happens via Unicode NFKD normalization: "café" decomposes to
// "cafe" + a combining accent, then we drop the combining marks (U+0300–U+036F).
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function SlugGenerator() {
  const [text, setText] = useState("");
  const slug = slugify(text);

  return (
    <div>
      <div className="field">
        <label htmlFor="sg">Title or heading</label>
        <input
          id="sg"
          className="input"
          placeholder="e.g. 10 Best Cafes in Sao Paulo!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="field">
        <label>URL slug</label>
        <div className="tool-output">{slug || "your-slug-appears-here"}</div>
      </div>
      <CopyButton value={slug} className="btn btn-primary" />
    </div>
  );
}
