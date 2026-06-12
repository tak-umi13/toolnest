"use client";

import { useEffect, useState } from "react";
import { CopyButton } from "./ui";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?",
};

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");

  const charset =
    (lower ? SETS.lower : "") + (upper ? SETS.upper : "") + (digits ? SETS.digits : "") + (symbols ? SETS.symbols : "");

  function generate() {
    if (!charset) {
      setPassword("");
      return;
    }
    const n = Math.min(Math.max(length, 4), 128);
    const buf = new Uint32Array(n);
    crypto.getRandomValues(buf);
    setPassword(Array.from(buf, (x) => charset[x % charset.length]).join(""));
  }

  // Generate one on first load so the tool is instantly useful.
  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const entropy = charset ? Math.round(length * Math.log2(charset.length)) : 0;
  const strength = entropy >= 80 ? "Strong" : entropy >= 45 ? "Good" : "Weak";

  return (
    <div>
      <div className="btn-row" style={{ marginBottom: 12, alignItems: "center" }}>
        <label className="small">Length:&nbsp;
          <input className="input" style={{ width: 90, display: "inline-block" }} type="number" min={4} max={128} value={length} onChange={(e) => setLength(Number(e.target.value))} />
        </label>
        <label className="small"><input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} /> a–z</label>
        <label className="small"><input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} /> A–Z</label>
        <label className="small"><input type="checkbox" checked={digits} onChange={(e) => setDigits(e.target.checked)} /> 0–9</label>
        <label className="small"><input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} /> !@#</label>
      </div>
      {!charset && <p className="error-text">⚠ Select at least one character set.</p>}
      <div className="field">
        <label>Generated password</label>
        <div className="tool-output" style={{ fontSize: "1.05rem", letterSpacing: "0.03em" }}>{password || "—"}</div>
      </div>
      <div className="btn-row">
        <button className="btn btn-primary" type="button" onClick={generate} disabled={!charset}>↻ Regenerate</button>
        <CopyButton value={password} />
      </div>
      <p className="muted small" style={{ marginTop: 12 }}>
        ~{entropy} bits of entropy — {strength}. Generated with your browser&apos;s cryptographic randomness; nothing is sent or stored.
      </p>
    </div>
  );
}
