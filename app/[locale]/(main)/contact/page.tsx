'use client';

import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { Input, Textarea } from '@heroui/input';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const t = useTranslations('contact');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Message sent successfully!');
      reset();
    } catch (error) {
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-default-50 dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-default-600 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-content1 shadow-lg">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t('sendMessage')}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  {...register('name', { required: t('nameRequired') })}
                  label={t('name')}
                  variant="bordered"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />

                <Input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  label="Email"
                  type="email"
                  variant="bordered"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />

                <Textarea
                  {...register('message', { required: t('messageRequired') })}
                  label={t('message')}
                  variant="bordered"
                  minRows={4}
                  isInvalid={!!errors.message}
                  errorMessage={errors.message?.message}
                />

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  color="primary"
                  size="lg"
                  className="w-full font-medium"
                >
                  {t('sendMessage')}
                </Button>
              </form>
            </CardBody>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-content1 shadow-lg">
              <CardBody className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Get in Touch
                </h3>
                <div className="space-y-4 text-default-600">
                  <div>
                    <p className="font-medium">Email</p>
                    <p>support@clinicflow.com</p>
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p>+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p>
                      123 Healthcare Ave
                      <br />
                      Medical District, MD 12345
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
