"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import type { Locale } from "@/lib/site-data";
import { defaultLocale, translations, type Dictionary } from "@/lib/translations";

const STORAGE_KEY = "kunshuak-locale";
const listeners = new Set<() => void>();
// Запасное значение, если localStorage недоступен (например, приватный режим).
let sessionLocale: Locale | null = null;

function isLocale(value: unknown): value is Locale {
  return value === "kk" || value === "ru";
}

function readLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // игнорируем — используем значение текущей сессии
  }
  return sessionLocale ?? defaultLocale;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

type LanguageContextValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // На сервере и при гидратации всегда казахский, затем подхватывается сохранённый выбор —
  // так разметка сервера и клиента совпадает.
  const locale = useSyncExternalStore(subscribe, readLocale, () => defaultLocale);

  const setLocale = useCallback((next: Locale) => {
    sessionLocale = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // игнорируем — выбор сохранится до перезагрузки страницы
    }
    listeners.forEach((listener) => listener());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
