import { CtaButton } from "@/src/core/components/ui/CtaButton";
import { Card, Link, Text } from "@heroui/react";
import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface ContactInfoItem {
  icon: LucideIcon;
  title: string;
  value: string;
  href: string;
}

interface ContactInfoSidebarProps {
  locale: string;
}

export async function ContactInfoSidebar({ locale }: ContactInfoSidebarProps) {
  const t = await getTranslations();

  const items: ContactInfoItem[] = [
    { icon: Mail,   title: t("contact.info.email.title"),   value: "sheriff.a.othman@gmail.com",    href: "mailto:sheriff.a.othman@gmail.com" },
    { icon: Phone,  title: t("contact.info.phone.title"),   value: "+20 01098021259",               href: "tel:+2001098021259" },
    { icon: MapPin, title: t("contact.info.address.title"), value: "Egypt, Kafr El Sheikh, Borg El Bruls", href: "#" },
  ];

  return (
    <div className="space-y-6">
      <div>
      <Text type="h2" weight="bold" className="text-3xl">{t("contact.info.title")}</Text>
      <Text type="body" color="muted" className="mt-2">{t("contact.info.subtitle")}</Text>
      </div>

      {items.map((item) => (
        <ContactInfoItemCard key={item.title} {...item} />
      ))}

      <Card className="bg-accent text-accent-foreground">
        <Card.Content className="space-y-4 p-6 text-center">
          <Text type="h3" weight="semibold" className="text-xl">{t("contact.quickActions.title")}</Text>
          <Text type="body" className="opacity-90">{t("contact.quickActions.subtitle")}</Text>
          <CtaButton href={`/${locale}/register`} className="bg-white !text-accent hover:bg-white/90">
            {t("hero.cta")}
          </CtaButton>
        </Card.Content>
      </Card>
    </div>
  );
}

function ContactInfoItemCard({ icon: Icon, title, value, href }: ContactInfoItem) {
  return (
    <Card>
      <Card.Content className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-accent/10 p-3">
            <Icon className="h-6 w-6 text-accent" />
          </div>
          <div>
            <Text type="h3" weight="semibold">{title}</Text>
            {href === "#"
              ? <Text type="body-sm" color="muted">{value}</Text>
              : <Link href={href} className="text-accent hover:underline">{value}</Link>
            }
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
