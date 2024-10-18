import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Invalid email address",
      })
      .min(1, "Email cannot be empty")
      .max(255, "Email must be at most 255 characters")
      .email("Please provide a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(100, "Password must be at most 100 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email address",
    })
    .min(1, "Email cannot be empty")
    .max(255, "Email must be at most 255 characters")
    .email("Please provide a valid email address"),
  password: z.string().min(8),
});
