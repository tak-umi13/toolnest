"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => "₱" + new Intl.NumberFormat("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
const TAX_EXEMPT = 90000;

export function ThirteenthMonthPay() {
  const [monthly, setMonthly] = useState(20000);
  const [months, setMonths] = useState(12);
  const [unpaid, setUnpaid] = useState(0);

  const r = useMemo(() => {
    const basicEarned = Math.max(0, monthly * Math.min(12, Math.max(0, months)) - unpaid);
    const pay = basicEarned / 12;
    const taxable = Math.max(0, pay - TAX_EXEMPT);
    return { pay, taxable };
  }, [monthly, months, unpaid]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Monthly basic salary (₱)</label><input className="input" type="number" min={0} value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} /></div>
        <div className="field"><label>Months worked this year</label><input className="input" type="number" min={0} max={12} value={months} onChange={(e) => setMonths(Number(e.target.value))} /></div>
        <div className="field"><label>Unpaid amount <span className="muted small">(absences)</span></label><input className="input" type="number" min={0} value={unpaid} onChange={(e) => setUnpaid(Number(e.target.value))} /></div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmt(r.pay)}</div><div className="lbl">13th month pay</div></div>
        <div className="stat"><div className="num">{r.taxable > 0 ? fmt(r.taxable) : "₱0"}</div><div className="lbl">Taxable portion</div></div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Under Philippine law, 13th month pay equals the total basic salary you earned during the
        year divided by 12. It&apos;s tax-exempt up to ₱90,000; only the excess is taxable. Basic
        salary excludes allowances and overtime. Calculated in your browser.
      </p>
    </div>
  );
}
