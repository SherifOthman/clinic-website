import { z } from "zod";

export const loginSchema = z.object({
  emailOrUsername: z.string().min(1),
  password: z.string().min(1),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export function createLoginSchema(messages: { required: string }) {
  return z.object({
    emailOrUsername: z.string().min(1, messages.required),
    password: z.string().min(1, messages.required),
  });
}
