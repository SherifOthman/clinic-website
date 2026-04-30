"use client";

import { useContactForm } from "@/src/features/contact/hooks/useContactForm";
import { Card } from "@heroui/react";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const inputCls = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent";

/**
 * Contact form card — handles its own state via useContactForm.
 * Extracted from ContactPage so the page only composes layout.
 */
export function ContactForm() {
  const t = useTranslations();
  const { form, loading, sent, error, setField, reset, submit } = useContactForm(
    t("common.somethingWentWrong"),
  );

  return (
    <Card>
      <Card.Content className="p-8">
        {sent ? (
          <ContactSuccess onReset={reset} />
        ) : (
          <form onSubmit={submit} className="space-y-5">
            {error && (
              <div className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
                {error}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label={t("contact.form.firstName")} value={form.firstName} onChange={setField("firstName")} placeholder={t("contact.form.firstNamePlaceholder")} required />
              <FormField label={t("contact.form.lastName")}  value={form.lastName}  onChange={setField("lastName")}  placeholder={t("contact.form.lastNamePlaceholder")}  required />
            </div>

            <FormField label={t("contact.form.email")}   type="email" value={form.email}   onChange={setField("email")}   placeholder={t("contact.form.emailPlaceholder")}   required />
            <FormField label={t("contact.form.subject")}             value={form.subject} onChange={setField("subject")} placeholder={t("contact.form.subjectPlaceholder")} required />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">{t("contact.form.message")}</label>
              <textarea
                value={form.message}
                onChange={setField("message")}
                placeholder={t("contact.form.messagePlaceholder")}
                required
                rows={4}
                className={`${inputCls} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90 disabled:opacity-60"
            >
              {loading ? "Sending..." : t("contact.form.submit")}
            </button>
          </form>
        )}
      </Card.Content>
    </Card>
  );
}

// ── Local sub-components ──────────────────────────────────────────────────────

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

function FormField({ label, value, onChange, placeholder, type = "text", required }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} className={inputCls} />
    </div>
  );
}

function ContactSuccess({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <CheckCircle className="h-16 w-16 text-success" />
      <h3 className="text-xl font-semibold">Message Sent!</h3>
      <p className="text-muted">We'll get back to you within 24 hours.</p>
      <button onClick={onReset} className="text-sm text-accent hover:underline">
        Send another message
      </button>
    </div>
  );
}
