import { createValidators } from "@/src/core/validators";
import { z } from "zod";

export function createResetPasswordSchema(t: (key: string) => string) {
  const v = createValidators(t);
  return z.object({
    newPassword: v.password(),
  });
}

export type ResetPasswordFormData = z.infer<ReturnType<typeof createResetPasswordSchema>>;
