"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => "$" + new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(Math.round(n));

export function TiktokMoneyCalculator() {
  const [views, setViews] = useState(500000);
  const [followers, setFollowers] = useState(50000);

  const r = useMemo(() => {
    // Creator Rewards / Fund pays roughly $0.02–0.04 per 1,000 qualified views.
    const fundLow = (Math.max(0, views) / 1000) * 0.02;
    const fundHigh = (Math.max(0, views) / 1000) * 0.04;
    // Sponsored posts: a common rough benchmark is ~1–2% of follower count per post.
    const sponLow = Math.max(0, followers) * 0.01;
    const sponHigh = Math.max(0, followers) * 0.02;
    return { fundLow, fundHigh, sponLow, sponHigh };
  }, [views, followers]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Monthly views</label><input className="input" type="number" min={0} value={views} onChange={(e) => setViews(Number(e.target.value))} /></div>
        <div className="field"><label>Followers</label><input className="input" type="number" min={0} value={followers} onChange={(e) => setFollowers(Number(e.target.value))} /></div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{fmt(r.fundLow)}–{fmt(r.fundHigh)}</div><div className="lbl">Creator Rewards / mo</div></div>
        <div className="stat"><div className="num">{fmt(r.sponLow)}–{fmt(r.sponHigh)}</div><div className="lbl">Per sponsored post</div></div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        A rough estimate. TikTok&apos;s Creator Rewards pay roughly $0.02–0.04 per 1,000 qualified
        views (it varies with region, watch time and content type), and sponsored-post fees are
        often ballparked at 1–2% of follower count. Real earnings depend heavily on niche and
        engagement — treat this as a planning guide, not a guarantee. Calculated in your browser.
      </p>
    </div>
  );
}
