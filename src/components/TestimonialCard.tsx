"use client";

import { Avatar } from "@heroui/avatar";
import { Card, CardBody } from "@heroui/card";
import { Star } from "lucide-react";

import { iconSizes } from "@/src/lib/styles";
import { Testimonial } from "@/src/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <Card className="h-full transition-shadow hover:shadow-lg">
      <CardBody className="p-5 text-start md:p-8">
        <div className="mb-4 flex items-start justify-between gap-3 md:mb-6 md:gap-4">
          <div className="flex flex-1 items-start gap-3 md:gap-4">
            <Avatar
              src={testimonial.avatar}
              name={testimonial.name}
              className="h-12 w-12 flex-shrink-0 md:h-14 md:w-14"
            />
            <div className="text-start">
              <h4 className="text-base font-semibold md:text-lg">
                {testimonial.name}
              </h4>
              <p className="text-primary text-sm font-medium md:text-base">
                {testimonial.role}
              </p>
              <p className="text-default-500 text-xs md:text-sm">
                {testimonial.clinic}
              </p>
            </div>
          </div>
          <div className="flex flex-shrink-0 text-yellow-400">
            {Array.from({ length: testimonial.rating }, (_, i) => (
              <Star key={i} className={`${iconSizes.md} fill-current`} />
            ))}
          </div>
        </div>
        <blockquote className="text-foreground/80 text-start text-sm leading-relaxed md:text-base">
          "{testimonial.quote}"
        </blockquote>
      </CardBody>
    </Card>
  );
};
