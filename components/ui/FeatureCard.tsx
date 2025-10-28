import { Card, CardBody } from "@heroui/card";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <Card
      className={`h-full bg-background dark:bg-default-100 border border-default-200 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <CardBody className="p-6">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-default-600">{description}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
