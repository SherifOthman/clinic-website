import type { PlanFeature, SubscriptionPlan } from "@/src/core/types";
import { getLocale, getTranslations } from "next-intl/server";
import { PlanCard } from "./PlanCard";

interface PricingPlansProps {
  plans: SubscriptionPlan[];
}

export const PricingPlans = async ({ plans }: PricingPlansProps) => {
  const t = await getTranslations();
  const locale = await getLocale();
  const isAr = locale === "ar";

  if (!plans.length) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 text-center text-muted">
          {t("pricing.plans.title")}
        </div>
      </section>
    );
  }

  const unlimited = (n: number) => (n === -1 ? t("pricing.unlimited") : String(n));

  const getFeatures = (plan: SubscriptionPlan): PlanFeature[] => [
    {
      name: t("pricing.features.maxBranches"),
      value: unlimited(plan.maxBranches),
      included: true,
    },
    {
      name: t("pricing.features.maxUsers"),
      value: unlimited(plan.maxStaff),
      included: true,
    },
    {
      name: t("pricing.features.maxPatients"),
      value: unlimited(plan.maxPatientsPerMonth),
      included: true,
    },
    {
      name: t("pricing.features.patientRecords"),
      value: t("pricing.included"),
      included: true,
    },
    {
      name: t("pricing.features.dataBackup"),
      value: plan.hasBackupAndRestore ? t("pricing.included") : t("pricing.notAvailable"),
      included: plan.hasBackupAndRestore,
    },
    {
      name: t("pricing.features.basicReporting"),
      value: plan.hasReporting ? t("pricing.included") : t("pricing.notAvailable"),
      included: plan.hasReporting,
    },
    {
      name: t("pricing.features.advancedReporting"),
      value: plan.hasAdvancedReporting ? t("pricing.included") : t("pricing.notAvailable"),
      included: plan.hasAdvancedReporting,
    },
    {
      name: t("pricing.features.inventoryManagement"),
      value: plan.hasInventoryManagement ? t("pricing.included") : t("pricing.notAvailable"),
      included: plan.hasInventoryManagement,
    },
    {
      name: t("pricing.features.apiAccess"),
      value: plan.hasApiAccess ? t("pricing.included") : t("pricing.notAvailable"),
      included: plan.hasApiAccess,
    },
    {
      name: t("pricing.features.customIntegrations"),
      value: plan.hasIntegrations ? t("pricing.included") : t("pricing.notAvailable"),
      included: plan.hasIntegrations,
    },
    {
      name: t("pricing.features.prioritySupport"),
      value: plan.hasPrioritySupport ? t("pricing.priority24h") : t("pricing.standardSupport"),
      included: plan.hasPrioritySupport,
    },
    {
      name: t("pricing.features.customBranding"),
      value: plan.hasCustomBranding ? t("pricing.included") : t("pricing.notAvailable"),
      included: plan.hasCustomBranding,
    },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isAr={isAr}
              features={getFeatures(plan)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
