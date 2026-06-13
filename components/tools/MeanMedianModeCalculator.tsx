"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 6 }).format(n);

export function MeanMedianModeCalculator() {
  const [text, setText] = useState("4, 8, 15, 16, 23, 42");

  const r = useMemo(() => {
    const nums = (text.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
    const n = nums.length;
    if (n === 0) return null;
    const sum = nums.reduce((s, x) => s + x, 0);
    const mean = sum / n;
    const sorted = [...nums].sort((a, b) => a - b);
    const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
    // Mode(s)
    const freq = new Map<number, number>();
    for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1);
    const maxFreq = Math.max(...freq.values());
    const modes = maxFreq > 1 ? [...freq.entries()].filter(([, c]) => c === maxFreq).map(([v]) => v) : [];
    // Variance / SD
    const sqDev = nums.reduce((s, x) => s + (x - mean) ** 2, 0);
    const popVar = sqDev / n;
    const sampVar = n > 1 ? sqDev / (n - 1) : 0;
    return {
      n, sum, mean, median, modes,
      range: sorted[n - 1] - sorted[0], min: sorted[0], max: sorted[n - 1],
      popSD: Math.sqrt(popVar), sampSD: Math.sqrt(sampVar),
    };
  }, [text]);

  return (
    <div>
      <div className="field">
        <label htmlFor="mm">Numbers (comma, space or newline separated)</label>
        <textarea id="mm" className="textarea" style={{ minHeight: 90, fontFamily: "var(--mono)" }} value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      {r ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">{fmt(r.mean)}</div><div className="lbl">Mean</div></div>
            <div className="stat"><div className="num">{fmt(r.median)}</div><div className="lbl">Median</div></div>
            <div className="stat"><div className="num" style={{ fontSize: r.modes.length ? "1.2rem" : "1.5rem" }}>{r.modes.length ? r.modes.map(fmt).join(", ") : "none"}</div><div className="lbl">Mode</div></div>
            <div className="stat"><div className="num">{fmt(r.range)}</div><div className="lbl">Range</div></div>
          </div>
          <div className="stat-row" style={{ marginTop: 10 }}>
            <div className="stat"><div className="num">{r.n}</div><div className="lbl">Count</div></div>
            <div className="stat"><div className="num">{fmt(r.sum)}</div><div className="lbl">Sum</div></div>
            <div className="stat"><div className="num">{fmt(r.sampSD)}</div><div className="lbl">Std dev (sample)</div></div>
            <div className="stat"><div className="num">{fmt(r.popSD)}</div><div className="lbl">Std dev (population)</div></div>
          </div>
        </>
      ) : (
        <p className="muted small">Enter some numbers to see the statistics.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Mode is shown only when a value repeats. Sample standard deviation divides by (n−1) —
        use it for a sample of a larger group; population SD divides by n. Runs in your browser.
      </p>
    </div>
  );
}
