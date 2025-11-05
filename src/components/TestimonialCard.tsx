"use client";

import { Avatar } from "@heroui/avatar";
import { Card, CardBody } from "@heroui/card";
import { Star } from "lucide-react";

import { Testimonial } from "@/src/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  locale?: string;
}

export const TestimonialCard = ({
  testimonial,
  locale = "en",
}: TestimonialCardProps) => {
  const isRTL = locale === "ar";

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardBody className="p-5 md:p-8">
        <div className="flex items-start justify-between gap-3 md:gap-4 mb-4 md:mb-6">
          {isRTL ? (
            <>
              {/* Arabic RTL: Stars on the left */}
              <div className="flex text-yellow-400 flex-shrink-0">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 md:w-5 md:h-5 fill-current"
                  />
                ))}
              </div>
              {/* Image and Info together on the right */}
              <div className="flex items-start gap-3 md:gap-4">
                <div className="text-right">
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
                <Avatar
                  src={testimonial.avatar}
                  name={testimonial.name}
                  className="h-12 w-12 md:h-14 md:w-14 flex-shrink-0"
                />
              </div>
            </>
          ) : (
            <>
              {/* English LTR: Image and Info together on the left */}
              <div className="flex items-start gap-3 md:gap-4">
                <Avatar
                  src={testimonial.avatar}
                  name={testimonial.name}
                  className="h-12 w-12 md:h-14 md:w-14 flex-shrink-0"
                />
                <div className="text-left">
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
      </CardBody>
    </Card>
  );
};
