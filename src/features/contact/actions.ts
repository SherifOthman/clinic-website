"use server";

import { ContactFormData } from "./schemas";

export async function submitContactForm(_data: ContactFormData) {
  // TODO: Implement contact form submission
  // const response = await fetch('https://your-api.com/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(_data)
  // });

  return { success: false };
}
