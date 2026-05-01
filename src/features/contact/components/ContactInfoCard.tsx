import { CtaButton } from "@/src/core/components/ui/CtaButton";
import { Card, Link } from "@heroui/react";
import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

interface ContactInfoItem {
  icon: LucideIcon;
  title: string;
  value: string;
  href: string;
}

export function ContactInfoSidebar() {
  const t = useTranslations();

  const items: ContactInfoItem[] = [
    { icon: Mail,   title: t("contact.info.email.title"),   value: "support@cliniccare.com",        href: "mailto:support@cliniccare.com" },
    { icon: Phone,  title: t("contact.info.phone.title"),   value: "+1 (555) 123-4567",             href: "tel:+15551234567" },
    { icon: MapPin, title: t("contact.info.address.title"), value: t("contact.info.address.value"), href: "#" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">{t("contact.info.title")}</h2>
        <p className="mt-2 text-muted">{t("contact.info.subtitle")}</p>
      </div>

      {items.map((item) => (
        <ContactInfoItem key={item.title} {...item} />
      ))}

      <Card className="bg-accent text-accent-foreground">
        <Card.Content className="space-y-4 p-6 text-center">
          <h3 className="text-xl font-semibold">{t("contact.quickActions.title")}</h3>
          <p className="opacity-90">{t("contact.quickActions.subtitle")}</p>
          <CtaButton href="/en/register" className="bg-white text-accent hover:bg-white/90">
            {t("hero.cta")}
          </CtaButton>
        </Card.Content>
      </Card>
    </div>
  );
}

function ContactInfoItem({ icon: Icon, title, value, href }: ContactInfoItem) {
  return (
    <Card>
      <Card.Content className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-accent/10 p-3">
            <Icon className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            {href === "#"
              ? <p className="text-muted">{value}</p>
              : <Link href={href} className="text-accent hover:underline">{value}</Link>
            }
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
