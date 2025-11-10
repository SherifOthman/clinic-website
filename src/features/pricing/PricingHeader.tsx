"use client";

import { Chip } from "@heroui/chip";

export function PricingHeader() {
  return (
    <div className="mb-16 text-center">
      <Chip variant="flat" className="mb-6 px-4 py-2 text-base">
        Pricing
      </Chip>
      <h2 className="mb-6 text-4xl font-bold sm:text-5xl">Choose Your Plan</h2>
      <p className="text-default-500 mx-auto mb-10 max-w-2xl text-xl">
        Flexible pricing options to fit your practice needs
      </p>
    </div>
  );
}
