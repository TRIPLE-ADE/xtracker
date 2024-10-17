import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import PrivatePage from "./private";

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div>
      <PrivatePage user={data.user} />
    </div>
  );
}
