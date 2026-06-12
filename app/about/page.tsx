import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS, ARTICLES } from "@/lib/registry";
import { SITE, absoluteUrl } from "@/lib/site";

// E-E-A-T surface: who runs the site, how calculators are built and verified,
// and where the rules come from. Search engines and users both read this.
export const metadata: Metadata = {
  title: `About ${SITE.name} — How Our Tools Are Built & Verified`,
  description:
    "How ToolNest builds, sources and verifies its free online calculators and tools: official sources, annual rule reviews, and a strict in-browser privacy model.",
  alternates: { canonical: absoluteUrl("/about") },
};

export default function AboutPage() {
  return (
    <div className="container prose" style={{ maxWidth: 760, paddingTop: 24, paddingBottom: 48 }}>
      <h1>About {SITE.name}</h1>
      <p className="lead">
        {SITE.name} is a library of {TOOLS.length} free, no-signup tools and{" "}
        {ARTICLES.length} plain-English guides — calculators, converters,
        formatters and generators that run entirely in your browser.
      </p>

      <h2>How our calculators are built</h2>
      <p>
        Every calculator implements the published formula or statutory rule for
        what it computes — not an approximation of a competitor&apos;s output.
        Each tool page explains its method in the &ldquo;How to use&rdquo; and FAQ
        sections, so you can check our working.
      </p>
      <ul>
        <li>
          <strong>Indian tax &amp; savings tools</strong> (income tax, salary,
          PPF, EPF, NPS, gratuity, HRA, GST) follow the rules published by the
          Income Tax Department, EPFO and the Ministry of Finance, including the
          current financial year&apos;s slabs, rebates and scheme interest rates.
        </li>
        <li>
          <strong>Loan and investment tools</strong> (EMI, SIP, FD, CAGR…) use the
          standard reducing-balance and compound-growth formulas used by banks
          and fund houses.
        </li>
        <li>
          <strong>Developer tools</strong> (JSON, XML, Base64, JWT, regex…) use
          the relevant specifications (RFC 4180, RFC 4648, RFC 7519 and friends).
        </li>
      </ul>

      <h2>Kept current, on purpose</h2>
      <p>
        Tax slabs, rebate limits and small-savings interest rates change — often
        every year, sometimes every quarter. Tools whose rules can go stale carry
        a visible <em>&ldquo;updated&rdquo;</em> date on the page, and we review
        rule-dependent calculators when the rules change (e.g. after each Union
        Budget and quarterly small-savings rate announcements). If you spot a
        figure that has changed before we have, we want to know.
      </p>

      <h2>Privacy: everything runs in your browser</h2>
      <p>
        None of your inputs — not your salary, your loan amount, your JSON, your
        passwords — are ever sent to a server. Every tool computes locally with
        JavaScript in your browser. Close the tab and it&apos;s gone.
      </p>

      <h2>What our results are (and aren&apos;t)</h2>
      <p>
        Calculator results are estimates for information and planning. They are
        not financial, tax or legal advice, and they can&apos;t account for your
        full personal situation — for decisions involving real money, confirm
        with a qualified professional or the official source.
      </p>

      <h2>Contact</h2>
      <p>
        Found a bug, an outdated rate, or want a tool we don&apos;t have yet?
        Email us at <a href="mailto:takumi6149@gmail.com">takumi6149@gmail.com</a>{" "}
        — corrections are prioritised.
      </p>

      <p>
        <Link href="/tools">Browse all {TOOLS.length} tools →</Link>
      </p>
    </div>
  );
}
