"use client";

import { Button } from "@heroui/button";
import { Activity, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";
import { Link, usePathname } from "@/src/i18n/navigation";

export function AuthLayoutClient({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setMounted(true);
    // Only set pathname on client side to avoid SSR issues
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  // Use usePathname only after mount to avoid SSR issues
  const currentPathname = usePathname();

  useEffect(() => {
    if (mounted) {
      setPathname(currentPathname);
    }
  }, [currentPathname, mounted]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Check if we're on the onboarding page
  const isOnboardingPage = pathname.includes("/onboarding");

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex flex-shrink-0 items-center justify-between p-6">
        <Link href="/" className="flex items-center gap-2">
          <Activity className="text-primary" size={32} />
          <span className="text-xl font-bold">ClinicFlow</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button
            variant="light"
            isIconOnly
            onPress={toggleTheme}
            aria-label="Toggle theme"
            suppressHydrationWarning
          >
            <span suppressHydrationWarning>
              {mounted && theme === "dark" ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main
        className={`flex flex-1 items-center justify-center ${isOnboardingPage ? "px-2 py-2" : "px-6"}`}
      >
        <div className={`w-full ${isOnboardingPage ? "" : "max-w-md"}`}>
          {children}
        </div>
      </main>
    </div>
  );
}
