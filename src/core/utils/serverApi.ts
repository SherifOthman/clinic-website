import type { SubscriptionPlan } from "@/src/core/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/subscription-plans`, {
      next: { revalidate: 3600 }, // cache 1 hour, revalidate in background
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: SubscriptionPlan[] = await res.json();
    // Only show active plans, sorted by displayOrder
    return data
      .filter((p) => p.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  } catch (err) {
    console.error("Failed to fetch subscription plans:", err);
    return [];
  }
}
