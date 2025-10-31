'use client';

import { Card, CardBody } from '@heroui/card';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="min-h-screen bg-default-50 dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-default-600 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-content1 shadow-lg">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t('missionTitle')}
              </h2>
              <p className="text-default-600 leading-relaxed">
                {t('missionDescription')}
              </p>
            </CardBody>
          </Card>

          <Card className="bg-content1 shadow-lg">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t('teamTitle')}
              </h2>
              <p className="text-default-600 leading-relaxed">
                {t('teamDescription')}
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
