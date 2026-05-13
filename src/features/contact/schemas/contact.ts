import { createValidators } from "@/src/core/validators";
import { z } from "zod";

export function createContactSchema(t: (key: string) => string) {
  const v = createValidators(t);
  return z.object({
    firstName: v.name(),
    lastName: v.name(),
    email: v.email(),
    subject: z.string().min(1, t("required")).max(200),
    message: z.string().min(1, t("required")).max(2000),
  });
}

export type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;
