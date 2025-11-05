"use client";

import { useLocale, useTranslations } from "next-intl";

import { TestimonialCard } from "@/src/components/TestimonialCard";
import { Testimonial } from "@/src/types";

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Michael Chen",
    role: "Pediatrician",
    clinic: "Children's Health Center",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    quote:
      "ClinicFlow has transformed how we manage our practice. The scheduling system is intuitive and our patients love the automated reminders.",
    rating: 5,
  },
  {
    id: "2",
    name: "Dr. Emily Rodriguez",
    role: "Family Medicine",
    clinic: "Rodriguez Medical Group",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    quote:
      "The patient management features are outstanding. We've reduced administrative work by 40% since switching to ClinicFlow.",
    rating: 5,
  },
  {
    id: "3",
    name: "د. فاطمة الزهراء",
    role: "استشارية نساء وتوليد",
    clinic: "عيادة الزهراء النسائية",
    avatar:
      "https://images.unsplash.com/photo-1594824388853-d0c2d8e8b6b8?w=150&h=150&fit=crop&crop=face",
    quote:
      "نظام ممتاز لإدارة العيادة بدعم كامل للغة العربية. وفر علينا الكثير من الوقت والجهد في إدارة المواعيد والسجلات الطبية.",
    rating: 5,
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    role: "Cardiologist",
    clinic: "Heart Care Specialists",
    avatar:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    quote:
      "The analytics and reporting features give us insights we never had before. Highly recommend for any medical practice.",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full" />
              <span className="font-medium">{t("trustedBy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="font-medium">{t("rating")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span className="font-medium">{t("practices")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

