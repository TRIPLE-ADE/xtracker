import { User as SupabaseUser } from "@supabase/auth-js";

export default function PrivatePage({ user }: { user: SupabaseUser }) {
  return (
    <div>
      <h1>Private Page</h1>
      <p>Hello {user.email}</p>

      <form action="/auth/signout" method="post">
        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg" type="submit">
          Logout
        </button>
      </form>
    </div>
  );
}
