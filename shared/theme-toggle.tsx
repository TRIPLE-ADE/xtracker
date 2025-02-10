"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import useThemeProvider from "@/hooks/useThemeProvider";

export function ThemeToggle() {
  const { toggleTheme, mounted } = useThemeProvider();

  if (!mounted) {
    return <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg" />; // Loader (Skeleton UI)
  }

  return (
    <button
      className="relative p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
      onClick={toggleTheme}
    >
      <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-all dark:hidden" />
      <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-all hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
