"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "@supabase/auth-js";

import { createClient } from "@/utils/supabase/server";
import { signUpSchema, loginSchema } from "@/schemas/authSchema";
import { handleError } from "@/utils/authErrorHandlers";

type PrevState =
  | {
      message: Partial<Record<"email" | "password" | "confirmPassword", string[]>>;
      success?: boolean;
    }
  | { message: string; success?: boolean };

export async function login(prevState: PrevState, formData: FormData) {
  const supabase = createClient();

  const parseResult = loginSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!parseResult.success) {
    return {
      ...prevState,
      message: parseResult.error.flatten().fieldErrors,
    };
  }

  const data = parseResult.data;

  try {
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      return handleError(
        error as AuthError,
        "Login failed. Please check your credentials and try again.",
      );
    }

    revalidatePath("/", "layout");

    return {
      success: true,
      message: "Login successful. Welcome back!",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

export async function signup(prevState: PrevState, formData: FormData) {
  const supabase = createClient();

  const parseResult = signUpSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  });

  if (!parseResult.success) {
    return {
      ...prevState,
      message: parseResult.error.flatten().fieldErrors,
    };
  }

  const data = parseResult.data;

  try {
    const { data: success, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return handleError(error as AuthError, "Signup failed. Please try again later.");
    }

    if (success) {
      return {
        success: true,
        message: "Signup successful. Please check your email to verify your account.",
      };
    }

    revalidatePath("/", "layout");
    redirect("/login");
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
