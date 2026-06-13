"use client";

import { useMemo, useState } from "react";
import {
  UK_TAX_YEAR,
  personalAllowance,
  incomeTax,
  nationalInsurance,
  studentLoanRepayment,
  STUDENT_PLANS,
  type StudentPlan,
} from "@/lib/ukTax";

const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(Math.round(n));

export function UkSalaryCalculator() {
  const [salary, setSalary] = useState(35000);
  const [pensionPct, setPensionPct] = useState(5);
  const [plan, setPlan] = useState<StudentPlan>("none");

  const r = useMemo(() => {
    if (salary <= 0) return null;
    // Pension modelled as salary sacrifice: reduces pay for both tax and NI.
    const pension = (salary * Math.max(0, pensionPct)) / 100;
    const taxableGross = salary - pension;
    const tax = incomeTax(taxableGross);
    const ni = nationalInsurance(taxableGross);
    const loan = studentLoanRepayment(taxableGross, plan);
    const takeHome = taxableGross - tax - ni - loan;
    return { pension, pa: personalAllowance(taxableGross), tax, ni, loan, takeHome };
  }, [salary, pensionPct, plan]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Annual salary (£, gross)</label><input className="input" type="number" min={0} value={salary} onChange={(e) => setSalary(Number(e.target.value))} /></div>
        <div className="field"><label>Pension (% of salary, salary sacrifice)</label><input className="input" type="number" step="0.5" min={0} value={pensionPct} onChange={(e) => setPensionPct(Number(e.target.value))} /></div>
      </div>
      <div className="field">
        <label>Student loan plan</label>
        <select className="select" value={plan} onChange={(e) => setPlan(e.target.value as StudentPlan)}>
          {Object.entries(STUDENT_PLANS).map(([k, p]) => (
            <option key={k} value={k}>{p.label}</option>
          ))}
        </select>
      </div>
      {r && (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">£{gbp(r.takeHome / 12)}</div><div className="lbl">Monthly take-home</div></div>
            <div className="stat"><div className="num">£{gbp(r.takeHome)}</div><div className="lbl">Annual take-home</div></div>
            <div className="stat"><div className="num">£{gbp(r.takeHome / 52)}</div><div className="lbl">Weekly</div></div>
          </div>
          <div style={{ overflowX: "auto", marginTop: 12 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--border)" }}><td style={{ padding: 6 }}>Gross salary</td><td style={{ padding: 6, textAlign: "right" }}>£{gbp(salary)}</td></tr>
                {r.pension > 0 && <tr style={{ borderBottom: "1px solid var(--border)" }}><td style={{ padding: 6 }}>Pension contribution</td><td style={{ padding: 6, textAlign: "right" }}>−£{gbp(r.pension)}</td></tr>}
                <tr style={{ borderBottom: "1px solid var(--border)" }}><td style={{ padding: 6 }}>Personal allowance</td><td style={{ padding: 6, textAlign: "right" }}>£{gbp(r.pa)}</td></tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}><td style={{ padding: 6 }}>Income tax</td><td style={{ padding: 6, textAlign: "right" }}>−£{gbp(r.tax)}</td></tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}><td style={{ padding: 6 }}>National Insurance</td><td style={{ padding: 6, textAlign: "right" }}>−£{gbp(r.ni)}</td></tr>
                {r.loan > 0 && <tr style={{ borderBottom: "1px solid var(--border)" }}><td style={{ padding: 6 }}>Student loan</td><td style={{ padding: 6, textAlign: "right" }}>−£{gbp(r.loan)}</td></tr>}
                <tr><td style={{ padding: 6, fontWeight: 600 }}>Take-home pay</td><td style={{ padding: 6, textAlign: "right", fontWeight: 600 }}>£{gbp(r.takeHome)}</td></tr>
              </tbody>
            </table>
          </div>
          <p className="muted small" style={{ marginTop: 10 }}>
            {UK_TAX_YEAR} rates, England/Wales/NI bands (Scottish income-tax bands
            differ). Pension is modelled as salary sacrifice, reducing both tax and NI.
          </p>
        </>
      )}
    </div>
  );
}
