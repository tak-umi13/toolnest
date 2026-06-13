"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);

export function MarkupCalculator() {
  const [cost, setCost] = useState(60);
  const [markup, setMarkup] = useState(50);

  const r = useMemo(() => {
    const profit = cost * (markup / 100);
    const price = cost + profit;
    const margin = price > 0 ? (profit / price) * 100 : 0;
    return { profit, price, margin };
  }, [cost, markup]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Cost price</label><input className="input" type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))} /></div>
        <div className="field"><label>Markup (%)</label><input className="input" type="number" value={markup} onChange={(e) => setMarkup(Number(e.target.value))} /></div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmt(r.price)}</div><div className="lbl">Selling price</div></div>
        <div className="stat"><div className="num" style={{ color: "#5bd17a" }}>{fmt(r.profit)}</div><div className="lbl">Profit per unit</div></div>
        <div className="stat"><div className="num">{fmt(r.margin)}%</div><div className="lbl">Equivalent margin</div></div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Markup is added to the cost to set the selling price: price = cost × (1 + markup%).
        The equivalent profit margin is always lower than the markup. Calculated in your browser.
      </p>
    </div>
  );
}
