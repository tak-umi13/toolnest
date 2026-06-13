"use client";

import { useMemo, useState } from "react";

const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(n);

// UK CGT 2025/26: £3,000 annual exempt amount; gains then taxed 18% within
// your unused basic-rate band and 24% above it (same rates for all assets
// since 30 Oct 2024).
const ALLOWANCE = 3000;
const PERSONAL_ALLOWANCE = 12570;
const BASIC_LIMIT = 37700;

export function CapitalGainsTaxCalculator() {
  const [gain, setGain] = useState(20000);
  const [income, setIncome] = useState(35000);

  const r = useMemo(() => {
    const taxableGain = Math.max(0, gain - ALLOWANCE);
    const taxableIncome = Math.max(0, income - PERSONAL_ALLOWANCE);
    const basicLeft = Math.max(0, BASIC_LIMIT - taxableIncome);
    const atLower = Math.min(taxableGain, basicLeft);
    const atHigher = taxableGain - atLower;
    const tax = atLower * 0.18 + atHigher * 0.24;
    return { taxableGain, basicLeft, atLower, atHigher, tax, net: gain - tax };
  }, [gain, income]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Total capital gain (£)</label><input className="input" type="number" min={0} value={gain} onChange={(e) => setGain(Number(e.target.value))} /></div>
        <div className="field"><label>Your taxable income (£, salary etc.)</label><input className="input" type="number" min={0} value={income} onChange={(e) => setIncome(Number(e.target.value))} /></div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">£{gbp(r.taxableGain)}</div><div className="lbl">Taxable gain (after £{gbp(ALLOWANCE)} allowance)</div></div>
        <div className="stat"><div className="num">£{gbp(r.tax)}</div><div className="lbl">Capital gains tax</div></div>
        <div className="stat"><div className="num">£{gbp(r.net)}</div><div className="lbl">Gain after tax</div></div>
      </div>
      {r.taxableGain > 0 && (
        <p className="muted small" style={{ marginTop: 10 }}>
          £{gbp(r.atLower)} taxed at 18% (within your unused basic-rate band of £{gbp(r.basicLeft)})
          {r.atHigher > 0 && <> and £{gbp(r.atHigher)} at 24%</>}. 2025/26 rules — the
          £{gbp(ALLOWANCE)} annual exempt amount and 18%/24% rates apply to disposals
          from 30 October 2024.
        </p>
      )}
    </div>
  );
}
