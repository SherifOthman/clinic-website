"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { submitContactForm } from "./actions";
import { ContactFormData, contactSchema } from "./schemas";

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    try {
      const result = await submitContactForm(data);
      if (result.success) {
        setSubmitSuccess(true);
        reset();
      }
    } catch (error) {
      console.error("Failed to submit contact form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-xl">
      <CardHeader className="flex-col items-start gap-4 px-8 pt-8 pb-6">
        <h2 className="text-2xl font-bold">Contact Us</h2>
        <p className="text-default-500">
          Get in touch with our team. We're here to help you transform your
          healthcare practice.
        </p>
      </CardHeader>
      <CardBody className="px-8 pb-8 text-start">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Full Name"
            {...register("name")}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <Input
            label="Email Address"
            type="email"
            {...register("email")}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <Input
            label="Company/Practice Name"
            {...register("company")}
            isInvalid={!!errors.company}
            errorMessage={errors.company?.message}
          />
          <Textarea
            label="Message"
            rows={4}
            {...register("message")}
            isInvalid={!!errors.message}
            errorMessage={errors.message?.message}
          />
          {submitSuccess && (
            <p className="text-success text-sm">
              Thank you! Your message has been sent successfully.
            </p>
          )}
          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full font-semibold"
            isLoading={isSubmitting}
          >
            Send Message
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
