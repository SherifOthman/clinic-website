"use client";

import { Button } from "@heroui/button";
import Link from "next/link";

export function PricingCTA() {
  return (
    <div className="mt-16 text-center">
      <p className="text-default-500 mb-4">
        Need a custom plan for your organization?
      </p>
      <Button
        as={Link}
        href="/contact"
        variant="bordered"
        size="lg"
        className="font-semibold"
      >
        Contact Sales
      </Button>
    </div>
  );
}
