"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// "Recently used" lives entirely in localStorage — no accounts, no server,
// consistent with the privacy story of the tools themselves.
const KEY = "toolnest-recent";

interface Item {
  name: string;
  path: string;
}

function read(): Item[] {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((x) => x && typeof x.name === "string" && typeof x.path === "string") : [];
  } catch {
    return [];
  }
}

/** Drop this on a tool page to record the visit. Renders nothing. */
export function RecentTracker({ name, path }: Item) {
  useEffect(() => {
    try {
      const items = [{ name, path }, ...read().filter((i) => i.path !== path)].slice(0, 8);
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [name, path]);
  return null;
}

/** Homepage strip of the user's last-used tools. Hidden until there are any. */
export function RecentlyUsed() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems(read());
  }, []);

  if (!items.length) return null;

  return (
    <section className="section" aria-label="Recently used tools">
      <div className="section-head">
        <h2>Recently used</h2>
      </div>
      <div className="chip-row">
        {items.map((i) => (
          <Link key={i.path} href={i.path} className="chip">
            {i.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
