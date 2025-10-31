'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Input, Textarea } from '@heroui/input';
import { Stepper } from '../../../../../components/Stepper';
// Using custom select implementation
import { Spinner } from '@heroui/spinner';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ClinicSetupData {
  clinicName: string;
  clinicType: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  website: string;
  description: string;
  specialties: string[];
}

const clinicTypes = [
  { key: 'family', label: 'Family Practice' },
  { key: 'internal', label: 'Internal Medicine' },
  { key: 'pediatric', label: 'Pediatrics' },
  { key: 'cardiology', label: 'Cardiology' },
  { key: 'dermatology', label: 'Dermatology' },
  { key: 'orthopedic', label: 'Orthopedics' },
  { key: 'dental', label: 'Dental Practice' },
  { key: 'mental', label: 'Mental Health' },
  { key: 'other', label: 'Other' },
];

const steps = [
  {
    id: 'account',
    title: 'Account',
    description: 'Create your account',
  },
  {
    id: 'clinic',
    title: 'Clinic Setup',
    description: 'Configure your clinic',
  },
  {
    id: 'plan',
    title: 'Choose Plan',
    description: 'Select subscription',
  },
];

export default function ClinicSetupPage() {
  const { user, updateUser } = useAuth();
  const t = useTranslations('onboarding');
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ClinicSetupData>();

  useEffect(() => {
    if (!user) {
      router.push(`/${locale}/login`);
      return;
    }

    // Pre-fill clinic name from registration
    if (user.clinicName) {
      setValue('clinicName', user.clinicName);
    }

    setLoading(false);
  }, [user, router, locale, setValue]);

  const onSubmit = async (data: ClinicSetupData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call to save clinic setup
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update user with clinic setup completion
      updateUser({
        clinicName: data.clinicName,
        // Mark clinic setup as complete
        verified: true,
      });

      // Redirect to plan selection
      router.push(`/${locale}/onboarding/plan-selection`);
    } catch (error) {
      console.error('Clinic setup failed:', error);
      alert('Failed to save clinic setup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-default-50 dark:bg-background flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-default-50 dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stepper */}
        <Stepper steps={steps} currentStep={2} className="mb-12" />

        {/* Main Content */}
        <Card className="bg-content1 shadow-lg">
          <CardHeader className="pb-6">
            <div className="text-center w-full">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Set Up Your Clinic
              </h1>
              <p className="text-default-600">
                Let&apos;s configure your clinic information to get started
              </p>
            </div>
          </CardHeader>

          <CardBody className="pt-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  {...register('clinicName', {
                    required: 'Clinic name is required',
                  })}
                  label="Clinic Name"
                  placeholder="Enter your clinic name"
                  variant="bordered"
                  isInvalid={!!errors.clinicName}
                  errorMessage={errors.clinicName?.message}
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Clinic Type *
                  </label>
                  <select
                    {...register('clinicType', {
                      required: 'Clinic type is required',
                    })}
                    className={`
                      w-full px-3 py-3 rounded-lg border-2 bg-background text-foreground
                      ${errors.clinicType ? 'border-danger' : 'border-default-200 focus:border-primary'}
                      focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors
                    `}
                  >
                    <option value="">Select clinic type</option>
                    {clinicTypes.map((type) => (
                      <option key={type.key} value={type.key}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.clinicType && (
                    <p className="text-xs text-danger">
                      {errors.clinicType.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Address Information
                </h3>

                <Input
                  {...register('address', { required: 'Address is required' })}
                  label="Street Address"
                  placeholder="Enter street address"
                  variant="bordered"
                  isInvalid={!!errors.address}
                  errorMessage={errors.address?.message}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    {...register('city', { required: 'City is required' })}
                    label="City"
                    placeholder="Enter city"
                    variant="bordered"
                    isInvalid={!!errors.city}
                    errorMessage={errors.city?.message}
                  />

                  <Input
                    {...register('state', { required: 'State is required' })}
                    label="State"
                    placeholder="Enter state"
                    variant="bordered"
                    isInvalid={!!errors.state}
                    errorMessage={errors.state?.message}
                  />

                  <Input
                    {...register('zipCode', {
                      required: 'ZIP code is required',
                    })}
                    label="ZIP Code"
                    placeholder="Enter ZIP code"
                    variant="bordered"
                    isInvalid={!!errors.zipCode}
                    errorMessage={errors.zipCode?.message}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    {...register('phone', {
                      required: 'Phone number is required',
                    })}
                    label="Phone Number"
                    placeholder="(555) 123-4567"
                    variant="bordered"
                    isInvalid={!!errors.phone}
                    errorMessage={errors.phone?.message}
                  />

                  <Input
                    {...register('website')}
                    label="Website (Optional)"
                    placeholder="https://www.yourclinic.com"
                    variant="bordered"
                  />
                </div>
              </div>

              {/* Description */}
              <Textarea
                {...register('description')}
                label="Clinic Description (Optional)"
                placeholder="Brief description of your clinic and services..."
                variant="bordered"
                minRows={3}
              />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  variant="bordered"
                  className="flex-1"
                  onPress={() => router.push(`/${locale}/signup`)}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  color="primary"
                  className="flex-1"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? 'Saving Clinic Setup...'
                    : 'Continue to Plan Selection'}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
