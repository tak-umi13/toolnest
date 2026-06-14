"use client";

import { useMemo, useState } from "react";

// South Africa UIF: 1% of remuneration from the employee + 1% from the
// employer, on a monthly earnings ceiling of R17,712 (so max R177.12 each).
const CEILING = 17712;
const RATE = 0.01;

const fmt = (n: number) => "R" + new Intl.NumberFormat("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

export function UifCalculator() {
  const [gross, setGross] = useState(20000);

  const r = useMemo(() => {
    const base = Math.min(Math.max(0, gross), CEILING);
    const employee = base * RATE;
    return { employee, employer: employee, total: employee * 2, capped: gross > CEILING };
  }, [gross]);

  return (
    <div>
      <div className="field" style={{ maxWidth: 280 }}>
        <label>Monthly gross salary (R)</label>
        <input className="input" type="number" min={0} value={gross} onChange={(e) => setGross(Number(e.target.value))} />
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmt(r.employee)}</div><div className="lbl">Employee (1%)</div></div>
        <div className="stat"><div className="num">{fmt(r.employer)}</div><div className="lbl">Employer (1%)</div></div>
        <div className="stat"><div className="num">{fmt(r.total)}</div><div className="lbl">Total to UIF</div></div>
      </div>
      {r.capped && (
        <p className="small" style={{ marginTop: 8 }}>
          Salary is above the R{CEILING.toLocaleString("en-ZA")} ceiling, so contributions are
          capped at R177.12 each.
        </p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        The Unemployment Insurance Fund takes 1% from the employee and 1% from the employer,
        on monthly earnings up to R{CEILING.toLocaleString("en-ZA")}. The employee&apos;s 1% is
        deducted from pay; the employer pays its 1% on top. Calculated in your browser.
      </p>
    </div>
  );
}
