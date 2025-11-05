export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ClinicFlow",
  description:
    "Complete clinic management platform for healthcare professionals.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Pricing",
      href: "#pricing",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Support",
      href: "/help",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/clinicflow/clinicflow",
    twitter: "https://twitter.com/clinicflow",
    docs: "https://docs.clinicflow.com",
    support: "https://support.clinicflow.com",
  },
};
