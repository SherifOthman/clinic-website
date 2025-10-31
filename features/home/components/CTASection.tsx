'use client';

import { Button } from '@heroui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function CTASection() {
  const t = useTranslations('home');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section className="py-24 bg-primary/5 dark:bg-primary/10 border-t border-divider relative">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-primary rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-primary rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-primary rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          {t('ctaTitle')}
        </h2>
        <p className="text-lg text-default-600 mb-10 max-w-2xl mx-auto">
          {t('ctaDescription')}
        </p>
        <Link href={`/${locale}/signup`}>
          <Button
            color="primary"
            size="lg"
            className="font-medium px-10 h-12 shadow-lg hover:shadow-xl transition-shadow"
            radius="lg"
          >
            {t('startFreeTrial')}
          </Button>
        </Link>
        <p className="text-sm text-default-500 mt-6">{t('ctaFooter')}</p>
      </div>
    </section>
  );
}
