import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  soon?: boolean;
  className?: string;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  soon = false,
  className = "",
}: FeatureCardProps) => {
  return (
    <div className={`relative rounded-xl border border-border bg-surface p-6 space-y-4 transition-shadow hover:shadow-lg ${soon ? "opacity-70" : ""} ${className}`}>
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-accent/10 rounded-lg shrink-0">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-foreground rtl:text-right ltr:text-left">
            {title}
          </h3>
          {soon && (
            <span className="text-[10px] font-semibold uppercase tracking-wide bg-accent/10 text-accent px-1.5 py-0.5 rounded-full">
              Soon
            </span>
          )}
        </div>
      </div>
      <p className="text-sm text-muted leading-relaxed rtl:text-right ltr:text-left">
        {description}
      </p>
    </div>
  );
};
