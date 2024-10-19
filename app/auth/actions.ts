"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { signUpSchema, loginSchema } from "@/schemas/authSchema";

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
      message: parseResult.error.flatten().fieldErrors, // Flatten error details
    };
  }

  const data = parseResult.data;

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);

    return {
      success: false,
      message: "Login failed. Please check your credentials and try again.",
    };
  }

  revalidatePath("/", "layout");

  return {
    success: true,
    message: "Login successful. Welcome back!",
  };
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
      message: parseResult.error.flatten().fieldErrors, // Flatten error details
    };
  }

  const data = parseResult.data;

  const { data: success, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    console.log(error);

    return {
      success: false,
      message: "Signup failed. Please try again later.",
    };
  }

  if (success) {
    console.log("User signed up:", success);

    return {
      success: true,
      message: "Signup successful. Please check your email to verify your account.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/login");
}

// export async function signOut() {
//   const supabase = createClient()
//   const { error } = await supabase.auth.signOut()

//   if (error) {
//     console.log(error)
//     return { success: false, message: 'Failed to sign out. Please try again.' };
//     // redirect('/error')
//   }

//   revalidatePath('/', 'layout')
//   // redirect('/login')
//   return { success: true, message: 'Successfully signed out.' };
// }
