"use client";

import { site } from "@/lib/site-data";
import { CurrentYear } from "@/components/shared/current-year";
import { Logo } from "@/components/shared/logo";
import { useLanguage } from "@/components/shared/language-provider";
import { mobileId } from "./header";

export function MobileFooter() {
  const { locale, t } = useLanguage();

  return (
    <footer className="mt-4 border-t border-line bg-cream/60">
      <div className="mx-auto max-w-3xl px-4 py-5 text-sm text-ink-soft">
        <p className="flex items-center gap-2">
          <Logo size={40} />
          <span>
            © <CurrentYear /> {site.name[locale]}
          </span>
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-semibold">
          <li>
            <a href={`#${mobileId("contacts")}`} className="inline-flex min-h-11 items-center">
              {t.footer.contacts}
            </a>
          </li>
          <li>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center">
              {t.footer.instagram} {site.instagram.handle}
              <span className="sr-only"> {t.contacts.newTab}</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
