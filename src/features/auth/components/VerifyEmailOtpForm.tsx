"use client";

import { useVerifyEmailOtp } from "@/src/features/auth/hooks/useVerifyEmailOtp";
import { useOtpTimer, formatMs } from "@/src/core/hooks/useOtpTimer";
import { OtpInput } from "@/src/features/auth/components/OtpInput";
import { Alert, Button, Card } from "@heroui/react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  email: string;
}

export function VerifyEmailOtpForm({ email }: Props) {
  const t = useTranslations("auth.verifyEmail");
  const tErr = useTranslations("auth.errors");
  const currentLocale = useLocale();
  const router = useRouter();

  const [verified, setVerified] = useState(false);

  const { form, error, isPending, resending, submit, resend, otpSentAt, resendError, clearResendError } =
    useVerifyEmailOtp(email, () => {
      setVerified(true);
    });

  useEffect(() => {
    if (verified) {
      const id = setTimeout(() => router.push(`/${currentLocale}/login?verified=1`), 1500);
      return () => clearTimeout(id);
    }
  }, [verified, currentLocale, router]);

  const { expiresIn, cooldownLeft, isExpired, canResend } = useOtpTimer(otpSentAt);

  const otpValue = form.watch("otp");

  useEffect(() => {
    if (otpValue.length === 6 && !isPending) {
      const t = setTimeout(() => form.handleSubmit(submit)(), 50);
      return () => clearTimeout(t);
    }
  }, [otpValue, isPending]);

  useEffect(() => {
    if (resendError) {
      const id = setTimeout(clearResendError, 5000);
      return () => clearTimeout(id);
    }
  }, [resendError, clearResendError]);

  if (verified) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background px-6 py-12">
        <Card className="w-full max-w-[26rem]">
          <Card.Content className="p-6 space-y-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-2xl text-success">✓</div>
              <h2 className="text-2xl font-bold text-foreground">{t("verifiedTitle")}</h2>
              <p className="mt-1 text-sm text-muted">{t("verifiedMessage")}</p>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }

  const maskedEmail = email
    ? email.replace(/(.{2}).+(@.+)/, "$1***$2")
    : "your email";

  const otpErr = form.formState.errors.otp?.message;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-6 py-12">
      <Card className="w-full max-w-[26rem]">
        <Card.Content className="p-6 space-y-6">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-2xl">✉️</div>
            <h2 className="text-2xl font-bold text-foreground">{t("title")}</h2>
            <p className="mt-1 text-sm text-muted">
              {t("subtitle")}{" "}
              <span className="font-medium text-foreground">{maskedEmail}</span>
            </p>
          </div>

          {error && (
            <Alert status="danger">
              <Alert.Indicator />
              <Alert.Content><Alert.Description>{tErr(error)}</Alert.Description></Alert.Content>
            </Alert>
          )}

          <form onSubmit={form.handleSubmit(submit)} noValidate className="flex flex-col items-center gap-6">
            <OtpInput
              control={form.control}
              name="otp"
              isPending={isPending}
              error={otpErr}
              otpSentAt={otpSentAt}
              isExpired={isExpired}
              expiresInLabel={t("expiresIn", { time: formatMs(expiresIn) })}
              codeExpiredLabel={t("codeExpired")}
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isDisabled={otpValue.length !== 6 || isExpired}
              isPending={isPending}
            >
              {({ isPending: ip }) => ip ? t("verifying") : t("verify")}
            </Button>
          </form>

          {resendError && (
            <Alert status="danger">
              <Alert.Indicator />
              <Alert.Content><Alert.Description>{tErr(resendError)}</Alert.Description></Alert.Content>
            </Alert>
          )}

          <p className="text-center text-sm text-muted">
            {t("noCode")}{" "}
            <button
              type="button"
              onClick={resend}
              disabled={resending || !canResend}
              className="font-medium text-accent hover:underline disabled:opacity-50"
            >
              {resending ? t("resending") : canResend ? t("resend") : t("resendIn", { time: formatMs(cooldownLeft) })}
            </button>
          </p>

          <p className="text-center text-sm">
            <Link href={`/${currentLocale}/login`} className="text-accent hover:underline">
              {t("backToLogin")}
            </Link>
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
