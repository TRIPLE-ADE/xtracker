import { User as SupabaseUser } from "@supabase/auth-js";

import SubmitButton from "@/shared/submitButton";

export default function PrivatePage({ user }: { user: SupabaseUser }) {
  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <h1>Private Page</h1>
      <p>Hello {user.email}</p>

      <form action="/auth/signout" method="post">
        <SubmitButton className="w-fit" text="Sign Out" />
      </form>
    </div>
  );
}
