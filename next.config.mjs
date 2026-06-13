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
    return moved.map((slug) => ({
      source: `/convert/${slug}`,
      destination: `/datetime/${slug}`,
      permanent: true,
    }));
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
