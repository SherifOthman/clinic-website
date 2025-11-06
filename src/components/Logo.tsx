import { Activity } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/navigation";

export const Logo = () => {
  const tCommon = useTranslations("common");

  return (
    <Link href="/" className="flex items-center gap-2">
      <Activity className="text-primary" size={32} />
      <span className="text-foreground text-xl font-bold">
        {tCommon("clinicFlow")}
      </span>
    </Link>
  );
};
