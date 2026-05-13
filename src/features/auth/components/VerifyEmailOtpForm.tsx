"use client";

import { useVerifyEmailOtp } from "@/src/features/auth/hooks/useVerifyEmailOtp";
import { Alert, Button, Card, FieldError, Input, TextField } from "@heroui/react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface Props {
  email: string;
}

export function VerifyEmailOtpForm({ email }: Props) {
  const t = useTranslations("auth.verifyEmail");
  const currentLocale = useLocale();
  const router = useRouter();

  const { form, error, isPending, resending, submit, resend } =
    useVerifyEmailOtp(email, () => {
      router.push(`/${currentLocale}/login?verified=1`);
    });

  const otpValue = form.watch("otp");

  useEffect(() => {
    if (otpValue.length === 6 && !isPending) {
      const t = setTimeout(() => form.handleSubmit(submit)(), 50);
      return () => clearTimeout(t);
    }
  }, [otpValue, isPending]);

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
              <Alert.Content><Alert.Description>{error}</Alert.Description></Alert.Content>
            </Alert>
          )}

          <form onSubmit={form.handleSubmit(submit)} noValidate className="flex flex-col items-center gap-6">
            <Controller
              name="otp"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="flex w-full flex-col gap-1">
                  <TextField isInvalid={!!fieldState.error}>
                    <Input
                      {...field}
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="000000"
                      disabled={isPending}
                      autoFocus
                      className="text-center text-lg tracking-[0.5em]"
                    />
                  </TextField>
                  <FieldError>{otpErr}</FieldError>
                </div>
              )}
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isDisabled={otpValue.length !== 6}
              isPending={isPending}
            >
              {({ isPending: ip }) => ip ? t("verifying") : t("verify")}
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
            <Link href={`/${currentLocale}/login`} className="text-accent hover:underline">
              {t("backToLogin")}
            </Link>
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
