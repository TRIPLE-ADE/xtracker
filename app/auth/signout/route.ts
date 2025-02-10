import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase.auth.signOut();
    }

    revalidatePath("/", "layout");

    return NextResponse.redirect(new URL("/auth/login", req.url), {
      status: 302,
    });
  } catch (error) {
    return NextResponse.json({ error: `Failed to sign out` }, { status: 500 });
  }
}
