import { Spinner } from "@heroui/spinner";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  label = "Loading...",
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
    >
      <Spinner size={size} color="primary" />
      {label && <p className="text-sm text-default-500">{label}</p>}
    </div>
  );
}
