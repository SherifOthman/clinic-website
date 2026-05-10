import { routing } from "@/i18n/routing";
import { RegisterForm } from "@/src/features/auth/components/RegisterForm";
import { Suspense } from "react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
