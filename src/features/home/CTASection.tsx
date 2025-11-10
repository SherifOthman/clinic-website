"use client";

import { Button } from "@heroui/button";
import Link from "next/link";

import { spacing, textStyles } from "@/src/lib/styles";
import { cn } from "@/src/lib/utils";

export function CTASection() {
  return (
    <section
      className={cn(
        "from-muted/50 to-background bg-gradient-to-b",
        spacing.section
      )}
    >
      <div className="relative z-10 container mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className={textStyles.sectionTitle}>
          Ready to Transform Your Practice?
        </h2>
        <p className={cn(textStyles.sectionSubtitle, "text-default-500 mb-12")}>
          Join thousands of healthcare professionals who trust ClinicFlow
        </p>
        <Button
          as={Link}
          href="/signup"
          color="primary"
          size="lg"
          className="px-12 font-semibold shadow-lg"
        >
          Start Your Free Trial
        </Button>
        <p className="text-default-500 mt-8 text-sm">30-day free trial</p>
      </div>
    </section>
  );
}
