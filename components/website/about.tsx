"use client";

import type { ImageFile } from "@/lib/site-data";
import { BalloonIcon, ChatIcon, ClockIcon, UsersIcon } from "@/components/shared/icons";
import { useLanguage } from "@/components/shared/language-provider";
import { Wave } from "@/components/shared/decor";
import { PebblePhoto } from "@/components/shared/section-photo";
import { cardShape, iconShape } from "@/components/shared/shapes";

const cardIcons = {
  age: BalloonIcon,
  groups: UsersIcon,
  language: ChatIcon,
  hours: ClockIcon,
} as const;

/** photo — public/images/main-page2.*; без него раздел остаётся в двухколоночном виде «текст + карточки». */
export function About({ photo }: { photo: ImageFile | null }) {
  const { t } = useLanguage();
  const cards = Object.entries(t.about.cards) as [keyof typeof cardIcons, { label: string; value: string }][];

  const text = (
    <div>
      <p className="kicker">{t.about.kicker}</p>
      <h2 className="mt-3 text-[34px] font-extrabold leading-tight text-ink xl:text-[38px]">{t.about.title}</h2>
      <p className="mt-4 max-w-[30rem] text-[17px] leading-relaxed text-ink-soft">{t.about.text}</p>
    </div>
  );

  const cardList = (compact: boolean) => (
    <ul className={`grid grid-cols-2 ${compact ? "mt-6 gap-3" : "gap-4"}`}>
      {cards.map(([key, card], i) => {
        const Icon = cardIcons[key];
        return (
          <li key={key} className={`card ${cardShape(i)} flex items-center ${compact ? "gap-3 p-4" : "gap-4 p-5"}`}>
            <span
              className={`inline-flex shrink-0 items-center justify-center ${iconShape(i)} ${compact ? "size-11" : "size-12"} ${
                i % 2 === 0 ? "bg-sun-soft text-ink" : "bg-leaf-soft text-leaf-deep"
              }`}
            >
              <Icon className="size-6" />
            </span>
            <span>
              <span className="block text-sm text-ink-soft">{card.label}</span>
              <span className={`mt-0.5 block font-display font-extrabold text-ink ${compact ? "text-lg" : "text-xl"}`}>
                {card.value}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section id="about" className="scroll-mt-16">
      <Wave className="h-7 text-butter xl:h-9" />
      <div className="bg-butter py-10 xl:py-12">
      {photo ? (
        <div className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-12 px-8">
          <div className="flex justify-center">
            <PebblePhoto
              photo={photo}
              alt={t.about.photoAlt}
              sizes="(min-width: 1200px) 320px, 28vw"
              className="w-[min(420px,100%,calc(100svh-9rem))]"
            />
          </div>
          <div>
            {text}
            {cardList(true)}
          </div>
        </div>
      ) : (
        <div className="mx-auto grid max-w-[1200px] grid-cols-[0.9fr_1.1fr] items-center gap-12 px-8">
          {text}
          {cardList(false)}
        </div>
      )}
      </div>
      <Wave flip className="h-7 text-butter xl:h-9" />
    </section>
  );
}
