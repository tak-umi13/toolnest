import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${SITE.name}`,
  description: `How ${SITE.name} handles data: tool inputs stay in your browser, plus our use of cookies, Google Analytics and Google AdSense, and how to opt out.`,
  alternates: { canonical: absoluteUrl("/privacy") },
};

const UPDATED = "June 14, 2026";

export default function PrivacyPage() {
  return (
    <div className="container prose" style={{ maxWidth: 760, paddingTop: 24, paddingBottom: 48 }}>
      <h1>Privacy Policy</h1>
      <p className="muted small">Last updated: {UPDATED}</p>
      <p className="lead">
        This Privacy Policy explains what information {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;)
        collects when you use this website, how it is used, and the choices you have. By using the
        site you agree to this policy.
      </p>

      <h2>The short version</h2>
      <p>
        The tools on {SITE.name} run entirely in your browser. The data you type into a
        calculator, converter or formatter — salaries, files, text, passwords, measurements — is
        processed on your own device and is <strong>never sent to or stored on our servers</strong>.
        We do, however, use standard analytics and advertising services (Google) that set cookies,
        described below.
      </p>

      <h2>Information we collect</h2>
      <h3>Information you enter into tools</h3>
      <p>
        None of it reaches us. Every tool computes locally in your browser with JavaScript, so your
        inputs stay on your device and are gone when you close the tab. We have no accounts and no
        databases of user content.
      </p>
      <h3>Information collected automatically</h3>
      <p>
        Like most websites, our hosting provider records standard access logs (such as your IP
        address, browser type, referring page and the time of your request) for security,
        diagnostics and abuse prevention. We also collect anonymous usage statistics through the
        analytics service described below.
      </p>

      <h2>Cookies</h2>
      <p>
        Cookies are small text files stored by your browser. We and our third-party partners use
        them to measure traffic and, where enabled, to serve advertising. You can block or delete
        cookies in your browser settings; the tools on this site will still work without them,
        though some measurement and ad features will not.
      </p>

      <h2>Analytics — Google Analytics</h2>
      <p>
        We use Google Analytics, a web-analytics service provided by Google LLC, to understand how
        visitors use the site (for example, which pages are popular and what devices are used).
        Google Analytics uses cookies and collects data such as a truncated IP address, pages
        viewed and approximate location. This information is aggregated and helps us improve the
        site; it does not identify you personally to us.
      </p>
      <p>
        You can prevent Google Analytics from using your data by installing the{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
          Google Analytics Opt-out Browser Add-on
        </a>
        . For more, see{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google&apos;s Privacy Policy
        </a>
        .
      </p>

      <h2>Advertising — Google AdSense</h2>
      <p>
        This site may display advertising served through Google AdSense and its partners. In
        connection with serving ads:
      </p>
      <ul>
        <li>
          Third-party vendors, including Google, use cookies to serve ads based on your prior
          visits to this and other websites.
        </li>
        <li>
          Google&apos;s use of advertising cookies (including the DoubleClick cookie) enables it and
          its partners to serve ads to you based on your visits to this site and/or other sites on
          the Internet.
        </li>
        <li>
          You may opt out of personalised advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          . You can also opt out of some third-party vendors&apos; use of cookies for personalised
          advertising at{" "}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
            aboutads.info/choices
          </a>
          .
        </li>
      </ul>

      <h2>Third-party services</h2>
      <p>
        We rely on a small number of reputable providers to run the site, each governed by its own
        privacy policy:
      </p>
      <ul>
        <li>
          <strong>Google</strong> (Analytics and AdSense) —{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>
        </li>
        <li>
          <strong>Vercel</strong> (website hosting) —{" "}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a>
        </li>
      </ul>

      <h2>Affiliate links</h2>
      <p>
        Some pages may contain affiliate links. If you follow such a link and take an action (for
        example, signing up for a service), we may earn a commission at no extra cost to you. This
        never affects the result a tool gives you or our editorial choices.
      </p>

      <h2>Disclaimer</h2>
      <p>
        The tools and content on {SITE.name} are provided for general information and convenience.
        We work to keep calculators accurate and rules up to date, but we make no warranty that
        results are error-free or suitable for your specific situation, and we are not liable for
        decisions made based on them. Financial, tax, health and similar results are estimates, not
        professional advice — confirm important decisions with a qualified professional or the
        official source. The site may link to external websites whose content we do not control.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        This site is intended for a general audience and is not directed at children under 13. We do
        not knowingly collect personal information from children.
      </p>

      <h2>Your choices</h2>
      <p>
        You can control cookies through your browser, opt out of Google Analytics and personalised
        ads using the links above, and use the tools without providing any personal information.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes will be reflected by
        updating the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of the
        site after changes means you accept the revised policy.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy or your privacy? Email us at{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or use our{" "}
        <Link href="/contact">contact form</Link>.
      </p>
    </div>
  );
}
