'use client';

import { PricingCard } from '@/features/pricing/components/PricingCard';
import { pricingPlans } from '@/features/pricing/data/plans';
import { Button } from '@heroui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function PricingPreviewSection() {
  const t = useTranslations('home');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section className="py-24 bg-background dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            {t('pricingTitle')}
          </h2>
          <p className="text-lg text-default-600 max-w-2xl mx-auto">
            {t('pricingDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={`/${locale}/pricing`}>
            <Button
              variant="bordered"
              size="lg"
              className="font-medium px-8"
              radius="lg"
            >
              {t('seeAllPlans')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
