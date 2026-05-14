"use client";

import { ErrorAlert } from "@/src/core/components/ui/ErrorAlert";
import { FormField } from "@/src/core/components/ui/FormField";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useLocale } from "next-intl";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { createForgotPasswordOtpSchema } from "@/src/features/auth/schemas/forgotPasswordOtp";

type FormData = z.infer<ReturnType<typeof createForgotPasswordOtpSchema>>;

interface Props {
  form: UseFormReturn<FormData>;
  error: string | null;
  isPending: boolean;
  submitEmail: () => void;
  t: (key: string, values?: Record<string, string | number | Date>) => string;
  tErr: (key: string) => string;
}

export function ForgotPasswordEmailStep({ form, error, isPending, submitEmail, t, tErr }: Props) {
  const currentLocale = useLocale();
  const emailErr = form.formState.errors.email?.message;

  return (
    <>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">{t("title")}</h2>
        <p className="mt-1 text-sm text-muted">{t("subtitle")}</p>
      </div>

      {error && <ErrorAlert message={tErr(error)} />}

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
  );
}