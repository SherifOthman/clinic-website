import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * next-intl middleware — handles locale routing for all pages.
 *
 * What it does:
 * - Redirects / → /en (defaultLocale)
 * - Redirects /about → /en/about
 * - Passes /en/... and /ar/... through unchanged
 * - Sets the locale cookie so server components can read it
 */
export default createMiddleware(routing);

export const config = {
  // Match all paths except Next.js internals and static files
  matcher: [
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
