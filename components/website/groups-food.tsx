"use client";

import { site } from "@/lib/site-data";
import { Cloud, SunMark } from "@/components/shared/decor";
import { BowlIcon } from "@/components/shared/icons";
import { useLanguage } from "@/components/shared/language-provider";

/** Группы и питание — два компактных блока в одном ряду. */
export function GroupsFood() {
  const { locale, t } = useLanguage();

  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-[1.15fr_0.85fr] gap-6 px-8 py-6">
      <section
        id="groups"
        aria-labelledby="groups-title"
        className="relative scroll-mt-24 overflow-hidden rounded-[28px] bg-sun-soft/70 p-8"
      >
        <Cloud className="absolute -right-4 top-5 w-28 opacity-80" />
        <p className="kicker">{t.groups.kicker}</p>
        <div className="relative mt-4 flex items-center gap-6">
          <span className="inline-flex size-28 shrink-0 items-center justify-center rounded-full bg-sun font-display text-6xl font-black text-ink shadow-[0_0_0_10px_rgb(255_255_255/0.55)]">
            {site.groupsCount}
          </span>
          <div>
            <h2 id="groups-title" className="text-[34px] font-extrabold leading-tight text-ink">
              {t.groups.count}
            </h2>
            <p className="mt-1 text-lg font-semibold text-ink">{t.groups.ages}</p>
            <p className="mt-2 max-w-[24rem] text-[15px] leading-relaxed text-ink-soft">{t.groups.note}</p>
          </div>
        </div>

        {site.groups.length > 0 && (
          <div className="relative mt-6">
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

      <section
        id="food"
        aria-labelledby="food-title"
        className="card relative scroll-mt-24 overflow-hidden p-8"
      >
        <p className="kicker">{t.food.kicker}</p>
        <div className="mt-4 flex items-center gap-5">
          <span className="relative inline-flex size-24 shrink-0 items-center justify-center rounded-full bg-leaf-soft text-leaf-deep">
            <BowlIcon className="size-12" />
          </span>
          <div>
            <h2 id="food-title" className="text-[26px] font-extrabold leading-tight text-ink">
              {t.food.title}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{t.food.text}</p>
          </div>
        </div>
        <div className="mt-5 flex gap-2" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <SunMark key={i} className="size-7" />
          ))}
        </div>
      </section>
    </div>
  );
}
