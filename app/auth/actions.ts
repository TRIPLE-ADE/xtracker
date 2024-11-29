"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "@supabase/auth-js";

import { createClient } from "@/utils/supabase/server";
import { signUpSchema, loginSchema } from "@/schemas/authSchema";
import { onboardingSchema } from "@/schemas/onboardingSchema";
import { handleError } from "@/utils/authErrorHandlers";

type PrevState = {
  message: string | Partial<Record<string, string[]>>;
  success?: boolean;
  redirectPath?: string;
};

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
      redirectPath: undefined,
    };
  }

  const data = parseResult.data;

  try {
    const { data: loginData, error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      return {
        ...handleError(
          error as AuthError,
          "Login failed. Please check your credentials and try again.",
        ),
        redirectPath: undefined,
      };
    }

    if (loginData) {
      const { data: profileData, error: profileError } = await supabase
        .from("onboarding")
        .select("onboarding_status")
        .eq("user_id", loginData.user?.id)
        .single();

      if (profileError) {
        return {
          success: true,
          message: "Login successful, but could not load profile data.",
          redirectPath: undefined,
        };
      }

      revalidatePath("/");

      const redirectPath =
        profileData?.onboarding_status !== "COMPLETED" ? "/onboarding" : "/overview";

      return { success: true, message: "Login successful", redirectPath };
    }

    revalidatePath("/", "layout");

    return { success: true, message: "Login successful. Welcome back!", redirectPath: "/overview" };
  } catch (error) {
    return { success: false, message: `Unexpected error: ${error}`, redirectPath: undefined };
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
      message: `${error} An unexpected error occurred. Please try again later.`,
    };
  }
}

export async function saveProfileInfo(prevState: PrevState, formData: FormData) {
  const supabase = createClient();

  // Parse and validate form data
  const parseResult = onboardingSchema.safeParse({
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    financial_goal: formData.get("financial_goal") as string,
    monthly_income: Number(formData.get("monthly_income")),
    monthly_expenses: Number(formData.get("monthly_expenses")),
    debt_amount: Number(formData.get("debt_amount")),
    preferred_currency: formData.get("preferred_currency") as string,
  });

  if (!parseResult.success) {
    return {
      ...prevState,
      message: parseResult.error.flatten().fieldErrors,
      redirectPath: undefined,
    };
  }

  const data = parseResult.data;

  try {
    // Get user information from Supabase auth
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    // Update the profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        first_name: data.first_name,
        last_name: data.last_name,
      })
      .eq("id", user.id)
      .select();

    if (profileError) {
      return {
        success: false,
        message: "Failed to save profile information",
      };
    }

    // Update the onboarding table
    const { error: onboardingError } = await supabase
      .from("onboarding")
      .update({
        financial_goal: data.financial_goal,
        monthly_income: data.monthly_income,
        monthly_expenses: data.monthly_expenses,
        preferred_currency: data.preferred_currency,
        debt_amount: data.debt_amount,
        onboarding_status: "COMPLETED",
      })
      .eq("user_id", user.id)
      .select();

    if (onboardingError) {
      return {
        success: false,
        message: "Failed to save onboarding information",
      };
    }

    // Revalidate path after updating both tables
    revalidatePath("/");

    return {
      success: true,
      message: "Profile and onboarding information saved successfully",
      redirectPath: "/overview",
    };
  } catch (error) {
    return {
      success: false,
      message: `${error} An unexpected error occurred. Please try again later.`,
    };
  }
}
