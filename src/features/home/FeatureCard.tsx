import { Card, CardBody } from "@heroui/card";
import { LucideIcon } from "lucide-react";

import { iconContainer, iconSizes, textStyles } from "@/src/lib/styles";
import { cn } from "@/src/lib/utils";

interface FeatureCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({ Icon, title, description }: FeatureCardProps) => (
  <Card className="transition-shadow hover:shadow-md">
    <CardBody className="p-8 text-center">
      <div className={cn(iconContainer.primary, "mx-auto mb-6 h-16 w-16")}>
        <Icon className={iconSizes.lg} />
      </div>
      <h3 className={textStyles.cardTitle}>{title}</h3>
      <p className={textStyles.cardDescription}>{description}</p>
    </CardBody>
  </Card>
);
