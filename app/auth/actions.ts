"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { signUpSchema, loginSchema } from "@/schemas/authSchema";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const parseResult = loginSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!parseResult.success) {
    console.log(parseResult.error);
    redirect("/error");

    return;
  }

  const data = parseResult.data;

  const { data: success, error } = await supabase.auth.signInWithPassword(data);

  if (success) {
    console.log("User logged in:", success);
  }
  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/private");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const parseResult = signUpSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  });

  if (!parseResult.success) {
    console.log(parseResult.error.flatten().fieldErrors);

    // return {
    //   message: parseResult.error.flatten().fieldErrors, // Flatten error details
    // };
    return;
  }

  const data = parseResult.data;

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    console.log(error);
    redirect("/error");
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
