import { SectionHeader } from "@/src/core/components/ui/SectionHeader";
import { Accordion } from "@heroui/react";
import { cacheLife } from "next/cache";
import { ChevronDown } from "lucide-react";
import { getTranslations } from "next-intl/server";

/**
 * 'use cache' — pure translation output, cached per locale.
 * Locale passed as prop so getTranslations doesn't read from headers().
 */
interface Props {
  locale: string;
}

export async function PricingFAQ({ locale }: Props) {
  "use cache";
  cacheLife("max");

  const t = await getTranslations({ locale, namespace: "" });

  const faqs = [1, 2, 3, 4].map((i) => ({
    id: String(i),
    question: t(`pricing.faq.question${i}` as any),
    answer:   t(`pricing.faq.answer${i}`   as any),
  }));

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          title={t("pricing.faq.title")}
          subtitle={t("pricing.faq.subtitle")}
        />
        <Accordion variant="surface" className="w-full">
          {faqs.map((faq) => (
            <Accordion.Item key={faq.id} id={faq.id}>
              <Accordion.Heading>
                <Accordion.Trigger>
                  {faq.question}
                  <Accordion.Indicator>
                    <ChevronDown className="h-4 w-4" />
                  </Accordion.Indicator>
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body className="text-muted">
                  {faq.answer}
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
