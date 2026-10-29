"use client";

import { BalloonIcon, ChatIcon, ClockIcon, UsersIcon } from "@/components/shared/icons";
import { useLanguage } from "@/components/shared/language-provider";

const cardIcons = {
  age: BalloonIcon,
  groups: UsersIcon,
  language: ChatIcon,
  hours: ClockIcon,
} as const;

export function About() {
  const { t } = useLanguage();
  const cards = Object.entries(t.about.cards) as [keyof typeof cardIcons, { label: string; value: string }][];

  return (
    <section id="about" className="scroll-mt-16 py-14 xl:py-16">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[0.9fr_1.1fr] items-center gap-12 px-8">
        <div>
          <p className="kicker">{t.about.kicker}</p>
          <h2 className="mt-3 text-[34px] font-extrabold leading-tight text-ink xl:text-[38px]">{t.about.title}</h2>
          <p className="mt-4 max-w-[30rem] text-[17px] leading-relaxed text-ink-soft">{t.about.text}</p>
        </div>

        <ul className="grid grid-cols-2 gap-4">
          {cards.map(([key, card], i) => {
            const Icon = cardIcons[key];
            return (
              <li key={key} className="card flex items-center gap-4 p-5">
                <span
                  className={`inline-flex size-12 shrink-0 items-center justify-center rounded-2xl ${
                    i % 2 === 0 ? "bg-sun-soft text-ink" : "bg-leaf-soft text-leaf-deep"
                  }`}
                >
                  <Icon className="size-6" />
                </span>
                <span>
                  <span className="block text-sm text-ink-soft">{card.label}</span>
                  <span className="mt-0.5 block font-display text-xl font-extrabold text-ink">{card.value}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
