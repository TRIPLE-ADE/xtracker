import React, { useState } from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
// import { Progress } from "@/components/ui/progress";

const FinancialGoals = () => {
  const [goals, setGoals] = useState<
    { id: number; name: string; targetAmount: string; currentAmount: string }[]
  >([]);
  const [newGoal, setNewGoal] = useState({ name: "", targetAmount: "", currentAmount: "" });

  const addGoal = () => {
    if (newGoal.name && newGoal.targetAmount && newGoal.currentAmount) {
      setGoals([...goals, { ...newGoal, id: Date.now() }]);
      setNewGoal({ name: "", targetAmount: "", currentAmount: "" });
    }
  };

  // const calculateProgress = (current: number, target: number): number => {
  //     return Math.min(100, (current / target) * 100);
  // };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Financial Goals</h2>
      <div className="flex space-x-2 mb-4">
        <Input
          placeholder="Goal name"
          type="text"
          value={newGoal.name}
          onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
        />
        <Input
          placeholder="Target amount"
          type="number"
          value={newGoal.targetAmount}
          onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
        />
        <Input
          placeholder="Current amount"
          type="number"
          value={newGoal.currentAmount}
          onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
        />
        <Button onClick={addGoal}>Add Goal</Button>
      </div>
      <ul className="space-y-4">
        {goals.map((goal) => (
          <li key={goal.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{goal.name}</span>
              <span>
                ${goal.currentAmount} / ${goal.targetAmount}
              </span>
            </div>
            {/* <Progress value={calculateProgress(goal.currentAmount, goal.targetAmount)} className="w-full" /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialGoals;
