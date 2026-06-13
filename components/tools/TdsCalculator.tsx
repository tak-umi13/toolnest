"use client";

import { useMemo, useState } from "react";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);

// Common TDS sections and rates, FY 2025-26 (payee with valid PAN).
const SECTIONS = [
  { id: "194A", label: "194A — Interest (banks, deposits)", rate: 10 },
  { id: "194C-ind", label: "194C — Contractor payment (individual/HUF)", rate: 1 },
  { id: "194C-oth", label: "194C — Contractor payment (company/firm)", rate: 2 },
  { id: "194H", label: "194H — Commission or brokerage", rate: 2 },
  { id: "194I-pm", label: "194I — Rent: plant & machinery", rate: 2 },
  { id: "194I-lb", label: "194I — Rent: land or building", rate: 10 },
  { id: "194J-prof", label: "194J — Professional fees", rate: 10 },
  { id: "194J-tech", label: "194J — Technical services / call centre", rate: 2 },
] as const;

const NO_PAN_RATE = 20; // section 206AA: higher rate when PAN isn't furnished

export function TdsCalculator() {
  const [amount, setAmount] = useState(100000);
  const [sectionId, setSectionId] = useState<string>("194J-prof");
  const [hasPan, setHasPan] = useState(true);

  const r = useMemo(() => {
    const section = SECTIONS.find((s) => s.id === sectionId)!;
    const rate = hasPan ? section.rate : Math.max(section.rate, NO_PAN_RATE);
    const tds = (Math.max(0, amount) * rate) / 100;
    return { rate, tds, net: Math.max(0, amount) - tds, section };
  }, [amount, sectionId, hasPan]);

  return (
    <div>
      <div className="field">
        <label>Nature of payment (section)</label>
        <select className="select" value={sectionId} onChange={(e) => setSectionId(e.target.value)}>
          {SECTIONS.map((s) => <option key={s.id} value={s.id}>{s.label} — {s.rate}%</option>)}
        </select>
      </div>
      <div className="row">
        <div className="field"><label>Payment amount (₹)</label><input className="input" type="number" min={0} value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
        <div className="field">
          <label>Payee has PAN?</label>
          <select className="select" value={hasPan ? "yes" : "no"} onChange={(e) => setHasPan(e.target.value === "yes")}>
            <option value="yes">Yes — section rate applies</option>
            <option value="no">No — {NO_PAN_RATE}% under 206AA</option>
          </select>
        </div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{r.rate}%</div><div className="lbl">TDS rate</div></div>
        <div className="stat"><div className="num">₹{inr(r.tds)}</div><div className="lbl">TDS to deduct</div></div>
        <div className="stat"><div className="num">₹{inr(r.net)}</div><div className="lbl">Net payable</div></div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        FY 2025-26 rates for resident payees with PAN. Each section also has an
        annual threshold below which no TDS applies (e.g. ₹50,000 for bank
        interest, ₹30,000 per contract under 194C) — check the threshold for
        your section. TDS on salary (192) follows your slab instead; use the
        income tax calculator for that.
      </p>
    </div>
  );
}
