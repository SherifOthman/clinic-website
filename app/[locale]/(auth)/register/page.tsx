"use client";

import { authApi } from "@/src/features/auth/api";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const tErr = useTranslations("auth.errors");
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3000";
  const googleOAuthUrl = `${apiUrl}/auth/oauth/google?returnUrl=${encodeURIComponent(dashboardUrl)}`;

  const [form, setForm] = useState({
    fullName: "", userName: "", email: "",
    password: "", phoneNumber: "", gender: "Male",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await authApi.register(form);
      if (result.ok) {
        // Registration successful — redirect to login with success message
        router.push(`/${locale}/login?registered=1`);
      } else {
        // Show first validation error or general error
        const firstError = result.errors
          ? Object.values(result.errors)[0]?.[0]
          : null;
        setError(firstError ?? result.error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-default-500 mt-1 text-sm">{t("subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}

        {[
          { field: "fullName", label: t("fullName"), type: "text", auto: "name" },
          { field: "userName", label: t("username"), type: "text", auto: "username" },
          { field: "email", label: t("email"), type: "email", auto: "email" },
          { field: "phoneNumber", label: t("phone"), type: "tel", auto: "tel" },
          { field: "password", label: t("password"), type: "password", auto: "new-password" },
        ].map(({ field, label, type, auto }) => (
          <div key={field} className="flex flex-col gap-1">
            <label className="text-sm font-medium">{label}</label>
            <input
              type={type}
              autoComplete={auto}
              value={(form as any)[field]}
              onChange={set(field)}
              className="rounded-lg border border-divider bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              required
            />
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">{t("gender")}</label>
          <select
            value={form.gender}
            onChange={set("gender")}
            className="rounded-lg border border-divider bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="Male">{t("male")}</option>
            <option value="Female">{t("female")}</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? t("submitting") : t("submit")}
        </button>
      </form>

      <p className="text-center text-sm text-default-500">
        {t("haveAccount")}{" "}
        <Link href={`/${locale}/login`} className="text-primary hover:underline">
          {t("signIn")}
        </Link>
      </p>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-divider" />
        <span className="text-xs text-default-400">OR</span>
        <div className="h-px flex-1 bg-divider" />
      </div>

      <a
        href={googleOAuthUrl}
        className="flex items-center justify-center gap-3 rounded-lg border border-divider bg-background px-4 py-2.5 text-sm font-medium transition hover:bg-default-50"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Sign up with Google
      </a>
    </div>
  );
}
