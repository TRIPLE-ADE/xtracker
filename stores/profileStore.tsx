import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ProfileStore } from "@/types";

const initialState = {
  user: null,
  profile: null,
  onboarding: null,
};

export const useProfileStore = create(
  persist<ProfileStore>(
    (set) => ({
      ...initialState,

      setUser: (user) => set({ user }),
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
    }),
    {
      name: "profile-storage",
    },
  ),
);
