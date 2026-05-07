"use client";

import { PasswordInput } from "@/src/core/components/ui/PasswordInput";
import { ThemeSwitch } from "@/src/core/components/ui/ThemeSwitch";
import { useAcceptInvitation } from "@/src/features/auth/hooks/useAcceptInvitation";
import { Alert, Button, Chip, Input, Label, ListBox, Select, Separator, TextField } from "@heroui/react";
import { Building2, CheckCircle, Globe, Stethoscope, UserCog, XCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

// Token is dynamic — can't be pre-rendered at build time
export const dynamic = "force-dynamic";

export default function AcceptInvitationPage() {
  const t = useTranslations("auth.invitation");
  const tNav = useTranslations("navigation");
  const { token } = useParams<{ token: string }>();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const { invitation, loadError, form, error, loading, done, setField, submit } =
    useAcceptInvitation(token ?? null, t("invalid"), t("expired"), t("alreadyAccepted"));

  const handleGenderChange = (value: React.Key | null) => {
    if (value) {
      const e = { target: { value: String(value) } } as React.ChangeEvent<HTMLSelectElement>;
      setField("gender")(e);
    }
  };

  const switchLocale = () => {
    // Replace the locale segment in the current path
    const newLocale = locale === "en" ? "ar" : "en";
    const newPath = pathname.replace(`/${locale}/`, `/${newLocale}/`);
    router.push(newPath);
  };

  // ── Top bar — shared across all states ────────────────────────────────────
  const TopBar = () => (
    <div className="absolute top-4 end-4 flex items-center gap-2 z-10">
      <Button variant="ghost" size="sm" onPress={switchLocale}>
        <Globe className="me-1 h-4 w-4" />
        {locale === "en" ? "العربية" : "English"}
      </Button>
      <ThemeSwitch />
    </div>
  );

  // ── Error state ────────────────────────────────────────────────────────────
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

  // ── Loading ────────────────────────────────────────────────────────────────
  if (!invitation) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background">
        <TopBar />
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  // ── Success ────────────────────────────────────────────────────────────────
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

  // ── Main form — split panel ────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen w-full">

      {/* Left panel — invitation context */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-accent p-12 text-accent-foreground">
        <Link href={`/${locale}`} className="flex items-center gap-3 no-underline">
          <Image src="/logo.svg" alt="ClinicCare" width={36} height={36} priority />
          <span className="text-2xl font-bold text-accent-foreground">ClinicCare</span>
        </Link>

        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold leading-tight">{t("title")}</h1>
            <p className="text-lg opacity-80">
              {t("subtitle")} <span className="font-bold opacity-100">{invitation.clinicName}</span>
            </p>
          </div>

          {/* Invitation details — read-only */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs opacity-70">{t("clinic")}</p>
                <p className="font-semibold">{invitation.clinicName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20">
                <UserCog className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs opacity-70">{t("role")}</p>
                <p className="font-semibold">{invitation.role}</p>
              </div>
            </div>
            {invitation.specializationName && (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs opacity-70">{t("specialization")}</p>
                  <p className="font-semibold">{invitation.specializationName}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-sm opacity-60">© {new Date().getFullYear()} ClinicCare.</p>
      </div>

      {/* Right panel — registration form */}
      <div className="relative flex w-full lg:w-1/2 flex-col items-center justify-center bg-background px-6 py-12">

        {/* Language + theme toggle — top right */}
        <div className="absolute top-4 end-4 flex items-center gap-2">
          <Button variant="ghost" size="sm" onPress={switchLocale}>
            <Globe className="me-1 h-4 w-4" />
            {locale === "en" ? "العربية" : "English"}
          </Button>
          <ThemeSwitch />
        </div>

        {/* Mobile logo */}
        <Link href={`/${locale}`} className="mb-6 flex items-center gap-2 no-underline lg:hidden">
          <Image src="/logo.svg" alt="ClinicCare" width={32} height={32} />
          <span className="text-xl font-bold">ClinicCare</span>
        </Link>

        <div className="w-full max-w-sm space-y-6">

          {/* Heading */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t("formTitle")}</h2>
            <p className="mt-1 text-sm text-muted">{t("formSubtitle")}</p>
          </div>

          {/* Invitation summary — visible on both mobile and desktop */}
          <div className="rounded-xl border border-border bg-surface p-4 space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">{t("clinic")}</span>
              <span className="font-semibold text-foreground">{invitation.clinicName}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">{t("role")}</span>
              <Chip color="accent" variant="soft" size="sm">{invitation.role}</Chip>
            </div>
            {invitation.specializationName && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">{t("specialization")}</span>
                <span className="font-semibold text-foreground">{invitation.specializationName}</span>
              </div>
            )}
          </div>

          <form onSubmit={submit} className="space-y-4">
            {error && (
              <Alert status="danger">
                <Alert.Indicator />
                <Alert.Content><Alert.Description>{error}</Alert.Description></Alert.Content>
              </Alert>
            )}

            {/* Full name + username */}
            <div className="grid grid-cols-2 gap-3">
              <TextField isRequired className="flex flex-col gap-1.5">
                <Label>{t("fullName")}</Label>
                <Input type="text" autoComplete="name" value={form.fullName}
                  onChange={setField("fullName")} variant="secondary" className="w-full" />
              </TextField>
              <TextField isRequired className="flex flex-col gap-1.5">
                <Label>{t("username")}</Label>
                <Input type="text" autoComplete="username" value={form.userName}
                  onChange={setField("userName")} variant="secondary" className="w-full" />
              </TextField>
            </div>

            {/* Phone */}
            <TextField isRequired className="flex flex-col gap-1.5">
              <Label>{t("phone")}</Label>
              <Input type="tel" autoComplete="tel" value={form.phoneNumber}
                onChange={setField("phoneNumber")} variant="secondary" className="w-full" />
            </TextField>

            {/* Password */}
            <PasswordInput
              label={t("password")}
              value={form.password}
              onChange={setField("password")}
              autoComplete="new-password"
              required
            />

            {/* Gender */}
            <Select isRequired variant="secondary" defaultValue="Male"
              value={form.gender} onChange={handleGenderChange}
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
            </Select>

            <Button type="submit" variant="primary" fullWidth isPending={loading}>
              {({ isPending }) => isPending ? t("submitting") : t("submit")}
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
