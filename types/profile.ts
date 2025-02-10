import type { AuthUser } from "@supabase/supabase-js";

// Onboarding type
export type Onboarding = {
  onboarding_id: number;
  user_id: string;
  financial_goal: "SAVE_MONEY" | "INVEST" | "REDUCE_DEBT";
  monthly_income: number;
  monthly_expenses: number;
  debt_amount: number;
  preferred_currency: string;
  onboarding_status: "IN_PROGRESS" | "COMPLETED";
  completed_at: string;
};

// Profile type
export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
}

// Partial user data type
type PartialUser = Partial<AuthUser>;
export interface ProfileStore {
  profile: UserProfile | null;
  onboarding: Onboarding | null;
  user: PartialUser | null;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (partialProfile: Partial<UserProfile>) => void; // For partial updates
  setOnboarding: (onboarding: Onboarding) => void;
  updateOnboarding: (partialOnboarding: Partial<Onboarding>) => void; // For partial updates
  setUser: (user: PartialUser) => void;
}
