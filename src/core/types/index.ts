// Matches backend SubscriptionPlanDto exactly
export interface SubscriptionPlan {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  monthlyFee: number;
  yearlyFee: number;
  setupFee: number;
  maxBranches: number;
  maxStaff: number;
  maxPatientsPerMonth: number;
  maxAppointmentsPerMonth: number;
  maxInvoicesPerMonth: number;
  storageLimitGB: number;
  hasInventoryManagement: boolean;
  hasReporting: boolean;
  hasAdvancedReporting: boolean;
  hasApiAccess: boolean;
  hasMultipleBranches: boolean;
  hasCustomBranding: boolean;
  hasPrioritySupport: boolean;
  hasBackupAndRestore: boolean;
  hasIntegrations: boolean;
  isActive: boolean;
  isPopular: boolean;
  displayOrder: number;
}

export interface PlanFeature {
  name: string;
  value: string;
  included: boolean;
}
