import { Chip } from "@heroui/chip";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { HeroButtons } from "./HeroButtons";

export async function HeroSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <section
      className="from-background to-default-50 relative flex items-center overflow-hidden bg-gradient-to-b pt-4 pb-12 lg:pt-6 lg:pb-16"
      style={{ minHeight: "calc(100dvh - 64px)" }}
    >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12">
          {/* Content Section */}
          <div className="flex-1 text-start lg:max-w-[50%]">
            <Chip
              variant="flat"
              className="bg-chip mt-8 mb-6 px-4 py-2 text-base"
            >
              {t("trustedBy")}
            </Chip>
            <h1 className="text-foreground mb-4 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl xl:text-5xl">
              {t("heroTitle")}
              <span className="text-primary mt-2 block">
                {t("heroSubtitle")}
              </span>
            </h1>
            <p className="text-default-500 mb-8 text-base leading-relaxed sm:text-lg lg:text-xl">
              {t("heroDescription")}
            </p>
            <HeroButtons
              getStartedText={t("getStartedFree")}
              viewPricingText={t("viewPricing")}
            />
            <p className="text-default-500 text-sm">{t("noCardRequired")}</p>
          </div>

          {/* Image Section */}
          <div className="hidden flex-shrink-0 lg:block lg:w-[45%] xl:w-[50%]">
            <div className="relative mx-auto aspect-square w-full max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px]">
              <Image
                src="/1.png"
                fill
                alt="Hero Image"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
