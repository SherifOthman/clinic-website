import { Testimonial } from "@/src/types";

export const getTestimonials = async (): Promise<Testimonial[]> => {
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
