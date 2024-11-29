import React, { useState } from "react";
import { PlusCircle, Receipt, Plane, Settings } from "lucide-react";

import { Card } from "@/shared/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/shared/ui/button";

// import { Badge } from "@/components/ui/badge";

const ExpenseTracker = () => {
  const [expenses] = useState<{ id: number; description: string; amount: number }[]>([]);
  const totalBalance = 4800.0;
  const income = 2500.0;
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const pendingTasks = [
    { label: "Pending Approvals", count: 5 },
    { label: "New Trips Registered", count: 1 },
    { label: "Unreported Expenses", count: 4 },
    { label: "Upcoming Expenses", count: 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Avatar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar> */}
            <div>
              <p className="text-gray-400">Welcome!</p>
              <h2 className="text-xl font-bold">John Doe</h2>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl mb-8">
          <h3 className="text-gray-200 mb-2">Total Balance</h3>
          <div className="text-4xl font-bold mb-4">${totalBalance.toFixed(2)}</div>
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-200">Income</p>
              <p className="font-semibold">${income.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-200">Expenses</p>
              <p className="font-semibold">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <PlusCircle />, label: "New expense", color: "bg-purple-600" },
            { icon: <Receipt />, label: "Add receipt", color: "bg-blue-600" },
            { icon: <Settings />, label: "Create report", color: "bg-teal-600" },
            { icon: <Plane />, label: "Create trip", color: "bg-pink-600" },
          ].map((action, index) => (
            <Button
              key={index}
              className={`${action.color} h-24 flex flex-col items-center justify-center gap-2 rounded-xl`}
              variant="ghost"
            >
              {action.icon}
              <span className="text-sm">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Pending Tasks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Pending Tasks</h3>
            <div className="space-y-4">
              {pendingTasks.map((task, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-400">{task.label}</span>
                  {/* <Badge variant="secondary">{task.count}</Badge> */}
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            {/* <ExpenseList expenses={expenses} totalExpenses={totalExpenses} /> */}
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Spending Trend</h3>
            {/* <ExpenseChart expenses={expenses} /> */}
          </Card>

          <Card className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
            {/* <ExpenseChart expenses={expenses} /> */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
