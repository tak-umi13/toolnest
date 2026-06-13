"use client";

import { useMemo, useState } from "react";
import { gcd, lcm } from "../../lib/mathx";

export function LcmGcdCalculator() {
  const [text, setText] = useState("12, 18, 24");

  const r = useMemo(() => {
    const nums = (text.match(/\d+/g) || []).map(Number).filter((x) => x > 0);
    if (nums.length < 2) return null;
    const g = nums.reduce((acc, x) => gcd(acc, x));
    const l = nums.reduce((acc, x) => lcm(acc, x));
    return { nums, gcd: g, lcm: l };
  }, [text]);

  return (
    <div>
      <div className="field">
        <label htmlFor="lg">Numbers (two or more, comma or space separated)</label>
        <input id="lg" className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="12, 18, 24" />
      </div>
      {r ? (
        <div className="stat-row">
          <div className="stat"><div className="num">{r.gcd}</div><div className="lbl">GCD / HCF</div></div>
          <div className="stat"><div className="num">{r.lcm.toLocaleString()}</div><div className="lbl">LCM</div></div>
        </div>
      ) : (
        <p className="muted small">Enter at least two positive whole numbers.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        The GCD (greatest common divisor, also called HCF) is the largest number that divides
        all of them; the LCM (least common multiple) is the smallest number they all divide
        into. Both use the Euclidean algorithm. Runs in your browser.
      </p>
    </div>
  );
}
