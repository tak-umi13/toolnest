"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);

export function SalesTaxCalculator() {
  const [amount, setAmount] = useState(100);
  const [rate, setRate] = useState(7.25);
  const [mode, setMode] = useState<"add" | "remove">("add");

  const r = useMemo(() => {
    const rt = rate / 100;
    if (mode === "add") {
      const tax = amount * rt;
      return { net: amount, tax, total: amount + tax };
    }
    const net = amount / (1 + rt);
    return { net, tax: amount - net, total: amount };
  }, [amount, rate, mode]);

  return (
    <div>
      <div className="field">
        <label>Mode</label>
        <div className="btn-row">
          <button type="button" className={mode === "add" ? "btn btn-primary" : "btn"} onClick={() => setMode("add")}>Add tax (net → total)</button>
          <button type="button" className={mode === "remove" ? "btn btn-primary" : "btn"} onClick={() => setMode("remove")}>Remove tax (total → net)</button>
        </div>
      </div>
      <div className="row">
        <div className="field"><label>{mode === "add" ? "Amount before tax" : "Amount including tax"}</label><input className="input" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
        <div className="field"><label>Sales tax rate (%)</label><input className="input" type="number" step="0.01" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmt(r.net)}</div><div className="lbl">Net (pre-tax)</div></div>
        <div className="stat"><div className="num">{fmt(r.tax)}</div><div className="lbl">Sales tax</div></div>
        <div className="stat"><div className="num">{fmt(r.total)}</div><div className="lbl">Total</div></div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Add tax to a pre-tax price, or work backwards from a tax-inclusive total to find the
        net amount and the tax portion. US sales-tax rates vary by state and city — enter your
        combined rate. Calculated in your browser.
      </p>
    </div>
  );
}
