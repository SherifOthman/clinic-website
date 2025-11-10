import { Activity } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Activity className="text-primary" size={32} />
      <span className="text-foreground text-xl font-bold">ClinicFlow</span>
    </Link>
  );
};
