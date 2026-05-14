"use client";

import { ErrorAlert } from "@/src/core/components/ui/ErrorAlert";
import { PasswordInput } from "@/src/core/components/ui/PasswordInput";
import { Button } from "@heroui/react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { z } from "zod";
import type { createForgotPasswordOtpSchema } from "@/src/features/auth/schemas/forgotPasswordOtp";

type FormData = z.infer<ReturnType<typeof createForgotPasswordOtpSchema>>;

interface Props {
  control: Control<FormData>;
  error: string | null;
  isPending: boolean;
  submitPassword: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
  tErr: (key: string) => string;
}

export function ForgotPasswordNewPasswordStep({ control, error, isPending, submitPassword, t, tErr }: Props) {
  return (
    <>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">{t("newPasswordTitle")}</h2>
        <p className="mt-1 text-sm text-muted">{t("newPasswordSubtitle")}</p>
      </div>

      {error && <ErrorAlert message={tErr(error)} />}

      <form onSubmit={(e) => { e.preventDefault(); submitPassword(); }} noValidate className="flex flex-col gap-4">
        <Controller
          name="newPassword"
          control={control}
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
  );
}