"use client";

import type { CSSProperties } from "react";
import { site } from "@/lib/site-data";
import { CardUnderlay } from "@/components/shared/decor";
import { BalloonIcon, ChatIcon, UsersIcon } from "@/components/shared/icons";
import { useLanguage } from "@/components/shared/language-provider";
import { MealsPlate } from "@/components/shared/meals-plate";
import { cardShape, iconShape } from "@/components/shared/shapes";
import { useReveal } from "@/components/shared/use-reveal";

const cardIcons = { groups: UsersIcon, ages: BalloonIcon, language: ChatIcon } as const;
const underlays = ["circle", "hill", "cloud"] as const;

/** «Топтар және тамақтану / Группы и питание»: группы, возраст, язык и питание — одним разделом. */
export function Life() {
  const { locale, t } = useLanguage();
  const { ref, revealProps } = useReveal<HTMLUListElement>();
  const { ref: mealsRef, revealProps: mealsRevealProps } = useReveal<HTMLDivElement>();
  const cards = Object.entries(t.life.cards) as [keyof typeof cardIcons, { value: string; text: string }][];

  return (
    <section id="life" aria-labelledby="life-title" className="scroll-mt-20 py-6">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="shape-petal relative overflow-hidden bg-sun-soft/60 px-8 py-8 [--shape-big:72px] [--shape-small:28px]">
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-12 size-56 rounded-full bg-leaf-soft" />

          <div className="relative flex items-end justify-between gap-10 pr-16">
            <h2 id="life-title" className="text-[34px] font-extrabold leading-tight text-ink xl:text-[38px]">
              {t.life.title}
            </h2>
            <p className="max-w-[30rem] text-[15px] leading-relaxed text-ink-soft">{t.life.lead}</p>
          </div>

          <ul ref={ref} {...revealProps} className="relative mt-6 grid grid-cols-3 gap-4">
            {cards.map(([key, card], i) => {
              const Icon = cardIcons[key];
              return (
                <li
                  key={key}
                  style={{ "--reveal-i": i } as CSSProperties}
                  className="reveal-item group relative isolate hover:-translate-y-1"
                >
                  <CardUnderlay variant={underlays[i % underlays.length]} />
                  <div
                    className={`card ${cardShape(i)} relative h-full p-5 transition-shadow group-hover:shadow-[0_16px_32px_-18px_rgb(74_56_12/0.4)]`}
                  >
                  <span
                    className={`inline-flex size-11 items-center justify-center ${iconShape(i)} ${
                      i % 2 === 0 ? "bg-sun text-ink" : "bg-leaf-soft text-leaf-deep"
                    }`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <span className="mt-3 block font-display text-lg font-extrabold leading-tight text-ink xl:text-xl">
                    {card.value}
                  </span>
                  <span className="mt-1.5 block text-sm leading-snug text-ink-soft">{card.text}</span>
                  </div>
                </li>
              );
            })}
          </ul>

          {site.groups.length > 0 && (
            <div className="relative mt-6">
              <h3 className="text-base font-extrabold text-ink">{t.life.listTitle}</h3>
              <ul className="mt-3 grid grid-cols-4 gap-3">
                {site.groups.map((group) => (
                  <li key={group.name.kk} className="shape-leaf bg-white/85 px-4 py-3 [--shape-big:20px] [--shape-small:8px]">
                    <span className="block font-bold text-ink">{group.name[locale]}</span>
                    {group.description && (
                      <span className="mt-0.5 block text-sm text-ink-soft">{group.description[locale]}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div
            ref={mealsRef}
            {...mealsRevealProps}
            className="shape-leaf relative mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-10 bg-leaf-soft px-10 py-5 [--shape-big:72px] [--shape-small:24px]"
          >
            <div className="reveal-item max-w-[30rem]">
              <p className="kicker">{t.life.meals.kicker}</p>
              <h3 className="mt-2 text-[28px] font-extrabold leading-tight text-ink xl:text-[30px]">{t.life.meals.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{t.life.meals.text}</p>
            </div>
            <MealsPlate className="reveal-item w-[300px] xl:w-[322px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
