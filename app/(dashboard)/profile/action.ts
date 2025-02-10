"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";

const ProfileSchema = z.object({
  first_name: z.string().min(1, "First name is required").max(20, "First name is too long"),
  last_name: z.string().min(1, "Last name is required").max(20, "Last name is too long"),
  // phone: z
  //   .string()
  //   .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
  //   .optional(),
  // financial_goal: z.enum(["SAVE_MONEY", "INVEST", "REDUCE_DEBT"], {
  //   required_error: "Please select a financial goal",
  // }),
  // monthly_income: z.coerce
  //   .number()
  //   .min(0, "Monthly income cannot be negative")
  //   .max(1000000000, "Monthly income value is too high"),
  // monthly_expenses: z.coerce
  //   .number()
  //   .min(0, "Monthly expenses cannot be negative")
  //   .max(1000000000, "Monthly expenses value is too high"),
  // debt_amount: z.coerce
  //   .number()
  //   .min(0, "Debt amount cannot be negative")
  //   .max(1000000000, "Debt amount value is too high"),
  // preferred_currency: z
  //   .string()
  //   .min(3, "Currency code must be 3 characters")
  //   .max(3, "Currency code must be 3 characters")
  //   .regex(/^[A-Z]{3}$/, "Must be a valid currency code (e.g., USD, EUR, GBP)"),
});

// Server action for updating profile
export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const data = Object.fromEntries(formData.entries());

  // Validate data with Zod
  const result = ProfileSchema.safeParse(data);

  if (!result.success) {
    const errorMessages = Object.entries(result.error.flatten().fieldErrors)
      .map(([_key, errors]) => `${errors.join(", ")}`)
      .join("; ");

    throw new Error(`Validation failed : ${errorMessages}`);
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("User not authenticated");

    // Update profile in the database
    const { error } = await supabase.from("profiles").update(result.data).eq("id", user.id);

    if (error) throw new Error(error.message);

    // Revalidate cache to update UI
    revalidatePath("/profile");

    return { success: "Profile updated successfully!" };
  } catch (error) {
    throw new Error(`Failed to update profile. Please try again.`);
  }
}

// Server action for updating preferences
export async function updatePreferences(formData: FormData) {
  const supabase = await createClient();
  const data = Object.fromEntries(formData.entries());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  // Update preferences in the database
  const { error } = await supabase.from("preferences").update(data).eq("user_id", user.id);

  if (error) {
    throw error;
  }

  // Revalidate cache to update UI
  revalidatePath("/profile");

  return { success: "Preferences updated successfully!" };
}
