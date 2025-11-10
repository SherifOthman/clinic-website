import { z } from "zod";

// Simple custom error map for English
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === "string") {
      return { message: "This field is required" };
    }
  }
  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.type === "string") {
      return { message: `Must be at least ${issue.minimum} characters` };
    }
  }
  return { message: ctx.defaultError };
};

// Set the custom error map
z.setErrorMap(customErrorMap);

export function setZodLocale() {
  // Keep for compatibility, but does nothing now
  z.setErrorMap(customErrorMap);
}
