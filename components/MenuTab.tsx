"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES, categoryPath } from "@/lib/registry";

// Single consolidated menu for the header. With 10 categories an inline nav
// wrapped to several rows, so everything lives behind one tab here.
export function MenuTab() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="menu-tab" ref={ref}>
      <button
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden="true">☰</span> Menu
      </button>
      {open && (
        <div className="menu-panel" role="menu">
          <div className="menu-section-title">Categories</div>
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={categoryPath(c)} role="menuitem" onClick={close}>
              <span aria-hidden="true" style={{ marginRight: 8 }}>{c.emoji}</span>{c.name}
            </Link>
          ))}
          <hr className="menu-divider" />
          <Link href="/tools" role="menuitem" onClick={close}>🧰 All tools</Link>
          <Link href="/guides" role="menuitem" onClick={close}>📚 Guides</Link>
          <Link href="/about" role="menuitem" onClick={close}>ℹ️ About</Link>
          <Link href="/contact" role="menuitem" onClick={close}>✉️ Contact</Link>
        </div>
      )}
    </div>
  );
}
