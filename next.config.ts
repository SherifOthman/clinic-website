import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // React Compiler (stable in Next.js 16)
  reactCompiler: true,

  // Experimental features
  experimental: {
    // Optimize package imports for better tree-shaking
    optimizePackageImports: [
      "lucide-react",
      "@heroui/avatar",
      "@heroui/button",
      "@heroui/card",
      "@heroui/chip",
      "@heroui/divider",
      "@heroui/input",
      "@heroui/navbar",
      "@heroui/select",
      "@heroui/spinner",
      "@heroui/switch",
    ],

    // CSS optimization (stable in Next.js 16)
    optimizeCss: true,
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
