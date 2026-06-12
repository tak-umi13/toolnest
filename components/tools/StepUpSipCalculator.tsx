"use client";

import { useMemo, useState } from "react";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

export function StepUpSipCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [stepUp, setStepUp] = useState(10);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);
  const [showTable, setShowTable] = useState(false);

  const result = useMemo(() => {
    if (monthly <= 0 || years <= 0) return null;
    const r = rate / 12 / 100;
    let value = 0;
    let invested = 0;
    let sip = monthly;
    const rows: { year: number; sip: number; invested: number; value: number }[] = [];
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        value = (value + sip) * (1 + r);
        invested += sip;
      }
      rows.push({ year: y, sip, invested, value });
      sip = sip * (1 + stepUp / 100); // annual step-up
    }
    return { invested, value, gain: value - invested, rows };
  }, [monthly, stepUp, rate, years]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Starting monthly SIP (₹)</label><input className="input" type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} /></div>
        <div className="field"><label>Annual step-up (%)</label><input className="input" type="number" step="1" value={stepUp} onChange={(e) => setStepUp(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Expected return (% p.a.)</label><input className="input" type="number" step="0.5" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
        <div className="field"><label>Investment period (years)</label><input className="input" type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
      </div>
      {result ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">₹{inr(result.invested)}</div><div className="lbl">Total invested</div></div>
            <div className="stat"><div className="num">₹{inr(result.gain)}</div><div className="lbl">Estimated returns</div></div>
            <div className="stat"><div className="num">₹{inr(result.value)}</div><div className="lbl">Maturity value</div></div>
          </div>
          <div className="btn-row" style={{ marginTop: 12 }}>
            <button type="button" className="btn" onClick={() => setShowTable(!showTable)}>
              {showTable ? "Hide" : "Show"} year-by-year growth
            </button>
          </div>
          {showTable && (
            <div style={{ overflowX: "auto", marginTop: 12 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "right" }}>
                    <th style={{ textAlign: "left", padding: "8px 6px" }}>Year</th>
                    <th style={{ padding: "8px 6px" }}>Monthly SIP</th>
                    <th style={{ padding: "8px 6px" }}>Invested (cum.)</th>
                    <th style={{ padding: "8px 6px" }}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row) => (
                    <tr key={row.year} style={{ borderBottom: "1px solid var(--border)", textAlign: "right" }}>
                      <td style={{ textAlign: "left", padding: "6px" }}>{row.year}</td>
                      <td style={{ padding: "6px" }}>₹{inr(row.sip)}</td>
                      <td style={{ padding: "6px" }}>₹{inr(row.invested)}</td>
                      <td style={{ padding: "6px" }}>₹{inr(row.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <p className="muted">Enter your SIP details to project the maturity value.</p>
      )}
    </div>
  );
}
