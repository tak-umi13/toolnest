"use client";

import { useMemo, useState } from "react";

// Heuristic syllable counter: count vowel groups, drop a silent trailing 'e',
// floor at 1. Not perfect, but accurate enough for readability scoring.
function syllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!word) return 0;
  if (word.length <= 3) return 1;
  const groups = word.replace(/e$/, "").match(/[aeiouy]+/g);
  return Math.max(1, groups ? groups.length : 1);
}

function interpret(ease: number): string {
  if (ease >= 90) return "Very easy (5th grade)";
  if (ease >= 80) return "Easy (6th grade)";
  if (ease >= 70) return "Fairly easy (7th grade)";
  if (ease >= 60) return "Plain English (8th–9th grade)";
  if (ease >= 50) return "Fairly difficult (10th–12th grade)";
  if (ease >= 30) return "Difficult (college)";
  return "Very difficult (college graduate)";
}

export function ReadingLevelCalculator() {
  const [text, setText] = useState("");

  const r = useMemo(() => {
    const words = text.trim().match(/\b[\w'-]+\b/g) || [];
    const sentences = text.split(/[.!?]+(?:\s|$)/).filter((s) => s.trim()).length || (words.length ? 1 : 0);
    const sylCount = words.reduce((s, w) => s + syllables(w), 0);
    const W = words.length;
    const S = Math.max(1, sentences);
    if (W === 0) return null;
    const wps = W / S;
    const spw = sylCount / W;
    const ease = 206.835 - 1.015 * wps - 84.6 * spw;
    const grade = 0.39 * wps + 11.8 * spw - 15.59;
    return {
      words: W,
      sentences: S,
      syllables: sylCount,
      ease: Math.max(0, Math.min(100, Math.round(ease * 10) / 10)),
      grade: Math.max(0, Math.round(grade * 10) / 10),
    };
  }, [text]);

  return (
    <div>
      <div className="field">
        <label htmlFor="rl">Your text</label>
        <textarea id="rl" className="textarea" style={{ minHeight: 140 }} placeholder="Paste an article, email or essay to check how readable it is…" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      {r ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">{r.ease}</div><div className="lbl">Flesch Reading Ease</div></div>
            <div className="stat"><div className="num">{r.grade}</div><div className="lbl">Grade level (F–K)</div></div>
          </div>
          <p className="small" style={{ marginTop: 8 }}>Reads as: <strong>{interpret(r.ease)}</strong></p>
          <div className="stat-row" style={{ marginTop: 8 }}>
            <div className="stat"><div className="num">{r.words}</div><div className="lbl">Words</div></div>
            <div className="stat"><div className="num">{r.sentences}</div><div className="lbl">Sentences</div></div>
            <div className="stat"><div className="num">{r.syllables}</div><div className="lbl">Syllables</div></div>
          </div>
        </>
      ) : (
        <p className="muted small">Paste some text to see its readability score.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Higher Flesch Reading Ease (0–100) means easier to read; aim for 60+ for a general
        audience. The Flesch–Kincaid grade estimates the US school grade needed to understand
        the text. Syllables are estimated, so treat scores as a guide. Runs in your browser.
      </p>
    </div>
  );
}
