"use client";

import { apiFetch } from "@/src/core/utils/api";
import { createContactSchema } from "@/src/features/contact/schemas/contact";
import { useValidation } from "@/src/core/hooks/useValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ContactFormData } from "@/src/features/contact/schemas/contact";
import { useTranslations } from "next-intl";

export function useContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations();
  const schema = useValidation(createContactSchema);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: { firstName: "", lastName: "", email: "", subject: "", message: "" },
  });

  async function submit(data: ContactFormData) {
    setError(null);
    try {
      const result = await apiFetch("POST", "/contact", data);
      if (result.ok) setSent(true);
      else setError(result.error ?? t("common.somethingWentWrong"));
    } finally {
      form.reset();
    }
  }

  function reset() {
    setSent(false);
    form.reset();
  }

  return { form, sent, isPending: form.formState.isSubmitting, error, reset, submit };
}
