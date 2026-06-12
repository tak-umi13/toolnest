"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => new Intl.NumberFormat().format(n);

// Estimates tokens without shipping a tokenizer: for English-like text,
// ~4 characters ≈ 1 token and ~¾ word ≈ 1 token (OpenAI's published rules of
// thumb, also a good ballpark for Claude/Gemini BPE-family tokenizers). We
// average the two signals and say clearly that it's an estimate.
function estimateTokens(text: string): { tokens: number; words: number; chars: number } {
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  if (!chars) return { tokens: 0, words: 0, chars: 0 };
  const byChars = chars / 4;
  const byWords = words / 0.75;
  return { tokens: Math.round((byChars + byWords) / 2), words, chars };
}

export function TokenCounter() {
  const [text, setText] = useState("");
  const [pricePerMTok, setPricePerMTok] = useState(3);

  const r = useMemo(() => estimateTokens(text), [text]);
  const cost = (r.tokens / 1_000_000) * pricePerMTok;

  return (
    <div>
      <div className="field">
        <label htmlFor="tc">Your text or prompt</label>
        <textarea id="tc" className="textarea" placeholder="Paste a prompt, document or transcript to estimate its token count…" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">≈ {fmt(r.tokens)}</div><div className="lbl">Estimated tokens</div></div>
        <div className="stat"><div className="num">{fmt(r.words)}</div><div className="lbl">Words</div></div>
        <div className="stat"><div className="num">{fmt(r.chars)}</div><div className="lbl">Characters</div></div>
      </div>
      <div className="row" style={{ marginTop: 12, alignItems: "flex-end" }}>
        <div className="field">
          <label>Model price ($ per 1M input tokens)</label>
          <input className="input" type="number" step="0.25" min={0} value={pricePerMTok} onChange={(e) => setPricePerMTok(Number(e.target.value))} />
        </div>
        <div className="field">
          <label>Estimated cost for this text</label>
          <div className="tool-output" style={{ minHeight: 44 }}>${cost < 0.01 && cost > 0 ? cost.toFixed(6) : cost.toFixed(4)}</div>
        </div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Estimate based on ~4 characters / ~0.75 words per token (English). Code and
        non-Latin scripts tokenize less efficiently, so treat this as a ballpark —
        for billing-exact counts use the provider&apos;s tokenizer or count API.
      </p>
    </div>
  );
}
