import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingPeriod: string;
  maxClinics: number;
  maxBranches: number;
  hasAdvancedReporting: boolean;
  hasApiAccess: boolean;
  hasPrioritySupport: boolean;
  hasCustomBranding: boolean;
  isActive: boolean;
}

export interface PlanFeature {
  name: string;
  value: string;
  included: boolean;
}
