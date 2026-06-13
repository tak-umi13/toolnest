"use client";

import { useMemo, useState } from "react";
import { UK_TAX_YEAR, STUDENT_PLANS, studentLoanRepayment, type StudentPlan } from "@/lib/ukTax";

const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(n);

const PLAN_KEYS = (Object.keys(STUDENT_PLANS) as StudentPlan[]).filter((k) => k !== "none");

export function StudentLoanRepaymentCalculator() {
  const [salary, setSalary] = useState(35000);
  const [plan, setPlan] = useState<StudentPlan>("plan2");

  const r = useMemo(() => {
    const p = STUDENT_PLANS[plan];
    const over = Math.max(0, salary - p.threshold);
    const annual = studentLoanRepayment(salary, plan);
    return { threshold: p.threshold, rate: p.rate, over, annual };
  }, [salary, plan]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Annual salary (£, gross)</label><input className="input" type="number" min={0} value={salary} onChange={(e) => setSalary(Number(e.target.value))} /></div>
        <div className="field">
          <label>Loan plan</label>
          <select className="select" value={plan} onChange={(e) => setPlan(e.target.value as StudentPlan)}>
            {PLAN_KEYS.map((k) => <option key={k} value={k}>{STUDENT_PLANS[k].label}</option>)}
          </select>
        </div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">£{gbp(r.annual / 12)}</div><div className="lbl">Monthly repayment</div></div>
        <div className="stat"><div className="num">£{gbp(r.annual)}</div><div className="lbl">Annual repayment</div></div>
        <div className="stat"><div className="num">£{gbp(r.threshold)}</div><div className="lbl">Plan threshold</div></div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        You repay {(r.rate * 100).toFixed(0)}% of income above £{gbp(r.threshold)}
        {r.over > 0 ? <> — that&apos;s {(r.rate * 100).toFixed(0)}% of £{gbp(r.over)}.</> : <> — your salary is below the threshold, so you repay nothing.</>}{" "}
        {UK_TAX_YEAR} thresholds; repayments are taken through PAYE before you&apos;re paid.
      </p>
    </div>
  );
}
