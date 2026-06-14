"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

// ToolNest is a fully static site with no backend, so the contact form composes
// a pre-filled email and opens it in the visitor's own mail app via a mailto:
// link. Nothing is sent to or stored on a server.
export function ContactForm() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `ToolNest contact${name ? ` from ${name}` : ""}`;
    const body = `${message}\n\n— ${name || "Anonymous"}${from ? ` (${from})` : ""}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form onSubmit={submit}>
      <div className="row">
        <div className="field">
          <label htmlFor="cf-name">Your name</label>
          <input id="cf-name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
        </div>
        <div className="field">
          <label htmlFor="cf-email">Your email</label>
          <input id="cf-email" className="input" type="email" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="you@example.com" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-msg">Message</label>
        <textarea id="cf-msg" className="textarea" style={{ minHeight: 130 }} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Found a bug, an outdated rate, or want a tool we don't have yet? Let us know…" required />
      </div>
      <button type="submit" className="btn btn-primary" disabled={!message.trim()}>Open in email app</button>
      {opened && (
        <p className="muted small" style={{ marginTop: 10 }}>
          Your email app should have opened with the message ready to send. If it didn&apos;t,
          email us directly at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      )}
      <p className="muted small" style={{ marginTop: 10 }}>
        This form opens a draft in your own email app — nothing is sent through or stored on our
        servers. You can also email us directly at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </form>
  );
}
