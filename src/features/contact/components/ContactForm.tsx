"use client";

import { FormField } from "@/src/core/components/ui/FormField";
import { useContactForm } from "@/src/features/contact/hooks/useContactForm";
import { Alert, Button, Card, FieldError, Label, TextArea, TextField } from "@heroui/react";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations();
  const { form, sent, isPending, error, reset, submit } = useContactForm();

  const firstNameErr = form.formState.errors.firstName?.message;
  const lastNameErr = form.formState.errors.lastName?.message;
  const emailErr = form.formState.errors.email?.message;
  const subjectErr = form.formState.errors.subject?.message;
  const messageErr = form.formState.errors.message?.message;

  return (
    <Card>
      <Card.Content className="p-8">
        {sent ? (
          <ContactSuccess onReset={reset} />
        ) : (
          <form onSubmit={form.handleSubmit(submit)} noValidate className="space-y-5">
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
                placeholder={t("contact.form.firstNamePlaceholder")}
                required
                error={firstNameErr}
                {...form.register("firstName")}
              />
              <FormField
                label={t("contact.form.lastName")}
                placeholder={t("contact.form.lastNamePlaceholder")}
                required
                error={lastNameErr}
                {...form.register("lastName")}
              />
            </div>

            <FormField
              label={t("contact.form.email")}
              type="email"
              placeholder={t("contact.form.emailPlaceholder")}
              required
              error={emailErr}
              {...form.register("email")}
            />
            <FormField
              label={t("contact.form.subject")}
              placeholder={t("contact.form.subjectPlaceholder")}
              required
              error={subjectErr}
              {...form.register("subject")}
            />

            <TextField isRequired isInvalid={!!messageErr} className="flex flex-col gap-1">
              <Label>{t("contact.form.message")}</Label>
              <TextArea
                placeholder={t("contact.form.messagePlaceholder")}
                required
                rows={4}
                variant="secondary"
                className="w-full resize-none"
                {...form.register("message")}
              />
              <FieldError>{messageErr}</FieldError>
            </TextField>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isPending={isPending}
            >
              {({ isPending: ip }) => ip ? "Sending..." : t("contact.form.submit")}
            </Button>
          </form>
        )}
      </Card.Content>
    </Card>
  );
}

function ContactSuccess({ onReset }: { onReset: () => void }) {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <CheckCircle className="h-16 w-16 text-success" />
      <h3 className="text-xl font-semibold">{t("contact.form.successTitle")}</h3>
      <p className="text-muted">{t("contact.form.successMessage")}</p>
      <Button variant="ghost" size="sm" onPress={onReset}>
        {t("contact.form.sendAnother")}
      </Button>
    </div>
  );
}
