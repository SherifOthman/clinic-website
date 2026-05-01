import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

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

  // NavbarWrapper handles the outer flex column and AuthNavbar.
  // This layout just centers the auth card vertically in the remaining space.
  return (
    <div className="flex flex-1 items-center justify-center bg-default/30 p-4">
      {children}
    </div>
  );
}
