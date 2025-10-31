import { Card, CardBody, CardHeader } from '@heroui/card';
import { Link } from '@heroui/link';

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerText?: string;
  footerLink?: {
    text: string;
    href: string;
  };
}

export function AuthLayout({
  title,
  description,
  children,
  footerText,
  footerLink,
}: AuthLayoutProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-large">
        <CardHeader className="flex flex-col gap-3 pb-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-default-500 text-sm mt-2">{description}</p>
          </div>
        </CardHeader>
        <CardBody className="pt-0 px-6 pb-6">
          {children}

          {footerText && footerLink && (
            <div className="text-center mt-6">
              <p className="text-sm text-default-500">
                {footerText}{' '}
                <Link
                  href={footerLink.href}
                  className="text-primary font-medium"
                >
                  {footerLink.text}
                </Link>
              </p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
