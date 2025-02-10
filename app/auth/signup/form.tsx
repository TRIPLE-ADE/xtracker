"use client";
import Link from "next/link";
import { useActionState } from "react";

import { signup } from "@/app/auth/actions";
import { FormInput, SubmitButton } from "@/shared/custom";
import { AuthFormState } from "@/types";
import { useToastErrorMessage } from "@/hooks/useToastErrorMessage";

export default function SignupForm() {
  const [state, formAction] = useActionState<AuthFormState, FormData>(signup, {});

  useToastErrorMessage(state);

  return (
    <form action={formAction} className="space-y-6">
      {/* Email Input */}
      <FormInput
        required
        aria-describedby="email-error"
        defaultValue={state?.inputs?.email}
        error={state.errors?.email?.join(", ")}
        label="Email"
        name="email"
        type="email"
      />

      {/* Password Input */}
      <FormInput
        required
        aria-describedby="password-error"
        defaultValue={state?.inputs?.password}
        error={state.errors?.password?.join(", ")}
        label="Password"
        name="password"
        type="password"
      />

      {/* Confirm Password Input */}
      <FormInput
        required
        aria-describedby="confirm-password-error"
        defaultValue={state?.inputs?.confirmPassword}
        error={state.errors?.confirmPassword?.join(", ")}
        label="Confirm Password"
        name="confirmPassword"
        type="password"
      />

      {/* General Error or Success Message */}
      <p aria-live="polite" className="text-red-600 text-sm sr-only">
        {state.message}
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
  );
}
