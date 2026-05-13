import { routing } from "@/i18n/routing";
import { VerifyEmailOtpForm } from "@/src/features/auth/components/VerifyEmailOtpForm";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  return <VerifyEmailOtpForm email={email ?? ""} />;
}
