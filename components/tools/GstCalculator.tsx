"use client";

import { useMemo, useState } from "react";
import type { ToolParams } from "./ToolRenderer";

// Parametrized: the India page uses the default slabs + CGST/SGST split note;
// other GST countries (Australia 10%, NZ 15%…) pass their own rates/currency.
export function GstCalculator({ params }: { params?: ToolParams }) {
  const rates = String(params?.rates ?? "5,12,18,28,40").split(",").map(Number);
  const currency = String(params?.currency ?? "₹");
  const showSplit = params?.splitNote !== false;
  const fmt = (n: number) =>
    new Intl.NumberFormat(currency === "₹" ? "en-IN" : undefined, { maximumFractionDigits: 2 }).format(n);

  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(Number(params?.defaultRate ?? 18));
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
        <div className="field"><label>Amount ({currency})</label><input className="input" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
        <div className="field"><label>GST rate</label>
          <select className="select" value={rate} onChange={(e) => setRate(Number(e.target.value))}>
            {/* India: 5% and 18% are the main slabs since the Sept 2025
                rationalisation; 12%/28% remain for legacy invoices, 40% is the
                demerit rate. Other countries pass a single statutory rate. */}
            {rates.map((r) => <option key={r} value={r}>{r}%</option>)}
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
            <div className="stat"><div className="num">{currency}{fmt(result.base)}</div><div className="lbl">Base amount</div></div>
            <div className="stat"><div className="num">{currency}{fmt(result.gst)}</div><div className="lbl">GST ({rate}%)</div></div>
            <div className="stat"><div className="num">{currency}{fmt(result.total)}</div><div className="lbl">Total</div></div>
          </div>
          {showSplit && (
            <p className="muted small" style={{ marginTop: 12 }}>
              Intra-state split: CGST {currency}{fmt(result.gst / 2)} + SGST {currency}{fmt(result.gst / 2)} (each {rate / 2}%).
            </p>
          )}
        </>
      ) : (
        <p className="muted">Enter an amount to calculate GST.</p>
      )}
    </div>
  );
}
