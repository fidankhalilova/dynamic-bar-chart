"use client";
import { useEffect, useState } from "react";

const KEY = "theme";

export function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    setDark(saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);

  const toggle = () => {
    localStorage.setItem(KEY, dark ? "light" : "dark");
    setDark(!dark);
  };

  return [dark, toggle] as const;
}