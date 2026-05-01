"use client";

import { useContactForm } from "@/src/features/contact/hooks/useContactForm";
import { Alert, Button, Card, Input, Label, TextArea, TextField } from "@heroui/react";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

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
              <Alert status="danger">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Description>{error}</Alert.Description>
                </Alert.Content>
              </Alert>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                label={t("contact.form.firstName")}
                value={form.firstName}
                onChange={setField("firstName")}
                placeholder={t("contact.form.firstNamePlaceholder")}
                required
              />
              <FormField
                label={t("contact.form.lastName")}
                value={form.lastName}
                onChange={setField("lastName")}
                placeholder={t("contact.form.lastNamePlaceholder")}
                required
              />
            </div>

            <FormField
              label={t("contact.form.email")}
              type="email"
              value={form.email}
              onChange={setField("email")}
              placeholder={t("contact.form.emailPlaceholder")}
              required
            />
            <FormField
              label={t("contact.form.subject")}
              value={form.subject}
              onChange={setField("subject")}
              placeholder={t("contact.form.subjectPlaceholder")}
              required
            />

            <TextField isRequired className="flex flex-col gap-1">
              <Label>{t("contact.form.message")}</Label>
              <TextArea
                value={form.message}
                onChange={setField("message") as React.ChangeEventHandler<HTMLTextAreaElement>}
                placeholder={t("contact.form.messagePlaceholder")}
                required
                rows={4}
                className="w-full resize-none"
              />
            </TextField>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isPending={loading}
            >
              {({ isPending }) => isPending ? "Sending..." : t("contact.form.submit")}
            </Button>
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
    <TextField isRequired={required} className="flex flex-col gap-1">
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full"
      />
    </TextField>
  );
}

function ContactSuccess({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <CheckCircle className="h-16 w-16 text-success" />
      <h3 className="text-xl font-semibold">Message Sent!</h3>
      <p className="text-muted">We'll get back to you within 24 hours.</p>
      <Button variant="ghost" size="sm" onPress={onReset}>
        Send another message
      </Button>
    </div>
  );
}
