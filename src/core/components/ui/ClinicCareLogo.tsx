import Image from "next/image";
import Link from "next/link";

interface ClinicCareLogoProps {
  locale?: string;
  className?: string;
  iconSize?: number;
}

export function ClinicCareLogo({ locale = "en", className = "", iconSize = 28 }: ClinicCareLogoProps) {
  return (
    <Link href={`/${locale}`} className={`flex items-center gap-2 no-underline ${className}`}>
      <Image src="/logo.svg" alt="ClinicCare" width={iconSize} height={iconSize} priority />
      <span className="text-lg font-bold text-foreground">ClinicCare</span>
    </Link>
  );
}
