import { getLocale, getTranslations } from "next-intl/server";

import { TestimonialCard } from "@/src/components/TestimonialCard";
import { Testimonial } from "@/src/types";

const getTestimonials = (locale: string): Testimonial[] => {
  if (locale === "ar") {
    return [
      {
        id: "1",
        name: "د. سارة أحمد",
        role: "طب الأسرة",
        clinic: "عيادة الأسرة الطبية",
        avatar:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
        quote:
          "لقد غيرت ClinicFlow طريقة إدارتنا لعيادتنا. ما كان يستغرق ساعات أصبح الآن يستغرق دقائق، ومرضانا يحبون التجربة المبسطة.",
        rating: 5,
      },
      {
        id: "2",
        name: "د. محمد علي",
        role: "طب الأطفال",
        clinic: "عيادة الأطفال المشرقة",
        avatar:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
        quote:
          "نظام المواعيد رائع. لقد قللنا من عدم الحضور بنسبة 40% ويمكن لموظفينا التركيز على رعاية المرضى بدلاً من المهام الإدارية.",
        rating: 5,
      },
      {
        id: "3",
        name: "فاطمة الزهراء",
        role: "مديرة العيادة",
        clinic: "مركز الصحة المتروبوليتان",
        avatar:
          "https://images.unsplash.com/photo-1594824388853-d0c2d8e8b6b8?w=150&h=150&fit=crop&crop=face",
        quote:
          "كان التنفيذ سلساً وفريق الدعم متميز. لقد تحسنت كفاءتنا بشكل كبير منذ التحول إلى ClinicFlow.",
        rating: 5,
      },
      {
        id: "4",
        name: "د. أحمد حسن",
        role: "الطب الباطني",
        clinic: "مجموعة حسن الطبية",
        avatar:
          "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
        quote:
          "بوابة المرضى كانت نقلة نوعية. يمكن لمرضانا بسهولة حجز المواعيد والوصول إلى سجلاتهم، مما حسن درجات الرضا.",
        rating: 5,
      },
    ];
  }

  return [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      role: "Family Medicine",
      clinic: "Johnson Family Clinic",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      quote:
        "ClinicFlow has transformed how we manage our practice. What used to take hours now takes minutes, and our patients love the streamlined experience.",
      rating: 5,
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      role: "Pediatrician",
      clinic: "Sunshine Pediatrics",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      quote:
        "The scheduling system is incredible. We've reduced no-shows by 40% and our staff can focus on patient care instead of administrative tasks.",
      rating: 5,
    },
    {
      id: "3",
      name: "Lisa Rodriguez",
      role: "Practice Manager",
      clinic: "Metro Health Center",
      avatar:
        "https://images.unsplash.com/photo-1594824388853-d0c2d8e8b6b8?w=150&h=150&fit=crop&crop=face",
      quote:
        "Implementation was seamless and the support team is outstanding. Our efficiency has improved dramatically since switching to ClinicFlow.",
      rating: 5,
    },
    {
      id: "4",
      name: "Dr. Ahmed Hassan",
      role: "Internal Medicine",
      clinic: "Hassan Medical Group",
      avatar:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      quote:
        "The patient portal has been a game-changer. Our patients can easily book appointments and access their records, which has improved satisfaction scores.",
      rating: 5,
    },
  ];
};

export const TestimonialsSection = async () => {
  const t = await getTranslations("testimonials");
  const locale = await getLocale();

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
          {getTestimonials(locale).map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              locale={locale}
            />
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
