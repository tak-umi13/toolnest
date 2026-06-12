"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

const FIRST_M = ["James", "Liam", "Noah", "Ethan", "Lucas", "Mason", "Logan", "Alex", "Ryan", "Adrian", "Marcus", "Felix", "Oscar", "Leo", "Hugo", "Julian"];
const FIRST_F = ["Emma", "Olivia", "Ava", "Sophia", "Isabella", "Mia", "Charlotte", "Amelia", "Harper", "Luna", "Aria", "Nora", "Clara", "Ivy", "Maya", "Zoe"];
const LAST = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Wilson", "Anderson", "Thomas", "Lee", "Walker", "Hall", "Young", "King"];

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export function RandomNameGenerator() {
  const [gender, setGender] = useState<"any" | "male" | "female">("any");
  const [count, setCount] = useState(10);
  const [fullName, setFullName] = useState(true);
  const [names, setNames] = useState<string[]>([]);

  function generate() {
    const n = Math.max(1, Math.min(100, Math.floor(count || 1)));
    const out: string[] = [];
    for (let i = 0; i < n; i++) {
      const pool = gender === "male" ? FIRST_M : gender === "female" ? FIRST_F : (Math.random() < 0.5 ? FIRST_M : FIRST_F);
      out.push(fullName ? `${pick(pool)} ${pick(LAST)}` : pick(pool));
    }
    setNames(out);
  }

  return (
    <div>
      <div className="row">
        <div className="field">
          <label>Gender</label>
          <select className="select" value={gender} onChange={(e) => setGender(e.target.value as typeof gender)}>
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="field">
          <label>How many</label>
          <input className="input" type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} />
        </div>
        <div className="field">
          <label>Style</label>
          <select className="select" value={fullName ? "full" : "first"} onChange={(e) => setFullName(e.target.value === "full")}>
            <option value="full">Full name</option>
            <option value="first">First name only</option>
          </select>
        </div>
      </div>
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button type="button" className="btn btn-primary" onClick={generate}>Generate names</button>
        {names.length > 0 && <CopyButton value={names.join("\n")} label="Copy all" />}
      </div>
      {names.length > 0 && (
        <div className="tool-output">{names.join("\n")}</div>
      )}
    </div>
  );
}
