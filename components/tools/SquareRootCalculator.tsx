"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

const fmt = (n: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 8 }).format(n);

export function SquareRootCalculator() {
  const [value, setValue] = useState("2");
  const [degree, setDegree] = useState(2);

  const r = useMemo(() => {
    const x = Number(value);
    if (value.trim() === "" || Number.isNaN(x)) return null;
    const sqrt = x >= 0 ? Math.sqrt(x) : null;
    const cbrt = Math.cbrt(x);
    const nth = degree >= 1 ? (x < 0 && degree % 2 === 0 ? null : Math.sign(x) * Math.abs(x) ** (1 / degree)) : null;
    const isPerfect = x >= 0 && Number.isInteger(x) && Number.isInteger(Math.sqrt(x));
    return { sqrt, cbrt, nth, isPerfect };
  }, [value, degree]);

  return (
    <div>
      <div className="row">
        <div className="field"><label htmlFor="sq">Number</label><input id="sq" className="input" value={value} onChange={(e) => setValue(e.target.value)} /></div>
        <div className="field"><label htmlFor="sd">nth root (degree)</label><input id="sd" className="input" type="number" min={1} value={degree} onChange={(e) => setDegree(Math.max(1, Number(e.target.value)))} /></div>
      </div>
      {r ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">{r.sqrt == null ? "—" : fmt(r.sqrt)}</div><div className="lbl">Square root √</div></div>
            <div className="stat"><div className="num">{fmt(r.cbrt)}</div><div className="lbl">Cube root ∛</div></div>
            <div className="stat"><div className="num">{r.nth == null ? "—" : fmt(r.nth)}</div><div className="lbl">{degree}th root</div></div>
          </div>
          {r.sqrt != null && (
            <p className="small" style={{ marginTop: 8 }}>
              {r.isPerfect ? `${value} is a perfect square.` : ""}{" "}
              <CopyButton value={r.sqrt == null ? "" : String(r.sqrt)} label="Copy √" className="btn" />
            </p>
          )}
        </>
      ) : (
        <p className="muted small">Enter a number.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Gives the square root, cube root and any nth root. Negative numbers have no real square
        root (or even root), shown as —. Runs in your browser.
      </p>
    </div>
  );
}
