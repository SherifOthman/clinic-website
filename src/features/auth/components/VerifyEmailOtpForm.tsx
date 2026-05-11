"use client";

import { ThemeSwitch } from "@/src/core/components/ui/ThemeSwitch";
import { useVerifyEmailOtp } from "@/src/features/auth/hooks/useVerifyEmailOtp";
import { Alert, Button, InputOTP, REGEXP_ONLY_DIGITS } from "@heroui/react";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

interface Props {
  email: string;
}

/**
 * Email OTP verification screen shown after registration.
 * Split-panel layout matching other auth pages.
 * Uses HeroUI InputOTP — 6 digit slots split 3|3.
 */
export function VerifyEmailOtpForm({ email }: Props) {
  const t = useTranslations("auth.verifyEmail");
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const pathname = usePathname();

  const { otp, setOtp, error, loading, resending, submit, resend } =
    useVerifyEmailOtp(email, () => {
      router.push(`/${locale}/login?verified=1`);
    });

  function handleChange(value: string) {
    setOtp(value);
    if (value.length === 6) setTimeout(() => submit(), 50);
  }

  const switchLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.push(pathname.replace(`/${locale}/`, `/${newLocale}/`));
  };

  const maskedEmail = email
    ? email.replace(/(.{2}).+(@.+)/, "$1***$2")
    : "your email";

  return (
    <div className="flex min-h-screen w-full">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-accent p-12 text-accent-foreground">
        <Link href={`/${locale}`} className="flex items-center gap-3 no-underline">
          <Image src="/logo.svg" alt="ClinicCare" width={36} height={36} priority />
          <span className="text-2xl font-bold text-accent-foreground">ClinicCare</span>
        </Link>
        <div className="space-y-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-4xl">
            ✉️
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold leading-tight">{t("panelHeading")}</h1>
            <p className="text-lg opacity-80">{t("panelSubtitle")}</p>
          </div>
          <ul className="space-y-2 text-sm opacity-80">
            <li>• {t("hint1")}</li>
            <li>• {t("hint2")}</li>
            <li>• {t("hint3")}</li>
          </ul>
        </div>
        <p className="text-sm opacity-60">© {new Date().getFullYear()} ClinicCare.</p>
      </div>

      {/* Right panel */}
      <div className="relative flex w-full lg:w-1/2 flex-col items-center justify-center bg-background px-6 py-12">
        {/* Top bar */}
        <div className="absolute top-4 end-4 flex items-center gap-2">
          <Button variant="ghost" size="sm" onPress={switchLocale}>
            <Globe className="me-1 h-4 w-4" />
            {locale === "en" ? "العربية" : "English"}
          </Button>
          <ThemeSwitch />
        </div>

        <Link href={`/${locale}`} className="mb-8 flex items-center gap-2 no-underline lg:hidden">
          <Image src="/logo.svg" alt="ClinicCare" width={32} height={32} />
          <span className="text-xl font-bold">ClinicCare</span>
        </Link>

        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-2xl">
              ✉️
            </div>
            <h2 className="text-2xl font-bold text-foreground">{t("title")}</h2>
            <p className="mt-1 text-sm text-muted">
              {t("subtitle")}{" "}
              <span className="font-medium text-foreground">{maskedEmail}</span>
            </p>
          </div>

          {error && (
            <Alert status="danger">
              <Alert.Indicator />
              <Alert.Content><Alert.Description>{error}</Alert.Description></Alert.Content>
            </Alert>
          )}

          <form onSubmit={submit} className="flex flex-col items-center gap-6">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={handleChange}
              pattern={REGEXP_ONLY_DIGITS}
              isDisabled={loading}
              autoFocus
            >
              <InputOTP.Group>
                <InputOTP.Slot index={0} />
                <InputOTP.Slot index={1} />
                <InputOTP.Slot index={2} />
              </InputOTP.Group>
              <InputOTP.Separator />
              <InputOTP.Group>
                <InputOTP.Slot index={3} />
                <InputOTP.Slot index={4} />
                <InputOTP.Slot index={5} />
              </InputOTP.Group>
            </InputOTP>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isDisabled={otp.length !== 6}
              isPending={loading}
            >
              {({ isPending }) => isPending ? t("verifying") : t("verify")}
            </Button>
          </form>

          <p className="text-center text-sm text-muted">
            {t("noCode")}{" "}
            <button
              type="button"
              onClick={resend}
              disabled={resending}
              className="font-medium text-accent hover:underline disabled:opacity-50"
            >
              {resending ? t("resending") : t("resend")}
            </button>
          </p>

          <p className="text-center text-sm">
            <Link href={`/${locale}/login`} className="text-accent hover:underline">
              {t("backToLogin")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
