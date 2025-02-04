import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

// Define types for each entity
type Expense = {
  id: string;
  user_id: string;
  amount: number;
  description?: string;
  category_id?: string;
  date: string;
  is_recurring: boolean;
  created_at: string;
};

type Notification = {
  id: string;
  user_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

type Category = {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
};

type Goal = {
  id: string;
  user_id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  due_date?: string;
  created_at: string;
};

type RecurringExpense = {
  id: string;
  user_id: string;
  expense_id: string;
  frequency: string;
  next_due_date: string;
  created_at: string;
};

type Report = {
  id: string;
  user_id: string;
  title?: string;
  generated_at: string;
  data: Record<string, unknown>;
};

type Budget = {
  id: string;
  user_id: string;
  category_id?: string;
  name: string;
  amount: number;
  start_date: string;
  end_date: string;
  created_at: string;
};

// Define the Zustand store state and actions
type StoreState = {
  expenses: Expense[];
  notifications: Notification[];
  categories: Category[];
  goals: Goal[];
  recurringExpenses: RecurringExpense[];
  reports: Report[];
  budgets: Budget[];

  // Actions
  addExpense: (expense: Omit<Expense, "id" | "created_at">) => void;
  updateExpense: (id: string, updatedData: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;

  addNotification: (notification: Omit<Notification, "id" | "created_at">) => void;
  markNotificationAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;

  addCategory: (category: Omit<Category, "id" | "created_at">) => void;
  updateCategory: (id: string, updatedData: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  addGoal: (goal: Omit<Goal, "id" | "created_at">) => void;
  updateGoal: (id: string, updatedData: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  updateGoalAmount: (id: string, amountToAdd: number) => void;

  addRecurringExpense: (recurringExpense: Omit<RecurringExpense, "id" | "created_at">) => void;
  updateRecurringExpense: (id: string, updatedData: Partial<RecurringExpense>) => void;
  deleteRecurringExpense: (id: string) => void;

  addReport: (report: Omit<Report, "id" | "generated_at">) => void;
  deleteReport: (id: string) => void;

  addBudget: (budget: Omit<Budget, "id" | "created_at">) => void;
  updateBudget: (id: string, updatedData: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
};

// Mock Data
export const mockUserId = uuidv4();
const mockCategoryId1 = uuidv4();
const mockCategoryId2 = uuidv4();
const mockData = {
  expenses: [
    {
      id: uuidv4(),
      user_id: mockUserId,
      amount: 150.0,
      description: "Groceries",
      category_id: mockCategoryId1,
      date: "2024-11-01",
      is_recurring: false,
      created_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      user_id: mockUserId,
      amount: 50.0,
      description: "Gas",
      category_id: mockCategoryId2,
      date: "2024-11-02",
      is_recurring: true,
      created_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      user_id: mockUserId,
      amount: 200.0,
      description: "Gas",
      category_id: mockCategoryId2,
      date: "2024-12-02",
      is_recurring: true,
      created_at: new Date().toISOString(),
    },
  ],
  notifications: [
    {
      id: uuidv4(),
      user_id: mockUserId,
      message: "You have a new notification!",
      is_read: false,
      created_at: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      user_id: mockUserId,
      message: "You have another notification!",
      is_read: false,
      created_at: new Date().toISOString(),
    },
  ],
  categories: [
    {
      id: mockCategoryId1,
      user_id: mockUserId,
      name: "Food",
      created_at: new Date().toISOString(),
    },
    {
      id: mockCategoryId2,
      user_id: mockUserId,
      name: "Transport",
      created_at: new Date().toISOString(),
    },
  ],
  goals: [
    // {
    //   id: uuidv4(),
    //   user_id: mockUserId,
    //   title: "Vacation Fund",
    //   target_amount: 2000,
    //   current_amount: 500,
    //   due_date: "2024-12-31",
    //   created_at: new Date().toISOString(),
    // },
    // {
    //   id: uuidv4(),
    //   user_id: mockUserId,
    //   title: "Wedding Fund",
    //   target_amount: 3000,
    //   current_amount: 2800,
    //   due_date: "2024-12-31",
    //   created_at: new Date().toISOString(),
    // },
  ],
  recurringExpenses: [
    {
      id: uuidv4(),
      user_id: mockUserId,
      expense_id: uuidv4(),
      frequency: "Monthly",
      next_due_date: "2024-12-01",
      created_at: new Date().toISOString(),
    },
  ],
  reports: [
    {
      id: uuidv4(),
      user_id: mockUserId,
      title: "October Summary",
      generated_at: new Date().toISOString(),
      data: { totalSpent: 200, categories: { Food: 150, Transport: 50 } },
    },
  ],
  budgets: [
    // {
    //   id: uuidv4(),
    //   user_id: mockUserId,
    //   name: "Monthly Groceries",
    //   category_id: mockCategoryId2,
    //   amount: 500,
    //   start_date: "2024-11-01",
    //   end_date: "2024-11-30",
    //   created_at: new Date().toISOString(),
    // },
    // {
    //   id: uuidv4(),
    //   user_id: mockUserId,
    //   name: "Monthly Transportation",
    //   category_id: mockCategoryId1,
    //   amount: 500,
    //   start_date: "2024-11-01",
    //   end_date: "2024-11-30",
    //   created_at: new Date().toISOString(),
    // },
    // {
    //   id: uuidv4(),
    //   user_id: mockUserId,
    //   name: "Overall Budget",
    //   amount: 500,
    //   start_date: "2024-11-01",
    //   end_date: "2024-11-30",
    //   created_at: new Date().toISOString(),
    // },
  ],
};

// Create the store
const useExpenseStore = create<StoreState>((set) => ({
  expenses: mockData.expenses,
  notifications: mockData.notifications,
  categories: mockData.categories,
  goals: mockData.goals,
  recurringExpenses: mockData.recurringExpenses,
  reports: mockData.reports,
  budgets: mockData.budgets,

  // Expense Actions
  addExpense: (expense) =>
    set((state) => ({
      expenses: [
        ...state.expenses,
        { ...expense, id: uuidv4(), created_at: new Date().toISOString() },
      ],
    })),
  updateExpense: (id, updatedData) =>
    set((state) => ({
      expenses: state.expenses.map((expense) =>
        expense.id === id
          ? { ...expense, ...updatedData, updated_at: new Date().toISOString() }
          : expense,
      ),
    })),
  deleteExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== id),
    })),

  // Notification Actions
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: uuidv4(), created_at: new Date().toISOString() },
      ],
    })),
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id ? { ...notification, is_read: true } : notification,
      ),
    })),
  deleteNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
    })),

  // Category Actions
  addCategory: (category) =>
    set((state) => ({
      categories: [
        ...state.categories,
        { ...category, id: uuidv4(), created_at: new Date().toISOString() },
      ],
    })),
  updateCategory: (id, updatedData) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === id
          ? { ...category, ...updatedData, updated_at: new Date().toISOString() }
          : category,
      ),
    })),
  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),

  // Goal Actions
  addGoal: (goal) =>
    set((state) => ({
      goals: [...state.goals, { ...goal, id: uuidv4(), created_at: new Date().toISOString() }],
    })),
  updateGoal: (id, updatedData) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === id ? { ...goal, ...updatedData, updated_at: new Date().toISOString() } : goal,
      ),
    })),
  updateGoalAmount: (id, amountToAdd) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === id ? { ...goal, current_amount: goal.current_amount + amountToAdd } : goal,
      ),
    })),
  deleteGoal: (id) =>
    set((state) => ({
      goals: state.goals.filter((goal) => goal.id !== id),
    })),

  // Recurring Expense Actions
  addRecurringExpense: (recurringExpense) =>
    set((state) => ({
      recurringExpenses: [
        ...state.recurringExpenses,
        { ...recurringExpense, id: uuidv4(), created_at: new Date().toISOString() },
      ],
    })),
  updateRecurringExpense: (id, updatedData) =>
    set((state) => ({
      recurringExpenses: state.recurringExpenses.map((recurringExpense) =>
        recurringExpense.id === id
          ? { ...recurringExpense, ...updatedData, updated_at: new Date().toISOString() }
          : recurringExpense,
      ),
    })),
  deleteRecurringExpense: (id) =>
    set((state) => ({
      recurringExpenses: state.recurringExpenses.filter(
        (recurringExpense) => recurringExpense.id !== id,
      ),
    })),

  // Report Actions
  addReport: (report) =>
    set((state) => ({
      reports: [
        ...state.reports,
        { ...report, id: uuidv4(), generated_at: new Date().toISOString() },
      ],
    })),
  deleteReport: (id) =>
    set((state) => ({
      reports: state.reports.filter((report) => report.id !== id),
    })),

  // Budget Actions
  addBudget: (budget) =>
    set((state) => ({
      budgets: [
        ...state.budgets,
        { ...budget, id: uuidv4(), created_at: new Date().toISOString() },
      ],
    })),
  updateBudget: (id, updatedData) =>
    set((state) => ({
      budgets: state.budgets.map((budget) =>
        budget.id === id
          ? { ...budget, ...updatedData, updated_at: new Date().toISOString() }
          : budget,
      ),
    })),
  deleteBudget: (id) =>
    set((state) => ({
      budgets: state.budgets.filter((budget) => budget.id !== id),
    })),
}));

export default useExpenseStore;
