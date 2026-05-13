"use client";

import { FormField } from "@/src/core/components/ui/FormField";
import { PasswordInput } from "@/src/core/components/ui/PasswordInput";
import { PhoneInput } from "@/src/core/components/ui/PhoneInput";
import { ThemeSwitch } from "@/src/core/components/ui/ThemeSwitch";
import { useAcceptInvitationForm, useInvitationDetail } from "@/src/features/auth/hooks/useAcceptInvitation";
import { Alert, Button, FieldError, Label, ListBox, Select, Separator } from "@heroui/react";
import { Building2, CheckCircle, Globe, Stethoscope, UserCog, XCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Controller } from "react-hook-form";

interface Props {
  token: string;
}

export function AcceptInvitationClient({ token }: Props) {
  const t = useTranslations("auth.invitation");
  const tErr = useTranslations("auth.errors");
  const tNav = useTranslations("navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const { invitation, error: loadError, isLoading } = useInvitationDetail(
    token, t("invalid"), t("expired"), t("alreadyAccepted"),
  );

  const { form, error, isPending, done, submit } = useAcceptInvitationForm(
    token,
    { required: tErr("required"), passwordMin: tErr("passwordMin") },
  );

  const switchLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.push(pathname.replace(`/${locale}/`, `/${newLocale}/`));
  };

  const TopBar = () => (
    <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
      <Button variant="ghost" size="sm" onPress={switchLocale}>
        <Globe className="me-1 h-4 w-4" />
        {locale === "en" ? "العربية" : "English"}
      </Button>
      <ThemeSwitch />
    </div>
  );

  if (loadError) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background px-6">
        <TopBar />
        <div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
            <XCircle className="h-8 w-8 text-danger" />
          </div>
          <h1 className="text-xl font-bold text-foreground">{loadError}</h1>
          <Link href={`/${locale}`} className="text-sm text-accent hover:underline">
            {tNav("home")}
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background">
        <TopBar />
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (done) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background px-6">
        <TopBar />
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
  const phoneErr = form.formState.errors.phoneNumber?.message;
  const passwordErr = form.formState.errors.password?.message;
  const genderErr = form.formState.errors.gender?.message;

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-accent p-12 text-accent-foreground">
        <Link href={`/${locale}`} className="flex items-center gap-3 no-underline">
          <Image src="/logo.svg" alt="ClinicCare" width={36} height={36} priority />
          <span className="text-2xl font-bold text-accent-foreground">ClinicCare</span>
        </Link>

        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold leading-tight">{t("title")}</h1>
            <p className="text-lg opacity-80">
              {t("subtitle")} <span className="font-bold opacity-100">{invitation!.clinicName}</span>
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
                  <p className="font-semibold">{invitation!.specializationName}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-sm opacity-60">© {new Date().getFullYear()} ClinicCare.</p>
      </div>

      <div className="relative flex w-full lg:w-1/2 flex-col items-center justify-center bg-background px-6 py-12">
        <div className="absolute top-4 inset-x-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onPress={switchLocale}>
            <Globe className="me-1 h-4 w-4" />
            {locale === "en" ? "العربية" : "English"}
          </Button>
          <ThemeSwitch />
        </div>

        <div className="w-full max-w-sm space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t("formTitle")}</h2>
            <p className="mt-1 text-sm text-muted">{t("formSubtitle")}</p>
          </div>

          <form onSubmit={form.handleSubmit(submit)} noValidate className="space-y-4">
            {error && (
              <Alert status="danger">
                <Alert.Indicator />
                <Alert.Content><Alert.Description>{error}</Alert.Description></Alert.Content>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-3">
              <FormField label={t("fullName")} error={fullNameErr} autoComplete="name"
                {...form.register("fullName")} />
              <FormField label={t("username")} error={userNameErr} autoComplete="username"
                {...form.register("userName")} />
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
                  searchPlaceholder={t("searchCountry")}
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

            <Controller
              name="gender"
              control={form.control}
              render={({ field, fieldState }) => (
                <Select isRequired isInvalid={!!fieldState.error} variant="secondary" defaultSelectedKey="Male"
                  selectedKey={field.value}
                  onSelectionChange={(key) => {
                    if (key) field.onChange(String(key));
                  }}
                  placeholder={t("gender")} className="flex flex-col gap-1.5"
                >
                  <Label>{t("gender")}</Label>
                  <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="Male" textValue={t("male")}>{t("male")}<ListBox.ItemIndicator /></ListBox.Item>
                      <ListBox.Item id="Female" textValue={t("female")}>{t("female")}<ListBox.ItemIndicator /></ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                  <FieldError>{genderErr}</FieldError>
                </Select>
              )}
            />

            <Button type="submit" variant="primary" fullWidth isPending={isPending}>
              {({ isPending: ip }) => ip ? t("submitting") : t("submit")}
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted">{t("haveAccount")}</span>
            <Separator className="flex-1" />
          </div>

          <Link href={`/${locale}/login`}
            className="flex w-full items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium transition hover:bg-surface-secondary">
            {t("signIn")}
          </Link>
        </div>
      </div>
    </div>
  );
}
