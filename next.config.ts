import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // React Compiler (stable in Next.js 16)
  reactCompiler: true,

  // Turbopack configuration
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  // Server external packages
  serverExternalPackages: [],

  // Experimental features
  experimental: {
    // Optimize package imports for better tree-shaking
    optimizePackageImports: [
      "@heroui/button",
      "@heroui/card",
      "@heroui/input",
      "@heroui/navbar",
      "@heroui/avatar",
      "@heroui/chip",
      "@heroui/link",
      "@heroui/select",
      "@heroui/switch",
      "@heroui/divider",
      "@heroui/spinner",
      "lucide-react",
    ],

    // CSS optimization (stable in Next.js 16)
    optimizeCss: true,

    // Partial Prerendering (Next.js 16 feature - enable when ready)
    ppr: false,

    // Optimize server components
    serverComponentsHmrCache: true,
  },

  // Logging configuration
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
