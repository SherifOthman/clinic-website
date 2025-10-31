'use client';

import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function NotFound() {
  const t = useTranslations('common');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="min-h-screen bg-default-50 dark:bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full bg-content1 shadow-xl">
        <CardBody className="p-8 text-center">
          <div className="text-6xl font-bold text-primary mb-4">404</div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {locale === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h1>
          <p className="text-default-600 mb-8">
            {locale === 'ar'
              ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
              : 'Sorry, the page you are looking for does not exist or has been moved.'}
          </p>
          <div className="space-y-3">
            <Link href={`/${locale}`}>
              <Button color="primary" className="w-full font-medium">
                {locale === 'ar' ? 'العودة للرئيسية' : 'Go Home'}
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button variant="bordered" className="w-full font-medium">
                {locale === 'ar' ? 'اتصل بنا' : 'Contact Support'}
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
