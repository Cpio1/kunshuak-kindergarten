"use client";

import { site } from "@/lib/site-data";
import { CurrentYear } from "@/components/shared/current-year";
import { SunMark } from "@/components/shared/decor";
import { useLanguage } from "@/components/shared/language-provider";

export function Footer() {
  const { locale, t } = useLanguage();

  return (
    <footer className="border-t border-line bg-cream/60">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-8 py-6 text-sm text-ink-soft">
        <p className="flex items-center gap-2">
          <SunMark className="size-6" />
          <span>
            © <CurrentYear /> {site.name[locale]}
          </span>
        </p>
        <ul className="flex items-center gap-5 font-semibold">
          <li>
            <a href="#contacts" className="hover:text-ink">
              {t.footer.contacts}
            </a>
          </li>
          <li>
            <a href={site.phone.href} className="hover:text-ink">
              {site.phone.display}
            </a>
          </li>
          <li>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              {t.footer.instagram} {site.instagram.handle}
              <span className="sr-only"> {t.contacts.newTab}</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
