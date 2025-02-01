"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import { Button } from "@/shared/ui/button";
import { onboardingSchema } from "@/schemas/onboardingSchema";
import SubmitButton from "@/shared/submitButton";

import { saveProfileInfo } from "../auth/actions";

const initialState = {
  success: false,
  message: "",
  redirectPath: undefined,
};

const Onboarding = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [state, formAction] = useFormState(saveProfileInfo, initialState);

  const fieldErrors = typeof state.message !== "string" ? state.message : {};

  useEffect(() => {
    // Load saved form data when component mounts or step changes
    const savedData = JSON.parse(sessionStorage.getItem("onboardingData") || "{}");

    Object.keys(savedData).forEach((key) => {
      const input = document.querySelector(`[name="${key}"]`);

      if (input && input instanceof HTMLInputElement) input.value = savedData[key];
    });
  }, [step]);

  const getFormData = () => {
    const formElement = document.querySelector("form");

    if (!formElement) throw new Error("Form element not found");
    const formData = new FormData(formElement);

    return Object.fromEntries(formData.entries());
  };

  const saveFormData = () => {
    const data = getFormData();
    const mergedData = { ...JSON.parse(sessionStorage.getItem("onboardingData") || "{}"), ...data };

    sessionStorage.setItem("onboardingData", JSON.stringify(mergedData));
  };

  const handleNextStep = () => {
    const data = getFormData();
    const result = onboardingSchema.safeParse({
      first_name: data.first_name,
      last_name: data.last_name,
    });

    if (result.success) {
      saveFormData();
      setStep((prev) => prev + 1);
    } else {
      toast.warning("Please fill in the required fields");
      // Please correct the highlighted fields before proceeding.
    }
  };

  const handleBackStep = () => {
    saveFormData();
    setStep((prev) => Math.max(1, prev - 1));
  };

  useEffect(() => {
    if (typeof state.message === "string" && state.message) {
      toast[state.success ? "success" : "error"](state.message);
    }

    if (state.success && state.redirectPath) {
      router.push(state.redirectPath);
      sessionStorage.removeItem("onboardingData");
    }
  }, [state.message, toast, state.success, router, state.redirectPath]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary">Welcome to Xtracker</h2>
          <p className="mt-2 text-gray-600">Let&apos;s personalize your experience</p>
        </div>
        <form action={formAction} className="space-y-6">
          <div className={`space-y-6 ${step === 1 ? "block" : "hidden"}`}>
            <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="first_name">
                  First Name
                </label>
                <input
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-primary focus:border-primary border-gray-300"
                  defaultValue={fieldErrors.first_name}
                  id="first_name"
                  name="first_name"
                  placeholder="Enter your first name"
                />
                {fieldErrors?.first_name && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.first_name.join(", ")}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="last_name">
                  Last Name
                </label>
                <input
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                  id="last_name"
                  name="last_name"
                  placeholder="Enter your last name"
                />
              </div>
              <Button className="w-full" type="button" onClick={handleNextStep}>
                Next
              </Button>
            </div>
          </div>
          <div className={`space-y-6 ${step === 2 ? "block" : "hidden"}`}>
            <h3 className="text-xl font-semibold text-gray-800">Financial Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="financial_goal">
                  Financial Goal
                </label>
                <select
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                  id="financial_goal"
                  name="financial_goal"
                >
                  <option disabled value="">
                    Select your primary financial goal
                  </option>
                  <option value="SAVE_MONEY">Save Money</option>
                  <option value="PAY_DEBT">Pay Off Debt</option>
                  <option value="INVEST">Start Investing</option>
                  <option value="BUDGET">Better Budgeting</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="monthly_income">
                  Monthly Income
                </label>
                <input
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                  id="monthly_income"
                  name="monthly_income"
                  placeholder="Enter your monthly income"
                  type="number"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="monthly_expenses"
                >
                  Monthly Expenses
                </label>
                <input
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                  id="monthly_expenses"
                  name="monthly_expenses"
                  placeholder="Enter your monthly expenses"
                  type="number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="debt_amount">
                  Debt Amount (if any)
                </label>
                <input
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                  id="debt_amount"
                  name="debt_amount"
                  placeholder="Enter your total debt"
                  type="number"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="preferred_currency"
                >
                  Preferred Currency
                </label>
                <select
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
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
              <div className="flex space-x-4">
                <Button className="w-1/2" type="button" variant="outline" onClick={handleBackStep}>
                  Back
                </Button>
                {/* Submit Button */}
                <SubmitButton className="w-1/2" text="Complete Setup" />
              </div>
            </div>
          </div>
        </form>
        <div className="mt-4 flex justify-center">
          <span className="text-sm text-gray-500">Step {step} of 2</span>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
