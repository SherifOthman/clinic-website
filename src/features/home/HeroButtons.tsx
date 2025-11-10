"use client";

import { Button } from "@heroui/button";
import Link from "next/link";

interface HeroButtonsProps {
  getStartedText: string;
  viewPricingText: string;
}

export function HeroButtons({
  getStartedText,
  viewPricingText,
}: HeroButtonsProps) {
  return (
    <div className="mb-6 flex flex-col justify-start gap-4 sm:flex-row">
      <Button
        as={Link}
        href="/signup"
        color="primary"
        size="lg"
        className="px-10 font-semibold shadow-lg"
      >
        {getStartedText}
      </Button>
      <Button
        as={Link}
        href="/#pricing"
        variant="bordered"
        size="lg"
        className="px-10 font-semibold"
      >
        {viewPricingText}
      </Button>
    </div>
  );
}
