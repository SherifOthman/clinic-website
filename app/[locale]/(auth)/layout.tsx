import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();
  setRequestLocale(locale);

  return (
    <>
      {/* Minimal header — just the logo, no Navbar/Footer */}
      <header className="border-b border-border px-6 py-4">
        <Link href={`/${locale}`} className="flex items-center gap-2 no-underline">
          <Image src="/logo.svg" alt="ClinicCare" width={28} height={28} priority />
          <span className="text-lg font-bold text-foreground">ClinicCare</span>
        </Link>
      </header>
      <main className="flex min-h-[calc(100vh-65px)] items-center justify-center p-4">
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </>
  );
}
