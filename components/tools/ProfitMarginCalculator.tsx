"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);

export function ProfitMarginCalculator() {
  const [cost, setCost] = useState(60);
  const [revenue, setRevenue] = useState(100);

  const r = useMemo(() => {
    const profit = revenue - cost;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0; // profit as % of selling price
    const markup = cost > 0 ? (profit / cost) * 100 : 0; // profit as % of cost
    return { profit, margin, markup };
  }, [cost, revenue]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Cost price</label><input className="input" type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))} /></div>
        <div className="field"><label>Selling price (revenue)</label><input className="input" type="number" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} /></div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num" style={{ color: r.profit >= 0 ? "#5bd17a" : "#ff6b6b" }}>{fmt(r.profit)}</div><div className="lbl">Profit</div></div>
        <div className="stat"><div className="num">{fmt(r.margin)}%</div><div className="lbl">Profit margin</div></div>
        <div className="stat"><div className="num">{fmt(r.markup)}%</div><div className="lbl">Markup</div></div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        <strong>Margin</strong> is profit as a percentage of the selling price; <strong>markup</strong>
        is profit as a percentage of the cost. They differ — a 50% markup is only a 33.3% margin —
        so be clear which one a supplier or client means. Calculated in your browser.
      </p>
    </div>
  );
}
