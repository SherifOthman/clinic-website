import type { SubscriptionPlan } from "@/src/core/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Fallback data with practical clinic management features
const fallbackPlans: SubscriptionPlan[] = [
  {
    id: "1",
    name: "Solo Practice",
    description:
      "Essential tools for individual practitioners and small clinics",
    price: 29.99,
    currency: "USD",
    billingPeriod: "monthly",
    maxClinics: 1,
    maxBranches: 1,
    hasAdvancedReporting: false,
    hasApiAccess: false,
    hasPrioritySupport: false,
    hasCustomBranding: false,
    isActive: true,
  },
  {
    id: "2",
    name: "Growing Clinic",
    description: "Advanced features for expanding healthcare practices",
    price: 79.99,
    currency: "USD",
    billingPeriod: "monthly",
    maxClinics: 3,
    maxBranches: 10,
    hasAdvancedReporting: true,
    hasApiAccess: false,
    hasPrioritySupport: true,
    hasCustomBranding: false,
    isActive: true,
  },
  {
    id: "3",
    name: "Healthcare Network",
    description: "Enterprise solution for large healthcare organizations",
    price: 199.99,
    currency: "USD",
    billingPeriod: "monthly",
    maxClinics: -1, // Unlimited
    maxBranches: -1, // Unlimited
    hasAdvancedReporting: true,
    hasApiAccess: true,
    hasPrioritySupport: true,
    hasCustomBranding: true,
    isActive: true,
  },
];

export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/subscription-plans`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.warn("API not available, using fallback data");
      return fallbackPlans;
    }
  } catch (error) {
    console.error("Failed to fetch subscription plans:", error);
    return fallbackPlans;
  }
}
