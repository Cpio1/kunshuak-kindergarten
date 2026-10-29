"use client";

import { site, sectionIds } from "@/lib/site-data";
import { SunMark } from "@/components/shared/decor";
import { PhoneIcon } from "@/components/shared/icons";
import { LangSwitch } from "@/components/shared/lang-switch";
import { useLanguage } from "@/components/shared/language-provider";

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-milk/90 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only rounded-full bg-ink px-4 py-2 text-sm font-bold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        {t.header.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-4 px-6 xl:gap-6 xl:px-8">
        <a href="#home" className="flex shrink-0 items-center gap-2 rounded-xl" aria-label={t.header.toTop}>
          <SunMark className="size-9" />
          <span className="leading-none">
            <span className="block font-display text-[21px] font-extrabold text-ink">{site.shortName}</span>
            <span className="mt-0.5 hidden text-xs font-medium text-ink-soft xl:block">
              {t.hero.place}
            </span>
          </span>
        </a>

        <nav aria-label={t.header.menu} className="ml-auto">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {sectionIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="block whitespace-nowrap rounded-full px-2 py-2 text-[14px] font-semibold text-ink-soft transition-colors hover:bg-cream hover:text-ink xl:px-3"
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <LangSwitch />

        <a
          href={site.phone.href}
          className="btn-primary inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-bold xl:px-4"
          aria-label={`${t.header.call}: ${site.phone.display}`}
        >
          <PhoneIcon className="size-[18px]" />
          <span className="hidden xl:inline">{t.header.call}</span>
        </a>
      </div>
    </header>
  );
}
