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
  redirectPath: undefined,
};

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initialState);
  const { toast } = useToast();
  const router = useRouter();

  const fieldErrors = typeof state.message !== "string" ? state.message : {};

  useEffect(() => {
    if (typeof state.message === "string" && state.message) {
      toast({
        variant: state.success ? "success" : "destructive",
        title: "Notification",
        description: state.message,
      });
    }

    if (state.success && state.redirectPath) {
      router.push(state.redirectPath);
    }
  }, [state.message, toast, state.success, router, state.redirectPath]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 px-5">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-primary text-center mb-6">Welcome to Xtracker</h2>
        <form action={formAction} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email:
            </label>
            <input
              required
              className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                fieldErrors?.email ? "border-red-500" : "border-gray-300"
              }`}
              id="email"
              name="email"
              type="email"
            />
            {fieldErrors?.email && (
              <p className="text-red-600 text-sm mt-1">{fieldErrors.email.join(", ")}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password:
            </label>
            <input
              required
              className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                fieldErrors?.password ? "border-red-500" : "border-gray-300"
              }`}
              id="password"
              name="password"
              type="password"
            />
            {fieldErrors?.password && (
              <p className="text-red-600 text-sm mt-1">{fieldErrors.password.join(", ")}</p>
            )}
          </div>

          <SubmitButton text="Log in" />

          <div className="text-center text-gray-500 mt-4">
            <span>Don&apos;t have an account? </span>
            <Link className="text-primary hover:underline" href="/auth/signup">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
