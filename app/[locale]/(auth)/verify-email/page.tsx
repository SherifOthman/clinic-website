import { routing } from "@/i18n/routing";
import { VerifyEmailOtpForm } from "@/src/features/auth/components/VerifyEmailOtpForm";
import { Suspense } from "react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function VerifyEmailContent({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  return <VerifyEmailOtpForm email={email ?? ""} />;
}

export default function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  return (
    <Suspense>
      <VerifyEmailContent searchParams={searchParams} />
    </Suspense>
  );
}
