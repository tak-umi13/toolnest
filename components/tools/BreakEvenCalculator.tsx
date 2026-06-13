"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);
const fmt0 = (n: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);

export function BreakEvenCalculator() {
  const [fixed, setFixed] = useState(50000);
  const [price, setPrice] = useState(40);
  const [variable, setVariable] = useState(15);

  const r = useMemo(() => {
    const contribution = price - variable;
    if (contribution <= 0) return { contribution, units: null as number | null, revenue: 0 };
    const units = fixed / contribution;
    return { contribution, units, revenue: units * price };
  }, [fixed, price, variable]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Fixed costs (total)</label><input className="input" type="number" value={fixed} onChange={(e) => setFixed(Number(e.target.value))} /></div>
        <div className="field"><label>Price per unit</label><input className="input" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></div>
        <div className="field"><label>Variable cost per unit</label><input className="input" type="number" value={variable} onChange={(e) => setVariable(Number(e.target.value))} /></div>
      </div>
      {r.units === null ? (
        <p className="small" style={{ color: "#ff6b6b" }}>Price must be higher than the variable cost per unit to ever break even.</p>
      ) : (
        <div className="stat-row">
          <div className="stat"><div className="num">{fmt0(Math.ceil(r.units))}</div><div className="lbl">Units to break even</div></div>
          <div className="stat"><div className="num">{fmt(r.revenue)}</div><div className="lbl">Break-even revenue</div></div>
          <div className="stat"><div className="num">{fmt(r.contribution)}</div><div className="lbl">Contribution / unit</div></div>
        </div>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Break-even units = fixed costs ÷ (price − variable cost). The contribution margin per
        unit is what each sale puts toward covering fixed costs; once they&apos;re covered, the rest is profit.
      </p>
    </div>
  );
}
