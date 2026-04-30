import type { LucideIcon } from "lucide-react";

interface StatItemProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

/** Single stat cell used in StatsSection grid. */
export const StatItem = ({ icon: Icon, value, label }: StatItemProps) => (
  <div className="space-y-4 text-center">
    <div className="flex justify-center">
      <div className="rounded-full bg-accent/10 p-4">
        <Icon className="h-8 w-8 text-accent" />
      </div>
    </div>
    <div>
      <div className="text-3xl font-bold text-foreground">{value}</div>
      <div className="text-muted">{label}</div>
    </div>
  </div>
);
