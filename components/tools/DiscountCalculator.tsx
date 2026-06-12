"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);

export function DiscountCalculator() {
  const [price, setPrice] = useState(2000);
  const [discount, setDiscount] = useState(25);

  const result = useMemo(() => {
    if (price < 0) return null;
    const saved = (price * discount) / 100;
    return { saved, final: price - saved };
  }, [price, discount]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Original price</label><input className="input" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></div>
        <div className="field"><label>Discount (%)</label><input className="input" type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} /></div>
      </div>
      {result && (
        <div className="stat-row">
          <div className="stat"><div className="num">{fmt(result.saved)}</div><div className="lbl">You save</div></div>
          <div className="stat"><div className="num">{fmt(result.final)}</div><div className="lbl">Final price</div></div>
        </div>
      )}
    </div>
  );
}
