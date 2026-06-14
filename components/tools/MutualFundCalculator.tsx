"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

export function MutualFundCalculator() {
  const [mode, setMode] = useState<"sip" | "lumpsum">("sip");
  const [amount, setAmount] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const r = useMemo(() => {
    const n = years * 12;
    const i = rate / 100 / 12;
    if (mode === "sip") {
      // Future value of a monthly SIP (annuity-due, invested at month start).
      const fv = i === 0 ? amount * n : amount * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const invested = amount * n;
      return { future: fv, invested, gains: fv - invested };
    }
    const fv = amount * Math.pow(1 + rate / 100, years);
    return { future: fv, invested: amount, gains: fv - amount };
  }, [mode, amount, rate, years]);

  return (
    <div>
      <div className="field">
        <label>Investment type</label>
        <div className="btn-row">
          <button type="button" className={mode === "sip" ? "btn btn-primary" : "btn"} onClick={() => { setMode("sip"); setAmount(5000); }}>Monthly SIP</button>
          <button type="button" className={mode === "lumpsum" ? "btn btn-primary" : "btn"} onClick={() => { setMode("lumpsum"); setAmount(100000); }}>Lumpsum</button>
        </div>
      </div>
      <div className="row">
        <div className="field"><label>{mode === "sip" ? "Monthly investment (₹)" : "One-time investment (₹)"}</label><input className="input" type="number" min={0} value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
        <div className="field"><label>Expected return (% p.a.)</label><input className="input" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
        <div className="field"><label>Period (years)</label><input className="input" type="number" min={1} value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">₹{fmt(r.invested)}</div><div className="lbl">Invested</div></div>
        <div className="stat"><div className="num" style={{ color: "#16a34a" }}>₹{fmt(r.gains)}</div><div className="lbl">Est. returns</div></div>
        <div className="stat"><div className="num">₹{fmt(r.future)}</div><div className="lbl">Maturity value</div></div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Projects mutual-fund growth for a monthly SIP or a one-time lumpsum at a constant
        expected annual return. Real returns are market-linked and vary; this is a planning
        estimate, not a guarantee. Calculated in your browser.
      </p>
    </div>
  );
}
