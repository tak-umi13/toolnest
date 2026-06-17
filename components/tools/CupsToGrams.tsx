"use client";

import { useMemo, useState } from "react";

// Grams per US cup for common baking ingredients (volume↔weight needs density).
const INGREDIENTS: { name: string; gPerCup: number }[] = [
  { name: "Water", gPerCup: 236.6 },
  { name: "Milk", gPerCup: 244 },
  { name: "All-purpose flour", gPerCup: 125 },
  { name: "Bread flour", gPerCup: 127 },
  { name: "Granulated sugar", gPerCup: 200 },
  { name: "Brown sugar (packed)", gPerCup: 220 },
  { name: "Powdered sugar", gPerCup: 120 },
  { name: "Butter", gPerCup: 227 },
  { name: "Vegetable oil", gPerCup: 218 },
  { name: "Honey", gPerCup: 340 },
  { name: "Rice (uncooked)", gPerCup: 185 },
  { name: "Rolled oats", gPerCup: 90 },
  { name: "Cocoa powder", gPerCup: 100 },
  { name: "Salt (table)", gPerCup: 292 },
];

// Volume units as a fraction of one US cup.
const VOL: Record<string, number> = { Cups: 1, Tablespoons: 1 / 16, Teaspoons: 1 / 48, Milliliters: 1 / 236.5882365 };

export function CupsToGrams() {
  const [mode, setMode] = useState<"v2w" | "w2v">("v2w");
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState("Cups");
  const [ingredient, setIngredient] = useState(2); // all-purpose flour
  const [grams, setGrams] = useState(125);

  const gPerCup = INGREDIENTS[ingredient].gPerCup;

  const r = useMemo(() => {
    if (mode === "v2w") {
      const cups = Math.max(0, amount) * VOL[unit];
      const g = cups * gPerCup;
      return { grams: g, oz: g / 28.349523125 };
    }
    const cups = Math.max(0, grams) / gPerCup;
    return { cups, tbsp: cups * 16, ml: cups * 236.5882365 };
  }, [mode, amount, unit, grams, gPerCup]);

  const fmt = (n: number) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);

  return (
    <div>
      <div className="field">
        <label>Direction</label>
        <div className="btn-row">
          <button type="button" className={mode === "v2w" ? "btn btn-primary" : "btn"} onClick={() => setMode("v2w")}>Cups → Grams</button>
          <button type="button" className={mode === "w2v" ? "btn btn-primary" : "btn"} onClick={() => setMode("w2v")}>Grams → Cups</button>
        </div>
      </div>
      <div className="field">
        <label htmlFor="cg-ing">Ingredient</label>
        <select id="cg-ing" className="select" value={ingredient} onChange={(e) => setIngredient(Number(e.target.value))}>
          {INGREDIENTS.map((i, idx) => <option key={i.name} value={idx}>{i.name}</option>)}
        </select>
      </div>
      {mode === "v2w" ? (
        <div className="row">
          <div className="field"><label>Amount</label><input className="input" type="number" min={0} step="any" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
          <div className="field"><label>Unit</label>
            <select className="select" value={unit} onChange={(e) => setUnit(e.target.value)}>{Object.keys(VOL).map((u) => <option key={u} value={u}>{u}</option>)}</select>
          </div>
        </div>
      ) : (
        <div className="field" style={{ maxWidth: 220 }}><label>Grams</label><input className="input" type="number" min={0} step="any" value={grams} onChange={(e) => setGrams(Number(e.target.value))} /></div>
      )}
      <div className="stat-row">
        {mode === "v2w" ? (
          <>
            <div className="stat"><div className="num">{fmt(r.grams!)} g</div><div className="lbl">Grams</div></div>
            <div className="stat"><div className="num">{fmt(r.oz!)} oz</div><div className="lbl">Ounces</div></div>
          </>
        ) : (
          <>
            <div className="stat"><div className="num">{fmt(r.cups!)}</div><div className="lbl">Cups</div></div>
            <div className="stat"><div className="num">{fmt(r.tbsp!)}</div><div className="lbl">Tablespoons</div></div>
            <div className="stat"><div className="num">{fmt(r.ml!)} ml</div><div className="lbl">Millilitres</div></div>
          </>
        )}
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Cups are a measure of volume and grams a measure of weight, so the conversion depends on
        the ingredient — a cup of flour (≈125 g) weighs far less than a cup of honey (≈340 g).
        Values use US cups and are typical averages; pack and level for accuracy. Runs in your browser.
      </p>
    </div>
  );
}
