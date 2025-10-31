export const SITE_CONFIG = {
  name: "ClinicFlow",
  description:
    "Complete clinic management solution for modern healthcare practices.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://myapp.com",
  dashboardUrl:
    process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://dashboard.myapp.com",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
};

export const NAVIGATION_LINKS = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FEATURES = [
  {
    title: "Patient Management",
    description: "Comprehensive patient records and history tracking",
    icon: "users",
  },
  {
    title: "Appointment Scheduling",
    description: "Smart scheduling with automated reminders",
    icon: "calendar",
  },
  {
    title: "Secure & Compliant",
    description: "HIPAA compliant with bank-level security",
    icon: "shield",
  },
  {
    title: "Analytics & Reports",
    description: "Detailed insights into your practice performance",
    icon: "chart",
  },
];

export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    description: "Perfect for small practices",
    features: [
      "Up to 2 doctors",
      "500 appointments/month",
      "Basic scheduling",
      "Patient records",
      "Email support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: 79,
    description: "Most popular for growing practices",
    features: [
      "Up to 10 doctors",
      "2,000 appointments/month",
      "Advanced scheduling",
      "Complete patient management",
      "Analytics & reports",
      "Priority support",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    description: "For large healthcare organizations",
    features: [
      "Unlimited doctors",
      "Unlimited appointments",
      "Custom workflows",
      "Advanced analytics",
      "Dedicated support",
      "Custom integrations",
    ],
  },
];
