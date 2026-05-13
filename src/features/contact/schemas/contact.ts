import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export function createContactSchema(messages: {
  required: string;
  invalidEmail: string;
}) {
  return z.object({
    firstName: z.string().min(1, messages.required),
    lastName: z.string().min(1, messages.required),
    email: z.string().min(1, messages.required).email(messages.invalidEmail),
    subject: z.string().min(1, messages.required),
    message: z.string().min(1, messages.required),
  });
}
