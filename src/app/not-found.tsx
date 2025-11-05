"use client";

import { Button } from "@heroui/button";
import { Home, Mail, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-background to-muted/50">
      <div className="max-w-2xl w-full text-center">
        <div className="relative mb-8">
          <div className="text-[180px] sm:text-[220px] font-bold text-primary/10 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search
              className="w-20 h-20 sm:w-24 sm:h-24 text-primary/40"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Page Not Found
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-lg mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => (window.location.href = "/")}
            color="primary"
            size="lg"
            className="min-w-[180px]"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Button>
          <Button
            onClick={() => (window.location.href = "/contact")}
            variant="bordered"
            size="lg"
            className="min-w-[180px]"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contact Support
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/" className="text-sm text-primary hover:underline">
              Home
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/about" className="text-sm text-primary hover:underline">
              About
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href="/en#pricing"
              className="text-sm text-primary hover:underline"
            >
              Pricing
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/contact" className="text-sm text-primary hover:underline">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
