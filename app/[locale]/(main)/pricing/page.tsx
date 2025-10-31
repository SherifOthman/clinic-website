'use client';

import { PricingCard } from '@/features/pricing/components/PricingCard';
import { pricingPlans } from '@/features/pricing/data/plans';
import { Button } from '@heroui/button';
import { Switch } from '@heroui/switch';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PricingPage() {
  const t = useTranslations('pricing');
  const [isYearly, setIsYearly] = useState(false);
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="min-h-screen bg-default-50 dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-default-600 max-w-2xl mx-auto mb-8">
            {t('description')}
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-sm font-medium transition-colors ${!isYearly ? 'text-primary' : 'text-foreground'}`}
            >
              {t('monthly')}
            </span>
            <Switch
              size="lg"
              isSelected={isYearly}
              onValueChange={setIsYearly}
            />
            <span
              className={`text-sm font-medium transition-colors ${isYearly ? 'text-primary' : 'text-foreground'}`}
            >
              {t('yearly')}
            </span>
            {isYearly && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                {t('save20')}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} isYearly={isYearly} />
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-default-600 mb-6">
            Need a custom solution for your large practice?
          </p>
          <Button
            variant="bordered"
            size="lg"
            className="font-medium px-8"
            onPress={() => router.push(`/${locale}/contact`)}
          >
            {t('contactSales')}
          </Button>
        </div>
      </div>
    </div>
  );
}
