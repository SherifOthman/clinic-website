import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  // cacheComponents: true
  experimental: {
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

    optimizeCss: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
