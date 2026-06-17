"use client";

import { useMemo, useState } from "react";

function rating(er: number): { label: string; color: string } {
  if (er >= 6) return { label: "Excellent", color: "#16a34a" };
  if (er >= 3) return { label: "High", color: "#16a34a" };
  if (er >= 1) return { label: "Good (average)", color: "#d97706" };
  return { label: "Low", color: "#dc2626" };
}

export function EngagementRateCalculator() {
  const [base, setBase] = useState<"followers" | "reach">("followers");
  const [count, setCount] = useState(10000);
  const [likes, setLikes] = useState(450);
  const [comments, setComments] = useState(30);
  const [saves, setSaves] = useState(0);
  const [shares, setShares] = useState(0);

  const r = useMemo(() => {
    const interactions = Math.max(0, likes) + Math.max(0, comments) + Math.max(0, saves) + Math.max(0, shares);
    const er = count > 0 ? (interactions / count) * 100 : 0;
    return { interactions, er };
  }, [count, likes, comments, saves, shares]);

  const rate = rating(r.er);

  return (
    <div>
      <div className="field">
        <label>Engagement relative to</label>
        <div className="btn-row">
          <button type="button" className={base === "followers" ? "btn btn-primary" : "btn"} onClick={() => setBase("followers")}>Followers</button>
          <button type="button" className={base === "reach" ? "btn btn-primary" : "btn"} onClick={() => setBase("reach")}>Reach / impressions</button>
        </div>
      </div>
      <div className="row">
        <div className="field"><label>{base === "followers" ? "Followers" : "Reach (per post)"}</label><input className="input" type="number" min={0} value={count} onChange={(e) => setCount(Number(e.target.value))} /></div>
        <div className="field"><label>Likes</label><input className="input" type="number" min={0} value={likes} onChange={(e) => setLikes(Number(e.target.value))} /></div>
      </div>
      <div className="row">
        <div className="field"><label>Comments</label><input className="input" type="number" min={0} value={comments} onChange={(e) => setComments(Number(e.target.value))} /></div>
        <div className="field"><label>Saves <span className="muted small">(optional)</span></label><input className="input" type="number" min={0} value={saves} onChange={(e) => setSaves(Number(e.target.value))} /></div>
      </div>
      <div className="field" style={{ maxWidth: 220 }}><label>Shares <span className="muted small">(optional)</span></label><input className="input" type="number" min={0} value={shares} onChange={(e) => setShares(Number(e.target.value))} /></div>
      <div className="stat-row">
        <div className="stat"><div className="num" style={{ color: rate.color }}>{r.er.toFixed(2)}%</div><div className="lbl">Engagement rate</div></div>
        <div className="stat"><div className="num">{r.interactions.toLocaleString()}</div><div className="lbl">Total interactions</div></div>
        <div className="stat"><div className="num" style={{ fontSize: "1.1rem", color: rate.color }}>{rate.label}</div><div className="lbl">Rating</div></div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        Engagement rate = total interactions ÷ {base === "followers" ? "followers" : "reach"} × 100.
        As a rough guide, 1–3% is average and 3%+ is strong, though it varies by platform and
        follower size (smaller accounts usually see higher rates). Calculated in your browser.
      </p>
    </div>
  );
}
