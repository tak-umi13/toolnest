"use client";

import { useMemo, useState } from "react";
import { newRegimeTax, STANDARD_DEDUCTION } from "@/lib/incomeTax";

const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

export function IncomeTaxCalculator() {
  const [income, setIncome] = useState(1500000);
  const [salaried, setSalaried] = useState(true);

  const result = useMemo(() => {
    if (income <= 0) return null;
    const taxable = Math.max(0, income - (salaried ? STANDARD_DEDUCTION : 0));
    const t = newRegimeTax(taxable);
    return { taxable, ...t, effective: income > 0 ? (t.total / income) * 100 : 0 };
  }, [income, salaried]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Annual income (₹)</label><input className="input" type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} /></div>
        <div className="field"><label>Income type</label>
          <select className="select" value={salaried ? "salaried" : "other"} onChange={(e) => setSalaried(e.target.value === "salaried")}>
            <option value="salaried">Salaried (₹75,000 standard deduction)</option>
            <option value="other">Other income (no standard deduction)</option>
          </select>
        </div>
      </div>
      {result ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">₹{inr(result.taxable)}</div><div className="lbl">Taxable income</div></div>
            <div className="stat"><div className="num">₹{inr(result.total)}</div><div className="lbl">Total tax (incl. cess)</div></div>
            <div className="stat"><div className="num">{result.effective.toFixed(1)}%</div><div className="lbl">Effective rate</div></div>
            <div className="stat"><div className="num">₹{inr(result.total / 12)}</div><div className="lbl">≈ Monthly TDS</div></div>
          </div>
          {result.total === 0 && (
            <p className="muted small" style={{ marginTop: 10 }}>
              ✓ Zero tax — the §87A rebate makes taxable income up to ₹12,00,000 tax-free under the new regime.
            </p>
          )}
          <p className="muted small" style={{ marginTop: 10 }}>
            New tax regime, FY 2025-26 (AY 2026-27), resident individual. Slab tax ₹{inr(result.slabTax)} + 4% cess ₹{inr(result.cess)}. The old regime, surcharge on very high incomes and other deductions are not modelled — verify with a CA for filing.
          </p>
        </>
      ) : (
        <p className="muted">Enter your annual income.</p>
      )}
    </div>
  );
}
