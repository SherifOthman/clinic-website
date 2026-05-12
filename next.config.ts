import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /**
   * Cache Components (Next.js 16+)
   * - Data fetching is DYNAMIC by default
   * - Mark components with 'use cache' to cache their output
   * - Incompatible with: export const dynamic = "force-dynamic" / "force-static"
   */
  cacheComponents: true,

  /**
   * Custom cache profiles used with cacheLife() inside 'use cache' components.
   *
   * daily — for website content that changes at most once a day:
   *   stale:      1 hour  — client serves from memory for up to 1h before checking
   *   revalidate: 24 hours — server regenerates the cached output once per day
   *   expire:     7 days  — absolute max before forcing a fresh render
   *
   * All public website components (hero, features, footer, pricing, etc.) use
   * this profile. Content is effectively static between deploys, so daily
   * revalidation is more than frequent enough.
   *
   */
  cacheLife: {
    daily: {
      stale:      3_600,   // 1 hour  (client-side)
      revalidate: 86_400,  // 24 hours (server-side)
      expire:     604_800, // 7 days  (absolute max)
    },
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
