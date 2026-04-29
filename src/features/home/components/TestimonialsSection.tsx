import { SectionHeader } from "@/src/core/components/ui/SectionHeader";
import { getTranslations } from "next-intl/server";
import { TestimonialCard } from "./TestimonialCard";

interface TestimonialDto {
  authorName: string;
  position: string;
  clinicName: string;
  text: string;
  rating: number;
  avatarUrl?: string | null;
}

async function getTestimonials(): Promise<TestimonialDto[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
    const res = await fetch(
      `${apiUrl}/testimonials`,
      { next: { revalidate: 60 } }, // 1 min in dev, increase for prod
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export const TestimonialsSection = async () => {
  const t = await getTranslations();
  const testimonials = await getTestimonials();

  if (!testimonials.length) return null;

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title={t("testimonials.title")}
          subtitle={t("testimonials.subtitle")}
        />
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
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
