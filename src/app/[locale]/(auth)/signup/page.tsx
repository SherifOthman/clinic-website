import { setRequestLocale } from "next-intl/server";

import { SignupForm } from "@/src/features/auth/SignupForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SignupPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <SignupForm />;
}
