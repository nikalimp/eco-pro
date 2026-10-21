"use client";
import { Moon, Sun } from "lucide-react";

// Переключатель темы. Выбор хранится в localStorage; без выбора — системная тема (см. скрипт в layout).
export function ThemeToggle() {
  const toggle = () => {
    const d = document.documentElement;
    const next = d.dataset.theme === "dark" ? "light" : "dark";
    d.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };
  return (
    <button type="button" onClick={toggle} aria-label="Переключить светлую и тёмную тему" className="inline-flex size-10 items-center justify-center rounded-full text-foreground hover:bg-card">
      <Sun className="hidden size-5 dark:block" />
      <Moon className="size-5 dark:hidden" />
    </button>
  );
}
