"use client";
import { toast } from "sonner";

import { Onboarding, UserProfile } from "@/types";
import { Button, Input, Card } from "@/shared/ui"; // Using shadcn/ui
import {
  updateProfile,
  updatePreferences,
  //   changePassword,
  //   deleteAccount,
} from "@/app/(dashboard)/profile/action";
import { SubmitButton } from "@/shared/custom";

interface ProfileProps {
  initialProfile: UserProfile;
  initialOnboarding: Onboarding;
}

export default function Profile({ initialProfile, initialOnboarding }: ProfileProps) {
  const handleProfileSubmit = async (formData: FormData) => {
    // Wrap the submission in a promise to show the toast
    toast.promise(updateProfile(formData), {
      loading: "Saving Profile changes...",
      success: "Profile updated successfully!",
      error: (error) => error.message || "Failed to update profile. Please try again.",
    });
  };

  const handlePreferencesSubmit = async (formData: FormData) => {
    // Wrap the submission in a promise to show the toast
    toast.promise(updatePreferences(formData), {
      loading: "Saving Preferences...",
      success: "Preferences updated successfully!",
      error: (error) => error.message || "Failed to update preferences. Please try again.",
    });
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      {/* Profile Information */}
      <Card className="p-6 space-y-4">
        <form action={handleProfileSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold">User Information</h2>
          <div className="space-y-2">
            <label htmlFor="first_name">First Name</label>
            <Input
              required
              defaultValue={initialProfile?.first_name}
              id="first_name"
              name="first_name"
              type="text"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="last_name">Last Name</label>
            <Input
              required
              defaultValue={initialProfile?.last_name}
              id="last_name"
              name="last_name"
              type="text"
            />
          </div>
          {/* <Input disabled defaultValue={profile?.email} label="Email" name="email" type="email" /> */}
          {/* <Input required defaultValue={profile?.phone} label="Phone" name="phone" type="tel" /> */}

          <SubmitButton className="" text="Save Changes" />
        </form>
      </Card>

      {/* Financial Preferences */}
      <Card className="p-6 space-y-4">
        <form action={handlePreferencesSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold">Financial Preferences</h2>
          <select
            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-black focus:border-ring-b border-gray-300"
            defaultValue={initialOnboarding?.financial_goal}
            id="financial_goal"
            name="financial_goal"
          >
            <option value="SAVE_MONEY">Save Money</option>
            <option value="PAY_DEBT">Pay Off Debt</option>
            <option value="INVEST">Start Investing</option>
            <option value="BUDGET">Better Budgeting</option>
          </select>

          <div className="space-y-2">
            <label htmlFor="monthly_income">Monthly Income</label>
            <Input
              required
              defaultValue={initialOnboarding?.monthly_income}
              id="monthly_income"
              name="monthly_income"
              type="number"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="monthly_expenses">Monthly Expenses</label>
            <Input
              required
              defaultValue={initialOnboarding?.monthly_expenses}
              id="monthly_expenses"
              name="monthly_expenses"
              type="number"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="debt_amount">Debt Amount</label>
            <Input
              required
              defaultValue={initialOnboarding?.debt_amount}
              id="debt_amount"
              name="debt_amount"
              type="number"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="preferred_currency">Preferred Currency</label>
            <select
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
              defaultValue={initialOnboarding?.preferred_currency}
              id="preferred_currency"
              name="preferred_currency"
            >
              <option value="NGN">NGN (₦)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>
          <SubmitButton text="Save Changes" />
        </form>
      </Card>

      {/* Security Settings */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Security Settings</h2>
        <div className="space-y-2">
          <label htmlFor="current-password">Current Password</label>
          <Input id="current-password" type="password" />
        </div>
        <div className="space-y-2">
          <label htmlFor="new-password">New Password</label>
          <Input id="new-password" type="password" />
        </div>
        <div className="space-y-2">
          <label htmlFor="confirm-password">Confirm New Password</label>
          <Input id="confirm-password" type="password" />
        </div>
        <Button className="w-full">Change Password</Button>
      </Card>

      {/* Account Management */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Account Management</h2>
        <p>
          Onboarding Status: <strong>{initialOnboarding?.onboarding_status}</strong>
        </p>
        <p>
          Completion Date:{" "}
          <strong>
            {initialOnboarding?.completed_at
              ? new Date(initialOnboarding.completed_at).toLocaleDateString()
              : "Not completed"}
          </strong>
        </p>
        <Button className="w-full bg-red-600 text-white">Close Account</Button>
      </Card>
    </div>
  );
}
