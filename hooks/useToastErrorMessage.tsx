import { useEffect } from "react";
import { toast } from "sonner";

import { AuthFormState } from "@/types";

export function useToastErrorMessage(state: AuthFormState) {
  const { message } = state;

  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [state]);
}
