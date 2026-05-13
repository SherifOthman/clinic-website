import { createValidators } from "@/src/core/validators";
import { z } from "zod";

export function createForgotPasswordSchema(t: (key: string) => string) {
  const v = createValidators(t);
  return z.object({
    email: v.email(),
  });
}

export type ForgotPasswordFormData = z.infer<ReturnType<typeof createForgotPasswordSchema>>;
