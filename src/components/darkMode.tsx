"use client";

import { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

export default function Dark() {
  const [theme, setTheme] = useState<string>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  if (!mounted) return null; // ✅ avoid hydration issues

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-4 py-2 rounded-md bg-gray-200  hover:bg-gray-300 dark:hover:bg-gray-700 transition cursor-pointer"
    >
      {theme === "dark" ? <CiLight /> : <MdDarkMode />}
    </button>
  );
}
