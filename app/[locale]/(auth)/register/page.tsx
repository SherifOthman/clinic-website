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
    </div>
  );
}
