"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

// Curated popular hashtags by niche — a starting set to mix with your own keywords.
const NICHES: Record<string, string[]> = {
  General: ["love", "instagood", "photooftheday", "viral", "trending", "explore", "follow", "instadaily", "reels", "fyp"],
  Business: ["entrepreneur", "smallbusiness", "marketing", "startup", "success", "motivation", "branding", "hustle", "businessowner", "digitalmarketing"],
  Fitness: ["fitness", "gym", "workout", "fitfam", "health", "training", "fitlife", "motivation", "bodybuilding", "gymlife"],
  Food: ["food", "foodie", "foodporn", "instafood", "yummy", "homemade", "delicious", "foodphotography", "recipe", "cooking"],
  Travel: ["travel", "travelgram", "wanderlust", "instatravel", "adventure", "explore", "vacation", "travelphotography", "nature", "trip"],
  Fashion: ["fashion", "style", "ootd", "fashionista", "outfit", "streetstyle", "fashionblogger", "shopping", "trendy", "lookbook"],
  Tech: ["tech", "technology", "gadgets", "innovation", "coding", "programming", "ai", "startup", "software", "developer"],
  Photography: ["photography", "photo", "photographer", "naturephotography", "portrait", "photoshoot", "canon", "nikon", "landscape", "picoftheday"],
};

const toTag = (w: string) => "#" + w.trim().replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

export function HashtagGenerator() {
  const [keywords, setKeywords] = useState("morning coffee");
  const [niche, setNiche] = useState("General");

  const tags = useMemo(() => {
    const words = keywords.split(/[\s,]+/).filter(Boolean);
    const fromKeywords: string[] = [];
    for (const w of words) {
      fromKeywords.push(toTag(w));
    }
    // A combined phrase tag, e.g. #morningcoffee.
    if (words.length > 1) fromKeywords.push("#" + words.map((w) => w.replace(/[^a-zA-Z0-9]/g, "")).join("").toLowerCase());
    const nicheTags = NICHES[niche].map((t) => "#" + t);
    const all = [...new Set([...fromKeywords, ...nicheTags])].filter((t) => t.length > 1);
    return all.slice(0, 30);
  }, [keywords, niche]);

  return (
    <div>
      <div className="row">
        <div className="field"><label htmlFor="hg-k">Keywords (your topic)</label><input id="hg-k" className="input" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="e.g. morning coffee" /></div>
        <div className="field"><label htmlFor="hg-n">Niche</label>
          <select id="hg-n" className="select" value={niche} onChange={(e) => setNiche(e.target.value)}>{Object.keys(NICHES).map((n) => <option key={n} value={n}>{n}</option>)}</select>
        </div>
      </div>
      <div className="field">
        <label>Hashtags ({tags.length})</label>
        <div className="tool-output" style={{ lineHeight: 1.8 }}>{tags.join(" ")}</div>
      </div>
      <CopyButton value={tags.join(" ")} label="Copy hashtags" className="btn btn-primary" />
      <p className="muted small" style={{ marginTop: 10 }}>
        Combines hashtags built from your keywords with popular tags for your niche. Mix broad and
        specific tags, drop anything irrelevant, and avoid banned or spammy tags. Instagram allows
        up to 30 per post; a focused 5–15 often performs best. Built in your browser.
      </p>
    </div>
  );
}
