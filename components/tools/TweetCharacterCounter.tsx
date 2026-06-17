"use client";

import { useMemo, useState } from "react";

const LIMIT = 280;
const URL_WEIGHT = 23; // Twitter/X counts any link as 23 characters via t.co

// Ranges Twitter weights as 2 (CJK, fullwidth, most emoji); everything else is 1.
function isWide(cp: number): boolean {
  return (
    (cp >= 0x1100 && cp <= 0x115f) ||
    (cp >= 0x2e80 && cp <= 0x303e) ||
    (cp >= 0x3041 && cp <= 0x33ff) ||
    (cp >= 0x3400 && cp <= 0x4dbf) ||
    (cp >= 0x4e00 && cp <= 0x9fff) ||
    (cp >= 0xa000 && cp <= 0xa4cf) ||
    (cp >= 0xac00 && cp <= 0xd7a3) ||
    (cp >= 0xf900 && cp <= 0xfaff) ||
    (cp >= 0xfe30 && cp <= 0xfe4f) ||
    (cp >= 0x1f000 && cp <= 0x1ffff) ||
    (cp >= 0x20000 && cp <= 0x3ffff)
  );
}

const URL_RE = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

function weightedLength(text: string): number {
  // Replace URLs with a fixed-weight placeholder first.
  const urls = text.match(URL_RE) || [];
  let stripped = text.replace(URL_RE, "");
  let weight = urls.length * URL_WEIGHT;
  for (const ch of stripped) weight += isWide(ch.codePointAt(0)!) ? 2 : 1;
  return weight;
}

export function TweetCharacterCounter() {
  const [text, setText] = useState("");
  const r = useMemo(() => {
    const used = weightedLength(text);
    return { used, remaining: LIMIT - used, over: used > LIMIT };
  }, [text]);

  const color = r.over ? "#dc2626" : r.remaining <= 20 ? "#d97706" : "#16a34a";

  return (
    <div>
      <div className="field">
        <label htmlFor="tw">Your tweet</label>
        <textarea id="tw" className="textarea" style={{ fontFamily: "inherit" }} placeholder="What's happening?" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num" style={{ color }}>{r.used}</div><div className="lbl">Weighted length</div></div>
        <div className="stat"><div className="num" style={{ color }}>{r.remaining}</div><div className="lbl">Remaining</div></div>
        <div className="stat"><div className="num">{[...text].length}</div><div className="lbl">Raw characters</div></div>
      </div>
      {r.over && <p className="small" style={{ color: "#dc2626", marginTop: 8 }}>Over the 280 limit by {-r.remaining}.</p>}
      <p className="muted small" style={{ marginTop: 10 }}>
        Counts a tweet the way X/Twitter does: the limit is 280, any link counts as 23 characters
        no matter its length, and CJK characters and most emoji count as 2. &quot;Raw characters&quot;
        is the plain count for comparison. Runs in your browser.
      </p>
    </div>
  );
}
