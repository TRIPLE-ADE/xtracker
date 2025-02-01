"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { signup } from "@/app/auth/actions";
import SubmitButton from "@/shared/submitButton";
import { FormInput } from "@/shared/custom/custom-input";

const initialState = {
  success: false,
  message: "",
};

export default function SignupPage() {
  const [state, formAction] = useFormState(signup, initialState);
  const router = useRouter();

  // Extract error messages if they exist
  const fieldErrors = typeof state.message !== "string" ? state.message : {};

  useEffect(() => {
    // Display a toast message if there is one
    if (typeof state.message === "string" && state.message) {
      toast[state.success ? "success" : "error"](state.message);
    }

    if (state.success) {
      router.replace("/auth/login");
    }
  }, [state.message, toast, state.success, router, state]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 px-5">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-primary text-center">Welcome to Xtracker</h2>
        <p className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Your Account</p>

        <form action={formAction} className="space-y-6">
          {/* Email Input */}
          <FormInput
            required
            error={fieldErrors?.email?.join(", ")}
            label="Email"
            name="email"
            type="email"
          />

          {/* Password Input */}
          <FormInput
            required
            error={fieldErrors?.password?.join(", ")}
            label="Password"
            name="password"
            type="password"
          />

          {/* Confirm Password Input */}
          <FormInput
            required
            error={fieldErrors?.confirmPassword?.join(", ")}
            label="Confirm Password"
            name="confirmPassword"
            type="password"
          />

          {/* General Error or Success Message */}
          <p aria-live="polite" className="text-red-600 text-sm sr-only">
            {typeof state.message === "string" ? state.message : ""}
          </p>

          {/* Submit Button */}
          <SubmitButton text="Sign Up" />

          {/* Already have an account? */}
          <div className="text-center text-gray-500 mt-4">
            <span> Already have an account?</span>
            <Link className="text-primary hover:underline" href="/auth/login">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
