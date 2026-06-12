"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

export function RobotsTxtGenerator() {
  const [preset, setPreset] = useState<"allow" | "block" | "custom">("allow");
  const [disallow, setDisallow] = useState("/admin\n/cart\n/checkout");
  const [sitemap, setSitemap] = useState("https://example.com/sitemap.xml");
  const [crawlDelay, setCrawlDelay] = useState("");

  const output = useMemo(() => {
    const lines: string[] = ["User-agent: *"];
    if (preset === "allow") {
      lines.push("Allow: /");
    } else if (preset === "block") {
      lines.push("Disallow: /");
    } else {
      const paths = disallow.split("\n").map((p) => p.trim()).filter(Boolean);
      if (paths.length === 0) lines.push("Disallow:");
      else for (const p of paths) lines.push(`Disallow: ${p.startsWith("/") ? p : "/" + p}`);
    }
    if (crawlDelay.trim() && !isNaN(Number(crawlDelay))) lines.push(`Crawl-delay: ${Number(crawlDelay)}`);
    lines.push("");
    if (sitemap.trim()) lines.push(`Sitemap: ${sitemap.trim()}`);
    return lines.join("\n");
  }, [preset, disallow, sitemap, crawlDelay]);

  return (
    <div>
      <div className="row">
        <div className="field">
          <label>Rule preset</label>
          <select className="select" value={preset} onChange={(e) => setPreset(e.target.value as typeof preset)}>
            <option value="allow">Allow all crawlers</option>
            <option value="block">Block all crawlers</option>
            <option value="custom">Custom — block specific paths</option>
          </select>
        </div>
        <div className="field">
          <label>Crawl-delay (optional, seconds)</label>
          <input className="input" type="number" min={0} value={crawlDelay} onChange={(e) => setCrawlDelay(e.target.value)} placeholder="e.g. 10" />
        </div>
      </div>
      {preset === "custom" && (
        <div className="field">
          <label>Disallowed paths (one per line)</label>
          <textarea className="textarea" value={disallow} onChange={(e) => setDisallow(e.target.value)} style={{ minHeight: 100 }} />
        </div>
      )}
      <div className="field">
        <label>Sitemap URL (optional)</label>
        <input className="input" value={sitemap} onChange={(e) => setSitemap(e.target.value)} placeholder="https://yourdomain.com/sitemap.xml" />
      </div>
      <div className="field">
        <label>robots.txt</label>
        <div className="tool-output">{output}</div>
      </div>
      <CopyButton value={output} label="Copy robots.txt" className="btn btn-primary" />
    </div>
  );
}
