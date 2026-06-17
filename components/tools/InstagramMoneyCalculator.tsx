"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => "$" + new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(Math.round(n));

export function InstagramMoneyCalculator() {
  const [followers, setFollowers] = useState(25000);
  const [er, setEr] = useState(3);
  const [posts, setPosts] = useState(4);

  const r = useMemo(() => {
    // Rough industry benchmark: ~$10 per 1,000 followers as a baseline rate per
    // sponsored post, scaled by engagement (a 2% ER is taken as the baseline).
    const k = Math.max(0, followers) / 1000;
    const engagementFactor = Math.max(0.5, er / 2);
    const perPostLow = k * 7 * engagementFactor;
    const perPostHigh = k * 14 * engagementFactor;
    return { perPostLow, perPostHigh, monthlyLow: perPostLow * posts, monthlyHigh: perPostHigh * posts };
  }, [followers, er, posts]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Followers</label><input className="input" type="number" min={0} value={followers} onChange={(e) => setFollowers(Number(e.target.value))} /></div>
        <div className="field"><label>Engagement rate (%)</label><input className="input" type="number" min={0} step="0.1" value={er} onChange={(e) => setEr(Number(e.target.value))} /></div>
        <div className="field"><label>Sponsored posts / mo</label><input className="input" type="number" min={0} value={posts} onChange={(e) => setPosts(Number(e.target.value))} /></div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmt(r.perPostLow)}–{fmt(r.perPostHigh)}</div><div className="lbl">Per sponsored post</div></div>
        <div className="stat"><div className="num">{fmt(r.monthlyLow)}–{fmt(r.monthlyHigh)}</div><div className="lbl">Estimated monthly</div></div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        A rough estimate based on the common ~$10-per-1,000-followers benchmark, scaled by your
        engagement rate (higher engagement commands more). Actual rates vary widely with niche,
        audience quality and the brand — many creators charge more. Treat as a starting point for
        negotiation, not a guarantee. Calculated in your browser.
      </p>
    </div>
  );
}
