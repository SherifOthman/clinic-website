"use client";

import { FieldError, InputOTP, REGEXP_ONLY_DIGITS } from "@heroui/react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

interface OtpInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  isPending: boolean;
  error?: string;
  otpSentAt: number | null;
  isExpired: boolean;
  expiresInLabel: string;
  codeExpiredLabel: string;
}

export function OtpInput<T extends FieldValues>({
  control, name, isPending, error,
  otpSentAt, isExpired, expiresInLabel, codeExpiredLabel,
}: OtpInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col items-center gap-2">
          <div dir="ltr">
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              pattern={REGEXP_ONLY_DIGITS}
              isDisabled={isPending}
              autoFocus
              isInvalid={!!fieldState.error}
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
      )}
    />
  );
}
