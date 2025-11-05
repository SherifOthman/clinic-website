import { Footer } from "@/src/components/Footer";
import { Navbar } from "@/src/components/Navbar";
import { routing } from "@/src/i18n/routing";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function MainLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-4">{children}</main>
      <Footer />
    </div>
  );
}
