import { z } from "zod";

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(8),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function createResetPasswordSchema(messages: { passwordMin: string }) {
  return z.object({
    newPassword: z.string().min(8, messages.passwordMin),
  });
}
