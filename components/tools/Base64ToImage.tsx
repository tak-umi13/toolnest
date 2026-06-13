"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";

function normalizeDataUri(input: string): string {
  const s = input.trim();
  if (!s) return "";
  if (s.startsWith("data:")) return s;
  // Bare base64 — assume PNG unless it looks like JPEG/GIF/WebP magic bytes.
  let mime = "image/png";
  if (s.startsWith("/9j/")) mime = "image/jpeg";
  else if (s.startsWith("R0lGOD")) mime = "image/gif";
  else if (s.startsWith("UklGR")) mime = "image/webp";
  return `data:${mime};base64,${s.replace(/\s/g, "")}`;
}

export function Base64ToImage() {
  const [mode, setMode] = useState<"decode" | "encode">("decode");
  const [b64, setB64] = useState("");
  const [encoded, setEncoded] = useState("");
  const [fileName, setFileName] = useState("");

  const dataUri = useMemo(() => normalizeDataUri(b64), [b64]);
  const [valid, setValid] = useState(true);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setEncoded(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <div className="field">
        <label>Mode</label>
        <div className="btn-row">
          <button type="button" className={mode === "decode" ? "btn btn-primary" : "btn"} onClick={() => setMode("decode")}>Base64 → Image</button>
          <button type="button" className={mode === "encode" ? "btn btn-primary" : "btn"} onClick={() => setMode("encode")}>Image → Base64</button>
        </div>
      </div>

      {mode === "decode" ? (
        <>
          <div className="field">
            <label htmlFor="b64">Paste Base64 or a data URI</label>
            <textarea id="b64" className="textarea" style={{ fontFamily: "monospace", minHeight: 120 }} placeholder="data:image/png;base64,iVBORw0KGgo…" value={b64} onChange={(e) => { setB64(e.target.value); setValid(true); }} />
          </div>
          {dataUri && (
            <div className="field">
              <label>Preview</label>
              <div className="tool-output" style={{ textAlign: "center" }}>
                {valid ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={dataUri} alt="Decoded base64" style={{ maxWidth: "100%", maxHeight: 320, borderRadius: 8 }} onError={() => setValid(false)} />
                ) : (
                  <span style={{ color: "#ff6b6b" }}>That doesn&apos;t decode to a valid image.</span>
                )}
              </div>
              {valid && <a className="btn btn-primary" href={dataUri} download="image">Download image</a>}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="field">
            <label htmlFor="imgf">Choose an image</label>
            <input id="imgf" type="file" accept="image/*" onChange={onFile} className="input" />
          </div>
          {encoded && (
            <>
              <div className="field">
                <label>Preview {fileName && <span className="muted small">({fileName})</span>}</label>
                <div className="tool-output" style={{ textAlign: "center" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={encoded} alt={fileName} style={{ maxWidth: "100%", maxHeight: 240, borderRadius: 8 }} />
                </div>
              </div>
              <div className="field">
                <label>Base64 data URI</label>
                <div className="tool-output" style={{ fontFamily: "monospace", maxHeight: 140, overflowY: "auto", wordBreak: "break-all" }}>{encoded}</div>
                <CopyButton value={encoded} label="Copy data URI" className="btn btn-primary" />
              </div>
            </>
          )}
        </>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Everything runs in your browser — images are never uploaded. Base64 data URIs let you
        embed small images directly in HTML/CSS without a separate file. Runs in your browser.
      </p>
    </div>
  );
}
