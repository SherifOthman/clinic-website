import { StarIcon } from "@/components/icons";
import { Card, CardBody } from "@heroui/card";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
}

export function TestimonialCard({
  name,
  role,
  content,
  rating,
}: TestimonialCardProps) {
  return (
    <Card className="h-full bg-background dark:bg-default-100 border border-default-200 shadow-sm hover:shadow-md transition-shadow">
      <CardBody className="p-6">
        <div className="flex mb-4">
          {[...Array(rating)].map((_, i) => (
            <StarIcon
              key={i}
              className="w-5 h-5 text-yellow-400 fill-current"
            />
          ))}
        </div>
        <p className="text-default-700 mb-4">"{content}"</p>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-default-500">{role}</p>
        </div>
      </CardBody>
    </Card>
  );
}
