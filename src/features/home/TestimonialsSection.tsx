import { TestimonialCard } from "./TestimonialCard";
import { getTestimonials } from "./testimonialData";

export const TestimonialsSection = async () => {
  // Fetch testimonials from mock data (will be replaced with database fetch)
  const testimonials = await getTestimonials();

  return (
    <section className="from-default-50 to-background bg-gradient-to-b py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 text-center md:mb-20">
          <h2 className="mb-4 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-default-500 mx-auto max-w-2xl px-4 text-lg md:text-xl">
            See what doctors and clinic administrators are saying about
            ClinicFlow
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="text-default-500 flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
              <span className="font-medium">Trusted by 1000+ practices</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-primary h-2 w-2 rounded-full" />
              <span className="font-medium">4.9/5 average rating</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-secondary h-2 w-2 rounded-full" />
              <span className="font-medium">50+ countries worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
