"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

function b64urlDecode(s: string): string {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4;
  if (pad) s += "=".repeat(4 - pad);
  const bin = atob(s);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function pretty(part: string): string {
  return JSON.stringify(JSON.parse(b64urlDecode(part)), null, 2);
}

// Discriminated on `ok` so TypeScript narrows the result cleanly in the JSX.
type Decoded =
  | { ok: true; header: string; payload: string }
  | { ok: false; error: string };

export function JwtDecoder() {
  const [token, setToken] = useState("");

  const decoded = useMemo<Decoded | null>(() => {
    const t = token.trim();
    if (!t) return null;
    const parts = t.split(".");
    if (parts.length < 2) return { ok: false, error: "A JWT has three dot-separated parts (header.payload.signature)." };
    try {
      return { ok: true, header: pretty(parts[0]), payload: pretty(parts[1]) };
    } catch {
      return { ok: false, error: "Couldn't decode this token — the header/payload isn't valid Base64URL JSON." };
    }
  }, [token]);

  return (
    <div>
      <div className="field">
        <label htmlFor="jwt">JWT</label>
        <textarea id="jwt" className="textarea" placeholder="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMifQ.abc123" value={token} onChange={(e) => setToken(e.target.value)} />
      </div>
      {decoded && !decoded.ok && <p className="error-text">⚠ {decoded.error}</p>}
      {decoded && decoded.ok && (
        <>
          <div className="field"><label>Header</label><div className="tool-output">{decoded.header}</div></div>
          <div className="field"><label>Payload</label><div className="tool-output">{decoded.payload}</div></div>
          <CopyButton value={decoded.payload} label="Copy payload" className="btn btn-primary" />
        </>
      )}
      <p className="muted small" style={{ marginTop: 12 }}>
        Decoding only — the signature is <strong>not</strong> verified. Never trust JWT contents without verifying the signature server-side.
      </p>
    </div>
  );
}
