"use client";

import { RouterProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";
import type { ThemeProviderProps } from "next-themes";

/**
 * ThemeProviders — wraps children with ThemeProvider only.
 * Does NOT use any dynamic hooks (useRouter, usePathname, etc.)
 * so it can sit outside <Suspense> in the layout.
 */
export function ThemeProviders({
  children,
  themeProps,
}: {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}) {
  return (
    <ThemeProvider
      attribute={["class", "data-theme"]}
      defaultTheme="light"
      enableSystem
      {...themeProps}
    >
      {children}
    </ThemeProvider>
  );
}

/**
 * RouterProviders — wraps children with HeroUI RouterProvider.
 * Uses useRouter() so it MUST be inside a <Suspense> boundary
 * when cacheComponents: true is enabled.
 */
export function RouterProviders({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <RouterProvider navigate={router.push}>
      {children}
    </RouterProvider>
  );
}
