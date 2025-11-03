import { Card, CardBody } from "@heroui/card";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="bg-content1 hover:shadow-md transition-shadow">
      <CardBody className="p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <div className="text-primary">{icon}</div>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-default-600 leading-relaxed">{description}</p>
      </CardBody>
    </Card>
  );
};
