/**
 * Server Error Handling Utilities
 * Use these to handle custom errors from your backend API
 */

/**
 * Map backend error codes to translation keys
 */
export const SERVER_ERROR_CODES = {
  // Authentication errors
  INVALID_CREDENTIALS: "errors.auth.invalidCredentials",
  EMAIL_ALREADY_EXISTS: "errors.auth.emailAlreadyExists",
  WEAK_PASSWORD: "errors.auth.weakPassword",
  ACCOUNT_LOCKED: "errors.auth.accountLocked",
  EMAIL_NOT_VERIFIED: "errors.auth.emailNotVerified",

  // Validation errors
  INVALID_EMAIL: "errors.validation.invalidEmail",
  INVALID_PHONE: "errors.validation.invalidPhone",

  // Generic errors
  SERVER_ERROR: "errors.generic.serverError",
  NETWORK_ERROR: "errors.generic.networkError",
  UNAUTHORIZED: "errors.generic.unauthorized",
  FORBIDDEN: "errors.generic.forbidden",
  NOT_FOUND: "errors.generic.notFound",
} as const;

export type ServerErrorCode = keyof typeof SERVER_ERROR_CODES;

/**
 * Get translation key for server error
 *
 * @example
 * const errorKey = getServerErrorKey(error);
 * const message = t(errorKey);
 */
export function getServerErrorKey(error: any): string {
  // Check error.code
  if (error?.code && error.code in SERVER_ERROR_CODES) {
    return SERVER_ERROR_CODES[error.code as ServerErrorCode];
  }

  // Check error.response.data.code (Axios format)
  if (error?.response?.data?.code) {
    const code = error.response.data.code;
    if (code in SERVER_ERROR_CODES) {
      return SERVER_ERROR_CODES[code as ServerErrorCode];
    }
  }

  // Check if it's a network error
  if (isNetworkError(error)) {
    return SERVER_ERROR_CODES.NETWORK_ERROR;
  }

  // Default to generic server error
  return SERVER_ERROR_CODES.SERVER_ERROR;
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: any): boolean {
  return (
    !error.response ||
    error.message === "Network Error" ||
    error.code === "ECONNABORTED" ||
    error.code === "ERR_NETWORK"
  );
}

/**
 * Extract field-specific errors from server response
 * Useful for displaying errors next to form fields
 *
 * @example
 * const fieldErrors = extractFieldErrors(error);
 * // { email: "errors.auth.emailAlreadyExists", password: "errors.validation.weakPassword" }
 */
export function extractFieldErrors(error: any): Record<string, string> {
  const fieldErrors: Record<string, string> = {};

  // Check if server returned field-specific errors
  if (
    error?.response?.data?.errors &&
    Array.isArray(error.response.data.errors)
  ) {
    error.response.data.errors.forEach((err: any) => {
      if (err.field && err.code) {
        const translationKey = SERVER_ERROR_CODES[err.code as ServerErrorCode];
        if (translationKey) {
          fieldErrors[err.field] = translationKey;
        }
      }
    });
  }

  return fieldErrors;
}
