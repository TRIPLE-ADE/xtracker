import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import Dashboard from "../components/Dashboard";

export const revalidate = 36000;
export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const { data: allOnboardingData } = await supabase.from("onboarding").select("*");

  if (error || !user) {
    redirect("/auth/login");
  }

  return (
    <div>
      <pre>{JSON.stringify(allOnboardingData, null, 2)}</pre>
      <Dashboard />
    </div>
  );
}
