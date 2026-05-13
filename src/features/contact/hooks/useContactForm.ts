"use client";

import { apiFetch } from "@/src/core/utils/api";
import { contactSchema, createContactSchema } from "@/src/features/contact/schemas/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ContactFormData } from "@/src/features/contact/schemas/contact";

export function useContactForm(
  somethingWentWrong: string,
  messages?: { required: string; invalidEmail: string },
) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(messages ? createContactSchema(messages) : contactSchema),
    defaultValues: { firstName: "", lastName: "", email: "", subject: "", message: "" },
  });

  async function submit(data: ContactFormData) {
    setError(null);
    try {
      const result = await apiFetch("POST", "/contact", data);
      if (result.ok) setSent(true);
      else setError(result.error ?? somethingWentWrong);
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
