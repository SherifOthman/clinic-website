import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Spacer } from "@heroui/spacer";
import NextLink from "next/link";

import { subtitle, title } from "@/components/primitives";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6 bg-background">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-8xl md:text-9xl font-bold text-primary/20 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Chip
              color="primary"
              variant="solid"
              className="text-lg px-6 py-2 animate-pulse"
            >
              Oops!
            </Chip>
          </div>
        </div>

        <Card className="bg-background border shadow-lg">
          <CardBody className="p-8">
            <h1 className={title({ size: "lg", className: "mb-4" })}>
              Page Not{" "}
              <span className={title({ color: "blue", size: "lg" })}>
                Found
              </span>
            </h1>
            <p className={subtitle({ className: "mb-8 max-w-md mx-auto" })}>
              Looks like you've wandered into uncharted territory. Don't worry,
              even the best explorers get lost sometimes!
            </p>

            <Spacer y={6} />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NextLink href="/">
                <Button color="primary" size="lg" className="min-w-32">
                  Take Me Home
                </Button>
              </NextLink>
              <NextLink href="/register">
                <Button
                  variant="bordered"
                  color="primary"
                  size="lg"
                  className="min-w-32"
                >
                  Start Free Trial
                </Button>
              </NextLink>
            </div>

            <Spacer y={6} />

            <div className="text-sm text-default-500">
              <p>
                Need help?{" "}
                <NextLink href="/" className="text-primary hover:underline">
                  Contact Support
                </NextLink>
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
