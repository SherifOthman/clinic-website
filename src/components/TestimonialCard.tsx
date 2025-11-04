"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Card, CardContent } from "@/src/components/ui/card";
import { Star } from "lucide-react";
import { useLocale } from "next-intl";

import { Testimonial } from "@/src/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardContent className="p-5 md:p-8">
        <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6" dir="ltr">
          {isRTL ? (
            <>
              {/* Stars on the most left */}
              <div className="flex text-yellow-400 flex-shrink-0">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 md:w-5 md:h-5 fill-current"
                  />
                ))}
              </div>
              {/* User info in the middle */}
              <div className="flex-1 text-right">
                <h4 className="font-semibold text-base md:text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-primary font-medium text-sm md:text-base">
                  {testimonial.role}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {testimonial.clinic}
                </p>
              </div>
              {/* Avatar on the right */}
              <Avatar className="h-12 w-12 md:h-14 md:w-14 flex-shrink-0">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </>
          ) : (
            <>
              {/* English: Avatar on left */}
              <Avatar className="h-12 w-12 md:h-14 md:w-14 flex-shrink-0">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {/* User info in the middle */}
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-base md:text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-primary font-medium text-sm md:text-base">
                  {testimonial.role}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {testimonial.clinic}
                </p>
              </div>
              {/* Stars on the right */}
              <div className="flex text-yellow-400 flex-shrink-0">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 md:w-5 md:h-5 fill-current"
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <blockquote
          className={`text-foreground/80 text-sm md:text-base leading-relaxed ${isRTL ? "text-right" : "text-left"}`}
        >
          "{testimonial.quote}"
        </blockquote>
      </CardContent>
    </Card>
  );
};
