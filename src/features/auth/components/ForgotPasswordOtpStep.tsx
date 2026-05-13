"use client";

import { OtpInput } from "@/src/features/auth/components/OtpInput";
import { useOtpTimer, formatMs } from "@/src/core/hooks/useOtpTimer";
import { Alert, Button } from "@heroui/react";

interface Props {
  otp: string;
  onOtpChange: (v: string) => void;
  error: string | null;
  isPending: boolean;
  resendError: string | null;
  submitOtp: () => void;
  resendOtp: () => void;
  otpSentAt: number | null;
  maskedEmail: string;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
  tErr: (key: string) => string;
}

export function ForgotPasswordOtpStep({
  otp, onOtpChange, error, isPending, resendError,
  submitOtp, resendOtp, otpSentAt, maskedEmail, t, tErr,
}: Props) {
  const { expiresIn, cooldownLeft, isExpired, canResend } = useOtpTimer(otpSentAt);

  const otpErr = otp.length > 0 && otp.length !== 6 ? tErr("otpLength") : undefined;

  return (
    <>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">{t("otpTitle")}</h2>
        <p className="mt-1 text-sm text-muted">
          {t("otpSubtitle")}{" "}
          <span className="font-medium text-foreground">{maskedEmail}</span>
        </p>
      </div>

      {error && (
        <Alert status="danger">
          <Alert.Indicator />
          <Alert.Content><Alert.Description>{tErr(error)}</Alert.Description></Alert.Content>
        </Alert>
      )}

      <form onSubmit={(e) => { e.preventDefault(); submitOtp(); }} noValidate className="flex flex-col items-center gap-6">
        <OtpInput
          value={otp}
          onChange={onOtpChange}
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
  );
}
