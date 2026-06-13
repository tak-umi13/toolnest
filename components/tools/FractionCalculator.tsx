"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";
import { reduceFraction } from "../../lib/mathx";

type Op = "+" | "-" | "×" | "÷";

export function FractionCalculator() {
  const [n1, setN1] = useState("1");
  const [d1, setD1] = useState("2");
  const [n2, setN2] = useState("1");
  const [d2, setD2] = useState("3");
  const [op, setOp] = useState<Op>("+");

  const result = useMemo(() => {
    const a = parseInt(n1, 10), b = parseInt(d1, 10), c = parseInt(n2, 10), e = parseInt(d2, 10);
    if ([a, b, c, e].some((x) => Number.isNaN(x)) || b === 0 || e === 0) return null;
    let n: number, d: number;
    switch (op) {
      case "+": n = a * e + c * b; d = b * e; break;
      case "-": n = a * e - c * b; d = b * e; break;
      case "×": n = a * c; d = b * e; break;
      case "÷": n = a * e; d = b * c; break;
    }
    if (d === 0) return null;
    const [rn, rd] = reduceFraction(n, d);
    const whole = Math.trunc(rn / rd);
    const rem = Math.abs(rn - whole * rd);
    const mixed = whole !== 0 && rem !== 0 ? `${whole} ${rem}/${rd}` : null;
    return { rn, rd, decimal: rn / rd, mixed };
  }, [n1, d1, n2, d2, op]);

  const FractionInput = ({ n, d, sn, sd }: { n: string; d: string; sn: (v: string) => void; sd: (v: string) => void }) => (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 4, width: 70 }}>
      <input className="input" value={n} onChange={(e) => sn(e.target.value)} style={{ textAlign: "center" }} aria-label="numerator" />
      <div style={{ borderTop: "2px solid var(--text)", margin: "0 2px" }} />
      <input className="input" value={d} onChange={(e) => sd(e.target.value)} style={{ textAlign: "center" }} aria-label="denominator" />
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", margin: "4px 0 16px" }}>
        <FractionInput n={n1} d={d1} sn={setN1} sd={setD1} />
        <select className="select" value={op} onChange={(e) => setOp(e.target.value as Op)} style={{ width: 64 }}>
          {(["+", "-", "×", "÷"] as Op[]).map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <FractionInput n={n2} d={d2} sn={setN2} sd={setD2} />
      </div>
      {result ? (
        <>
          <div className="tool-output" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            = {result.rn}/{result.rd}
            {result.mixed && <span className="muted" style={{ fontSize: "1rem", marginLeft: 8 }}>= {result.mixed}</span>}
            <span className="muted" style={{ fontSize: "1rem", marginLeft: 8 }}>= {result.decimal.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
          </div>
          <CopyButton value={`${result.rn}/${result.rd}`} className="btn" />
        </>
      ) : (
        <p className="small" style={{ color: "#ff6b6b" }}>Enter whole numbers; denominators can&apos;t be zero.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Add, subtract, multiply or divide two fractions. The answer is shown in lowest terms,
        as a mixed number where possible, and as a decimal. Runs in your browser.
      </p>
    </div>
  );
}
