"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
const TIPS = [10, 15, 18, 20, 25];

export function TipCalculator() {
  const [bill, setBill] = useState(50);
  const [tipPct, setTipPct] = useState(18);
  const [people, setPeople] = useState(2);

  const r = useMemo(() => {
    const b = Math.max(0, bill || 0);
    const p = Math.max(1, Math.floor(people || 1));
    const tip = (b * (tipPct || 0)) / 100;
    const total = b + tip;
    return { tip, total, perPerson: total / p, tipPerPerson: tip / p };
  }, [bill, tipPct, people]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Bill amount</label><input className="input" type="number" min={0} value={bill} onChange={(e) => setBill(Number(e.target.value))} /></div>
        <div className="field"><label>Split between</label><input className="input" type="number" min={1} value={people} onChange={(e) => setPeople(Number(e.target.value))} /></div>
      </div>
      <div className="field">
        <label>Tip ({tipPct}%)</label>
        <div className="btn-row" style={{ marginBottom: 8 }}>
          {TIPS.map((t) => (
            <button key={t} type="button" className={t === tipPct ? "btn btn-primary" : "btn"} onClick={() => setTipPct(t)}>{t}%</button>
          ))}
        </div>
        <input type="range" min={0} max={30} value={tipPct} onChange={(e) => setTipPct(Number(e.target.value))} style={{ width: "100%" }} aria-label="Tip percentage" />
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmt(r.tip)}</div><div className="lbl">Tip</div></div>
        <div className="stat"><div className="num">{fmt(r.total)}</div><div className="lbl">Total</div></div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmt(r.perPerson)}</div><div className="lbl">Per person</div></div>
        <div className="stat"><div className="num">{fmt(r.tipPerPerson)}</div><div className="lbl">Tip / person</div></div>
      </div>
    </div>
  );
}
