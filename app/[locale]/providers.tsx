"use client";

import { RouterProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";
import type { ThemeProviderProps } from "next-themes";

export function Providers({
  children,
  themeProps,
}: {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}) {
  const router = useRouter();

  return (
    <RouterProvider navigate={router.push}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        {...themeProps}
      >
        {children}
      </ThemeProvider>
    </RouterProvider>
  );
}
