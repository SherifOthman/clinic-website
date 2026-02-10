import { Card, CardBody } from "@heroui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  text: string;
  author: string;
  position: string;
  clinic: string;
  rating: number;
  avatar?: string | null;
}

export const TestimonialCard = ({
  text,
  author,
  position,
  clinic,
  rating,
  avatar,
}: TestimonialCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardBody className="p-6 space-y-6">
        {/* User Info and Rating */}
        <div className="flex items-start gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-default-200 flex-shrink-0">
              {avatar ? (
                <img
                  src={avatar}
                  alt={author}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-shrink-0">
              <div className="font-semibold text-foreground rtl:text-right ltr:text-left">
                {author}
              </div>
              <div className="text-sm text-default-500 rtl:text-right ltr:text-left">
                {position}
              </div>
              <div className="text-sm text-primary font-medium rtl:text-right ltr:text-left">
                {clinic}
              </div>
            </div>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            {[...Array(5)].map((_, starIndex) => (
              <Star
                key={starIndex}
                className={`h-4 w-4 ${
                  starIndex < rating
                    ? "text-yellow-400 fill-current"
                    : "text-default-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Text */}
        <div className="text-default-600 leading-relaxed italic rtl:text-right ltr:text-left">
          "{text}"
        </div>
      </CardBody>
    </Card>
  );
};
