"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/app/auth/actions";
import SubmitButton from "@/shared/submitButton";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  success: false,
  message: "",
};

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initialState);
  const { toast } = useToast();
  const router = useRouter();

  // Get the form state and field errors
  const fieldErrors = typeof state.message !== "string" ? state.message : {};

  useEffect(() => {
    // Display a toast message if there is one
    if (typeof state.message === "string" && state.message) {
      toast({
        variant: state.success ? "success" : "destructive",
        title: "Notification",
        description: state.message,
      });
    }

    if (state.success) {
      router.push("/private");
    }
  }, [state.message, toast, state.success, router, state]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-5">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome to XTracker
        </h2>

        <form action={formAction} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email:
            </label>
            <input
              required
              aria-describedby={fieldErrors?.email ? "email-error" : undefined}
              aria-invalid={fieldErrors?.email ? "true" : "false"}
              className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                fieldErrors?.email ? "border-red-500" : "border-gray-300"
              }`}
              id="email"
              name="email"
              type="email"
            />
            {fieldErrors?.email && (
              <p className="text-red-600 text-sm mt-1" id="email-error">
                {fieldErrors.email.join(", ")}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password:
            </label>
            <input
              required
              aria-describedby={fieldErrors?.password ? "password-error" : undefined}
              aria-invalid={fieldErrors?.password ? "true" : "false"}
              className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                fieldErrors?.password ? "border-red-500" : "border-gray-300"
              }`}
              id="password"
              name="password"
              type="password"
            />
            {fieldErrors?.password && (
              <p className="text-red-600 text-sm mt-1" id="password-error">
                {fieldErrors.password.join(", ")}
              </p>
            )}
          </div>

          {/* General Error or Success Message */}
          <p aria-live="polite" className="text-red-600 text-sm sr-only">
            {typeof state.message === "string" ? state.message : ""}
          </p>

          {/* Submit Button */}
          <SubmitButton text="Log in" />

          {/* Don't have an account? */}
          <div className="text-center text-gray-500 mt-4">
            <span>Don&apos;t have an account? </span>
            <Link className="text-indigo-600 hover:underline" href="/auth/signup">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
