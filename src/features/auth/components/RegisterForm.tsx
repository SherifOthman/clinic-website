"use client";

import { AuthBrandingPanel } from "@/src/core/components/ui/AuthBrandingPanel";
import { ErrorAlert } from "@/src/core/components/ui/ErrorAlert";
import { GenderSelect } from "@/src/core/components/ui/GenderSelect";
import { GoogleIcon } from "@/src/core/components/ui/GoogleIcon";
import { FormField } from "@/src/core/components/ui/FormField";
import { PasswordInput } from "@/src/core/components/ui/PasswordInput";
import { PhoneInput } from "@/src/core/components/ui/PhoneInput";
import { AuthTopBar } from "@/src/core/components/ui/AuthTopBar";
import { useRegisterForm } from "@/src/features/auth/hooks/useRegisterForm";
import { Alert, Button, Separator } from "@heroui/react";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";

// ─── Checking indicator for availability validation ─────────────────────────

function CheckingIndicator({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-muted">
      <Loader2 className="h-3 w-3 animate-spin" />
      <LocaleAwareChecking />
    </p>
  );
}

function LocaleAwareChecking() {
  const tErr = useTranslations("auth.errors");
  return <>{tErr("checking")}</>;
}

// ─── Main form ──────────────────────────────────────────────────────────────

export function RegisterForm() {
  const t = useTranslations("auth.register");
  const tNav = useTranslations("navigation");
  const currentLocale = useLocale();
  const router = useRouter();

  const tErr = useTranslations("auth.errors");
  const { form, error, isPending, googleOAuthUrl, submit, emailChecking, usernameChecking } = useRegisterForm(
    (loc) => router.push(`/${loc}/verify-email?email=${encodeURIComponent(form.getValues("email"))}`),
    currentLocale,
  );

  const err = form.formState.errors;
  const fullNameErr = err.fullName?.message;
  const userNameErr = err.userName?.message;
  const emailErr = err.email?.message;

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side — branding */}
      <AuthBrandingPanel locale={currentLocale}>
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold leading-tight">{t("panelHeading")}</h2>
            <p className="text-base opacity-80">{t("panelSubtitle")}</p>
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <span className="text-sm">0{i}</span>
                </div>
                <p className="text-sm font-medium opacity-90">{t(`feature${i}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </AuthBrandingPanel>

      {/* Right side — form */}
      <div className="relative flex w-full lg:w-1/2 flex-col items-center justify-center bg-background px-6 py-12">
        <AuthTopBar className="absolute top-4 inset-x-4 flex items-center justify-between" />

        <div className="w-full max-w-sm space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t("title")}</h2>
            <p className="mt-1 text-sm text-muted">{t("subtitle")}</p>
          </div>

          <form onSubmit={form.handleSubmit(submit)} noValidate className="space-y-4">
            {error && <ErrorAlert message={tErr(error)} />}

            {/* Full name */}
            <FormField label={t("fullName")} error={fullNameErr} autoComplete="name"
              {...form.register("fullName")} />

            {/* Username */}
            <div className="space-y-1">
              <FormField label={t("username")} error={userNameErr} autoComplete="username"
                {...form.register("userName")} />
              <CheckingIndicator visible={usernameChecking} />
            </div>

            {/* Email with availability check */}
            <div className="space-y-1">
              <FormField label={t("email")} error={emailErr} type="email" autoComplete="email"
                {...form.register("email")} />
              <CheckingIndicator visible={emailChecking} />
            </div>

            {/* Phone */}
            <PhoneInput label={t("phone")} value={form.watch("phoneNumber")}
              onChange={(value) => form.setValue("phoneNumber", value, { shouldValidate: true })}
              required
              isInvalid={!!err.phoneNumber} errorMessage={err.phoneNumber?.message} />

            {/* Gender */}
            <GenderSelect t={t} value={form.watch("gender")}
              onChange={(val) => form.setValue("gender", val, { shouldValidate: true })}
              error={err.gender?.message} />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <PasswordInput label={t("password")} value={field.value} onChange={field.onChange}
                  autoComplete="new-password" required error={fieldState.error?.message} />
              )}
            />

            <Button type="submit" variant="primary" fullWidth isPending={isPending}>
              {({ isPending: ip }) => ip ? t("submitting") : t("submit")}
            </Button>
          </form>

          <p className="text-center text-sm text-muted">
            {t("haveAccount")}{" "}
            <Link href={`/${currentLocale}/login`} className="font-medium text-accent hover:underline">
              {t("signIn")}
            </Link>
          </p>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted">{t("or")}</span>
            <Separator className="flex-1" />
          </div>

          <a href={googleOAuthUrl}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium transition hover:bg-surface-secondary">
            <GoogleIcon />
            {t("signUpWithGoogle")}
          </a>
        </div>
      </div>
    </div>
  );
}
