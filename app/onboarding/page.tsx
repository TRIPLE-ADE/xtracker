"use client";

import React, { useState, useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";

import { Button } from "@/shared/ui/button";
import { onboardingSchema } from "@/schemas/onboardingSchema";
import { FormInput, SubmitButton } from "@/shared/custom";
import { AuthFormState } from "@/types";
import { useToastErrorMessage } from "@/hooks/useToastErrorMessage";

import { saveProfileInfo } from "../auth/actions";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [state, formAction] = useActionState<AuthFormState, FormData>(saveProfileInfo, {});

  useToastErrorMessage(state);

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
    }
  };

  const handleBackStep = () => {
    saveFormData();
    setStep((prev) => Math.max(1, prev - 1));
  };

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
              <FormInput
                required
                aria-describedby="first_name-error"
                defaultValue={state?.inputs?.first_name}
                error={state?.errors?.first_name?.join(", ")}
                label="First Name"
                name="first_name"
                placeholder="Enter your first name"
                type="text"
              />
              <FormInput
                required
                aria-describedby="last_name-error"
                defaultValue={state?.inputs?.last_name}
                error={state?.errors?.last_name?.join(", ")}
                label="Last Name"
                name="last_name"
                placeholder="Enter your last name"
                type="text"
              />
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
                  aria-describedby="financial_goal-error"
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                  defaultValue={state?.inputs?.financial_goal}
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
                {state?.errors?.financial_goal && (
                  <p className="text-sm text-red-600" id="financial_goal-error">
                    {state?.errors?.financial_goal?.join(", ")}
                  </p>
                )}
              </div>
              <FormInput
                required
                aria-describedby="monthly_income-error"
                defaultValue={state?.inputs?.monthly_income}
                error={state?.errors?.monthly_income?.join(", ")}
                label="Monthly Income"
                name="monthly_income"
                placeholder="Enter your monthly income"
                type="number"
              />
              <FormInput
                required
                aria-describedby="monthly_expenses-error"
                defaultValue={state?.inputs?.monthly_expenses}
                error={state?.errors?.monthly_expenses?.join(", ")}
                label="Monthly Expenses"
                name="monthly_expenses"
                placeholder="Enter your monthly expenses"
                type="number"
              />
              <FormInput
                required
                aria-describedby="debt_amount-error"
                defaultValue={state?.inputs?.debt_amount}
                error={state?.errors?.debt_amount?.join(", ")}
                label="Debt Amount (if any)"
                name="debt_amount"
                placeholder="Enter your total debt"
                type="number"
              />
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="preferred_currency"
                >
                  Preferred Currency
                </label>
                <select
                  aria-describedby="preferred_currency-error"
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                  defaultValue={state?.inputs?.preferred_currency}
                  id="preferred_currency"
                  name="preferred_currency"
                >
                  <option value="NGN">NGN (₦)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
                {state?.errors?.preferred_currency && (
                  <p className="text-sm text-red-600" id="preferred_currency-error">
                    {state?.errors?.preferred_currency?.join(", ")}
                  </p>
                )}
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
