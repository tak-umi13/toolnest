"use client";

import { useMemo, useState } from "react";

// Estimate entropy from the character pool the password draws on times its
// length. It's an upper-bound heuristic (a real attacker uses dictionaries),
// so we also penalise obvious patterns to avoid over-rating weak passwords.
function analyze(pw: string) {
  if (!pw) return null;
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^A-Za-z0-9]/.test(pw)) pool += 33;
  let bits = pw.length * Math.log2(pool || 1);

  // Penalties for predictable structure.
  const penalties: string[] = [];
  if (/(.)\1{2,}/.test(pw)) { bits *= 0.7; penalties.push("repeated characters"); }
  if (/^(?:[a-z]+|[0-9]+)$/i.test(pw)) { bits *= 0.8; penalties.push("single character type"); }
  if (/(?:1234|abcd|qwer|password|admin|0000)/i.test(pw)) { bits *= 0.5; penalties.push("common sequence/word"); }

  const guessesPerSec = 1e10; // offline fast-hash attacker
  const seconds = Math.pow(2, bits) / guessesPerSec;
  return { bits: Math.round(bits), seconds, pool, penalties };
}

function humanTime(sec: number): string {
  if (sec < 1) return "instantly";
  const units: [number, string][] = [
    [60, "second"], [60, "minute"], [24, "hour"], [365, "day"], [100, "year"], [Infinity, "century"],
  ];
  let v = sec;
  let name = "second";
  for (const [div, label] of units) {
    if (v < div) { name = label; break; }
    v /= div;
    name = label;
  }
  if (v > 1e6) return "millions of " + name + "s";
  return `${Math.round(v).toLocaleString()} ${name}${Math.round(v) === 1 ? "" : "s"}`;
}

const RATINGS = [
  { max: 28, label: "Very weak", color: "#ff6b6b" },
  { max: 36, label: "Weak", color: "#ff9f43" },
  { max: 60, label: "Reasonable", color: "#feca57" },
  { max: 128, label: "Strong", color: "#5bd17a" },
  { max: Infinity, label: "Very strong", color: "#1dd1a1" },
];

export function PasswordStrengthChecker() {
  const [pw, setPw] = useState("");
  const a = useMemo(() => analyze(pw), [pw]);
  const rating = a ? RATINGS.find((r) => a.bits <= r.max)! : null;

  return (
    <div>
      <div className="field">
        <label htmlFor="ps">Password to test</label>
        <input id="ps" className="input" type="text" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Type a password…" autoComplete="off" spellCheck={false} />
      </div>
      {a && rating && (
        <>
          <div style={{ height: 10, borderRadius: 6, background: "var(--border, #2a2f3a)", overflow: "hidden", margin: "12px 0" }}>
            <div style={{ width: `${Math.min(100, (a.bits / 128) * 100)}%`, height: "100%", background: rating.color, transition: "width .2s" }} />
          </div>
          <div className="stat-row">
            <div className="stat"><div className="num" style={{ color: rating.color }}>{rating.label}</div><div className="lbl">Strength</div></div>
            <div className="stat"><div className="num">{a.bits}</div><div className="lbl">Bits of entropy</div></div>
            <div className="stat"><div className="num" style={{ fontSize: "1rem" }}>{humanTime(a.seconds)}</div><div className="lbl">Est. crack time</div></div>
          </div>
          {a.penalties.length > 0 && (
            <p className="small" style={{ color: "#ff9f43", marginTop: 10 }}>Weak spots: {a.penalties.join(", ")}.</p>
          )}
        </>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Your password is <strong>never sent anywhere</strong> — analysis runs entirely in your
        browser. Crack time assumes a fast offline attacker (10 billion guesses/sec). Length
        beats complexity: a long passphrase outperforms a short jumble.
      </p>
    </div>
  );
}
