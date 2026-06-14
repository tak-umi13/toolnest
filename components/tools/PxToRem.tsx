"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

type Unit = "px" | "rem" | "em";

export function PxToRem() {
  const [value, setValue] = useState("24");
  const [unit, setUnit] = useState<Unit>("px");
  const [base, setBase] = useState(16);

  const r = useMemo(() => {
    const v = Number(value);
    if (value.trim() === "" || Number.isNaN(v) || base <= 0) return null;
    const px = unit === "px" ? v : v * base; // rem and em both scale by the base here
    return { px, rem: px / base, em: px / base };
  }, [value, unit, base]);

  const round = (n: number) => Number(n.toFixed(4)).toString();

  return (
    <div>
      <div className="row">
        <div className="field"><label htmlFor="prv">Value</label><input id="prv" className="input" value={value} onChange={(e) => setValue(e.target.value)} /></div>
        <div className="field">
          <label htmlFor="pru">Unit</label>
          <select id="pru" className="select" value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
            <option value="px">px</option>
            <option value="rem">rem</option>
            <option value="em">em</option>
          </select>
        </div>
        <div className="field"><label htmlFor="prb">Base font size (px)</label><input id="prb" className="input" type="number" min={1} value={base} onChange={(e) => setBase(Number(e.target.value))} /></div>
      </div>
      {r ? (
        <div className="tool-output" style={{ padding: 0 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {([["px", r.px], ["rem", r.rem], ["em", r.em]] as [string, number][]).map(([u, val]) => (
                <tr key={u} style={{ borderTop: "1px solid var(--border, #2a2f3a)" }}>
                  <td className="muted" style={{ padding: "8px 12px", width: 60 }}>{u}</td>
                  <td style={{ padding: "8px 12px", fontFamily: "var(--mono)", fontWeight: 600 }}>{round(val)}{u}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right" }}><CopyButton value={`${round(val)}${u}`} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="muted small">Enter a value to convert.</p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Converts between px, rem and em using your root font size (16px by default). 1rem = the
        root font size, so 24px = 1.5rem at a 16px base. em is shown relative to the same base —
        in practice em compounds with the parent&apos;s font size. Runs in your browser.
      </p>
    </div>
  );
}
