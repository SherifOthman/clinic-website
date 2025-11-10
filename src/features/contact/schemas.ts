import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  company: z.string().optional(),
  message: z.string().min(10),
});

export type ContactFormData = z.infer<typeof contactSchema>;
