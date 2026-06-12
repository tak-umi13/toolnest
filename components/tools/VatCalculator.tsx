"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);

// Common statutory rates: UK 20 / SA 15 / PH 12 / NG 7.5 / UK-reduced 5.
const PRESETS = [20, 15, 12.5, 12, 7.5, 5];

export function VatCalculator() {
  const [amount, setAmount] = useState(100);
  const [rate, setRate] = useState(20);
  const [mode, setMode] = useState<"add" | "remove">("add");

  const result = useMemo(() => {
    if (amount <= 0 || rate < 0) return null;
    if (mode === "add") {
      const vat = (amount * rate) / 100;
      return { net: amount, vat, gross: amount + vat };
    }
    // Remove: the entered amount is VAT-inclusive.
    const net = amount / (1 + rate / 100);
    return { net, vat: amount - net, gross: amount };
  }, [amount, rate, mode]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Amount</label><input className="input" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
        <div className="field"><label>VAT rate (%)</label><input className="input" type="number" step="0.5" min={0} value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
      </div>
      <div className="field">
        <label>Common rates</label>
        <div className="btn-row">
          {PRESETS.map((p) => (
            <button key={p} type="button" className={p === rate ? "btn btn-primary" : "btn"} onClick={() => setRate(p)}>{p}%</button>
          ))}
        </div>
      </div>
      <div className="btn-row" style={{ marginBottom: 14 }}>
        <button className={`btn ${mode === "add" ? "btn-primary" : ""}`} type="button" onClick={() => setMode("add")}>Add VAT (net price)</button>
        <button className={`btn ${mode === "remove" ? "btn-primary" : ""}`} type="button" onClick={() => setMode("remove")}>Remove VAT (gross price)</button>
      </div>
      {result ? (
        <div className="stat-row">
          <div className="stat"><div className="num">{fmt(result.net)}</div><div className="lbl">Net (ex VAT)</div></div>
          <div className="stat"><div className="num">{fmt(result.vat)}</div><div className="lbl">VAT ({rate}%)</div></div>
          <div className="stat"><div className="num">{fmt(result.gross)}</div><div className="lbl">Gross (inc VAT)</div></div>
        </div>
      ) : (
        <p className="muted">Enter an amount to calculate VAT.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        UK standard rate 20% (reduced 5%) · South Africa 15% · Philippines 12% · Nigeria 7.5%.
      </p>
    </div>
  );
}
