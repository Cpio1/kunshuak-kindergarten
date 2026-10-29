"use client";

import { useEffect, useRef, useState } from "react";

type RevealState = "static" | "hidden" | "shown";

/**
 * Плавное появление при прокрутке. Без JavaScript и до гидратации содержимое видно сразу
 * (состояние "static"), скрывается только то, что ещё ниже экрана.
 * Дочерние элементы с классом .reveal-item появляются по очереди (задержка через --reveal-i).
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RevealState>("static");

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    // Если блок уже на экране, анимация не нужна — не мигаем содержимым.
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;
    setState("hidden");
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, revealProps: { "data-reveal": state } };
}
