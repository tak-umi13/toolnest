"use client";

import { useState } from "react";
import { CopyButton } from "./ui";

export function TimestampConverter() {
  const [ts, setTs] = useState("");
  const [dt, setDt] = useState("");

  // Auto-detect seconds vs milliseconds by magnitude (10-digit = seconds).
  const fromTs = (() => {
    const n = Number(ts);
    if (!ts.trim() || Number.isNaN(n)) return null;
    const ms = ts.trim().length <= 11 ? n * 1000 : n;
    const d = new Date(ms);
    if (Number.isNaN(d.getTime())) return null;
    return { utc: d.toUTCString(), iso: d.toISOString(), local: d.toString() };
  })();

  const fromDt = (() => {
    if (!dt) return null;
    const d = new Date(dt);
    if (Number.isNaN(d.getTime())) return null;
    return { seconds: Math.floor(d.getTime() / 1000), ms: d.getTime() };
  })();

  return (
    <div>
      <div className="field">
        <label htmlFor="ts">Unix timestamp → date</label>
        <div className="btn-row">
          <input id="ts" className="input" placeholder="e.g. 1717804800" value={ts} onChange={(e) => setTs(e.target.value)} />
          <button className="btn" type="button" onClick={() => setTs(String(Math.floor(Date.now() / 1000)))}>Now</button>
        </div>
      </div>
      {fromTs && (
        <div className="stat-row" style={{ gridTemplateColumns: "1fr" }}>
          <div className="stat" style={{ textAlign: "left" }}><div className="lbl">UTC</div><div>{fromTs.utc}</div></div>
          <div className="stat" style={{ textAlign: "left" }}><div className="lbl">ISO 8601</div><div>{fromTs.iso}</div></div>
          <div className="stat" style={{ textAlign: "left" }}><div className="lbl">Your local time</div><div>{fromTs.local}</div></div>
        </div>
      )}

      <hr className="div" />

      <div className="field">
        <label htmlFor="dt">Date → Unix timestamp</label>
        <input id="dt" className="input" type="datetime-local" value={dt} onChange={(e) => setDt(e.target.value)} />
      </div>
      {fromDt && (
        <div className="btn-row" style={{ alignItems: "center" }}>
          <div className="stat" style={{ flex: 1 }}><div className="num">{fromDt.seconds}</div><div className="lbl">seconds</div></div>
          <div className="stat" style={{ flex: 1 }}><div className="num">{fromDt.ms}</div><div className="lbl">milliseconds</div></div>
          <CopyButton value={String(fromDt.seconds)} label="Copy seconds" className="btn btn-primary" />
        </div>
      )}
    </div>
  );
}
