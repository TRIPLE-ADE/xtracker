import { create } from "zustand";

import { ProfileStore } from "@/types";

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  onboarding: null,
  user: null,

  // Set full profile data
  setProfile: (profile) => set({ profile }),

  // Update specific fields of the profile state
  updateProfile: (partialProfile) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...partialProfile } : null,
    })),

  // Set full onboarding data
  setOnboarding: (onboarding) => set({ onboarding }),

  // Update specific fields of the onboarding state
  updateOnboarding: (partialOnboarding) =>
    set((state) => ({
      onboarding: state.onboarding ? { ...state.onboarding, ...partialOnboarding } : null,
    })),

  // Set user session data
  setUser: (user) => set({ user }),
}));
