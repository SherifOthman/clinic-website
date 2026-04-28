import { Card } from "@heroui/react";
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
      <Card.Content className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-accent/10 rounded-lg">
            <Icon className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-foreground rtl:text-right ltr:text-left">
            {title}
          </h3>
        </div>
        <p className="text-muted leading-relaxed rtl:text-right ltr:text-left">
          {description}
        </p>
      </Card.Content>
    </Card>
  );
};
