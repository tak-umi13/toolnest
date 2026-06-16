"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

export function CanonicalTagGenerator() {
  const [url, setUrl] = useState("https://example.com/page");

  const { tag, error } = useMemo(() => {
    const v = url.trim();
    if (!v) return { tag: "", error: "" };
    try {
      const u = new URL(v);
      if (!/^https?:$/.test(u.protocol)) throw new Error("bad");
      // Canonicals should be absolute, self-referencing URLs.
      return { tag: `<link rel="canonical" href="${u.toString()}" />`, error: "" };
    } catch {
      return { tag: "", error: "Enter a full absolute URL including https://" };
    }
  }, [url]);

  return (
    <div>
      <div className="field">
        <label htmlFor="ct-u">Page URL (absolute)</label>
        <input id="ct-u" className="input" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/page" />
      </div>
      {error && <p className="small" style={{ color: "#ff6b6b" }}>{error}</p>}
      {tag && (
        <>
          <div className="field">
            <label>Canonical tag</label>
            <div className="tool-output" style={{ fontFamily: "var(--mono)", wordBreak: "break-all" }}>{tag}</div>
          </div>
          <CopyButton value={tag} className="btn btn-primary" />
        </>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Place this in the <code>&lt;head&gt;</code> to tell search engines which URL is the
        canonical (preferred) version of a page — preventing duplicate-content issues from
        tracking parameters, www/non-www or trailing-slash variants. Use the page&apos;s own
        absolute URL for a self-referencing canonical. Runs in your browser.
      </p>
    </div>
  );
}
