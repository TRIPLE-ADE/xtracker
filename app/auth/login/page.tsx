"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { login } from "@/app/auth/actions";
import SubmitButton from "@/shared/submitButton";
import { FormInput } from "@/shared/custom/custom-input";

const initialState = {
  success: false,
  message: "",
  redirectPath: undefined,
};

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initialState);
  const router = useRouter();

  const fieldErrors = typeof state.message !== "string" ? state.message : {};

  useEffect(() => {
    if (typeof state.message === "string" && state.message) {
      toast[state.success ? "success" : "error"](state.message);
    }

    if (state.success && state.redirectPath) {
      router.replace(state.redirectPath);
    }
  }, [state.message, toast, state.success, router, state.redirectPath]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 px-5">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-primary text-center mb-6">Welcome to Xtracker</h2>
        <form action={formAction} className="space-y-6">
          <FormInput
            required
            error={fieldErrors?.email?.join(", ")}
            label="Email"
            name="email"
            type="email"
          />
          <FormInput
            required
            error={fieldErrors?.password?.join(", ")}
            label="Password"
            name="password"
            type="password"
          />

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
