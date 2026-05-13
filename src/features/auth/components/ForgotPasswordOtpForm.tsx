"use client";

import { FormField } from "@/src/core/components/ui/FormField";
import { PasswordInput } from "@/src/core/components/ui/PasswordInput";
import { useForgotPasswordOtp } from "@/src/features/auth/hooks/useForgotPasswordOtp";
import { Alert, Button, Card, FieldError, InputOTP, REGEXP_ONLY_DIGITS } from "@heroui/react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

export function ForgotPasswordOtpForm() {
  const t = useTranslations("auth.forgotPassword");
  const currentLocale = useLocale();
  const router = useRouter();

  const { step, error, form, isPending, submitEmail, submitOtp, submitPassword, resendOtp } =
    useForgotPasswordOtp(() => router.push(`/${currentLocale}/login?reset=1`));

  const otp = form.watch("otp");

  useEffect(() => {
    if (otp.length === 6 && !isPending) {
      const t = setTimeout(() => submitOtp(), 50);
      return () => clearTimeout(t);
    }
  }, [otp, isPending]);

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
          <Alert.Content><Alert.Description>{error}</Alert.Description></Alert.Content>
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
            <Controller
              name="otp"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col items-center gap-2">
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    pattern={REGEXP_ONLY_DIGITS}
                    isDisabled={isPending}
                    autoFocus
                    isInvalid={!!fieldState.error}
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
                  <FieldError>{otpErr}</FieldError>
                </div>
              )}
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isDisabled={otp.length !== 6}
              isPending={isPending}
            >
              {({ isPending: ip }) => ip ? t("verifying") : t("verifyCode")}
            </Button>
          </form>

          <p className="text-center text-sm text-muted">
            {t("noCode")}{" "}
            <button
              type="button"
              onClick={resendOtp}
              disabled={isPending}
              className="font-medium text-accent hover:underline disabled:opacity-50"
            >
              {t("resend")}
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
                  variant="secondary"
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
