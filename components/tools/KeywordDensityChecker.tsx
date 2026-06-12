"use client";

import { useMemo, useState } from "react";

const STOP = new Set(
  "a an and are as at be by for from has have he in is it its of on or that the to was were will with this you your i we they but not".split(" ")
);

interface Row {
  phrase: string;
  count: number;
  density: number;
}

function tokenize(text: string): string[] {
  return (text.toLowerCase().match(/[a-z0-9']+/g) ?? []);
}

function topPhrases(words: string[], size: number, totalWords: number, filterStop: boolean): Row[] {
  const counts = new Map<string, number>();
  for (let i = 0; i + size <= words.length; i++) {
    const gram = words.slice(i, i + size);
    if (filterStop && size === 1 && STOP.has(gram[0])) continue;
    const phrase = gram.join(" ");
    counts.set(phrase, (counts.get(phrase) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([phrase, count]) => ({ phrase, count, density: (count / totalWords) * 100 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

function Table({ title, rows }: { title: string; rows: Row[] }) {
  if (!rows.length) return null;
  return (
    <div className="panel" style={{ marginTop: 14 }}>
      <h4>{title}</h4>
      <ul className="related-list">
        {rows.map((r) => (
          <li key={r.phrase} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <span>{r.phrase}</span>
            <span className="muted small">{r.count}× · {r.density.toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function KeywordDensityChecker() {
  const [text, setText] = useState("");

  const data = useMemo(() => {
    const words = tokenize(text);
    const total = words.length;
    if (!total) return null;
    return {
      total,
      one: topPhrases(words, 1, total, true),
      two: topPhrases(words, 2, total, false),
      three: topPhrases(words, 3, total, false),
    };
  }, [text]);

  return (
    <div>
      <div className="field">
        <label htmlFor="kd">Paste your content</label>
        <textarea id="kd" className="textarea" placeholder="Paste an article or page copy to analyze keyword density…" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      {data ? (
        <>
          <p className="muted small">{data.total} total words analyzed.</p>
          <Table title="Top keywords (single words)" rows={data.one} />
          <Table title="Top 2-word phrases" rows={data.two} />
          <Table title="Top 3-word phrases" rows={data.three} />
        </>
      ) : (
        <p className="muted">Paste some text to see your keyword density breakdown.</p>
      )}
    </div>
  );
}
