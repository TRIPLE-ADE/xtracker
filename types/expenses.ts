export type ExpenseStatus = "submitted" | "not_submitted";

// export interface Expense {
//   id: string;
//   date: string;
//   category: string;
//   description: string;
//   merchant: string;
//   amount: number;
//   report: string;
//   status: ExpenseStatus;
//   icon?: string;
// }

export interface Expense {
  id: string;
  user_id: string;
  amount: number;
  description?: string;
  category_id?: string;
  date: string;
  is_recurring: boolean;
  created_at: string;
}

export interface ExpenseFilters {
  status?: ExpenseStatus;
  report?: string;
  startDate?: Date;
  endDate?: Date;
}
