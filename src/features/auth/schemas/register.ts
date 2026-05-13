import { createValidators } from "@/src/core/validators";
import { z } from "zod";

export function createRegisterSchema(t: (key: string) => string) {
  const v = createValidators(t);
  return z.object({
    fullName: v.name(),
    userName: z.string().min(3, t("usernameMin")).max(50),
    email: v.email(),
    password: v.password(),
    phoneNumber: v.phoneNumber(),
    gender: z.string().min(1, t("required")),
  });
}

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
