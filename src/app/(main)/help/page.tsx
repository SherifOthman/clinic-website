"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";

import { PageHeader } from "@/src/components";

export default function HelpPage() {
  const helpSections = [
    {
      title: "Getting Started",
      description: "Learn the basics of setting up and using ClinicFlow.",
      items: [
        "Initial clinic setup and configuration",
        "Adding and managing patient records",
        "Scheduling and managing appointments",
        "Generating reports and analytics",
      ],
    },
    {
      title: "Features Guide",
      description: "Detailed guides on using ClinicFlow's powerful features.",
      items: [
        "Complete patient management system",
        "Advanced appointment scheduling",
        "Billing and payment processing",
        "Analytics and reporting tools",
      ],
    },
    {
      title: "Troubleshooting",
      description: "Solutions to common issues and problems.",
      items: [
        "Login and authentication issues",
        "Data synchronization problems",
        "Performance optimization tips",
        "Data backup and recovery",
      ],
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl py-24">
      <PageHeader
        title="Help & Support"
        subtitle="Find answers to common questions and get the help you need to make the most of ClinicFlow."
      />

      <div className="mt-16 mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {helpSections.map((section, index) => (
          <Card key={index} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <h3 className="text-xl font-bold">{section.title}</h3>
            </CardHeader>
            <CardBody className="text-start">
              <p className="text-default-500 mb-6">{section.description}</p>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm">
                    • {item}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Card className="bg-primary/5 mx-auto max-w-2xl transition-shadow hover:shadow-md">
          <CardBody className="p-10 text-start">
            <h3 className="mb-4 text-center text-3xl font-bold">
              Need More Help?
            </h3>
            <p className="text-default-500 mb-8 text-xl">
              Our support team is here to help you with any questions or issues
              you may have.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                color="primary"
                size="lg"
                className="font-semibold shadow-lg"
              >
                Contact Support
              </Button>
              <Button variant="bordered" size="lg" className="font-semibold">
                View Documentation
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
