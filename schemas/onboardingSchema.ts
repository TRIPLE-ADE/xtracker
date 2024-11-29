import { z } from "zod";

export const onboardingSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  financial_goal: z.enum(["SAVE_MONEY", "PAY_DEBT", "INVEST", "BUDGET"]).optional(),
  monthly_income: z.number().positive("Monthly income must be a positive number").optional(),
  monthly_expenses: z.number().positive("Monthly expenses must be a positive number").optional(),
  debt_amount: z.number().nonnegative("Debt amount must be zero or a positive number").optional(),
  preferred_currency: z.enum(["NGN", "USD", "EUR", "GBP", "JPY"]).optional(),
});
