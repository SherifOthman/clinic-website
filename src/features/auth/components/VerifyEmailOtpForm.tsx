"use client";

import { authApi } from "@/src/features/auth/api";
import { extractApiError } from "@/src/core/utils/api";
import { ErrorAlert } from "@/src/core/components/ui/ErrorAlert";
import { maskEmail } from "@/src/core/utils/string";
import { useOtpTimer, formatMs } from "@/src/core/hooks/useOtpTimer";
import { OtpInput } from "@/src/features/auth/components/OtpInput";
import { Button, Card } from "@heroui/react";
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

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);
  const [otpSentAt, setOtpSentAt] = useState<number | null>(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (email) setOtpSentAt(Date.now());
  }, [email]);

  const { expiresIn, cooldownLeft, isExpired, canResend } = useOtpTimer(otpSentAt);

  async function submit() {
    if (otp.length !== 6) return;
    setError(null);
    setIsPending(true);
    try {
      const result = await authApi.verifyEmailOtp({ email, otp });
      if (result.ok) setVerified(true);
      else setError(extractApiError(result));
    } finally {
      setOtp("");
      setIsPending(false);
    }
  }

  async function resend() {
    setResendError(null);
    setResending(true);
    try {
      const result = await authApi.resendEmailVerification({ email });
      if (result.ok) {
        setOtpSentAt(Date.now());
        setOtp("");
      } else {
        setResendError(extractApiError(result));
      }
    } catch {
      setResendError("resendFailed");
    } finally {
      setResending(false);
    }
  }

  useEffect(() => {
    if (verified) {
      const id = setTimeout(() => router.push(`/${currentLocale}/login?verified=1`), 1500);
      return () => clearTimeout(id);
    }
  }, [verified, currentLocale, router]);

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

  const maskedEmail = maskEmail(email);

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

          {error && <ErrorAlert message={tErr(error)} />}

          <form onSubmit={(e) => { e.preventDefault(); submit(); }} noValidate className="flex flex-col items-center gap-6">
            <OtpInput
              value={otp}
              onChange={setOtp}
              isPending={isPending}
              error={otp.length > 0 && otp.length !== 6 ? tErr("otpLength") : undefined}
              otpSentAt={otpSentAt}
              isExpired={isExpired}
              expiresInLabel={t("expiresIn", { time: formatMs(expiresIn) })}
              codeExpiredLabel={t("codeExpired")}
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isDisabled={otp.length !== 6 || isExpired}
              isPending={isPending}
            >
              {({ isPending: ip }) => ip ? t("verifying") : t("verify")}
            </Button>
          </form>

          {resendError && <ErrorAlert message={tErr(resendError)} />}

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
