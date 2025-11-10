// Mock pricing data - ready to be replaced with database fetch
// Data comes from database in English with translation keys
// Frontend will translate using the translation keys

export interface PricingPlan {
  id: "starter" | "professional" | "enterprise";
  nameKey: string; // Translation key for name
  descriptionKey: string; // Translation key for description
  price: number;
  popular?: boolean;
  featureKeys: string[]; // Translation keys for features
}

// Mock function simulating database fetch
export const getPricingPlans = async (): Promise<PricingPlan[]> => {
  // TODO: Replace with actual database fetch
  // Example: const response = await fetch('/api/pricing');
  // return response.json();

  // Database will return data with translation keys like this:
  return [
    {
      id: "starter",
      nameKey: "pricing.plans.starter.name",
      descriptionKey: "pricing.plans.starter.description",
      price: 29,
      popular: false,
      featureKeys: [
        "pricing.plans.starter.features.0",
        "pricing.plans.starter.features.1",
        "pricing.plans.starter.features.2",
        "pricing.plans.starter.features.3",
        "pricing.plans.starter.features.4",
      ],
    },
    {
      id: "professional",
      nameKey: "pricing.plans.professional.name",
      descriptionKey: "pricing.plans.professional.description",
      price: 79,
      popular: true,
      featureKeys: [
        "pricing.plans.professional.features.0",
        "pricing.plans.professional.features.1",
        "pricing.plans.professional.features.2",
        "pricing.plans.professional.features.3",
        "pricing.plans.professional.features.4",
        "pricing.plans.professional.features.5",
        "pricing.plans.professional.features.6",
      ],
    },
    {
      id: "enterprise",
      nameKey: "pricing.plans.enterprise.name",
      descriptionKey: "pricing.plans.enterprise.description",
      price: 199,
      popular: false,
      featureKeys: [
        "pricing.plans.enterprise.features.0",
        "pricing.plans.enterprise.features.1",
        "pricing.plans.enterprise.features.2",
        "pricing.plans.enterprise.features.3",
        "pricing.plans.enterprise.features.4",
        "pricing.plans.enterprise.features.5",
        "pricing.plans.enterprise.features.6",
      ],
    },
  ];
};
