import React, { useState } from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
// import { Progress } from "@/components/ui/progress";

interface SavingsGoalProps {
  totalExpenses: number;
}

const SavingsGoal: React.FC<SavingsGoalProps> = ({ totalExpenses }) => {
  const [goal, setGoal] = useState("");
  const [currentGoal, setCurrentGoal] = useState<number | null>(null);

  const handleSetGoal = () => {
    if (goal && !isNaN(Number(goal))) {
      setCurrentGoal(parseFloat(goal));
      setGoal("");
    }
  };

  const calculateProgress = () => {
    if (currentGoal) {
      const savings = currentGoal - totalExpenses;

      return Math.max(0, Math.min(100, (savings / currentGoal) * 100));
    }

    return 0;
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">Savings Goal</h2>
      {currentGoal ? (
        <div>
          <p>Current Goal: ${currentGoal.toFixed(2)}</p>
          {/* <Progress value={calculateProgress()} className="mt-2" /> */}
          <p className="mt-2">Progress: {calculateProgress().toFixed(2)}%</p>
        </div>
      ) : (
        <div className="flex space-x-2">
          <Input
            className="w-full"
            placeholder="Enter savings goal"
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <Button onClick={handleSetGoal}>Set Goal</Button>
        </div>
      )}
    </div>
  );
};

export default SavingsGoal;
