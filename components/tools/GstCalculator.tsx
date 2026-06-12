"use client";

import { useMemo, useState } from "react";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);

export function GstCalculator() {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<"add" | "remove">("add");

  const result = useMemo(() => {
    if (amount <= 0) return null;
    if (mode === "add") {
      const gst = (amount * rate) / 100;
      return { base: amount, gst, total: amount + gst };
    }
    // Remove: the entered amount is GST-inclusive.
    const base = amount / (1 + rate / 100);
    return { base, gst: amount - base, total: amount };
  }, [amount, rate, mode]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Amount (₹)</label><input className="input" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
        <div className="field"><label>GST rate</label>
          <select className="select" value={rate} onChange={(e) => setRate(Number(e.target.value))}>
            {/* 5% and 18% are the main slabs since the Sept 2025 rationalisation;
                12%/28% remain for legacy invoices, 40% is the demerit rate. */}
            {[5, 12, 18, 28, 40].map((r) => <option key={r} value={r}>{r}%</option>)}
          </select>
        </div>
      </div>
      <div className="btn-row" style={{ marginBottom: 14 }}>
        <button className={`btn ${mode === "add" ? "btn-primary" : ""}`} type="button" onClick={() => setMode("add")}>Add GST (exclusive)</button>
        <button className={`btn ${mode === "remove" ? "btn-primary" : ""}`} type="button" onClick={() => setMode("remove")}>Remove GST (inclusive)</button>
      </div>
      {result ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">₹{inr(result.base)}</div><div className="lbl">Base amount</div></div>
            <div className="stat"><div className="num">₹{inr(result.gst)}</div><div className="lbl">GST ({rate}%)</div></div>
            <div className="stat"><div className="num">₹{inr(result.total)}</div><div className="lbl">Total</div></div>
          </div>
          <p className="muted small" style={{ marginTop: 12 }}>
            Intra-state split: CGST ₹{inr(result.gst / 2)} + SGST ₹{inr(result.gst / 2)} (each {rate / 2}%).
          </p>
        </>
      ) : (
        <p className="muted">Enter an amount to calculate GST.</p>
      )}
    </div>
  );
}
