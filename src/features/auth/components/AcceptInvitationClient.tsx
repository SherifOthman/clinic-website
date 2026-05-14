"use client";

import { AuthBrandingPanel } from "@/src/core/components/ui/AuthBrandingPanel";
import { ErrorAlert } from "@/src/core/components/ui/ErrorAlert";
import { GenderSelect } from "@/src/core/components/ui/GenderSelect";
import { FormField } from "@/src/core/components/ui/FormField";
import { PasswordInput } from "@/src/core/components/ui/PasswordInput";
import { PhoneInput } from "@/src/core/components/ui/PhoneInput";
import { AuthTopBar } from "@/src/core/components/ui/AuthTopBar";
import {
  useAcceptInvitationForm,
  useInvitationDetail,
} from "@/src/features/auth/hooks/useAcceptInvitation";
import {
  Button,
  Separator,
} from "@heroui/react";
import {
  Building2,
  CheckCircle,
  Loader2,
  Stethoscope,
  UserCog,
  XCircle,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Controller } from "react-hook-form";

interface Props {
  token: string;
}

function CheckingIndicator() {
  const tErr = useTranslations("auth.errors");
  return (
    <p className="flex items-center gap-1 text-xs text-muted">
      <Loader2 className="h-3 w-3 animate-spin" />
      {tErr("checking")}
    </p>
  );
}

export function AcceptInvitationClient({ token }: Props) {
  const t = useTranslations("auth.invitation");
  const tNav = useTranslations("navigation");
  const locale = useLocale();

  const {
    invitation,
    error: loadError,
    isLoading,
  } = useInvitationDetail(
    token,
    t("invalid"),
    t("expired"),
    t("alreadyAccepted"),
  );

  const { form, error, isPending, done, submit, usernameChecking } =
    useAcceptInvitationForm(token);

  if (loadError) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background px-6">
        <AuthTopBar className="absolute top-4 inset-x-4 flex items-center justify-between z-10" />
        <div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
            <XCircle className="h-8 w-8 text-danger" />
          </div>
          <h1 className="text-xl font-bold text-foreground">{loadError}</h1>
          <Link
            href={`/${locale}`}
            className="text-sm text-accent hover:underline"
          >
            {tNav("home")}
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background">
        <AuthTopBar className="absolute top-4 inset-x-4 flex items-center justify-between z-10" />
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (done) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background px-6">
        <AuthTopBar className="absolute top-4 inset-x-4 flex items-center justify-between z-10" />
        <div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <p className="text-lg font-semibold text-success">{t("accepted")}</p>
        </div>
      </div>
    );
  }

  const fullNameErr = form.formState.errors.fullName?.message;
  const userNameErr = form.formState.errors.userName?.message;
  const genderErr = form.formState.errors.gender?.message;

  return (
    <div className="flex min-h-screen w-full">
      <AuthBrandingPanel locale={locale}>
        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold leading-tight">{t("title")}</h1>
            <p className="text-lg opacity-80">
              {t("subtitle")}{" "}
              <span className="font-bold opacity-100">
                {invitation!.clinicName}
              </span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs opacity-70">{t("clinic")}</p>
                <p className="font-semibold">{invitation!.clinicName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20">
                <UserCog className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs opacity-70">{t("role")}</p>
                <p className="font-semibold">{invitation!.role}</p>
              </div>
            </div>
            {invitation!.specializationName && (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs opacity-70">{t("specialization")}</p>
                  <p className="font-semibold">
                    {invitation!.specializationName}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </AuthBrandingPanel>

      <div className="relative flex w-full lg:w-1/2 flex-col items-center justify-center bg-background px-6 py-12">
        <AuthTopBar className="absolute top-4 inset-x-4 flex items-center justify-between" />

        <div className="w-full max-w-sm space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {t("formTitle")}
            </h2>
            <p className="mt-1 text-sm text-muted">{t("formSubtitle")}</p>
          </div>

          <form
            onSubmit={form.handleSubmit(submit)}
            noValidate
            className="space-y-4"
          >
            {error && <ErrorAlert message={error} />}

            <FormField
              label={t("fullName")}
              error={fullNameErr}
              autoComplete="name"
              {...form.register("fullName")}
            />

            <div className="space-y-1">
              <FormField
                label={t("username")}
                error={userNameErr}
                autoComplete="username"
                {...form.register("userName")}
              />
              {usernameChecking && <CheckingIndicator />}
            </div>

            <Controller
              name="phoneNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <PhoneInput
                  label={t("phone")}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  required
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <PasswordInput
                  label={t("password")}
                  value={field.value}
                  onChange={field.onChange}
                  autoComplete="new-password"
                  required
                  error={fieldState.error?.message}
                />
              )}
            />

            <GenderSelect t={t} value={form.watch("gender")}
              onChange={(val) => form.setValue("gender", val, { shouldValidate: true })}
              error={genderErr} />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isPending={isPending}
            >
              {({ isPending: ip }) => (ip ? t("submitting") : t("submit"))}
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted">{t("haveAccount")}</span>
            <Separator className="flex-1" />
          </div>

          <Link
            href={`/${locale}/login`}
            className="flex w-full items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium transition hover:bg-surface-secondary"
          >
            {t("signIn")}
          </Link>
        </div>
      </div>
    </div>
  );
}
