"use client";

import type { CSSProperties, ReactNode } from "react";
import { useLanguage } from "./language-provider";

/**
 * Декоративная тарелка блока «Питание»: цифра в центре, пунктирная окружность и иконки продуктов.
 * Размер задаёт className (ширина); всё внутри масштабируется от ширины контейнера (единицы cqw).
 * Текст на тарелке повторяет заголовок блока, поэтому вся композиция скрыта от экранных дикторов.
 */
export function MealsPlate({ className = "" }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <div aria-hidden="true" className={`@container pointer-events-none relative aspect-square select-none ${className}`}>
      <svg viewBox="0 0 100 100" className="meal-orbit absolute inset-0 size-full" focusable="false">
        <circle cx="50" cy="50" r="48" fill="none" stroke="var(--color-leaf-deep)" strokeOpacity="0.45" strokeWidth="0.6" strokeDasharray="2.2 2.4" strokeLinecap="round" />
      </svg>

      {/* Солнечный бортик и молочная тарелка */}
      <div className="absolute inset-[15%] rounded-full bg-sun shadow-[0_18px_36px_-18px_rgb(74_56_12/0.55)]" />
      <div className="absolute inset-[18.5%] rounded-full bg-milk" />
      <div className="absolute inset-[24%] rounded-full border border-sun-soft bg-milk shadow-[inset_0_2px_10px_rgb(224_155_0/0.12)]" />

      <div className="absolute inset-[24%] flex flex-col items-center justify-center text-center">
        <span className="font-display text-[23cqw] font-black leading-[0.9] text-leaf-deep">4</span>
        <span className="mt-[1.5cqw] font-display text-[6.2cqw] font-extrabold leading-tight text-ink">{t.life.meals.plateUnit}</span>
        <span className="text-[5.3cqw] font-semibold leading-tight text-ink-soft">{t.life.meals.plateNote}</span>
      </div>

      {foods.map(({ key, position, delay, icon }) => (
        <span key={key} className={`absolute size-[19%] ${position}`}>
          <span
            className="meal-bob flex size-full items-center justify-center rounded-full bg-white shadow-[0_8px_18px_-10px_rgb(74_56_12/0.45)]"
            style={{ "--bob-delay": delay } as CSSProperties}
          >
            {icon}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Иконки стоят на пунктирной окружности под углом 45°: центр в 16 % от краёв, поэтому не выходят за контейнер. */
const foods: { key: string; position: string; delay: string; icon: ReactNode }[] = [
  { key: "apple", position: "left-[6.5%] top-[6.5%]", delay: "0s", icon: <AppleArt /> },
  { key: "carrot", position: "right-[6.5%] top-[6.5%]", delay: "-1.1s", icon: <CarrotArt /> },
  { key: "milk", position: "bottom-[6.5%] right-[6.5%]", delay: "-2.2s", icon: <MilkArt /> },
  { key: "grain", position: "bottom-[6.5%] left-[6.5%]", delay: "-3.3s", icon: <GrainArt /> },
];

const art = "size-[62%]";

function AppleArt() {
  return (
    <svg viewBox="0 0 32 32" className={art} focusable="false">
      <path d="M16 10.5c-2.2-1.6-6.8-1.7-8.6 1.9-2 4 .2 10.6 3.4 13 1.6 1.2 3 .9 5.2.2 2.2.7 3.6 1 5.2-.2 3.2-2.4 5.4-9 3.4-13-1.8-3.6-6.4-3.5-8.6-1.9Z" fill="#e8574a" />
      <path d="M11 13.5c-1 1-1.4 2.6-1.2 4" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16 10.5c0-2.2.6-3.8 1.8-5" fill="none" stroke="#6b4a2b" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17.6 7.6c1.4-2.4 4.2-2.8 5.8-2.2-.6 2.2-3 3.6-5.8 2.2Z" fill="#5fae5c" />
    </svg>
  );
}

function CarrotArt() {
  return (
    <svg viewBox="0 0 32 32" className={art} focusable="false">
      <path d="M21.5 10.5 7 25.6c-.8.8.2 1.8 1 1L23.4 12.4c1-1 .9-1.7.2-2.2-.7-.5-1.4-.6-2.1.3Z" fill="#f28c28" />
      <path d="M21.5 10.5c-3-1.2-6.2 1.4-8.2 4.6l2.9 3.6c3.4-2 6.4-5 5.3-8.2Z" fill="#f59a3a" />
      <path d="M13.8 17.6l1.8 1.4M11.2 20.8l1.4 1.2" stroke="#c8661a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M22.4 10.4c.2-2.6 1.4-4.8 3.6-5.6-.2 2.4-1.4 4.4-3.6 5.6ZM22.6 10.6c2.2-1.2 4.6-1.2 6.4 0-1.8 1.4-4.2 1.4-6.4 0ZM22.2 10.2c-.6-2.2-.2-4.6 1-6.2.8 2 .4 4.4-1 6.2Z" fill="#5fae5c" />
    </svg>
  );
}

function MilkArt() {
  return (
    <svg viewBox="0 0 32 32" className={art} focusable="false">
      <path d="M12.5 4h7v3.4l2.4 4.2V27a1.6 1.6 0 0 1-1.6 1.6h-8.6A1.6 1.6 0 0 1 10.1 27V11.6l2.4-4.2Z" fill="#fff" stroke="#2e6a3d" strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="12" y="3" width="8" height="3.2" rx="1" fill="#ffc42e" />
      <path d="M10.1 16.5h11.8v6.5H10.1Z" fill="#e5f2e1" />
      <path d="M14 19.8c1-1.4 3-1.4 4 0" fill="none" stroke="#2e6a3d" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function GrainArt() {
  return (
    <svg viewBox="0 0 32 32" className={art} focusable="false">
      <path d="M16 29V9" stroke="#c98a00" strokeWidth="1.5" strokeLinecap="round" />
      <g fill="#ffc42e" stroke="#e09b00" strokeWidth="0.8">
        <ellipse cx="16" cy="6.6" rx="1.9" ry="3" />
        <ellipse cx="12.9" cy="11.4" rx="1.8" ry="2.9" transform="rotate(-35 12.9 11.4)" />
        <ellipse cx="19.1" cy="11.4" rx="1.8" ry="2.9" transform="rotate(35 19.1 11.4)" />
        <ellipse cx="12.9" cy="16.6" rx="1.8" ry="2.9" transform="rotate(-35 12.9 16.6)" />
        <ellipse cx="19.1" cy="16.6" rx="1.8" ry="2.9" transform="rotate(35 19.1 16.6)" />
        <ellipse cx="12.9" cy="21.8" rx="1.8" ry="2.9" transform="rotate(-35 12.9 21.8)" />
        <ellipse cx="19.1" cy="21.8" rx="1.8" ry="2.9" transform="rotate(35 19.1 21.8)" />
      </g>
    </svg>
  );
}
