"use client";

import { useMemo, useState } from "react";

const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

export function SwpCalculator() {
  const [corpus, setCorpus] = useState(2000000);
  const [withdrawal, setWithdrawal] = useState(15000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    if (corpus <= 0 || withdrawal <= 0 || years <= 0) return null;
    const i = rate / 12 / 100;
    const n = years * 12;
    const growth = Math.pow(1 + i, n);
    const fv = i === 0 ? corpus - withdrawal * n : corpus * growth - withdrawal * ((growth - 1) / i);

    if (fv >= 0) {
      return { lasts: true as const, fv, withdrawn: withdrawal * n };
    }
    // Corpus exhausts: months until it runs out (valid when withdrawal outpaces growth).
    const exhaustMonths =
      i > 0 && withdrawal > corpus * i
        ? Math.log(withdrawal / (withdrawal - corpus * i)) / Math.log(1 + i)
        : corpus / withdrawal;
    return { lasts: false as const, months: Math.floor(exhaustMonths), withdrawn: withdrawal * Math.floor(exhaustMonths) };
  }, [corpus, withdrawal, rate, years]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Starting corpus (₹)</label><input className="input" type="number" value={corpus} onChange={(e) => setCorpus(Number(e.target.value))} /></div>
        <div className="field"><label>Monthly withdrawal (₹)</label><input className="input" type="number" value={withdrawal} onChange={(e) => setWithdrawal(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Expected return (% p.a.)</label><input className="input" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></div>
        <div className="field"><label>Withdrawal period (years)</label><input className="input" type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
      </div>
      {result ? (
        result.lasts ? (
          <div className="stat-row">
            <div className="stat"><div className="num">₹{inr(result.withdrawn)}</div><div className="lbl">Total withdrawn</div></div>
            <div className="stat"><div className="num">₹{inr(result.fv)}</div><div className="lbl">Corpus left after {years}y</div></div>
          </div>
        ) : (
          <>
            <div className="stat-row">
              <div className="stat"><div className="num">{Math.floor(result.months / 12)}y {result.months % 12}m</div><div className="lbl">Corpus lasts</div></div>
              <div className="stat"><div className="num">₹{inr(result.withdrawn)}</div><div className="lbl">Total withdrawn</div></div>
            </div>
            <p className="muted small" style={{ marginTop: 12 }}>
              ⚠ At ₹{inr(withdrawal)}/month the corpus runs out before {years} years. Lower the withdrawal or assume a higher return to make it last.
            </p>
          </>
        )
      ) : (
        <p className="muted">Enter your corpus, monthly withdrawal, return and period.</p>
      )}
    </div>
  );
}
