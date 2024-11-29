import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import PrivatePage from "./private";

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  const { data: allOnboardingData } = await supabase.from("onboarding").select("*");

  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div>
      <pre>{JSON.stringify(allOnboardingData, null, 2)}</pre>
      <PrivatePage />
    </div>
  );
}
