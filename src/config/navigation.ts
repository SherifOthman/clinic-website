// Centralized navigation configuration
export const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "pricing", href: "/#pricing" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export const AUTH_LINKS = [
  { key: "login", href: "/login" },
  { key: "signup", href: "/signup" },
] as const;
