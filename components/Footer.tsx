'use client';

import { Link } from '@heroui/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { ClinicIcon } from './icons';

export function Footer() {
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const tFooter = useTranslations('footer');
  const params = useParams();
  const locale = params.locale as string;

  const footerLinks = {
    product: [
      { label: tFooter('features'), href: `/${locale}/features` },
      { label: t('pricing'), href: `/${locale}/pricing` },
      { label: tFooter('security'), href: `/${locale}/security` },
      { label: tFooter('integrations'), href: `/${locale}/integrations` },
    ],
    company: [
      { label: t('about'), href: `/${locale}/about` },
      { label: tFooter('blog'), href: `/${locale}/blog` },
      { label: tFooter('careers'), href: `/${locale}/careers` },
      { label: t('contact'), href: `/${locale}/contact` },
    ],
    support: [
      { label: tFooter('helpCenter'), href: `/${locale}/help` },
      { label: tFooter('documentation'), href: `/${locale}/docs` },
      { label: tFooter('apiReference'), href: `/${locale}/api` },
      { label: tFooter('status'), href: `/${locale}/status` },
    ],
    legal: [
      { label: tFooter('privacyPolicy'), href: `/${locale}/privacy` },
      { label: tFooter('termsOfService'), href: `/${locale}/terms` },
      { label: tFooter('hipaaCompliance'), href: `/${locale}/hipaa` },
      { label: tFooter('cookiePolicy'), href: `/${locale}/cookies` },
    ],
  };

  return (
    <footer className="bg-default-100 border-t border-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <ClinicIcon className="text-primary" size={32} />
              <span className="font-bold text-xl text-foreground">
                {tCommon('clinicFlow')}
              </span>
            </div>
            <p className="text-default-600 text-sm mb-4 max-w-sm leading-relaxed">
              {tFooter('description')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {tFooter('product')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-default-600 hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {tFooter('company')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-default-600 hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {tFooter('support')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-default-600 hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {tFooter('legal')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-default-600 hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-divider mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-default-600 text-sm">
            © 2024 {tCommon('clinicFlow')}. {tFooter('allRightsReserved')}.
          </p>
          <p className="text-default-600 text-sm mt-2 sm:mt-0">
            {tFooter('compliance')}
          </p>
        </div>
      </div>
    </footer>
  );
}
