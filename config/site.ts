export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ClinicFlow",
  description:
    "Complete clinic management solution for modern healthcare practices.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Features",
      href: "/#features",
    },
    {
      label: "Pricing",
      href: "/#pricing",
    },
    {
      label: "Profile",
      href: "/profile",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Features",
      href: "/#features",
    },
    {
      label: "Pricing",
      href: "/#pricing",
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "Register",
      href: "/register",
    },
  ],
  links: {
    dashboard: "https://dashboard.myapp.com",
    support: "mailto:support@clinicflow.com",
    privacy: "/privacy",
    terms: "/terms",
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.clinicflow.com",
  },
};
