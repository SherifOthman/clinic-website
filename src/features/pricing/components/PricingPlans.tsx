import type { PlanFeature, SubscriptionPlan } from "@/src/core/types";
import { getTranslations } from "next-intl/server";
import { PlanCard } from "./PlanCard";

interface PricingPlansProps {
  plans: SubscriptionPlan[];
}

export const PricingPlans = async ({ plans }: PricingPlansProps) => {
  const t = await getTranslations();

  const getFeatures = (plan: SubscriptionPlan): PlanFeature[] => [
    {
      name: t("pricing.features.maxClinics"),
      value:
        plan.maxClinics === -1
          ? t("pricing.unlimited")
          : `${plan.maxClinics} ${t("pricing.clinics")}`,
      included: true,
    },
    {
      name: t("pricing.features.maxBranches"),
      value:
        plan.maxBranches === -1
          ? t("pricing.unlimited")
          : `${plan.maxBranches} ${t("pricing.branches")}`,
      included: true,
    },
    {
      name: t("pricing.features.patientRecords"),
      value: t("pricing.unlimited"),
      included: true,
    },
    {
      name: t("pricing.features.appointmentScheduling"),
      value: t("pricing.included"),
      included: true,
    },
    {
      name: t("pricing.features.basicReporting"),
      value: t("pricing.included"),
      included: true,
    },
    {
      name: t("pricing.features.dataBackup"),
      value: t("pricing.included"),
      included: true,
    },
    {
      name: t("pricing.features.mobileApp"),
      value: t("pricing.included"),
      included: true,
    },
    {
      name: t("pricing.features.advancedReporting"),
      value: plan.hasAdvancedReporting
        ? t("pricing.included")
        : t("pricing.notAvailable"),
      included: plan.hasAdvancedReporting,
    },
    {
      name: t("pricing.features.inventoryManagement"),
      value: plan.hasAdvancedReporting
        ? t("pricing.included")
        : t("pricing.notAvailable"),
      included: plan.hasAdvancedReporting,
    },
    {
      name: t("pricing.features.staffManagement"),
      value: plan.hasAdvancedReporting
        ? t("pricing.included")
        : t("pricing.notAvailable"),
      included: plan.hasAdvancedReporting,
    },
    {
      name: t("pricing.features.apiAccess"),
      value: plan.hasApiAccess
        ? t("pricing.included")
        : t("pricing.notAvailable"),
      included: plan.hasApiAccess,
    },
    {
      name: t("pricing.features.customIntegrations"),
      value: plan.hasApiAccess
        ? t("pricing.included")
        : t("pricing.notAvailable"),
      included: plan.hasApiAccess,
    },
    {
      name: t("pricing.features.prioritySupport"),
      value: plan.hasPrioritySupport
        ? t("pricing.priority24h")
        : t("pricing.standardSupport"),
      included: plan.hasPrioritySupport,
    },
    {
      name: t("pricing.features.customBranding"),
      value: plan.hasCustomBranding
        ? t("pricing.included")
        : t("pricing.notAvailable"),
      included: plan.hasCustomBranding,
    },
    {
      name: t("pricing.features.whiteLabel"),
      value: plan.hasCustomBranding
        ? t("pricing.included")
        : t("pricing.notAvailable"),
      included: plan.hasCustomBranding,
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isPopular={index === 1}
              features={getFeatures(plan)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
