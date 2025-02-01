import React from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import Profile from "../components/ProfileForm";

const Page = async () => {
  const supabase = createClient();

  // Fetch authenticated user
  // 🔐 Get authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    return redirect("/login");
  }

  // 🔍 Fetch profile & onboarding data
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  const { data: onboarding } = await supabase
    .from("onboarding")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return <Profile initialOnboarding={onboarding} initialProfile={profile} />;
};

export default Page;
