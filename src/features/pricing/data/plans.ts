export interface PricingPlan {
  id: string;
  price: number;
  popular?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    price: 29,
  },
  {
    id: "professional",
    price: 79,
    popular: true,
  },
  {
    id: "enterprise",
    price: 199,
  },
];

