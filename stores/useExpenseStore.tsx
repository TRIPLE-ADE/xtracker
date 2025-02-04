import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

import { createClient } from "@/utils/supabase/client";
import { Expense } from "@/types/expenses";

const supabase = createClient();

type ExpenseStore = {
  expenses: Expense[];
  fetchExpenses: () => Promise<void>;
  addExpense: (newExpense: Expense) => Promise<void>;
  deleteExpense: (expenseId: string) => Promise<void>;
  subscribeToRealTime: () => () => void;
};

export const useExpenseStore = create(
  persist<ExpenseStore>(
    (set, get) => ({
      expenses: [],

      // ✅ Fetch Expenses
      fetchExpenses: async () => {
        const { data, error } = await supabase
          .from("expenses")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error) set({ expenses: data });
      },

      // ✅ Optimistic Update (Add Expense)
      addExpense: async (newExpense) => {
        const tempId = Math.random().toString(36).substring(2, 9);
        const optimisticExpense = { ...newExpense, id: tempId, pending: true };

        set((state) => ({ expenses: [optimisticExpense, ...state.expenses] }));
        toast.success("Expense added (optimistic update)");

        const { data, error } = await supabase
          .from("expenses")
          .insert([newExpense])
          .select()
          .single();

        if (error) {
          set((state) => ({ expenses: state.expenses.filter((exp) => exp.id !== tempId) }));
          toast.error("Failed to add expense");
        } else {
          set((state) => ({
            expenses: state.expenses.map((exp) =>
              exp.id === tempId ? { ...data, pending: false } : exp,
            ),
          }));
        }
      },

      // ✅ Optimistic Update (Delete Expense)
      deleteExpense: async (expenseId) => {
        const previousExpenses = get().expenses;

        set((state) => ({ expenses: state.expenses.filter((exp) => exp.id !== expenseId) }));
        const { error } = await supabase.from("expenses").delete().match({ id: expenseId });

        if (error) {
          set({ expenses: previousExpenses });
          toast.error("Failed to delete expense");
        }
      },

      // ✅ Supabase Real-Time Sync
      subscribeToRealTime: () => {
        const channel = supabase
          .channel("realtime:expenses")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "expenses" },
            (payload) => {
              set((state) => {
                let updatedExpenses = [...state.expenses];

                if (payload.eventType === "INSERT") {
                  updatedExpenses = [payload.new as Expense, ...state.expenses];
                  toast.success("New expense received (real-time)");
                } else if (payload.eventType === "UPDATE") {
                  updatedExpenses = state.expenses.map((exp) =>
                    exp.id === payload.new.id ? (payload.new as Expense) : exp,
                  );
                } else if (payload.eventType === "DELETE") {
                  updatedExpenses = state.expenses.filter((exp) => exp.id !== payload.old.id);
                  toast.warning("Expense deleted (real-time)");
                }

                return { expenses: updatedExpenses };
              });
            },
          )
          .subscribe();

        return () => supabase.removeChannel(channel);
      },
    }),
    {
      name: "expense-store", // LocalStorage persistence
    },
  ),
);
