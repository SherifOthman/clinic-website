"use client";

import { FieldError, InputOTP, REGEXP_ONLY_DIGITS } from "@heroui/react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  isPending: boolean;
  error?: string;
  otpSentAt: number | null;
  isExpired: boolean;
  expiresInLabel: string;
  codeExpiredLabel: string;
}

export function OtpInput({
  value, onChange, isPending, error,
  otpSentAt, isExpired, expiresInLabel, codeExpiredLabel,
}: OtpInputProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div dir="ltr">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={onChange}
          pattern={REGEXP_ONLY_DIGITS}
          isDisabled={isPending}
          autoFocus
          isInvalid={!!error}
          variant="secondary"
          dir="ltr"
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
      </div>
      <FieldError>{error}</FieldError>
      {otpSentAt && (isExpired ? (
        <p className="text-xs text-danger">{codeExpiredLabel}</p>
      ) : (
        <p className="text-xs text-muted">{expiresInLabel}</p>
      ))}
    </div>
  );
}
