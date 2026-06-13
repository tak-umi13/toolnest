"use client";

import { useMemo, useState } from "react";

type Row = { type: "eq" | "add" | "del"; text: string };

// Line-level diff via Longest Common Subsequence. Unlike a naive line-by-line
// compare, LCS correctly aligns inserts/deletes so unchanged lines stay matched.
function diffLines(a: string, b: string): Row[] {
  const A = a.split(/\r?\n/);
  const B = b.split(/\r?\n/);
  const m = A.length;
  const n = B.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const rows: Row[] = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (A[i] === B[j]) {
      rows.push({ type: "eq", text: A[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      rows.push({ type: "del", text: A[i] });
      i++;
    } else {
      rows.push({ type: "add", text: B[j] });
      j++;
    }
  }
  while (i < m) rows.push({ type: "del", text: A[i++] });
  while (j < n) rows.push({ type: "add", text: B[j++] });
  return rows;
}

const STYLE: Record<Row["type"], { bg: string; sign: string; color: string }> = {
  eq: { bg: "transparent", sign: " ", color: "inherit" },
  add: { bg: "rgba(91,209,122,0.15)", sign: "+", color: "#5bd17a" },
  del: { bg: "rgba(255,107,107,0.15)", sign: "-", color: "#ff6b6b" },
};

export function TextDiffChecker() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const { rows, added, removed } = useMemo(() => {
    if (!left && !right) return { rows: [] as Row[], added: 0, removed: 0 };
    const rows = diffLines(left, right);
    return {
      rows,
      added: rows.filter((r) => r.type === "add").length,
      removed: rows.filter((r) => r.type === "del").length,
    };
  }, [left, right]);

  return (
    <div>
      <div className="row">
        <div className="field">
          <label htmlFor="dl">Original text</label>
          <textarea id="dl" className="textarea" placeholder="Paste the original…" value={left} onChange={(e) => setLeft(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="dr">Changed text</label>
          <textarea id="dr" className="textarea" placeholder="Paste the changed version…" value={right} onChange={(e) => setRight(e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label>
          Differences{" "}
          {rows.length > 0 && (
            <span className="muted small">
              (<span style={{ color: "#5bd17a" }}>+{added}</span> / <span style={{ color: "#ff6b6b" }}>−{removed}</span>)
            </span>
          )}
        </label>
        <div className="tool-output" style={{ fontFamily: "monospace", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
          {rows.length === 0
            ? "Paste text in both boxes to see a line-by-line diff."
            : rows.map((r, idx) => {
                const s = STYLE[r.type];
                return (
                  <div key={idx} style={{ background: s.bg, color: s.color }}>
                    {s.sign} {r.text || " "}
                  </div>
                );
              })}
        </div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Lines in <span style={{ color: "#5bd17a" }}>green (+)</span> were added,{" "}
        <span style={{ color: "#ff6b6b" }}>red (−)</span> were removed. Matching lines are
        aligned so only real changes stand out. Runs entirely in your browser.
      </p>
    </div>
  );
}
