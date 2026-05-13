import { routing } from "@/i18n/routing";
import { LoginForm } from "@/src/features/auth/components/LoginForm";
import { Suspense } from "react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
