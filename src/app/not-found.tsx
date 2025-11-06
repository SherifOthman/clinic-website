import { Button } from "@heroui/button";
import { Home, Mail, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="from-background to-muted/50 flex min-h-screen items-center justify-center bg-gradient-to-b px-6">
      <div className="w-full max-w-2xl text-center">
        <div className="relative mb-8">
          <div className="text-primary/10 text-[180px] leading-none font-bold select-none sm:text-[220px]">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search
              className="text-primary/40 h-20 w-20 sm:h-24 sm:w-24"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
          Page Not Found
        </h1>
        <p className="text-default-500 mx-auto mb-10 max-w-lg text-lg sm:text-xl">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="/en">
            <Button color="primary" size="lg" className="min-w-[180px]">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Button>
          </a>
          <a href="/en/contact">
            <Button variant="bordered" size="lg" className="min-w-[180px]">
              <Mail className="mr-2 h-5 w-5" />
              Contact Support
            </Button>
          </a>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-default-500 mb-4 text-sm">
            You might be looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/en/" className="text-primary text-sm hover:underline">
              Home
            </a>
            <span className="text-default-500">•</span>
            <a
              href="/en/about"
              className="text-primary text-sm hover:underline"
            >
              About
            </a>
            <span className="text-default-500">•</span>
            <a
              href="/en#pricing"
              className="text-primary text-sm hover:underline"
            >
              Pricing
            </a>
            <span className="text-default-500">•</span>
            <a
              href="/en/contact"
              className="text-primary text-sm hover:underline"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
