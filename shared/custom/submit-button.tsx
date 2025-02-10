"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui";

const SubmitButton = ({ text, className }: { text: string; className?: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button className={cn("w-full", className)} disabled={pending} type="submit">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : text}
    </Button>
  );
};

export default SubmitButton;
