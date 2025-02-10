"use client";

import { Input } from "@/shared/ui/input";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormInput({ label, error, className, ...props }: FormInputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700" htmlFor={props.id || props.name}>
        {label}
      </label>
      <Input
        className={cn(
          "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className,
        )}
        {...props}
        id={props.id || props.name}
      />
      {error && (
        <p className="text-sm text-red-600" id={props["aria-describedby"]}>
          {error}
        </p>
      )}
    </div>
  );
}
