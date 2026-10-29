"use client";

import type { CSSProperties } from "react";
import { site } from "@/lib/site-data";
import { Cloud } from "@/components/shared/decor";
import { BalloonIcon, BowlIcon, ChatIcon, UsersIcon } from "@/components/shared/icons";
import { useLanguage } from "@/components/shared/language-provider";
import { useReveal } from "@/components/shared/use-reveal";

const cardIcons = { groups: UsersIcon, ages: BalloonIcon, language: ChatIcon, food: BowlIcon } as const;

/** «Топтар және тамақтану / Группы и питание»: группы, возраст, язык и питание — одним разделом. */
export function Life() {
  const { locale, t } = useLanguage();
  const { ref, revealProps } = useReveal<HTMLUListElement>();
  const cards = Object.entries(t.life.cards) as [keyof typeof cardIcons, { value: string; text: string }][];

  return (
    <section id="life" aria-labelledby="life-title" className="scroll-mt-20 py-6">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-sun-soft/60 px-8 py-8">
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-12 size-56 rounded-full bg-leaf-soft" />
          <Cloud className="absolute -right-3 top-5 w-24 opacity-90" />

          <div className="relative flex items-end justify-between gap-10 pr-16">
            <h2 id="life-title" className="text-[34px] font-extrabold leading-tight text-ink xl:text-[38px]">
              {t.life.title}
            </h2>
            <p className="max-w-[30rem] text-[15px] leading-relaxed text-ink-soft">{t.life.lead}</p>
          </div>

          <ul ref={ref} {...revealProps} className="relative mt-6 grid grid-cols-4 gap-4">
            {cards.map(([key, card], i) => {
              const Icon = cardIcons[key];
              return (
                <li
                  key={key}
                  style={{ "--reveal-i": i } as CSSProperties}
                  className="reveal-item card p-5 hover:-translate-y-1 hover:shadow-[0_16px_32px_-18px_rgb(74_56_12/0.4)]"
                >
                  <span
                    className={`inline-flex size-11 items-center justify-center rounded-2xl ${
                      i % 2 === 0 ? "bg-sun text-ink" : "bg-leaf-soft text-leaf-deep"
                    }`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <span className="mt-3 block font-display text-lg font-extrabold leading-tight text-ink xl:text-xl">
                    {card.value}
                  </span>
                  <span className="mt-1.5 block text-sm leading-snug text-ink-soft">{card.text}</span>
                </li>
              );
            })}
          </ul>

          {site.groups.length > 0 && (
            <div className="relative mt-6">
              <h3 className="text-base font-extrabold text-ink">{t.life.listTitle}</h3>
              <ul className="mt-3 grid grid-cols-4 gap-3">
                {site.groups.map((group) => (
                  <li key={group.name.kk} className="rounded-2xl bg-white/85 px-4 py-3">
                    <span className="block font-bold text-ink">{group.name[locale]}</span>
                    {group.description && (
                      <span className="mt-0.5 block text-sm text-ink-soft">{group.description[locale]}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
