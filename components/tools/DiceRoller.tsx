"use client";

import { useState } from "react";

// Parse standard dice notation like "2d6+3" or "d20" or "3d8-1".
function parse(notation: string): { count: number; sides: number; mod: number } | null {
  const m = notation.trim().toLowerCase().replace(/\s/g, "").match(/^(\d*)d(\d+)([+-]\d+)?$/);
  if (!m) return null;
  const count = m[1] === "" ? 1 : parseInt(m[1], 10);
  const sides = parseInt(m[2], 10);
  const mod = m[3] ? parseInt(m[3], 10) : 0;
  if (count < 1 || count > 100 || sides < 2 || sides > 1000) return null;
  return { count, sides, mod };
}

const PRESETS = ["d4", "d6", "d8", "d10", "d12", "d20", "2d6"];

export function DiceRoller() {
  const [notation, setNotation] = useState("2d6");
  const [rolls, setRolls] = useState<number[]>([]);
  const [mod, setMod] = useState(0);
  const [error, setError] = useState("");

  function roll(n: string) {
    const p = parse(n);
    if (!p) { setError("Use dice notation like 2d6, d20 or 3d8+2."); setRolls([]); return; }
    setError("");
    const r = Array.from({ length: p.count }, () => 1 + Math.floor(Math.random() * p.sides));
    setRolls(r);
    setMod(p.mod);
  }

  const sum = rolls.reduce((s, n) => s + n, 0);
  const total = sum + mod;

  return (
    <div>
      <div className="field">
        <label htmlFor="dr">Dice notation</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input id="dr" className="input" value={notation} onChange={(e) => setNotation(e.target.value)} placeholder="2d6+3" onKeyDown={(e) => e.key === "Enter" && roll(notation)} />
          <button className="btn btn-primary" type="button" onClick={() => roll(notation)}>Roll</button>
        </div>
      </div>
      <div className="btn-row" style={{ flexWrap: "wrap", marginBottom: 12 }}>
        {PRESETS.map((p) => (
          <button key={p} type="button" className="btn" onClick={() => { setNotation(p); roll(p); }}>{p}</button>
        ))}
      </div>
      {error && <p className="small" style={{ color: "#ff6b6b" }}>{error}</p>}
      {rolls.length > 0 && (
        <div className="field">
          <div className="tool-output">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
              {rolls.map((r, i) => (
                <span key={i} style={{ display: "inline-flex", width: 40, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 8, background: "var(--accent, #2563eb)", color: "#fff", fontWeight: 700 }}>{r}</span>
              ))}
            </div>
            <div style={{ fontSize: "1.3rem", fontWeight: 700 }}>
              Total: {total}
              {rolls.length > 1 && <span className="muted small" style={{ fontWeight: 400 }}> (sum {sum}{mod ? `, ${mod > 0 ? "+" : ""}${mod}` : ""})</span>}
            </div>
          </div>
        </div>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Supports standard notation: <code>NdM</code> rolls N dice with M sides, and you can add
        a modifier (<code>2d6+3</code>). Great for tabletop RPGs and board games.
      </p>
    </div>
  );
}
