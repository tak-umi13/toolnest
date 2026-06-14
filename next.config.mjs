/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Baseline security headers for every response. CSP is deliberately omitted
  // for now: the theme bootstrap and JSON-LD use inline <script>, so a useful
  // CSP needs nonces — tracked as a post-launch hardening task in DEPLOY.md.
  // Four date/time tools moved from the "convert" category to "datetime".
  // 301-redirect the old URLs so links and any indexed pages don't 404.
  async redirects() {
    const moved = [
      "age-calculator",
      "date-difference-calculator",
      "business-days-calculator",
      "time-duration-calculator",
    ];
    const list = moved.map((slug) => ({
      source: `/convert/${slug}`,
      destination: `/datetime/${slug}`,
      permanent: true,
    }));

    // Domain migration: once NEXT_PUBLIC_SITE_URL points at the custom domain,
    // permanently (301) redirect the old Vercel subdomain to it so search
    // equity, links and bookmarks transfer to the new home. This stays inert
    // until the env var is switched, so it's safe to ship ahead of time.
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
    const OLD_HOST = "toolnest-lime.vercel.app";
    const match = siteUrl.match(/^https?:\/\/([^/]+)/);
    const newHost = match ? match[1] : "";
    if (newHost && newHost !== OLD_HOST && !newHost.endsWith(".vercel.app")) {
      list.push({
        source: "/:path*",
        has: [{ type: "host", value: OLD_HOST }],
        destination: `https://${newHost}/:path*`,
        permanent: true,
      });
      // Canonicalise to the apex: 301 the www host to the bare domain so the
      // two don't compete as duplicate content and link equity stays merged.
      if (!newHost.startsWith("www.")) {
        list.push({
          source: "/:path*",
          has: [{ type: "host", value: `www.${newHost}` }],
          destination: `https://${newHost}/:path*`,
          permanent: true,
        });
      }
    }

    return list;
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
