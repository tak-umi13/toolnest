"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(Math.round(n));

const ASSETS = [
  { key: "cash", label: "Cash & bank balances" },
  { key: "investments", label: "Investments (stocks, funds, FD…)" },
  { key: "retirement", label: "Retirement accounts (EPF, NPS, 401k…)" },
  { key: "property", label: "Property / real estate" },
  { key: "vehicle", label: "Vehicles" },
  { key: "otherAssets", label: "Other assets" },
] as const;

const LIABILITIES = [
  { key: "homeLoan", label: "Home loan balance" },
  { key: "otherLoans", label: "Car / personal / student loans" },
  { key: "creditCards", label: "Credit card balances" },
  { key: "otherDebts", label: "Other debts" },
] as const;

export function NetWorthCalculator() {
  const [values, setValues] = useState<Record<string, number>>({
    cash: 10000, investments: 25000, retirement: 30000, property: 0, vehicle: 8000, otherAssets: 0,
    homeLoan: 0, otherLoans: 5000, creditCards: 1500, otherDebts: 0,
  });

  const set = (key: string, v: number) => setValues({ ...values, [key]: isNaN(v) ? 0 : v });

  const { assets, liabilities, netWorth } = useMemo(() => {
    const assets = ASSETS.reduce((s, a) => s + Math.max(0, values[a.key] || 0), 0);
    const liabilities = LIABILITIES.reduce((s, l) => s + Math.max(0, values[l.key] || 0), 0);
    return { assets, liabilities, netWorth: assets - liabilities };
  }, [values]);

  const group = (items: readonly { key: string; label: string }[]) =>
    items.map((item) => (
      <div className="field" key={item.key}>
        <label>{item.label}</label>
        <input className="input" type="number" min={0} value={values[item.key] || 0} onChange={(e) => set(item.key, Number(e.target.value))} />
      </div>
    ));

  return (
    <div>
      <div className="row">
        <div style={{ flex: 1, minWidth: 240 }}>
          <h3 style={{ marginTop: 0 }}>What you own</h3>
          {group(ASSETS)}
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <h3 style={{ marginTop: 0 }}>What you owe</h3>
          {group(LIABILITIES)}
        </div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmt(assets)}</div><div className="lbl">Total assets</div></div>
        <div className="stat"><div className="num">{fmt(liabilities)}</div><div className="lbl">Total liabilities</div></div>
        <div className="stat"><div className="num" style={netWorth < 0 ? { color: "var(--danger, #dc2626)" } : undefined}>{fmt(netWorth)}</div><div className="lbl">Net worth</div></div>
      </div>
    </div>
  );
}
