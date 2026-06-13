"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

const TONES = ["", "professional", "friendly", "persuasive", "concise", "formal", "playful", "empathetic"];
const FORMATS = ["", "bullet points", "a numbered list", "a short paragraph", "a table", "Markdown", "JSON", "a step-by-step guide"];

export function AiPromptGenerator() {
  const [role, setRole] = useState("an expert copywriter");
  const [task, setTask] = useState("Write a product description for a reusable water bottle");
  const [audience, setAudience] = useState("eco-conscious shoppers");
  const [tone, setTone] = useState("persuasive");
  const [format, setFormat] = useState("a short paragraph");
  const [length, setLength] = useState("around 80 words");
  const [extra, setExtra] = useState("");

  const prompt = useMemo(() => {
    const lines: string[] = [];
    lines.push(`Act as ${role.trim() || "a helpful assistant"}.`);
    lines.push("");
    lines.push(`Task: ${task.trim() || "(describe the task)"}.`);
    const ctx: string[] = [];
    if (audience.trim()) ctx.push(`Audience: ${audience.trim()}.`);
    if (tone) ctx.push(`Tone: ${tone}.`);
    if (format) ctx.push(`Format the response as ${format}.`);
    if (length.trim()) ctx.push(`Length: ${length.trim()}.`);
    if (ctx.length) { lines.push(""); lines.push(...ctx); }
    if (extra.trim()) { lines.push(""); lines.push(`Additional requirements: ${extra.trim()}`); }
    lines.push("");
    lines.push("If anything is unclear, ask me a clarifying question before answering.");
    return lines.join("\n");
  }, [role, task, audience, tone, format, length, extra]);

  return (
    <div>
      <div className="field">
        <label htmlFor="pr">Role / persona</label>
        <input id="pr" className="input" value={role} onChange={(e) => setRole(e.target.value)} placeholder="an expert copywriter" />
      </div>
      <div className="field">
        <label htmlFor="pt">Task — what should it do?</label>
        <textarea id="pt" className="textarea" style={{ minHeight: 70 }} value={task} onChange={(e) => setTask(e.target.value)} />
      </div>
      <div className="row">
        <div className="field"><label htmlFor="pa">Audience</label><input id="pa" className="input" value={audience} onChange={(e) => setAudience(e.target.value)} /></div>
        <div className="field"><label htmlFor="pl">Length</label><input id="pl" className="input" value={length} onChange={(e) => setLength(e.target.value)} placeholder="around 80 words" /></div>
      </div>
      <div className="row">
        <div className="field">
          <label htmlFor="pto">Tone</label>
          <select id="pto" className="select" value={tone} onChange={(e) => setTone(e.target.value)}>
            {TONES.map((t) => <option key={t} value={t}>{t || "(none)"}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="pf">Output format</label>
          <select id="pf" className="select" value={format} onChange={(e) => setFormat(e.target.value)}>
            {FORMATS.map((f) => <option key={f} value={f}>{f || "(none)"}</option>)}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="pe">Extra requirements <span className="muted small">(optional)</span></label>
        <input id="pe" className="input" value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="e.g. include a call to action, avoid jargon" />
      </div>
      <div className="field">
        <label>Your prompt</label>
        <div className="tool-output" style={{ whiteSpace: "pre-wrap" }}>{prompt}</div>
      </div>
      <CopyButton value={prompt} label="Copy prompt" className="btn btn-primary" />
      <p className="muted small" style={{ marginTop: 10 }}>
        This builds a clear, structured prompt template from your inputs — it doesn&apos;t call
        any AI itself. Paste the result into ChatGPT, Claude, Gemini or any assistant. Giving a
        role, audience, tone and format reliably improves the answer you get back.
      </p>
    </div>
  );
}
