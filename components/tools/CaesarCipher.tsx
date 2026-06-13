"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./ui";
import { caesarShift } from "../../lib/cipher";

export function CaesarCipher() {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(3);
  const [showAll, setShowAll] = useState(false);

  const encoded = useMemo(() => caesarShift(text, shift), [text, shift]);
  const decoded = useMemo(() => caesarShift(text, -shift), [text, shift]);

  const allShifts = useMemo(() => {
    if (!showAll || !text) return [];
    return Array.from({ length: 26 }, (_, i) => ({ shift: i, text: caesarShift(text, i) }));
  }, [text, showAll]);

  return (
    <div>
      <div className="field">
        <label htmlFor="cc">Text</label>
        <textarea id="cc" className="textarea" placeholder="Type a message to encrypt or decrypt…" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="cs">Shift: {shift}</label>
        <input id="cs" type="range" min={1} max={25} value={shift} onChange={(e) => setShift(Number(e.target.value))} style={{ width: "100%" }} />
      </div>
      <div className="row">
        <div className="field">
          <label>Encoded (shift +{shift})</label>
          <div className="tool-output" style={{ fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{encoded || "—"}</div>
          <CopyButton value={encoded} className="btn" />
        </div>
        <div className="field">
          <label>Decoded (shift −{shift})</label>
          <div className="tool-output" style={{ fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{decoded || "—"}</div>
          <CopyButton value={decoded} className="btn" />
        </div>
      </div>
      <label className="small" style={{ display: "block", marginTop: 4 }}>
        <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} /> Show all 26 shifts (brute-force decode)
      </label>
      {allShifts.length > 0 && (
        <div className="tool-output" style={{ marginTop: 10, maxHeight: 300, overflowY: "auto", fontFamily: "monospace", fontSize: 13 }}>
          {allShifts.map((r) => (
            <div key={r.shift} style={{ borderTop: "1px solid var(--border, #2a2f3a)", padding: "3px 0" }}>
              <span className="muted">{String(r.shift).padStart(2, "0")}: </span>{r.text}
            </div>
          ))}
        </div>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        The Caesar cipher shifts each letter by a fixed amount. To decrypt a message, use the
        same shift on the &quot;Decoded&quot; side — or, if you don&apos;t know the shift, tick
        &quot;Show all 26 shifts&quot; and look for the readable line. Letters only; spaces and
        punctuation are kept. Runs in your browser.
      </p>
    </div>
  );
}
