import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: `Contact ${SITE.name}`,
  description: `Get in touch with ${SITE.name} — report a bug or an outdated rate, or suggest a tool you'd like us to build. We read and prioritise every message.`,
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <div className="container prose" style={{ maxWidth: 720, paddingTop: 24, paddingBottom: 48 }}>
      <h1>Contact us</h1>
      <p className="lead">
        Found a bug, spotted an outdated rate, or want a tool we don&apos;t have yet?
        We&apos;d love to hear from you — corrections and good suggestions are prioritised.
      </p>

      <ContactForm />

      <h2 style={{ marginTop: 32 }}>Email</h2>
      <p>
        Prefer your own email client? Write to us directly at{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We aim to reply within a few days.
      </p>

      <p className="muted small">
        See also our <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/about">about &amp; methodology</Link> page.
      </p>
    </div>
  );
}
