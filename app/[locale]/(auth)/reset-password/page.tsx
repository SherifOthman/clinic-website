import { routing } from "@/i18n/routing";
import { ResetPasswordForm } from "@/src/features/auth/components/ResetPasswordForm";
import { Suspense } from "react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
