"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(Math.round(n));

// Typical creator RPM (revenue per 1,000 views, after YouTube's share) by niche.
const NICHES = [
  { label: "Finance / business", rpm: 8 },
  { label: "Tech / software", rpm: 5 },
  { label: "Education", rpm: 4 },
  { label: "Health & fitness", rpm: 2.5 },
  { label: "Gaming", rpm: 1.5 },
  { label: "Entertainment / vlogs", rpm: 1 },
] as const;

export function YoutubeEarningsCalculator() {
  const [views, setViews] = useState(100000);
  const [rpm, setRpm] = useState(2.5);

  const r = useMemo(() => {
    const monthly = (Math.max(0, views) / 1000) * Math.max(0, rpm);
    return { monthly, yearly: monthly * 12, perVideo: monthly };
  }, [views, rpm]);

  return (
    <div>
      <div className="row">
        <div className="field"><label>Monthly views</label><input className="input" type="number" min={0} value={views} onChange={(e) => setViews(Number(e.target.value))} /></div>
        <div className="field"><label>RPM ($ per 1,000 views)</label><input className="input" type="number" step="0.1" min={0} value={rpm} onChange={(e) => setRpm(Number(e.target.value))} /></div>
      </div>
      <div className="field">
        <label>Niche presets (typical RPM)</label>
        <div className="btn-row" style={{ flexWrap: "wrap" }}>
          {NICHES.map((n) => (
            <button key={n.label} type="button" className={n.rpm === rpm ? "btn btn-primary" : "btn"} onClick={() => setRpm(n.rpm)}>
              {n.label} (${n.rpm})
            </button>
          ))}
        </div>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">${fmt(r.monthly)}</div><div className="lbl">Estimated monthly</div></div>
        <div className="stat"><div className="num">${fmt(r.yearly)}</div><div className="lbl">Estimated yearly</div></div>
      </div>
      <p className="muted small" style={{ marginTop: 10 }}>
        RPM is your revenue per 1,000 views after YouTube&apos;s ~45% ad-revenue share,
        and varies hugely with niche, viewer country and seasonality. Ad revenue
        only — sponsorships, memberships and affiliate income come on top.
      </p>
    </div>
  );
}
