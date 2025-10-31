'use client';

import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckIcon } from '../../../components/icons';
import { PricingPlan } from '../data/plans';

interface PricingCardProps {
  plan: PricingPlan;
  isYearly?: boolean;
}

export function PricingCard({ plan, isYearly = false }: PricingCardProps) {
  const t = useTranslations('pricing');
  const params = useParams();
  const locale = params.locale as string;

  const planData = t.raw(`plans.${plan.id}`);
  const features = planData.features || [];

  // Calculate yearly price (20% discount)
  const displayPrice = isYearly
    ? Math.round(plan.price * 12 * 0.8)
    : plan.price;
  const priceLabel = isYearly ? t('perYear') : t('perMonth');

  return (
    <Card
      className={`${
        plan.popular ? 'border-2 border-primary shadow-lg scale-105' : ''
      } hover:shadow-lg transition-all bg-content1 dark:bg-content1 relative overflow-hidden`}
    >
      {plan.popular && (
        <div className="absolute -top-2 -left-8 z-10">
          <Chip
            color="primary"
            className="rotate-[-45deg] px-6 py-1 text-xs font-semibold shadow-lg"
          >
            {t('mostPopular')}
          </Chip>
        </div>
      )}
      <CardBody className="p-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {planData.name}
        </h3>
        <p className="text-default-600 mb-4">{planData.description}</p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-foreground">
            ${displayPrice}
          </span>
          <span className="text-default-500">/{priceLabel}</span>
          {isYearly && (
            <div className="mt-2">
              <span className="text-sm text-success font-medium">
                Save ${Math.round(plan.price * 12 * 0.2)}/year
              </span>
            </div>
          )}
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center gap-3">
              <CheckIcon className="w-5 h-5 text-success flex-shrink-0" />
              <span className="text-default-600 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Link href={`/${locale}/signup`}>
          <Button
            color={plan.popular ? 'primary' : 'default'}
            variant={plan.popular ? 'solid' : 'bordered'}
            className="w-full font-medium"
          >
            {t('getStarted')}
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
}
