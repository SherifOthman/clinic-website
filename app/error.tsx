'use client';

import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-default-50 dark:bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-danger"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Something went wrong!
          </h1>
          <p className="text-default-600 mb-2">
            We&apos;re sorry, but something unexpected happened.
          </p>
          {error.digest && (
            <p className="text-xs text-default-400 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <Card className="bg-content1 shadow-xl">
          <CardBody className="p-8">
            <div className="space-y-4">
              <Button
                color="primary"
                size="lg"
                className="w-full font-semibold"
                onPress={reset}
              >
                Try Again
              </Button>

              <Button
                variant="bordered"
                size="lg"
                className="w-full"
                onPress={() => (window.location.href = '/en')}
              >
                Go to Home
              </Button>
            </div>

            <div className="mt-6 text-sm text-default-500">
              <p>
                If the problem persists,{' '}
                <button
                  onClick={() => (window.location.href = '/en/contact')}
                  className="text-primary hover:text-primary-600 font-medium underline bg-transparent border-none cursor-pointer"
                >
                  contact support
                </button>
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
