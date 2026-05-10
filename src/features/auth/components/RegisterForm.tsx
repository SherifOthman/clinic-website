"use client";

import { PasswordInput } from "@/src/core/components/ui/PasswordInput";
import { PhoneInput } from "@/src/core/components/ui/PhoneInput";
import { ThemeSwitch } from "@/src/core/components/ui/ThemeSwitch";
import { useRegisterForm } from "@/src/features/auth/hooks/useRegisterForm";
import { Alert, Button, Input, Label, ListBox, Select, Separator, TextField } from "@heroui/react";
import { CheckCircle2, Globe, HeartHandshake, ShieldCheck, Zap } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

export function RegisterForm() {
  const t = useTranslations("auth.register");
  const { locale } = useParams<{ locale: string }>();
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const { form, error, loading, googleOAuthUrl, setField, setPhone, submit } = useRegisterForm(
    (loc) => router.push(`/${loc}/login?registered=1`),
    locale,
  );

  const handleGenderChange = (value: React.Key | null) => {
    if (value) {
      const e = { target: { value: String(value) } } as React.ChangeEvent<HTMLSelectElement>;
      setField("gender")(e);
    }
  };

  const switchLocale = () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    router.push(pathname.replace(`/${currentLocale}/`, `/${newLocale}/`));
  };

  const features = [
    { icon: CheckCircle2,   text: t("feature1") },
    { icon: Zap,            text: t("feature2") },
    { icon: ShieldCheck,    text: t("feature3") },
    { icon: HeartHandshake, text: t("feature4") },
  ];

  return (
    <div className="flex min-h-screen w-full">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-accent p-12 text-accent-foreground">
        <Link href={`/${locale}`} className="flex items-center gap-3 no-underline">
          <Image src="/logo.svg" alt="ClinicCare" width={36} height={36} priority />
          <span className="text-2xl font-bold text-accent-foreground">ClinicCare</span>
        </Link>
        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold leading-tight">{t("panelHeading")}</h1>
            <p className="text-lg opacity-80">{t("panelSubtitle")}</p>
          </div>
          <div className="space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm opacity-90">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm opacity-60">© {new Date().getFullYear()} ClinicCare.</p>
      </div>

      {/* Right panel */}
      <div className="relative flex w-full lg:w-1/2 flex-col items-center justify-center bg-background px-6 py-12">
        <div className="absolute top-4 end-4 flex items-center gap-2">
          <Button variant="ghost" size="sm" onPress={switchLocale}>
            <Globe className="me-1 h-4 w-4" />
            {currentLocale === "en" ? "العربية" : "English"}
          </Button>
          <ThemeSwitch />
        </div>

        <Link href={`/${locale}`} className="mb-8 flex items-center gap-2 no-underline lg:hidden">
          <Image src="/logo.svg" alt="ClinicCare" width={32} height={32} />
          <span className="text-xl font-bold">ClinicCare</span>
        </Link>

        <div className="w-full max-w-sm space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t("title")}</h2>
            <p className="mt-1 text-sm text-muted">{t("subtitle")}</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {error && (
              <Alert status="danger">
                <Alert.Indicator />
                <Alert.Content><Alert.Description>{error}</Alert.Description></Alert.Content>
              </Alert>
            )}
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
            <TextField isRequired className="flex flex-col gap-1.5">
              <Label>{t("email")}</Label>
              <Input type="email" autoComplete="email" value={form.email}
                onChange={setField("email")} variant="secondary" className="w-full" />
            </TextField>
            <PhoneInput label={t("phone")} value={form.phoneNumber} onChange={setPhone}
              required searchPlaceholder={t("searchCountry")} />
            <Select isRequired variant="secondary" defaultValue="Male" value={form.gender}
              onChange={handleGenderChange} placeholder={t("selectGender")} className="flex flex-col gap-1.5">
              <Label>{t("gender")}</Label>
              <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="Male" textValue={t("male")}>{t("male")}<ListBox.ItemIndicator /></ListBox.Item>
                  <ListBox.Item id="Female" textValue={t("female")}>{t("female")}<ListBox.ItemIndicator /></ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
            <PasswordInput label={t("password")} value={form.password}
              onChange={setField("password")} autoComplete="new-password" required />
            <Button type="submit" variant="primary" fullWidth isPending={loading}>
              {({ isPending }) => isPending ? t("submitting") : t("submit")}
            </Button>
          </form>

          <p className="text-center text-sm text-muted">
            {t("haveAccount")}{" "}
            <Link href={`/${locale}/login`} className="font-medium text-accent hover:underline">
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

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
