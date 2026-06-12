"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);

// Nisab thresholds in the classical weights: 87.48 g gold or 612.36 g silver.
const NISAB_GOLD_GRAMS = 87.48;
const NISAB_SILVER_GRAMS = 612.36;
const ZAKAT_RATE = 0.025; // 2.5% of zakatable wealth held for one lunar year

const WEALTH_FIELDS = [
  { key: "cash", label: "Cash in hand & bank accounts" },
  { key: "gold", label: "Gold value (jewellery, coins, bars)" },
  { key: "silver", label: "Silver value" },
  { key: "investments", label: "Shares, funds & crypto (current value)" },
  { key: "business", label: "Business inventory & trade goods" },
  { key: "receivables", label: "Money owed to you (recoverable)" },
] as const;

export function ZakatCalculator() {
  const [values, setValues] = useState<Record<string, number>>({
    cash: 5000, gold: 0, silver: 0, investments: 2000, business: 0, receivables: 0,
  });
  const [debts, setDebts] = useState(0);
  const [nisabBasis, setNisabBasis] = useState<"silver" | "gold">("silver");
  const [goldPrice, setGoldPrice] = useState(75);
  const [silverPrice, setSilverPrice] = useState(0.95);

  const set = (key: string, v: number) => setValues({ ...values, [key]: isNaN(v) ? 0 : v });

  const r = useMemo(() => {
    const assets = WEALTH_FIELDS.reduce((s, f) => s + Math.max(0, values[f.key] || 0), 0);
    const net = Math.max(0, assets - Math.max(0, debts));
    const nisab =
      nisabBasis === "gold" ? NISAB_GOLD_GRAMS * goldPrice : NISAB_SILVER_GRAMS * silverPrice;
    const due = net >= nisab && nisab > 0;
    return { assets, net, nisab, due, zakat: due ? net * ZAKAT_RATE : 0 };
  }, [values, debts, nisabBasis, goldPrice, silverPrice]);

  return (
    <div>
      {WEALTH_FIELDS.map((f) => (
        <div className="field" key={f.key}>
          <label>{f.label}</label>
          <input className="input" type="number" min={0} value={values[f.key] || 0} onChange={(e) => set(f.key, Number(e.target.value))} />
        </div>
      ))}
      <div className="field">
        <label>Minus: debts due now (bills, instalments currently payable)</label>
        <input className="input" type="number" min={0} value={debts} onChange={(e) => setDebts(Number(e.target.value))} />
      </div>
      <div className="row">
        <div className="field">
          <label>Nisab basis</label>
          <select className="select" value={nisabBasis} onChange={(e) => setNisabBasis(e.target.value as "silver" | "gold")}>
            <option value="silver">Silver ({NISAB_SILVER_GRAMS} g) — recommended</option>
            <option value="gold">Gold ({NISAB_GOLD_GRAMS} g)</option>
          </select>
        </div>
        <div className="field">
          <label>{nisabBasis === "gold" ? "Gold" : "Silver"} price per gram</label>
          {nisabBasis === "gold" ? (
            <input className="input" type="number" step="0.01" min={0} value={goldPrice} onChange={(e) => setGoldPrice(Number(e.target.value))} />
          ) : (
            <input className="input" type="number" step="0.01" min={0} value={silverPrice} onChange={(e) => setSilverPrice(Number(e.target.value))} />
          )}
        </div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmt(r.net)}</div><div className="lbl">Zakatable wealth</div></div>
        <div className="stat"><div className="num">{fmt(r.nisab)}</div><div className="lbl">Nisab threshold</div></div>
        <div className="stat">
          <div className="num">{r.due ? fmt(r.zakat) : "0"}</div>
          <div className="lbl">{r.due ? "Zakat due (2.5%)" : "Below nisab — no zakat due"}</div>
        </div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Zakat is 2.5% of zakatable wealth held for one full lunar year above the
        nisab. Most scholars recommend the silver nisab so more wealth qualifies
        for charity. Enter metal prices in your own currency — all figures stay
        in that currency.
      </p>
    </div>
  );
}
