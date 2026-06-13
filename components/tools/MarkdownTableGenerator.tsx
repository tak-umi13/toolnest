"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

type Align = "left" | "center" | "right";

export function MarkdownTableGenerator() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [cells, setCells] = useState<Record<string, string>>({
    "0-0": "Name", "0-1": "Role", "0-2": "Country",
    "1-0": "Ada", "1-1": "Engineer", "1-2": "UK",
  });
  const [aligns, setAligns] = useState<Align[]>(["left", "left", "left"]);

  const key = (r: number, c: number) => `${r}-${c}`;
  const get = (r: number, c: number) => cells[key(r, c)] ?? "";
  const set = (r: number, c: number, v: string) => setCells((p) => ({ ...p, [key(r, c)]: v }));

  function resize(nr: number, nc: number) {
    setRows(Math.max(1, Math.min(20, nr)));
    setCols(Math.max(1, Math.min(10, nc)));
    setAligns((prev) => Array.from({ length: Math.max(1, Math.min(10, nc)) }, (_, i) => prev[i] ?? "left"));
  }

  const markdown = useMemo(() => {
    const sep = aligns.slice(0, cols).map((a) => (a === "center" ? ":---:" : a === "right" ? "---:" : ":---"));
    const line = (vals: string[]) => "| " + vals.join(" | ") + " |";
    const header = Array.from({ length: cols }, (_, c) => get(0, c) || ` `);
    const body: string[] = [];
    for (let r = 1; r < rows; r++) body.push(line(Array.from({ length: cols }, (_, c) => get(r, c) || " ")));
    return [line(header), line(sep), ...body].join("\n");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cells, rows, cols, aligns]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Rows (incl. header)</label><input className="input" type="number" min={1} max={20} value={rows} onChange={(e) => resize(Number(e.target.value), cols)} /></div>
        <div className="field"><label>Columns</label><input className="input" type="number" min={1} max={10} value={cols} onChange={(e) => resize(rows, Number(e.target.value))} /></div>
      </div>
      <div className="field">
        <label>Cells (first row is the header)</label>
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse" }}>
            <tbody>
              {Array.from({ length: rows }, (_, r) => (
                <tr key={r}>
                  {Array.from({ length: cols }, (_, c) => (
                    <td key={c} style={{ padding: 2 }}>
                      <input
                        className="input"
                        style={{ minWidth: 90, fontWeight: r === 0 ? 700 : 400 }}
                        value={get(r, c)}
                        placeholder={r === 0 ? `Header ${c + 1}` : ""}
                        onChange={(e) => set(r, c, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="field">
        <label>Column alignment</label>
        <div className="btn-row" style={{ flexWrap: "wrap" }}>
          {Array.from({ length: cols }, (_, c) => (
            <select key={c} className="select" value={aligns[c]} onChange={(e) => setAligns((p) => p.map((a, i) => (i === c ? (e.target.value as Align) : a)))} style={{ width: "auto" }}>
              <option value="left">Col {c + 1}: Left</option>
              <option value="center">Col {c + 1}: Center</option>
              <option value="right">Col {c + 1}: Right</option>
            </select>
          ))}
        </div>
      </div>
      <div className="field">
        <label>Markdown</label>
        <div className="tool-output" style={{ fontFamily: "monospace", whiteSpace: "pre" }}>{markdown}</div>
      </div>
      <CopyButton value={markdown} className="btn btn-primary" />
      <p className="muted small" style={{ marginTop: 10 }}>
        Produces GitHub-flavored Markdown tables that render on GitHub, in docs and in most
        Markdown editors. Set per-column alignment with the dropdowns. Runs in your browser.
      </p>
    </div>
  );
}
