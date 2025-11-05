import { Activity } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/routing";

export const Logo = () => {
  const tCommon = useTranslations("common");

  return (
    <Link href="/" className="flex items-center gap-2">
      <Activity className="text-primary" size={32} />
      <span className="font-bold text-xl text-foreground">
        {tCommon("clinicFlow")}
      </span>
    </Link>
  );
};

