"use client";

import { useMemo, useState } from "react";

const inr = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

// HRA exemption (old tax regime) = least of: actual HRA received,
// rent paid − 10% of basic+DA, and 50% (metro) / 40% (non-metro) of basic+DA.
export function HraCalculator() {
  const [basic, setBasic] = useState(40000);
  const [hra, setHra] = useState(20000);
  const [rent, setRent] = useState(15000);
  const [metro, setMetro] = useState(true);

  const result = useMemo(() => {
    if (basic <= 0 || hra < 0 || rent < 0) return null;
    const limb1 = hra;
    const limb2 = Math.max(0, rent - 0.1 * basic);
    const limb3 = (metro ? 0.5 : 0.4) * basic;
    const exempt = Math.max(0, Math.min(limb1, limb2, limb3));
    return { limb1, limb2, limb3, exempt, taxable: hra - exempt };
  }, [basic, hra, rent, metro]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Monthly basic + DA (₹)</label><input className="input" type="number" value={basic} onChange={(e) => setBasic(Number(e.target.value))} /></div>
        <div className="field"><label>HRA received per month (₹)</label><input className="input" type="number" value={hra} onChange={(e) => setHra(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Rent paid per month (₹)</label><input className="input" type="number" value={rent} onChange={(e) => setRent(Number(e.target.value))} /></div>
        <div className="field"><label>City type</label>
          <select className="select" value={metro ? "metro" : "non"} onChange={(e) => setMetro(e.target.value === "metro")}>
            <option value="metro">Metro (Delhi, Mumbai, Kolkata, Chennai) — 50%</option>
            <option value="non">Non-metro — 40%</option>
          </select>
        </div>
      </div>
      {result ? (
        <>
          <div className="stat-row">
            <div className="stat"><div className="num">₹{inr(result.exempt)}</div><div className="lbl">Exempt / month</div></div>
            <div className="stat"><div className="num">₹{inr(result.taxable)}</div><div className="lbl">Taxable / month</div></div>
            <div className="stat"><div className="num">₹{inr(result.exempt * 12)}</div><div className="lbl">Exempt / year</div></div>
          </div>
          <p className="muted small" style={{ marginTop: 12 }}>
            Least of: actual HRA ₹{inr(result.limb1)} · rent − 10% of basic ₹{inr(result.limb2)} · {metro ? "50%" : "40%"} of basic ₹{inr(result.limb3)}. HRA exemption applies under the old tax regime only.
          </p>
        </>
      ) : (
        <p className="muted">Enter your salary, HRA and rent details.</p>
      )}
    </div>
  );
}
