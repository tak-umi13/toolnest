"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

// Native, cryptographically secure UUID v4. Available in all evergreen browsers
// (secure contexts, incl. localhost) and Node 19+.
function makeUuid(): string {
  return crypto.randomUUID();
}

export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);

  function generate() {
    const n = Math.min(Math.max(count, 1), 100);
    setUuids(Array.from({ length: n }, makeUuid));
  }

  return (
    <div>
      <div className="btn-row" style={{ marginBottom: 12, alignItems: "center" }}>
        <label className="small">How many:&nbsp;
          <input
            className="input"
            style={{ width: 90, display: "inline-block" }}
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </label>
        <button className="btn btn-primary" type="button" onClick={generate}>Generate</button>
      </div>
      <div className="field">
        <label>UUIDs (v4)</label>
        <div className="tool-output">{uuids.length ? uuids.join("\n") : "Click Generate to create UUIDs."}</div>
      </div>
      <CopyButton value={uuids.join("\n")} label="Copy all" className="btn btn-primary" />
    </div>
  );
}
