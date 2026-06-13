"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function MetaTagGenerator() {
  const [title, setTitle] = useState("My Page Title");
  const [desc, setDesc] = useState("A concise, compelling description of the page for search results and social shares.");
  const [url, setUrl] = useState("https://example.com/page");
  const [image, setImage] = useState("https://example.com/og.png");
  const [twitter, setTwitter] = useState(true);

  const output = useMemo(() => {
    const lines: string[] = [
      `<title>${esc(title)}</title>`,
      `<meta name="description" content="${esc(desc)}" />`,
    ];
    if (url) lines.push(`<link rel="canonical" href="${esc(url)}" />`);
    lines.push(
      "",
      `<!-- Open Graph -->`,
      `<meta property="og:title" content="${esc(title)}" />`,
      `<meta property="og:description" content="${esc(desc)}" />`,
      `<meta property="og:type" content="website" />`
    );
    if (url) lines.push(`<meta property="og:url" content="${esc(url)}" />`);
    if (image) lines.push(`<meta property="og:image" content="${esc(image)}" />`);
    if (twitter) {
      lines.push(
        "",
        `<!-- Twitter -->`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${esc(title)}" />`,
        `<meta name="twitter:description" content="${esc(desc)}" />`
      );
      if (image) lines.push(`<meta name="twitter:image" content="${esc(image)}" />`);
    }
    return lines.join("\n");
  }, [title, desc, url, image, twitter]);

  const titleLen = title.length;
  const descLen = desc.length;

  return (
    <div>
      <div className="field">
        <label htmlFor="mt">Page title <span className="muted small" style={{ color: titleLen > 60 ? "#ff6b6b" : undefined }}>({titleLen}/60)</span></label>
        <input id="mt" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="md">Meta description <span className="muted small" style={{ color: descLen > 160 ? "#ff6b6b" : undefined }}>({descLen}/160)</span></label>
        <textarea id="md" className="textarea" style={{ minHeight: 70 }} value={desc} onChange={(e) => setDesc(e.target.value)} />
      </div>
      <div className="row">
        <div className="field"><label htmlFor="mu">Canonical URL</label><input id="mu" className="input" value={url} onChange={(e) => setUrl(e.target.value)} /></div>
        <div className="field"><label htmlFor="mi">Social image URL</label><input id="mi" className="input" value={image} onChange={(e) => setImage(e.target.value)} /></div>
      </div>
      <label className="small" style={{ display: "block", marginBottom: 12 }}><input type="checkbox" checked={twitter} onChange={(e) => setTwitter(e.target.checked)} /> Include Twitter Card tags</label>
      <div className="field">
        <label>Meta tags</label>
        <div className="tool-output" style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>{output}</div>
      </div>
      <CopyButton value={output} className="btn btn-primary" />
      <p className="muted small" style={{ marginTop: 10 }}>
        Paste these into the <code>&lt;head&gt;</code> of your page. Titles over ~60 characters
        and descriptions over ~160 get truncated in search results — the counters warn you.
      </p>
    </div>
  );
}
