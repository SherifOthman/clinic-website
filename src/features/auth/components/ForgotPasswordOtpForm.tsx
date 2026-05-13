"use client";

import { FormField } from "@/src/core/components/ui/FormField";
import { PasswordInput } from "@/src/core/components/ui/PasswordInput";
import { useForgotPasswordOtp } from "@/src/features/auth/hooks/useForgotPasswordOtp";
import { useOtpTimer, formatMs } from "@/src/core/hooks/useOtpTimer";
import { OtpInput } from "@/src/features/auth/components/OtpInput";
import { Alert, Button, Card } from "@heroui/react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

export function ForgotPasswordOtpForm() {
  const t = useTranslations("auth.forgotPassword");
  const tErr = useTranslations("auth.errors");
  const currentLocale = useLocale();
  const router = useRouter();

  const { step, error, form, isPending, submitEmail, submitOtp, submitPassword, resendOtp, otpSentAt, resendError, clearResendError } =
    useForgotPasswordOtp(() => router.push(`/${currentLocale}/login?reset=1`));

  const { expiresIn, cooldownLeft, isExpired, canResend } = useOtpTimer(otpSentAt);

  const otp = form.watch("otp");

  useEffect(() => {
    if (otp.length === 6 && !isPending) {
      const t = setTimeout(() => submitOtp(), 50);
      return () => clearTimeout(t);
    }
  }, [otp, isPending]);

  useEffect(() => {
    if (resendError) {
      const id = setTimeout(clearResendError, 5000);
      return () => clearTimeout(id);
    }
  }, [resendError, clearResendError]);

  const email = form.watch("email");
  const maskedEmail = email.replace(/(.{2}).+(@.+)/, "$1***$2");

  const panelContent = {
    email: { emoji: "🔒", heading: t("panelHeading"), subtitle: t("panelSubtitle") },
    otp:   { emoji: "🔐", heading: t("otpPanelHeading"), subtitle: t("otpPanelSubtitle") },
    password: { emoji: "🔑", heading: t("newPasswordPanelHeading"), subtitle: t("newPasswordPanelSubtitle") },
  }[step];

  const emailErr = form.formState.errors.email?.message;
  const otpErr = form.formState.errors.otp?.message;
  const passwordErr = form.formState.errors.newPassword?.message;

  const content = (
    <>
      {error && (
        <Alert status="danger">
          <Alert.Indicator />
          <Alert.Content><Alert.Description>{tErr(error)}</Alert.Description></Alert.Content>
        </Alert>
      )}

      {/* ── Step 1: Email ─────────────────────────────────────────────── */}
      {step === "email" && (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">{t("title")}</h2>
            <p className="mt-1 text-sm text-muted">{t("subtitle")}</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); submitEmail(); }} noValidate className="flex flex-col gap-4">
            <FormField label={t("email")} error={emailErr} type="email" autoComplete="email"
              {...form.register("email")} />
            <Button type="submit" variant="primary" fullWidth isPending={isPending}>
              {({ isPending: ip }) => ip ? t("sending") : t("send")}
            </Button>
          </form>

          <p className="text-center text-sm">
            <Link href={`/${currentLocale}/login`} className="text-accent hover:underline">
              {t("backToLogin")}
            </Link>
          </p>
        </>
      )}

      {/* ── Step 2: OTP ───────────────────────────────────────────────── */}
      {step === "otp" && (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">{t("otpTitle")}</h2>
            <p className="mt-1 text-sm text-muted">
              {t("otpSubtitle")}{" "}
              <span className="font-medium text-foreground">{maskedEmail}</span>
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); submitOtp(); }} noValidate className="flex flex-col items-center gap-6">
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
              isDisabled={otp.length !== 6 || isExpired}
              isPending={isPending}
            >
              {({ isPending: ip }) => ip ? t("verifying") : t("verifyCode")}
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
              onClick={resendOtp}
              disabled={isPending || !canResend}
              className="font-medium text-accent hover:underline disabled:opacity-50"
            >
              {canResend ? t("resend") : t("resendIn", { time: formatMs(cooldownLeft) })}
            </button>
          </p>
        </>
      )}

      {/* ── Step 3: New password ──────────────────────────────────────── */}
      {step === "password" && (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">{t("newPasswordTitle")}</h2>
            <p className="mt-1 text-sm text-muted">{t("newPasswordSubtitle")}</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); submitPassword(); }} noValidate className="flex flex-col gap-4">
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <PasswordInput
                  label={t("newPassword")}
                  value={field.value}
                  onChange={field.onChange}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Button type="submit" variant="primary" fullWidth isPending={isPending}>
              {({ isPending: ip }) => ip ? t("submitting") : t("submit")}
            </Button>
          </form>
        </>
      )}
    </>
  );

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-6 py-12">
      <Card className="w-full max-w-[26rem]">
        <Card.Content className="p-6 space-y-6">
          {content}
        </Card.Content>
      </Card>
    </div>
  );
}
