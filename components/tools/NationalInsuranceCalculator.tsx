"use client";

import { useMemo, useState } from "react";
import { UK_TAX_YEAR, NI_PRIMARY_THRESHOLD, NI_UPPER_LIMIT, nationalInsurance } from "@/lib/ukTax";

const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(n);

export function NationalInsuranceCalculator() {
  const [salary, setSalary] = useState(35000);

  const r = useMemo(() => {
    if (salary <= 0) return null;
    const mainBand = Math.max(0, Math.min(salary, NI_UPPER_LIMIT) - NI_PRIMARY_THRESHOLD);
    const upperBand = Math.max(0, salary - NI_UPPER_LIMIT);
    const total = nationalInsurance(salary);
    return { mainBand, mainNi: mainBand * 0.08, upperBand, upperNi: upperBand * 0.02, total };
  }, [salary]);

  return (
    <div>
      <div className="field">
        <label>Annual salary (£, gross)</label>
        <input className="input" type="number" min={0} value={salary} onChange={(e) => setSalary(Number(e.target.value))} />
      </div>
      {r && (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">£{gbp(r.total / 12)}</div><div className="lbl">Monthly NI</div></div>
            <div className="stat"><div className="num">£{gbp(r.total)}</div><div className="lbl">Annual NI</div></div>
            <div className="stat"><div className="num">£{gbp(r.total / 52)}</div><div className="lbl">Weekly NI</div></div>
          </div>
          <div style={{ overflowX: "auto", marginTop: 12 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "right" }}>
                  <th style={{ textAlign: "left", padding: "8px 6px" }}>Band</th>
                  <th style={{ padding: "8px 6px" }}>Earnings in band</th>
                  <th style={{ padding: "8px 6px" }}>Rate</th>
                  <th style={{ padding: "8px 6px" }}>NI</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--border)", textAlign: "right" }}>
                  <td style={{ textAlign: "left", padding: 6 }}>Up to £{gbp(NI_PRIMARY_THRESHOLD)}</td>
                  <td style={{ padding: 6 }}>£{gbp(Math.min(salary, NI_PRIMARY_THRESHOLD))}</td>
                  <td style={{ padding: 6 }}>0%</td><td style={{ padding: 6 }}>£0</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)", textAlign: "right" }}>
                  <td style={{ textAlign: "left", padding: 6 }}>£{gbp(NI_PRIMARY_THRESHOLD)} – £{gbp(NI_UPPER_LIMIT)}</td>
                  <td style={{ padding: 6 }}>£{gbp(r.mainBand)}</td>
                  <td style={{ padding: 6 }}>8%</td><td style={{ padding: 6 }}>£{gbp(r.mainNi)}</td>
                </tr>
                <tr style={{ textAlign: "right" }}>
                  <td style={{ textAlign: "left", padding: 6 }}>Above £{gbp(NI_UPPER_LIMIT)}</td>
                  <td style={{ padding: 6 }}>£{gbp(r.upperBand)}</td>
                  <td style={{ padding: 6 }}>2%</td><td style={{ padding: 6 }}>£{gbp(r.upperNi)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="muted small" style={{ marginTop: 10 }}>
            Employee Class 1 contributions, {UK_TAX_YEAR}, annualised thresholds.
            The self-employed pay Class 4 at different rates.
          </p>
        </>
      )}
    </div>
  );
}
