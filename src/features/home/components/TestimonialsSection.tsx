import { SectionHeader } from "@/src/core/components/ui/SectionHeader";
import { getTestimonials } from "@/src/core/utils/serverApi";
import { getTranslations } from "next-intl/server";
import { TestimonialCard } from "./TestimonialCard";

export const TestimonialsSection = async () => {
  const t = await getTranslations();
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
};
