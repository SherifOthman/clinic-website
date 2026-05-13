import { createValidators } from "@/src/core/validators";
import { z } from "zod";

export function createLoginSchema(t: (key: string) => string) {
  const v = createValidators(t);
  return z.object({
    emailOrUsername: z.string().min(1, t("required")).max(100),
    password: v.requiredString(),
  });
}

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
