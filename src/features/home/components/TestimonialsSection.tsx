import { SectionHeader } from "@/src/core/components/ui/SectionHeader";
import { getTranslations } from "next-intl/server";
import { TestimonialCard } from "./TestimonialCard";

export const TestimonialsSection = async () => {
  const t = await getTranslations();

  const testimonials = [
    {
      text: t("testimonials.testimonial1.text"),
      author: t("testimonials.testimonial1.author"),
      position: t("testimonials.testimonial1.position"),
      clinic: t("testimonials.testimonial1.clinic"),
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    },
    {
      text: t("testimonials.testimonial2.text"),
      author: t("testimonials.testimonial2.author"),
      position: t("testimonials.testimonial2.position"),
      clinic: t("testimonials.testimonial2.clinic"),
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    },
    {
      text: t("testimonials.testimonial3.text"),
      author: t("testimonials.testimonial3.author"),
      position: t("testimonials.testimonial3.position"),
      clinic: t("testimonials.testimonial3.clinic"),
      rating: 5,
      avatar: null,
    },
  ];

  return (
    <section className="py-20 bg-content1">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title={t("testimonials.title")}
          subtitle={t("testimonials.subtitle")}
        />

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};
