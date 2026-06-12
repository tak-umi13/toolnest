"use client";

import { useMemo, useState } from "react";
import { newRegimeTax, STANDARD_DEDUCTION } from "@/lib/incomeTax";

const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

// CTC → in-hand: a simplified but honest model. Employer PF (12% of basic) is
// part of CTC at most companies; employee PF (12% of basic) and income tax
// (new regime) come out of gross; professional tax is a small state levy.
export function SalaryCalculator() {
  const [ctc, setCtc] = useState(1200000);
  const [basicPct, setBasicPct] = useState(40);
  const [pfIncluded, setPfIncluded] = useState(true);
  const [profTax, setProfTax] = useState(200);

  const result = useMemo(() => {
    if (ctc <= 0) return null;
    const basic = (ctc * basicPct) / 100;
    const employerPf = 0.12 * basic;
    const gross = pfIncluded ? ctc - employerPf : ctc;
    const employeePf = 0.12 * basic;
    const taxable = Math.max(0, gross - STANDARD_DEDUCTION);
    const tax = newRegimeTax(taxable).total;
    const annualInHand = gross - employeePf - tax - profTax * 12;
    return { gross, employeePf, tax, annualInHand, monthly: annualInHand / 12 };
  }, [ctc, basicPct, pfIncluded, profTax]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Annual CTC (₹)</label><input className="input" type="number" value={ctc} onChange={(e) => setCtc(Number(e.target.value))} /></div>
        <div className="field"><label>Basic salary (% of CTC)</label><input className="input" type="number" min={10} max={100} value={basicPct} onChange={(e) => setBasicPct(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Professional tax (₹/month)</label><input className="input" type="number" value={profTax} onChange={(e) => setProfTax(Number(e.target.value))} /></div>
        <div className="field" style={{ display: "flex", alignItems: "end" }}>
          <label className="small" style={{ fontWeight: 400 }}>
            <input type="checkbox" checked={pfIncluded} onChange={(e) => setPfIncluded(e.target.checked)} /> Employer PF is part of CTC
          </label>
        </div>
      </div>
      {result ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">₹{inr(result.monthly)}</div><div className="lbl">Monthly in-hand</div></div>
            <div className="stat"><div className="num">₹{inr(result.annualInHand)}</div><div className="lbl">Annual in-hand</div></div>
            <div className="stat"><div className="num">₹{inr(result.tax)}</div><div className="lbl">Income tax / year</div></div>
            <div className="stat"><div className="num">₹{inr(result.employeePf / 12)}</div><div className="lbl">Your PF / month</div></div>
          </div>
          <p className="muted small" style={{ marginTop: 12 }}>
            Assumes the new tax regime with the ₹{inr(STANDARD_DEDUCTION)} standard deduction. Actual in-hand varies with your company&apos;s salary structure (HRA, allowances, gratuity provision), state professional tax and any voluntary deductions.
          </p>
        </>
      ) : (
        <p className="muted">Enter your CTC to estimate the monthly take-home.</p>
      )}
    </div>
  );
}
