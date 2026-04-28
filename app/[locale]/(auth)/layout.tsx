import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
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
        <Link href={`/${locale}`} className="text-xl font-bold text-accent">
          ClinicMS
        </Link>
      </header>
      <main className="flex min-h-[calc(100vh-65px)] items-center justify-center p-4">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </>
  );
}
