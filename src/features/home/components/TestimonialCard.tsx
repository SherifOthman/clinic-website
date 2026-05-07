import { Avatar, Card } from "@heroui/react";
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
    <Card className="bg-surface hover:shadow-md transition-shadow border border-border/40">
      <Card.Content className="p-6 space-y-6">
        {/* User Info and Rating */}
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 shrink-0">
            {avatar ? <Avatar.Image src={avatar} alt={author} /> : null}
            <Avatar.Fallback>
              {author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </Avatar.Fallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-foreground">{author}</div>
            <div className="text-sm text-muted">{position}</div>
            <div className="text-sm text-accent font-medium">{clinic}</div>
            {/* Stars below name — no overflow */}
            <div className="mt-1.5 flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < rating ? "text-yellow-400 fill-current" : "text-muted/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Text */}
        <div className="text-muted leading-relaxed italic rtl:text-right ltr:text-left">
          "{text}"
        </div>
      </Card.Content>
    </Card>
  );
};
