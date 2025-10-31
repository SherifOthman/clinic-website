'use server';

import { redirect } from 'next/navigation';

export async function signupAction(formData: FormData) {
  console.log('SIGNUP', Object.fromEntries(formData));

  // TODO: Implement actual API call to backend
  // const response = await fetch(`${process.env.API_BASE_URL}/auth/register`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(Object.fromEntries(formData)),
  // });

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Redirect to verify email page
  redirect('/verify-email');
}

export async function loginAction(formData: FormData) {
  console.log('LOGIN', Object.fromEntries(formData));

  // TODO: Implement actual API call to backend
  // const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(Object.fromEntries(formData)),
  // });

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Redirect to dashboard
  const dashboardUrl =
    process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://dashboard.myapp.com';
  redirect(dashboardUrl);
}

export async function forgotPasswordAction(formData: FormData) {
  console.log('FORGOT_PASSWORD', Object.fromEntries(formData));

  // TODO: Implement actual API call to backend
  // const response = await fetch(`${process.env.API_BASE_URL}/auth/forgot-password`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(Object.fromEntries(formData)),
  // });

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would send an email
  // For now, just log the action
}

export async function resetPasswordAction(formData: FormData) {
  console.log('RESET_PASSWORD', Object.fromEntries(formData));

  // TODO: Implement actual API call to backend
  // const response = await fetch(`${process.env.API_BASE_URL}/auth/reset-password`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(Object.fromEntries(formData)),
  // });

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Redirect to login page
  redirect('/login');
}

export async function verifyEmailAction(token: string) {
  console.log('VERIFY_EMAIL', { token });

  // TODO: Implement actual API call to backend
  // const response = await fetch(`${process.env.API_BASE_URL}/auth/verify?token=${token}`, {
  //   method: 'GET',
  // });

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return success/failure status
  return { success: true, message: 'Email verified successfully' };
}
