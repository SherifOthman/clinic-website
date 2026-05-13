import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(1),
  userName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string().min(1),
  gender: z.string().min(1),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export function createRegisterSchema(messages: {
  required: string;
  invalidEmail: string;
  passwordMin: string;
}) {
  return z.object({
    fullName: z.string().min(1, messages.required),
    userName: z.string().min(1, messages.required),
    email: z.string().min(1, messages.required).email(messages.invalidEmail),
    password: z.string().min(8, messages.passwordMin),
    phoneNumber: z.string().min(1, messages.required),
    gender: z.string().min(1, messages.required),
  });
}
