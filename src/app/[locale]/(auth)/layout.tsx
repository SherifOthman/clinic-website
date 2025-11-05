"use client";

import { Button } from "@heroui/button";
import { Activity, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";
import { Link, usePathname } from "@/src/i18n/routing";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Check if we're on the onboarding page
  const isOnboardingPage = pathname === "/onboarding";

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <Activity className="text-primary" size={32} />
          <span className="font-bold text-xl">ClinicFlow</span>
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
        className={`flex-1 flex items-center justify-center ${isOnboardingPage ? "px-2 py-2" : "px-6"}`}
      >
        <div className={`w-full ${isOnboardingPage ? "" : "max-w-md"}`}>
          {children}
        </div>
      </main>
    </div>
  );
}
