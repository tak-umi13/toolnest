"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

const SOURCES = ["google", "facebook", "instagram", "twitter", "linkedin", "newsletter", "youtube"];
const MEDIUMS = ["cpc", "social", "email", "organic", "referral", "banner", "affiliate"];

export function UtmBuilder() {
  const [url, setUrl] = useState("https://example.com");
  const [source, setSource] = useState("newsletter");
  const [medium, setMedium] = useState("email");
  const [campaign, setCampaign] = useState("spring_sale");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");

  const { full, error } = useMemo(() => {
    if (!url.trim()) return { full: "", error: "" };
    try {
      const u = new URL(url);
      const add = (k: string, v: string) => { if (v.trim()) u.searchParams.set(k, v.trim()); };
      add("utm_source", source);
      add("utm_medium", medium);
      add("utm_campaign", campaign);
      add("utm_term", term);
      add("utm_content", content);
      return { full: u.toString(), error: "" };
    } catch {
      return { full: "", error: "Enter a valid URL including https://" };
    }
  }, [url, source, medium, campaign, term, content]);

  return (
    <div>
      <div className="field">
        <label htmlFor="uu">Website URL</label>
        <input id="uu" className="input" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/page" />
      </div>
      <div className="row">
        <div className="field">
          <label htmlFor="us">Campaign source <span className="muted small">(utm_source)</span></label>
          <input id="us" className="input" list="utm-sources" value={source} onChange={(e) => setSource(e.target.value)} />
          <datalist id="utm-sources">{SOURCES.map((s) => <option key={s} value={s} />)}</datalist>
        </div>
        <div className="field">
          <label htmlFor="um">Campaign medium <span className="muted small">(utm_medium)</span></label>
          <input id="um" className="input" list="utm-mediums" value={medium} onChange={(e) => setMedium(e.target.value)} />
          <datalist id="utm-mediums">{MEDIUMS.map((s) => <option key={s} value={s} />)}</datalist>
        </div>
      </div>
      <div className="field">
        <label htmlFor="uc">Campaign name <span className="muted small">(utm_campaign)</span></label>
        <input id="uc" className="input" value={campaign} onChange={(e) => setCampaign(e.target.value)} />
      </div>
      <div className="row">
        <div className="field">
          <label htmlFor="ut">Term <span className="muted small">(optional)</span></label>
          <input id="ut" className="input" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="paid keyword" />
        </div>
        <div className="field">
          <label htmlFor="uco">Content <span className="muted small">(optional)</span></label>
          <input id="uco" className="input" value={content} onChange={(e) => setContent(e.target.value)} placeholder="a/b variant" />
        </div>
      </div>
      {error && <p className="small" style={{ color: "#ff6b6b" }}>{error}</p>}
      <div className="field">
        <label>Your tracking URL</label>
        <div className="tool-output" style={{ fontFamily: "monospace", wordBreak: "break-all" }}>{full || "Your campaign URL will appear here."}</div>
      </div>
      <CopyButton value={full} className="btn btn-primary" />
      <p className="muted small" style={{ marginTop: 10 }}>
        UTM parameters tell Google Analytics and other tools where a visitor came from. Keep
        values lowercase and consistent so your campaign reports stay clean. Built in your browser.
      </p>
    </div>
  );
}
