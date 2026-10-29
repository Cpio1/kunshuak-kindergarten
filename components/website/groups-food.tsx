"use client";

import { site } from "@/lib/site-data";
import { Cloud, SunMark } from "@/components/shared/decor";
import { BalloonIcon, BowlIcon, ChatIcon, UsersIcon } from "@/components/shared/icons";
import { useLanguage } from "@/components/shared/language-provider";

const groupIcons = { count: UsersIcon, ages: BalloonIcon, language: ChatIcon } as const;

/** Группы и питание — два компактных блока в одном ряду. */
export function GroupsFood() {
  const { locale, t } = useLanguage();
  const groupCards = Object.entries(t.groups.cards) as [keyof typeof groupIcons, { value: string; text: string }][];

  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-6 px-8 py-6">
      <section
        id="groups"
        aria-labelledby="groups-title"
        className="relative scroll-mt-24 overflow-hidden rounded-[28px] bg-sun-soft/70 p-7"
      >
        <Cloud className="absolute -right-4 top-4 w-24 opacity-80" />
        <p className="kicker">{t.groups.kicker}</p>
        <h2 id="groups-title" className="relative mt-2 text-[30px] font-extrabold leading-tight text-ink">
          {t.groups.title}
        </h2>
        <p className="relative mt-2 max-w-[38rem] text-[15px] leading-relaxed text-ink-soft">{t.groups.text}</p>

        <ul className="relative mt-5 grid grid-cols-3 gap-3">
          {groupCards.map(([key, card]) => {
            const Icon = groupIcons[key];
            return (
              <li key={key} className="rounded-2xl bg-white/90 p-4 shadow-soft">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-sun text-ink">
                  <Icon className="size-5" />
                </span>
                <span className="mt-2.5 block font-display text-lg font-extrabold leading-tight text-ink">
                  {card.value}
                </span>
                <span className="mt-1 block text-[13px] leading-snug text-ink-soft">{card.text}</span>
              </li>
            );
          })}
        </ul>

        {site.groups.length > 0 && (
          <div className="relative mt-5">
            <h3 className="text-base font-extrabold text-ink">{t.groups.listTitle}</h3>
            <ul className="mt-3 grid grid-cols-2 gap-2.5">
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
      </section>

      <section id="food" aria-labelledby="food-title" className="card flex scroll-mt-24 flex-col p-7">
        <p className="kicker">{t.food.kicker}</p>
        <div className="mt-2 flex items-center gap-3">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-leaf-soft text-leaf-deep">
            <BowlIcon className="size-7" />
          </span>
          <h2 id="food-title" className="min-w-0 text-[22px] font-extrabold leading-tight text-ink xl:text-[26px]">
            {t.food.title}
          </h2>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{t.food.text}</p>
        <div className="mt-auto pt-4">
          <p className="flex items-center gap-3 rounded-2xl bg-leaf-soft/70 px-4 py-3">
            <span className="flex shrink-0 gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <SunMark key={i} className="size-5" />
              ))}
            </span>
            <span className="font-display text-[15px] font-extrabold leading-tight text-leaf-deep">{t.food.accent}</span>
          </p>
        </div>
      </section>
    </div>
  );
}
