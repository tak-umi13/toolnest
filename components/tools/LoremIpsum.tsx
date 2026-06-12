"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

const WORDS = (
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor " +
  "incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud " +
  "exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure " +
  "in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint " +
  "occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum"
).split(" ");

function rand(max: number) {
  return Math.floor(Math.random() * max);
}

function sentence(): string {
  const len = 8 + rand(8);
  const words = Array.from({ length: len }, () => WORDS[rand(WORDS.length)]);
  const s = words.join(" ");
  return s.charAt(0).toUpperCase() + s.slice(1) + ".";
}

function paragraph(): string {
  const n = 3 + rand(4);
  return Array.from({ length: n }, sentence).join(" ");
}

export function LoremIpsum() {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [out, setOut] = useState("");

  function generate() {
    const n = Math.min(Math.max(count, 1), 100);
    if (unit === "paragraphs") setOut(Array.from({ length: n }, paragraph).join("\n\n"));
    else if (unit === "sentences") setOut(Array.from({ length: n }, sentence).join(" "));
    else setOut(Array.from({ length: n }, () => WORDS[rand(WORDS.length)]).join(" "));
  }

  return (
    <div>
      <div className="row">
        <div className="field"><label>How many</label><input className="input" type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} /></div>
        <div className="field"><label>Unit</label>
          <select className="select" value={unit} onChange={(e) => setUnit(e.target.value as typeof unit)}>
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
      </div>
      <button className="btn btn-primary" type="button" onClick={generate} style={{ marginBottom: 12 }}>Generate</button>
      <div className="field">
        <label>Output</label>
        <div className="tool-output">{out || "Click Generate to create placeholder text."}</div>
      </div>
      <CopyButton value={out} className="btn btn-primary" />
    </div>
  );
}
