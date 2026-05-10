import { routing } from "@/i18n/routing";
import { LoginForm } from "@/src/features/auth/components/LoginForm";
import { Suspense } from "react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Server page — wraps the client LoginForm in Suspense.
 * Required by cacheComponents: the Suspense boundary lets the static
 * shell render immediately while the client form hydrates.
 */
export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
