import { setRequestLocale } from "next-intl/server";

import { OnboardingClient } from "@/src/features/onboarding/OnboardingClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function OnboardingPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <OnboardingClient />;
}
