"use client";

import { site } from "@/lib/site-data";
import { HeroVisual } from "@/components/shared/hero-visual";
import { ArrowDownIcon, PhoneIcon, PinIcon } from "@/components/shared/icons";
import { useLanguage } from "@/components/shared/language-provider";
import { mobileId } from "./header";

export function MobileHero() {
  const { locale, t } = useLanguage();

  return (
    <section id={mobileId("home")} className="overflow-hidden pt-14">
      <div className="mx-auto max-w-3xl px-4 pb-6 pt-5 md:grid md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-6 md:pt-8">
        <div>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-leaf-soft px-3 py-1 text-[13px] font-semibold text-leaf-deep">
            <PinIcon className="size-4" />
            {t.hero.place}
          </p>
          <h1 className="mt-3 text-[28px] font-black leading-[1.12] text-ink min-[390px]:text-[30px] md:text-[34px]">
            {site.name[locale]}
          </h1>
          <p className="mt-2 font-display text-lg font-bold leading-snug text-ink">
            <span className="bg-[linear-gradient(transparent_62%,var(--color-sun-soft)_62%)] box-decoration-clone">
              {t.hero.slogan}
            </span>
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{t.hero.lead}</p>

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <a
              href={site.phone.href}
              className="btn-primary inline-flex h-12 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2 text-[14px] min-[390px]:text-[15px] font-bold"
            >
              <PhoneIcon className="size-5 shrink-0" />
              {t.hero.ctaCall}
            </a>
            <a
              href={`#${mobileId("about")}`}
              className="btn-secondary inline-flex h-12 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2 text-[14px] min-[390px]:text-[15px] font-bold"
            >
              {t.hero.ctaAbout}
              <ArrowDownIcon className="size-4 shrink-0" />
            </a>
          </div>
        </div>

        <div className="mt-5 flex justify-center md:mt-0">
          <HeroVisual
            sizes="(min-width: 768px) 340px, 92vw"
            sceneClassName="h-auto w-full max-w-[300px] md:max-w-[340px]"
            imageClassName="max-h-[300px]"
          />
        </div>

        <ul className="mt-5 grid grid-cols-2 gap-2 md:col-span-2 md:mt-2 md:grid-cols-4">
          {t.hero.stats.map((stat) => (
            <li key={stat.label} className="rounded-2xl border border-line bg-white/85 px-3 py-2.5">
              <span className="block font-display text-[15px] font-extrabold leading-tight text-ink">{stat.value}</span>
              <span className="mt-0.5 block text-xs leading-tight text-ink-soft">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
