'use client';

import {
  CalendarIcon,
  ChartIcon,
  ShieldIcon,
  UsersIcon,
} from '@/components/icons';
import { Card, CardBody } from '@heroui/card';
import { useTranslations } from 'next-intl';

export function FeaturesSection() {
  const t = useTranslations('home');

  const features = [
    {
      icon: <UsersIcon className="w-6 h-6" />,
      title: t('patientManagement'),
      description: t('patientManagementDesc'),
    },
    {
      icon: <CalendarIcon className="w-6 h-6" />,
      title: t('smartScheduling'),
      description: t('smartSchedulingDesc'),
    },
    {
      icon: <ShieldIcon className="w-6 h-6" />,
      title: t('hipaaCompliant'),
      description: t('hipaaCompliantDesc'),
    },
    {
      icon: <ChartIcon className="w-6 h-6" />,
      title: t('analytics'),
      description: t('analyticsDesc'),
    },
  ];

  return (
    <section className="py-24 bg-default-50 dark:bg-default-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            {t('featuresTitle')}
          </h2>
          <p className="text-lg text-default-600 max-w-2xl mx-auto">
            {t('featuresDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-background dark:bg-content1 hover:shadow-lg transition-all duration-300"
            >
              <CardBody className="p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-default-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
