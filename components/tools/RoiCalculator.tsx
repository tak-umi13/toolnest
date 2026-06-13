"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);

export function RoiCalculator() {
  const [initial, setInitial] = useState(10000);
  const [final, setFinal] = useState(13500);
  const [years, setYears] = useState(3);

  const r = useMemo(() => {
    const gain = final - initial;
    const roi = initial > 0 ? (gain / initial) * 100 : 0;
    const annualized = initial > 0 && years > 0 ? (Math.pow(final / initial, 1 / years) - 1) * 100 : null;
    return { gain, roi, annualized };
  }, [initial, final, years]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Initial investment</label><input className="input" type="number" value={initial} onChange={(e) => setInitial(Number(e.target.value))} /></div>
        <div className="field"><label>Final value</label><input className="input" type="number" value={final} onChange={(e) => setFinal(Number(e.target.value))} /></div>
        <div className="field"><label>Holding period (years)</label><input className="input" type="number" min={0} step="0.5" value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num" style={{ color: r.gain >= 0 ? "#5bd17a" : "#ff6b6b" }}>{r.gain >= 0 ? "+" : ""}{fmt(r.gain)}</div><div className="lbl">Net gain</div></div>
        <div className="stat"><div className="num" style={{ color: r.roi >= 0 ? "#5bd17a" : "#ff6b6b" }}>{fmt(r.roi)}%</div><div className="lbl">Total ROI</div></div>
        {r.annualized !== null && <div className="stat"><div className="num">{fmt(r.annualized)}%</div><div className="lbl">Annualized</div></div>}
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        ROI = (final − initial) ÷ initial. The annualized figure (CAGR) shows the equivalent
        steady yearly return, which lets you compare investments held for different lengths of time.
      </p>
    </div>
  );
}
