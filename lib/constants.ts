// Time constants (in milliseconds)
export const TIMEOUTS = {
  REDIRECT_DELAY: 3000,
  API_SIMULATION: 1500,
  TOAST_DURATION: 5000,
} as const;

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  SUBSCRIPTION_PLANS: "/subscription/plans",
} as const;

// Form validation
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 50,
  MAX_EMAIL_LENGTH: 100,
} as const;

// UI constants
export const UI = {
  STEPPER_STEPS: 4,
  TESTIMONIAL_RATING: 5,
  PRICING_DISCOUNT: 0.8, // 20% discount for annual billing
} as const;
