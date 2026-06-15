"use client";

import { useEffect, useRef, useState } from "react";

const FORMATS = ["CODE128", "EAN13", "UPC", "CODE39", "ITF14", "MSI", "pharmacode"] as const;

export function BarcodeGenerator() {
  const [value, setValue] = useState("ToolNest-12345");
  const [format, setFormat] = useState<(typeof FORMATS)[number]>("CODE128");
  const [showText, setShowText] = useState(true);
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const canvas = canvasRef.current;
      if (!canvas || !value.trim()) { setError(""); return; }
      try {
        // Dynamic import keeps jsbarcode out of the server bundle (browser-only).
        const JsBarcode = (await import("jsbarcode")).default;
        if (cancelled) return;
        JsBarcode(canvas, value, {
          format,
          displayValue: showText,
          width: 2,
          height: 90,
          margin: 12,
          background: "#ffffff",
          lineColor: "#000000",
        });
        setError("");
      } catch {
        setError(`"${value}" isn't valid for ${format}. Check the format's rules (e.g. EAN-13 needs 12–13 digits, UPC needs 11–12).`);
      }
    })();
    return () => { cancelled = true; };
  }, [value, format, showText]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas || error) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `barcode-${value}.png`;
    a.click();
  }

  return (
    <div>
      <div className="field">
        <label htmlFor="bc-val">Data to encode</label>
        <input id="bc-val" className="input" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Text or numbers" />
      </div>
      <div className="row">
        <div className="field">
          <label htmlFor="bc-fmt">Barcode format</label>
          <select id="bc-fmt" className="select" value={format} onChange={(e) => setFormat(e.target.value as (typeof FORMATS)[number])}>
            {FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div className="field" style={{ display: "flex", alignItems: "flex-end" }}>
          <label className="small"><input type="checkbox" checked={showText} onChange={(e) => setShowText(e.target.checked)} /> Show text under barcode</label>
        </div>
      </div>
      {error ? (
        <p className="small" style={{ color: "#ff6b6b" }}>{error}</p>
      ) : (
        <div className="field">
          <div className="tool-output" style={{ display: "flex", justifyContent: "center", background: "var(--surface-2)" }}>
            <canvas ref={canvasRef} style={{ maxWidth: "100%", background: "#fff", borderRadius: 6 }} />
          </div>
          <button type="button" className="btn btn-primary" onClick={download} style={{ marginTop: 10 }}>Download PNG</button>
        </div>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        Generates a real, scannable barcode in CODE128, EAN-13, UPC, CODE39 and more. CODE128
        handles letters and numbers; EAN/UPC need a specific number of digits. Everything renders
        in your browser — nothing is uploaded.
      </p>
    </div>
  );
}
