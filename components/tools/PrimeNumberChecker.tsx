"use client";

import { useMemo, useState } from "react";
import { isPrime, primeFactors } from "../../lib/mathx";

export function PrimeNumberChecker() {
  const [value, setValue] = useState("97");

  const r = useMemo(() => {
    const n = parseInt(value, 10);
    if (!Number.isInteger(n) || value.trim() === "") return null;
    if (n < 0 || n > 1e15) return { ok: false as const, error: "Enter a whole number from 0 to 1,000,000,000,000,000." };
    const prime = isPrime(n);
    const factors = prime || n < 2 ? [] : primeFactors(n);
    let next = n + 1;
    while (!isPrime(next)) next++;
    let prev = n - 1;
    while (prev >= 2 && !isPrime(prev)) prev--;
    return { ok: true as const, n, prime, factors, next, prev: prev >= 2 ? prev : null };
  }, [value]);

  return (
    <div>
      <div className="field" style={{ maxWidth: 280 }}>
        <label htmlFor="pn">Number</label>
        <input id="pn" className="input" value={value} onChange={(e) => setValue(e.target.value)} placeholder="97" />
      </div>
      {r && !r.ok && <p className="small" style={{ color: "#ff6b6b" }}>{r.error}</p>}
      {r && r.ok && (
        <>
          <div className="tool-output" style={{ fontSize: "1.3rem", fontWeight: 700, color: r.prime ? "#16a34a" : "var(--text)" }}>
            {r.n} is {r.prime ? "a prime number ✓" : r.n < 2 ? "not prime" : "not prime (composite)"}
          </div>
          {r.factors.length > 0 && (
            <p style={{ marginTop: 10 }}>
              Prime factorization:{" "}
              <strong style={{ fontFamily: "var(--mono)" }}>
                {r.factors.map((f, i) => (
                  <span key={f.p}>{i > 0 ? " × " : ""}{f.p}{f.exp > 1 ? <sup>{f.exp}</sup> : null}</span>
                ))}
              </strong>
            </p>
          )}
          <div className="stat-row">
            {r.prev != null && <div className="stat"><div className="num">{r.prev}</div><div className="lbl">Previous prime</div></div>}
            <div className="stat"><div className="num">{r.next}</div><div className="lbl">Next prime</div></div>
          </div>
        </>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        A prime number is a whole number greater than 1 whose only divisors are 1 and itself.
        For composite numbers, the prime factorization is shown. Runs in your browser.
      </p>
    </div>
  );
}
