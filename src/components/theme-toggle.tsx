"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 dark:border-[#30363d] bg-gray-50 dark:bg-[#21262d] text-gray-600 dark:text-[#8b949e] hover:bg-gray-100 dark:hover:bg-[#30363d] hover:text-gray-900 dark:hover:text-white transition-colors"
      aria-label="Toggle Theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
    </button>
  );
}
