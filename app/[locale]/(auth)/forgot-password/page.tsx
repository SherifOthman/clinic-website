import { routing } from "@/i18n/routing";
import { ForgotPasswordOtpForm } from "@/src/features/auth/components/ForgotPasswordOtpForm";
import { Suspense } from "react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordOtpForm />
    </Suspense>
  );
}
