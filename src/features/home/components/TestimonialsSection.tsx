import { SectionHeader } from "@/src/core/components/ui/SectionHeader";
import { getTestimonials } from "@/src/core/utils/serverApi";
import { cacheLife } from "next/cache";
import { getTranslations } from "next-intl/server";
import { TestimonialCard } from "./TestimonialCard";

interface Props {
  locale: string;
}

/**
 * 'use cache' — testimonials fetched from API, cached per locale.
 *
 * Locale is passed as a prop (not read from headers) so this component
 * can be safely cached. The locale prop becomes part of the cache key,
 * so each locale gets its own cached entry.
 *
 * Pattern from: https://aurorascharff.no/posts/implementing-nextjs-16-use-cache-with-next-intl-internationalization/
 */
export async function TestimonialsSection({ locale }: Props) {
  "use cache";
  cacheLife("daily");

  const t = await getTranslations({ locale, namespace: "" });
  const testimonials = await getTestimonials();

  if (!testimonials.length) return null;

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          title={t("testimonials.title")}
          subtitle={t("testimonials.subtitle")}
        />
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={i}
              text={testimonial.text}
              author={testimonial.authorName}
              position={testimonial.position}
              clinic={testimonial.clinicName}
              rating={testimonial.rating}
              avatar={testimonial.avatarUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
