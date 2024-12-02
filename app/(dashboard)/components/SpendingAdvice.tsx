import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
// import { getAIAdvice } from '../utils/azureAI';

const SpendingAdvice = ({ expenses, totalExpenses }) => {
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    const fetchAdvice = async () => {
      if (expenses.length > 0) {
        // const aiAdvice = await getAIAdvice(expenses, totalExpenses);
        // setAdvice(aiAdvice);
      } else {
        setAdvice("Start tracking your expenses to get personalized advice.");
      }
    };

    fetchAdvice();
  }, [expenses, totalExpenses]);

  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>AI Spending Advice</AlertTitle>
      <AlertDescription>{advice}</AlertDescription>
    </Alert>
  );
};

export default SpendingAdvice;
