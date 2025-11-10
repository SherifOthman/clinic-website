import { ContactForm } from "@/src/features/contact";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";

export default function ContactPage() {
  const contactInfo = [
    {
      title: "Sales",
      description: "Ready to get started? Our sales team is here to help.",
      contact: "sales@clinicflow.com",
      phone: "+1 (555) 123-4567",
    },
    {
      title: "Support",
      description:
        "Need help with your account? Our support team is available 24/7.",
      contact: "support@clinicflow.com",
      phone: "+1 (555) 123-4568",
    },
    {
      title: "General",
      description:
        "Have a general question or feedback? We'd love to hear from you.",
      contact: "hello@clinicflow.com",
      phone: "+1 (555) 123-4569",
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl py-24">
      {/* Header Section */}
      <div className="mb-16">
        <h1 className="mb-4 text-3xl font-bold lg:text-4xl">Contact Us</h1>
        <p className="text-default-500 max-w-2xl text-xl">
          Get in touch with our team. We're here to help you transform your
          healthcare practice.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          <ContactForm />
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="mb-6 text-2xl font-bold">Get in touch</h2>
            <p className="text-default-500 mb-8">
              Choose the best way to reach us based on your needs. Our team is
              ready to help you get the most out of ClinicFlow.
            </p>
          </div>

          {contactInfo.map((info, index) => (
            <Card key={index} className="transition-shadow hover:shadow-md">
              <CardBody className="p-8 text-start">
                <h3 className="mb-3 text-xl font-bold">{info.title}</h3>
                <p className="text-default-500 mb-6">{info.description}</p>
                <div className="space-y-2">
                  <p className="font-medium">{info.contact}</p>
                  <p className="text-default-500">{info.phone}</p>
                </div>
              </CardBody>
            </Card>
          ))}

          <Card className="bg-primary/5 transition-shadow hover:shadow-md">
            <CardBody className="p-8 text-start">
              <h3 className="mb-3 text-xl font-bold">Schedule a Demo</h3>
              <p className="text-default-500 mb-6">
                See ClinicFlow in action with a personalized demo tailored to
                your practice needs.
              </p>
              <Button
                color="primary"
                size="lg"
                className="font-semibold shadow-lg"
              >
                Book Demo
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
