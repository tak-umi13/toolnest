"use client";

import { useMemo, useState } from "react";

export function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    // Count sentences by terminal punctuation; paragraphs by blank-line breaks.
    const sentences = trimmed ? (trimmed.match(/[^.!?]+[.!?]+/g)?.length ?? 1) : 0;
    const paragraphs = trimmed ? trimmed.split(/\n{2,}/).filter((p) => p.trim()).length : 0;
    const readingMin = Math.ceil(words / 200); // ~200 wpm silent reading
    return { words, chars, charsNoSpaces, sentences, paragraphs, readingMin };
  }, [text]);

  return (
    <div>
      <div className="field">
        <label htmlFor="wc">Your text</label>
        <textarea
          id="wc"
          className="textarea"
          placeholder="Type or paste your text here…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{stats.words}</div><div className="lbl">Words</div></div>
        <div className="stat"><div className="num">{stats.chars}</div><div className="lbl">Characters</div></div>
        <div className="stat"><div className="num">{stats.charsNoSpaces}</div><div className="lbl">No spaces</div></div>
        <div className="stat"><div className="num">{stats.sentences}</div><div className="lbl">Sentences</div></div>
        <div className="stat"><div className="num">{stats.paragraphs}</div><div className="lbl">Paragraphs</div></div>
        <div className="stat"><div className="num">{stats.readingMin}m</div><div className="lbl">Read time</div></div>
      </div>
    </div>
  );
}
