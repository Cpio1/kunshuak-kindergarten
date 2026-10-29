"use client";

import { site, type ImageFile } from "@/lib/site-data";
import { HeroVisual } from "@/components/shared/hero-visual";
import { ArrowDownIcon, PhoneIcon, PinIcon } from "@/components/shared/icons";
import { useLanguage } from "@/components/shared/language-provider";

export function Hero({ photo }: { photo: ImageFile | null }) {
  const { locale, t } = useLanguage();

  return (
    <section id="home" className="relative overflow-hidden pt-16">
      <div className="mx-auto grid min-h-[min(600px,calc(100svh-4rem))] max-w-[1200px] grid-cols-[1.08fr_0.92fr] items-center gap-10 px-8 py-8">
        <div>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-leaf-soft px-3 py-1 text-sm font-semibold text-leaf-deep">
            <PinIcon className="size-4" />
            {t.hero.place}
          </p>
          <h1 className="mt-4 text-[42px] font-black leading-[1.08] text-ink xl:text-[50px]">
            {site.name[locale]}
          </h1>
          <p className="mt-3 font-display text-[22px] font-bold leading-snug text-ink xl:text-2xl">
            <span className="bg-[linear-gradient(transparent_62%,var(--color-sun-soft)_62%)] box-decoration-clone">
              {t.hero.slogan}
            </span>
          </p>
          <p className="mt-4 max-w-[34rem] text-[17px] leading-relaxed text-ink-soft">{t.hero.lead}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={site.phone.href}
              className="btn-primary inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-bold"
            >
              <PhoneIcon className="size-5" />
              {t.hero.ctaCall}
            </a>
            <a
              href="#about"
              className="btn-secondary inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-bold"
            >
              {t.hero.ctaAbout}
              <ArrowDownIcon className="size-4" />
            </a>
          </div>

          <ul className="mt-8 grid max-w-[36rem] grid-cols-4 gap-2.5">
            {t.hero.stats.map((stat) => (
              <li key={stat.label} className="rounded-2xl border border-line bg-white/80 px-3 py-2.5">
                <span className="block font-display text-[15px] font-extrabold leading-tight text-ink">
                  {stat.value}
                </span>
                <span className="mt-1 block text-xs leading-tight text-ink-soft">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center justify-center">
          <HeroVisual
            photo={photo}
            sizes="(min-width: 1200px) 520px, 45vw"
            logoSize={250}
            imageClassName="max-h-[min(540px,calc(100svh-9rem))]"
          />
        </div>
      </div>
    </section>
  );
}
