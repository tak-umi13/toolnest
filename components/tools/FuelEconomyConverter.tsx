"use client";

import { useMemo, useState } from "react";

// Fuel economy units don't share a linear factor: mpg and km/L measure distance
// per fuel, while L/100km measures fuel per distance (inverse). So we convert
// everything through a common base of liters-per-100km.
const KM_PER_MILE = 1.609344;
const L_PER_US_GAL = 3.785411784;
const L_PER_UK_GAL = 4.54609;

type Unit = "mpgUS" | "mpgUK" | "kml" | "l100";

const UNITS: { id: Unit; label: string }[] = [
  { id: "mpgUS", label: "MPG (US)" },
  { id: "mpgUK", label: "MPG (UK)" },
  { id: "kml", label: "km / L" },
  { id: "l100", label: "L / 100km" },
];

function toL100(value: number, unit: Unit): number {
  switch (unit) {
    case "l100": return value;
    case "kml": return 100 / value;
    case "mpgUS": return (100 * L_PER_US_GAL) / (value * KM_PER_MILE);
    case "mpgUK": return (100 * L_PER_UK_GAL) / (value * KM_PER_MILE);
  }
}

function fromL100(l100: number, unit: Unit): number {
  switch (unit) {
    case "l100": return l100;
    case "kml": return 100 / l100;
    case "mpgUS": return (100 * L_PER_US_GAL) / (l100 * KM_PER_MILE);
    case "mpgUK": return (100 * L_PER_UK_GAL) / (l100 * KM_PER_MILE);
  }
}

export function FuelEconomyConverter() {
  const [value, setValue] = useState("40");
  const [unit, setUnit] = useState<Unit>("mpgUS");

  const results = useMemo(() => {
    const n = Number(value);
    if (!value.trim() || Number.isNaN(n) || n <= 0) return null;
    const l100 = toL100(n, unit);
    return UNITS.map((u) => ({ ...u, value: fromL100(l100, u.id) }));
  }, [value, unit]);

  return (
    <div>
      <div className="row">
        <div className="field">
          <label htmlFor="fe">Value</label>
          <input id="fe" className="input" value={value} onChange={(e) => setValue(e.target.value)} placeholder="40" />
        </div>
        <div className="field">
          <label htmlFor="feu">Unit</label>
          <select id="feu" className="select" value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
            {UNITS.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
          </select>
        </div>
      </div>
      <div className="field">
        <label>Equivalents</label>
        <div className="tool-output" style={{ padding: 0 }}>
          {results === null ? (
            <div style={{ padding: 12 }}>Enter a positive number to convert.</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {results.map((r) => (
                  <tr key={r.id} style={{ borderTop: "1px solid var(--border, #2a2f3a)", opacity: r.id === unit ? 0.6 : 1 }}>
                    <td className="muted" style={{ padding: "8px 12px" }}>{r.label}</td>
                    <td style={{ padding: "8px 12px", fontFamily: "monospace", fontWeight: 600 }}>{r.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        US and UK gallons differ (3.785 L vs 4.546 L), so a US MPG figure is lower than the
        same car's UK MPG. L/100km is inverse — lower is better. Calculated in your browser.
      </p>
    </div>
  );
}
