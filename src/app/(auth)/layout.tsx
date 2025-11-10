"use client";

import { Activity } from "lucide-react";
import Link from "next/link";

import { ThemeSwitch } from "@/src/components";
import { siteConfig } from "@/src/config/site";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex flex-shrink-0 items-center justify-between p-6">
        <Link href="/" className="flex items-center gap-2">
          <Activity className="text-primary" size={32} />
          <span className="text-xl font-bold">{siteConfig.name}</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeSwitch />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
