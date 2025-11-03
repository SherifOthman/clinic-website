import createMiddleware from "next-intl/middleware";

import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  // Next.js 16: Middleware is displayed as "Proxy" in build output
  // The file MUST be named middleware.ts (not proxy.ts)
  matcher: [
    // Match all pathnames except for:
    // - API routes (/api/*)
    // - Next.js internals (/_next/*)
    // - Vercel internals (/_vercel/*)
    // - Static files with extensions (*.ico, *.png, *.jpg, etc.)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
