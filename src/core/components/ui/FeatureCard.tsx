import { Card, CardBody } from "@heroui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className = "",
}: FeatureCardProps) => {
  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <CardBody className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-100 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground rtl:text-right ltr:text-left">
            {title}
          </h3>
        </div>
        <p className="text-default-600 leading-relaxed rtl:text-right ltr:text-left">
          {description}
        </p>
      </CardBody>
    </Card>
  );
};
