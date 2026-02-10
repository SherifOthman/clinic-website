export const APP_CONFIG = {
  name: "ClinicCare",
  description:
    "Modern healthcare management with comprehensive medical services",
  version: "1.0.0",
  author: "ClinicCare Team",
  url: "https://cliniccare.com",
  dashboardUrl: "http://localhost:3000",
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  retries: 3,
} as const;

export const ROUTES = {
  home: "/",
  about: "/about",
  pricing: "/pricing",
  contact: "/contact",
  login: "/login",
  register: "/register",
} as const;

export const EXTERNAL_LINKS = {
  dashboard: "http://localhost:3000",
  login: "http://localhost:3000/login",
  register: "http://localhost:3000/register",
} as const;

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/cliniccare",
  twitter: "https://twitter.com/cliniccare",
  instagram: "https://instagram.com/cliniccare",
  linkedin: "https://linkedin.com/company/cliniccare",
} as const;
