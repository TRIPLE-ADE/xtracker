"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

type UseThemeProviderReturnType = {
  mounted: boolean;
  theme: string | undefined;
  toggleTheme: () => void;
};

const useThemeProvider = (): UseThemeProviderReturnType => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return { mounted, theme, toggleTheme };
};

export default useThemeProvider;
