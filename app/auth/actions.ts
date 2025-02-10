"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "@supabase/auth-js";

import { createClient } from "@/utils/supabase/server";
import { signUpSchema, loginSchema, onboardingSchema } from "@/schemas";
import { handleError } from "@/utils/authErrorHandlers";
import { AuthFormState } from "@/types";

export async function login(_prevState: AuthFormState, formData: FormData) {
  const supabase = await createClient();

  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parseResult = loginSchema.safeParse(rawData);

  if (!parseResult.success) {
    return {
      inputs: rawData,
      errors: parseResult.error.flatten().fieldErrors,
    };
  }

  const data = parseResult.data;
  let redirectPath = "/overview?login=success";

  try {
    const { data: loginData, error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      return {
        inputs: rawData,
        ...handleError(
          error as AuthError,
          "Login failed. Please check your credentials and try again.",
        ),
      };
    }

    if (loginData?.user) {
      const { data: profileData, error: profileError } = await supabase
        .from("onboarding")
        .select("onboarding_status")
        .eq("user_id", loginData.user.id)
        .single();

      if (profileError || profileData?.onboarding_status !== "COMPLETED") {
        redirectPath = "/onboarding?onboarding=error";
      }
    }
  } catch (error) {
    return { message: `Unexpected error: ${error}` };
  }
  revalidatePath("/", "layout");
  redirect(redirectPath);
}

export async function signup(_prevState: AuthFormState, formData: FormData) {
  const supabase = await createClient();

  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const parseResult = signUpSchema.safeParse(rawData);

    if (!parseResult.success) {
      return {
        inputs: rawData,
        errors: parseResult.error.flatten().fieldErrors,
      };
    }

    const data = parseResult.data;

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return {
        inputs: rawData,
        ...handleError(error as AuthError, "Signup failed. Please try again later."),
      };
    }
  } catch (error) {
    return {
      message: `${error} An unexpected error occurred. Please try again later.`,
    };
  }
  revalidatePath("/", "layout");
  redirect("/login?signup=success");
}

export async function saveProfileInfo(_prevState: AuthFormState, formData: FormData) {
  const supabase = await createClient();

  try {
    const rawData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      financial_goal: formData.get("financial_goal") as string,
      monthly_income: Number(formData.get("monthly_income")),
      monthly_expenses: Number(formData.get("monthly_expenses")),
      debt_amount: Number(formData.get("debt_amount")),
      preferred_currency: formData.get("preferred_currency") as string,
    };
    // Parse and validate form data
    const parseResult = onboardingSchema.safeParse(rawData);

    if (!parseResult.success) {
      return {
        inputs: rawData,
        errors: parseResult.error.flatten().fieldErrors,
      };
    }

    const data = parseResult.data;

    // Get user information from Supabase auth
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
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
        input: rawData,
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
        input: rawData,
        message: "Failed to save onboarding information",
      };
    }
  } catch (error) {
    return {
      message: `${error} An unexpected error occurred. Please try again later.`,
    };
  }
  // Revalidate path after updating both tables
  revalidatePath("/");
  redirect("/overview?onboarding=success");
}
