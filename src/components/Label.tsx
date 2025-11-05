import { cn } from "@/src/lib/utils";
import { forwardRef } from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium text-foreground block mb-2",
        className
      )}
      {...props}
    />
  )
);

Label.displayName = "Label";
