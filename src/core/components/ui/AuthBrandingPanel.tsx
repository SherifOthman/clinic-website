import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthBrandingPanelProps {
  locale: string;
  children: ReactNode;
}

export function AuthBrandingPanel({ locale, children }: AuthBrandingPanelProps) {
  return (
    <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-accent p-12 text-accent-foreground">
      <Link href={`/${locale}`} className="flex items-center gap-3 no-underline">
        <Image src="/logo.svg" alt="ClinicCare" width={36} height={36} priority />
        <span className="text-2xl font-bold text-accent-foreground">ClinicCare</span>
      </Link>

      {children}

      <p className="text-sm opacity-60">© {new Date().getFullYear()} ClinicCare.</p>
    </div>
  );
}
