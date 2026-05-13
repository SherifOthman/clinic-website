"use client";

import { useForgotPasswordOtp } from "@/src/features/auth/hooks/useForgotPasswordOtp";
import { Card } from "@heroui/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ForgotPasswordEmailStep } from "./ForgotPasswordEmailStep";
import { ForgotPasswordOtpStep } from "./ForgotPasswordOtpStep";
import { ForgotPasswordNewPasswordStep } from "./ForgotPasswordNewPasswordStep";

export function ForgotPasswordOtpForm() {
  const t = useTranslations("auth.forgotPassword");
  const tErr = useTranslations("auth.errors");
  const currentLocale = useLocale();
  const router = useRouter();

  const { step, error, form, isPending, submitEmail, submitOtp, submitPassword, resendOtp, otpSentAt, resendError } =
    useForgotPasswordOtp(() => router.push(`/${currentLocale}/login?reset=1`));

  const email = form.watch("email");
  const maskedEmail = email.replace(/(.{2}).+(@.+)/, "$1***$2");

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-6 py-12">
      <Card className="w-full max-w-[26rem]">
        <Card.Content className="p-6 space-y-6">
          {step === "email" && (
            <ForgotPasswordEmailStep
              form={form}
              error={error}
              isPending={isPending}
              submitEmail={submitEmail}
              t={t}
              tErr={tErr}
            />
          )}

          {step === "otp" && (
            <ForgotPasswordOtpStep
              otp={form.watch("otp")}
              onOtpChange={(v) => form.setValue("otp", v)}
              error={error}
              isPending={isPending}
              resendError={resendError}
              submitOtp={submitOtp}
              resendOtp={resendOtp}
              otpSentAt={otpSentAt}
              maskedEmail={maskedEmail}
              t={t}
              tErr={tErr}
            />
          )}

          {step === "password" && (
            <ForgotPasswordNewPasswordStep
              control={form.control}
              error={error}
              isPending={isPending}
              submitPassword={submitPassword}
              t={t}
              tErr={tErr}
            />
          )}
        </Card.Content>
      </Card>
    </div>
  );
}
