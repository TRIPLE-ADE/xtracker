import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const createSupabaseClient = (request: NextRequest, response: NextResponse) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );
};

const handleRedirect = (url: URL, pathname: string) => {
  url.pathname = pathname;

  return NextResponse.redirect(url);
};

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });
  const supabase = createSupabaseClient(request, response);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const url = request.nextUrl.clone();

  const isAuthPage = url.pathname.startsWith("/auth");
  const isOnboardingPage = url.pathname.startsWith("/onboarding");
  const isPublicPage = url.pathname === "/";
  const isSignoutRoute = url.pathname.endsWith("/signout");

  // Redirect unauthenticated users away from protected routes
  if (!user) return isAuthPage || isPublicPage ? response : handleRedirect(url, "/auth/login");

  // Redirect users who haven't completed onboarding
  const { data, error } = await supabase
    .from("onboarding")
    .select("onboarding_status")
    .eq("user_id", user.id)
    .single();

  const isOnboardingCompleted = !error && data?.onboarding_status === "COMPLETED";

  if (!isOnboardingCompleted && !isOnboardingPage) return handleRedirect(url, "/onboarding");
  if (isOnboardingCompleted && isOnboardingPage) return handleRedirect(url, "/overview");
  if (isAuthPage && !isSignoutRoute) return handleRedirect(url, "/overview");

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return response;
}
