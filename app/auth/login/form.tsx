"use client";
import Link from "next/link";
import { useActionState } from "react";

import { login } from "@/app/auth/actions";
import { FormInput, SubmitButton } from "@/shared/custom";
import { AuthFormState } from "@/types";
import { useToastErrorMessage } from "@/hooks/useToastErrorMessage";

export default function LoginForm() {
  const [state, formAction] = useActionState<AuthFormState, FormData>(login, {});

  useToastErrorMessage(state);

  return (
    <form action={formAction} className="space-y-6">
      <FormInput
        required
        aria-describedby="email-error"
        defaultValue={state?.inputs?.email}
        error={state?.errors?.email?.join(", ")}
        label="Email"
        name="email"
        type="email"
      />
      <FormInput
        required
        aria-describedby="password-error"
        defaultValue={state?.inputs?.password}
        error={state?.errors?.password?.join(", ")}
        label="Password"
        name="password"
        type="password"
      />

      {/* General Error or Success Message */}
      <p aria-live="polite" className="text-red-600 text-sm sr-only">
        {state.message}
      </p>
      <SubmitButton text="Log in" />

      <div className="text-center text-gray-500 mt-4">
        <span>Don&apos;t have an account? </span>
        <Link className="text-primary hover:underline" href="/auth/signup">
          Sign up
        </Link>
      </div>
    </form>
  );
}
