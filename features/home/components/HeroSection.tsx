'use client';

import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function HeroSection() {
  const t = useTranslations('home');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section className="relative overflow-hidden bg-background dark:bg-background">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <Chip className="mb-8" color="primary" variant="flat" size="lg">
            {t('trustedBy')}
          </Chip>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t('heroTitle')}
            <span className="text-primary block mt-2">{t('heroSubtitle')}</span>
          </h1>
          <p className="text-lg sm:text-xl text-default-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={`/${locale}/signup`}>
              <Button
                color="primary"
                size="lg"
                className="font-medium px-8 h-12"
                radius="lg"
              >
                {t('getStartedFree')}
              </Button>
            </Link>
            <Link href={`/${locale}/pricing`}>
              <Button
                variant="bordered"
                size="lg"
                className="font-medium px-8 h-12"
                radius="lg"
              >
                {t('viewPricing')}
              </Button>
            </Link>
          </div>
          <p className="text-sm text-default-500 mt-6">{t('noCardRequired')}</p>
        </div>
      </div>
    </section>
  );
}
