import { routing } from "@/i18n/routing";
import { VerifyEmailOtpForm } from "@/src/features/auth/components/VerifyEmailOtpForm";
import { Suspense } from "react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Server page — passes params Promise to child inside Suspense.
 * Required by cacheComponents: params is a runtime API.
 */
async function VerifyEmailContent({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ email?: string }>;
}) {
  const { email } = await searchParamsPromise;
  return <VerifyEmailOtpForm email={email ?? ""} />;
}

export default function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  return (
    <Suspense>
      <VerifyEmailContent searchParamsPromise={searchParams} />
    </Suspense>
  );
}
