"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export interface SearchItem {
  name: string;
  category: string;
  path: string;
  tagline: string;
  keywords: string[];
}

// Lightweight client-side search. The full catalog is small enough to filter
// in-memory, so there's no API round-trip — results appear as you type.
// Press "/" anywhere on the page to jump to the box, Escape to clear it.
export function ToolSearch({ items }: { items: SearchItem[] }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName ?? "";
      if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape") {
        setQ("");
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return items
      .filter((it) => {
        const haystack = (
          it.name +
          " " +
          it.category +
          " " +
          it.tagline +
          " " +
          it.keywords.join(" ")
        ).toLowerCase();
        return haystack.includes(term);
      })
      .slice(0, 8);
  }, [q, items]);

  return (
    <div className="search-wrap">
      <span className="search-icon" aria-hidden="true">
        🔎
      </span>
      <input
        ref={inputRef}
        className="input search-input"
        type="search"
        placeholder="Search tools… (e.g. EMI, JSON, word count)"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search tools"
      />
      {!q && <span className="kbd" aria-hidden="true">/</span>}
      {results.length > 0 && (
        <div className="search-results tool-grid">
          {results.map((r) => (
            <Link key={r.path} href={r.path} className="tool-card">
              <span className="tag">{r.category}</span>
              <h3>{r.name}</h3>
              <p>{r.tagline}</p>
            </Link>
          ))}
        </div>
      )}
      {q.trim() && results.length === 0 && (
        <p className="muted small" style={{ marginTop: 10 }}>
          No tools match “{q}”. Try a broader term.
        </p>
      )}
    </div>
  );
}
