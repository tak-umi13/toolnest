import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  // metadataBase makes every relative canonical/OG URL resolve to the real domain.
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    // Pages supply complete, keyword-optimized titles, so the template is a no-op.
    template: "%s",
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: { siteName: SITE.name, type: "website", locale: SITE.locale },
  twitter: { card: "summary", site: SITE.twitter },
  robots: { index: true, follow: true },
  // Search-engine ownership verification. Next.js renders the correctly-named
  // <meta google-site-verification> tag from this field.
  verification: { google: "R2_bFvv38l8bthkqII3RUgtQbIsN9FXwmmFEwB5ydyU" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e1117" },
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
  ],
};

// Runs before first paint to apply the saved (or system) theme, preventing a
// flash of the wrong color scheme on load.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
