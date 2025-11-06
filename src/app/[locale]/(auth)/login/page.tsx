import { setRequestLocale } from "next-intl/server";

import { LoginForm } from "@/src/features/auth/LoginForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <LoginForm />;
}
