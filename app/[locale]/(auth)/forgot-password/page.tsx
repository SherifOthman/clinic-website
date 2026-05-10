import { routing } from "@/i18n/routing";
import { ForgotPasswordForm } from "@/src/features/auth/components/ForgotPasswordForm";
import { Suspense } from "react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordForm />
    </Suspense>
  );
}
