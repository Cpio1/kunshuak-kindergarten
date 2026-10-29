"use client";

import type { Locale } from "@/lib/site-data";
import { useLanguage } from "./language-provider";

const options: { value: Locale; label: string }[] = [
  { value: "kk", label: "ҚАЗ" },
  { value: "ru", label: "РУС" },
];

export function LangSwitch({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.header.langLabel}
      className={`inline-flex shrink-0 rounded-full border border-line bg-white p-0.5 ${className}`}
    >
      {options.map((option) => {
        const active = option.value === locale;
        return (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-pressed={active}
            onClick={() => setLocale(option.value)}
            className={`min-h-9 min-w-11 rounded-full px-2.5 text-[13px] font-bold transition-colors ${
              active ? "bg-sun text-ink shadow-sm" : "text-ink-soft hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
