import { AuthError } from "@supabase/auth-js";

export const handleError = (error: AuthError, defaultMessage: string) => {
  if (error.status === 0) {
    return {
      success: false,
      message: "Network error. Please check your internet connection.",
    };
  }

  if (error.status === 400 && error.code === "email_not_confirmed") {
    return {
      success: false,
      message:
        "Your email has not been confirmed. Please check your inbox for the confirmation email.",
    };
  }

  return {
    success: false,
    message: defaultMessage,
  };
};
