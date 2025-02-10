// import { redirect } from "next/navigation";

// import { createClient } from "@/utils/supabase/server";

// import PrivatePage from "./private";

// export default async function Page() {
//   const supabase = createClient();

//   const { data, error } = await supabase.auth.getUser();
//   const { data: allOnboardingData } = await supabase.from("onboarding").select("*");

//   if (error || !data?.user) {
//     redirect("/auth/login");
//   }

//   return (
//     <div>
//       <pre>{JSON.stringify(allOnboardingData, null, 2)}</pre>
//       <PrivatePage />
//     </div>
//   );
// }

"use client";

interface BudgetOverviewProps {
  totalExpenses: number;
  budget: number;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ totalExpenses, budget }) => {
  const calculateProgress = () => (totalExpenses / budget) * 100;

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">Budget Overview</h2>
      <div className="flex justify-between items-center">
        <p>Total Expenses: ${totalExpenses}</p>
        <p>Budget: ${budget}</p>
      </div>
      <div className="mt-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-blue-500 rounded-full"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
        <p className="mt-2 text-gray-600">{calculateProgress().toFixed(2)}% of your budget used</p>
      </div>
    </div>
  );
};

interface SavingsGoalProps {
  goal: number;
  totalExpenses: number;
}

const SavingsGoal: React.FC<SavingsGoalProps> = ({ goal, totalExpenses }) => {
  const calculateProgress = () => ((totalExpenses / goal) * 100).toFixed(2);

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">Savings Goal</h2>
      <div>
        <p>Goal: ${goal}</p>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-green-500 rounded-full"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
        <p className="mt-2 text-gray-600">{calculateProgress()}% of your savings goal achieved</p>
      </div>
    </div>
  );
};

const Notifications: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">Notifications</h2>
      <div className="text-sm text-gray-600">
        <p>⚠️ You’ve spent 80% of your Food budget!</p>
        <p>💡 Consider reviewing your subscription payments this month.</p>
      </div>
    </div>
  );
};

const SpendingTrends: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">Spending Trends</h2>
      <div className="h-64 bg-gray-100 rounded-md flex justify-center items-center">
        {/* Placeholder for chart component */}
        <p className="text-gray-600">Chart will go here (e.g., Line chart of expenses over time)</p>
      </div>
    </div>
  );
};

const RecentTransactions: React.FC = () => {
  const transactions = [
    { id: 1, category: "Food", amount: 50, date: "2024-11-01" },
    { id: 2, category: "Entertainment", amount: 30, date: "2024-11-02" },
    { id: 3, category: "Transport", amount: 100, date: "2024-11-03" },
  ];

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between">
            <span>{transaction.category}</span>
            <span>${transaction.amount}</span>
            <span>{transaction.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

import React, { useState, useEffect } from "react";

import { Button } from "@/shared/ui/button"; // Example of button import
import { SubmitButton } from "@/shared/custom";

const Dashboard: React.FC = () => {
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [budget, setBudget] = useState<number>(0);
  const [savingsGoal, setSavingsGoal] = useState<number>(0);

  useEffect(() => {
    // Fetch data from your database or API
    // For now, I'm using dummy data.
    setTotalExpenses(1200);
    setBudget(2000);
    setSavingsGoal(500);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <form action="/auth/signout" method="post">
        <SubmitButton className="w-fit" text="Sign Out" />
      </form>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <BudgetOverview budget={budget} totalExpenses={totalExpenses} />
      <SavingsGoal goal={savingsGoal} totalExpenses={totalExpenses} />
      <Notifications />
      <SpendingTrends />
      <RecentTransactions />
      <Button onClick={() => alert("Quick Add Expense Clicked!")}>Add Expense</Button>
    </div>
  );
};

export default Dashboard;
