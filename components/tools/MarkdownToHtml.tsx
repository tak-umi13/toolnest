"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Inline formatting: code, bold, italic, links. Run AFTER block escaping so user
// HTML can't inject — we only ever emit our own tags.
function inline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, href) => `<a href="${encodeURI(href)}">${t}</a>`);
}

function markdownToHtml(md: string): string {
  const lines = escapeHtml(md).replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;
  let listType: "ul" | "ol" | null = null;
  const closeList = () => { if (listType) { out.push(`</${listType}>`); listType = null; } };

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block.
    if (/^```/.test(line)) {
      closeList();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
      i++; // skip closing fence
      out.push(`<pre><code>${buf.join("\n")}</code></pre>`);
      continue;
    }
    // Heading.
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { closeList(); const lvl = h[1].length; out.push(`<h${lvl}>${inline(h[2])}</h${lvl}>`); i++; continue; }
    // Horizontal rule.
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) { closeList(); out.push("<hr>"); i++; continue; }
    // Blockquote.
    if (/^>\s?/.test(line)) { closeList(); out.push(`<blockquote>${inline(line.replace(/^>\s?/, ""))}</blockquote>`); i++; continue; }
    // List items.
    const ol = line.match(/^\d+\.\s+(.*)$/);
    const ul = line.match(/^[-*+]\s+(.*)$/);
    if (ol || ul) {
      const want = ol ? "ol" : "ul";
      if (listType !== want) { closeList(); out.push(`<${want}>`); listType = want; }
      out.push(`<li>${inline((ol ? ol[1] : ul![1]))}</li>`);
      i++; continue;
    }
    // Blank line.
    if (!line.trim()) { closeList(); i++; continue; }
    // Paragraph.
    closeList();
    out.push(`<p>${inline(line)}</p>`);
    i++;
  }
  closeList();
  return out.join("\n");
}

export function MarkdownToHtml() {
  const [input, setInput] = useState("# Hello ToolNest\n\nConvert **Markdown** to *HTML* with one click.\n\n- Fast\n- Free\n- Private\n");
  const html = useMemo(() => markdownToHtml(input), [input]);

  return (
    <div>
      <div className="field">
        <label htmlFor="md">Markdown input</label>
        <textarea id="md" className="textarea" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <div className="row">
        <div className="field">
          <label>HTML output</label>
          <div className="tool-output">{html}</div>
        </div>
        <div className="field">
          <label>Live preview</label>
          <div className="tool-output" style={{ fontFamily: "inherit" }} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
      <CopyButton value={html} label="Copy HTML" className="btn btn-primary" />
    </div>
  );
}
