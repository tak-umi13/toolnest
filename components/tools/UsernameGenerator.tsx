"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

const ADJ = ["swift", "silent", "cosmic", "happy", "brave", "lunar", "crimson", "golden", "mighty", "clever", "shadow", "frost", "neon", "wild", "calm", "epic", "royal", "turbo", "pixel", "cyber", "atomic", "stellar", "rapid", "noble"];
const NOUN = ["tiger", "falcon", "panda", "wizard", "ninja", "phoenix", "wolf", "raven", "dragon", "otter", "comet", "viper", "lynx", "hawk", "fox", "bear", "shark", "eagle", "puma", "cobra", "panther", "rhino", "yeti", "gecko"];

const pick = (a: string[]) => a[Math.floor(Math.random() * a.length)];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type Style = "lower" | "camel" | "snake";

function make(style: Style, withNumber: boolean): string {
  const a = pick(ADJ), n = pick(NOUN);
  let base: string;
  if (style === "camel") base = cap(a) + cap(n);
  else if (style === "snake") base = `${a}_${n}`;
  else base = a + n;
  if (withNumber) base += (style === "snake" ? "_" : "") + Math.floor(Math.random() * 1000);
  return base;
}

export function UsernameGenerator() {
  const [style, setStyle] = useState<Style>("camel");
  const [withNumber, setWithNumber] = useState(true);
  const [count, setCount] = useState(10);
  const [list, setList] = useState<string[]>([]);

  function generate() {
    const n = Math.max(1, Math.min(100, count));
    setList(Array.from({ length: n }, () => make(style, withNumber)));
  }

  return (
    <div>
      <div className="row">
        <div className="field">
          <label>Style</label>
          <select className="select" value={style} onChange={(e) => setStyle(e.target.value as Style)}>
            <option value="camel">CamelCase (SwiftTiger)</option>
            <option value="lower">lowercase (swifttiger)</option>
            <option value="snake">snake_case (swift_tiger)</option>
          </select>
        </div>
        <div className="field"><label>How many</label><input className="input" type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} /></div>
      </div>
      <label className="small" style={{ display: "block", marginBottom: 12 }}><input type="checkbox" checked={withNumber} onChange={(e) => setWithNumber(e.target.checked)} /> Append a number</label>
      <button type="button" className="btn btn-primary" onClick={generate}>Generate usernames</button>
      {list.length > 0 && (
        <div className="field" style={{ marginTop: 12 }}>
          <label>Suggestions</label>
          <div className="tool-output" style={{ fontFamily: "var(--mono)", whiteSpace: "pre-wrap" }}>{list.join("\n")}</div>
          <CopyButton value={list.join("\n")} className="btn" />
        </div>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Generates memorable usernames from an adjective + noun (plus an optional number) in your
        chosen style. Always check availability on the platform you want. Runs in your browser.
      </p>
    </div>
  );
}
