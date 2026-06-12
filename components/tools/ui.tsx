"use client";

import { useState } from "react";

// Small copy-to-clipboard button reused across every tool. Gives quick visual
// feedback and disables itself when there's nothing to copy.
export function CopyButton({
  value,
  label = "Copy",
  className = "btn",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — silently ignore */
    }
  }

  return (
    <button className={className} onClick={copy} disabled={!value} type="button">
      {copied ? "✓ Copied" : label}
    </button>
  );
}
