"use client";

import { Avatar } from "@heroui/avatar";
import { Card, CardBody } from "@heroui/card";
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
    <Card className="h-full bg-content1 hover:shadow-lg transition-shadow">
      <CardBody className="p-5 md:p-8">
        <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
          {isRTL ? (
            <>
              {/* Arabic: Avatar → Name/Info → Stars */}
              <Avatar
                src={testimonial.avatar}
                alt={testimonial.name}
                size="lg"
                className="flex-shrink-0"
              />
              <div className="flex-1 text-right">
                <h4 className="font-semibold text-base md:text-lg text-foreground">
                  {testimonial.name}
                </h4>
                <p className="text-primary-600 font-medium text-sm md:text-base">
                  {testimonial.role}
                </p>
                <p className="text-xs md:text-sm text-default-600">
                  {testimonial.clinic}
                </p>
              </div>
              <div className="flex text-yellow-400 flex-shrink-0">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 md:w-5 md:h-5 fill-current"
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* English: Avatar → Name/Info → Stars */}
              <Avatar
                src={testimonial.avatar}
                alt={testimonial.name}
                size="lg"
                className="flex-shrink-0"
              />
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-base md:text-lg text-foreground">
                  {testimonial.name}
                </h4>
                <p className="text-primary-600 font-medium text-sm md:text-base">
                  {testimonial.role}
                </p>
                <p className="text-xs md:text-sm text-default-600">
                  {testimonial.clinic}
                </p>
              </div>
              <div className="flex text-yellow-400 flex-shrink-0">
                {[...Array(testimonial.rating)].map((_, i) => (
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
          className={`text-default-700 text-sm md:text-base leading-relaxed ${isRTL ? "text-right" : "text-left"}`}
        >
          "{testimonial.quote}"
        </blockquote>
      </CardBody>
    </Card>
  );
};
