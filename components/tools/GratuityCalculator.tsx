"use client";

import { useMemo, useState } from "react";

const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

// Payment of Gratuity Act formula: (15/26) × last drawn salary (basic + DA) ×
// completed years of service, statutorily capped at ₹20 lakh.
const CAP = 2000000;

export function GratuityCalculator() {
  const [salary, setSalary] = useState(50000);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    if (salary <= 0 || years <= 0) return null;
    const raw = (15 / 26) * salary * years;
    return { raw, payable: Math.min(raw, CAP), capped: raw > CAP };
  }, [salary, years]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Last drawn monthly salary — basic + DA (₹)</label><input className="input" type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} /></div>
        <div className="field"><label>Completed years of service</label><input className="input" type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} /></div>
      </div>
      {result ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">₹{inr(result.payable)}</div><div className="lbl">Gratuity payable</div></div>
            <div className="stat"><div className="num">15/26 × {years}</div><div className="lbl">Formula factor</div></div>
          </div>
          {result.capped && (
            <p className="muted small" style={{ marginTop: 10 }}>
              The formula gives ₹{inr(result.raw)}, but the statutory maximum under the Act is ₹20,00,000.
            </p>
          )}
          {years < 5 && (
            <p className="muted small" style={{ marginTop: 10 }}>
              ⚠ Gratuity normally becomes payable only after 5 continuous years of service (waived in case of death or disablement).
            </p>
          )}
        </>
      ) : (
        <p className="muted">Enter your salary and years of service.</p>
      )}
    </div>
  );
}
