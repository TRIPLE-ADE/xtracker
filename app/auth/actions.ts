"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

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
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/private");
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
