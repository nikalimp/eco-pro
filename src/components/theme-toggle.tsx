"use client";
import { Moon, Sun } from "lucide-react";

// Переключатель тёмной и светлой темы (просьба клиента 28.10). По умолчанию — тёмная, выбор хранится в localStorage
// (скрипт в layout ставит data-theme до отрисовки, без мигания).
export function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const d = document.documentElement;
    const next = d.dataset.theme === "light" ? "dark" : "light";
    d.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };
  return (
    <button type="button" onClick={toggle} aria-label="Переключить светлую и тёмную тему" title="Светлая / тёмная тема" className={`inline-flex size-16 shrink-0 items-center justify-center border-l transition-colors hover:bg-card ${className}`}>
      <Sun className="hidden size-5 dark:block" aria-hidden="true" />
      <Moon className="size-5 dark:hidden" aria-hidden="true" />
    </button>
  );
}
