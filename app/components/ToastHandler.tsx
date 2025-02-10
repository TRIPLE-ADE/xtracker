"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function ToastHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasShown = useRef(false);

  useEffect(() => {
    if (hasShown.current) return;

    const params = new URLSearchParams(searchParams.toString());
    let message = "";

    if (params.has("signup") && params.get("signup") === "success") {
      message =
        "Signup successful! Welcome aboard 🎉 Check your email to verify your account and get started.";
    } else if (params.has("login") && params.get("login") === "success") {
      message = "Login successful! Welcome back 👋";
    } else if (params.has("onboarding") && params.get("onboarding") === "error") {
      message = "Login Successful! Complete your onboarding to proceed 🚀";
    } else if (params.has("onboarding") && params.get("onboarding") === "success") {
      message = "Onboarding completed successfully! Enjoy your experience ✅";
    }

    if (message) {
      toast.success(message);
      hasShown.current = true;

      // Remove parameters after showing toast
      ["signup", "login", "onboarding"].forEach((param) => params.delete(param));
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, router]);

  return null;
}
