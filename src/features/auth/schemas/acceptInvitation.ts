import { createValidators } from "@/src/core/validators";
import { z } from "zod";

export function createAcceptInvitationSchema(t: (key: string) => string) {
  const v = createValidators(t);
  return z.object({
    fullName: v.name(),
    userName: z.string().min(3, t("usernameMin")).max(50),
    phoneNumber: v.phoneNumber(),
    password: v.password(),
    gender: z.string().min(1, t("required")),
  });
}

export type AcceptInvitationFormData = z.infer<ReturnType<typeof createAcceptInvitationSchema>>;
