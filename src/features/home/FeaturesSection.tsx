import { BarChart3, Calendar, Shield, Users } from "lucide-react";

import { spacing, textStyles } from "@/src/lib/styles";
import { cn } from "@/src/lib/utils";
import { FeatureCard } from "./FeatureCard";

export function FeaturesSection() {
  const features = [
    {
      Icon: Users,
      title: "Patient Management",
      description:
        "Complete patient records, medical history, and secure document storage with HIPAA compliance.",
    },
    {
      Icon: Calendar,
      title: "Smart Scheduling",
      description:
        "Intelligent appointment booking with automated reminders and calendar synchronization.",
    },
    {
      Icon: Shield,
      title: "HIPAA Compliance",
      description:
        "Built-in security features and compliance tools to protect patient data and meet regulations.",
    },
    {
      Icon: BarChart3,
      title: "Analytics & Reports",
      description:
        "Comprehensive insights into your practice performance with customizable reports and dashboards.",
    },
  ];

  return (
    <section className={cn(spacing.section, "bg-background")}>
      <div className={spacing.container}>
        <div className="mb-20 text-center">
          <h2 className={cn(textStyles.sectionTitle, "text-foreground")}>
            Everything You Need to Run Your Clinic
          </h2>
          <p className={textStyles.sectionSubtitle}>
            Comprehensive tools designed specifically for healthcare
            professionals
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
