import { z } from "zod";

export const onboardingSchema = z.object({
  first_name: z.string().min(1, "First name is required").max(50, "First name is too long"),
  last_name: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
  financial_goal: z.enum(["SAVE_MONEY", "PAY_DEBT", "INVEST", "BUDGET", "OTHER"]).optional(),
  monthly_income: z
    .number()
    .positive("Monthly income must be a positive number")
    .max(1000000000, "Monthly income seems unrealistic")
    .optional(),
  monthly_expenses: z
    .number()
    .positive("Monthly expenses must be a positive number")
    .max(1000000000, "Monthly expenses seems unrealistic")
    .optional(),
  debt_amount: z
    .number()
    .nonnegative("Debt amount must be zero or a positive number")
    .max(1000000000, "Debt amount seems unrealistic")
    .optional(),
  preferred_currency: z.enum(["NGN", "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "INR"]).optional(),
});
