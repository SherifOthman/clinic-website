"use server";

import { clearAuthCookies } from "@/src/lib/auth";
import { redirect } from "next/navigation";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  clinicName: string;
  password: string;
}

export async function loginAction(_data: LoginData) {
  try {
    // TODO: Call your .NET API
    // const response = await fetch('https://your-api.com/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(_data)
    // });
    // const authResponse: AuthResponse = await response.json();
    // await setAuthCookies(authResponse);

    return { success: false, error: "Not implemented" };
  } catch (error: any) {
    return { success: false, error: error.message || "Login failed" };
  }
}

export async function signupAction(_data: SignupData) {
  try {
    // TODO: Call your .NET API
    // const response = await fetch('https://your-api.com/auth/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(_data)
    // });
    // const authResponse: AuthResponse = await response.json();
    // await setAuthCookies(authResponse);

    return { success: false, error: "Not implemented" };
  } catch (error: any) {
    return { success: false, error: error.message || "Signup failed" };
  }
}

export async function logoutAction() {
  await clearAuthCookies();
  redirect("/");
}
